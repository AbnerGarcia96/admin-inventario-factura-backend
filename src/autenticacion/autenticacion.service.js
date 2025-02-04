import {
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import utils from "../utils/utils.js";
import clienteDynamoDB from "../config/db.js";

const NOMBRE_TABLA = "usuarios";

/*
TODO: Implementar un algoritmo de hash dedicado para contraseñas, como ARGON2 o bcrypt (este ultimo se puede usar en JWT)
Para pruebas
    Correo: prueba@gmail.com
    Contraseña: SHA256("asd.123") -> 93e193d5f8ec7be31b936589dcb0f2afd4decb21f6f471fb33a6c35f3406a931
*/
async function login(correo, contrasena) {
  try {
    const comando = new QueryCommand({
      TableName: NOMBRE_TABLA,
      IndexName: "correo-index",
      KeyConditionExpression: "correo = :correo",
      FilterExpression: "contrasena = :contrasena",
      ExpressionAttributeValues: {
        ":correo": correo,
        ":contrasena": contrasena,
      },
    });

    const respuesta = await clienteDynamoDB.send(comando);

    return respuesta;
  } catch (error) {
    console.error(`[AUTENTICACION.SERVICE] ${error.message}`);
    throw error;
  }
}

const autenticacionService = {
  login,
};
export default autenticacionService;
