import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import userController from "./controllers/user-controller";
import activityController from "./controllers/activity-controller";
import authController from "./controllers/auth-controller";

const server = express();

server.use(json());
server.use(cors());

userController(server);
activityController(server);
authController(server);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
