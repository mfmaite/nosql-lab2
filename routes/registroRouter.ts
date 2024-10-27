import { Router } from 'express';
import { crearRegistroPaciente } from '../controllers/index.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const response = await crearRegistroPaciente(req.body)
    res.status(response.status || 500).send(response.data);
  } catch (err) {
    res.send(err);
  }
});

export default router;
