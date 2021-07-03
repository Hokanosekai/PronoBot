const mongoose = require('mongoose')

module.exports = async () => {
    await mongoose.connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Connect to MongoDB")
    }).catch(err => {
        console.log(err)
    })

    return mongoose
}