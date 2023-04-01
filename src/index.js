import { vertCode3D, fragCode3D, generateShaderProgram } from "./util/shader-generator.js";
import { projectionType, shadingType, shapeType, defaultState } from "./config/constant.js";
import { configureEventListener, updateUI } from "./event-listener.js";
import { mat4 } from "./util/mat4.js";

let gl, canvas;
let state, glState;
let lightProgram, flatProgram;
let vertexBuffer, indexBuffer;

function generateState() {
    state = {
        shape: defaultState.shape,
        projection: defaultState.projection,

        transformation: {
            translation: {
                x: defaultState.transformation.translation.x,
                y: defaultState.transformation.translation.y,
                z: defaultState.transformation.translation.z,
            },
            rotation: {
                x: defaultState.transformation.rotation.x,
                y: defaultState.transformation.rotation.y,
                z: defaultState.transformation.rotation.z,
            },
            scalation: {
                x: defaultState.transformation.scalation.x,
                y: defaultState.transformation.scalation.y,
                z: defaultState.transformation.scalation.z,
            },
        },
        camera: {
            radius: defaultState.camera.radius,
            rotation: defaultState.camera.rotation,
        },
    };

    glState = {
        vertices: cube.vertices,
        indices: cube.indices,
    };
}

function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return [r / 255, g / 255, b / 255];
}

function calculateTransformMatrix() {
    const translationMatrix = mat4.translationMatrix(
        state.transformation.translation.x / 100, 
        state.transformation.translation.y / 100, 
        state.transformation.translation.z / 100
    );

    const rotationMatrix = mat4.rotationMatrix(
        state.transformation.rotation.x * Math.PI / 180,
        state.transformation.rotation.y * Math.PI / 180,
        state.transformation.rotation.z * Math.PI / 180
    );

    const scalationMatrix = mat4.scalationMatrix(
        state.transformation.scalation.x,
        state.transformation.scalation.y,
        state.transformation.scalation.z
    );

    return mat4.mult(translationMatrix, mat4.mult(rotationMatrix, scalationMatrix));
}

function calculateProjectionMatrix() {
    const projectionMatrix = mat4.projectionMatrix(state.projection);
    const rotationMatrix = mat4.rotationMatrix(0, state.camera.rotation * Math.PI / 180, 0);
    const translationMatrix = mat4.translationMatrix(0, 0, state.camera.radius);

    return mat4.mult(projectionMatrix, mat4.mult(rotationMatrix, translationMatrix));
}

function playAnimation() {
    state.transformation.rotation.x += 1;
    if (state.transformation.rotation.x > 360) state.transformation.rotation.x = 0;
    state.transformation.rotation.y += 1;
    if (state.transformation.rotation.y > 360) state.transformation.rotation.y = 0;
    state.transformation.rotation.z += 1;
    if (state.transformation.rotation.z > 360) state.transformation.rotation.z = 0;

    updateUI(state);
}

function drawObject() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(program);

    vertexBuffer = gl.createBuffer();
    indexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    const rgbColor = hexToRgb(state.color);
    gl.uniform3f(colorLoc, rgbColor[0], rgbColor[1], rgbColor[2]);
    gl.uniform1f(fudgeFactorLoc, state.projection === projectionType.PERSPECTIVE ? Math.PI/3 : 0);
    gl.uniformMatrix4fv(transformLoc, false, transformationMatrix);
    gl.uniformMatrix4fv(projectionLoc, false, projectionMatrix);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(glState.vertices), gl.STATIC_DRAW);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(glState.indices), gl.STATIC_DRAW);

    gl.drawElements(gl.TRIANGLES, glState.indices.length, gl.UNSIGNED_SHORT, 0);
}

function drawArticulatedObject() {
    drawObject
}

function render() {
    if (state.animation) playAnimation();

    const transformationMatrix = calculateTransformMatrix();
    const projectionMatrix = calculateProjectionMatrix();

    let program = state.shading === shadingType.LIGHT ? lightProgram : flatProgram;
    let positionLoc = gl.getAttribLocation(program, "aPosition");
    let colorLoc = gl.getUniformLocation(program, "Color");
    let transformLoc = gl.getUniformLocation(program, "mTransform");
    let projectionLoc = gl.getUniformLocation(program, "mProjection");
    let fudgeFactorLoc = gl.getUniformLocation(program, "fudgeFactor");

    

    requestAnimationFrame(render);
}

function main() {
    generateState();
    configureEventListener(state, glState);

    canvas = document.getElementById("my-canvas");
    gl = canvas.getContext("webgl");

    if (!gl) {
        alert("WebGL tidak tersedia di browser ini.");
        return;
    }

    lightProgram = generateShaderProgram(gl, vertCode3D, fragCode3D.light);
    flatProgram = generateShaderProgram(gl, vertCode3D, fragCode3D.flat); 

    requestAnimationFrame(render);
}

window.onload = main();
