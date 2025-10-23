import { pool } from "../DB.js";
import NodeCache from "node-cache";

//cache en memoria
const cache = new NodeCache({ stdTTL: 540, checkperiod: 540 });

export const getTipoRequisitos = async (req, res) => {
  try {
    //Si existen datos en cache los devuelve
    const cacheData = cache.get("requisitos");

    if (cacheData) {
      //Devuelve los datos cacheados
      return res.json(cacheData);
    }

    //Sentencia SQL
    //Trae los datos
    const [rows] = await pool.query(
      "Select tipo, requisito from tipo_requisito_requisitos tr \n" +
        "join tipo_requisito t on tr.id_tipo = t.id_tipo \n" +
        "join requisitos req on tr.id_requisito = req.id_requisito"
    );

    //Devuelve un 204 si esta vacio
    if (rows.length == 0) {
      return res.status(204).json({
        message: "No content",
      });
    }

    //Almacenar en cache
    cache.set("requisitos", rows);

    //Muestra los datos encontrados
    res.json(rows);
  } catch (error) {
    console.log("Problema en la solicitud a la BD: " + error);

    return res.status(500).json({
      message: "Problema con la BD" + error,
    });
  }
};
