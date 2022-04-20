const express = require('express');

const { app: { PORT } } = require('./configs/env_config');
const connectMongoDB = require('./configs/mongodb_config');
const helmet = require('helmet');

const notFound = require('./middlewares/notFound');

const landingRouter = require('./routes/lading_routes');
const neaRouter = require('./routes/nea_routes');

const port = PORT || 5000;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/astronomy/landings', landingRouter);
app.use('/api/astronomy/neas', neaRouter);

app.use(notFound);
/**
 * Función inicial que conecta a la BBDD y lanza el servidor
 * @async
 */
const init = async () => {
    try {
        await connectMongoDB();
        app.listen(port, () => {
            // console.log(`Example app listening at http://localhost:${port}`)
        })
    }
    catch (error) {
        //console.log(error);
    }
}

init();