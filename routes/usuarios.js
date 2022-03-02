const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuarios-cont')

//subir usuario
router.post('/',
    usuariosController.crearUsuario
)

//obtener usuarios
router.get('/',
    usuariosController.obtenerUsuarios
)

// actualizar los datos del usuario
router.put('/:id', 
    usuariosController.actualizarUsuario
)

//eliminar usuario
router.delete('/:id',
    usuariosController.eliminarUsuario
)

module.exports = router