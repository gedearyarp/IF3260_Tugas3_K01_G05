import { mat4 } from '../util/mat4.js';
import { vec3 } from '../util/vec3.js';

export class GlObject {
    constructor(name, vertices, indices) {
        this.name = name;
        this.vertices = vertices;
        this.indices = indices;
    }

    draw(gl, program, projectionMat, viewMat, transformMat, cameraPos, useShading, textureType) {
        this.__createBuffers(gl);
        this.__getLocations(gl, program);

        gl.useProgram(program);

        this.__bindBuffers(gl);
        this.__setUniforms(gl, projectionMat, viewMat, transformMat, cameraPos, useShading, textureType);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
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

    __bindBuffers(gl) {
        const attributesData = this.__generateAttributesData();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attributesData.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.positionLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.positionLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attributesData.normals), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.normalLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.normalLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attributesData.colors), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.colorLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.colorLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.tangentBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attributesData.tangents), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.tangentLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.tangentLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bitangentBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attributesData.bitangents), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.bitangentLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.bitangentLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attributesData.textureCoords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.textureCoordLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.textureCoordLoc);
    }

    __setUniforms(gl, projectionMat, viewMat, transformMat, cameraPos, useShading, textureType) {
        gl.uniformMatrix4fv(this.projectionLoc, false, projectionMat);
        gl.uniformMatrix4fv(this.viewLoc, false, viewMat);
        gl.uniformMatrix4fv(this.worldLoc, false, transformMat);

        let normalMat;
        normalMat = mat4.mult(viewMat, transformMat);
        normalMat = mat4.inverse(normalMat);
        normalMat = mat4.transpose(normalMat);
        gl.uniformMatrix4fv(this.normalLoc, false, normalMat);
        gl.uniform3fv(this.worldCameraPositionLoc, cameraPos);

        gl.uniform1i(this.useShadingLoc, Number(useShading));
        gl.uniform1i(this.textureTypeLoc, Number(textureType));

        const texture = this.__generateTexture(gl);
        gl.uniform1i(this.textureBumpLoc, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture.bump);

        gl.uniform1i(this.textureReflectiveLoc, 1);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture.reflective);

        gl.uniform1i(this.textureImageLoc, 2);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, texture.image);
    }

    __generateTexture(gl) {
        return {
            bump: this.__getBumpTexture(gl),
            reflective: this.__getReflectiveTexture(gl),
            image: this.__getImageTexture(gl)
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
        image.src = './assets/bump.png';
        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

            if ((image.width & (image.width - 1)) === 0 && (image.width & (image.width - 1)) === 0) {
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
                url: './assets/pos-x.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                url: './assets/neg-x.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                url: './assets/pos-y.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                url: './assets/neg-y.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                url: './assets/pos-z.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                url: './assets/neg-z.jpg',
            },
        ];

        cubeFaces.forEach((face) => {
            const { target, url } = face;
        
            const level = 0;
            const internalFormat = gl.RGBA;
            const width = 512;
            const height = 512;
            const border = 0;
            const srcFormat = gl.RGBA;
            const srcType = gl.UNSIGNED_BYTE;

            gl.texImage2D(target, level, internalFormat, width, height, border, srcFormat, srcType, null);

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
        image.src = './assets/universe.png';
        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

            if ((image.width & (image.width - 1)) === 0 && (image.width & (image.width - 1)) === 0) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        return texture;
    }

    __generateAttributesData() {
        const attributes = {
            vertices: [],
            normals: [],
            colors: [],
            tangents: [],
            bitangents: [],
            textureCoords: [],
        }

        const indicesLength = this.indices.length;
        for (let i=0; i < indicesLength; i += 6) {
            for (let j=0; j < 6; j++) {
                const index = this.indices[i + j];
                const vertex = this.vertices[index];
                attributes.vertices = attributes.vertices.concat(vertex);

                attributes.colors = attributes.colors.concat([1.0, 1.0, 1.0, 1.0]);
            }
            
            attributes.textureCoords = attributes.textureCoords.concat([
                0, 0,
                0, 1,
                1, 1,
                1, 0,
                0, 0,
                1, 1
            ]);
        }

        const verticesLength = attributes.vertices.length;
        for (let i=0; i < verticesLength; i += 9) {
            const v1 = [attributes.vertices[i], attributes.vertices[i + 1], attributes.vertices[i + 2]];
            const v2 = [attributes.vertices[i + 3], attributes.vertices[i + 4], attributes.vertices[i + 5]];
            const v3 = [attributes.vertices[i + 6], attributes.vertices[i + 7], attributes.vertices[i + 8]];

            let tan = vec3.sub(v2, v1);
            let bitan = vec3.sub(v3, v1);
            let norm = vec3.cross(tan, bitan);

            tan = vec3.normalize(tan);
            bitan = vec3.normalize(bitan);
            norm = vec3.normalize(norm);

            for (let j=0; j < 3; j++) {
                attributes.tangents = attributes.tangents.concat([tan[0], tan[1], tan[2]]);
                attributes.bitangents = attributes.bitangents.concat([bitan[0], bitan[1], bitan[2]]);
                attributes.normals = attributes.normals.concat([norm[0], norm[1], norm[2]]);
            }
        }

        return {...attributes};
    }
}