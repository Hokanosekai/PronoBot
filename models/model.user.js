const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reqString = {
    type: String,
    required: true
}

const modelUser = new Schema({
    userID: reqString,
    userAvatar: reqString,
    userTag: reqString,
    guild_id: {type: Schema.Types.ObjectId, ref: "guildmodels", required: true},
    money: {type: "Number"},
    win: {type: "Number"},
    loose: {type: "Number"},
    game: {type: "Number"},
    gain_tot: {type: "Number"},
    mise_tot: {type: "Number"},
    daily_claimed: {type: "Boolean"},
    xp: {type: "Number"},
    level: {type: "Number"},
    voted: {type: "Number"},
    nb_vote: {type: "Number"}
})

const model = mongoose.model("usermodels", modelUser)

module.exports = model