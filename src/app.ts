import "reflect-metadata";
import "express-async-errors";

import { Server, PORT, DATABASE_URL } from "@/config";

const server = new Server({
    port: PORT,
    databaseUrl: DATABASE_URL,
});

server.start();
