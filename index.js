const express = require('express');
const morgan = require('morgan');

const { app: { port } } = require('./configs/env_config');
const connectMongoDB = require('./configs/mongodb_config');

const routerAPI = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan(':method :host :status :param[id] :res[content-length] - :response-time ms :body'));

app.use('/api', routerAPI);

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