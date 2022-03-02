const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombres: {
        type: String,
    },
    apellidos: {
        type: String
    },
    edad: {
        type: String
    }
})

UserSchema.methods.toJSON = function () { 
    const {__v, ...data} = this.toObject()
    return data
 }

module.exports = model( 'User', UserSchema )