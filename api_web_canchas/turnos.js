import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

export const turnosRouter = express.Router();

//! AGREGAR TURNO
turnosRouter.post(
  "/",
  body("cancha").isInt().isLength({ min: 1 }),
  body("precio").isNumeric(),
  body("estado"),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { cancha, fecha, hora, precio, estado } = req.body;
    try {
      const [rows] = await db.execute(
        "INSERT INTO turnos (cancha, fecha, hora, precio, estado) VALUES (:cancha, :fecha, :hora, :precio, :estado)",
        { cancha, fecha, hora, precio, estado }
      );
      res.status(201).send({ mensaje: "Turno agregado." });
    } catch (error) {
      res.status(400).send({ errors: validacion.array() });
    }
  }
);
//! OBTENER TURNOS POR ID
turnosRouter.get(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    try {
      const [rows] = await db.execute(
        "SELECT * FROM turnos where turnoId = :id",
        { id }
      );
      if (rows.length === 0) {
        res.status(404).send({ mensaje: "No se encontraron turnos." });
      } else {
        res.status(200).send(rows[0]);
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//! OBTENER TODOS LOS TURNOS
turnosRouter.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM turnos");
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send({ mensaje: "No se encontraron turnos." });
    }
  } catch (error) {
    res.status(400).send({ errors: validacion.array() });
  }
});

//! EDITAR TURNOS POR ID
turnosRouter.put(
  "/:id",
  body("cancha").isInt().isLength({ min: 1 }),
  body("precio").isNumeric(),
  body("estado"),
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { id } = req.params;
    const { cancha, fecha, hora, precio, estado } = req.body;
    try {
      const [rows] = await db.execute(
        "UPDATE turnos SET cancha=:cancha, fecha=:fecha, hora=:hora, precio=:precio, estado=:estado where turnoId=:id",
        {
          id: id,
          cancha: cancha,
          fecha: fecha,
          hora: hora,
          precio: precio,
          estado: estado,
        }
      );
      if (rows.affectedRows === 0) {
        res
          .status(400)
          .send({ mensaje: "Turno no encontrada para modificarse" });
      } else {
        res.status(200).send({ mensaje: "Turno modificado." });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//! BORRAR TURNOS POR ID
turnosRouter.delete("/:id", param("id"), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errors: validacion.array() });
    return;
  }
  const { id } = req.params;
  try {
    const [rows] = await db.execute("DELETE FROM turnos WHERE turnoId= :id", { id });
    if (rows.affectedRows === 0) {
      res.status(400).send({ mensaje: "No se encontró el turno." });
    } else {
      res.status(200).send({ mensaje: "Turno eliminado." });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
