import { GlObject } from "./gl-object.js";

export class ArticulatedObject {
    constructor(name, vertices, indices) {
        this.name = name;
        this.child = [];
    }

    addChild(child) {
        this.child.push(child);
    }

    getVertices() {
        return this.vertices;
    }

    getIndices() {
        return this.indices;
    }

    getChild() {
        return this.child;
    }

    getName() {
        return this.name;
    }
}