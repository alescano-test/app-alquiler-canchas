import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { db } from "./db.js";

export function authConfig() {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {
      const [rows] = await db.execute(
        "SELECT userName FROM usuarios WHERE userName = :userName",
        { userName: payload.userName }
      );
      if (rows.length > 0) {
        next(null, rows[0]);
      } else {
        next(null, false);
      }
    })
  );
}

export const authRouter = express
  .Router()

  .post(
    "/login",
    body("userName").isAlphanumeric().isLength({ min: 1, max: 25 }),
    body("userPassword").isStrongPassword({
      minLength: 4,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }

      const { userName, userPassword } = req.body;

      // Obtengo cuenta de usuario
      const [rows, fields] = await db.execute(
        `SELECT * FROM usuarios WHERE userName = :userName`,
        { userName }
      );

      if (rows.length === 0) {
        res.status(400).send("Usuario o contraseña inválida");
        return;
      }

      const user = rows[0];

      // Verificar contraseña
      const passwordCompared = await bcrypt.compare(userPassword, user.userPassword);
      if (!passwordCompared) {
        res.status(400).send("Usuario o contraseña inválida");
        return;
      }

      // Generar token
      const payload = { userName };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      const estado = false;
      // Sesion en WEB
      const sesion = {
        id : user.userId,
        usuario: user.userName,
        token,
        estado: true
      };

      res.send(sesion);
    }
  )

  .get(
    "/perfil",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.json(req.user);
    }
  );