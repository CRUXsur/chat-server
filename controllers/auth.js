const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;


    try{
        const existeEmail = await Usuario.findOne({ email });
        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        //
        const usuario= new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        //*para grabar a la base de datos!!!!!
        await usuario.save();
        res.json({
            ok: true,
            //msg: 'Crear usuario!!!!'
            //body: req.body
            usuario
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });       
    }

}

module.exports = {
    crearUsuario
}