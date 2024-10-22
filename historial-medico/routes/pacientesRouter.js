const express = require('express');
const router = express.Router();
const { controllerCrearPaciente, controllerConsultarHistoria } = require('../controllers/pacientes');

router.post('/', async (req, res) => {
    try{ 
        const response = await controllerCrearPaciente(req.body);
        res.status(response.status).send(response.data);
    }catch(err){
        res.send(err);
    }
});

router.get('/historia', async (req, res) => {
    try{
        const response = await controllerConsultarHistoria(req.query)
        res.status(response.status).send(response.data);
    }catch(err){
        res.send(err)
    }
});

router.post('/registro', async (req, res) => {
    try{        
        // const response = await controller()
        const { ci } = req.body;
        res.status(301).send({result: "Endpoint para agregar un registro al paciente " + ci});
    }catch(err){
        res.send(err);
    }
});


module.exports = router;