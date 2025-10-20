import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import seccionRoutes from "./routes/seccion.routes.js";
import requisitosRoute from "./routes/requisitos.routes.js";
import cronogramaRoute from "./routes/cronograma.routes.js";
import validarToken from "./controllers/Auth/verificarToken.js";
import { JWT_SECRET } from "./config.js";

const app = express();

app.use(cookieParser());

//Recibir los datos y convertilos en json
app.use(express.json());
app.use(
  cors({
    origin: ["https://liceonosaradev.netlify.app", 'http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use("/api", validarToken, seccionRoutes);
app.use("/api", validarToken, requisitosRoute);
app.use("/api", validarToken, cronogramaRoute);

//JSON Web token
app.post("/getToken", (req, res) => {
  try {
    //Crear la firma
    const { name } = req.body;

    const token = jwt.sign({ name: name }, JWT_SECRET, {
      expiresIn: 60 * 20,
    });

    //Enviar la cookie con el token
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    res.json({ auth: true });
  } catch (error) {
    res.status(500).json(`Fallo el servidor ${error}`);
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
