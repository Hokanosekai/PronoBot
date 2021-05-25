const guild_model = require('../models/model.guild')

module.exports.get = ({_id, guild}) => {

    let t = {}
    if (_id) t = {_id: _id}
    else if (guild) t = {serverID: guild}
    else t = { }

    return new Promise((resolve, reject) => {
        guild_model.find(t, ((err, docs) => {
            if (err) return reject(err)
            return resolve(docs)
        }))
    })
}

module.exports.create = (guildData) => {
    return new Promise((resolve, reject) => {
        guild_model.create(
            guildData,
            (err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            }
        )
    })
}

module.exports.update = ({_id, type, value}) => {
    let t = {}
    switch (type) {
        case 'prefix':
            t = {prefix: value}
            break
        case 'lang':
            t = {lang: value}
            break
        case 'notif':
            t = {notif: value}
            break
    }

    return new Promise((resolve, reject) => {
        guild_model.updateMany(
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

module.exports.delete = ({_id}) => {
    return new Promise((resolve, reject) => {
        guild_model.deleteMany(
            {
                _id: _id
            },
            (err, docs) => {
                if (err) return reject(err)
                return resolve(docs)
            }
        )
    })
}