import {
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import clienteDynamoDB from "../config/db.js";

const NOMBRE_TABLA = "sucursales";

/*
TODO: Implementar el método de utils.obtenerExpresionesAWS
*/
async function obtenerDetalleSucursal(idSucursal) {
  try {
    const comando = new GetCommand({
      TableName: NOMBRE_TABLA,
      Key: { idSucursal },
    });
    const respuesta = await clienteDynamoDB.send(comando);
    return respuesta;
  } catch (error) {
    console.error(`[SUCURSALES.SERVICE] ${error.message}`);
    throw error;
  }
}

const sucursalesService = {
  obtenerDetalleSucursal,
};
export default sucursalesService;
