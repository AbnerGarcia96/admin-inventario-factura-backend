const express = require("express");
const router = express.Router();
const facturasController = require("./facturas.controller");

router.get("/", facturasController.obtenerFacturas);
router.get("/:id", facturasController.obtenerDetallesFactura);
router.post("/", facturasController.crearFactura);
router.delete("/:id", facturasController.eliminarFactura);
router.patch("/:id", facturasController.editarFactura);

module.exports = router;
