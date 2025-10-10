import { pool } from "../DB.js";
import NodeCache from "node-cache";

//declara cache en memoria
const cache = new NodeCache({ stdTTL: 60, checkperiod: 60 });

export const getCronogramas = async (req, res) => {
  try {
    //Si existen datos en cache los devuelve
    const cacheData = cache.get("cronograma");

    if (cacheData) {
      //     console.clear()
    //   console.log("Datos desde cache: ", cache.get("cronograma"));

      return res.json(cacheData);
    }

    //Sentencia SQL
    //Trae los datos
    const [rows] = await pool.query(
      "select tipo_proceso, DATE_FORMAT(fecha_inicio, '%d/%m/%Y') AS fecha_inicio, \n" +
        "DATE_FORMAT(fecha_fin, '%d/%m/%Y') AS fecha_fin, \n" +
        "time_format(hora_inicio, '%r') as hora_inicio, time_format(hora_fin, '%r') as hora_fin \n" +
        "from cronograma_matricula c join proceso_matricula m on c.id_proceso = m.id_tipo \n" +
        "join fechas f on c.id_fecha = f.id_fecha \n" +
        "join horarios h on c.id_horario = h.id_horario"
    );

    if (rows.length == 0) {
      return res.status(204).json({
        message: "No content",
      });
    }

    //Almacenar en cache
    cache.set("cronograma", rows);

    //Muestra los datos encontrados
    res.json(rows);
  } catch (error) {
    console.log("Problema en la solicitud: " + error);

    return res.status(500).json({
      message: "Problema en el servidor" + error,
    });
  }
};
