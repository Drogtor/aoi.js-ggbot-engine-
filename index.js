const aoijs = require("aoi.js")

const bot = new aoijs.AoiClient({
token: process.env.TOKEN,
prefix: "g!",
intents: ["GUILDS", "GUILD_MESSAGES"]
})

//Events
bot.onMessage()

//VOICE / MUSIC RELATED CONFIGURATION
const voice = new aoijs.Voice(bot, {
  soundcloud: {
    //clientId: "SoundCloud clientID", //remove the double slash if you want soundcloud
  },
  cache: {
    cacheType: "Memory",//Disk | None
    enabled: true,
  },
}, false); //true or false for pruneMusic

//white screen
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('bot working yay!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`) 
})


bot.readyCommand({
    channel: "",
    code: `$log[Ready on $userTag[$clientID]]`
})

//command handler
const loader = new aoijs.LoadCommands(bot);
loader.load(bot.cmd,'./commands/') 
bot.onInteractionCreate()

//variables
bot.variables({
    prefix: "g!",
    tick_r: "",
    tick_e: "false",
    tick: "false",
    tick_c: "0", 
    time: "",
    date: "",
    host:"",
    win: "",
    prize: "",
    nah: "<:x_:1003650826977427466> ",
    yeah: "<:check:1003650871239917608>",
    mod: "<:moderator:1004017259628466320>",
    admin: "<:GGS_Admin:1007559191516434594>",
    owner: "<:owner:1004017611148890192>",
    giveaway: "<:GGS_giveaway:1007560335898705992>"
})

//status
bot.status({
  text: "Ggbot.cc | g!help",
  type: "PLAYING",
  time: 12
})

bot.status({
  text: "9 Guilds with 337 Members",
  type: "WATCHING",
  time: 12
})
