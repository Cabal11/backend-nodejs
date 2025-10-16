import express from "express";
import cors from 'cors'
import seccionRoutes from "./routes/seccion.routes.js";
import requisitosRoute from "./routes/requisitos.routes.js";
import cronogramaRoute from "./routes/cronograma.routes.js";


const app = express();


//Recibir los datos y convertilos en json
app.use(express.json());
app.use(cors({
  origin: 'https://liceonosaradev.netlify.app',
  credentials: true,
  methods: 'GET'
}))
// app.use(cors({
//origin: 'url',
//credentials: true,
//methods: GET
// }))

app.use("/api", seccionRoutes);
app.use("/api", requisitosRoute);
app.use("/api", cronogramaRoute);
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
