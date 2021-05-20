const { MessageEmbed, version: djsversion } = require('discord.js');
const os = require('os')
const ms = require('ms');
const cpuStat = require("cpu-stat");
const moment = require("moment")
const Discord = require("discord.js");

const name = 'botinfo'
const category = 'config'
 
module.exports = {
    name,
    category,
	description: 'Informations about the bot',
	aliases: ['bi'],
	usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile) => {
        
        let { version } = require("discord.js");

        const langF = langFile.commands[category][name]

        let embedStats = new Discord.MessageEmbed()
            .setTitle(langF.embed_title)
            .setColor("PURPLE")
            .addField(langF.creator, "@Hokanosekai#0001 & @zyksa#0001")
            .addField(langF.ram, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField(langF.run_time, `${ms(os.uptime() * 1000, { long: true })}`, true)
            //.addField("Utilisateurs :baby::skin-tone-2: ", `${bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`, true)
            //.addField("Serveurs   ", `${bot.guilds.size}`, true)
            .addField("CPU ", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("Discord.js ", `\`v${djsversion}\``, true)
            .addField("Version ", `\`v${version}\``, true)
            .addField("Node.js ", `\`${process.version}\``, true)
            .addField(langF.archi, `\`${os.arch()}\``, true)
            .addField(langF.platform, `\`\`${os.platform()}\`\``, true)
            .addField(langF.lang, "\`Javascript\`",true)
            .setFooter("Pronobot - ©2021")
    
        await message.channel.send(embedStats)

    }
}
 
