
const socket = io()

const formulario = document.querySelector('#usuarioForm')

const nombres = document.querySelector('#nombres')
const apellidos = document.querySelector('#apellidos')
const edad = document.querySelector('#edad')

formulario.addEventListener('submit', e => {
    e.preventDefault()

    socket.emit('client:nuevousuario', {
        nombres: nombres.value,
        apellidos: apellidos.value,
        edad: edad.value
    })
})