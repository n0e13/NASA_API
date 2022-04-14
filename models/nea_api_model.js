const Nea = require('./nea_schema_model');

// GET para obtener la designación y el período anual en base a la clase orbital del asteroide (con query params)​
// Ejemplo: /astronomy/neas?class=aten​
const getByClass = async () => {
    return 'getByClass';
}

// GET para obtener designación, fecha y período anual de todos los asteroides que cumplan el filtro de fechas dadas​
// /astronomy/neas?from=2010&to=2015
// /astronomy/neas?from=2010
// /astronomy/neas?to=2015
// En este caso, además, podremos poner la fecha más específica si quisiéramos:
// YYYY-MM-DD
// YYYY-MM
// YYYY
// El endpoint debe ser compatible con los 3 casos
const getByDate = async () => {
    return 'getByDate';
}

// POST Para crear un nuevo NEA en el sistema. El objeto a crear tendrá los mismos campos como los documentos proporcionandos en MongoDB como ejemplo:
/* {
  "designation": "(2014 CY4)",
  "discovery_date": "2014-02-04T00:00:00.000",
  "h_mag": "21.1",
  "moid_au": "0.042",
  "q_au_1": "0.48",
  "q_au_2": "4.82",
  "period_yr": "4.32",
  "i_deg": "15.02",
  "pha": "Y",
  "orbit_class": "Apollo"
} */
// Ejemplo: /astronomy/neas/create
const createNea = async (nea) => {
    try {
        const newNea = new Nea(nea);
        await Nea.create(newNea);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// PUT Para editar un NEA en el sistema. Búsqueda para editar por designation. El objeto a editar tendrá los mismos campos como los documentos proporcionandos en MongoDB como ejemplo.
/* {
  "designation": "(2010 YD3)",
  "discovery_date": "2010-12-26T00:00:00.000",
  "h_mag": "20",
  "moid_au": "0.195",
  "q_au_1": "1.11",
  "q_au_2": "4.05",
  "period_yr": "4.14",
  "i_deg": "24.61",
  "pha": "N",
  "orbit_class": "Amor"
} */
// Ejemplo: /astronomy/neas/edit
const updateNea = async (nea) => {
    try {
        const newNea = Nea(nea);
        const oldNea = await Nea.findOne({ designation: nea.designation }); 
        oldNea.overwrite(newNea);
        oldNea.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// DELETE Para borrar un NEA del sistema. Búsqueda para borrar por designation.
// Ejemplo: /astronomy/neas/delete
const deleteNea = async (nea) => {
    try {
        await Nea.findOneAndDelete({ designation: nea.designation }); 
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const neaAPI = {
    getByClass,
    getByDate,
    createNea,
    updateNea,
    deleteNea
}

module.exports = neaAPI;
