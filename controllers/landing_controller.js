const landingAPI = require('../models/landing_api_model');

const getByMassAprox = async () => {
    try {
        console.log(req.params.minimum_mass);
    } catch (error) {
        console.log(error)
    }
}


const getByMass = async () => {
    try {
        console.log(req.params.mass);
    } catch (error) {
        console.log(error)
    }
}


const getByClass = async () => {
    try {
        console.log(req.params.class);
    } catch (error) {
        console.log(error)
    }
}


const getByDate = async () => {
    try {
        console.log(req.params.from);
    } catch (error) {
        console.log(error)
    }
}


const createLanding = async () => {
    try {
        console.log('creo landing');
    } catch (error) {
        console.log(error)
    }
}


const updateLanding = async () => {
    try {
        console.log(req.params.id);
    } catch (error) {
        console.log(error)
    }
}


const deleteLanding = async () => {
    try {
        console.log(req.params.id);
    } catch (error) {
        console.log(error)
    }
}


const landing = {
    getByMassAprox,
    getByMass,
    getByClass,
    getByDate,
    createLanding,
    updateLanding,
    deleteLanding
};

module.exports = lading;