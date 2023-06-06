const bcryptjs = require('bcryptjs')

const Usuario = require('../models/users')

const { generarJWT } = require("../helpers/generar-jwt")

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Verificar si email existe
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.json({
                msg: 'Usuario no existe'
            })
        }

        // Verificar si el usuario está activo
        if (!usuario.state) {
            return res.json({
                msg: 'Usuario no está activo'
            })
        }

        // Comparar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.json({
                msg: 'La contraseña no es correcta'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            msg: 'Login ok',
            usuario,
            token
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'ALgo ha salido mal - Hable con el administrador'
        })
    }
}

module.exports = {
    login
}