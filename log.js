const fs = require('fs')

module.exports = (action) => {
    const date = require('date-and-time')
    const now = new Date()
    const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
    fs.appendFile(`${process.env.BOT_PATH}/logs.txt`, (value+action+'\n'), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(value + action);
    })
}