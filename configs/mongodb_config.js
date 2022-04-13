/**
 * @author Noemy García
 * @module configs/mongodb_config
 * @exports connectMongoDB
 */

/** Paquete de Mongoose */
const mongoose = require('mongoose');

/** Clave de conexión */
const { mongo: { mongo_uri } } = require('./env_config');

/** 
 * Función asíncrona que conecta a la BBDD de MongoDB 
 * @async
 */
const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongo_uri);
        console.log('MongoDB connected...');
    } catch (error) {
        console.log(`Unable to connect to MongoDB database: ${error}`);
    }
}

module.exports = connectMongoDB;