import { mat4 } from '../util/mat4.js';
import { vec3 } from '../util/vec3.js';

export class GlObject {
    constructor(name, vertices, indices) {
        this.name = name;
        this.vertices = vertices;
        this.indices = indices;

    }

    draw(gl, program, transformMat, projectionMat, viewMat, colorVec, useShading, textureType) {
        this.__createBuffers(gl);
        this.__getLocations(gl, program);

        gl.useProgram(program);

        this.__bindBuffers(gl);
        this.__setUniforms(gl, transformMat, projectionMat, viewMat, colorVec, useShading, textureType);

        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    __createBuffers(gl) {
        this.positionBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();
    }

    __getLocations(gl, program) {
        this.positionLoc = gl.getAttribLocation(program, 'aPosition');
        this.colorLoc = gl.getUniformLocation(program, 'uColor');
        this.transformLoc = gl.getUniformLocation(program, "uTransform");
        this.projectionLoc = gl.getUniformLocation(program, "uProjection");
        this.viewLoc = gl.getUniformLocation(program, "uView");
        this.normalLoc = gl.getUniformLocation(program, "uNormal");

        this.useShadingLoc = gl.getUniformLocation(program, "uUseShading");
        this.textureTypeLoc = gl.getUniformLocation(program, "uTextureType");
    }

    __bindBuffers(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.positionLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.positionLoc);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
    }

    __setUniforms(gl, transformMat, projectionMat, viewMat, colorVec, useShading, textureType) {
        gl.uniform3fv(this.colorLoc, new Float32Array(colorVec));
        gl.uniformMatrix4fv(this.transformLoc, false, new Float32Array(transformMat));
        gl.uniformMatrix4fv(this.projectionLoc, false, new Float32Array(projectionMat));
        gl.uniformMatrix4fv(this.viewLoc, false, new Float32Array(viewMat));

        let normalMat = mat4.mult(viewMat, transformMat);
        normalMat = mat4.inverse(normalMat);
        normalMat = mat4.transpose(normalMat);
        gl.uniformMatrix4fv(this.normalLoc, false, new Float32Array(normalMat));

        console.log(transformMat, projectionMat, viewMat)

        gl.uniform1i(this.useShadingLoc, useShading);
        gl.uniform1i(this.textureTypeLoc, textureType);
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

            if ((image.width & (image.width - 1)) === 0 && (image.height & (image.height - 1)) === 0) {
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

            if ((image.width & (image.width - 1)) === 0 && (image.height & (image.height - 1)) === 0) {
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