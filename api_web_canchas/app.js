import express from "express";
import cors from "cors";
import { personasRouter } from "./personas.js"
import { cuentasRouter } from "./cuentas.js";
import { clubesRouter } from "./clubes.js";
import { canchasRouter } from "./canchas.js";
import { reservasRouter } from "./reservas.js";
import { authConfig, authRouter } from "./auth.js";


//Crear aplicación backend Express
const app = express();
app.use(express.json());
app.use(cors());

authConfig()
app.use("/auth", authRouter)
app.use("/personas", personasRouter);
app.use("/cuentas", cuentasRouter);
app.use("/clubes", clubesRouter)
app.use("/canchas", canchasRouter)
app.use("/reservas", reservasRouter)


//Aplicación escuchando peticiones en puerto :3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});
