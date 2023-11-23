import express from "express";
import bcrypt from "bcryptjs";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

/*
CREATE TABLE `cuentas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(25) NOT NULL,
  `password` varchar(150) NOT NULL,
  `persona_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `persona_id_UNIQUE` (`persona_id`),
  CONSTRAINT `fk_cuentas_personas_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
)
*/

export const cuentasRouter = express.Router();

cuentasRouter.post(
    "/",
    body("usuario").isAlphanumeric().isLength({ min: 1, max: 25 }),
    body("password").isStrongPassword({
      minLength: 4,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    body("personaId").isInt({ min: 1 }),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const { usuario, password, personaId } = req.body;
      const passwordHashed = await bcrypt.hash(password, 8);
      const [rows] = await db.execute(
        "INSERT INTO cuentas (usuario, password, persona_id) VALUES (:usuario, :password, :personaId)",
        { usuario, password: passwordHashed, personaId }
      );
      res.status(201).send({ id: rows.insertId, usuario, personaId });
    }
  )

cuentasRouter.get("/", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, usuario, persona_id as personaId FROM cuentas"
    );
    res.send(rows);
  });
cuentasRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT id, usuario, persona_id as personaId FROM cuentas WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Cuenta no encontrada" });
    }
  });
cuentasRouter.get("/:id/persona", async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT p.id, p.apellido, p.nombre \
      FROM personas p \
      JOIN cuentas c ON p.id = c.persona_id \
      WHERE c.id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Persona no encontrada" });
    }
  });
cuentasRouter.delete("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
    const { id } = req.params;
    await db.execute("DELETE FROM cuentas WHERE id = :id", { id });
    res.send("ok");
  });

  cuentasRouter.get(
    "/:id/reservas",
    param("id").isInt().isLength({ min: 1 }),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
      }
      const { id } = req.params;
      const [rows] = await db.execute(
        "SELECT reservas.fecha, reservas.hora, reservas.estado_reserva, clubes.direccion FROM reservas INNER JOIN canchas INNER JOIN clubes ON canchas.club_id = clubes.id_club WHERE reservas.cuenta_id = :id",
        {
          id
        }
      );
      res.status(200).send(rows);
    }
  );

  cuentasRouter.get(
  "/:id/personas",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    const [rows] = await db.execute(
      "SELECT cuentas.id,cuentas.usuario,personas.nombre,personas.apellido FROM cuentas INNER JOIN personas ON cuentas.persona_id = personas.id WHERE cuentas.id = 1;",
      {
        id,
      }
    );
    res.status(200).send(rows[0]);
  }
);