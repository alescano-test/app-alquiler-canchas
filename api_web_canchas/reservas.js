import express from "express";
import { db } from "./db.js";

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

reservasRouter.post("/", async (req, res) => {
  const nuevaReserva = req.body.nuevaReserva;
  await db.execute(
    "INSERT INTO reservas (usuario_id, cancha_id, cant_jugadores, fecha, hora, estado_reserva) VALUES (:usuario_id, :cancha_id, :cant_jugadores, :fecha, :hora, :estado_reserva)",
    {
      usuario_id: nuevaReserva.usuario_id,
      cancha_id: nuevaReserva.cancha_id,
      cant_jugadores: nuevaReserva.cant_jugadores,
      fecha: nuevaReserva.fecha,
      hora: nuevaReserva.hora,
      estado_reserva: nuevaReserva.estado_reserva,
    }
  );
  res.status(201).send({"mensaje": "Reserva completada"})
});
