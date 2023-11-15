import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

/*
CREATE TABLE clubes (
  id_club INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(25) NOT NULL
);
*/

export const clubesRouter = express.Router();

//? Método POST
clubesRouter.post(
  "/",
  body("nombre")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 45 })
    .withMessage("El nombre debe tener entre 1 y 45 caracteres"),
  body("direccion")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 100 })
    .withMessage("La dirección debe tener entre 1 y 100 caracteres"),
  body("telefono")
    .isLength({ min: 10, max: 12 })
    .withMessage("El teléfono debe tener entre 10 y 12 caracteres"),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { nombre, direccion, telefono } = req.body;
    await db.execute(
      "INSERT INTO clubes (nombre, direccion, telefono) VALUES (:nombre, :direccion, :telefono)",
      {
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
      }
    );
    res.status(201).send({ mensaje: "Club agregado" });
  }
);

clubesRouter.get("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    //? Si la validación es diferente a vacía
    res.status(400).send({ errors: validacion.array() });
  }
  const { id } = req.params;
  const [rows] = await db.execute("SELECT * FROM clubes WHERE ID_CLUB=:id", {
    id,
  });
  if (rows.length > 0) {
    res.status(200).send(rows[0]);
  } else {
    res.status(404).send("Club no encontrado");
  }
});

clubesRouter.get("/", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM clubes");
  if (rows.length > 0) {
    res.status(200).send(rows);
  } else {
    res.status(404).send("No hay clubes");
  }
});

clubesRouter.put(
  "/:id",
  body("nombre")
    .isLength({ min: 1, max: 45 })
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .withMessage("El nombre debe tener entre 1 y 45 caracteres"),
  body("direccion")
    .matches(/^[\p{L}\p{N}\s,]+$/u)
    .isLength({ min: 1, max: 100 })
    .withMessage("La dirección debe tener entre 1 y 100 caracteres"),
  body("telefono")
    .isLength({ min: 10, max: 12 })
    .withMessage("El teléfono debe tener entre 10 y 12 caracteres"),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
    await db.execute(
      "update clubes set nombre=:nombre, direccion=:direccion, telefono=:telefono WHERE id_club=:id",
      {
        id: id,
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
      }
    );
    res.status(200).send({ mensaje: "Datos del Club modificados." });
  }
);

clubesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await db.execute("delete from clubes where id_club=:id", { id });
  res.status(200).send({ mensaje: "Club eliminado" });
});
