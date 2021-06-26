const dateformat = require('dateformat')
const Topgg = require('@top-gg/sdk')
const user_controller = require('../../controllers/controller.user')

const name = 'vote'
const category = 'user'

module.exports = {
    name,
    category,
    description: "Get reward for voting on top.gg",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const USER = db_values.USER

        const langF = langFile.commands[category][name]

        const topgg = new Topgg.Api(process.env.TOPGG_TOKEN)

        let voted = await topgg.hasVoted(message.author.id)
        const restTime = USER.voted - Date.now();

        if (voted && restTime <= 0) {
            await user_controller.update({_id: USER._id, type: 'money', value: USER.money + 10})
            await user_controller.update({_id: USER._id, type: 'voted', value: (Date.now() + (1000 * 60 * 60 * 11))});
            await user_controller.update({_id: USER._id, type: 'nb_vote', value: USER.nb_vote + 1});
            return message.channel.send(`[✅] <@${USER.userID}> ${langF.has_voted}`)
        }

        if (voted && restTime > 0) {
            return message.channel.send(`[❌] <@${USER.userID}> ${langF.next_time.replace('[time]', dateformat(new Date(restTime).getTime(), "HH'h'MM'min'ss'sec' UTC"))}`)
        }

        if (!voted && (restTime <= 0 || restTime === undefined)) {
            return message.channel.send(`[❌] <@${USER.userID}> ${langF.need_vote}\n\n https://top.gg/bot/835256483356737546/vote`)
        }

        return message.channel.send(`[❌] <@${USER.userID}> ${langF.not_voted.replace('[time]', dateformat(new Date(restTime).getTime(), "HH'h'MM'min'ss'sec' UTC"))}\n\n (https://top.gg/bot/835256483356737546/vote)`)
    }
}