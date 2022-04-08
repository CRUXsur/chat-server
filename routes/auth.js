/*
        path:api/login   
*/

const { Router } = require('express');
const {crearUsuario} = require('../controllers/auth');
const router = Router(); // es una funcion NO una Clase

// configuracion de la primera ruta
router.post('/new', crearUsuario);


module.exports= router; 