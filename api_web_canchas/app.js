//Recursos
import express from "express";
import cors from "cors";
import { db } from "./db.js";
import usuariosRouter from "./usuarios.js";

//Crear aplicación backend Express
const app = express();
app.use(express.json());
app.use(cors());

app.use("/usuarios", usuariosRouter);

//Aplicación escuchando peticiones en puero :3000
app.listen(3000, () => {
  console.log("OK.");
});
