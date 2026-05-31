import { defineConfig } from "@mikro-orm/sqlite";
import { Embeddable, Entity } from "./models.ts";

export default defineConfig({
    dbName: "db.db3",
    entities: [Embeddable, Entity],
});