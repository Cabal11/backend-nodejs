import { JWT_SECRET } from "../../config.js";
import jwt from "jsonwebtoken";

function GenerarToken(body) {
  const name = body.name;
  const token = jwt.sign({ name: name }, JWT_SECRET, {
    expiresIn: 60 * 20,
  });

  return token;
}

export default GenerarToken;
