const neaAPI = require('../models/nea_api_model');

const getByQuery = async (req, res) => {
    try {
        if (req.query.class) {
            getByClass(req.query.class, res);
        } else if (req.query.to || req.query.from) {
            getByDate(req.query, res);
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

const getByClass = async(nea_class, res) => {
    try {
        res.status(202).json({ message: 'dentro getByClass' })
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

const getByDate = async (query, res) => {
    if (query.to && query.from) {
        res.status(202).json({ message: 'dentro get by date con to y from' });
    } else if (query.from) {
        res.status(202).json({ message: 'dentro get by date con from' });
    } else {
        res.status(202).json({ message: 'dentro get by date con to' });
    }
}

const createNea = async (req, res) => {
    try {
        res.status(202).json({ message: 'dentro createNea' })

    } catch (error) {
        res.status(400).json({ message: error });
    }
}

const updateNea = async (req, res) => {
    try {
        if (req.params.designation) {
            res.status(202).json({ message: 'dentro updateNea' })
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

const deleteNea = async (req, res) => {
    try {
        if (req.params.designation) {
            res.status(202).json({ message: 'dentro deleteNea' })
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

const nea = {
    getByQuery,
    createNea,
    updateNea,
    deleteNea
};

module.exports = nea;