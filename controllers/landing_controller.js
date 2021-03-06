/**
 * @author Noemy García
 * @module controllers/landing_controller
 * @exports landing
 * @namespace Landings
 */


const landingDB = require('../models/landing_api_model');


/** Función que comprueba si llegan parámetros de consulta y dependiendo del tipo llama a una función u otra
 * @memberof Landings
 * @method getByQuery
 * @async
 * @param {Object} req Puede ser req.query.minimum_mass, req.query.from y req.query.to
 * @param {Object} res Respuesta con el estado, el listado y el mensaje apropiado de lo ocurrido
 * @returns {JSON}
 * @throws {error}
 */
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


/** Función que devuelve un listado de los landings cuya masa sea como mínimo la pasada por parámetro  
 * @memberof Landings
 * @method getByMassAprox
 * @async
 * @param {String} min_mass Recibe el parámetro desde getByQuery de la masa mínima por la que buscar
 * @param {Object} res Respuesta con el estado, el listado y el mensaje apropiado de lo ocurrido
 * @returns {JSON}
 * @throws {error}
 */
const getByMassAprox = async (min_mass, res) => {
    try {
        const allLandings = await landingDB.getByMassAprox(parseInt(min_mass));
        res.status(200).json(allLandings);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}


/** Función que devuelve un listado de landings entre las fechas dadas por parámetro
 * @memberof Landings
 * @method getByDate
 * @async
 * @param {Object} query Recibe el parámetro desde getByQuery con las fechas query.from y query.to
 * @param {Object} res Respuesta con el estado, el listado y el mensaje apropiado de lo ocurrido
 * @returns {JSON}
 * @throws {error}
 */
const getByDate = async (query, res) => {
    try {
        const allLandings = await landingDB.getByDate(parseInt(query.from), parseInt(query.to));
        res.status(200).json(allLandings);
    }
    catch (error) {
        res.status(400).json({ message: error });;
    }
}


/** Función que devuelve un listado de landings cuya masa sea la especificada
 * @memberof Landings
 * @method getByMass
 * @async
 * @param {Object} req El req.params.mass especifica la masa por la que hay que buscar
 * @param {Object} res Respuesta con el estado, el listado y el mensaje apropiado de lo ocurrido
 * @returns {JSON}
 * @throws {error}
 */
const getByMass = async (req, res) => {
    try {
        const allLandings = await landingDB.getByMass(parseInt(req.params.mass));
        res.status(200).json(allLandings);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}


/** Función que devuelve un listado de landings de la clase dada
 * @memberof Landings
 * @method getByClass
 * @async
 * @param {Object} req Recibe en req.params.class la clase por la que buscar en las landings
 * @param {Object} res Respuesta con el estado, el listado y el mensaje apropiado de lo ocurrido
 * @returns {JSON}
 * @throws {error}
 */
const getByClass = async (req, res) => {
    try {
        const allLandings = await landingDB.getByClass(req.params.class);
        res.status(200).json(allLandings);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}


/** Función que crea un landing con los datos recibidos
 * @memberof Landings
 * @method createLanding
 * @async
 * @param {Object} req Recibe en el req.body los datos de la nueva landing
 * @param {Object} res Respuesta con el estado, el listado y el mensaje apropiado de lo ocurrido
 * @returns {JSON}
 * @throws {error}
 */
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


/** Función que actualiza una landing
 * @memberof Landings
 * @method updateLanding
 * @async
 * @param {Object} req Recibe en el req.body los datos de la landing a actualizar. Lo hace por el ID
 * @param {Object} res Respuesta con el estado, el listado y el mensaje apropiado de lo ocurrido
 * @returns {JSON}
 * @throws {error}
 */
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


/** Función que borra una landing
 * @memberof Landings
 * @method deleteLanding
 * @async
 * @param {Object} req Recibe por req.body la landing que borrar. Lo hace por el ID
 * @param {Object} res Respuesta con el estado, el listado y el mensaje apropiado de lo ocurrido
 * @returns {JSON}
 * @throws {error}
*/
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