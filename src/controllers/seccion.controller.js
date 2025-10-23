import { pool } from "../DB.js";
import NodeCache from "node-cache";

//cache en memoria
const cache = new NodeCache({ stdTTL: 540, checkperiod: 540 });

//Mostrar todas las secciones con su informacion y datos de imagen
export const getSection = async (req, res) => {
  try {
    //Si existen datos en cache los devuelve
    const cacheData = cache.get("secciones");

    if (cacheData) {
      //Devuelve los datos cacheados
      return res.json(cacheData);
    }

    //Sentencia SQL
    const query =
      "SELECT nombre_seccion, informacion, imagenURL \n" +
      "FROM secciones s JOIN railway.informacion i ON s.id_seccion = i.id_informacion \n" +
      "JOIN imagenes img ON s.id_seccion = img.id_imagen";

    //Trae los datos
    const [rows] = await pool.query(query);

    //Si esta vacio devuelve un 204
    if (rows.length == 0) {
      return res.status(204).json({
        message: "No content",
      });
    }

    //Almacenar en cache
    cache.set("secciones", rows);

    //Muestra los datos encontrados
    res.json(rows);
  } catch (error) {
    console.log("Problema en la solicitud a la BD: " + error);

    return res.status(500).json({
      message: "Problema con la BD" + error,
    });
  }
};
