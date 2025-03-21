import { Router, Express } from "express";
import { PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { create, getAll, getByUserId } from "../repository/activityRepository";

export const activityContoller = (server: Express) => {
  const router = Router();

  router.get("", async (req, res) => {
    const activities = await getAll();
    res.status(200).send(activities);
  });

  router.get("/:id", async (req, res) => {
    const userId = req.params.id; 
    const activities = await getByUserId(userId);
    res.status(200).send(activities);
  });

  router.post("/new", async (req, res) => {
    const activityData = req.body;
    const activity = await create(activityData);
    res.status(201).send(activity);
  });

  server.use("/activities", router);
};
