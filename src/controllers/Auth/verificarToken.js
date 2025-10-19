import jwt from "jsonwebtoken";
import { NAME_KEY, JWT_SECRET } from "../../config.js";

function verificarToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];

    //validar si tiene el token o no
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: "No autorizado",
      });
    }

    //Decodificar para validar
    const decode = jwt.verify(token, JWT_SECRET);

    //Comprobar si es el mismo
    if (decode.name != NAME_KEY) {
      return res.status(401).json({
        auth: false,
        message: "No permitido",
      });
    }

    next();
  } catch (error) {
    //Por si esta alterado el token
    return res.status(500).json("Token invalido");
  }
}

export default verificarToken;
