/* 
    Rutas de usuarios / Auth
    host + /api/auth
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/fieldValidators')
const { createUser, loginUser, renewToken } = require('../controllers/auth')
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.post( 
    '/new', 
    [ // midlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(), check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({ min: 6 }),
        fieldValidators
    ],
    createUser 
);

router.post(
    '/', 
    [
        check( 'email', 'El email es obligatorio' ).isEmail(),
        check( 'password', 'El password debe tener 6 caracteres' ).isLength({ min: 6 }), 
        fieldValidators
    ], 
    loginUser
);

router.get('/renew', validarJWT, renewToken );

module.exports = router;