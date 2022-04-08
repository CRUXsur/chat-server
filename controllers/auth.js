const {response} = require('express');
const Usuario = require('../models/usuario');

const crearUsuario = async (req, res = response) => {

    const usuario= new Usuario(req.body);
    //*para grabar a la base de datos!!!!!
    await usuario.save();
    res.json({
        ok: true,
        //msg: 'Crear usuario!!!!'
        body: req.body
    });
}

module.exports = {
    crearUsuario
}