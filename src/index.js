const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const rutasFacturas = require("./facturas/facturas.routes");

// Carga las variables de entorno del archivo .env (no está en el repositorio por seguridad)
dotenv.config();

// Crea la instancia de Express para manejar las rutas del API
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para realizar validaciones y configurar los CORS
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Crea la instancia de la conexión con CosmosDB de Azure
connectDB();

// Rutas base
app.use("/facturas", rutasFacturas);

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
