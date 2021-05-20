const match_model = require('../models/model.match')

module.exports.get = ({_id, guild}) => {
    let t = {}
    if (_id) t = {_id: _id}
    else if (guild) t = {guild_id: guild}

    return new Promise((resolve, reject) => {
        match_model.find(
            t,
            (err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            }
        ).populate('guild_id')
    })
}

module.exports.create = (matchData) => {
    return new Promise((resolve, reject) => {
        match_model.create(
            matchData,
            (err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            }
        )
    })
}

module.exports.delete = ({_id, guild}) => {
    let t = {}
    if (_id) t = {_id: _id}
    else if (guild) t = {guild_id: guild}

    return new Promise((resolve, reject) => {
        match_model.deleteMany(
            t,
            (err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            }
        )
    })
}