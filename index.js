const express = require('express');

const { app: { port } } = require('./configs/env_config');
const connectMongoDB = require('./configs/mongodb_config');
const morgan = require('./configs/morgan_config');

const notFound = require('./middlewares/notFound');

const landingRouter = require('./routes/lading_routes');
const neaRouter = require('./routes/nea_routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan(':method / :host / :status / :query / :param / :res[content-length] / :response-time ms / :body'));

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
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }
    catch (error) {
        console.log(error);
    }
}

init();