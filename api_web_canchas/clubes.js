import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

export const clubesRouter = express.Router();

//!CREAR CLUB
clubesRouter.post(
  "/",
  body("nombre").isLength({ min: 1, max: 45 }),
  body("direccion").isLength({ min: 1, max: 100 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { nombre, direccion, telefono } = req.body;
    try {
      const [rows] = await db.execute(
        "INSERT INTO clubes (nombre, direccion) VALUES (:nombre, :direccion)",
        {
          nombre: nombre,
          direccion: direccion,
        }
      );
      console.log(rows);
      res.status(201).send({ mensaje: "Club agregado" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//!EDITAR CLUB
clubesRouter.put(
  "/:id",
  body("nombre").isLength({ min: 1, max: 25 }),
  body("direccion").isLength({ min: 1, max: 100 }),

  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    const { nombre, direccion } = req.body;
    
    try {
      const [rows] = await db.execute(
        "update clubes set nombre=:nombre, direccion=:direccion WHERE clubId=:id",
        {
          id: id,
          nombre: nombre,
          direccion: direccion,
        }
      );
      res.status(200).send({ mensaje: "Datos del Club modificados." });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//!ELIMINAR CLUB
clubesRouter.delete("/:id", param("id"), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errors: validacion.array() });
  }
  const { id } = req.params;
  try {
    const [rows] = await db.execute("delete from clubes where clubId=:id", {
      id,
    });
    if (rows.affectedRows === 0) {
      res.status(400).send({ mensaje: "No se encontró el club." });
    } else {
      res.status(200).send({ mensaje: "Club eliminado" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//!BUSCAR CLUB POR ID
clubesRouter.get("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errors: validacion.array() });
  }
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM clubes WHERE clubId=:id", {
      id,
    });
    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Club no encontrado." });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//!BUSCAR TODOS LOS CLUBES
clubesRouter.get("/", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM clubes");
  try {
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send("No hay clubes");
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//BUSCA LAS CANCHAS POR EL ID CLUB
clubesRouter.get("/:id/canchas", param("id").isInt({ min: 1 }), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    res.status(400).send({ errors: validacion.array() });
  }
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT ca.canchaId, ca.tipo_deporte, ca.cant_jugadores, ca.precio, cl.nombre FROM canchas ca JOIN clubes cl ON ca.club = cl.clubId WHERE cl.clubId = :id;", {
      id,
    });
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send({ mensaje: "Club no encontrado." });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
