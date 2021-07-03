const log = require('../../util/log')

const user_controller = require('../../controllers/controller.user')
const match_controller = require('../../controllers/controller.match')
const bet_controller = require('../../controllers/controller.bet')

module.exports = {
    name: "message",
    loaded: true,

    execute: async (message, client, Discord, mongoose) => {

        if (message.author.bot || message.channel.type === 'dm') return

        const tmpG = global.GUILD.find(e => e.serverID === message.guild.id)
        const GUILD = tmpG? tmpG : {prefix: '&', lang: 'fr', undef: true}
        //console.log(tmpG, GUILD)
        if (!message.content.startsWith(GUILD.prefix)) return

        if (GUILD.undef === true) return message.channel.send('Your server is not registered try to evict the bot and then re-add it')

        //let auth_serv = ['744192330344431797', '834793864677425153', '464811353228574731']
        //if (!auth_serv.includes(message.guild.id)) return message.channel.send(`[❌] <@${message.member.id}> Le bot est en maintenance merci de patienter.`)

        let USER = await user_controller.get({guild: GUILD._id, user: message.member.id}).then(u => {
            return u[0]
        }).catch(err => console.error(err))

        let MATCH = await match_controller.get({guild: GUILD._id}).then(m => {
            return m[0]
        }).catch(err => console.error(err))

        let BET = undefined
        if (USER !== undefined) {
            BET = await bet_controller.get({user: USER._id}).then(b => {
                return b[0]
            }).catch(err => console.error(err))
        }

        let db_values = {
            GUILD: GUILD,
            USER: USER,
            MATCH: MATCH,
            BET: BET
        }


        const langFile = require(`../../lang/lang.${GUILD.lang}.json`)
        const langF = langFile.events.client.message


        const args = message.content.slice(GUILD.prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()


        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        if (!command) return


        log(`: ${commandName} ${args} / ${message.author.tag} | ${message.guild.id} - ${message.guild.name}`)
        message.delete()


        let t = message.author
        let isId = (t.id === '464810880035717122' || t.id === '209014375095336960')
        let isAdministrator = message.member.hasPermission('ADMINISTRATOR')
        let commandIsAdmin = command.admin

        if (commandIsAdmin && (!isId && !isAdministrator)) return message.channel.send(`[❌] <@${message.author.id}> ${langF.no_permission}`)


        if (message.channel.type === 'dm') return message.reply(langF.not_in_dm)


        if (command.args && !args.length){
            let param = new Discord.MessageEmbed()
                .setTitle(`**${langF.embed_title}** \`${GUILD.prefix}${command.name}\``)
                .setColor('#ff0000')
                .setDescription(`${message.author}, ${langF.args_no_usage}`)
            if (command.usage){
                param.setDescription(`${message.author}, ${langF.args_usage}\`${GUILD.prefix}${command.name} ${command.usage}\``)
            }
            return message.channel.send(param)
        }


        try{
            command.run(message, args, client, langFile, db_values, Discord)
        } catch (error) {
            console.error(error)
            message.channel.send(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`**${langF.embed_title}** \`${GUILD.prefix}${command.name}\``)
                .setDescription(`${message.author}, ${langF.command_error}`)
            )
        }
    }
}