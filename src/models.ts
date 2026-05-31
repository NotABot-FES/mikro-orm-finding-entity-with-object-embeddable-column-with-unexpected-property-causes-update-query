import { defineEntity, p } from "@mikro-orm/sqlite";

export const EmbeddableSchema = defineEntity({
    name: "Embeddable",
    embeddable: true,
    properties: {
        someProperty: p.integer(),
        // // Eror does not occur when the following line is uncommented.
        // unexpected: p.string().nullable(),
    },
});
export class Embeddable extends EmbeddableSchema.class { }
EmbeddableSchema.setClass(Embeddable);

export const EntitySchema = defineEntity({
    name: "Entity",
    properties: {
        id: p.integer().primary(),
        embeddable: () => p.embedded(Embeddable).object(),
    },
});
export class Entity extends EntitySchema.class { }
EntitySchema.setClass(Entity);

