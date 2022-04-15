const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({

    de: {
        type:Schema. Types.ObjectId, //es un objeto,Usuario de base de datos
        ref: 'Usuario',
        required: true
    },

    para: {
        type:Schema. Types.ObjectId, //es un objeto,Usuario de base de datos
        ref: 'Usuario',
        required: true    
    },

    mensaje: {
        type: String,
        required:true
    },
},{
    timestamps:true
});

//! esto es para no regresar un usuario en respuesta a la peticion
MensajeSchema.method('toJSON', function() {
    // todo lo que no lo quiero , o no lo ocupo y 
    // en object seran almacenadas las demas propiedades 
    const { __v, _id, password, ...object } = this.toObject();
    return object;
});


module.exports = model('Mensaje', MensajeSchema);