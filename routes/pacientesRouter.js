import { Router } from 'express';
import { crearPaciente, consultarHistoria } from '../controllers/controller-pacientes.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const response = await crearPaciente(req.body);
    res.status(response.status).send(response.data);
  } catch (err) {
    res.send(err);
  }
});

router.get('/historia', async (req, res) => {
  try {
    const response = await consultarHistoria(req.query)
    res.status(response.status).send(response.data);
  } catch (err) {
    res.send(err)
  }
});

router.post('/registro', async (req, res) => {
  try {
    // const response = await controller()
    const { ci } = req.body;
    res.status(301).send({ result: "Endpoint para agregar un registro al paciente " + ci });
  } catch (err) {
    res.send(err);
  }
});


export default router;
