const express = require('express')
const cors = require('cors')

const { dbConex } = require('../database/configdb');

const bodyParser = require('body-parser')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        //path
        this.path = {
            usuarios: '/api/usuarios',
        }

        //conectar la bd
        this.conexionDB()

        //Middlewares
        this.middlewares()
        
        //rutas
        this.routes()
    }

    async conexionDB () {
        await dbConex()
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //bodyParser
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
    }

    routes() {
        this.app.use(this.path.usuarios, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port)
        })
    }
}


module.exports = Server