const Landing = require('./landing_schema_model');

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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
        throw error;
    }
}


// GET para obtener nombre, masa y fecha de todos los meteoritos caídos en determinadas fechas de la siguiente manera:​
// /astronomy/landings?from=1960&to=1990
// /astronomy/landings?from=1960
// /astronomy/landings?to=1990
// El mismo endpoint deberá ser compatible con las 3 formas
const getByDate = async (fromYear, toYear) => {
    try {
        const agg = [
            {
                '$project': {
                    '_id': 0,
                    'name': 1,
                    'mass': 1,
                    'year': {
                        '$substr': [
                            '$year', 0, 4
                        ]
                    }
                }
            }
        ];

        const allLandings = await Landing.aggregate(agg);
        let inDate = [];
        await allLandings.forEach(landingItem => {
            if (fromYear && toYear) {
                if ((parseInt(landingItem.year) >= parseInt(fromYear)) && (parseInt(landingItem.year) <= parseInt(toYear))) {
                    inDate.push(landingItem);
                }
            } else if (fromYear) {
                if (parseInt(landingItem.year) >= parseInt(fromYear)) {
                    inDate.push(landingItem);
                }
            } else {
                if (parseInt(landingItem.year) <= parseInt(toYear)) {
                    inDate.push(landingItem);
                }
            }
        });

        return inDate;
    } catch (error) {
        console.log(error);
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
        console.log(error);
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