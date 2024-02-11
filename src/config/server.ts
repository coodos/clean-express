import express, { Application } from "express";
import { AppDataSource } from "@/infrastructure";
import { AppInterceptor, ExpressErrorHandler } from "@/interfaces/middleware";
import { Logger } from "./logger";

export type AppConfig = {
    port?: number | string;
};

export class Server {
    private app: Application;
    private config: AppConfig;

    constructor(config: AppConfig) {
        this.config = config;
        this.app = express();
        this.app.use(AppInterceptor);
        this.app.use(express.json());
        this.app.use(ExpressErrorHandler);
    }

    private connectDatabase() {
        AppDataSource.initialize()
            .then(() => Logger.info("connected to database"))
            .catch((e) => {
                Logger.error(e);
                throw new Error("500::Failed to connect to database");
            });
    }

    start() {
        const port = this.config.port ?? 1209;
        this.connectDatabase();
        this.app.listen(port, () => {
            Logger.info("Server is running on port " + port);
        });
    }
}
