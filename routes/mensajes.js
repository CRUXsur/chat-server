//nos creamos nuestra ruta, 
//cual es el path?
/*
        path: /api/mensajes
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerChat } = require('../controllers/mensajes');

const router = Router(); // es una funcion NO una Clase


router.get('/:de', validarJWT, obtenerChat);


// cuando alguien necesite este archivo,
// lo que va a jalar es este router
module.exports= router; 