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

    //* AQUI YA SE QUE EL CLIENTE ESTA AUTENTICADO, TOKEN VALIDO!
    //* entonces aqui, yo necesito ingresar al usuario a una sala en particular
    //* por defecto defecto se conectan a dos salas:
    //* 1: sala Global, donde estan todas las personas y el servidor con el io.emit
    //*    puede hacer un broadcast a todos los de esa sala
    //* 2: si yo quiero mandar un msg a un cliente puedo hacerlo mediante el 
    //*    client.id; ese id lo genera mi socket server de manera automatica
    //* Pero yo quiero unir al usuario a una sala individual en la cual 
    //* un tercero pueda decir yo le quiero mandar un msg a este fulano.... 
    //* para eso el fulano tiene que estar escuchando esa sala y esa sala va a ser
    //* una que tenga el uid del ese usuario asignada por la base de datos
    client.join(uid);
    // ypara mandar el mensaje seria
    //client.to(uid).emit('el nombre del evento');
    // escuchar del cliente el mensaje-personal (este es el evento!)
    client.on('mensaje-personal', (payload)=>{
        console.log(payload);
        //! mando el mensaje a un canal, ese canl sera payload.para (el id de la persona)
        //! la persona que se unio en su momento al chat, emit y emito el mismo evento
        //! 'mensaje-personal' y mando de regreso el payload
        io.to(payload.para).emit('mensaje-personal', payload);
    });

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

