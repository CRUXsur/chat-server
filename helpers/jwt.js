const jwt = require('jsonwebtoken');

//JWT: tiene tres partes: header, payload y firma
//* este token en Flutter, lo tomamos y almacenarlo en algun lugar seguro  
//* del dispositivo para utilizarlo como metodo de autenticacion de nuestro
//* servicio y tb como metodo de autenticacion de nuestra comunicaion por sockets
//*  */
//funcion
const generarJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };
        //lo firmamos
        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, ( err, token ) => {

            if ( err ) {
                // no se pudo crear el token
                reject('No se pudo generar el JWT');

            } else {
                // TOKEN!
                resolve( token );
            }

        })

    });


}


module.exports = {
    generarJWT
}