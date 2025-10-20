import jwt from "jsonwebtoken";
import { NAME_KEY, JWT_SECRET } from "../../config.js";

function verificarToken(req, res, next) {
  try {
    //Obtener el token
    const token = req.cookies.token;

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
    if (decode.name !== NAME_KEY) {
      console.log(decode);
      return res.status(401).json({
        auth: false,
        message: "No permitido",
      });
    }

    next();
  } catch (error) {
    //Por si esta alterado el token
    return res.status(401).json("Token invalido o expirado");
  }
}

export default verificarToken;
