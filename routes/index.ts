import { Router, json } from 'express';
import { Express } from 'express-serve-static-core';

import home from './homeRouter.js';
import registro from './registroRouter.js';
import pacientes from './pacientesRouter.js';
import historial from './historialRouter.js';

function routerApi(app: Express) {
  const router = Router();
  app.use(json());
  app.use('/', router);

  router.use('/pacientes', pacientes);
  router.use('/historia', historial);
  router.use('/registro', registro);
  router.use('/', home);
}

export default routerApi;
