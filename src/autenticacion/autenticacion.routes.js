import jwt from "jsonwebtoken";
import express from "express";
import autenticacionController from "./autenticacion.controller.js";

const rutasAutenticacion = express.Router();
rutasAutenticacion.post("/login", autenticacionController.login);
// TODO: Implementar esta verificacion para acceder a cada ruta
rutasAutenticacion.get("/verificar", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      "68da296a73b46e355de54bbe79c4f5bb267a1d96fe219b5e771c237642b55fba1f36beb0bd4a4fe5f2dde5574776488e967576689f5260893aa5f1570defeeff"
    );
    console.log("JWT Payload:", decoded);
    res.json({ message: "Access granted", user: decoded });
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

export default rutasAutenticacion;
