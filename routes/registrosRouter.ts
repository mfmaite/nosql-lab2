import { Router } from 'express';

const router = Router();

router.get('/', async (_, res) => {
  try {
    // const response = await controllerConsultarRegistrosPersonalizados(req.query)
    res.status(200).send({ result: "Endpoint para consultar registros personalizados" });
  } catch (err) {
    res.send(err)
  }
});

export default router;
