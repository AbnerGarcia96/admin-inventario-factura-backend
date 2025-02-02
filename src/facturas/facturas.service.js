import {
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import clienteDynamoDB from "../config/db.js";
import utils from "../utils/utils.js";

const NOMBRE_TABLA = "facturas";

async function obtenerFacturas() {
  try {
    const comando = new ScanCommand({
      TableName: NOMBRE_TABLA,
    });
    const respuesta = await clienteDynamoDB.send(comando);
    return respuesta;
  } catch (error) {
    console.error(`[FACTURAS.SERVICE] ${error.message}`);
    throw error;
  }
}

async function obtenerDetalleFactura(idFactura) {
  try {
    const comando = new GetCommand({
      TableName: NOMBRE_TABLA,
      Key: { idFactura },
    });
    const respuesta = await clienteDynamoDB.send(comando);
    return respuesta;
  } catch (error) {
    console.error(`[FACTURAS.SERVICE] ${error.message}`);
    throw error;
  }
}

async function agregarFactura(factura) {
  try {
    const comando = new PutCommand({
      TableName: NOMBRE_TABLA,
      Item: factura,
    });

    await clienteDynamoDB.send(comando);

    return factura;
  } catch (error) {
    console.error(`[FACTURAS.SERVICE] ${error.message}`);
    throw error;
  }
}

async function editarFactura(idFactura, camposActualizados) {
  try {
    const [
      expresionActualizar,
      expresionNombresAtributo,
      expresionValoresAtributo,
    ] = utils.obtenerExpresionesAWS(camposActualizados);

    const comando = new UpdateCommand({
      TableName: NOMBRE_TABLA,
      Key: { idFactura },
      UpdateExpression: `SET ${expresionActualizar}`,
      ExpressionAttributeNames: expresionNombresAtributo,
      ExpressionAttributeValues: expresionValoresAtributo,
      ReturnValues: "UPDATED_NEW",
    });

    await clienteDynamoDB.send(comando);
  } catch (error) {
    console.error(`[FACTURAS.SERVICE] ${error.message}`);
    throw error;
  }
}

const facturasService = {
  obtenerFacturas,
  obtenerDetalleFactura,
  agregarFactura,
  editarFactura,
};
export default facturasService;
