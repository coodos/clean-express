import { Router } from "express";
import usersRouter from "./user.router";

const appRouter = Router();

appRouter.use("/users", usersRouter);

export { appRouter };
