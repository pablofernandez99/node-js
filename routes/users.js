const { Router } = require('express')
const { check } = require('express-validator')

const { postUsers, getUser, updateUser } = require('../controllers/users')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const { emailExiste } = require('../helpers/db-validator')

const router = Router()

router.get('/id', [
    validarJWT,
    validarCampos
], getUser)

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es inválido').isEmail(),
    check('email').custom(emailExiste),
    check('password', 'La contraseña debe ser más de 6 letras').isLength({ min: 6 }),
    validarCampos
], postUsers)

router.put('/', [
    validarJWT,
    validarCampos
], updateUser)

module.exports = router