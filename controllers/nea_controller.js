const neaAPI = require('../models/nea_api_model');

const getByClass = async (req, res) => {
    try {
        console.log(req.params.class);
    } catch (error) {
        console.log(error)
    }
}

const getByDate = async (req, res) => {
    try {
        console.log(req.params.date);
    } catch (error) {
        console.log(error)
    }
}

const createNea = async (req, res) => {
    try {
        console.log('creo nea');
    } catch (error) {
        console.log(error)
    }
}

const updateNea = async (req, res) => {
    try {
        console.log(req.params.designation);
    } catch (error) {
        console.log(error)
    }
}

const deleteNea = async (req, res) => {
    try {
        console.log(req.params.designation);
    } catch (error) {
        console.log(error)
    }
}

const nea = {
    getByClass,
    getByDate,
    createNea,
    updateNea,
    deleteNea
};

module.exports = nea;