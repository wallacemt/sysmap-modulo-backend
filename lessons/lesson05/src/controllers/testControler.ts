import { Express, Request, Router } from "express"
export const testController = (server: Express) => {
    const router = Router();

    router.get("/1", (req, res) => {
        res.status(200).send("Testado com sucesso 1°!");
    })

    router.post("/2", (req: Request, res) => {
        const data = req.body;
        res.status(200).send(data);
    })


    server.use("/teste", router);
}