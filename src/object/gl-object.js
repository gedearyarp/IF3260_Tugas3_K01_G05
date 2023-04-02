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

        this.textureBumpLoc = this.gl.getUniformLocation(this.program, 'uTextureBump');
        this.textureReflectiveLoc = this.gl.getUniformLocation(this.program, 'uTextureReflective');
        this.textureImageLoc = this.gl.getUniformLocation(this.program, 'uTextureImage');

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
        this.gl.useProgram(this.program);
        this.__bindBuffers();

    }

    __bindBuffers() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.positionLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.positionLoc);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.normals), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.normalLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.normalLoc);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.colors), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.colorLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.colorLoc);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.tangentBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.tangents), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.tangentLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.tangentLoc);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bitangentBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.bitangents), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.bitangentLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.bitangentLoc);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textureCoords), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.textureCoordLoc, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.textureCoordLoc);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);
    }

    __setUniforms() {
        this.gl.uniformMatrix4fv(this.projectionLoc, false, this.projection);
        this.gl.uniformMatrix4fv(this.viewLoc, false, this.view);
        this.gl.uniformMatrix4fv(this.worldLoc, false, this.world);
        this.gl.uniformMatrix4fv(this.normalLoc, false, this.normal);

        this.gl.uniform3fv(this.worldCameraPositionLoc, this.worldCameraPosition);

        this.gl.uniform1i(this.useShadingLoc, this.useShading);
        this.gl.uniform1i(this.textureTypeLoc, this.textureType);

        this.gl.uniform1i(this.textureBumpLoc, 0);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureBump);

        this.gl.uniform1i(this.textureReflectiveLoc, 0);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.textureReflective);

        this.gl.uniform1i(this.textureImageLoc, 1);
        this.gl.activeTexture(this.gl.TEXTURE2);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureCubemap);
    }
}