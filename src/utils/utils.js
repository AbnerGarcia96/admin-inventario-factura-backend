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

const utils = {
  obtenerExpresionesAWS,
};

export default utils;
