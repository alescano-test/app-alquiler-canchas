import express from "express";
import { db } from "./db.js";

/*
CREATE TABLE clubes (
  id_club INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(25) NOT NULL
);
*/

export const clubesRouter = express.Router();
clubesRouter.post("/", async (req, res) => {
  const club = req.body.nuevoClub;
  await db.execute(
    "INSERT INTO clubes (nombre, direccion, telefono) VALUES (:nombre, :direccion, :telefono)",
    {
      nombre: club.nombre,
      direccion: club.direccion,
      telefono: club.telefono,
    }
  );
  res.status(201).send({ mensaje: "Club agregado" });
});

clubesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const [rows] = await db.execute(
    "SELECT * FROM clubes WHERE ID_CLUB=:id",
    { id }
  );
  if (rows.length > 0) {
    res.status(200).send(rows[0]);
  } else {
    res.status(404).send("Club no encontrado");
  }
});

clubesRouter.get("/", async (req, res) => {
  const [rows] = await db.execute(
    "SELECT * FROM clubes"
  );
  if (rows.length > 0) {
    res.status(200).send(rows);
  } else {
    res.status(404).send("No hay clubes");
  }
});

clubesRouter.put("/:id", async(req, res) => {
  const id = req.params.id;
  const nuevosDatosClub = req.body.nuevosDatosClub;
  await db.execute(
    "update clubes set nombre=:nombre, direccion=:direccion, telefono=:telefono WHERE id_club=:id",
    {
      id: id,
      nombre: nuevosDatosClub.nombre,
      direccion: nuevosDatosClub.direccion,
      telefono: nuevosDatosClub.telefono
    }
  );
  res.status(200).send({"mensaje": "Datos del Club modificados."})
});

clubesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await db.execute("delete from clubes where id_club=:id", { id });
  res.status(200).send({ mensaje: "Club eliminado" });
});
