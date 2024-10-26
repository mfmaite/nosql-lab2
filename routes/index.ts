import home from './homeRouter';
import { Router, json } from 'express';
import pacientes from './pacientesRouter';
import registros from './registrosRouter';
import { Express } from 'express-serve-static-core';

function routerApi(app: Express) {
  const router = Router();
  app.use(json());
  app.use('/', router);
  router.use('/pacientes', pacientes);
  router.use('/registros', registros);
  router.use('/', home);
}

export default routerApi;
