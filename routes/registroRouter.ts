import { Router } from 'express';
import { crearRegistroPaciente, getRegistrosOrdenados } from '../controllers/index.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const response = await crearRegistroPaciente(req.body)
    res.status(response.status || 500).send(response.data);
  } catch (err) {
    res.send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    console.log(req.query)
    const response = await getRegistrosOrdenados(req.query as any)
    res.status(response.status || 500).send(response.data);
  } catch (err) {
    res.send(err);
  }
});

export default router;
