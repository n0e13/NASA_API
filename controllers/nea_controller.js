const neaBD = require('../models/nea_api_model');

const getByQuery = async (req, res) => {
    if (Object.keys(req.query).length !== 0) {
        if (req.query.class) {
            getByClass(req.query.class, res);
        } else if (req.query.from || req.query.to) {
            getByDate(req.query, res);
        }
    } else {
        res.status(400).json({ message: 'No hay parámetros' });
    }
}



const getByClass = async (nea_class, res) => {
    try {
        console.log(nea_class);
        const allNeas = await neaBD.getByClass(nea_class);
        res.status(200).json(allNeas);
    }
    catch (error) {
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
    if (Object.keys(req.body).length !== 0) {
        try {
            await neaBD.createNea(req.body);
            res.status(201).json({ message: 'Nea creada correctamente' });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    } else {
        res.status(400).json({ message: 'No hay datos para crear una nea' });
    }
}



const updateNea = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        try {
            await neaBD.updateNea(req.body);
            res.status(202).json({ message: 'Nea actualizada correctamente' });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    } else {
        res.status(400).json({ message: 'No hay datos para actualizar una nea' });
    }
}



const deleteNea = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        try {
            await neaBD.deleteNea(req.body);
            res.status(202).json({ message: 'Nea borrada correctamente' });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    } else {
        res.status(400).json({ message: 'No hay datos para borrar una nea' });
    }
}

const nea = {
    getByQuery,
    createNea,
    updateNea,
    deleteNea
};

module.exports = nea;