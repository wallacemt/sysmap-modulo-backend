import { Express, Router } from "express";
import {
  getAll,
  getById,
  getPaginated,
  remove,
  update,
} from "../repository/user-repository";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { createUser } from "../services/user-service";
import validateRequestBody from "../middlewares/request-body-validator";
import userValidation from "../validations/user-validation";

const userController = (server: Express) => {
  const router = Router();
  router.get("/", async (request, response) => {
    const { filterBy, filter, orderBy, order } = request.query as {
      filterBy: string;
      filter: string;
      orderBy: string;
      order: string;
    };

    const users = await getAll(
      filterBy,
      filter,
      orderBy || "email",
      order || "desc"
    );

    response.status(200).send(users);
  });

  router.get("/paginated", async (request, response) => {
    const { take = "10", skip = "0" } = request.query as {
      take: string;
      skip: string;
      filter: string;
    };

    const users = await getPaginated(parseInt(take), parseInt(skip));
    response.status(200).send(users);
  });

  router.get("/:id", async (request, response) => {
    const userId = request.params.id;
    const user = await getById(userId);
    response.status(200).send(user);
  });

  router.post(
    "/new",
    validateRequestBody(userValidation),
    async (request, response) => {
      try {
        const userData = request.body;
        const user = await createUser(userData);

        response.status(201).send(user);
      } catch (error: any) {
        if (error instanceof PrismaClientValidationError) {
          response.status(400).send("Dados inválidos ou faltando.");
          return;
        }

        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          response.status(409).send("Email já utilizado.");
          return;
        }

        console.error(error);
        response.status(500).send("Ocorreu um erro no servidor.");
      }
    }
  );

  router.put("/update/:id", async (request, response) => {
    const userId = request.params.id;
    const userData = request.body;
    const user = await update(userData, userId);

    response.status(200).send(user);
  });

  router.delete("/delete/:id", async (request, response) => {
    const userId = request.params.id;
    const user = await remove(userId);

    response.status(200).send(user);
  });

  server.use("/user", router);
};

export default userController;
