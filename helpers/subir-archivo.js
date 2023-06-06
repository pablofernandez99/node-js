const { v4: uuidv4 } = require('uuid')
const path = require('path')

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jepg', 'svg', 'gif'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files
        const nombreCortado = file.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]

        // Validar extension
        if (!extensionesValidas.includes(extension)) {
            return reject('Tipo de archivo no soportado!')
        }

        const nombreTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../public/uploads', carpeta, nombreTemp)

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }
        })

        resolve(nombreTemp)
    })
}

module.exports = {
    subirArchivo
}