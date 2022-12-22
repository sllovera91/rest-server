
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-Validators');
const { validarCampos } = require('../middlewares/validar-Campos');

const router = Router();


router.get('/', usuariosGet)

router.put('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut)

router.post('/',[
    check('nombre', 'El nombre  es obligatorio').not().isEmpty(),
    check('password', 'El password  es minimo seis letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo', 'El correo ya existe').custom( emailExiste ),
    // check('rol', 'El rol no es valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuariosPost );

router.delete('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete)



module.exports = router