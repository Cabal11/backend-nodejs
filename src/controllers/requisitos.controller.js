import { pool } from "../DB.js";
import NodeCache from "node-cache";

//cache en memoria
const cache = new NodeCache({ stdTTL: 540, checkperiod: 540 });

//Mostrar los requisitos segun el tipo de requisito
//1- Matrícula primer ingreso
// 2- Ratificación de matrícula
// 3- Uniforme señoritas
// 4- Uniforme caballeros

export const getTipoRequisitos = async (req, res) => {
  try {
    //id que pasa por el API
    // const { id } = req.params;

    //Si existen datos en cache los devuelve
    const cacheData = cache.get('requisitos');

    // console.clear()
    // console.log("Datos en cache: ", cache.get(id));

    if (cacheData) {
      //     console.clear()
      //   console.log("Datos desde cache");

      return res.json(cacheData);
    }

    //Sentencia SQL
    //Trae los datos
    const [rows] = await pool.query(
      "Select tipo, requisito from tipo_requisito_requisitos tr \n" +
        "join tipo_requisito t on tr.id_tipo = t.id_tipo \n" +
        "join requisitos req on tr.id_requisito = req.id_requisito");

    if (rows.length == 0) {
      return res.status(204).json({
        message: "No content"
      });
    }

    //Almacenar en cache
    cache.set('requisitos', rows);

    //Muestra los datos encontrados
    res.json(rows);
  } catch (error) {
    console.log("Problema en la solicitud: " + error);

    return res.status(500).json({
      message: "Problema en el servidor" + error,
    });
  }
};
