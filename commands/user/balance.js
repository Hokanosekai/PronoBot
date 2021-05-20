const {getUser} = require("../../dbManager");

module.exports = {
    name: "balance",
    category: 'User',
    description: "See available monney on your account",
    aliases: ["money", "bal"],
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member

        getUser(author.id).then(res => {
            if (res.length === 0) message.channel.send(`[❌] <@${author.id}> Il faut te créer un compte pour cette commande`)
            message.channel.send(`[✅] <@${author.id}> Tu as ${res[0].money} :coin: sur ton compte`)
        }).catch(err => {
            console.error(err)
        })
    }
}