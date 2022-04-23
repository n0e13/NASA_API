const routes = require('express').Router();

const {
    getByQuery,
    createNea,
    updateNea,
    deleteNea
} = require('../controllers/nea_controller');

routes.get('', getByQuery);
routes.post('/create', createNea);
routes.put('/edit', updateNea);
routes.delete('/delete', deleteNea);

module.exports = routes;

