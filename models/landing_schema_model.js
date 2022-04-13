const mongoose = require('mongoose');

/* {
    "name": "Agen",
    "id": "392",
    "nametype": "Valid",
    "recclass": "H5",
    "mass": "30000",
    "fall": "Fell",
    "year": "1814-01-01T00:00:00.000",
    "reclat": "44.216670",
    "reclong": "0.616670",
    "geolocation": { "latitude": "44.21667", "longitude": "0.61667" }
  } */

const objectSchema = {
    name: String,
    id: String,
    nametype: String,
    recclass: String,
    mass: String,
    fall: String,
    year: String,
    reclat: String,
    reclong: String,
    geolocation: {
        latitude: String,
        longitude: String
    }
};

// Crear el esquema
const landingSchema = mongoose.Schema(objectSchema);

// Crear el modelo
const Landing = mongoose.model('Landing', landingSchema);

module.exports = Landing;