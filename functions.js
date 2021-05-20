const {guilds_list} = require("./guildConfig");
module.exports = {
    capitalize: (str) => {
        return str.replace(/^\w/, c => { return c.toUpperCase()})
    }
}