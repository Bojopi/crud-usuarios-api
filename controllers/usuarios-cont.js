const { response, request } = require("express");
const Usuarios = require("../models/usuarios-model");


const obtenerUsuarios = async (req, res = response) => {
  try {
    const usuarios = await Usuarios.find()
    const total = await Usuarios.countDocuments()
    res.status(200).json({
      total,
      usuarios
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}


const crearUsuario = async (req, res = response) => {
  const {
    nombres,
    apellidos,
    edad
  } = req.body;

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


const actualizarUsuario = async (req = request, res = response) => {

  const { id } = req.params

  const { nombres = '', apellidos = '', edad = '' } = req.body

  try {
    const usuario = await Usuarios.findByIdAndUpdate(id, { nombres, apellidos, edad })
    console.log(usuario)
    res.json({usuario})
  } catch (error) {
    res.status(400).json({error})
  }
};

const eliminarUsuario = async (req = request, res = response) => {
    const { id } = req.params

    try {
        await Usuarios.findByIdAndDelete( id )
        res.json({ msg: 'eliminado' })
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarios
};
