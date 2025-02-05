import utils from "../utils/utils.js";
import autenticacionService from "./autenticacion.service.js";

async function login(req, res) {
  try {
    const credenciales = {
      correo: req.body.correo,
      contrasena: req.body.contrasena,
    };

    const respuesta = await autenticacionService.login(
      credenciales.correo,
      credenciales.contrasena
    );

    if (respuesta.Count === 0) {
      res.status(401).json({ message: "Correo o contraseña incorrectos" });
    } else {
      const usuario = {
        nombre: respuesta.Items[0].nombre,
        apellido: respuesta.Items[0].apellido,
        token: utils.generarTokenAutenticacion(respuesta.Items[0]),
      };

      res.status(200).json(usuario);
    }
  } catch (error) {
    console.error(`[AUTENTICACION.CONTROLLER] ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}

const autenticacionController = {
  login,
};

export default autenticacionController;
