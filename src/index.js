import { generateShaderProgram } from "./util/shader-generator.js";
import { configureEventListener, updateUI } from "./event-listener.js";

function render() {

    requestAnimationFrame(render);
}

function main() {
    configureEventListener(state, glState);

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
    requestAnimationFrame(render);
}

main();
