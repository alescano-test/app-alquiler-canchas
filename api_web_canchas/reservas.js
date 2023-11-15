import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

/*
CREATE TABLE reservas (
  id_reserva INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  cancha_id INT NOT NULL,
  cant_jugadores INT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  estado_reserva VARCHAR(45) NOT NULL,
  CONSTRAINT fk_usuarios_reservas -- Relación entre `reservas` y `usuarios`
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id_usuario),
  CONSTRAINT fk_canchas_reservas -- Relación entre `reservas` y `canchas`
  FOREIGN KEY (cancha_id) REFERENCES canchas (id_cancha)
);
*/

export const reservasRouter = express.Router();

reservasRouter.post(
  "/",
  body("usuario_id").isInt({ min: 1 }),
  body("cancha_id").isInt({ min: 1 }),
  body("cant_jugadores").isInt({ min: 1 }),
  body("fecha").isISO8601(),
  body("hora"),
  body("estado_reserva"),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const {
      usuario_id,
      cancha_id,
      cant_jugadores,
      fecha,
      hora,
      estado_reserva,
    } = req.body;
    await db.execute(
      "INSERT INTO reservas (usuario_id, cancha_id, cant_jugadores, fecha, hora, estado_reserva) VALUES (:usuario_id, :cancha_id, :cant_jugadores, :fecha, :hora, :estado_reserva)",
      {
        usuario_id: usuario_id,
        cancha_id: cancha_id,
        cant_jugadores: cant_jugadores,
        fecha: fecha,
        hora: hora,
        estado_reserva: estado_reserva,
      }
    );
    res.status(201).send({ mensaje: "Reserva completada" });
  }
);

reservasRouter.put(
  "/:id",
  body("usuario_id").isInt({ min: 1 }),
  body("cancha_id").isInt({ min: 1 }),
  body("cant_jugadores").isInt({ min: 1 }),
  body("fecha").isISO8601(),
  body("hora"),
  body("estado_reserva"),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    const {
      usuario_id,
      cancha_id,
      cant_jugadores,
      fecha,
      hora,
      estado_reserva,
    } = req.body;
    await db.execute(
      "UPDATE reservas set usuario_id=:usuario_id, cancha_id=:cancha_id, cant_jugadores=:cant_jugadores, fecha=:fecha, hora=:hora, estado_reserva=:estado_reserva where id_reserva=:id",
      {
        id,
        usuario_id: usuario_id,
        cancha_id: cancha_id,
        cant_jugadores: cant_jugadores,
        fecha: fecha,
        hora: hora,
        estado_reserva: estado_reserva,
      }
    );
    res.status(201).send({ mensaje: "Reserva modificada" });
  }
);
reservasRouter.get(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    const [rows] = await db.execute(
      "SELECT * FROM RESERVAS where id_reserva=:id",
      {
        id,
      }
    );
    res.status(200).send(rows[0]);
  }
);

reservasRouter.get("/", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM RESERVAS");
  res.status(200).send(rows);
});

reservasRouter.delete(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    await db.execute("delete from RESERVAS where id_reserva=:id", { id });
    res.status(200).send({ mensaje: "Reserva eliminada" });
  }
);

reservasRouter.get(
  "/:id/usuario",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const { id } = req.params;
    const [rows] = await db.execute(
      "SELECT u.id_usuario, u.nombre, u.apellido FROM usuarios u JOIN reservas r ON u.id_usuario = r.usuario_id where id_reserva=:id",
      {
        id,
      }
    );
    res.status(200).send(rows[0]);
  }
);
