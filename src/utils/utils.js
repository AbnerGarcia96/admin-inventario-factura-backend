import "dotenv/config";
import jwt from "jsonwebtoken";

function obtenerExpresionesAWS(camposActualizados) {
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

  return [
    expresionActualizar,
    expresionNombresAtributo,
    expresionValoresAtributo,
  ];
}

function generarTokenAutenticacion(usuario) {
  const dataJWT = {idUsuario: usuario.idUsuario, roles: usuario.roles}
  const token = jwt.sign(dataJWT, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRACION_JWT_TOKEN,
  });
  return token;
}

function verificarTokenAutenticacion(token) {
  try {
    const data = jwt.verify(token, SECRET_KEY);
    return data;
  } catch (error) {
    throw error;
  }
}

const utils = {
  obtenerExpresionesAWS,
  generarTokenAutenticacion,
  verificarTokenAutenticacion,
};

export default utils;
