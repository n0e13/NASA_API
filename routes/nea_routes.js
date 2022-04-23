const routes = require('express').Router();

const {
    getByQuery,
    createNea,
    updateNea,
    deleteNea
} = require('../controllers/nea_controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Neas:
 *       type: object
 *       required:
 *         - designation
 *         - discovery_date
 *         - h_mag
 *         - moid_au
 *         - q_au_1
 *         - q_au_2
 *         - period_yr
 *         - i_deg
 *         - pha
 *         - orbit_class
 *       properties:
 *         designation:
 *           type: string
 *         discovery_date:
 *           type: string
 *         h_mag:
 *           type: string
 *         moid_au:
 *           type: string
 *         q_au_1:
 *           type: string
 *         q_au_2:
 *           type: string
 *         period_yr:
 *           type: string
 *         i_deg:
 *           type: string
 *         pha:
 *           type: string
 *         orbit_class:
 *           type: string
 *       example: 
 *          designation: (2014 CY4)
 *          discovery_date: 2014-02-04T00:00:00.000
 *          h_mag: 21.1
 *          moid_au: 0.042
 *          q_au_1: 0.48
 *          q_au_2: 4.82
 *          period_yr: 4.32
 *          i_deg: 15.02
 *          pha: Y
 *          orbit_class: Apollo 
 */

/**
 * @swagger
 *  tags:
 *    name: Neas
 *    description: Datos de asteroides
 */

/**
 * @swagger
 * /neas{?class}:
 *    get:
 *      summary: Búsqueda por clase orbital
 *      tags: [neas]
 *      description: Obtiene la designación y el periodo anual en base a la clase orbital del asteroide   
 *    parameters:
 *      - name: class
 *        in: query
 *        description: Nombre de la clase por la que buscar. Se puede buscar por Apollo, Amor, Aten, Comet, Jupiter-family Comet, Parabolic Comet, Encke-type Comet
 *        required: true
 *    responses:
 *       200:
 *        description: Listado de asteroides de esa clase
 *        content:
 *          application/json:
 *            type: array
 *       400:
 *        description: No hay parámetro de búsqueda
 */
routes.get('', getByQuery);


routes.post('/create', createNea);
routes.put('/edit', updateNea);
routes.delete('/delete', deleteNea);

module.exports = routes;

