import home from './homeRouter';
import { Router, json } from 'express';
import pacientes from './pacientesRouter';
import historial from './historialRouter';
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
