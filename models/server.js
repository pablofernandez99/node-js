const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.PORT = process.env.PORT || 8080

        // database
        this.conectarDB()

        // Middlewares
        this.midlewares()

        // Routes
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    routes() {
        this.app.use('/auth', require('../routes/auth'))
        this.app.use('/api/users', require('../routes/users'))
        this.app.use('/api/uploads', require('../routes/uploads'))
    }

    midlewares() {

        this.app.use(cors())

        this.app.use(express.json())

        this.app.use(express.static('public'))

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }))

    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server is running on port ${this.PORT}`)
        })
    }
}

module.exports = Server