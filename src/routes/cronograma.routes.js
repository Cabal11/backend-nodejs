import { Router } from "express";
import { getCronogramas } from "../controllers/cronograma.controller.js";

const router = Router();

router.get("/cronograma", getCronogramas);

export default router;
