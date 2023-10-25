import express from "express";

/*
CREATE TABLE accesorios (
  id_accesorio INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(60) NOT NULL,
  tipo_deporte VARCHAR(60) NOT NULL,
  precio INT NOT NULL,
  estado VARCHAR(45),
  FOREIGN KEY (tipo_deporte) REFERENCES canchas (tipo_deporte)
);
*/

export const accesoriosRouter = express.Router();