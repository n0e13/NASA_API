const Landing = require('./landing_schema_model');
const myRgx = require('../utils/validateDate');
const { validate } = require('./nea_schema_model');

// GET para obtener nombre y masa de todos aquellos meteoritos cuya masa sea igual o superior a una masa (gr) dada (con query parameters)​
// Ejemplo: /astronomy/landings?minimum_mass=200000​
const getByMassAprox = async (min_mass) => {
    try {
        const agg = [{
            '$project': {
                '_id': 0,
                'name': 1,
                'mass': 1
            }
        }, {
            '$match': { '$expr': { '$gte': [{ '$toDecimal': '$mass' }, min_mass] } }
        }
        ];
        const allLandings = await Landing.aggregate(agg);
        return allLandings;
    } catch (error) {
        throw error;
    }
}


// GET para obtener nombre y masa de uno o más meteoritos cuya masa sea la especificada (route params)​
// Ejemplo: /astronomy/landings/mass/200000​
const getByMass = async (exactMass) => {
    try {
        const agg = [{
            '$project': {
                '_id': 0,
                'name': 1,
                'mass': 1
            }
        }, {
            '$match': { '$expr': { '$eq': [{ '$toDecimal': '$mass' }, exactMass] } }
        }
        ];
        const allLandings = await Landing.aggregate(agg);
        return allLandings;
    } catch (error) {
        throw error;
    }
}


// GET para obtener los nombres y clase de aquellos meteoritos cuya clase sea la registrada (route params)​
// Ejemplo: /astronomy/landings/class/L6​
const getByClass = async (exactClass) => {
    try {
        const agg = [{
            '$project': {
                '_id': 0,
                'name': 1,
                'recclass': 1
            }
        }, {
            '$match': { '$expr': { '$eq': ['$recclass', exactClass] } }
        }
        ];
        const allLandings = await Landing.aggregate(agg);
        return allLandings;
    } catch (error) {
        throw error;
    }
}


// GET para obtener nombre, masa y fecha de todos los meteoritos caídos en determinadas fechas de la siguiente manera:​
// /astronomy/landings?from=1960&to=1990
// /astronomy/landings?from=1960
// /astronomy/landings?to=1990
// El mismo endpoint deberá ser compatible con las 3 formas
const getByDate = async (fromYear, toYear) => {
    let fromValidate = false;
    let toValidate = false;

    if (fromYear && myRgx.regexDate(fromYear)) {
        fromValidate = true;
    }

    if (toYear && myRgx.regexDate(toYear)) {
        toValidate = true;
    }

    try {
        const agg = [
            {
                '$project': {
                    '_id': 0,
                    'name': 1,
                    'mass': 1,
                    'year': 1
                }
            }
        ];

        const allLandings = await Landing.aggregate(agg);
        let inDate = [];
        allLandings.forEach(landingItem => {
            if (landingItem.year) {
                let year = parseInt(landingItem.year.substr(0, 4));
                if (fromValidate && toValidate) {
                    if ((year >= fromYear) && (year <= toYear)) {
                        inDate.push(landingItem);
                    }
                } else if (fromYear && toYear && (fromValidate !== toValidate)) {
                    throw "Formato incorrecto. Usar YYYY";
                } else if (fromValidate) {
                    if (year >= fromYear) {
                        inDate.push(landingItem);
                    }
                } else if (toValidate) {
                    if (year <= toYear) {
                        inDate.push(landingItem);
                    }
                } else {
                    throw "Formato incorrecto. Usar YYYY";
                }
            }
        });
        return inDate;
    } catch (error) {
        throw error;
    }
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
const createLanding = async (landing) => {
    try {
        const newLanding = new Landing(landing);
        await Landing.create(newLanding);
    } catch (error) {
        throw error;
    }
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
const updateLanding = async (landing) => {
    try {
        const newLanding = Landing(landing);
        const oldLanding = await Landing.findOne({ id: landing.id });
        oldLanding.overwrite(newLanding);
        oldLanding.save();
    } catch (error) {
        throw error;
    }
}

// DELETE Para borrar un landing en el sistema. Búsqueda para borrar por ID.
// Ejemplo: /astronomy/landings/delete​
const deleteLanding = async (landing) => {
    try {
        await Landing.findOneAndDelete({ id: landing.id });
    } catch (error) {
        throw error;
    }
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