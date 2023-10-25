import "dotenv/config";
import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "sistema_reservas",
  port: process.env.DB_PORT,
  namedPlaceholders: true, //Autocompleta los parametros en el excecute
});
