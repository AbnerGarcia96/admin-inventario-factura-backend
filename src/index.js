import "dotenv/config";
import express from "express";
import cors from "cors";
// import rutasFacturas from "./facturas/facturas.routes";
import rutasProductos from "./productos/productos.routes.js";

// Crea la instancia de Express para manejar las rutas del API
const app = express();
const HOST_URL = process.env.HOST_URL || 3000;
const PORT = process.env.PORT || 3000;

// Middleware para realizar validaciones y configurar los CORS
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Crea la instancia de la conexión con CosmosDB de Azure
//connectDB();

// Rutas base
// app.use("/facturas", rutasFacturas);
app.use("/productos", rutasProductos);

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${HOST_URL}:${PORT}/`);
});
