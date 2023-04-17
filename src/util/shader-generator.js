// reference: https://webglfundamentals.org/webgl/lessons/webgl-environment-maps.html
// reference: https://webglfundamentals.org/webgl/lessons/webgl-cube-maps.html
// reference: https://apoorvaj.io/exploring-bump-mapping-with-webgl/#normal-mapping

const vertCode3D = `
    attribute vec3 aPosition;

    uniform mat4 uTransform;
    uniform mat4 uProjection;
    uniform mat4 uView;
    uniform mat4 uNormal;

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
        gl_Position = uProjection * (uView * uTransform) * vec4(aPosition.xyz, 1.0) ;
    }
`

const fragCode3D = `
    precision mediump float;
    uniform vec3 uColor;

    uniform bool uUseShading;
    uniform int uTextureType;

    void main() {
        gl_FragColor = vec4(uColor, 1.0);

        if (uTextureType == 0) {

        } else if (uTextureType == 1) {

        } else if (uTextureType == 2) {
            
        }

        if (uUseShading) {
            gl_FragColor = vec4(gl_FragColor.rgb * 0.5, 1.0);
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
