const mongoose = require('mongoose')

const Schema = mongoose.Schema

const modelConfig = new Schema({
    bet_count: "Number",
    match_count: "Number",
    user_count: "Number",
    guild_count: "Number"
})

const model = mongoose.model("configmodels", modelConfig)

module.exports = model