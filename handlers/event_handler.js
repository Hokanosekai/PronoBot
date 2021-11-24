const fs = require('fs')

const bot_path = process.cwd();

module.exports = (client, Discord) => {
    const load_dirs = (dirs) => {
        const events_files = fs.readdirSync(`${bot_path}/events/${dirs}`).filter(file => file.endsWith('js'))

        for (const file of events_files) {
            const event = require(`${bot_path}/events/${dirs}/${file}`)
            if (!event.loaded) console.log(`    > ${event.name}   not loaded`)
            else {
                client.on(event.name, (...args) => event.execute(...args, client, Discord))
                console.log(`    > ${event.name}   loaded`)
            }
        }
    }

    ['client', 'guild'].forEach(e => {
        console.log(`--${e}--`)
        load_dirs(e)
    })
}
