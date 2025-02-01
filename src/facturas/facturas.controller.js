import { v4 as uuidv4 } from "uuid";
import facturasService from "./facturas.service.js";

function validarParametros(parametros) {
  const CAMPOS_OBLIGATORIOS = [];

  for (let campo of CAMPOS_OBLIGATORIOS) {
    if (!(campo in parametros)) {
      throw {
        name: "CampoFaltante",
        message: `Hace falta el campo ${campo} en los parámetros de la factura`,
      };
    }
  }
}

async function obtenerFacturas(req, res) {}

async function obtenerDetalleFactura(req, res) {}

async function agregarFactura(req, res) {}

async function editarFactura(req, res) {}

const productosController = {
  obtenerFacturas,
  obtenerDetalleFactura,
  agregarFactura,
  editarFactura,
};

export default productosController;
