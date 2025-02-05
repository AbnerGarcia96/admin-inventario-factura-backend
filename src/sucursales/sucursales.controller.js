import sucursalesService from "./sucursales.service.js";

async function obtenerDetalleSucursal(req, res) {
  try {
    const idSucursal = req.params.id;
    const respuesta = await sucursalesService.obtenerDetalleSucursal(
      idSucursal
    );
    if (respuesta.Item) {
      res.status(respuesta.$metadata.httpStatusCode).json(respuesta.Item);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    console.error(`[SUCURSALES.CONTROLLER] ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}

const sucursalesController = {
  obtenerDetalleSucursal,
};

export default sucursalesController;
