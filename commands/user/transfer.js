
const name = 'transfer'
const category = 'user'

module.exports = {
    name,
    category,
    description: "Transfer money between users",
    aliases: null,
    usage: '<money> <@user>',
    args: true,
    admin: false,
    loaded: false,

    run: async (message, args, client, langFile) => {
        const authorM = message.member
        const member = message.mentions.members.first()
        const money = args[0]
        const guildID = message.guild.id

        if (args.length !== 2) return

        if (money <= 0) return "pas thune"

        if (!member) return "please mention someone"

        u.read({user: authorM.id, guild: guildID}).then(async author => {

            if (author.length === 0) return "créer un compte"

            if (author.money < money) return "pas assé argent"

            await u.read({user: member.id, guild: guildID}).then(async mention => {

                if (mention.length === 0) return "existe pas"

                u.money = mention[0].money + money
                await u.update({uuid: mention[0].uuid, type_update: 'money'}).catch(err => {
                    console.error(err)
                })

            }).catch(err => {
                console.error(err)
            })

            u.money = author[0].money - money
            await u.update({uuid: author[0].uuid, type_update: 'money'}).catch(err => {
                console.error(err)
            })

        }).catch(err => {
            console.error(err)
        })

    }
}