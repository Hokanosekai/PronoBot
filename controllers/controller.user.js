const user_model = require('../models/model.user')

module.exports.get = ({_id, guild, user}) => {
    let t = {}
    if (_id) t = {_id: _id}
    else if (guild && user === undefined) t = {guild_id: guild}
    else if (guild && user) t = {guild_id: guild, userID: user}

    return new Promise((resolve, reject) => {
        user_model.find(t, (err, docs) => {
            if (err) return reject(err)
            return resolve(docs)
        })
            .populate({path:'guild_id', select:['uuid', 'serverID', 'serverName']})
    })
}

module.exports.top = ({guild, type}) => {
    let s = {}
    switch (type) {
        case 'money':
            s = {money: -1}
            break
        case 'loose':
            s = {loose: -1}
            break
        case 'win':
            s = {win: -1}
            break
        case 'game':
            s = {game: -1}
            break
    }

    return new Promise((resolve, reject) => {
        user_model.find({guild_id: guild}, (err, docs) => {
            if (err) return reject(err)
            return resolve(docs)
        })
            .sort(s)
            .limit(10)
    })
}

module.exports.create = async (userData) => {
    return new Promise((resolve, reject) => {
        user_model.create(userData, (err, docs) => {
            if (err) return reject(err)
            return resolve(docs)
        })
    })
}

module.exports.update = ({_id, type, value}) => {
    let t
    switch (type) {
        case 'money':
            t = {money: value}
            break;
        case 'tag':
            t = {tag: value}
            break;
        case 'game':
            t = {game: value}
            break;
        case 'win':
            t = {win: value}
            break;
        case 'loose':
            t = {loose: value}
            break;
        case 'gain':
            t = {gain_tot: value}
            break;
        case 'mise':
            t = {mise_tot: value}
            break;
        case 'daily':
            t = {daily_claimed: value}
            break;
        case 'avatar':
            t = {userAvatar: value}
            break;
        case 'nb_vote':
            t = {nb_vote: value}
            break;
        case 'voted':
            t = {voted: value}
            break;
        case 'xp':
            t = {xp: value}
            break;
    }

    return new Promise(async (resolve, reject) => {
        await user_model.updateOne(
            {
                _id: _id
            },
            t,
            (err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            }
        )
    })
}

module.exports.delete = ({_id, guild, user}) => {
    let t = {}
    if (_id) t = {_id: _id}
    else if (guild) t = {guild_id: guild}
    else if (user) t = {userID: user}

    return new Promise((resolve, reject) => {
        user_model.deleteMany(
            t,
            (err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            }
        )
    })
}