import express from "express";
import cors from "cors";
import { usuariosRouter } from "./usuarios.js";
import { clubesRouter } from "./clubes.js";
import { canchasRouter } from "./canchas.js";
import { reservasRouter } from "./reservas.js";
import { reseniasRouter } from "./resenias.js";



//Crear aplicación backend Express
const app = express();
app.use(express.json());
app.use(cors());

app.use("/usuarios", usuariosRouter);
app.use("/clubes", clubesRouter);
app.use("/canchas", canchasRouter);
app.use("/reservas", reservasRouter);
app.use("/resenias", reseniasRouter);


//Aplicación escuchando peticiones en puerto :3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});
