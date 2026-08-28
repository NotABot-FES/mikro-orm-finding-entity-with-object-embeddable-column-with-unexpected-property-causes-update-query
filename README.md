Defining an Entity with an Embeddable property with a polymorphic relation to entities causes an error to occur when creating the schema.

```sh
npx mikro-orm schema:create --config src/mikro-orm.config.ts.ts --run
```

Output:

```
mikro-orm schema:create

Create database schema based on current metadata

Options :
      --config                  Set path to the ORM configuration file [tableau]
      --contextName, --context  Set name of config to load out of the ORM config
                                uration file. Used when config file exports an a
                                rray or a function
                                     [chaîne de caractères] [défaut : "default"]
  -r, --run                     Runs queries                           [booléen]
  -d, --dump                    Dumps all queries to console           [booléen]
      --fk-checks               Do not skip foreign key checks         [booléen]
      --schema                  Set the current schema for wildcard schema entit
                                ies                       [chaîne de caractères]
      --seed                    Allows to seed the database on create or drop an
                                d recreate                [chaîne de caractères]
  -v, --version                 Affiche le numéro de version           [booléen]
  -h, --help                    Affiche l'aide                         [booléen]

TypeError: Cannot read properties of undefined (reading '0')
    at MetadataDiscovery.initEmbeddables (file:///.../node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:1277:42)
    at file:///.../node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:158:36
    at file:///.../node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:153:85
    at Array.forEach (<anonymous>)
    at file:///.../node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:153:69
    at Array.forEach (<anonymous>)
    at forEachProp (file:///.../node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:153:22)
    at MetadataDiscovery.processDiscoveredEntities (file:///.../node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:158:9)
    at MetadataDiscovery.discover (file:///.../node_modules/@mikro-orm/core/metadata/MetadataDiscovery.js:47:14)
    at async MikroORM.init (file:///.../node_modules/@mikro-orm/core/MikroORM.js:97:25)
```
