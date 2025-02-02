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

async function obtenerFacturas(req, res) {
  try {
    const respuesta = await facturasService.obtenerFacturas();
    res.status(respuesta.$metadata.httpStatusCode).json(respuesta.Items);
  } catch (error) {
    console.error(`[FACTURAS.CONTROLLER] ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}

async function obtenerDetalleFactura(req, res) {
  try {
    const idFactura = req.params.id;
    const respuesta = await facturasService.obtenerDetalleFactura(idFactura);
    if (respuesta.Item) {
      res.status(respuesta.$metadata.httpStatusCode).json(respuesta.Item);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    console.error(`[FACTURAS.CONTROLLER] ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}

async function agregarFactura(req, res) {
  try {
    const factura = {
      ...JSON.parse(req.query.factura),
      idFactura: uuidv4(),
      creado: new Date().toISOString(),
      modificado: null,
      eliminado: false,
    };

    validarParametros(factura);

    await facturasService.agregarFactura(factura);

    res.status(201).json(factura);
  } catch (error) {
    console.error(`[FACTURAS.CONTROLLER] ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}

async function editarFactura(req, res) {
  try {
    const { idFactura, ...camposActualizados } = JSON.parse(req.query.factura);

    camposActualizados.modificado = new Date().toISOString();

    await facturasService.editarFactura(idFactura, camposActualizados);

    res.status(200).json({ idFactura, ...camposActualizados });
  } catch (error) {
    console.error(`[FACTURAS.CONTROLLER] ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}

const facturasController = {
  obtenerFacturas,
  obtenerDetalleFactura,
  agregarFactura,
  editarFactura,
};

export default facturasController;
