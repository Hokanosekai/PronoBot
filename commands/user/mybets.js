const {capitalize} = require("../../functions");

const bet_controller = require('../../controllers/controller.bet')

const name = 'mybets'
const category = 'user'

module.exports = {
    name,
    category,
    description: "See all your bets",
    aliases: ['bets'],
    usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member
        const guildID = message.guild.id

        const langF = langFile.commands[category][name]

        const BETS = await bet_controller.get({}).then(b => {
            return b
        }).catch(err => console.error(err))


        if (BETS.length === 0) return message.channel.send(`[❌] <@${author.id}> ${langF.no_bets}`)

        let s = ''
        let i = 1
        BETS.forEach(bet => {
            if (bet.user_id !== db_values.USER._id) undefined

            const bet_info = JSON.parse(bet.info)

            s += langF.bet.replace('[id]', i)
                .replace('[ville]', capitalize(bet_info.club))
                .replace('[cote]', bet_info.cote)
                .replace('[somme]', bet_info.somme)
                .replace('[gain]', bet_info.gain)
                .replace('[s_name]', db_values.GUILD.serverName)

            i+=1
        })

        let bet = new Discord.MessageEmbed()
            .setTitle(langF.embed_title)
            .setColor('DARK_GREEN')
            .setFooter("Pronobot - ©2021")
            .setDescription(s)

        await message.author.send(bet)
    }
}