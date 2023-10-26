import express from "express";
import {db} from "./db.js"
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

accesoriosRouter.post("/", async (req, res) => {
    const nuevoAccesorio = req.body.accesorio;
    const [rows] = await db.execute(
     "insert into accesorios (nombre, tipo_deporte, precio, estado) .values (:nombre, :tipo_deporte, :precio, :estado)",
        {
          nombre: nuevoAccesorio.nombre,
          tipo_deporte: nuevoAccesorio.tipo_deporte,
          precio: nuevoAccesorio.precio,
          estado: nuevoAccesorio.estado,
        }
    );
    res.status(201).send({ mensaje: "Accesorio agregado" })
});

accesoriosRouter.get("/", async (req, res) => {
    const[rows]= await db.execute("SELECT * FROM accesorios");
    if(rows.length > 0) {
        res.status(200).send(rows);
    } else {
        res.status(404).send("Usuario no encontrado");
    }

});

accesoriosRouter.get("/:id", (req, res) => {});

accesoriosRouter.put("/:id", (req, res) => {});

accesoriosRouter.delete("/:id", (req, res) => {});