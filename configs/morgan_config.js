const { query } = require('express');
const morgan = require('morgan');

morgan.token('host', function (req) {
    return req.hostname;
});

morgan.token('body', function (req) {
    return [
        JSON.stringify(req.body)
    ];
});

morgan.token('param', function (req) {
    let textToReturn = 'No hay params';
    if (req.params.designation) {
        textToReturn = `designation: ${req.params.designation}`;
    }
    else if (req.params.id){
        textToReturn = `ìd: ${req.params.id}`;
    }
    return `param ${textToReturn}`;
});

morgan.token('query', function (req) {
    let textToReturn = 'No hay query';
    if (req.query.to && req.query.from) {
        textToReturn = `from: ${req.query.from} & to: ${req.query.to}`;
    }
    else if (req.query.to) {
        textToReturn = `to: ${req.query.to}`;
    } else if (req.query.from){
        textToReturn = `from: ${req.query.from}`;
    }
    return `query ${textToReturn}`;
});

module.exports = morgan;


