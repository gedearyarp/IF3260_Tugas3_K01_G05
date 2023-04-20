import { projectionType } from '../config/constant.js';

import { mat4 } from '../util/mat4.js';
import { vec3 } from '../util/vec3.js';

export class GlObject {
    constructor(name, vertices, indices) {
        this.name = name;
        this.vertices = vertices;
        this.indices = indices;

        this.attributes = this.__generateAttributesData();

        this.translate = [0, 0, 0];
        this.rotate = [0, 0, 0];
        this.scale = [1, 1, 1];
    }

    draw(gl, program, projectionMat, cameraViewMat, cameraPosition, colorVec, textures, projType, useShading, textureType, parentTransform) {
        this.__createBuffers(gl);
        this.__getLocations(gl, program);

        this.texture = textures;

        gl.useProgram(program);

        this.__bindBuffers(gl);
        this.__setUniforms(gl, projectionMat, cameraViewMat, cameraPosition, colorVec, projType, useShading, textureType, parentTransform);

        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    __createBuffers(gl) {
        this.positionBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();
        this.normalBuffer = gl.createBuffer();
        this.tangentBuffer = gl.createBuffer();
        this.bitangentBuffer = gl.createBuffer();
        this.texCoordBuffer = gl.createBuffer();
    }

    __getLocations(gl, program) {
        this.positionLoc = gl.getAttribLocation(program, 'aPosition');
        this.normalLoc = gl.getAttribLocation(program, 'aNormal');
        this.tangentLoc = gl.getAttribLocation(program, 'aTangent');
        this.bitangentLoc = gl.getAttribLocation(program, 'aBitangent');
        this.texCoordLoc = gl.getAttribLocation(program, 'aTextureCoord');

        this.colorLoc = gl.getUniformLocation(program, 'uColor');
        this.transformLoc = gl.getUniformLocation(program, "uTransform");
        this.projectionLoc = gl.getUniformLocation(program, "uProjection");
        this.cameraViewLoc = gl.getUniformLocation(program, "uCameraView");
        this.fudgeFactorLoc = gl.getUniformLocation(program, "uFudgeFactor");
        this.normalMatLoc = gl.getUniformLocation(program, "uNormal");
        this.cameraPositionLoc = gl.getUniformLocation(program, "uCameraPosition");
        this.reverseLightDirectionLoc = gl.getUniformLocation(program, "uReverseLightDirection");
        this.useShadingLoc = gl.getUniformLocation(program, "uUseShading");
        this.textureTypeLoc = gl.getUniformLocation(program, "uTextureType");
        this.textureBumpLoc = gl.getUniformLocation(program, "uTextureBump");
        this.textureReflectiveLoc = gl.getUniformLocation(program, "uTextureReflective");
        this.textureImageLoc = gl.getUniformLocation(program, "uTextureImage");
    }

    __bindBuffers(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.positionLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.positionLoc);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.attributes.normals), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.normalLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.normalLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.tangentBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.attributes.tangents), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.tangentLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.tangentLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bitangentBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.attributes.bitangents), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.bitangentLoc, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.bitangentLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.attributes.textureCoords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.texCoordLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.texCoordLoc);
    }

    __setUniforms(gl, projectionMat, cameraViewMat, cameraPosition, colorVec, projType, useShading, textureType, parentTransform) {
        gl.uniform3fv(this.colorLoc, new Float32Array(colorVec));

        const transformMat = this.__getTransformMatrix(parentTransform);
        gl.uniformMatrix4fv(this.transformLoc, false, new Float32Array(transformMat));
        gl.uniformMatrix4fv(this.projectionLoc, false, new Float32Array(projectionMat));
        gl.uniformMatrix4fv(this.cameraViewLoc, false, new Float32Array(cameraViewMat));
        const viewTransformMat = mat4.mult(cameraViewMat, transformMat);
        const normalMat = mat4.transpose(mat4.inverse(viewTransformMat));
        gl.uniformMatrix4fv(this.normalMatLoc, false, new Float32Array(normalMat));

        gl.uniform3fv(this.cameraPositionLoc, new Float32Array(cameraPosition));

        if (projType === projectionType.PERSPECTIVE) {
            gl.uniform1f(this.fudgeFactorLoc, 1.0);
        } else {
            gl.uniform1f(this.fudgeFactorLoc, 0.0);
        }

        gl.uniform1i(this.useShadingLoc, useShading);
        gl.uniform1i(this.textureTypeLoc, textureType);

        gl.uniform1i(this.textureBumpLoc, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.bump);

        gl.uniform1i(this.textureReflectiveLoc, 1);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture.reflective);

        gl.uniform1i(this.textureImageLoc, 2);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.image);
    }

    __getTransformMatrix(parentTransform) {
        const parentTranslate = parentTransform ? parentTransform.translate : [0, 0, 0];
        const parentRotate = parentTransform ? parentTransform.rotate : [0, 0, 0];
        const parentScale = parentTransform ? parentTransform.scale : [1, 1, 1];

        let transformMat = mat4.identityMatrix();
        const translateMat = mat4.translationMatrix(
            (this.translate[0] + parentTranslate[0])/100, 
            (this.translate[1] + parentTranslate[1])/100, 
            (this.translate[2] + parentTranslate[2])/100
        );
        const rotateMat = mat4.rotationMatrix(
            this.__degToRad(this.rotate[0] + parentRotate[0])/2, 
            this.__degToRad(this.rotate[1] + parentRotate[1])/2,
            this.__degToRad(this.rotate[2] + parentRotate[2])/2
        );
        const scaleMat = mat4.scalationMatrix(
            this.scale[0] * parentScale[0],
            this.scale[1] * parentScale[1],
            this.scale[2] * parentScale[2]
        );

        transformMat = mat4.mult(transformMat, translateMat);
        transformMat = mat4.mult(transformMat, rotateMat);
        transformMat = mat4.mult(transformMat, scaleMat);

        return transformMat;
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
                0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1,
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

    __degToRad(deg) {
        return deg * Math.PI / 180;
    }
}