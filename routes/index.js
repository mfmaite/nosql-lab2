import home from './homeRouter.js';
import { Router, json } from 'express';
import pacientes from './pacientesRouter.js';
import registros from './registrosRouter.js';

function routerApi(app) {
    const router = Router();
    app.use(json());
    app.use('/', router);
    router.use('/pacientes', pacientes);
    router.use('/registros', registros);
    router.use('/', home);
}

export default routerApi;
