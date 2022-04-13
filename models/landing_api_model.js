const Landing = require('./landing_schema_model');

// GET para obtener nombre y masa de todos aquellos meteoritos cuya masa sea igual o superior a una masa (gr) dada (con query parameters)​
// Ejemplo: /astronomy/landings?minimum_mass=200000​
const getByMassAprox = async () => {
    return 'getByMassAprox';
}


// GET para obtener nombre y masa de uno o más meteoritos cuya masa sea la especificada (route params)​
// Ejemplo: /astronomy/landings/mass/200000​
const getByMass = async () => {
    return 'getByMass';
}


// GET para obtener los nombres y clase de aquellos meteoritos cuya clase sea la registrada (route params)​
// Ejemplo: /astronomy/landings/class/L6​
const getByClass = async () => {
    return 'getByClass';
}


// GET para obtener nombre, masa y fecha de todos los meteoritos caídos en determinadas fechas de la siguiente manera:​
// /astronomy/landings?from=1960&to=1990
// /astronomy/landings?from=1960
// /astronomy/landings?to=1990
// El mismo endpoint deberá ser compatible con las 3 formas
const getByDate = async () => {
    return 'getByDate';
}


/* POST Para crear un nuevo landing en el sistema. El objeto a crear tendrá los mismos campos como los documentos proporcionandos en MongoDB como ejemplo:
{
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
},
Ejemplo: /astronomy/landings/create */
const createLanding = async () => {
    return 'createLanding';
}


/* PUT Para editar un landing en el sistema. Búsqueda para editar por ID. El objeto a editar tendrá los mismos campos como los documentos proporcionandos en MongoDB como ejemplo.
  {
  "name": "Alexandrovsky",
  "id": "465",
  "nametype": "Valid",
  "recclass": "H4",
  "mass": "9251",
  "fall": "Fell",
  "year": "1900-01-01T00:00:00.000",
  "reclat": "50.950000",
  "reclong": "31.816670",
  "geolocation": { "latitude": "50.95", "longitude": "31.81667" }
},
Ejemplo: /astronomy/landings/edit */
const updateLanding = async () => {
    return 'updateLanding';
}

// DELETE Para borrar un landing en el sistema. Búsqueda para borrar por ID.
// Ejemplo: /astronomy/landings/delete​
const deleteLanding = async () => {
    return 'deleteLanding';
}

const landingAPI = {
    getByMassAprox,
    getByMass,
    getByClass,
    getByDate,
    createLanding,
    updateLanding,
    deleteLanding
}

module.exports = landingAPI;