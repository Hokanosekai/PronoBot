const {removeBetByUser, removeUser, getUser} = require("../../dbManager");

module.exports = {
    name: "close",
    category: 'User',
    description: "Close a new account",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member

        getUser(author.id).then(async user => {
            if (user.length === 0) message.channel.send(`[❌] <@${author.id}> Ton compte n'existe pas`)
            await removeUser(author.id).catch(err => {
                console.error(err)
            })
            await removeBetByUser(author.id).catch(err => {
                console.error(err)
            })

            message.channel.send(`[✅] <@${author.id}> :bank: Ton compte vient d'être supprimé`)
        }).catch(err => {
            console.error(err)
        })
    }
}