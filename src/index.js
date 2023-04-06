import { generateShaderProgram } from "./util/shader-generator.js";
import { configureEventListener } from "./view.js";
import { Controller } from "./util/controller.js";

function main() {
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

    const controller = new Controller(modelGl, modelProgram, componentGl, componentProgram);

    configureEventListener(controller);

    requestAnimationFrame(controller.render.bind(controller));}

main();
