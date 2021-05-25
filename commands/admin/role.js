const { matchCard } = require('../../canvas/card.match')


module.exports = {
    name: "role",
    category: 'Admin',
    description: "Set the balance of an user",
    aliases: null,
    usage: '<@user> <new balance>',
    args: false,
    admin: true,
    loaded: false,

    run: async (message, args, client, langFile, db_values, Discord) => {


    }
}