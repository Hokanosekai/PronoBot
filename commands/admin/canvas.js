const { matchCard } = require('../../canvas/card.stats')


module.exports = {
    name: "canvas",
    category: 'Admin',
    description: "Set the balance of an user",
    aliases: null,
    usage: '<@user> <new balance>',
    args: false,
    admin: true,
    loaded: false,

    run: async (message, args, client, langFile, db_values, Discord) => {

        console.log(await message.author.presence)

        const c = await client.users.cache.get(db_values.USER.userID)
        console.log(c.flags)

        const buffer = await matchCard(message.author.tag, message.author.displayAvatarURL({ format: 'png' }), 1)
        const attachment = new Discord.MessageAttachment(buffer, 'test.png')

        message.channel.send(attachment)

    }
}