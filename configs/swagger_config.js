const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'NASA API',
            version: '1.0.2',
            description: 'CRUD para landings y neas. Puedes encontrar toda la información aquí [Ejercicio NASA-API](https://github.com/TheBridge-FullStackDeveloper/temario_fullstack_FT_feb22/blob/master/teoria/back/ejercicioNasa.md)',
            contact: {
                name: 'n0e',
                email: 'noemy.garcia@gmail.com'
            }
        },
        host: 'http://localhost:3000',
        basePath: '/api/astronomy',
        tags: [
            {
                name: 'landings',
                description: 'Todo el CRUD de los meteoritos'
            },
            {
                name: 'neas',
                description: 'Todo el CRUD de los asteroides'
            }
        ],
    },
    apis: ['./routes/*.js']
};

module.exports = swaggerOptions;