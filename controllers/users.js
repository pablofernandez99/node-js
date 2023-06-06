const bcryptjs = require('bcryptjs')

const { generarJWT } = require('../helpers/generar-jwt')

const Usuario = require('../models/users')

const getUser = async (req, res) => {
    const { id } = req.usuario

    const usuario = await Usuario.findById(id)

    const { name, email, img, webUrl, instagram } = usuario

    const imagePath = img ? `http://localhost:8080/uploads/users/${img}` : undefined

    res.json({
        name,
        email,
        img: imagePath,
        webUrl,
        instagram
    })
}

const postUsers = async (req, res) => {
    const { name, email, password } = req.body

    const usuario = new Usuario({ name, email, password })

    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()

    const token = await generarJWT(usuario.id)

    res.json({
        msg: 'Usuario creado',
        usuario,
        token
    })

}

const updateUser = async (req, res) => {

    const { id } = req.usuario
    const { _id, password, email, google, state, ...rest } = req.body

    const usuario = await Usuario.findByIdAndUpdate(id, rest, {new: true})

    const imagePath = `http://localhost:8080/uploads/users/${usuario.img}`

    res.json({
        msg: "Datos actualizados correctamente!",
        name: usuario.name,
        email: usuario.email,
        img: imagePath,
        webUrl: usuario.webUrl,
        instagram: usuario.instagram,
    })

}

module.exports = {
    getUser,
    postUsers,
    updateUser
}