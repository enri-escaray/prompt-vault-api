const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Base de datos conectada: ${conn.connection.host}`);
    
    } catch (error) {
        console.error(`Error al conectarse a MongoDB Atlas: ${error.message}`);
        process.exit(1);

    }
};

module.exports = conectarDB;