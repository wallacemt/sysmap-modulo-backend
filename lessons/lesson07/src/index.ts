import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { userController } from "./controllers/userContoller";
import { activityContoller } from "./controllers/activityController";

const server = express();
server.use(json());
server.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const port = process.env.PORT;

userController(server);
activityContoller(server);

server.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
