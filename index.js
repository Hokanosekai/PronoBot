const Discord = require('discord.js')
require('dotenv').config({path: '/root/botsdiscord/pronobot/.env'});

const mongo = require('./mongo')

const config_controller = require('./controllers/controller.config')

let token = process.env.DISCORD_TOKEN

/* Setup new discord.js client */
const client = new Discord.Client({disableEveryone: true})

/* Create a new Collection for all commands/events */
client.commands = new Discord.Collection()
client.events = new Discord.Collection();
mongo().then(async mongoose => {

    await ['command_handler', 'event_handler'].forEach(handler => {
        require(`./handlers/${handler}`)(client, Discord, mongoose)
    })

    const config = await config_controller.get().catch(err => console.error(err))
    console.log(config)
    if (config.length === 0) {
        let configData = {
            bet_count: 0,
            match_count: 0,
            user_count: 0,
            guild_count: 0
        }
        config_controller.create(configData).catch(err => console.error(err))
    }


})

/* Login the client bot with the Discord API */
client.login(token)