const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        // const response = await controllerConsultarRegistrosPersonalizados(req.query)
        res.status(200).send({result: "Endpoint para consultar registros personalizados"});
    }catch(err){
        res.send(err)
    }
});

module.exports = router;