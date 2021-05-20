const bet_model = require('../models/model.bet')

module.exports.get = ({_id, user, guild, match}) => {
    let t = {}
    if (_id) t = {_id: _id}
    else if (user) t = {user_id: user}
    else if (guild) t = {guild_id: guild}
    else if (match) t = {match_id: match}

    return new Promise((resolve, reject) => {
        bet_model.find(
            t,
            (err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            }
        ).populate({path: 'user_id', select: ['userID', 'userTag']})
            .populate('guild_id')
    })
}

module.exports.create = (betData) => {
    return new Promise((resolve, reject) => {
        bet_model.create(
            betData,
            (err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            }
        )
    })
}

module.exports.delete = ({_id, user, guild, match}) => {
    let t = {}
    if (_id) t = {_id: _id}
    else if (user) t = {user_id: user}
    else if (guild) t = {guild_id: guild}
    else if (match) t = {match_id: match}

    return new Promise((resolve, reject) => {
        bet_model.deleteMany(
            t,
            (err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            }
        )
    })
}