import { Router, Express } from "express";
import { create, getAll, getById, remove, update } from "../repository/userRepository";
import { PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export const userController = (server: Express) => {
  const router = Router();

  router.get("/", async (req, res) => {
    const users = await getAll();
    res.status(200).send(users);
  });

  router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    const user = await getById(userId);
    res.status(200).send(user);
  });

  router.post("/new", async (req, res) => {
    try {
      const user = req.body;
      const createdUser = await create(user);
      res.status(201).send(createdUser);
    } catch (error: any) {
      if(error instanceof PrismaClientValidationError){
        res.status(400).send("Dados inválidos ou ausentes!");
      }

      if(error instanceof PrismaClientUnknownRequestError){
        res.status(400).send("Email já utilizado!");
      }
      res.status(500).send("Erro interno!");
    }
  });

  router.put("/update/:id", async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    const user = await update(userData, userId);
    res.status(200).send(user);
  });

  router.delete("/:id", async (req, res) => {
    const userId = req.params.id;
    const user = await remove(userId);
    res.status(200).send(user);
  });

  server.use("/user", router);
};
