import "dotenv/config";
import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tsoft",
  database: "sistema_reservas_canchas",
  port: 3306,
  namedPlaceholders: true, //Autocompleta los parametros en el excecute
})