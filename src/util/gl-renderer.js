import { projectionType, textureType } from '../config/constant.js';
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
        return {
            object: function (objectType) {
                const gl = this.model.gl;
                const program = this.model.program;

                if (objectType === modelType.PERSON) {
                    this.model.object = PersonModel.getModel(gl, program);
                } else if (objectType === modelType.DOG) {
                    this.model.object = DogModel.get(gl, program);
                } else if (objectType === modelType.TABLE) {
                    this.model.object = TableModel.get(gl, program);
                } else if (objectType === modelType.CAR) {
                    this.model.object = CarModel.get(gl, program);
                }
            },

            projection: function (projectionType) {
                this.model.projection = projectionType;
            },

            texture: function (textureType) {
                this.model.texture = textureType;
            },

            cameraAngle: function (angle) {
                this.model.cameraAngle = angle;
            },

            cameraRadius: function (radius) {
                this.model.cameraRadius = radius;
            },

            useShading: function (useShading) {
                this.model.useShading = useShading;
            },
        }
    }

    setComponent() {
        return {
            object: function (name) {
                this.component.object = this.model.object.findComponentByName(name);
            },

            projection: function (projectionType) {
                this.component.projection = projectionType;
            },

            texture: function (textureType) {
                this.component.texture = textureType;
            },

            cameraAngle: function (angle) {
                this.component.cameraAngle = angle;
            },

            cameraRadius: function (radius) {
                this.component.cameraRadius = radius;
            },

            useShading: function (useShading) {
                this.component.useShading = useShading;
            },
        }
    }

    render() {
        this.__renderModel();
        this.__renderComponent();

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