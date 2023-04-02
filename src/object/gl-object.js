import { mat4 } from '../util/mat4.js';

export class GlObject {
    constructor(gl, program, vertices, indices) {
        this.gl = gl;
        this.program = program;
        this.vertices = vertices;
        this.indices = indices;

        this.__createBuffers();
        this.__getLocations();
        this.__setupTransformation();
    }

    __createBuffers() {
        this.positionBuffer = this.gl.createBuffer();
        this.normalBuffer = this.gl.createBuffer();
        this.colorBuffer = this.gl.createBuffer();
        this.tangentBuffer = this.gl.createBuffer();
        this.bitangentBuffer = this.gl.createBuffer();
        this.textureCoordBuffer = this.gl.createBuffer();
    }

    __getLocations() {
        this.positionLoc = this.gl.getAttribLocation(this.program, 'aPosition');
        this.normalLoc = this.gl.getAttribLocation(this.program, 'aNormal');
        this.colorLoc = this.gl.getAttribLocation(this.program, 'aColor');
        this.tangentLoc = this.gl.getAttribLocation(this.program, 'aTangent');
        this.bitangentLoc = this.gl.getAttribLocation(this.program, 'aBitangent');
        this.textureCoordLoc = this.gl.getAttribLocation(this.program, 'aTexCoord');

        this.projectionLoc = this.gl.getUniformLocation(this.program, 'uProjection');
        this.viewLoc = this.gl.getUniformLocation(this.program, 'uView');
        this.worldLoc = this.gl.getUniformLocation(this.program, 'uWorld');
        this.normalLoc = this.gl.getUniformLocation(this.program, 'uNormal');

        this.textureReflectiveLoc = this.gl.getUniformLocation(this.program, 'uTextureReflective');
        this.textureCubemapLoc = this.gl.getUniformLocation(this.program, 'uTextureCubeMap');
        this.textureBumpLoc = this.gl.getUniformLocation(this.program, 'uTextureBump');

        this.worldCameraPositionLoc = this.gl.getUniformLocation(this.program, 'uWorldCameraPosition');

        this.useShadingLoc = this.gl.getUniformLocation(this.program, 'uUseShading');
        this.textureTypeLoc = this.gl.getUniformLocation(this.program, 'uTextureType');
    }

    __setupTransformation() {
        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        }

        this.translation = {
            x: 0,
            y: 0,
            z: 0
        }

        this.scalation = {
            x: 1,
            y: 1,
            z: 1
        }
    }

    draw() {

    }
}