const path = require('path')
const fs = require('fs')

const Usuario = require('../models/users')

const { subirArchivo } = require('../helpers/subir-archivo')

const actualizarImagen = async (req, res) => {
    const { coleccion } = req.params
    const { id } = req.usuario

    let modelo

    try {
        switch (coleccion) {
            case "users":
                modelo = await Usuario.findById(id)

                if (!modelo) {
                    return res.status(400).json({
                        msg: `No existe usuario con id: ${id}`
                    })
                }

                break;

            default:
                return res.status(500).json({
                    msg: "Se me olvido validar esto"
                })
        }

        const archivo = await subirArchivo(req.files, undefined, coleccion)

        // limpiar imagenes previas
        if (modelo.img) {
            const pathImagen = path.join(__dirname, '../public/uploads', coleccion, modelo.img)

            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen)
            }
        }

        modelo.img = archivo

        await modelo.save()

        const { name, email, img } = modelo

        const imagePath = `http://localhost:8080/uploads/users/${img}`

        res.json({
            msg: "Imagen actualizada!",
            name,
            email,
            img: imagePath
        })

    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

module.exports = {
    actualizarImagen
}