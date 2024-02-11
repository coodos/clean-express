import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const { DATABASE_URL } = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    url: DATABASE_URL,
    entities: ["src/domain/entities/*.ts"],
    synchronize: false,
    migrations: ["src/infrastructure/migrations/*.ts"],
});
