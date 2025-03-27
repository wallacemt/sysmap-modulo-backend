import { Express, Router } from "express";
import { authenticate, createAccount } from "../services/auth-service";

const authController = (server: Express) => {
  const router = Router();

  router.post("/register", async (request, response) => {
    try {
      const userData = request.body;
      await createAccount(userData);

      response.status(200).send("Usuário criado com sucesso.");
    } catch (error: any) {
      console.log(error)
      response.status(500).send("Erro inesperado.");
    }
  });

  router.post("/", async (request, response) => {
    try {
      const { email, password } = request.body;
      const token = await authenticate(email, password);

      response.status(200).send(token);
    } catch (error: any) {
      if (error.message === "Usuário não encontrado.") {
        response.status(404).send("Usuário não encontrado.");
        return;
      }

      if (error.message === "Senha incorreta.") {
        response.status(401).send(error.message);
        return;
      }
    }
  });

  server.use("/auth", router);
};

export default authController;
