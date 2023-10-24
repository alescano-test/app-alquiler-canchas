//Recursos
import "dotenv/config";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

//Crear aplicación backend Express
const app = express();

//Conexion con Base de Datos
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  namedPlaceholders: true, //Autocompleta los parametros en el excecute
});

//Utilidades
//Para que express pueda procesar respuestas en json
app.use(express.json());
//Para solucionar que API será consumida por un frontend alojado en un puerto/dominio diferente
app.use(cors());

//Agregar usuarios
app.post("/usuarios", async (req, res) => {
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
});

//Consultar usuario por id
app.get("/usuarios/:id", async (req, res) => {
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
});

//Modificar usuarios por id
app.put("/usuarios/:id", async (req, res) => {
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
});

//Borrar usuario por id
app.delete("usuarios/:id", async (req, res) => {
  const id = req.params.id;
  await db.execute("delete from usuarios where id_usuario=:id", { id });
  res.status(200);
});

//Aplicación escuchando peticiones en puero :3000
app.listen(3000, () => {
  console.log("OK.");
});
