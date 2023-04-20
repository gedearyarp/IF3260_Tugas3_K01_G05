import { projectionType, textureType, modelType } from '../config/constant.js';
import { mat4 } from './mat4.js';
import { PersonModel } from '../config/person.js';
import { ChickenModel } from '../config/chicken.js';
import { WolfModel } from '../config/wolf.js';
import { HorseModel } from '../config/horse.js';
import { ArticulatedObject } from '../object/articulated-object.js';
import { Texture } from './texture.js';

import {resetModelViewControl, resetComponentViewControl, setComponentViewControl} from '../view.js'

class Controller {
    constructor(modelGl, modelProgram, componentGl, componentProgram) {
        this.articulatedModel = modelType.PERSON;
        this.model = {
            gl: modelGl,
            program: modelProgram,
            object: PersonModel.getModel(),
            projection: projectionType.ORTHOGRAPHIC,
            texture: textureType.COLOR,
            textures: Texture.__generateTexture(modelGl),
            cameraAngle: 0,
            cameraRadius: 0,
            useShading: true,
            animation: false,
        }

        this.component = {
            gl: componentGl,
            program: componentProgram,
            object: this.model.object,
            projection: projectionType.ORTHOGRAPHIC,
            texture: textureType.COLOR,
            textures: Texture.__generateTexture(componentGl),
            cameraAngle: 0,
            cameraRadius: 0,
            useShading: true,
        }

        this.animation = {
            lastRenderTime: 0,
            animationInterval: 75,
            currentFrame: 0,
            frames: []
        }
    }

    setModel() {
        const controller = this;
        return {
            object: function (objectType) {
                if (objectType === modelType.PERSON) {
                    controller.model.object = PersonModel.getModel();
                    controller.articulatedModel = modelType.PERSON;
                } else if (objectType === modelType.CHICKEN) {
                    controller.model.object = ChickenModel.getModel();
                    controller.articulatedModel = modelType.CHICKEN;
                } else if (objectType === modelType.WOLF) {
                    controller.model.object = WolfModel.getModel();
                    controller.articulatedModel = modelType.WOLF;
                } else if (objectType === modelType.HORSE) {
                    controller.model.object = HorseModel.getModel();
                    controller.articulatedModel = modelType.HORSE;
                }

                controller.model.projection = projectionType.ORTHOGRAPHIC;
                controller.model.texture = textureType.COLOR;
                controller.model.textures = Texture.__generateTexture(controller.model.gl);
                controller.model.cameraAngle = 0;
                controller.model.cameraRadius = 0;
                controller.model.useShading = true;
                controller.model.animation = false;

                controller.component.object = controller.model.object;
                resetModelViewControl();
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
                if (controller.articulatedModel === modelType.PERSON) {
                    controller.animation.frames = PersonModel.getAnimation();
                } else if (controller.articulatedModel === modelType.CHICKEN) {
                    controller.animation.frames = ChickenModel.getAnimation();
                } else if (controller.articulatedModel === modelType.WOLF) {
                    controller.animation.frames = WolfModel.getAnimation();
                } else if (controller.articulatedModel === modelType.HORSE) {
                    controller.animation.frames = HorseModel.getAnimation();
                }

                controller.model.animation = animation;

                if (!animation) {
                    if (controller.articulatedModel === modelType.PERSON) {
                        controller.model.object = PersonModel.getModel();
                    } else if (controller.articulatedModel === modelType.CHICKEN) {
                        controller.model.object = ChickenModel.getModel();
                    } else if (controller.articulatedModel === modelType.WOLF) {
                        controller.model.object = WolfModel.getModel();
                    } else if (controller.articulatedModel === modelType.HORSE) {
                        controller.model.object = HorseModel.getModel();
                    }

                    controller.model.projection = projectionType.ORTHOGRAPHIC;
                    controller.model.texture = textureType.COLOR;
                    controller.model.textures = Texture.__generateTexture(controller.model.gl);
                    controller.model.cameraAngle = 0;
                    controller.model.cameraRadius = 0;
                    controller.model.useShading = true;
                    controller.model.animation = false;

                    controller.component.object = controller.model.object;
                    resetModelViewControl();
                }
            },

            translate: function (id, translate) {
                controller.model.object.dfsTranslate(id, parseFloat(translate));
            },

            rotate: function (id, rotate) {
                controller.model.object.dfsRotate(id, parseFloat(rotate));
            },

            scale: function (id, scale) {
                controller.model.object.dfsScale(id, parseFloat(scale));
            },

            reset: function () {
                for (let i = 0; i < 3; i++) {
                    controller.model.object.dfsTranslate(i, 0);
                    controller.model.object.dfsRotate(i, 0);
                    controller.model.object.dfsScale(i, 1);
                }

                for (let i = 0; i < 3; i++) {
                    controller.component.object.object.translate[i] = 0;
                    controller.component.object.object.rotate[i] = 0;
                    controller.component.object.object.scale[i] = 1;
                }

                controller.model.animation = false;
                controller.model.cameraAngle = 0;
                controller.model.cameraRadius = 0;
                controller.model.useShading = true;
                controller.model.projection = projectionType.ORTHOGRAPHIC;
                controller.model.texture = textureType.COLOR;

                controller.component.cameraAngle = 0;
                controller.component.cameraRadius = 0;
                controller.component.useShading = true;
                controller.component.projection = projectionType.ORTHOGRAPHIC;

                resetModelViewControl();
            },
        }
    }

