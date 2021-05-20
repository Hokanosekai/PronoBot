const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reqString = {
    type: String,
    required: true
}

const modelBet = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: "usermodels", required: true},
    match_id: {type: Schema.Types.ObjectId, ref: "matchmodels", required: true},
    guild_id: {type: Schema.Types.ObjectId, ref: "guildmodels", required: true},
    info: reqString,
    create_at: { type: Date, default: Date.now}
})

const model = mongoose.model("betmodels", modelBet)

module.exports = model