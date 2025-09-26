import express from "express"
import seccionRoutes from "./routes/seccion.routes.js"

const app = express();

//Recibir los datos y convertilos en json
app.use(express.json());

app.use("/api", seccionRoutes)


// Si ingresan la ruta incorrecta o que no existe
app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

export default app;