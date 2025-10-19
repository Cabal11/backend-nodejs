import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import seccionRoutes from "./routes/seccion.routes.js";
import requisitosRoute from "./routes/requisitos.routes.js";
import cronogramaRoute from "./routes/cronograma.routes.js";
import validarToken from "./controllers/Auth/verificarToken.js";
import { JWT_SECRET, NAME_KEY } from "./config.js";

const app = express();

//Recibir los datos y convertilos en json
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
    methods: "GET",
  })
);

app.use("/api", validarToken, seccionRoutes);
app.use("/api", validarToken, requisitosRoute);
app.use("/api", validarToken, cronogramaRoute);

//JSON Web token
app.get("/getToken", (req, res) => {
  try {
    //Crear la firma
    const token = jwt.sign({ name: NAME_KEY }, JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    console.log(NAME_KEY);
    res.json({ auth: true, token: token });
  } catch (error) {
    res.status(500).json(`Fallo el servidor ${error}`);
  }
});

//prueba
app.use("/prueba", validarToken, (req, res) => {
  try {
    res.status(200).json("prueba");
  } catch (error) {
    res.status(500).json("Fallo el servidor");
  }
});

//Ping para iniciar el servidor
app.use("/ping", async (req, res) => {
  try {
    res.status(200).json("ping");
  } catch (error) {
    res.status(500).json("Servidor en reposo");
  }
});

// Si ingresan la ruta incorrecta o que no existe
app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

export default app;
