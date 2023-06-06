const Usuario = require('../models/users')
const jwt = require('jsonwebtoken')

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe'
            })
        }

        if (!usuario.state) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado: false'
            })
        }

        req.usuario = usuario

        next()

    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}