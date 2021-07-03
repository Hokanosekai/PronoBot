const dateformat = require('dateformat')
const {capitalize} = require("../../util/functions");
const { matchCard } = require('../../canvas/card.match')



const name = 'match'
const category = 'match'

module.exports = {
    name,
    category,
    description: "Match in progress",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member

        const langF = langFile.commands[category][name]

        if (db_values.MATCH === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.no_match}`)

        const match_info = JSON.parse(db_values.MATCH.info)

        const buffer = await matchCard('Current Match', capitalize(match_info.atk_n), capitalize(match_info.def_n), ['@'+match_info.atk_c, '@'+match_info.nul_c, '@'+match_info.def_c])
        const attachment = new Discord.MessageAttachment(buffer, db_values.MATCH._id+'.png')

        await message.channel.send(attachment)

        /*let matche = new Discord.MessageEmbed()
            .setTitle(langF.embed_title)
            .setColor('DARK_GREEN')
            .addFields(
                {name: , value: , inline: true},
                {name: capitalize(match_info.nul_n), value: '@'+match_info.nul_c, inline: true},
                {name: , value: '@'+match_info.def_c, inline: true}
            )
            .setDescription(langF.no_time)
            .setFooter("Pronobot - ©2021")*/

        /*if (match_info.end_date !== 'null') {
            let restTime = match_info.end - Date.now()
            matche.setDescription(langF.time.replace('[time]', dateformat(new Date(restTime).getTime(), "HH'h'MM'min'ss'sec' UTC")))
        }*/

        /*await message.channel.send(matche)*/
    }
}