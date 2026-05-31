`find`ing an entity with an object embeddable column with an unexpected property causes update query when flushing

```
yarn start
```

### Expected console output

```
Queries before flush:
- select name as table_name from sqlite_master where type = 'table' and name != 'sqlite_sequence' and name != 'geometry_columns' and name != 'spatial_ref_sys' union all select name as table_name from sqlite_temp_master where type = 'table' order by name
- select `e0`.* from `entity` as `e0` where `e0`.`id` = ? limit ?

Queries after flush:
- update `entity` set `embeddable` = ? where `id` = ?
```

Additionnally if you open the database in readonly mode the second time:

```
ReadOnlyException: attempt to write a readonly database
    at SqliteExceptionConverter.convertException (file://.../node_modules/@mikro-orm/sql/dialects/sqlite/SqliteExceptionConverter.js:43:20)
    at SqliteDriver.convertException (file://.../node_modules/@mikro-orm/core/drivers/DatabaseDriver.js:453:54)
    at file://.../node_modules/@mikro-orm/core/drivers/DatabaseDriver.js:457:24
    at async SqliteDriver.nativeUpdate (file://.../node_modules/@mikro-orm/sql/AbstractSqlDriver.js:945:19)
    at async ChangeSetPersister.persistManagedEntity (file://.../node_modules/@mikro-orm/core/unit-of-work/ChangeSetPersister.js:191:21)
    at async ChangeSetPersister.executeUpdates (file://.../node_modules/@mikro-orm/core/unit-of-work/ChangeSetPersister.js:62:13)
    at async ChangeSetPersister.runForEachSchema (file://.../node_modules/@mikro-orm/core/unit-of-work/ChangeSetPersister.js:90:13)
    at async UnitOfWork.commitUpdateChangeSets (file://.../node_modules/@mikro-orm/core/unit-of-work/UnitOfWork.js:1108:9)
    at async UnitOfWork.persistToDatabase (file://.../node_modules/@mikro-orm/core/unit-of-work/UnitOfWork.js:1010:13)
    at async SqliteConnection.transactional (file://.../node_modules/@mikro-orm/sql/AbstractSqlConnection.js:108:25)

    at SqliteConnection.executeQuery (file://.../node_modules/kysely/dist/dialect/sqlite/sqlite-driver.js:64:51)
    at file://.../node_modules/kysely/dist/query-executor/query-executor-base.js:39:41
    at #run (file://.../node_modules/kysely/dist/driver/single-connection-provider.js:24:22)
    at SingleConnectionProvider.provideConnection (file://.../node_modules/kysely/dist/driver/single-connection-provider.js:16:41)
    at DefaultQueryExecutor.provideConnection (file://.../node_modules/kysely/dist/query-executor/default-query-executor.js:20:41)
    at DefaultQueryExecutor.executeQuery (file://.../node_modules/kysely/dist/query-executor/query-executor-base.js:38:39)
    at NotCommittedOrRolledBackAssertingExecutor.executeQuery (file://.../node_modules/kysely/dist/kysely.js:1011:31)
    at ControlledTransaction.executeQuery (file://.../node_modules/kysely/dist/kysely.js:535:43)
    at executeQuery (file://.../node_modules/@mikro-orm/sql/AbstractSqlConnection.js:206:53)
    at SqliteConnection.executeQuery (file://.../node_modules/@mikro-orm/core/connections/Connection.js:201:31) {
  code: 'SQLITE_READONLY',
  errno: undefined,
  sqlState: undefined,
  sqlMessage: undefined,
  errmsg: undefined
}
```