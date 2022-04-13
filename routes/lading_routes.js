const routes = require('express').Router();

const {
    getByQuery,
    getByMass,
    getByClass,
    createLanding,
    updateLanding,
    deleteLanding
} = require('../controllers/landing_controller');

routes.get('', getByQuery);
routes.get('/mass/:mass', getByMass);
routes.get('/class/:class', getByClass);
routes.post('/create', createLanding);
routes.patch('/edit/:id', updateLanding);
routes.delete('/delete/:id', deleteLanding);

module.exports = routes;