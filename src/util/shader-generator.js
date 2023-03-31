const vertCode3D = `
    attribute vec3 aPosition;
    attribute vec2 aTexcoord;
    attribute vec3 aNormal;

    uniform float fudgeFactor;
    uniform mat4 mTransform;
    uniform mat4 mProjection;

    varying float vColor;
    varying vec2 vTexcoord;

    void main(void) {
        vec4 transformedPos = mTransform * vec4(aPosition.xy, aPosition.z * -1.0, 1.0);
        vec4 projectedPos   = mProjection * transformedPos;

        vColor = min(max((1.0 - transformedPos.z) / 2.0, 0.0), 1.0);
        vTexcoord = aTexcoord;

        if (fudgeFactor < 0.5) gl_Position = projectedPos;
        else {
            float zDivider = 1.5 + projectedPos.z * fudgeFactor;
            gl_Position = vec4(projectedPos.xy / zDivider, projectedPos.zw);
        }
    }
`

const fragCode3D = {
    light: `
        precision mediump float;
        uniform vec3 uColor;
        uniform sampler2D uTexture;
        uniform bool uUseTexture;

        varying float vColor;
        varying vec2 vTexcoord;

        void main(void) {
            if (uUseTexture) gl_FragColor = texture2D(uTexture, vTexcoord);
            else gl_FragColor = vec4(uColor, 1.0);
        }
    `,
    flat: `
        precision mediump float;
        uniform vec3 uColor;

        void main(void) {
            gl_FragColor = vec4(uColor, 1.0);
        }
    `
}

function generateShaderProgram (gl, vertCode, fragCode) {
    let vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    let program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        console.log('Program tidak dapat digunakan');
        return;
    }

    return program;
}

export { generateShaderProgram, vertCode3D, fragCode3D };
