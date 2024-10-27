import home from './homeRouter.js';
import { Router, json } from 'express';
import pacientes from './pacientesRouter.js';
import historial from './historialRouter.js';
import { Express } from 'express-serve-static-core';

function routerApi(app: Express) {
  const router = Router();
  app.use(json());
  app.use('/', router);

  router.use('/pacientes', pacientes);
  router.use('/historia', historial);
  router.use('/', home);
}

export default routerApi;
