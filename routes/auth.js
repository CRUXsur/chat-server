/*
        path:api/login   
*/

const { Router } = require('express');
const { check } = require('express-validator');

const {crearUsuario} = require('../controllers/auth');
const { validarCampos} = require('../middlewares/validar-campos');
const router = Router(); // es una funcion NO una Clase

// configuracion de la primera ruta
//router.post('/new', crearUsuario);

// configuracion de la primera ruta
router.post('/new', [
    // hacemos las validaciones!, con midlewares arreglo JS
    // el 2do argumento es un midleware
    // aqui defino varios midlewares
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contrasena es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
], crearUsuario );


module.exports= router; 