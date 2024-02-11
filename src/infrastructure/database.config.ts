import { DATABASE_URL } from "@/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: DATABASE_URL,
    entities: ["src/domain/entities/*.ts"],
    synchronize: false,
    migrations: ["src/infrastructure/migrations/*.ts"],
});
