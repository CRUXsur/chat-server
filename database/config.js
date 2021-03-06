// viene toda la cadena de conexion a nuestra base de datos 
const mongoose = require('mongoose'); //importamos el paquete


//funcion encargada de hacer esta conexion
const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN, {
            //* YA NO SON NECESARIOS, las version
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true
        });

        console.log('DB Online');
        

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }

}

module.exports = {
    dbConnection
}
