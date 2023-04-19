// reference: https://webglfundamentals.org/webgl/lessons/webgl-environment-maps.html
// reference: https://webglfundamentals.org/webgl/lessons/webgl-cube-maps.html
// reference: https://apoorvaj.io/exploring-bump-mapping-with-webgl/#normal-mapping

const vertCode3D = `
    attribute vec4 aPosition;

    uniform mat4 uTransform;
    uniform mat4 uProjection;
    uniform float uFudgeFactor;

    varying float vColor;

    mat3 transpose(in mat3 inMatrix) {
        vec3 i0 = inMatrix[0];
        vec3 i1 = inMatrix[1];
        vec3 i2 = inMatrix[2];
        mat3 outMatrix = mat3(
            vec3(i0.x, i1.x, i2.x),
            vec3(i0.y, i1.y, i2.y),
            vec3(i0.z, i1.z, i2.z)
        );
        return outMatrix;
    }

    void main(void) {
        vec4 transformedPos = uTransform * aPosition;
        vec4 projectedPos = uProjection * transformedPos;

        vColor = (min(max((1.0 - transformedPos.z) / 2.0, 0.0), 1.0)) * 2.0;

        if (uFudgeFactor > 0.0) {
            float zToDivideBy = 1.0 + projectedPos.z * uFudgeFactor;
            gl_Position = vec4(projectedPos.xyz, zToDivideBy);
        } else {
            gl_Position = projectedPos;
        }
    }
`

const fragCode3D = `
    precision mediump float;

    uniform vec3 uColor;
    uniform bool uUseShading;
    uniform int uTextureType;

    varying float vColor;

    void main() {
        gl_FragColor = vec4(uColor, 1.0);

        if (uUseShading) {
            gl_FragColor.rgb *= vColor;
        }
    }
`


function generateShaderProgram (gl) {
    let vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode3D);
    gl.compileShader(vertShader);

    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode3D);
    gl.compileShader(fragShader);

    let program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        throw new Error("Could not compile WebGL program. " + gl.getProgramInfoLog(program));
    }

    return program;
}

export { generateShaderProgram };
