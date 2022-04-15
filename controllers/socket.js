const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

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

const grabarMensaje = async(payload) => {
    // el payload: deberia tener la siguiente sintaxis(esto yo espero)
    /*
        payload: {
            de: '',
            para:'',
            texto:''
        }
    */

    try {
        const mensaje = new Mensaje( payload );
        await mensaje.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = { //exporto por nombre
    usuarioConectado, 
    usuarioDesconectado,
    grabarMensaje
}