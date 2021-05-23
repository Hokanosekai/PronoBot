const user_controller = require('../../controllers/controller.user')

const name = 'coinflip'
const category = 'user'

module.exports = {
    name: name,
    description: "Flip a coin and win money",
    category: category,
    aliases: ['cf'],
    usage: '<money> <face of coin [head or tail]>',
    admin: false,
    args: true,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const USER = db_values.USER

        const langF = langFile.commands[category][name]

        if (args.length !== 2) return

        if (args[0] <= 0) return message.channel.send(langF.negate)

        if (!['head', 'tail'].includes(args[1])) return message.channel.send(langF.no_usage)

        if (USER === undefined) return message.channel.send(langF.no_account)

        if (args[0] > USER.money) return message.channel.send(langF.no_money)

        const money = USER.money
        const stake = args[0]
        const bet = args[1]

        user_controller.update({_id: USER._id, type: 'money', value: money - stake}).catch(err => console.error(err))

        const tot_mise = (stake*100)/money

        const gain = Math.floor(stake*(tot_mise/100))

        const result = Math.floor(Math.random() * 2)

        let face = 'head'
        let image = 'https://pronobot.top/api/heads.webp'

        if (result === 1) {
            face = 'tail'
            image = 'https://pronobot.top/api/tails.webp'
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`It's ${face}`)
            .setImage(image)
            .setDescription(`**You loose ${stake}:coin:**`)


        if (bet === face) {
            embed.setDescription(`**You win ${parseInt(stake) + gain}:coin:**`)
            user_controller.update({_id: USER._id, type: 'money', value: money + parseInt(stake) + gain}).catch(err => console.error(err))
        }

        message.channel.send(embed)

    }
}