import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

/*
CREATE TABLE usuarios (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45) NOT NULL,
  email VARCHAR(60) NOT NULL,
  contrasenia VARCHAR(45) NOT NULL,
  telefono VARCHAR(45) NOT NULL,
  rol VARCHAR(20) NOT NULL
);
*/

export const personasRouter = express.Router();
//* Agregar personas
personasRouter.post(
  "/",
  body("nombre")
    .matches(/^[\p{L}\s]+$/u)
    .isLength({ min: 1, max: 35 }),
  body("apellido")
    .matches(/^[\p{L}\s]+$/u)
    .isLength({ min: 1, max: 35 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }

    const { nombre, apellido } = req.body;
    const [rows] = await db.execute(
      "INSERT INTO personas (nombre, apellido) VALUES (:nombre, :apellido)",
      { nombre, apellido }
    );
    res.status(201).send({ nombre, apellido });
  }
);

//* Consultar todas las personas
personasRouter
  .get("/", async (req, res) => {
    const [rows] = await db.execute("SELECT * FROM personas");
    res.send(rows);
  })

  //* Consultar persona por ID
  .get("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { id } = req.params;
    const [rows] = await db.execute("SELECT * FROM personas WHERE id = :id", {
      id,
    });
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Persona no encontrada" });
    }
  });

