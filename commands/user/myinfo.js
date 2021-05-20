const Discord = require('discord.js')

const name = 'myinfo'
const category = 'user'

module.exports = {
    name,
    category,
    description: "Link to your detailed information",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: true,
    loaded: false,

    run: async (message, args, client, langFile) => {

    }
}