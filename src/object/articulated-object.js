import { GlObject } from "./gl-object.js";

export class ArticulatedObject {
    constructor(name, vertices, indices) {
        this.name = name;
        this.child = [];
        this.object = new GlObject(name, vertices, indices);
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

    draw(gl, program, transformMat, projectionMat, colorVec, projType, useShading, textureType) {
        this.object.draw(gl, program, transformMat, projectionMat, colorVec, projType, useShading, textureType);

        for (let i = 0; i < this.child.length; i++) {
            this.child[i].draw(gl, program, transformMat, projectionMat, colorVec, projType, useShading, textureType);
        }
    }

    setTexture(gl, program, texture, textureType) {
        this.object.setTexture(gl, program, texture, textureType);
        for (let i = 0; i < this.child.length; i++) {
            this.child[i].setTexture(gl, program, texture, textureType);
        }
    }

    findComponentByName(name) {
        if (this.name === name) {
            return this.object;
        }

        for (let i = 0; i < this.child.length; i++) {
            const result = this.child[i].findComponentByName(name);
            if (result !== null) return result;
        }

        return null;
    }
}