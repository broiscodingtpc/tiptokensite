document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("connectBtn").addEventListener("click", connectWallet);
    document.getElementById("tokenForm").addEventListener("submit", createToken);
});

// 🔗 Connect Phantom Wallet
async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            const wallet = response.publicKey.toString();
            document.getElementById("walletAddress").innerText = `✅ Connected: ${wallet}`;
            document.getElementById("connectBtn").innerText = "✅ Wallet Connected";
            console.log("Wallet connected:", wallet);
        } catch (err) {
            console.error("Wallet connection failed!", err);
            alert("❌ Failed to connect wallet. Please approve the request.");
        }
    } else {
        alert("❌ Phantom Wallet not found! Install it from https://phantom.app/");
    }
}

// ⚡ Token Creation Function (Dummy for Now)
async function createToken(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const symbol = document.getElementById("symbol").value;
    const decimals = parseInt(document.getElementById("decimals").value);
    const supply = parseInt(document.getElementById("supply").value);

    if (!name || !symbol || isNaN(decimals) || isNaN(supply)) {
        alert("⚠️ Please fill in all fields correctly.");
        return;
    }

    document.getElementById("status").innerText = "⏳ Processing... (Feature coming soon!)";

    // 🚀 Future Implementation: Call backend API to create token
    setTimeout(() => {
        document.getElementById("status").innerText = `✅ Token "${name}" (${symbol}) Created!`;
    }, 2000);
}
