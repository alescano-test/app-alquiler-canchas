import express from "express";
import { db } from "./db.js";

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

canchasRouter.post("/", async (req, res) => {
  const nuevaCancha = req.body.nuevaCancha;
  await db.execute(
    "INSERT INTO canchas (club_id, tipo_deporte, dimensiones, precio, suelo) VALUES (:club_id, :tipo_deporte, :dimensiones, :precio, :suelo)",
    {
      club_id: nuevaCancha.id_club,
      tipo_deporte: nuevaCancha.tipo_deporte,
      dimensiones: nuevaCancha.dimensiones,
      precio: nuevaCancha.precio,
      suelo: nuevaCancha.suelo,
    }
  );
  res.status(201).send({ mensaje: "Cancha creada con éxito!" });
});

canchasRouter.get("/:id", async(req, res)=> {
  const id = req.params.id;
  const [rows] = await db.execute("SELECT * FROM canchas WHERE id_cancha =:id", {id});
  res.status(200).send(rows[0])
})

canchasRouter.get("/", async(req, res)=> {
  const id = req.params.id;
  const [rows] = await db.execute("SELECT * FROM canchas");
  res.status(200).send(rows)
})