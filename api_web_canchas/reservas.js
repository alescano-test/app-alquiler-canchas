import express from "express";

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

