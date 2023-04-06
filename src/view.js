import { projectionType, modelType, textureType } from "./config/constant.js";

function modelEventListener(renderer) {
    document.getElementById("person").addEventListener("change", (event) => {
        renderer.setModel().object(modelType.PERSON)
    });

    document.getElementById("dog").addEventListener("change", (event) => {
        renderer.setModel().object(modelType.DOG);
    });

    document.getElementById("table").addEventListener("change", (event) => {
        renderer.setModel().object(modelType.TABLE);
    });

    document.getElementById("car").addEventListener("change", (event) => {
        renderer.setModel().object(modelType.CAR);
    });
}

function projectionModelEventListener(renderer) {
    document.getElementById("orthographic-model").addEventListener("change", (event) => {
        renderer.setModel().projection(projectionType.ORTHOGRAPHIC);
    });

    document.getElementById("oblique-model").addEventListener("change", (event) => {
        renderer.setModel().projection(projectionType.OBLIQUE);
    });

    document.getElementById("perspective-model").addEventListener("change", (event) => {
        renderer.setModel().projection(projectionType.PERSPECTIVE);
    });
}

function textureModelEventListener(renderer) {
    document.getElementById("color-model").addEventListener("change", (event) => {
        renderer.setModel().texture(textureType.COLOR);
    });

    document.getElementById("bump-model").addEventListener("change", (event) => {
        renderer.setModel().texture(textureType.BUMP);
    });

    document.getElementById("reflective-model").addEventListener("change", (event) => {
        renderer.setModel().texture(textureType.REFLECTIVE);
    });

    document.getElementById("custom-model").addEventListener("change", (event) => {
        renderer.setModel().texture(textureType.IMAGE);
    });
}

function shadingModelEventListener(renderer) {
    document.getElementById("shading-model").addEventListener("change", (event) => {
        renderer.setModel().useShading(event.target.checked);
    });
}

function animationModelEventListener(renderer) {
    document.getElementById("animation-model").addEventListener("change", (event) => {
        renderer.setModel().animation(event.target.checked);
    });
}

function cameraAngleModelEventListener(renderer) {
    document.getElementById("camera-angle-model").addEventListener("input", (event) => {
        renderer.setModel().cameraAngle(event.target.value);
    });
}

function cameraRadiusModelEventListener(renderer) {
    document.getElementById("camera-radius-model").addEventListener("input", (event) => {
        renderer.setModel().cameraRadius(event.target.value);
    });
}



// ------------------------------
// function colorEventListener(state) {
//     document.getElementById("color-picker").addEventListener("input", (event) => {
//         state.color = event.target.value;
//     });
// }

// function shapeEventListener(state, glState) {
//     document.getElementById("cube").addEventListener("change", (event) => {
//         state.shape = shapeType.CUBE;
//         glState.vertices = cube.vertices;
//         glState.indices = cube.indices;
//     });

//     document.getElementById("pyramid").addEventListener("change", (event) => {
//         state.shape = shapeType.PYRAMID;
//         glState.vertices = pyramid.vertices;
//         glState.indices = pyramid.indices;
//         console.log(glState);
//     });

//     document.getElementById("diamond").addEventListener("change", (event) => {
//         state.shape = shapeType.DIAMOND;
//         glState.vertices = diamond.vertices;
//         glState.indices = diamond.indices;
//         console.log(glState);
//     });
// }

// function projectionEventListener(state) {
//     document.getElementById("orthographic").addEventListener("change", (event) => {
//         state.projection = projectionType.ORTHOGRAPHIC;
//     });

//     document.getElementById("oblique").addEventListener("change", (event) => {
//         state.projection = projectionType.OBLIQUE;
//     });

//     document.getElementById("perspective").addEventListener("change", (event) => {
//         state.projection = projectionType.PERSPECTIVE;
//     });
// }

// function translationEventListener(state) {
//     document.getElementById("translation-x").addEventListener("input", (event) => {
//         state.transformation.translation.x = event.target.value;
//     });

//     document.getElementById("translation-y").addEventListener("input", (event) => {
//         state.transformation.translation.y = event.target.value;
//     });

//     document.getElementById("translation-z").addEventListener("input", (event) => {
//         state.transformation.translation.z = event.target.value;
//     });
// }

// function rotationEventListener(state) {
//     document.getElementById("rotation-x").addEventListener("input", (event) => {
//         state.transformation.rotation.x = event.target.value;
//     });

//     document.getElementById("rotation-y").addEventListener("input", (event) => {
//         state.transformation.rotation.y = event.target.value;
//     });

//     document.getElementById("rotation-z").addEventListener("input", (event) => {
//         state.transformation.rotation.z = event.target.value;
//     });
// }

// function scalationEventListener(state) {
//     document.getElementById("scalation-x").addEventListener("input", (event) => {
//         state.transformation.scalation.x = event.target.value;
//     });

//     document.getElementById("scalation-y").addEventListener("input", (event) => {
//         state.transformation.scalation.y = event.target.value;
//     });

//     document.getElementById("scalation-z").addEventListener("input", (event) => {
//         state.transformation.scalation.z = event.target.value;
//     });
// }

// function cameraEventListener(state) {
//     document.getElementById("camera-radius").addEventListener("input", (event) => {
//         state.camera.radius = event.target.value;
//     });

//     document.getElementById("camera-rotation").addEventListener("input", (event) => {
//         state.camera.rotation = event.target.value;
//     });
// }

// function utilityEventListener(state) {
//     document.getElementById("shading").addEventListener("click", (event) => {
//         state.shading = event.target.checked ? shadingType.LIGHT : shadingType.FLAT;
//     });

//     document.getElementById("animation").addEventListener("change", (event) => {
//         state.animation = event.target.checked;
//     });
// }

// function resetEventListener(state, glState) {
//     document.getElementById("reset-default").addEventListener("click", (event) => {
//         setDefaultState(state);
//         updateUI(state);

//         document.getElementById("load-data").value = "";

//         glState.vertices = cube.vertices;
//         glState.indices = cube.indices;
//     });
// }

// function fileEventListener(state, glState) {
//     document.getElementById("save-data").addEventListener("click", (event) => {
//         save(state);
//     });

//     document.getElementById("load-data").addEventListener("change", (event) => {
//         load(state, glState, event);
//     });
// }

function configureEventListener(renderer) {
    modelEventListener(renderer);
    projectionModelEventListener(renderer);
    textureModelEventListener(renderer);
    shadingModelEventListener(renderer);
    animationModelEventListener(renderer);
    cameraAngleModelEventListener(renderer);
    cameraRadiusModelEventListener(renderer);
}

export { configureEventListener };
