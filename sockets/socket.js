const { Server } = require('socket.io');
const { comprobarJWT } = require('../helpers/jwt');
const {usuarioConectado, usuarioDesconectado} = require('../controllers/socket')
const {io} = require('../index');


//Mensajes de Sockets
io.on('connection', (client) =>{
    console.log('Cliente conectado');

    //pregunta del millon! : como se que el cliente
    //o el JWS, atraves de los sockets
    //cliente con JWT?
    //console.log(client.handshake.headers);
    //console.log(client.handshake.headers['x-token']);
    //! con esto creamos una funcion que nos permita validar el JWT
    const [valido,uid] = comprobarJWT(client.handshake.headers['x-token']);
    //console.log(valido, uid);
    //verificar autenticacion
    if( !valido){return client.disconnect();}
    //cliente autenticado
    console.log('cliente autenticado');
    usuarioConectado(uid);




    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje!!!', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });

    // client.on('emitir-mensaje', ( payload ) => {
    //     io.emit( 'nuevo-mensaje', 'HEY!!!!!!!!' );
    // });
});

