import { defineEntity, p } from "@mikro-orm/sqlite";

export const SubEntity1Schema = defineEntity({
    name: "SubEntity1",
    properties: { id: p.integer().primary() },
});
export class SubEntity1 extends SubEntity1Schema.class {}
SubEntity1Schema.setClass(SubEntity1);

export const SubEntity2Schema = defineEntity({
    name: "SubEntity2",
    properties: { id: p.integer().primary() },
});
export class SubEntity2 extends SubEntity2Schema.class {}
SubEntity2Schema.setClass(SubEntity2);

export const EmbeddableSchema = defineEntity({
    name: "Embeddable",
    embeddable: true,
    properties: {
        subentity: () => p.manyToOne([SubEntity1, SubEntity2]),
    },
});
export class Embeddable extends EmbeddableSchema.class {}
EmbeddableSchema.setClass(Embeddable);

// The error does not occur when Entity is removed from discoverable entities.
export const EntitySchema = defineEntity({
    name: "Entity",
    properties: {
        id: p.integer().primary(),
        embeddable: () => p.embedded(Embeddable).object(),
    },
});
export class Entity extends EntitySchema.class {}
EntitySchema.setClass(Entity);
