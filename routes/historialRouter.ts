import { Router } from "express";
import { consultarHistoria } from "../controllers/index.js";

const router = Router();

router.get('/', async (req, res) => {
  try {
    const response = await consultarHistoria(req.query as any)
    res.status(response.status || 500).send(response.data);
  } catch (err) {
    res.send(err)
  }
});

export default router;
