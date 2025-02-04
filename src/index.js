import "dotenv/config";
import express from "express";
import cors from "cors";
import rutasFacturas from "./facturas/facturas.routes.js";
import rutasProductos from "./productos/productos.routes.js";
import rutasAutenticacion from "./autenticacion/autenticacion.routes.js";

// Crea la instancia de Express para manejar las rutas del API
const app = express();
const HOST_URL = process.env.HOST_URL || 3000;
const PORT = process.env.PORT || 3000;

// Middleware para realizar validaciones y configurar los CORS
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Rutas base
app.use("/facturas", rutasFacturas);
app.use("/productos", rutasProductos);
app.use("/autenticacion", rutasAutenticacion);

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${HOST_URL}:${PORT}/`);
});
