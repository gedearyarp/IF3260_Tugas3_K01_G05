import { projectionType } from '../config/constant.js';
import { mat4 } from './mat4.js';
import { PersonModel } from '../config/person.js';

class GLRenderer {
    constructor(gl, program) {
        this.gl = gl;
        this.program = program;
        this.object = PersonModel.get(gl, program);

        this.projection = projectionType.ORTHOGRAPHIC;
        this.cameraAngle = 0;
        this.cameraRadius = 300;
        this.useShading = true;
    }

    setObject(object) {
        this.object = object;
    }

    render() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);

        const projectionMat = this.__getProjectionMatrix();
        const viewMat = this.__getViewMatrix();
        const cameraPos = this.__getCameraPos();
        const useShading = this.useShading;

        this.object.draw(projectionMat, viewMat, cameraPos, useShading);

        requestAnimationFrame(this.render.bind(this));
    }

    __getViewMatrix() {;
        const cameraPos = this.__getCameraPos();
        const viewMat = mat4.lookAt(cameraPos, [0, 0, 0], [0, 1, 0]);

        return mat4.inverse(viewMat);
    }

    __getCameraPos() {
        let cameraEye;

        const cameraMat = mat4.identityMatrix();
        const cameraTranslate = mat4.translationMatrix(0, 0, this.cameraRadius);
        const cameraRotation = mat4.rotationMatrix(0, this.cameraAngle, 0);

        cameraEye = mat4.mult(cameraMat, cameraTranslate);
        cameraEye = mat4.mult(cameraEye, cameraRotation);

        return [cameraEye[12], cameraEye[13], cameraEye[14]];
    }

    __getProjectionMatrix() {
        const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        const zNear = 1;
        const zFar = 2000;
        const degA = this.__degToRad(45);
        const degB = this.__degToRad(45);

        switch (this.projection) {
            case projectionType.ORTHOGRAPHIC:
                return mat4.orthographic(-300, 300, -300, 300, zNear, zFar);
            case projectionType.OBLIQUE:
                return mat4.oblique(degA, degB);
            case projectionType.PERSPECTIVE:
                return mat4.perspective(45, aspect, zNear, zFar);
        }
    }

    __degToRad(deg) {
        return deg * Math.PI / 180;
    }
}

export { GLRenderer };