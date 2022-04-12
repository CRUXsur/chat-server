const {response} = require('express');
const Usuario = require('../models/usuario');


const getUsuarios = async(req, res = response) => {
    
    const desde = Number(req.query.desde) || 0;

    //const usuarios = await Usuario.find();
    const usuarios = await Usuario
        .find({_id:{$ne:req.uid}})   //pongo filtros, retorno todos los id 
                                    //que no se encuentran en la req.id
        .sort('-online')            //lo ordena de manera descendete
                                    //empezando x los que estan conectados
        .skip(desde)
        .limit(20);                 //de 20 en 20 

    // necesitamos algo que responda {ok:true, msg:'getUsuario'}
    res.json({
        ok:true,
        usuarios
    })
}

module.exports = {
    getUsuarios
}