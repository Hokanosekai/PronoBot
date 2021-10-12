const {capitalize, roomCode} = require("../../util/functions");
const {ObjectId} = require("bson");

const { matchCard } = require('../../canvas/card.match')
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

        let atk_c = parseFloat(args[1].substring(1).replace(',', '.'))
        let nul_c = parseFloat(args[3].substring(1).replace(',', '.'))
        let def_c = parseFloat(args[5].substring(1).replace(',', '.'))

        console.log(typeof atk_c, typeof nul_c, typeof def_c)

        if (
            typeof atk_c !== "number"
            || typeof nul_c !== "number"
            || typeof def_c !== "number"
            || isNaN(atk_c)
            || isNaN(nul_c)
            || isNaN(def_c)
        ) return message.channel.send(`[❌] <@${author.id}> ${langF.number}`)

        const matchData = {
            code: roomCode(),
            authorID: author.id,
            authorTag: message.author.tag,
            authorAvatar: message.author.displayAvatarURL({ dynamic: true }),
            guild_id: ObjectId(`${db_values.GUILD._id}`),
            info: JSON.stringify({
                atk_n: args[0].toLowerCase(),
                atk_c: atk_c,
                nul_n: args[2].toLowerCase(),
                nul_c: nul_c,
                def_n: args[4].toLowerCase(),
                def_c: def_c,
                end_date: date
            })
        }

        match_controller.create(matchData).then(async () => {

            const n = db_values.GUILD.notif? db_values.GUILD.notif : author.id
            //await message.channel.send(`[✅] ${langF.success}`) //<@&${n}>

            const buffer = await matchCard(
                'New Match',
                capitalize(args[0]),
                capitalize(args[4]),
                [
                    args[1].replace(',', '.'),
                    args[3].replace(',', '.'),
                    args[5].replace(',', '.')
                ],
                matchData.code
            )
            const attachment = new Discord.MessageAttachment(buffer, args[0]+'-'+args[4]+'.png')


            /*let matche = new Discord.MessageEmbed()
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
            }*/

            await message.channel.send(attachment)
        }).catch(err => console.error(err))
    }
}
