import express from "express";

/*
CREATE TABLE clubes (
  id_club INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(25) NOT NULL
);
*/

export const clubesRouter = express.Router();

clubesRouter.post("/", (req, res) => {});

clubesRouter.get("/", (req, res) => {});

clubesRouter.get("/:id", (req, res) => {});

clubesRouter.put("/:id", (req, res) => {});

clubesRouter.delete("/:id", (req, res) => {});