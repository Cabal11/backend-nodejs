import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT);

process.on("SIGTERM", () => {
  console.log("Recibido SIGTERM, cerrando servidor...");
  server.close(() => {
    process.exit(0);
  });
});

console.log("Puerto: ", PORT)