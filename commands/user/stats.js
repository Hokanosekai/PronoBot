const name = 'stats'
const category = 'user'

module.exports = {
    name,
    category,
    description: "View your stats",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member

        const langF = langFile.commands[category][name]

        const USER = db_values.USER

        let statsCommand = new Discord.MessageEmbed()
            .setTitle(`${langF.embed_title} @${message.author.tag}`)
            .setFooter("Pronobot - ©2021")
            .setColor('YELLOW')
            .setThumbnail(author.avatar)

        if (USER === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.no_account}`)

        let taux = USER.game? (USER.win * 100) / USER.game : 0

        statsCommand.addFields(
            { name: langF.nb_win, value: ':trophy: '+ USER.win, inline: true },
            { name: langF.nb_loose, value: ':poop: ' + USER.loose, inline: true },
            { name: langF.nb_game, value: ':video_game: ' + USER.game, inline: true },
            { name: langF.taux, value: ':bar_chart: ' + Math.round(taux*100)/100+'%', inline: true },
            { name: langF.gain, value: USER.gain_tot + ' :coin:', inline: true },
            { name: langF.mise, value: USER.mise_tot + ' :coin:', inline: true },
        )
        message.channel.send(statsCommand);
    }
}