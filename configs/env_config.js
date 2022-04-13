/**
 * @author Noemy García
 * @module configs/env_config
 * @exports aka
 */

/** Paquete dotenv */
const dotenv = require('dotenv');
dotenv.config();

/** Librería de claves */
const aka = {
    app: {
        port: process.env.PORT
    },
    mongo: {
        mongo_uri: process.env.DBMONGO_URI
    }
};

module.exports = aka;