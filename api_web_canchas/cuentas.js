import express from "express";
import bcrypt from "bcryptjs";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";

export const cuentasRouter = express.Router();

//!CREAR USUARIO
cuentasRouter.post(
  "/",
  body("userName").isLength({ min: 1, max: 25 }),
  body("userPassword"),
  body("nombre").isLength({ min: 1, max: 35 }),
  body("apellido").isLength({ min: 1, max: 35 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { nombre, apellido, userName, userPassword } = req.body;
    try {
      const userPasswordHashed = await bcrypt.hash(userPassword, 8);
      const [rows] = await db.execute(
        "INSERT INTO usuarios (userName, userPassword, nombre, apellido) VALUES (:userName, :userPasswordHashed, :nombre, :apellido)",
        { userName, userPasswordHashed, nombre, apellido }
      );
      res.status(201).send({ mensaje: "Cuenta creada." });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//!OBTENER TODOS LOS USUARIOS
cuentasRouter.get("/", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM usuarios");

  try {
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(400).send({ mensaje: "No hay usuarios" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//!OBTENER USUARIO POR ID
cuentasRouter.get(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { id } = req.params;
    const [rows] = await db.execute(
      "SELECT * FROM usuarios WHERE userId =:id",
      { id }
    );

    try {
      if (rows.length > 0) {
        res.status(200).send(rows[0]);
      } else {
        res.status(400).send({ mensaje: "No se encontró el usuario." });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//!OBTENER USUARIO POR ID

cuentasRouter.put(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  body("userName").isLength({ min: 1, max: 25 }),
  body("userPassword").isStrongPassword({
    minLength: 4,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  body("nombre").isLength({ min: 1, max: 35 }),
  body("apellido").isLength({ min: 1, max: 35 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { id } = req.params;
    const { nombre, apellido, userName, userPassword } = req.body;
    try {
      const userPasswordHashed = await bcrypt.hash(userPassword, 8);
      const [rows] = await db.execute(
        "UPDATE usuarios SET userName=:userName, userPassword=:userPassword, nombre=:nombre, apellido=:apellido where userId=:id",
        {
          id: id,
          userName: userName,
          userPassword: userPasswordHashed,
          nombre: nombre,
          apellido: apellido,
        }
      );
      
      res.status(201).send({ mensaje: "Cuenta modificada." });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//!ELIMINAR USUARIO POR ID
cuentasRouter.delete(
  "/:id",
  param("id").isInt().isLength({ min: 1 }),
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { id } = req.params;
    try {
      const [rows] = await db.execute("DELETE FROM usuarios WHERE userId=:id", {
        id: id,
      });
      if(rows.affectedRows === 0) {
        res.status(400).send({ mensaje: "No se encontró el usuario." });
      } else{ 
        res.status(200).send({ mensaje: "Usuario eliminado." });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);
