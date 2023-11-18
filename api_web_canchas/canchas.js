import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

/*
CREATE TABLE canchas (
  id_cancha INT PRIMARY KEY AUTO_INCREMENT,
  club_id INT NOT NULL,
  tipo_deporte VARCHAR(60) NOT NULL,
  dimensiones VARCHAR(45) NOT NULL,
  precio INT NOT NULL,
  suelo VARCHAR(60) NOT NULL,
  INDEX id_tipo_deporte_idx (tipo_deporte),
  CONSTRAINT fk_clubes_canchas -- Relación entre `canchas` y `clubes`
  FOREIGN KEY (club_id) REFERENCES clubes (id_club)
);
*/
export const canchasRouter = express.Router();

canchasRouter.post(
  "/",
  body("club_id").isInt().isLength({ min: 1 }),
  body("tipo_deporte")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 14 }),
  body("dimensiones")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 10 }),
  body("precio").isNumeric({ min: 1, max: 10000 }),
  body("suelo")
    .matches(/^[\p{L}\p{N}\s]+$/u)
    .isLength({ min: 1, max: 25 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { club_id, tipo_deporte, dimensiones, precio, suelo } = req.body;
    await db.execute(
      "INSERT INTO canchas (club_id, tipo_deporte, dimensiones, precio, suelo) VALUES (:club_id, :tipo_deporte, :dimensiones, :precio, :suelo)",
      {
        club_id: club_id,
        tipo_deporte: tipo_deporte,
        dimensiones: dimensiones,
        precio: precio,
        suelo: suelo,
      }
    );
    res.status(201).send({ mensaje: "Cancha agregada" });
  }
);

canchasRouter.get(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    const [rows] = await db.execute(
      "SELECT * FROM canchas WHERE id_cancha =:id",
      { id }
    );
    res.status(200).send(rows[0]);
  }
);

canchasRouter.get("/", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM canchas");
  res.status(200).send(rows);
});

canchasRouter.put(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    const { club_id, tipo_deporte, dimensiones, precio, suelo } = req.body;
    await db.execute(
      "UPDATE canchas SET club_id=:club_id, tipo_deporte=:tipo_deporte, dimensiones=:dimensiones, precio=:precio, suelo=:suelo WHERE id_cancha= :id",
      {
        id: id,
        club_id: club_id,
        tipo_deporte: tipo_deporte,
        dimensiones: dimensiones,
        precio: precio,
        suelo: suelo,
      }
    );
    res.status(200).send({ mensaje: "Cancha modificada" });
  }
);

canchasRouter.delete(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    await db.execute("delete from canchas where id_cancha= :id", { id });
    res.status(200).send({ mensaje: "Cancha eliminada" });
  }
);
