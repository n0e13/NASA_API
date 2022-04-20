/**
 * @author Noemy García
 * @module configs/mongodb_config
 * @exports connectMongoDB
 */

/** Paquete de Mongoose */
const mongoose = require('mongoose');

/** Clave de conexión */
const { mongo: { MONGO_URI } } = require('./env_config');

/** 
 * Función asíncrona que conecta a la BBDD de MongoDB 
 * @async
 */
const connectMongoDB = async () => {
    try {
        const res = await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected...');
    } catch (error) {
        console.log(`Unable to connect to MongoDB database: ${error}`);
    }
}

module.exports = connectMongoDB;