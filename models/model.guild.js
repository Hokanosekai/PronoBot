const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reqString = {
    type: String,
    required: true
}

const modelGuild = new Schema({
    serverID: reqString,
    serverAvatar: reqString,
    serverName: reqString,
    prefix: reqString,
    lang: reqString,
    notif: String
})

const model = mongoose.model("guildmodels", modelGuild)

module.exports = model