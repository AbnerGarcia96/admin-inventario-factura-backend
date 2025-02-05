import express from "express";
import sucursalesController from "./sucursales.controller.js";

const rutasSucursales = express.Router();
rutasSucursales.get("/:id", sucursalesController.obtenerDetalleSucursal);

export default rutasSucursales;
