import express from "express";
import { db } from "./db.js";
import { body, param, query, validationResult } from "express-validator";
/*
CREATE TABLE usuarios (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45) NOT NULL,
  email VARCHAR(60) NOT NULL,
  contrasenia VARCHAR(45) NOT NULL,
  telefono VARCHAR(45) NOT NULL,
  rol VARCHAR(20) NOT NULL
);
*/

export const usuariosRouter = express.Router();
// Agregar nuevo usuario
usuariosRouter.post(
  "/",
  body("nombre").isAlpha().isLength({ min: 1, max: 50 }),
  body("apellido").isAlpha().isLength({ min: 1, max: 50 }),
  body("email").isEmail().isLength({ min: 1, max: 50 }),
  body("contrasenia").isStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  body("telefono").isNumeric().isLength({ min: 10, max: 12 }),
  body("rol").isInt({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { nombre, apellido, email, contrasenia, telefono, rol } = req.body;
    await db.execute(
      "insert into usuarios (nombre, apellido, email, contrasenia, telefono, rol) values (:nombre, :apellido, :email, :contrasenia, :telefono, :rol)",
      {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasenia: contrasenia,
        telefono: telefono,
        rol: rol,
      }
    );
    res.status(201).send("usuario agregado");
  }
);

//* Consultar usuario por id - Validado
usuariosRouter
  .get("/:id", param("id").isInt({ min: 1 }).withMessage("Id no existe"), async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { id } = req.params;
    const [rows] = await db.execute(
      "SELECT * FROM USUARIOS WHERE ID_USUARIO = :id",
      { id }
    );
    if (rows.length > 0) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).send("Usuario no encontrado.");
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
  });

//*---------------------------------------------------------------------

//!Modificar usuarios por id - Validar
usuariosRouter.put(
  "/:id",
  param("id").isNumeric({ min: 1 }).isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { id } = req.params;
    const { nombre, apellido, email, contrasenia, telefono, rol } = req.body;
    await db.execute(
      "update usuarios set nombre=:nombre, apellido=:apellido, email=:email, contrasenia=:contrasenia, telefono=:telefono, rol=:rol WHERE id_usuario=:id",
      {
        id: id,
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasenia: contrasenia,
        telefono: telefono,
        rol: rol,
      }
    );
    res.status(200).send("Usuario modificado");
  }
);

//!---------------------------------------------------------------------

//Eliminar usuario por id
usuariosRouter.delete(
  "/:id",
  param("id").isNumeric({ min: 1 }).isLength({ min: 1 }),
  async (req, res) => {
    const id = req.params.id;
    await db.execute("delete from usuarios where id_usuario=:id", { id });
    res.status(200).send({ mensaje: "Usuario eliminado" });
  }
);
