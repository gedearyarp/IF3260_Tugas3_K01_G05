import { mat4 } from '../util/mat4.js';

export class GlObject {
    constructor(name, vertices, indices) {
        this.name = name;
        this.vertices = vertices;
        this.indices = indices;
    }

    draw(gl, program, projectionMat, viewMat, cameraPos, useShading) {
        this.__createBuffers(gl);
        this.__getLocations(gl, program);
        this.__setupTransformation();

        gl.useProgram(program);

        this.__bindBuffers(gl);
        // this.__setUniforms(gl, projectionMat, viewMat, cameraPos, useShading);

    }

    __createBuffers(gl) {
        this.positionBuffer = gl.createBuffer();
        this.normalBuffer = gl.createBuffer();
        this.colorBuffer = gl.createBuffer();
        this.tangentBuffer = gl.createBuffer();
        this.bitangentBuffer = gl.createBuffer();
        this.textureCoordBuffer = gl.createBuffer();
    }

    __getLocations(gl, program) {
        this.positionLoc = gl.getAttribLocation(program, 'aPosition');
        this.normalLoc = gl.getAttribLocation(program, 'aNormal');
        this.colorLoc = gl.getAttribLocation(program, 'aColor');
        this.tangentLoc = gl.getAttribLocation(program, 'aTangent');
        this.bitangentLoc = gl.getAttribLocation(program, 'aBitangent');
        this.textureCoordLoc = gl.getAttribLocation(program, 'aTexCoord');

        this.projectionLoc = gl.getUniformLocation(program, 'uProjection');
        this.viewLoc = gl.getUniformLocation(program, 'uView');
        this.worldLoc = gl.getUniformLocation(program, 'uWorld');
        this.normalLoc = gl.getUniformLocation(program, 'uNormal');

        this.textureBumpLoc = gl.getUniformLocation(program, 'uTextureBump');
        this.textureReflectiveLoc = gl.getUniformLocation(program, 'uTextureReflective');
        this.textureImageLoc = gl.getUniformLocation(program, 'uTextureImage');

        this.worldCameraPositionLoc = gl.getUniformLocation(program, 'uWorldCameraPosition');

        this.useShadingLoc = gl.getUniformLocation(program, 'uUseShading');
        this.textureTypeLoc = gl.getUniformLocation(program, 'uTextureType');
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
    
    __bindBuffers(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.positionLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.positionLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.normalLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.normalLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.colorLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.colorLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.tangentBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangents), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.tangentLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.tangentLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bitangentBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.bitangents), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.bitangentLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.bitangentLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.textureCoordLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.textureCoordLoc);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
    }

    __setUniforms(gl) {
        gl.uniformMatrix4fv(this.projectionLoc, false, this.projection);
        gl.uniformMatrix4fv(this.viewLoc, false, this.view);
        gl.uniformMatrix4fv(this.worldLoc, false, this.world);
        gl.uniformMatrix4fv(this.normalLoc, false, this.normal);

        gl.uniform3fv(this.worldCameraPositionLoc, this.worldCameraPosition);

        gl.uniform1i(this.useShadingLoc, this.useShading);
        gl.uniform1i(this.textureTypeLoc, this.textureType);

        gl.uniform1i(this.textureBumpLoc, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.textureBump);

        gl.uniform1i(this.textureReflectiveLoc, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureReflective);

        gl.uniform1i(this.textureImageLoc, 1);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, this.textureCubemap);
    }
}