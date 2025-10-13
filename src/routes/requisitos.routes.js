import { Router } from "express";
import { getTipoRequisitos } from "../controllers/requisitos.controller.js";

const router = Router();

router.get("/requisitos", getTipoRequisitos);

export default router;
