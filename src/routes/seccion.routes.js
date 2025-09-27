import { Router } from "express";
import { getSection } from "../controllers/seccion.controller.js";

const router = Router();

router.get("/seccion", getSection);

export default router;
