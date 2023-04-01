import { mat4 } from 'gl-matrix.js';

export class Transformation {
    constructor() {
        this.matrix = mat4.create();
        mat4.identity(this.matrix);
    }

    translate(x, y, z) {
        mat4.translate(this.matrix, this.matrix, [x, y, z]);
    }

    rotate(x, y, z) {
        mat4.rotateX(this.matrix, this.matrix, x);
        mat4.rotateY(this.matrix, this.matrix, y);
        mat4.rotateZ(this.matrix, this.matrix, z);
    }

    scale(x, y, z) {
        mat4.scale(this.matrix, this.matrix, [x, y, z]);
    }

    getMatrix() {
        return this.matrix;
    }
}

export class GlObject {
    constructor(name, vertices, indices) {
        this.name = name;
        this.vertices = vertices;
        this.indices = indices;
    }

    setVertices(vertices) {
        this.vertices = vertices;
    }

    draw() {

    }
}