import { pool } from "../DB.js";

//Mostrar todas las secciones con su informacion y datos de imagen
export const getSection = async (req, res) => {
  try {
    //Sentencia SQL
    const query =
      "SELECT nombre_seccion, informacion, imagenURL \n" +
      "FROM secciones s JOIN colegio.informacion i ON s.id_seccion = i.id_informacion \n" +
      "JOIN imagenes img ON s.id_seccion = img.id_imagen";

      //Trae los datos
    const [rows] = await pool.query(query);

    //Muestra los datos encontrados
    res.json(rows);

  } catch (error) {
    console.log("Problema : " + error)
    return res.status(500).json({
      message: "Algo salio mal" + error,
    });
  }
};

