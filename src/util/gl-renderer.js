import { projectionType, textureType, modelType } from '../config/constant.js';
import { mat4 } from './mat4.js';
import { PersonModel } from '../config/person.js';

class GLRenderer {
    constructor(modelGl, modelProgram, componentGl, componentProgram) {
        this.model = {
            gl: modelGl,
            program: modelProgram,
            object: PersonModel.getModel(),
            projection: projectionType.ORTHOGRAPHIC,
            texture: textureType.BUMP,
            cameraAngle: 0,
            cameraRadius: 300,
            useShading: true,
            animation: false,
        }

        this.component = {
            gl: componentGl,
            program: componentProgram,
            object: this.model.object.findComponentByName("head"),
            projection: projectionType.ORTHOGRAPHIC,
            texture: textureType.BUMP,
            cameraAngle: 0,
            cameraRadius: 300,
            useShading: true,
        }
    }

    setModel() {
        const renderer = this;
        return {
            object: function (objectType) {
                if (objectType === modelType.PERSON) {
                    renderer.model.object = PersonModel.getModel();
                } else if (objectType === modelType.DOG) {
                    renderer.model.object = PersonModel.getModel(); // TODO: change to dog model
                } else if (objectType === modelType.TABLE) {
                    renderer.model.object = PersonModel.getModel(); // TODO: change to table model
                } else if (objectType === modelType.CAR) {
                    renderer.model.object = PersonModel.getModel(); // TODO: change to car model
                }
            },

            projection: function (projectionType) {
                renderer.model.projection = projectionType;
            },

            texture: function (textureType) {
                renderer.model.texture = textureType;
            },

            cameraAngle: function (angle) {
                renderer.model.cameraAngle = angle;
            },

            cameraRadius: function (radius) {
                renderer.model.cameraRadius = radius;
            },

            useShading: function (useShading) {
                renderer.model.useShading = useShading;
            },
        }
    }

    setComponent() {
        const renderer = this;
        return {
            object: function (name) {
                renderer.component.object = renderer.model.object.findComponentByName(name);
            },

            projection: function (projectionType) {
                renderer.component.projection = projectionType;
            },

            texture: function (textureType) {
                renderer.component.texture = textureType;
            },

            cameraAngle: function (angle) {
                renderer.component.cameraAngle = angle;
            },

            cameraRadius: function (radius) {
                renderer.component.cameraRadius = radius;
            },

            useShading: function (useShading) {
                renderer.component.useShading = useShading;
            },
        }
    }

    render() {
        // this.__renderModel();
        // this.__renderComponent();

        requestAnimationFrame(this.render.bind(this));
    }

    __renderModel() {
        const gl = this.model.gl;
        const program = this.model.program;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        const projectionMat = this.__getProjectionMatrix(gl);
        const viewMat = this.__getViewMatrix();
        const cameraPos = this.__getCameraPos();
        const useShading = this.model.useShading;

        this.model.object.draw(gl, program, projectionMat, viewMat, cameraPos, useShading);
    }

    __renderComponent() {
        const gl = this.component.gl;
        const program = this.component.program;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        const projectionMat = this.__getProjectionMatrix(gl);
        const viewMat = this.__getViewMatrix();
        const cameraPos = this.__getCameraPos();
        const useShading = this.component.useShading;

        this.component.object.draw(gl, program, projectionMat, viewMat, cameraPos, useShading);
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

    __getProjectionMatrix(gl) {
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
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