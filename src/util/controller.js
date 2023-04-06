import { projectionType, textureType, modelType } from '../config/constant.js';
import { mat4 } from './mat4.js';
import { PersonModel } from '../config/person.js';

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
                } else if (objectType === modelType.DOG) {
                    controller.model.object = PersonModel.getModel(); // TODO: change to dog model
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

    __getTexture(gl) {
        switch (this.texture) {
            case textureType.BUMP:
                return this.__getBumpTexture(gl);
            case textureType.REFLECTIVE:
                return this.__getReflectiveTexture(gl);
            case textureType.IMAGE:
                return this.__getImageTexture(gl);
        }
    }

    __getBumpTexture(gl) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

        const image = new Image();
        image.src = '../assets/bump.png';
        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        return texture;
    }

    __getReflectiveTexture(gl) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

        const cubeFaces = [
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                url: '../assets/pos-x.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                url: '../assets/neg-x.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                url: '../assets/pos-y.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                url: '../assets/neg-y.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                url: '../assets/pos-z.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                url: '../assets/neg-z.jpg',
            },
        ];

        cubeFaces.forEach((face) => {
            const { target, url } = face;
        
            const level = 0;
            const internalFormat = gl.RGBA;
            const width = 1;
            const height = 1;
            const border = 0;
            const srcFormat = gl.RGBA;
            const srcType = gl.UNSIGNED_BYTE;
            const pixel = new Uint8Array([0, 0, 255, 255]);
            gl.texImage2D(target, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

            const image = new Image();
            image.src = url;
            image.onload = function () {
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texImage2D(target, level, internalFormat, srcFormat, srcType, image);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            };
        });
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        return texture;
    }

    __getImageTexture(gl) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

        const image = new Image();
        image.src = '../assets/universe.png';
        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        return texture;
    }

    isPowerOf2(value) {
        return (value & (value - 1)) == 0;
    }

    __degToRad(deg) {
        return deg * Math.PI / 180;
    }
}

export { Controller };