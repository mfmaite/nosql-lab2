const express = require('express');
const pacientes = require('./pacientesRouter');
const registros = require('./registrosRouter');
const home = require('./homeRouter');

function routerApi(app) {
    const router = express.Router();
    app.use(express.json());
    app.use('/', router);
    router.use('/pacientes', pacientes);
    router.use('/registros', registros);
    router.use('/', home);
}

module.exports = routerApi;
