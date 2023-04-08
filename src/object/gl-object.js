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
        this.__setupTexture();

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

    __setupTexture(gl) {
        var textureCoordinates = [];
        for (let i = 0; i < 6; i++) {
            textureCoordinates.push([
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0
            ]);
        }
        this.textureCoords = textureCoordinates;
        this.texture = [this.__getBumpTexture(gl), this.__getReflectiveTexture(gl), this.__getImageTexture(gl)];
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
}