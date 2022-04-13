const routes = require('express').Router();

const {
    getByQuery,
    createNea,
    updateNea,
    deleteNea
} = require('../controllers/nea_controller');

routes.get('', getByQuery);
routes.post('/create', createNea);
routes.patch('/edit/:designation', updateNea);
routes.delete('/delete/:designation', deleteNea);

module.exports = routes;

