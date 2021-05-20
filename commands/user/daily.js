const {updateTag, getUser, updateDaily, updateMoney} = require("../../dbManager");

module.exports = {
    name: "daily",
    category: 'User',
    description: "Get daily reward",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member

        getUser(author.id).then(async user => {
            if (user.length === 0) return message.channel.send(`[❌] <@${author.id}> :bank: Vous ne possédez pas de compte, faites '&open' pour en ouvrir un`)
            if (user[0].daily_claimed === 'true') return message.channel.send(`[❌] <@${author.id}> :calendar_spiral: Tu as déjà récupéré ton lot quotidien.`)

            await updateMoney(author.id, user[0].money + 5).catch(err => {
                console.error(err)
            })
            await updateDaily(author.id, 'true').catch(err => {
                console.error(err)
            })

            message.channel.send(`[✅] <@${author.id}> :calendar_spiral: Tu as bien récupéré ton lot quotidien de 5 :coin:, nouveau solde: ${user[0].money + 5} :coin:`)

            if (user[0].tag_user !== message.author.tag) {
                await updateTag(author.id, message.author.tag).catch(err => {
                    console.error(err)
                })
            }
        }).catch(err => {
            console.error(err)
        })
    }
}