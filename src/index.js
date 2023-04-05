import { generateShaderProgram } from "./util/shader-generator.js";
// import { configureEventListener } from "./event-listener.js";
import { GLRenderer } from "./util/gl-renderer.js";

function main() {
    // configureEventListener(state, glState);

    const modelCanvas = document.getElementById("model-canvas");
    const componentCanvas = document.getElementById("component-canvas");

    const modelGl = modelCanvas.getContext("webgl");
    const componentGl = componentCanvas.getContext("webgl");

    if (!modelGl || !componentGl) {
        alert("WebGL tidak tersedia di browser ini.");
        return;
    }

    const modelProgram = generateShaderProgram(modelGl);
    const componentProgram = generateShaderProgram(componentGl);

    const modelRenderer = new GLRenderer(modelGl, modelProgram);
    const componentRenderer = new GLRenderer(componentGl, componentProgram);

    requestAnimationFrame(modelRenderer.render.bind(modelRenderer));
    requestAnimationFrame(componentRenderer.render.bind(componentRenderer));
}

main();
