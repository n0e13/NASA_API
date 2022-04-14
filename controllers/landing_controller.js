const landingDB = require('../models/landing_api_model');

const getByQuery = async (req, res) => {
    if (Object.keys(req.query).length !== 0) {
        if (req.query.minimum_mass) {
            getByMassAprox(req.query.minimum_mass, res);
        } else if (req.query.from || req.query.to) {
            getByDate(req.query, res);
        }
        else {
            res.status(400).json({ message: 'Parámetros de consulta incorrectos' });
        }
    } else {
        res.status(400).json({ message: 'No hay parámetros' });
    }
}

const getByMassAprox = async (min_mass, res) => {
    const allLandings = await landingDB.getByMassAprox(parseInt(min_mass));
    res.status(200).json(allLandings); 
}

const getByDate = async (query, res) => {
    const allLandings = await landingDB.getByDate(parseInt(query.from), parseInt(query.to));
    res.status(200).json(allLandings);
}


const getByMass = async (req, res) => {
    const allLandings = await landingDB.getByMass(parseInt(req.params.mass));
    res.status(200).json(allLandings); 
}


const getByClass = async (req, res) => {
    const allLandings = await landingDB.getByClass(req.params.class);
    res.status(200).json(allLandings); 
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