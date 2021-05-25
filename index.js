const Discord = require('discord.js')
require('dotenv').config({path: '/root/botsdiscord/pronobot/.env'});

let token = process.env.DISCORD_TOKEN

const mongo = require('./mongo')

/* Setup new discord.js client */
const client = new Discord.Client({disableEveryone: true})

/* Create a new Collection for all commands/events */
client.commands = new Discord.Collection()
client.events = new Discord.Collection();

mongo().then(async mongoose => {
});

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

/* Login the client bot with the Discord API */
client.login(token)