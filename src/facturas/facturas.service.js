require("dotenv").config();
const { getContainer } = require("../config/db");

const NOMBRE_CONTAINER = "facturas";

exports.obtenerFacturas = async () => {
  try {
    const container = getContainer(NOMBRE_CONTAINER);
    const query = {
      query: "SELECT * FROM c WHERE c.estado != @estado",
      parameters: [{ name: "@estado", value: "Eliminada" }],
    };
    const { resources: facturas } = await container.items
      .query(query)
      .fetchAll();
    return facturas;
  } catch (error) {
    console.error(
      `[FACTURAS] Error obteniendo las facturas de ${NOMBRE_CONTAINER}:`,
      error.message
    );
    throw error;
  }
};

exports.obtenerDetallesFactura = async (id) => {
  try {
    const container = getContainer(NOMBRE_CONTAINER);
    const { resource: factura } = await container.item(id).read();

    if (!factura) {
      throw {
        name: "FacturaNoEncontrada",
        message: `No se ha encontrado la factura con id ${id}`,
      };
    }

    if (factura.estado === "Eliminada") {
      throw {
        name: "FacturaNoEncontrada",
        message: `No se ha encontrado la factura con id ${id}`,
      };
    }

    return factura;
  } catch (error) {
    console.error(
      `[FACTURAS] Error obteniendo los detalles de la factura con ID ${id}:`,
      error.message
    );
    throw error;
  }
};

exports.crearFactura = async (factura) => {
  try {
    const container = getContainer(NOMBRE_CONTAINER);
    const { resource } = await container.items.create(factura);
    return resource;
  } catch (error) {
    console.error(
      `[FACTURAS] Error insertando nuevo registro en la base de datos`,
      error.message
    );
    throw error;
  }
};

exports.editarFactura = async (id, camposActualizados) => {
  try {
    const container = getContainer(NOMBRE_CONTAINER);
    const { resource: factura } = await container.item(id).read();

    if (!factura) {
      throw {
        name: "FacturaNoEncontrada",
        message: `No se ha encontrado la factura con id ${id}`,
      };
    }

    const facturaActualizada = { ...factura, ...camposActualizados };
    await container.item(id).replace(facturaActualizada);

    return facturaActualizada;
  } catch (error) {
    console.error(
      `[FACTURAS] Error eliminando registro con id ${id}`,
      error.message
    );
    throw error;
  }
};

exports.eliminarFactura = async (id) => {
  try {
    const container = getContainer(NOMBRE_CONTAINER);
    const { resource: factura } = await container.item(id).read();

    if (!factura) {
      throw {
        name: "FacturaNoEncontrada",
        message: `No se ha encontrado la factura con id ${id}`,
      };
    }

    const facturaEliminada = { ...factura, estado: "Eliminada" };
    await container.item(id).replace(facturaEliminada);

    return facturaEliminada;
  } catch (error) {
    console.error(
      `[FACTURAS] Error eliminando registro con id ${id}`,
      error.message
    );
    throw error;
  }
};
