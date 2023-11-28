import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

export const canchasRouter = express.Router();

//!AGREGAR CANCHAS
canchasRouter.post(
  "/",
  body("club").isInt().isLength({ min: 1 }),
  body("tipo_deporte").isLength({ min: 1, max: 14 }),
  body("cant_jugadores").isInt().isLength({ min: 1 }),
  body("precio").isNumeric({ min: 1, max: 10000 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { club, tipo_deporte, cant_jugadores, precio } = req.body;
    try {
      const [rows] = await db.execute(
        "INSERT INTO canchas (club, tipo_deporte, cant_jugadores, precio) VALUES (:club, :tipo_deporte, :cant_jugadores, :precio)",
        {
          club,
          tipo_deporte,
          cant_jugadores,
          precio,
        }
      );
      res.status(201).send({ mensaje: "Cancha agregada" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//! BUSCAR CANCHAS POR ID
canchasRouter.get(
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
        "SELECT * FROM canchas WHERE canchaId =:id",
        { id }
      );
      if (rows.length === 0) {
        res.status(400).send({ mensaje: "No se encontró la cancha." });
      } else {
        res.status(200).send(rows[0]);
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//! BUSCAR TODAS LAS CANCHAS
canchasRouter.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM canchas");
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(400).send({ mensaje: "No hay canchas" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//! EDITAR CANCHAS
canchasRouter.put(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    const { club, tipo_deporte, cant_jugadores, precio } = req.body;
    try {
      const [rows] = await db.execute(
        "UPDATE canchas SET club=:club, cant_jugadores=:cant_jugadores, tipo_deporte=:tipo_deporte,  precio=:precio WHERE canchaId= :id",
        {
          id,
          club,
          tipo_deporte,
          cant_jugadores,
          precio,
        }
      );
      if(rows.affectedRows === 0) {
        res.status(400).send({ mensaje: "No se encontró la cancha." });
      } else {
        res.status(200).send({ mensaje: "Cancha modificada" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//! ELIMINAR CANCHAS
canchasRouter.delete(
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
        "delete from canchas where id_cancha= :id",
        { id }
      );
      if (rows.affectedRows === 0) {
        res.status(400).send({ mensaje: "No se encontró la cancha." });
      } else {
        res.status(200).send({ mensaje: "Cancha eliminada" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);
