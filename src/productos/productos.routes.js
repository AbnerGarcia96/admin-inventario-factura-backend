import express from "express";
import productosController from "./productos.controller.js";

const rutasProductos = express.Router();
rutasProductos.get("/", productosController.obtenerProductos);
rutasProductos.get("/:id", productosController.obtenerDetalleProducto);
rutasProductos.post("/", productosController.agregarProducto);
rutasProductos.patch("/:id", productosController.editarProducto);

export default rutasProductos;
