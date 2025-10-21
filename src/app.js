import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import seccionRoutes from "./routes/seccion.routes.js";
import requisitosRoute from "./routes/requisitos.routes.js";
import cronogramaRoute from "./routes/cronograma.routes.js";
import GenerarToken from "./controllers/Auth/generarJWT.js";
import { pool } from "./DB.js";
import VerificarToken from "./controllers/Auth/verificarToken.js";

const app = express();

app.use(cookieParser());

//Recibir los datos y convertilos en json
app.use(express.json());
app.use(
  cors({
    origin: ["https://liceonosaradev.netlify.app"],
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use("/api", VerificarToken, seccionRoutes);
app.use("/api", VerificarToken, requisitosRoute);
app.use("/api", VerificarToken, cronogramaRoute);

//JSON Web token
app.post("/getToken", (req, res) => {
  try {
    //Crear la firma

    const token = GenerarToken(req.body);

    //Enviar la cookie con el token
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    //Token para IOS en headers
    res.json({ token: token });
  } catch (error) {
    res.status(500).send(`Fallo el servidor ${error.message}`);
  }
});

//Ping para iniciar el servidor
app.use("/ping", async (req, res) => {
  try {
    await pool.query("Select 1");
    res.status(200).send("Servidor y DB, activos");
  } catch (error) {
    res.status(500).send("Servidor o DB en reposo", error.message);
  }
});

app.get("/verificar", (res, req) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "Sin cookie" });
    }
    res.json({ message: "si hay cookie" });
  } catch (error) {
    res.status(500).send("Servidor o DB en reposo", error.message);
  }
});

// Si ingresan la ruta incorrecta o que no existe
app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

export default app;
