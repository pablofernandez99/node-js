const { Router } = require('express')
const { check } = require('express-validator')

const { actualizarImagen } = require('../controllers/uploads')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const { coleccionesPermitidas } = require('../helpers/db-validator')
const { validarArchivo } = require('../middlewares/validar-archivo')

const router = Router()

router.put('/:coleccion', [
    validarJWT,
    validarArchivo,
    check('coleccion').custom(c => coleccionesPermitidas(c, ['users'])),
    validarCampos
], actualizarImagen)

module.exports = router