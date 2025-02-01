import { v4 as uuidv4 } from "uuid";
import productosService from "./productos.service.js";

function validarParametros(parametros) {
  const CAMPOS_OBLIGATORIOS = [
    "idProducto",
    "nombre",
    "descripcion",
    "marca",
    "precio",
  ];

  for (let campo of CAMPOS_OBLIGATORIOS) {
    if (!(campo in parametros)) {
      throw {
        name: "CampoFaltante",
        message: `Hace falta el campo ${campo} en los parámetros del producto`,
      };
    }
  }
}

async function obtenerProductos(req, res) {
  try {
    const respuesta = await productosService.obtenerProductos();
    res.status(respuesta.$metadata.httpStatusCode).json(respuesta.Items);
  } catch (error) {
    console.error(`[PRODUCTOS.CONTROLLER] ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}

async function obtenerDetalleProducto(req, res) {
  try {
    const idProducto = req.params.id;
    const respuesta = await productosService.obtenerDetalleProducto(idProducto);
    if (respuesta.Item) {
      res.status(respuesta.$metadata.httpStatusCode).json(respuesta.Item);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    console.error(`[PRODUCTOS.CONTROLLER] ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}

async function agregarProducto(req, res) {
  try {
    const producto = {
      ...JSON.parse(req.query.producto),
      idProducto: uuidv4(),
    };

    validarParametros(producto);

    productosService.agregarProducto(producto);

    res.status(201).json(producto);
  } catch (error) {
    console.error(`[PRODUCTOS.CONTROLLER] ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}

async function editarProducto(req, res) {
  try {
    const { idProducto, ...camposActualizados } = JSON.parse(
      req.query.producto
    );

    const respuesta = productosService.editarProducto(
      idProducto,
      camposActualizados
    );

    res.status(200).json(respuesta);
  } catch (error) {
    console.error(`[PRODUCTOS.CONTROLLER] ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}

const productosController = {
  obtenerProductos,
  obtenerDetalleProducto,
  agregarProducto,
  editarProducto,
};

export default productosController;
