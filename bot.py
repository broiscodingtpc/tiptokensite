
import discord
from discord.ext import commands

TOKEN = 'YOUR_DISCORD_BOT_TOKEN'
bot = commands.Bot(command_prefix='!', intents=discord.Intents.all())

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user}')

@bot.command()
async def tip(ctx, amount: float, user: discord.Member):
    await ctx.send(f'{ctx.author.mention} tipped {user.mention} {amount} TIP tokens!')

bot.run(TOKEN)
