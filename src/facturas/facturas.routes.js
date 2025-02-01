import express from "express";
import facturasController from "./facturas.controller.js";

const rutasFacturas = express.Router();
rutasFacturas.get("/", facturasController.obtenerProductos);
rutasFacturas.get("/:id", facturasController.obtenerDetalleProducto);
rutasFacturas.post("/", facturasController.agregarProducto);
rutasFacturas.patch("/:id", facturasController.editarProducto);

export default rutasFacturas;
