const Discord = require('discord.js')
const { AutoPoster } = require('topgg-autoposter')

require('dotenv').config({path: '/root/botsdiscord/pronobot/.env'});

let token = process.env.DISCORD_TOKEN

const mongo = require('./util/mongo')

/* Setup new discord.js client */
const client = new Discord.Client({disableEveryone: true})

const poster = AutoPoster(process.env.TOPGG_TOKEN, client)

/* Create a new Collection for all commands/events */
client.commands = new Discord.Collection()
client.events = new Discord.Collection();

mongo().then(async mongoose => {
});

poster.on('posted', (stats) => { // ran when succesfully posted
    console.log(`Posted stats to Top.gg | ${stats.serverCount} servers`)
});

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

/* Login the client bot with the Discord API */
client.login(token)