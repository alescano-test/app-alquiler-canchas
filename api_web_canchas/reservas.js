import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

export const reservasRouter = express.Router();

//! AGREGAR RESERVA
reservasRouter.post(
  "/",
  body("usuario"),
  body("turno"),
  body("estado"),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { usuario, turno, estado } = req.body;
    try {
      const [rows] = await db.execute(
        "INSERT INTO reservas (usuario, turno, estado) VALUES (:usuario, :turno, :estado)",
        { usuario, turno, estado }
      );
      res.status(201).send({ mensaje: "Reserva creada." });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);
//! OBTENER RESERVA POR ID
reservasRouter.get(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { id } = req.params;
    try {
      const [rows] = await db.execute(
        "SELECT * FROM reservas where reservaId =:id",
        { id }
      );
      if (rows.length > 0) {
        res.status(200).send(rows);
      } else {
        res.status(400).send({ mensaje: "Reserva no encontrada" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//! OBTENER TODAS LAS RESERVAS
reservasRouter.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM reservas");
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(400).send({ mensaje: "No hay reservas." });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//! MODIFICAR UNA RESERVA
reservasRouter.put(
  "/:id",
  body("usuario"),
  body("turno"),
  body("estado"),
  param("id"),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { id } = req.params;
    const { usuario, turno, estado } = req.body;

    try {
      const [rows] = await db.execute(
        "UPDATE reservas SET usuario=:usuario, turno=:turno, estado=:estado where reservaId=:id",
        {
          id,
          usuario,
          turno,
          estado,
        }
      );
      if (rows.affectedRows === 0) {
        res.status(400).send({ mensaje: "Reserva no encontrada" });
      } else {
        res.status(201).send({ mensaje: "Reserva modificada." });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);
//! ELIMINAR RESERVA
reservasRouter.delete(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { id } = req.params;
    try {
      const [rows] = await db.execute("DELETE FROM reservas WHERE reservaId=:id", {
        id: id,
      });
      if (rows.affectedRows === 0) {
        res.status(400).send({ mensaje: "Reserva no encontrada" });
      } else {
        res.status(200).send({ mensaje: "Reserva eliminada." });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);
