import { Router } from "express";
import { getTipoRequisitos } from "../controllers/requisitos.controller.js";

const router = Router();

router.get("/requisito/:id", getTipoRequisitos);

export default router;
