import express from "express";
import cors from "cors";

import { personasRouter } from "./personas.js"


//Crear aplicación backend Express
const app = express();
app.use(express.json());
app.use(cors());

app.use("/personas", personasRouter);



//Aplicación escuchando peticiones en puerto :3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});
