const jwt = require('jsonwebtoken');

//JWT: tiene tres partes: header, payload y firma
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