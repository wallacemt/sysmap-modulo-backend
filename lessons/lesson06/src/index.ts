import "dotenv/config";
import express, { json } from "express";
import { testController } from "./controllers/testControler";
import cors from 'cors';

const server = express();
server.use(json());
server.use(cors({
    origin: "http://localhost:5173"
}));
const port = process.env.PORT;
testController(server);

server.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
