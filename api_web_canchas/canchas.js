import express from "express";

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