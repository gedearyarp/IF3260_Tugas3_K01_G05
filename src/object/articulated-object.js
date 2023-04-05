import { GlObject } from "./gl-object.js";

export class ArticulatedObject {
    constructor(gl, program, name, vertices, indices) {
        this.name = name;
        this.child = [];
        this.object = new GlObject(gl, program, name, vertices, indices);
    }

    addChild(child) {
        this.child.push(child);
    }

    getChild() {
        return this.child;
    }

    getName() {
        return this.name;
    }

    getObject() {
        return this.object;
    }

    draw(projectionMat, viewMat, cameraPos, useShading) {
        this.object.draw(projectionMat, viewMat, cameraPos, useShading);

        for (let i = 0; i < this.child.length; i++) {
            this.child[i].draw(projectionMat, viewMat, cameraPos, useShading);
        }
    }
}