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
    try {
        const allLandings = await landingDB.getByMassAprox(parseInt(min_mass));
        res.status(200).json(allLandings);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}

const getByDate = async (query, res) => {
    try {
        const allLandings = await landingDB.getByDate(parseInt(query.from), parseInt(query.to));
        res.status(200).json(allLandings);
    }
    catch (error) {
        res.status(400).json({ message: error });;
    }
}


const getByMass = async (req, res) => {
    try {

        const allLandings = await landingDB.getByMass(parseInt(req.params.mass));
        res.status(200).json(allLandings);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}


const getByClass = async (req, res) => {
    try {
        const allLandings = await landingDB.getByClass(req.params.class);
        res.status(200).json(allLandings);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}


const createLanding = async (req, res) => {
    //TODO: Controllar que se introduce un {} para que no de error 
    if (Object.keys(req.body).length !== 0) {
        try {
            await landingDB.createLanding(req.body);
            res.status(201).json({ message: 'Landing creada correctamente' });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    } else {
        res.status(400).json({ message: 'No hay datos para crear una landing' });
    }
}


const updateLanding = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        try {
            await landingDB.updateLanding(req.body);
            res.status(202).json({ message: 'Landing actualizada correctamente' });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    } else {
        res.status(400).json({ message: 'No hay datos para actualizar una landing' });
    }
}


const deleteLanding = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        try {
            await landingDB.deleteLanding(req.body);
            res.status(202).json({ message: 'Landing borrada correctamente' });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    } else {
        res.status(400).json({ message: 'No hay datos para borrar una landing' });
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