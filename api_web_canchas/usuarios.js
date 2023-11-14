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

//? Exportamos la constante con el router de usuarios
export const usuariosRouter = express.Router();

//! Agregar nuevo usuario
//? Método POST
usuariosRouter.post(
  "/",
  body("nombre") //? Validamos la key "nombre" del body
    .matches(/^[\p{L}\s]+$/u) //? Validamos que no pueda tener carárcteres especiales y pueda contener espacios
    .isLength({ min: 1, max: 50 }) //? Validamos el largo
    .withMessage(
      //? Mostramos mensaje de error en caso de que falle una validación
      "El nombre debe tener como minimo 1 caracter y 50 como máximo."
    ),
  body("apellido") //? Validamos la key "apellido" del body
    .matches(/^[\p{L}\s]+$/u) //? Validamos que no pueda tener carárcteres especiales y pueda contener espacios
    .isLength({ min: 1, max: 50 }) //? Validamos el largo
    .withMessage(
      //? Mostramos mensaje de error en caso de que falle una validación
      "El apellido debe tener como minimo 1 caracter y 50 como máximo."
    ),
  //? Validamos que sea email.
  body("email").isEmail().withMessage("Debes ingresar un email válido."), //? Validamos la key "email" del body
  body("contrasenia") //? Validamos la key "contrasenia" del body
    .isStrongPassword({
      //? Validamos complejidad de la contraseña
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      //? Mostramos mensaje de error en caso de que falle una validación
      "La contraseña debe tener al menos un minuscula, mayúscula, un número y un símbolo."
    ),
  //? Validamos que sea numérico y su largo.
  body("telefono").isNumeric().isLength({ min: 10, max: 12 }).withMessage(
    //? Mostramos mensaje de error en caso de que falle una validación
    "El número debe tener como minimo 10 caractreres y 12 como máximo."
  ),
  body("rol").isInt({ min: 1 }), //? Validamos el largo
  async (req, res) => {
    const validacion = validationResult(req); //? Guardamos los resultados de la validación del req
    if (!validacion.isEmpty()) {
      //? Si la validación es diferente a vacía
      res.status(400).send({ errors: validacion.array() }); //? Muestra array con los errores de los campos
    }
    const { nombre, apellido, email, contrasenia, telefono, rol } = req.body; //? Desconstruimos las keys del body
    await db.execute(
      //? Ejecutamos la query en la DB
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
    //? Si todo sale bien, respondemos con el stados y respondemos un mensaje
    res.status(201).send({ mensaje: "Usuario agregado" });
  }
);

//! Consultar usuario por ID

usuariosRouter
  //? Método GET
  .get(
    "/:id", //? Buscamos por ID
    param("id").isInt({ min: 1 }).withMessage("ID debe ser numérico"), //? Validamos el parametro ID y su largo minimo, en caso de haber un error modifica el mensaje.
    async (req, res) => {
      const validacion = validationResult(req); //? Guardamos los resultados de la validación del req
      if (!validacion.isEmpty()) {
        //? Si la validación es diferente a vacía
        res.status(400).send({ errors: validacion.array() }); //? Muestra array con los errores de los campos
      }
      const { id } = req.params; //? Desconstruimos las keys del param
      const [rows] = await db.execute(
        //? Ejecutamos la query en la DB y rows guarda la respuesta de la query
        "SELECT * FROM USUARIOS WHERE ID_USUARIO = :id",
        { id }
      );
      if (rows.length > 0) {
        //? Validamos si el largo de la respuesta es mayor a cero
        res.status(200).send(rows[0]); //? Respondemos con status y enviamos el primer elemento de la variable rows
      } else {
        //? Si el margo es 0 envía mensaje de error
        res.status(404).send({ mensaje: "Usuario no encontrado." });
      }
    }
  );

//! Consultar todos los usuarios
//? Método GET
usuariosRouter.get("/", async (req, res) => {
  //? Ejecutamos la query en la DB y rows guarda la respuesta de la query
  const [rows, fields] = await db.execute("SELECT * FROM USUARIOS");
  //? Si rows contiene datos
  if (rows.length > 0) {
    //? Respondemos con status y mostramos todos los datos de la consulta
    res.status(200).send(rows);
  } else {
    //? Si el largo es 0
    //? Mostramos error y mensaje
    res.status(404).send({ mensaje: "Usuario no encontrado" });
  }
});

//! Modificar usuario por ID
//? Método PUT
usuariosRouter.put(
  "/:id", //? Buscamos por ID
  param("id").isNumeric({ min: 1 }).isLength({ min: 1 }), //? Validamos el param id, que sea numérico
  body("nombre") //? Validamos el nombre
    .matches(/^[\p{L}\s]+$/u) //? Validamos que no pueda tener carárcteres especiales y pueda contener espacios
    .isLength({ min: 1, max: 50 }) //? Validamos el largo
    .withMessage(
      //? Mostramos mensaje de error en caso de que falle una validación
      "El nombre debe tener como minimo 1 caracter y 50 como máximo."
    ),
  body("apellido") //? Validamos el apellido
    .matches(/^[\p{L}\s]+$/u) //? Validamos que no pueda tener carárcteres especiales y pueda contener espacios
    .isLength({ min: 1, max: 50 }) //? Validamos el largo
    .withMessage(
      //? Mostramos mensaje de error en caso de que falle una validación
      "El apellido debe tener como minimo 1 caracter y 50 como máximo."
    ),
  body("email").isEmail().withMessage("Debes ingresar un email válido."), //? Validamos que sea email y mostramos mensaje de error en caso de que falle la validación
  body("contrasenia") //? Validamos dificultar de la contraseña
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      //? Mostramos mensaje de error en caso de que falle la validación
      "La contraseña debe tener al menos un minuscula, y mayúscula, un número y un símbolo."
    ),
  body("telefono") //? Validamos el telefono
    .isNumeric() //? Validamos que sea numérico
    .isLength({ min: 10, max: 12 }) //? Validando el largo
    .withMessage(
      //? Mostramos mensaje de eror en caso de que falle la validación
      "El número debe tener como minimo 10 caractreres y 12 como máximo."
    ),
  body("rol").isInt({ min: 1 }), //? Validamos el rol y que sea entero
  async (req, res) => {
    const { id } = req.params; //? Descontruimos el param
    const { nombre, apellido, email, contrasenia, telefono, rol } = req.body; //? Descontruimos las keys del body
    await db.execute(
      //? Ejecutamos la query en la DB
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
    //? Si sale todo bien, mostramos status y mensaje
    res.status(200).send({ mensaje: "Usuario modificado" });
  }
);

//! Eliminar usuario por ID
//? Método DELETE
usuariosRouter.delete(
  //? Buscamos por ID
  "/:id",
  param("id").isNumeric({ min: 1 }).isLength({ min: 1 }), //? Vakudanis param y si es numérico
  async (req, res) => {
    const { id } = req.params; //? Desconstruimos el param
    await db.execute("delete from usuarios where id_usuario=:id", { id }); //? Ejecutamos la query en la DB
    //? Si sale todo bien, enviamos status y mensaje
    res.status(200).send({ mensaje: "Usuario eliminado" });
  }
);
