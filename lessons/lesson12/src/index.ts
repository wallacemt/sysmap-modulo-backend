import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import authController from "./controllers/auth-controller";
import { createAchievements } from "./services/achievements-service";
import userController from "./controllers/user-controller";

const server = express();

server.use(json());
server.use(cors());

authController(server);
userController(server);

createAchievements([
  {
    name: "Novato",
    criterion: "Crie sua conta.",
  },
  {
    name: "Primeiro Login",
    criterion: "Faça login pela primeira vez.",
  },
]);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
