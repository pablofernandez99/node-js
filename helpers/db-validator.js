const Usuario = require('../models/users')

const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({ email })

    if (existeEmail) throw new Error('Ese correo ya está registrado por otro usuario')
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion)

    if (!incluida) {
        throw new Error(`La coleccion no es permitida, ${colecciones}`)
    }

    return true
}

module.exports = {
    emailExiste,
    coleccionesPermitidas
}