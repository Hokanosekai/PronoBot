const user_controller = require('../../controllers/controller.user')

const name = 'toploose'
const category = 'general'

module.exports = {
    name,
    category,
    description: "Ranking by number of games lost",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member

        const langF = langFile.commands[category][name]
        
        let statsCommand = new Discord.MessageEmbed()
            .setTitle(langF.embed_title)
            .setFooter("Pronobot - ©2021")
            .setColor('BROWN')

        let users = []
        users = await user_controller.top({guild: db_values.GUILD._id, type: 'loose'}).then(users => {
            return users
        }).catch(err => console.error(err))

        if (users.length === 0) return message.channel.send(`[❌] <@${author.id}> ${langF.no_user}`)

        let s = ''
        for (let i = 0; i < users.length; i++) {
            s += i+1 +'. '+ users[i].userTag + " -  **" + users[i].loose + '**\n'
        }

        statsCommand.setDescription(s);

        message.channel.send(statsCommand);
    }
}