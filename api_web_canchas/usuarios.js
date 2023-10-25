import express from "express";
import { db } from "./db.js";

export const usuariosRouter = express.Router();
// Agregar nuevo usuario
usuariosRouter
  .post("/", async (req, res) => {
    const nuevoUsuario = req.body.usuario;
    const [rows] = await db.execute(
      "insert into usuarios (nombre, apellido, email, contrasenia, telefono, rol) values (:nombre, :apellido, :email, :contrasenia, :telefono, :rol)",
      {
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        contrasenia: nuevoUsuario.contrasenia,
        telefono: nuevoUsuario.telefono,
        rol: nuevoUsuario.rol,
      }
    );
    res.status(201).send({ mensaje: "Usuario agregado" });
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
    const [rows, fields] = await db.execute("SELECT * FROM USUARIOS");
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  })
  //Modificar usuarios por id
  .put("/:id", async (req, res) => {
    const id = req.params.id;
    const nuevosDatosUsuario = req.body.usuarioEdit;
    await db.execute(
      "update usuarios set nombre=:nombre, apellido=:apellido, email=:email, contrasenia=:contrasenia, telefono=:telefono, rol=:rol WHERE id_usuario=:id",
      {
        id: id,
        nombre: nuevosDatosUsuario.nombre,
        apellido: nuevosDatosUsuario.apellido,
        email: nuevosDatosUsuario.email,
        contrasenia: nuevosDatosUsuario.contrasenia,
        telefono: nuevosDatosUsuario.telefono,
        rol: nuevosDatosUsuario.rol,
      }
    );
    res.status(200).send("Usuario modificado");
  })
  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    await db.execute("delete from usuarios where id_usuario=:id", { id });
    res.status(200).send({ mensaje: "Usuario eliminado" });
  });
