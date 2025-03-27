import { Express, Request, Response, Router } from "express";
import { getUserById } from "../services/user-service";
import authGuard from "../middlewares/auth-guard";

const userController = (server: Express) => {
  const router = Router();

  router.get("/", authGuard, async (request: Request, response: Response) => {
    const userId = request.userId!;
    const user = await getUserById(userId);

    response.status(200).send(user);
  });

  server.use("/user", router);
};

export default userController;
