import { JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";

function generarToken(params) {
  const token = jwt.sign({ name: params }, JWT_SECRET, {
    expiresIn: 60 * 20,
  });

  return token;
}
