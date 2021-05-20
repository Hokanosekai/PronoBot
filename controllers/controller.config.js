const config_model = require('../models/model.config')

module.exports.get = () => {
    return new Promise((resolve, reject) => {
        config_model.find({}, (err, docs) => {
            if (err) return reject(err)
            if (err) return resolve(docs)
        })
    })
}

module.exports.create = (configData) => {
    return new Promise((resolve, reject) => {
        config_model.create(configData, err => {
            if (err) return reject(err)
        })
    })
}


module.exports.update = ({_id, type}) => {
    let t = {}
    switch (type) {
        case 'bet':
            t = {$inc: {bet_count: 1}}
            break
        case 'match':
            t = {$inc: {match_count: 1}}
            break
        case 'user':
            t = {$inc: {user_count: 1}}
            break
        case 'guild':
            t = {$inc: {guild_count: 1}}
            break
    }

    return new Promise((resolve, reject) => {
        config_model.findOneAndUpdate({_id: _id},t,err => {
            if (err) return reject(err)
        })
    })
}