import express from "express";
import facturasController from "./facturas.controller.js";

const rutasFacturas = express.Router();
rutasFacturas.get("/", facturasController.obtenerFacturas);
rutasFacturas.get("/:id", facturasController.obtenerDetalleFactura);
rutasFacturas.post("/", facturasController.agregarFactura);
rutasFacturas.patch("/:id", facturasController.editarFactura);

export default rutasFacturas;
