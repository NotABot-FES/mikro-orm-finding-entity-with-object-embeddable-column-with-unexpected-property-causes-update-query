import { defineConfig } from "@mikro-orm/sqlite";
import { Embeddable, Entity, SubEntity1, SubEntity2 } from "./models.ts";

export default defineConfig({
    dbName: "db.db3",
    entities: [Embeddable, Entity, SubEntity1, SubEntity2],
});