    setComponent() {
        const controller = this;
        return {
            object: function (name) {
                controller.component.object = controller.model.object.findComponentByName(name);
                setComponentViewControl(
                    {
                        translate: controller.component.object.object.translate,
                        rotate: controller.component.object.object.rotate,
                        scale: controller.component.object.object.scale,
                    }
                )
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
                controller.component.object.object.translate[id] = parseFloat(translate);
            },

            rotate: function (id, rotate) {
                controller.component.object.object.rotate[id] = parseFloat(rotate);
            },

            scale: function (id, scale) {
                controller.component.object.object.scale[id] = parseFloat(scale);
            },

            reset: function () {
                for (let i = 0; i < 3; i++) {
                    controller.component.object.object.translate[i] = 0;
                    controller.component.object.object.rotate[i] = 0;
                    controller.component.object.object.scale[i] = 1;
                }

                controller.component.cameraAngle = 0;
                controller.component.cameraRadius = 0;
                controller.component.useShading = true;
                controller.component.projection = projectionType.ORTHOGRAPHIC;

                resetComponentViewControl();
            }
        }
    }

    render() {
        if (this.model.animation) {
            const currentTime = Date.now();
            if (currentTime - this.animation.lastRenderTime >= this.animation.animationInterval) {
                this.animation.currentFrame = (this.animation.currentFrame + 1) % this.animation.frames.length;
                this.animation.lastRenderTime = currentTime;

                const dataFrame = JSON.parse(this.animation.frames[this.animation.currentFrame]);
                this.model.object = this.__dfsConstructArticulatedObject(dataFrame);
            }

            this.__renderModel();
            this.__renderComponent();
        } else {
            this.__renderModel();
            this.__renderComponent();
        }

        requestAnimationFrame(this.render.bind(this));
    }

    getComponentTreeDisplay() {
        return this.model.object.getComponentTreeDisplay();
    }

    save() {
        const dataArticulated = {
            name: this.articulatedModel,
            model: this.model.object.getArticulatedData()
        };

        const data = JSON.stringify(dataArticulated);
        const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `${this.articulatedModel}.json`;
        link.click();
    }

    load(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (event) => {
            const data = JSON.parse(event.target.result);

            this.articulatedModel = data.name;
            this.setModel.object = data.name;

            this.model.object = this.__dfsConstructArticulatedObject(data.model);
            this.setComponent().object(this.model.object.name);

            this.getComponentTreeDisplay();
        }
    }

