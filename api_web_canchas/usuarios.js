import express from "express";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

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
  //Validamos el largo del nombre
  body("nombre")
    .matches(/^[\p{L}\s]+$/u)
    .isLength({ min: 1, max: 50 })
    .withMessage(
      "El nombre debe tener como minimo 1 caracter y 5 como máximo."
    ),
  body("apellido")
    .matches(/^[\p{L}\s]+$/u)
    .isLength({ min: 1, max: 50 })
    .withMessage(
      "El apellido debe tener como minimo 1 caracter y 5 como máximo."
    ),
  body("email").isEmail().withMessage("Debes ingresar un email válido."),
  body("contrasenia")
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contraseña debe tener al menos un minuscula, y mayúscula, un número y un símbolo."
    ),
  body("telefono")
    .isNumeric()
    .isLength({ min: 10, max: 12 })
    .withMessage(
      "El número debe tener como minimo 10 caractreres y 12 como máximo."
    ),
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
  .get(
    "/:id",
    param("id").isInt({ min: 1 }).withMessage("Id no existe"),
    async (req, res) => {
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
        res.status(404).send({ Error: "Usuario no encontrado." });
      }
    }
  )

  //Consultar todos los usuarios
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT * FROM USUARIOS");
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  });

usuariosRouter.put(
  "/:id",
  param("id").isNumeric({ min: 1 }).isLength({ min: 1 }),
  body("nombre")
    .matches(/^[\p{L}\s]+$/u)
    .isLength({ min: 1, max: 50 })
    .withMessage(
      "El nombre debe tener como minimo 1 caracter y 5 como máximo."
    ),
  body("apellido")
    .matches(/^[\p{L}\s]+$/u)
    .isLength({ min: 1, max: 50 })
    .withMessage(
      "El apellido debe tener como minimo 1 caracter y 5 como máximo."
    ),
  body("email").isEmail().withMessage("Debes ingresar un email válido."),
  body("contrasenia")
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "La contraseña debe tener al menos un minuscula, y mayúscula, un número y un símbolo."
    ),
  body("telefono")
    .isNumeric()
    .isLength({ min: 10, max: 12 })
    .withMessage(
      "El número debe tener como minimo 10 caractreres y 12 como máximo."
    ),
  body("rol").isInt({ min: 1 }),
  async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, contrasenia, telefono, rol } = req.body;
    await db.execute(
      "update usuarios set nombre=:nombre, apellido=:apellido, email=:email, contrasenia=:contrasenia, telefono=:telefono, rol=:rol WHERE id_usuario=:id",
      {
        id_usuario: id,
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
