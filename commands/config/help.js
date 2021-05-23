const fs = require('fs');
const pagination = require('discord.js-pagination')

module.exports = {
    name: 'help',
    category: 'Config',
    description: 'List all the commands and view a specific one',
    aliases: ['commands','h'],
    usage: '<command name>',
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const { commands } = message.client;

        const prefix = db_values.GUILD.prefix

        if (!args.length) {

            const pages = []

            const folders = fs.readdirSync('/root/botsdiscord/pronobot/commands').filter(folder => folder)
            for(const folder of folders){
                let help = new Discord.MessageEmbed()
                    .setTitle(`**Commande** \`${prefix}help\``)
                    .setColor('#0099ff')

                const files = fs.readdirSync(`/root/botsdiscord/pronobot/commands/${folder}`).filter(file => file.endsWith('.js'))
                const emotes = fs.readdirSync(`/root/botsdiscord/pronobot/commands/${folder}`).filter(file => file.endsWith('.json'))

                const { emote, name, loaded } = require(`../../commands/${folder}/${emotes}`)

                let all = []
                files.forEach(file => {
                    all.push(prefix+file.substr(0,file.length-3))
                })

                all = all.join("\n")

                if(loaded){
                    help.addField(`${emote} ---- ${name} ---- ${emote}`,'\`'+all+'\n\`')
                }
                help.addField(`\nTu peux voir l'aide d'une commande en particulier avec: `,`\`${prefix}help <commande>\``);
                pages.push(help)
            }


            const emojiList = ['⏪','⏩']

            const timeout = '120000'

            return pagination(message, pages, emojiList, timeout)
        }

        let help = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setFooter("Pronobot - ©2021")

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            help.setDescription('Cette commande n\'existe pas')
            return message.channel.send(help);
        }

        if (command.name) help.setTitle(`**Commande** \`${prefix}${command.name}\``)
        if (command.category) help.addField(`:file_folder: Catégory :file_folder: :\n`,`${command.category}\n`);
        if (command.aliases) help.addField(`:congratulations: Aliases :congratulations: :\n`,`${command.aliases.join(', ')}\n`);
        if (command.description) help.addField(`:pencil: Description :pencil: :\n`,`${command.description}\n`);
        if (command.usage) help.addField(`:keyboard: Usage :keyboard: :\n`,`\`${prefix}${command.name} ${command.usage}\`\n`);
        if (command.cooldown) help.addField(`:timer: Cooldown :timer: :\n`,`${command.cooldown || 3} secondes`);

        message.channel.send(help);
    },
};