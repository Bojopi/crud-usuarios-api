const express = require('express')
const cors = require('cors')

const { dbConex } = require('../database/configdb');

const bodyParser = require('body-parser')

//controladores
const { response, request } = require("express");
const Usuarios = require("./usuarios-model");

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)

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

        //Sockets
        this.sockets()
    }

    async conexionDB () {
        await dbConex()
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //directorio público
        this.app.use(express.static('public'))

        //bodyParser
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
    }

    routes() {
        this.app.use(this.path.usuarios, require('../routes/usuarios'))
    }

    sockets() {
        this.io.on('connection', socket => {

            socket.on('client:nuevousuario', data => {
                // console.log(data.nombres)
                async (req, res = response) => {
                    var nombres = data.nombres
                    var apellidos = data.apellidos
                    var edad = data.edad
                    try {
                      const newUsuario = new Usuarios({ nombres, apellidos, edad })
                      await newUsuario.save()
                      res.status(200).json({
                        msg: 'Usuario guardado correctamente',
                        newUsuario
                      })
                    } catch (error) {
                      console.log(error)
                      res.status(400).json({error, msg: 'aqui llegó el error'})
                    }  
                  };
            })

            socket.on('disconnect', () => {
                console.log('cliente desconectado')
            })
        })
    }

    listen(){
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port)
        })
    }
}


module.exports = Server