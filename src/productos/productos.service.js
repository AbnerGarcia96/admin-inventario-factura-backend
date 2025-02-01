import {
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import clienteDynamoDB from "../config/db.js";

const NOMBRE_TABLA = "productos";

async function obtenerProductos() {
  try {
    const comando = new ScanCommand({
      TableName: NOMBRE_TABLA,
    });
    const respuesta = await clienteDynamoDB.send(comando);
    return respuesta;
  } catch (error) {
    console.error(`[PRODUCTOS.SERVICE] ${error.message}`);
    throw error;
  }
}

async function obtenerDetalleProducto(idProducto) {
  try {
    const comando = new GetCommand({
      TableName: NOMBRE_TABLA,
      Key: { idProducto },
    });
    const respuesta = await clienteDynamoDB.send(comando);
    return respuesta;
  } catch (error) {
    console.error(`[PRODUCTOS.SERVICE] ${error.message}`);
    throw error;
  }
}

async function agregarProducto(producto) {
  try {
    const comando = new PutCommand({
      TableName: NOMBRE_TABLA,
      Item: producto,
    });

    await clienteDynamoDB.send(comando);

    return producto;
  } catch (error) {
    console.error(`[PRODUCTOS.SERVICE] ${error.message}`);
    throw error;
  }
}

async function editarProducto(idProducto, camposActualizados) {
  try {
    const expresionActualizar = Object.keys(camposActualizados)
      .map((key, index) => `#attr${index} = :val${index}`)
      .join(", ");

    const expresionNombresAtributo = Object.keys(camposActualizados).reduce(
      (acc, key, index) => {
        acc[`#attr${index}`] = key;
        return acc;
      },
      {}
    );

    const expresionValoresAtributo = Object.keys(camposActualizados).reduce(
      (acc, key, index) => {
        acc[`:val${index}`] = camposActualizados[key];
        return acc;
      },
      {}
    );

    const comando = new UpdateCommand({
      TableName: NOMBRE_TABLA,
      Key: { idProducto },
      UpdateExpression: `SET ${expresionActualizar}`,
      ExpressionAttributeNames: expresionNombresAtributo,
      ExpressionAttributeValues: expresionValoresAtributo,
      ReturnValues: "UPDATED_NEW",
    });

    await clienteDynamoDB.send(comando);

    return response;
  } catch (error) {
    console.error(`[PRODUCTOS.CONTROLLER] ${error.message}`);
    throw error;
  }
}

const productosService = {
  obtenerProductos,
  obtenerDetalleProducto,
  agregarProducto,
  editarProducto,
};
export default productosService;
