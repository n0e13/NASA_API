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
        PORT: process.env.PORT
    },
    mongo: {
        MONGO_URI: process.env.DBMONGO_URI
    }
};

module.exports = aka;