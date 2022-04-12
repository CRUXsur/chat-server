/*
        path:api/usuarios
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {getUsuarios} = require('../controllers/usuarios');


const router = Router(); // es una funcion NO una Clase


router.get('/', validarJWT, getUsuarios);


// cuando alguien necesite este archivo,
// lo que va a jalar es este router
module.exports= router; 