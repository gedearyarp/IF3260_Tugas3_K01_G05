import { shadingType, projectionType, shapeType, defaultState } from "./config/constant.js";
import { cube, pyramid, diamond } from "./config/person.js";
import { save, load } from "./util/save-load.js";

function setDefaultState(state) {
    state.shape = defaultState.shape;
    state.projection = defaultState.projection;
    state.color = defaultState.color;

    state.shading = defaultState.shading;
    state.animation = defaultState.animation;

    state.transformation.translation.x = defaultState.transformation.translation.x;
    state.transformation.translation.y = defaultState.transformation.translation.y;
    state.transformation.translation.z = defaultState.transformation.translation.z;

    state.transformation.rotation.x = defaultState.transformation.rotation.x;
    state.transformation.rotation.y = defaultState.transformation.rotation.y;
    state.transformation.rotation.z = defaultState.transformation.rotation.z;

    state.transformation.scalation.x = defaultState.transformation.scalation.x;
    state.transformation.scalation.y = defaultState.transformation.scalation.y;
    state.transformation.scalation.z = defaultState.transformation.scalation.z;

    state.camera.radius = defaultState.camera.radius;
    state.camera.rotation = defaultState.camera.rotation;
}

function updateUI(state) {
    document.getElementById("color-picker").value = state.color;

    document.getElementById("cube").checked = state.shape === shapeType.CUBE;
    document.getElementById("pyramid").checked = state.shape === shapeType.PYRAMID;
    document.getElementById("diamond").checked = state.shape === shapeType.DIAMOND;

    document.getElementById("orthographic").checked = state.projection === projectionType.ORTHOGRAPHIC;
    document.getElementById("oblique").checked = state.projection === projectionType.OBLIQUE;
    document.getElementById("perspective").checked = state.projection === projectionType.PERSPECTIVE;

    document.getElementById("translation-x").value = state.transformation.translation.x;
    document.getElementById("translation-y").value = state.transformation.translation.y;
    document.getElementById("translation-z").value = state.transformation.translation.z;

    document.getElementById("translation-x").nextElementSibling.value = state.transformation.translation.x;
    document.getElementById("translation-y").nextElementSibling.value = state.transformation.translation.y;
    document.getElementById("translation-z").nextElementSibling.value = state.transformation.translation.z;

    document.getElementById("rotation-x").value = state.transformation.rotation.x;
    document.getElementById("rotation-y").value = state.transformation.rotation.y;
    document.getElementById("rotation-z").value = state.transformation.rotation.z;

    document.getElementById("rotation-x").nextElementSibling.value = state.transformation.rotation.x;
    document.getElementById("rotation-y").nextElementSibling.value = state.transformation.rotation.y;
    document.getElementById("rotation-z").nextElementSibling.value = state.transformation.rotation.z;

    document.getElementById("scalation-x").value = state.transformation.scalation.x;
    document.getElementById("scalation-y").value = state.transformation.scalation.y;
    document.getElementById("scalation-z").value = state.transformation.scalation.z;

    document.getElementById("scalation-x").nextElementSibling.value = state.transformation.scalation.x;
    document.getElementById("scalation-y").nextElementSibling.value = state.transformation.scalation.y;
    document.getElementById("scalation-z").nextElementSibling.value = state.transformation.scalation.z;

    document.getElementById("camera-radius").value = state.camera.radius;
    document.getElementById("camera-rotation").value = state.camera.rotation;

    document.getElementById("camera-radius").nextElementSibling.value = state.camera.radius;
    document.getElementById("camera-rotation").nextElementSibling.value = state.camera.rotation;

    document.getElementById("shading").checked = state.shading === shadingType.LIGHT;
    document.getElementById("animation").checked = state.animation;
}  

function colorEventListener(state) {
    document.getElementById("color-picker").addEventListener("input", (event) => {
        state.color = event.target.value;
    });
}

