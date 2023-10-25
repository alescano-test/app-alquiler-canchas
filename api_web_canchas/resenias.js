import express from "express";
import { db } from "./db.js";

/*
CREATE TABLE resenias (
    id_resenia INT PRIMARY KEY AUTO_INCREMENT,
    reserva_id INT NOT NULL,
    comentario VARCHAR(255) NOT NULL,
    calificacion INT NOT NULL,
    CONSTRAINT fk_reservas_resenias -- Relación entre `reseñas` y `reservas`
    FOREIGN KEY (reserva_id) REFERENCES reservas (id_reserva)
  );
*/











export const reseniasRouter = express.Router();

