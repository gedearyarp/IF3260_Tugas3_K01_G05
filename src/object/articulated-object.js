import { GlObject } from "./gl-object.js";

export class ArticulatedObject {
    constructor(name, vertices, indices) {
        this.name = name;
        this.child = [];
        this.object = new GlObject(name, vertices, indices);

        this.translate = [0, 0, 0];
        this.rotate = [0, 0, 0];
        this.scale = [1, 1, 1];
    }

    addChild(child) {
        this.child.push(child);
    }

    drawComponent(gl, program, projectionMat, colorVec, projType, useShading, textureType) {
        this.object.draw(
            gl, 
            program, 
            projectionMat,
            colorVec, 
            projType, 
            useShading, 
            textureType, 
            {
                translate: this.translate, 
                rotate: this.rotate, 
                scale: this.scale
            }
        );
    }

    draw(gl, program, projectionMat, colorVec, projType, useShading, textureType) {
        this.object.draw(
            gl, 
            program, 
            projectionMat,
            colorVec, 
            projType, 
            useShading, 
            textureType, 
            {
                translate: this.translate, 
                rotate: this.rotate, 
                scale: this.scale
            }
        );

        for (let i = 0; i < this.child.length; i++) {
            this.child[i].draw(gl, program, projectionMat, colorVec, projType, useShading, textureType);
        }
    }

    setTexture(gl, program, texture, textureType) {
        this.object.setTexture(gl, program, texture, textureType);
        for (let i = 0; i < this.child.length; i++) {
            this.child[i].setTexture(gl, program, texture, textureType);
        }
    }

    findComponentByName(name) {
        if (
            this.__removeSpace(this.name) === this.__removeSpace(name)
        ) {
            return this;
        }

        for (let i = 0; i < this.child.length; i++) {
            const result = this.child[i].findComponentByName(name);
            if (result !== null) return result;
        }

        return null;
    }

    dfsTranslate(id, translation) {
        this.translate[id] = translation;
        for (let i = 0; i < this.child.length; i++) {
            this.child[i].dfsTranslate(id, translation);
        }
    }

    dfsRotate(id, rotation) {
        this.rotate[id] = rotation;
        for (let i = 0; i < this.child.length; i++) {
            this.child[i].dfsRotate(id, rotation);
        }
    }

    dfsScale(id, scale) {
        this.scale[id] = scale;
        for (let i = 0; i < this.child.length; i++) {
            this.child[i].dfsScale(id, scale);
        }
    }

    getComponentTreeDisplay() {
        let result = `<div class="d-flex flex-column" style="gap: 0.3rem">`;
        result += this.dfsComponentTreeDisplay(0);
        result += `</div>`;

        return result;
    }

    dfsComponentTreeDisplay(depth) {
        let result = `<div>`;

        const space = "&nbsp;".repeat(depth * 6);
        const componentId = `component-part-${this.__removeSpace(this.name)}`;

        const color = `#${((3*(depth)).toString()).repeat(6)}`
        result += 
        `${space}
        <button 
            type="button" class="btn btn-primary" 
            id="${componentId}"
            style="background-color: ${color};"
        >
            ${this.name}
        </button>`;
        result += `</div>`;

        for (let i = 0; i < this.child.length; i++) {
            result += this.child[i].dfsComponentTreeDisplay(depth + 1);
        }

        return result;
    }

    __removeSpace(str) {
        return str.replace(/\s/g, "");
    }
}