const mongoose = require('mongoose')


const dbConnection = async () => {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((host) => {
            // console.log(`connection successfully with database ${host.connection.host}`)
        })
}

module.exports = dbConnection