    __dfsConstructArticulatedObject(object) {
        const articulatedObject = new ArticulatedObject(object.name, object.vertices, object.indices);
        articulatedObject.object.translate = object.translate;
        articulatedObject.object.rotate = object.rotate;
        articulatedObject.object.scale = object.scale;

        for (let i = 0; i < object.child.length; i++) {
            articulatedObject.addChild(this.__dfsConstructArticulatedObject(object.child[i]));
        }

        return articulatedObject;
    }

    __renderModel() {
        let gl = this.model.gl;
        let program = this.model.program;

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        const projectionMat = this.__getProjectionMatrix(this.model);
        const cameraViewMat = this.__getCameraViewMatrix(this.model);
        const cameraPosition = this.__getCameraPos(this.model);
        const colorVec = [0.6, 0.2, 0.4];

        this.model.object.draw(
            gl, 
            program,
            projectionMat,
            cameraViewMat,
            cameraPosition,
            colorVec,
            this.model.textures,
            this.model.projection,
            this.model.useShading,
            this.model.texture,
        );
    }

    __renderComponent() {
        let gl = this.component.gl;
        let program = this.component.program;

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        const projectionMat = this.__getProjectionMatrix(this.component);
        const cameraViewMat = this.__getCameraViewMatrix(this.component);
        const cameraPosition = this.__getCameraPos(this.component);
        const colorVec = [0.6, 0.2, 0.4];

        this.component.object.drawComponent(
            gl, 
            program, 
            projectionMat,
            cameraViewMat,
            cameraPosition,
            colorVec,
            this.component.textures,
            this.component.projection,
            this.component.useShading,
            this.component.texture,
        );
    }

    __getViewMatrix(object) {
        const cameraPos = this.__getCameraPos(object);
        const viewMat = mat4.lookAt(cameraPos, [0, 0, 0], [0, 1, 0]);

        return mat4.inverse(viewMat);
    }

    __getCameraPos(object) {
        let cameraEye = mat4.identityMatrix();

        const cameraRotation = mat4.rotationMatrix(0, this.__degToRad(object.cameraAngle), 0);
        const cameraTranslate = mat4.translationMatrix(0, 0, object.cameraRadius / 1000);

        cameraEye = mat4.mult(cameraEye, cameraRotation);
        cameraEye = mat4.mult(cameraEye, cameraTranslate);

        return [cameraEye[12], cameraEye[13], cameraEye[14]];
    }

    __getProjectionMatrix(object) {
        const degA = this.__degToRad(64);
        const degB = this.__degToRad(64);

        const left = -1;
        const right = 1;
        const bottom = -1;
        const top = 1;
        const near = -1;
        const far = 1;

        let projection;
        switch (object.projection) {
            case projectionType.ORTHOGRAPHIC:
                projection = mat4.orthographic(left, right, bottom, top, near, far);
                break;
            case projectionType.OBLIQUE:
                projection = mat4.oblique(degA, degB);
                break;
            case projectionType.PERSPECTIVE:
                projection = mat4.identityMatrix();
                break;
        }

        // const cameraRotation = mat4.rotationMatrix(0, this.__degToRad(object.cameraAngle), 0);
        // const cameraTranslation = mat4.translationMatrix(0, 0, object.cameraRadius / 1000);

        // const cameraTransform = mat4.mult(cameraRotation, cameraTranslation);

        // return mat4.mult(projection, cameraTransform);
        return projection;
    }

    __getCameraViewMatrix(object) {
        const cameraRotation = mat4.rotationMatrix(0, this.__degToRad(object.cameraAngle), 0);
        const cameraTranslation = mat4.translationMatrix(0, 0, object.cameraRadius / 1000);

        const cameraTransform = mat4.mult(cameraRotation, cameraTranslation);

        return cameraTransform;
    }


    __degToRad(deg) {
        return deg * Math.PI / 180;
    }
}

export { Controller };