function shapeEventListener(state, glState) {
    document.getElementById("cube").addEventListener("change", (event) => {
        state.shape = shapeType.CUBE;
        glState.vertices = cube.vertices;
        glState.indices = cube.indices;
    });

    document.getElementById("pyramid").addEventListener("change", (event) => {
        state.shape = shapeType.PYRAMID;
        glState.vertices = pyramid.vertices;
        glState.indices = pyramid.indices;
        console.log(glState);
    });

    document.getElementById("diamond").addEventListener("change", (event) => {
        state.shape = shapeType.DIAMOND;
        glState.vertices = diamond.vertices;
        glState.indices = diamond.indices;
        console.log(glState);
    });
}

function projectionEventListener(state) {
    document.getElementById("orthographic").addEventListener("change", (event) => {
        state.projection = projectionType.ORTHOGRAPHIC;
    });

    document.getElementById("oblique").addEventListener("change", (event) => {
        state.projection = projectionType.OBLIQUE;
    });

    document.getElementById("perspective").addEventListener("change", (event) => {
        state.projection = projectionType.PERSPECTIVE;
    });
}

function translationEventListener(state) {
    document.getElementById("translation-x").addEventListener("input", (event) => {
        state.transformation.translation.x = event.target.value;
    });

    document.getElementById("translation-y").addEventListener("input", (event) => {
        state.transformation.translation.y = event.target.value;
    });

    document.getElementById("translation-z").addEventListener("input", (event) => {
        state.transformation.translation.z = event.target.value;
    });
}

function rotationEventListener(state) {
    document.getElementById("rotation-x").addEventListener("input", (event) => {
        state.transformation.rotation.x = event.target.value;
    });

    document.getElementById("rotation-y").addEventListener("input", (event) => {
        state.transformation.rotation.y = event.target.value;
    });

    document.getElementById("rotation-z").addEventListener("input", (event) => {
        state.transformation.rotation.z = event.target.value;
    });
}

function scalationEventListener(state) {
    document.getElementById("scalation-x").addEventListener("input", (event) => {
        state.transformation.scalation.x = event.target.value;
    });

    document.getElementById("scalation-y").addEventListener("input", (event) => {
        state.transformation.scalation.y = event.target.value;
    });

    document.getElementById("scalation-z").addEventListener("input", (event) => {
        state.transformation.scalation.z = event.target.value;
    });
}

function cameraEventListener(state) {
    document.getElementById("camera-radius").addEventListener("input", (event) => {
        state.camera.radius = event.target.value;
    });

    document.getElementById("camera-rotation").addEventListener("input", (event) => {
        state.camera.rotation = event.target.value;
    });
}

function utilityEventListener(state) {
    document.getElementById("shading").addEventListener("click", (event) => {
        state.shading = event.target.checked ? shadingType.LIGHT : shadingType.FLAT;
    });

    document.getElementById("animation").addEventListener("change", (event) => {
        state.animation = event.target.checked;
    });
}

function resetEventListener(state, glState) {
    document.getElementById("reset-default").addEventListener("click", (event) => {
        setDefaultState(state);
        updateUI(state);

        document.getElementById("load-data").value = "";

        glState.vertices = cube.vertices;
        glState.indices = cube.indices;
    });
}

function fileEventListener(state, glState) {
    document.getElementById("save-data").addEventListener("click", (event) => {
        save(state);
    });

    document.getElementById("load-data").addEventListener("change", (event) => {
        load(state, glState, event);
    });
}

function configureEventListener(state, glState) {
    colorEventListener(state);
    shapeEventListener(state, glState);
    projectionEventListener(state);

    translationEventListener(state);
    rotationEventListener(state);
    scalationEventListener(state);

    utilityEventListener(state);
    cameraEventListener(state);

    resetEventListener(state, glState);
    fileEventListener(state, glState);
}

export { configureEventListener, updateUI };
