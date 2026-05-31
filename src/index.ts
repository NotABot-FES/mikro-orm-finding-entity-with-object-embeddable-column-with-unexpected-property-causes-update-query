import { MikroORM, type Options } from "@mikro-orm/sqlite";
import fs from "node:fs";
import config from "./mikro-orm.config.ts";
import { Entity } from "./models.ts";

// Not using an in-memory database because the script needs to open the same database twice,
// including once in readonly mode.
if (fs.existsSync(config.dbName!)) {
  fs.unlinkSync(config.dbName!)
}

const writeOrm = await MikroORM.init(config);
await writeOrm.schema.create();

const entity = { id: 1, embeddable: { someProperty: 1, unexpected: null } };
await writeOrm.em.insert(Entity, entity);
await writeOrm.close();

const readEmQueries: string[] = [];
const readConfig: Options = {
  ...config,

  // // My program encountered this issue while opening the database in readonly mode,
  // // after a separate process wrote to the database using insertMany.
  // // The program would exit after readEm.flush() throws with SQLITE_READONLY.
  // driverOptions: { readonly: true },
  // // Note that I didn't set `driverOptions: { readonly: true }` true in my original program.
  // // The database was in a readonly Docker volume. Same result.

  onQuery: (sql) => {
    readEmQueries.push(sql);
    return sql;
  },
};

const readOrm = await MikroORM.init(readConfig);
const readEm = readOrm.em.fork();

try {
  await readEm.findOne(Entity, { id: 1 });
  // Debugging functions calls from inside the above line revealed that on the following line:
  // https://github.com/mikro-orm/mikro-orm/blob/29447039532eea662e32c222a382308a744d6b6e/packages/core/src/unit-of-work/ChangeSetComputer.ts#L173)
  // the unexpected property was present in originalEntityData but not in entityData.

  console.log("Queries before flush:");
  console.log(readEmQueries.map((q) => "- " + q).join("\n"));
  readEmQueries.splice(0, readEmQueries.length)

  // My program only ever read from the database and never called em.flush().
  // I wasn't able to have the call to `findOne` trigger a flush automatically,
  // so I am calling flush explicitly here.
  await readEm.flush();
  // ^ This throws when the database is readonly.
} catch (error) {
  console.error('\n', error);
} finally {
  console.error("\nQueries after flush:");
  console.error(readEmQueries.map((q) => "- " + q).join("\n"));
  // ^ "update `entity` set `embeddable` = ? where `id` = ?" is listed here

  await readOrm.close();
}
