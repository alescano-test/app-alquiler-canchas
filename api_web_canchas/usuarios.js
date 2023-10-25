import express from "express";
import {db} from "./db.js"

export const usuariosRouter = express.Router();
// Agregar nuevo usuario
usuariosRouter
  .post("/", async (req, res) => {
    const nuevoUsuario = req.body.usuario;
    await db.execute(
      "insert into usuarios (nombre, apellido, telefono, passw, email) VALUES (:nombre, :apellido, :telefono, :passw, :email)",
      {
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        telefono: nuevoUsuario.telefono,
        passw: nuevoUsuario.passw,
        email: nuevoUsuario.email,
      }
    );
    res.status(201).send({ mensaje: "Nuevo usuario agregado" });
  })

//Consultar usuario por id
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT * FROM USUARIOS WHERE ID_USUARIO=:id",
      { id }
    );
    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  })
 //Consultar todos los usuarios
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT * FROM USUARIOS"
    );
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  })
  //Modificar usuarios por id
  .put("/:id", async (req, res) => {
    const id = req.params.id;
    const nuevosDatosUsuario = req.body.nuevosDatos;
    await db.execute(
      "update usuarios set nombre=:nombre, apellido=:apellido, telefono=:telefono, passw=:passw, email=:email WHERE id_usuario=:id",
      {
        id,
        nombre: nuevosDatosUsuario.nombre,
        apellido: nuevosDatosUsuario.apellido,
        telefono: nuevosDatosUsuario.telefono,
        passw: nuevosDatosUsuario.passw,
        email: nuevosDatosUsuario.email,
      }
    );
    res.status(200).send("Usuario modificado");
  })
  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    await db.execute("delete from usuarios where id_usuario=:id", { id });
    res.status(200);
  });
