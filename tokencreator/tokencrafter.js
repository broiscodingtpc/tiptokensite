import { Connection, PublicKey, Keypair, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";

let wallet = null; // Store connected wallet

// 1️⃣ Connect Phantom Wallet
async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            wallet = response.publicKey;
            document.getElementById("walletAddress").innerText = "Connected: " + wallet.toString();
        } catch (err) {
            console.error("Wallet connection failed!", err);
        }
    } else {
        alert("Phantom Wallet not found! Install it from https://phantom.app/");
    }
}

// 2️⃣ Token Creation Function
async function createToken(event) {
    event.preventDefault();
    
    if (!wallet) {
        alert("Please connect your wallet first!");
        return;
    }

    const name = document.getElementById("name").value;
    const symbol = document.getElementById("symbol").value;
    const decimals = parseInt(document.getElementById("decimals").value);
    const supply = parseInt(document.getElementById("supply").value);

    // Connect to Solana
    const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
    
    // Generate new mint account
    const mint = Keypair.generate();

    try {
        // Create SPL Token
        const transaction = await createMint(
            connection,
            wallet,       // Token Owner
            wallet,       // Mint Authority
            null,         // Freeze Authority
            decimals
        );

        // Get Associated Token Account
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            wallet,
            mint.publicKey,
            wallet
        );

        // Mint tokens to the wallet
        await mintTo(
            connection,
            wallet,
            mint.publicKey,
            tokenAccount.address,
            wallet,
            supply * Math.pow(10, decimals)
        );

        document.getElementById("status").innerText = `✅ Token Created! Address: ${mint.publicKey.toString()}`;
    } catch (error) {
        console.error("Token creation failed!", error);
        document.getElementById("status").innerText = `❌ Error: ${error.message}`;
    }
}

// 3️⃣ Attach Event Listener
document.getElementById("tokenForm").addEventListener("submit", createToken);
