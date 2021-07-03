const {setGuildInfo} = require("../../util/guildConfig");

const guild_controller = require('../../controllers/controller.guild')

const name = 'setlang'
const category = 'config'

module.exports = {
    name,
    category,
    description: 'Change the default language of the bot',
    aliases: null,
    usage: '<lang (english/en - french/fr)>',
    args: true,
    admin: true,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.author

        const langF = langFile.commands[category][name] 

        var t
        switch (args[0].toLowerCase()) {
            case 'english':
                t = 'en';
                break;
            case 'en':
                t = 'en';
                break;
            case 'anglais':
                t = 'en';
                break;
            case 'fr':
                t = 'fr';
                break;
            case 'french':
                t = 'fr';
                break;
            case 'francais':
                t = 'fr';
                break;
            default:
                t = null;
                break;
        }

        if (t === null) return message.channel.send(`[❌] <@${author.id}> ${langF.no_lang}`)

        guild_controller.update({_id: db_values.GUILD._id, type:'lang', value:t}).then(() => {
            setGuildInfo()
            return message.channel.send(`[✅] <@${author.id}> ${langF.success}`)
        })
    }
}