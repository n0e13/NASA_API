const mongoose = require('mongoose');

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

  const objectSchema = {
    designation: String,
    discovery_date: String,
    h_mag: String,
    moid_au: String,
    q_au_1: String,
    q_au_2: String,
    period_yr: String,
    i_deg: String,
    pha: String,
    orbit_class: String
};

// Crear el esquema
const neaSchema = mongoose.Schema(objectSchema);

// Crear el modelo
const Nea = mongoose.model('Nea', neaSchema);

module.exports = Nea;