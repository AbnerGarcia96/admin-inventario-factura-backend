const facturasService = require("./facturas.service");

// Función para validar que los campos se encuentran antes de insertarlos a la DB
function validarParametros(parametros) {
  const CAMPOS_OBLIGATORIOS_FACTURA = [
    "fecha",
    "cliente",
    "productos",
    "subtotal",
    "impuesto",
    "total",
    "estado",
  ];
  const CAMPOS_OBLIGATORIOS_CLIENTE = ["nombre", "correo", "direccion"];
  const CAMPOS_OBLIGATORIOS_PRODUCTO = [
    "descripcion",
    "cantidad",
    "precioUnitario",
    "total",
  ];

  // Verifica que se encuentren los campos obligatorios en la factura
  for (let campo of CAMPOS_OBLIGATORIOS_FACTURA) {
    if (!(campo in parametros)) {
      throw {
        name: "CampoFaltante",
        message: `Hace falta el campo ${campo} en los parámetros de la factura`,
      };
    }
  }

  // Verifica el formato del cliente y si se encuentran todos sus campos obligatorios
  if (typeof parametros.cliente !== "object") {
    throw {
      name: "FormatoIncorrecto",
      message: `El formato del cliente es incorrecto`,
    };
  }

  for (let campo of CAMPOS_OBLIGATORIOS_CLIENTE) {
    if (!(campo in parametros.cliente)) {
      throw {
        name: "CampoFaltante",
        message: `Hace falta el campo ${campo} en los parámetros del cliente`,
      };
    }
  }

  // Verifica el formato de los productos
  if (
    !Array.isArray(parametros.productos) ||
    parametros.productos.length === 0
  ) {
    throw {
      name: "FormatoIncorrecto",
      message: `El formato de los productos es incorrecto`,
    };
  }

  // Verifica si se encuentran todos sus campos obligatorios
  for (let producto of parametros.productos) {
    for (let campo of CAMPOS_OBLIGATORIOS_PRODUCTO) {
      if (!(campo in producto)) {
        throw {
          name: "CampoFaltante",
          message: `Hace falta el campo ${campo} en los parámetros del producto`,
        };
      }
    }
  }
}

exports.obtenerFacturas = async (req, res) => {
  try {
    const facturas = await facturasService.obtenerFacturas();
    res.status(200).json(facturas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerDetallesFactura = async (req, res) => {
  try {
    const idFactura = req.params.id;
    const detallesFactura = await facturasService.obtenerDetallesFactura(
      idFactura
    );
    res.status(200).json(detallesFactura);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.crearFactura = async (req, res) => {
  try {
    const parametros = {
      ...req.query,
      cliente: JSON.parse(req.query.cliente),
      productos: JSON.parse(req.query.productos),
    };
    validarParametros(parametros);
    const respuesta = await facturasService.crearFactura(parametros);
    res.status(201).json(respuesta);
  } catch (error) {
    if (error.name === "CampoFaltante" || error.name === "FormatoIncorrecto") {
      res.status(422).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.eliminarFactura = async (req, res) => {
  try {
    const idFactura = req.params.id;
    const facturaEliminada = await facturasService.eliminarFactura(idFactura);
    res.status(200).json(facturaEliminada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editarFactura = async (req, res) => {
  try {
    const idFactura = req.params.id;
    const camposActualizados = {
      ...req.query,
      // cliente: JSON.parse(req.query.cliente || ""),
      // productos: JSON.parse(req.query.productos || ""),
    };
    const facturaEditada = await facturasService.editarFactura(
      idFactura,
      camposActualizados
    );
    res.status(200).json(facturaEditada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
