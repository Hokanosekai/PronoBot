const fs = require('fs')

const bot_path = process.env.BOT_PATH

module.exports = (client, Discord) => {
    const load_dirs = (dirs) => {
        const events_files = fs.readdirSync(`${bot_path}/commands/${dirs}`).filter(file => file.endsWith('js'))

        for (const file of events_files) {
            const command = require(`${bot_path}/commands/${dirs}/${file}`)
            if (!command.loaded) console.log(`    > ${command.name}   not loaded`)
            else {
                client.commands.set(command.name, command)
                console.log(`    > ${command.name}   loaded`)
            }

        }
    }

    ['admin', 'config', 'general', 'match', 'user'].forEach(e => {
        console.log(`--${e}--`)
        load_dirs(e)
    })
}