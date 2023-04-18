// reference: https://webglfundamentals.org/webgl/lessons/webgl-environment-maps.html
// reference: https://webglfundamentals.org/webgl/lessons/webgl-cube-maps.html
// reference: https://apoorvaj.io/exploring-bump-mapping-with-webgl/#normal-mapping

const vertCode3D = `
    attribute vec4 aPosition;
    attribute vec3 aNormal;
    attribute vec3 aTangent;
    attribute vec3 aBitangent;
    attribute vec2 aTextureCoord;

    uniform mat4 uTransform;    // model
    uniform mat4 uProjection;   // projection(model) * cameraview
    uniform mat4 uCameraView;         // cameraview
    uniform float uFudgeFactor;
    uniform mat4 uNormal;

    varying float color;
    varying vec3 vTransformPosition;
    varying vec3 vViewTransformPosition;
    varying vec3 vNormal;
    varying vec2 vTextureCoord;
    varying mat3 vTBN;

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
        vec4 projectedPos = uProjection * uCameraView * transformedPos;

        color = min(max((1.0 - transformedPos.z) / 2.0, 0.0), 1.0);

        if (uFudgeFactor > 0.0) {
            float zToDivideBy = 1.0 + projectedPos.z * uFudgeFactor;
            gl_Position = vec4(projectedPos.xyz, zToDivideBy);
        } else {
            gl_Position = projectedPos;
        }

        vTransformPosition = transformedPos.xyz;
        vViewTransformPosition = (uCameraView * transformedPos).xyz;

        vNormal = mat3(uTransform) * aNormal;

        vTextureCoord = aTextureCoord;

        vTBN = transpose(mat3(normalize(mat3(uNormal) * aTangent), normalize(mat3(uNormal) * aBitangent), normalize(mat3(uNormal) * aNormal)));
    }
`

const fragCode3D = `
    precision mediump float;

    uniform vec3 uColor;
    uniform vec3 uCameraPosition;
    uniform vec3 uReverseLightDirection;
    uniform bool uUseShading;
    uniform int uTextureType;
    uniform sampler2D uTextureBump;
    uniform samplerCube uTextureReflective;
    uniform sampler2D uTextureImage;

    varying float color;
    varying vec3 vTransformPosition;
    varying vec3 vViewTransformPosition;
    varying vec3 vNormal;
    varying vec2 vTextureCoord;
    varying mat3 vTBN;

    void main() {
        vec3 normal = normalize(vNormal);

        gl_FragColor = vec4(uColor, 1.0);

        // Bump
        if (uTextureType == 0) {
            vec3 lightDirection = normalize(vTBN * vViewTransformPosition - vTBN * uReverseLightDirection);
            vec3 albedo = texture2D(uTextureBump, vTextureCoord).rgb;
            vec3 ambientLight = 0.3 * albedo;
            vec3 tangentNormal = normalize(texture2D(uTextureBump, vTextureCoord).rgb * 2.0 - 1.0);
            float diffuse = max(dot(lightDirection, tangentNormal), 0.0);
            gl_FragColor = vec4(ambientLight + diffuse * albedo, 1.0);
        } 

        // Reflective
        else if (uTextureType == 1) {
            vec3 eyeDirection = normalize(vTransformPosition - uCameraPosition);
            vec3 reflectedDirection = reflect(eyeDirection, normal);
            gl_FragColor = textureCube(uTextureReflective, reflectedDirection);
        }
        
        // Image
        else if (uTextureType == 2) {
            gl_FragColor = texture2D(uTextureImage, vTextureCoord);
        }

        if (uUseShading) {
            gl_FragColor.rgb *= color;
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
