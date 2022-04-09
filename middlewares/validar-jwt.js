const jwt = require('jsonwebtoken');

// creamos el middleware que es una funcion
const validarJWT = ( req, res, next ) => {

    // Leer token
    const token = req.header('x-token');
    // hay o no hay ningun token?
    if ( !token ) {
        return res.status(401).json({ // 401 Unauthorized
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }




}


module.exports = {
    validarJWT
}


