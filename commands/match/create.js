const {capitalize} = require("../../functions");
const {ObjectId} = require("bson");

const match_controller = require('../../controllers/controller.match')

const name = 'create'
const category = 'match'

module.exports = {
    name,
    category,
    description: "Create a match",
    aliases: null,
    usage: '<club1> @<cote1> <nul> @<cote_nul> <club2> @<cote2> optional: <2021-04-30T15:00:00>',
    args: true,
    admin: true,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member

        const langF = langFile.commands[category][name]

        let date = args[6] !== undefined? new Date(`${args[6]}`).getTime() : 'null'


        if (args.length < 6) return

        if (db_values.MATCH !== undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.already_match}`)


        const matchData = {
            authorID: author.id,
            authorTag: message.author.tag,
            authorAvatar: message.author.displayAvatarURL({ dynamic: true }),
            guild_id: ObjectId(`${db_values.GUILD._id}`),
            info: JSON.stringify({
                atk_n: args[0].toLowerCase(),
                atk_c: args[1].substring(1),
                nul_n: args[2].toLowerCase(),
                nul_c: args[3].substring(1),
                def_n: args[4].toLowerCase(),
                def_c: args[5].substring(1),
                end_date: date
            })
        }

        match_controller.create(matchData).then(() => {

            let matche = new Discord.MessageEmbed()
                .setTitle(`**Match** :crossed_flags: ${args[0]} / ${args[4]}`)
                .setColor('DARK_GREEN')
                .addFields(
                    {name: capitalize(args[0]), value: args[1], inline: true},
                    {name: capitalize(args[2]), value: args[3], inline: true},
                    {name: capitalize(args[4]), value: args[5], inline: true}
                )
                .setDescription(langF.time.replace('[time]', args[6]))
                .setFooter("Pronobot - ©2021")

            if (args[6] === undefined) {
                matche.setDescription(langF.no_time)
            }

            message.channel.send(matche)
        }).catch(err => console.error(err))
    }
}