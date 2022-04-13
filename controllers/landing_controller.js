const landingAPI = require('../models/landing_api_model');

const getByQuery = async (req, res) => {
    try {
        if (req.query.minimum_mass) {
            getByMassAprox(req.query.minimum_mass, res);
        } else if (req.query.to || req.query.from) {
            getByDate(req.query, res);
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

const getByMassAprox = async (min_mass, res) => {
    try {
        if (min_mass) {

        }
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


const getByMass = async (req, res) => {
    try {
        if (req.params.mass) {
            res.status(202).json({ message: 'dentro getByMass' })
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}


const getByClass = async (req, res) => {
    try {
        if (req.params.class) {
            res.status(202).json({ message: 'dentro getByClass' })
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}


const createLanding = async (req, res) => {
    try {
        res.status(202).json({ message: 'dentro createLanding' })

    } catch (error) {
        res.status(400).json({ message: error });
    }
}


const updateLanding = async (req, res) => {
    try {
        if (req.params.id) {
            res.status(202).json({ message: 'dentro updateLanding' })
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}


const deleteLanding = async (req, res) => {
    try {
        if (req.params.id) {
            res.status(202).json({ message: 'dentro deleteLanding' })
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
}


const landing = {
    getByQuery,
    getByMass,
    getByClass,
    createLanding,
    updateLanding,
    deleteLanding
};

module.exports = landing;