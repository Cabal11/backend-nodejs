import { Router } from "express";
import {
  createSection,
  updateSection,
  deleteSection,
  getSection,
} from "../controllers/seccion.controller.js";

const router = Router();

router.get("/seccion", getSection);

export default router;
