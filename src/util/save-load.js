import { updateUI } from "../view.js";
import { shapeType } from "../config/constant.js";
import { cube, pyramid, diamond } from "../config/person.js";

function loadShape(state, glState) {
    switch (state.shape) {
        case shapeType.CUBE:
            glState.vertices = cube.vertices;
            glState.indices = cube.indices;
            break;
        case shapeType.PYRAMID:
            glState.vertices = pyramid.vertices;
            glState.indices = pyramid.indices;
            break;
        case shapeType.DIAMOND:
            glState.vertices = diamond.vertices;
            glState.indices = diamond.indices;
            break;
    }
}

function save(state) {
    let data = JSON.stringify(state);
    let blob = new Blob([data], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    
    a.href = url;
    a.download = "drawing.json";
    a.click();
}

function load(state, glState, event) {
    let file = event.target.files[0];
    if (!file) {
        console.log("No file selected.");
    }

    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
        let data = JSON.parse(event.target.result);

        state.shape = data.shape;
        state.projection = data.projection;
        state.color = data.color;
        state.shading = data.shading;
        state.animation = data.animation;
        state.camera = data.camera;

        loadShape(state, glState);
        updateUI(state);
    };
}

export { save, load };