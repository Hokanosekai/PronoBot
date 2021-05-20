const Discord = require('discord.js')
const fs = require('fs')
const log = require('./log')
require('dotenv').config({path: '/root/botsdiscord/pronobot/.env'});

let token = process.env.DISCORD_TOKEN
let prefix = process.env.PREFIX
let bot_path = process.env.BOT_PATH


/* Setup new discord.js client */
const client = new Discord.Client({disableEveryone: true})

/* Create a new Collection for all commands */
client.commands = new Discord.Collection()

fs.readdir(`${bot_path}/commands/`, ((err, folders) => {
    if (err) throw err

    folders.forEach(folder => {
        const configFile = fs.readdirSync(`${bot_path}/commands/${folder}`).filter(jsonfile => jsonfile.endsWith('.json'))
        const files = fs.readdirSync(`${bot_path}/commands/${folder}`).filter(file => file.endsWith('.js'))

        const { loaded } = require(`${bot_path}/commands/${folder}/${configFile}`)
        console.log('\x1b[34m',`↳___________/${folder}/_____________↴`,'\x1b[37m')

        files.forEach(file => {
            const command = require(`${bot_path}/commands/${folder}/${file}`)
            /* If the category is not loaded */
            if (!loaded) return console.log(`   ↳ ${file}`,'\x1b[31m',`not loaded`,'\x1b[37m')
            else {
                /* If the category is loaded add the command to the collection */
                console.log(`   ↳ ${file}`,'\x1b[32m',`loaded`,'\x1b[37m')
                client.commands.set(command.name, command)
            }
        })
    })
}))

client.on('ready', () => {
    console.log('\x1b[35m','\n\n⇐=','\x1b[45m\x1b[32m','Prono is now ONLINE','\x1b[40m\x1b[35m','=⇒','\x1b[37m');



    /* Set the status of the client to "do not disturb" */
    client.user.setStatus('dnd')

    /* Set the activity of the client every 2sec */
    let i = 0
    setInterval(() => {
        const statuses = [
            `Prono Bot`,
            `$open`,
            `by Hokanosekai`,
            `by Zyksa`,
            `&help`
        ]
        client.user.setActivity(statuses[i])
        i = ++i % statuses.length
    }, 2000)

    // setInterval(() => {
    //     db.query("SELECT * FROM users", (err, res) => {
    //         if (err) throw err
    //
    //         res.forEach(u => {
    //             if (u.daily_claimed === 'true') {
    //                 db.query(`UPDATE users SET daily_claimed='false' WHERE id_user=${u.id_user}`, (err, res) => {
    //                     if (err) throw err
    //                 })
    //             }
    //         })
    //     })
    // }, (1000*60*60*24))

    /*24h -> (1000*60*60*24)*/
})

/* Messages Event Listener */
client.on('message', async message => {


    if (message.author.bot) return

    /*getUser(464810880035717122).then((res) => {
        message.channel.send(res[0].money)
    }).catch(err => {
        console.log(err)
    })
    getMatch(738325508927782933, r => {
        console.log(r)
    })*/

    if (message.content.startsWith(process.env.PREFIX)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()

        /* Retrieval of the command from the client's commands collection */
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        /* If the command doesn't exist in the collection */
        if (!command) return //message.channel.send(new Discord.MessageEmbed().setTitle(`**Commande** \`${prefix}${commandName}\``))
        log(`: ${commandName} ${args} / ${message.author.tag} | ${message.guild.id} - ${message.guild.name}`)
        message.delete()

        /* If the command is ADMIN */
        let t = message.author
        let isId = (t.id === '464810880035717122' || t.id === '209014375095336960')
        let isAdministrator = message.member.hasPermission('ADMINISTRATOR')
        let commandIsAdmin = command.admin

        console.log(isId, isAdministrator, commandIsAdmin)
        console.log(commandIsAdmin && (!isId && !isAdministrator))
        if (commandIsAdmin && !isAdministrator) return message.channel.send(`[❌] <@${message.author.id}> Vous n'avez pas la permission d'éxecuter cette commande`)

        /* If the command is send in dm do nothing */
        if (message.channel.type === 'dm') return message.reply('I can\'t execute this command inside DM')

        /* If the arguments of the command are incorrect */
        if (command.args && !args.length){
            let param = new Discord.MessageEmbed()
                .setTitle(`**Commande** \`${prefix}${command.name}\``)
                .setColor('#ff0000')
                .setDescription(`${message.author}, Les arguments de la commande sont invalides`)
            if (command.usage){
                param.setDescription(`${message.author}, Les arguments de la commande sont invalides \nVeuillez entrer des arguments du type\n\`${prefix}${command.name} ${command.usage}\``)
            }
            return message.channel.send(param)
        }

        /* Run the command */
        try{
            command.run(message, args, client)
        } catch (error) {
            console.error(error)
            await message.channel.send(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`**Commande** \`${prefix}${command.name}\``)
                .setDescription(`${message.author}, Une erreur c'est produite lors de l'éxecution de la commande`)
            )
        }
    }
})

/* Login the client bot with the Discord API */
client.login(token)