// reference: https://webglfundamentals.org/webgl/lessons/webgl-environment-maps.html
// reference: https://webglfundamentals.org/webgl/lessons/webgl-cube-maps.html
// reference: https://apoorvaj.io/exploring-bump-mapping-with-webgl/#normal-mapping

const vertCode3D = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec3 aColor;
    attribute vec3 aTangent;
    attribute vec3 aBitangent;
    attribute vec2 aTexCoord;

    uniform mat4 uProjection;
    uniform mat4 uView;
    uniform mat4 uWorld;
    uniform mat4 uNormal;

    varying vec3 vWorldPosition;
    varying vec3 vWorldNormal;
    varying vec3 vColor;
    varying vec2 vTexCoord;

    varying vec3 vTsLightPos;
    varying vec3 vTsFragPos;

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

    void main() {
        gl_Position = uProjection * uView * uWorld * vec4(aPosition, 1.0);
        vWorldPosition = (uWorld * vec4(aPosition, 1.0)).xyz;
        vWorldNormal = mat3(uWorld) * aNormal;

        vColor = aColor;
        vTexCoord = aTexCoord;

        vTsFragPos = (uWorld * vec4(aPosition, 1.0)).xyz;
        vec3 t = normalize((uNormal * vec4(aTangent, 0.0)).xyz);
        vec3 b = normalize((uNormal * vec4(aBitangent, 0.0)).xyz);
        vec3 n = normalize((uNormal * vec4(cross(aTangent, aBitangent), 0.0)).xyz);

        mat3 tbn = transpose(mat3(t, b, n));
        vTsLightPos = tbn * vec3(0.0, 0.0, 1.0);
        vTsFragPos = tbn * vTsFragPos;
    }
`

const fragCode3D = `
    precision highp float;

    varying vec3 vWorldPosition;
    varying vec3 vWorldNormal;
    varying vec3 vColor;
    varying vec2 vTexCoord;

    varying vec3 vTsLightPos;
    varying vec3 vTsFragPos;

    uniform sampler2D uTextureBump;
    uniform samplerCube uTextureReflective;
    uniform samplerCube uTextureImage;

    uniform vec3 uWorldCameraPosition;
    uniform bool uUseShading;
    uniform int uTextureType;

    void main() {
        vec3 worldNormal = normalize(vWorldNormal);

        gl_FragColor = vec4(vColor, 1.0);

        if (uTextureType == 0) { // bump
            vec3 lightDirection = normalize(vTsLightPos - vTsFragPos);
            vec3 albedo = texture2D(uTextureBump, vTexCoord).rgb;
            vec3 ambient = 0.3 * albedo;

            vec3 norm = normalize(texture2D(uTextureBump, vTexCoord).rgb * 2.0 - 1.0);
            float diffuse = max(dot(lightDirection, norm), 0.0);

            gl_FragColor = vec4(ambient + diffuse * albedo, 1.0);
        } else if (uTextureType == 1) { // reflective
            vec3 worldCameraToVertex = normalize(vWorldPosition - uWorldCameraPosition);
            vec3 reflectVector = reflect(worldCameraToVertex, worldNormal);

            vec4 color = textureCube(uTextureReflective, reflectVector);
            gl_FragColor = color;
        } else if (uTextureType == 2) { // cube map
            gl_FragColor = texture2D(uTextureImage, vTexCoord);
        }

        if (uUseShading) {
            vec3 lightDirection = normalize(vec3(0.0, 0.0, 1.0));
            float light = max(dot(worldNormal, lightDirection), 0.0);
            gl_FragColor = vec4(gl_FragColor.rgb * light, gl_FragColor.a);
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

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        throw new Error("Could not compile WebGL program. " + gl.getProgramInfoLog(program));
    }

    return program;
}

export { generateShaderProgram };
