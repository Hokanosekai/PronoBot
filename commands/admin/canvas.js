const {getLvl} = require("../../util/levels");
const { statCard } = require('../../canvas/card.stats')


module.exports = {
    name: "canvas",
    category: 'Admin',
    description: "Set the balance of an user",
    aliases: null,
    usage: '<@user> <new balance>',
    args: false,
    admin: true,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const c = await client.users.cache.get(db_values.USER.userID)

        console.log(getLvl(undefined, db_values.USER.xp))

        const buffer = await statCard(message.author, db_values.USER)
        const attachment = new Discord.MessageAttachment(buffer, 'test.png')

        await message.channel.send(attachment)

    }
}