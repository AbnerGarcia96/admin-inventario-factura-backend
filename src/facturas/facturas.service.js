import {
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import clienteDynamoDB from "../config/db.js";

const NOMBRE_TABLA = "facturas";

async function obtenerFacturas() {}

async function obtenerDetalleFactura(idProducto) {}

async function agregarFactura(producto) {}

async function editarFactura(idProducto, camposActualizados) {}

const productosService = {
  obtenerFacturas,
  obtenerDetalleFactura,
  agregarFactura,
  editarFactura,
};
export default productosService;
