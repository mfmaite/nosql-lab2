const express = require('express');
const router = express.Router();
const { crearPaciente, consultarHistoria, crearRegistroPaciente } = require('../controllers/controller-pacientes');

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
    const response = await crearRegistroPaciente(req.body)
    res.status(response.status).send(response.data);
  } catch (err) {
    res.send(err);
  }
});


module.exports = router;
