import jwt from "jsonwebtoken";
import { NAME_KEY, JWT_SECRET } from "../../config.js";

function VerificarToken(req, res, next) {
  try {
    //Obtener el token
    let token = req.cookies?.token;
    console.log("token en cookie", token);

    //Validar si esta en la cookie
    if (!token) {
      const headerAuth = req.headers["authorization"];

      //Validar si esta en el header y si es correcto el formato
      if (headerAuth && headerAuth.startsWith("Bearer ")) {
        token = headerAuth.substring(7);
        console.log("token en header", token);
      }
    }

    //Validar si tiene el token o no
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

export default VerificarToken;
