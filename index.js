/**
 * @author Noemy García
 */

const express = require('express');

const { app: { PORT } } = require('./configs/env_config');
const connectMongoDB = require('./configs/mongodb_config');
const helmet = require('helmet');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = require('./configs/swagger_config');
const swaggerDocs = swaggerJsDoc(swaggerOptions);


// Middlewares
const notFound = require('./middlewares/notFound');

const landingRouter = require('./routes/lading_routes');
const neaRouter = require('./routes/nea_routes');

const port = PORT || 5000;

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/astronomy/landings', landingRouter);
app.use('/api/astronomy/neas', neaRouter); 

// Middlewares
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