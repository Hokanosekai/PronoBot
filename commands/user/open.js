const userC = require('../../controllers/controller.user')
const config_controller = require('../../controllers/controller.config')

const {ObjectId} = require("bson");

const name = 'open'
const category = 'user'

module.exports = {
    name,
    category,
    description: "Open your account",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member

        const langF = langFile.commands[category][name]

        if (db_values.USER !== undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.have_account}`)

        const f = ObjectId(db_values.GUILD._id)

        const user = {
            userID: `${author.id}`,
            userAvatar: message.author.displayAvatarURL({ dynamic: true }),
            userTag: message.author.tag,
            guild_id: `${f}`,
            money: 20,
            win: 0,
            loose: 0,
            game: 0,
            gain_tot: 0,
            mise_tot: 0,
            daily_claimed: false
        }


        config_controller.update({_id: '60abcf4ba4151560f5ad248c', type: 'user'}).catch(err => console.error(err))

        userC.create(user).then(() => {
            return message.channel.send(`[✅] <@${author.id}> ${langF.success}`)
        }).catch(err => console.error(err))

    }
}