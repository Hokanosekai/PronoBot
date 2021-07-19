const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reqString = {
    type: String,
    required: true
}

const modelMatch = new Schema({
    code: reqString,
    authorID: reqString,
    authorTag: reqString,
    authorAvatar: reqString,
    guild_id: {type: Schema.Types.ObjectId, ref: "guildmodels", required: true},
    info: reqString,
    create_at: { type: Date, default: Date.now}
})

const model = mongoose.model("matchmodels", modelMatch)

module.exports = model