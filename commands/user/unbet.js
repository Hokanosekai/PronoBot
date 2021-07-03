const {capitalize} = require("../../util/functions");

const bet_controller = require('../../controllers/controller.bet')
const user_controller = require('../../controllers/controller.user')

const name = 'unbet'
const category = 'user'

module.exports = {
    name,
    category,
    description: "Delete your last bet",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member

        const langF = langFile.commands[category][name]

        let unbet = new Discord.MessageEmbed()
            .setTitle(langF.embed_title)
            .setFooter("Pronobot - ©2021")
            .setColor('RED')

        if (db_values.BET === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.error}`)

        const bet_info = JSON.parse(db_values.BET.info)

        user_controller.update({_id: db_values.USER._id, type: 'money', value: db_values.USER.money + parseInt(bet_info.somme)}).then(() => {

            bet_controller.delete({_id: db_values.BET._id}).catch(err => console.error(err))

            message.channel.send(`[✅] <@${author.id}> ${langF.channel_msg}`)
            let t = langF.user_msg.replace('[somme]', bet_info.somme)
                .replace('[ville]', capitalize(bet_info.club))
                .replace('[cote]', bet_info.cote)
            message.author.send(unbet.setDescription(`${t}`))

        }).catch(err => console.error(err))
    }
}