import { projectionType, textureType, modelType } from '../config/constant.js';
import { mat4 } from './mat4.js';
import { PersonModel } from '../config/person.js';
import { ChickenModel } from '../config/chicken.js';

class Controller {
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
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            scale: [1, 1, 1],
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
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            scale: [1, 1, 1],
        }
    }

    setModel() {
        const controller = this;
        return {
            object: function (objectType) {
                if (objectType === modelType.PERSON) {
                    controller.model.object = PersonModel.getModel();
                } else if (objectType === modelType.CHICKEN) {
                    controller.model.object = ChickenModel.getModel(); 
                } else if (objectType === modelType.TABLE) {
                    controller.model.object = PersonModel.getModel(); // TODO: change to table model
                } else if (objectType === modelType.CAR) {
                    controller.model.object = PersonModel.getModel(); // TODO: change to car model
                }
            },

            projection: function (projectionType) {
                controller.model.projection = projectionType;
            },

            texture: function (textureType) {
                controller.model.texture = textureType;
            },

            cameraAngle: function (angle) {
                controller.model.cameraAngle = angle;
            },

            cameraRadius: function (radius) {
                controller.model.cameraRadius = radius;
            },

            useShading: function (useShading) {
                controller.model.useShading = useShading;
            },

            animation: function (animation) {
                controller.model.animation = animation;
            },

            translate: function (id, translate) {
                controller.model.translate[id] = translate;
            },

            rotate: function (id, rotate) {
                controller.model.rotate[id] = rotate;
            },

            scale: function (id, scale) {
                controller.model.scale[id] = scale;
            },
        }
    }

    setComponent() {
        const controller = this;
        return {
            object: function (name) {
                controller.component.object = controller.model.object.findComponentByName(name);
            },

            projection: function (projectionType) {
                controller.component.projection = projectionType;
            },

            texture: function (textureType) {
                controller.component.texture = textureType;
            },

            cameraAngle: function (angle) {
                controller.component.cameraAngle = angle;
            },

            cameraRadius: function (radius) {
                controller.component.cameraRadius = radius;
            },

            useShading: function (useShading) {
                controller.component.useShading = useShading;
            },

            translate: function (id, translate) {
                controller.component.translate[id] = translate;
            },

            rotate: function (id, rotate) {
                controller.component.rotate[id] = rotate;
            },

            scale: function (id, scale) {
                controller.component.scale[id] = scale;
            },
        }
    }

    render() {
        this.__renderModel();
        // this.__renderComponent();

        requestAnimationFrame(this.render.bind(this));
    }

    __renderModel() {
        let gl = this.model.gl;
        let program = this.model.program;

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        const transformMat = this.__getTransformMatrix(this.model);
        const projectionMat = this.__getProjectionMatrix(gl, this.model);
        const viewMat = this.__getViewMatrix(this.model);

        // const transformMat = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        // const projectionMat = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        const colorVec = [0.5, 0.5, 0.3];

        // console.log(transformMat);
        // console.log(projectionMat);
        // console.log(viewMat);

        this.model.object.draw(
            gl, 
            program, 
            transformMat, 
            projectionMat,
            viewMat,
            colorVec,
            this.model.useShading,
            this.model.texture,
        );
    }

    __renderComponent() {
        const gl = this.component.gl;
        const program = this.component.program;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        const projectionMat = this.__getProjectionMatrix(gl, this.component);
        const viewMat = this.__getViewMatrix(this.component);
        const transformMat = this.__getTransformMatrix(this.component);
        const cameraPos = this.__getCameraPos(this.component);
        const useShading = this.component.useShading;
        const textureType = this.component.texture;

        this.component.object.draw(gl, program, projectionMat, viewMat, transformMat, cameraPos, useShading, textureType);
    }

    __getViewMatrix(object) {;
        const cameraPos = this.__getCameraPos(object);
        const viewMat = mat4.lookAt(cameraPos, [0, 0, 0], [0, 1, 0]);

        return mat4.inverse(viewMat);
    }

    __getCameraPos(object) {
        let cameraEye = mat4.identityMatrix();
        const cameraTranslate = mat4.translationMatrix(0, 0, object.cameraRadius);
        const cameraRotation = mat4.rotationMatrix(0, object.cameraAngle, 0);


        cameraEye = mat4.mult(cameraEye, cameraRotation);
        cameraEye = mat4.mult(cameraEye, cameraTranslate);

        return [cameraEye[12], cameraEye[13], cameraEye[14]];
    }

    __getProjectionMatrix(gl, object) {
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 2000;
        const degA = this.__degToRad(60);
        const degB = this.__degToRad(60);

        const left = -1;
        const right = 1;

        const bottom = -1;
        const top = 1;

        switch (object.projection) {
            case projectionType.ORTHOGRAPHIC:
                return mat4.orthographic(left, right, bottom, top, zNear, zFar);
            case projectionType.OBLIQUE:
                const ortho = mat4.orthographic(-1, 1, -1, 1, zNear, zFar);
                return mat4.mult(ortho, mat4.oblique(degA, degB));
            case projectionType.PERSPECTIVE:
                return mat4.perspective(this.__degToRad(60), aspect, zNear, zFar);
        }
    }

    __getTransformMatrix(object) {
        let transformMat = mat4.identityMatrix();
        const translateMat = mat4.translationMatrix(object.translate[0]/100, object.translate[1]/100, object.translate[2]/100);
        const rotateMat = mat4.rotationMatrix(
            this.__degToRad(object.rotate[0]), 
            this.__degToRad(object.rotate[1]), 
            this.__degToRad(object.rotate[2])
        );
        const scaleMat = mat4.scalationMatrix(object.scale[0], object.scale[1], object.scale[2]);

        transformMat = mat4.mult(transformMat, translateMat);
        transformMat = mat4.mult(transformMat, rotateMat);
        transformMat = mat4.mult(transformMat, scaleMat);

        return transformMat;
    }

    __degToRad(deg) {
        return deg * Math.PI / 180;
    }
}

export { Controller };