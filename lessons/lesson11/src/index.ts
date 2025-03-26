import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import userController from "./controllers/user-controller";
import activityController from "./controllers/activity-controller";
import authController from "./controllers/auth-controller";
import { createUser } from "./services/user-service";
import { createBucket } from "./services/s3-service";
import swagger from "swagger-ui-express"

const server = express();

server.use(json());
server.use(cors());


server.use("/docs", swagger.serve, swagger.setup(require("./swagger.json")));

userController(server);
activityController(server);
authController(server);

createBucket();

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
