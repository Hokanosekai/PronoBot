const {addUser, getUser} = require("../../dbManager");

module.exports = {
    name: "open",
    category: 'User',
    description: "Open a new account",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member

        getUser(author.id).then(async res => {
            if (res.length !== 0) return message.channel.send(`[❌] <@${author.id}> Tu as déjà un compte`)

            const values = {id_u: author.id, tag: message.author.tag}
            await addUser(values).then(() => {
                message.channel.send(`[✅] <@${author.id}> :bank: Ton compte vient d'être créé, nous t'avons crédité de 20 :coin: pour débuter`)
            }).catch(err => {
                console.error(err)
            })

        }).catch(err => {
            console.error(err)
        })
    }
}