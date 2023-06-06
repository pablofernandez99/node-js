const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        })
        console.log('Database conectada!')
    } catch (error) {
        console.log(error.message)
        throw new Error('Error al conectar la base de datos')
    }
}

module.exports = {
    dbConnection
}