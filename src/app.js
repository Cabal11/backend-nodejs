import express from "express";
import seccionRoutes from "./routes/seccion.routes.js";
import requisitosRoute from "./routes/requisitos.routes.js";
import cronogramaRoute from "./routes/cronograma.routes.js";

const app = express();

//Recibir los datos y convertilos en json
app.use(express.json());

app.use("/api", seccionRoutes);
app.use("/api", requisitosRoute);
app.use("/api", cronogramaRoute);

// Si ingresan la ruta incorrecta o que no existe
app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

export default app;
