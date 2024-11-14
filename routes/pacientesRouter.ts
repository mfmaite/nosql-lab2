import { Router } from 'express';
import { crearPaciente, crearRegistroPaciente, eliminarPaciente } from '../controllers/index.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const response = await crearPaciente(req.body);
    res.status(response.status || 500).send(response.data);
  } catch (err) {
    res.send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const response = await eliminarPaciente(req.params.id);
    res.status(response.status || 500).send(response.data);
  } catch (err) {
    res.send(err);
  }
}
);

export default router;
