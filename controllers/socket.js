const Usuario = require('../models/usuario');

//* async porque voy a trabajar con la base de datos
const usuarioConectado = async(uid='') =>{
    //
    const usuario = await Usuario.findById(uid);
    //actualizo el online en la db
    usuario.online = true;
    //grabo en la base de datos
    await usuario.save();

    return usuario;
}
const usuarioDesconectado = async(uid='') =>{
    //
    const usuario = await Usuario.findById(uid);
    //actualizo el online en la db
    usuario.online = false;
    //grabo en la base de datos
    await usuario.save();

    return usuario;
}

module.exports = { //exporto por nombre
    usuarioConectado, 
    usuarioDesconectado
}