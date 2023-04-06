import { projectionType, modelType, textureType } from "./config/constant.js";

function modelEventListener(controller) {
    document.getElementById("person").addEventListener("change", (event) => {
        controller.setModel().object(modelType.PERSON)
    });

    document.getElementById("dog").addEventListener("change", (event) => {
        controller.setModel().object(modelType.DOG);
    });

    document.getElementById("table").addEventListener("change", (event) => {
        controller.setModel().object(modelType.TABLE);
    });

    document.getElementById("car").addEventListener("change", (event) => {
        controller.setModel().object(modelType.CAR);
    });
}

function projectionModelEventListener(controller) {
    document.getElementById("orthographic-model").addEventListener("change", (event) => {
        controller.setModel().projection(projectionType.ORTHOGRAPHIC);
    });

    document.getElementById("oblique-model").addEventListener("change", (event) => {
        controller.setModel().projection(projectionType.OBLIQUE);
    });

    document.getElementById("perspective-model").addEventListener("change", (event) => {
        controller.setModel().projection(projectionType.PERSPECTIVE);
    });
}

function textureModelEventListener(controller) {
    document.getElementById("color-model").addEventListener("change", (event) => {
        controller.setModel().texture(textureType.COLOR);
    });

    document.getElementById("bump-model").addEventListener("change", (event) => {
        controller.setModel().texture(textureType.BUMP);
    });

    document.getElementById("reflective-model").addEventListener("change", (event) => {
        controller.setModel().texture(textureType.REFLECTIVE);
    });

    document.getElementById("custom-model").addEventListener("change", (event) => {
        controller.setModel().texture(textureType.IMAGE);
    });
}

function shadingModelEventListener(controller) {
    document.getElementById("shading-model").addEventListener("change", (event) => {
        controller.setModel().useShading(event.target.checked);
    });
}

function animationModelEventListener(controller) {
    document.getElementById("animation-model").addEventListener("change", (event) => {
        controller.setModel().animation(event.target.checked);
    });
}

function cameraAngleModelEventListener(controller) {
    document.getElementById("camera-angle-model").addEventListener("input", (event) => {
        controller.setModel().cameraAngle(event.target.value);
    });
}

function cameraRadiusModelEventListener(controller) {
    document.getElementById("camera-radius-model").addEventListener("input", (event) => {
        controller.setModel().cameraRadius(event.target.value);
    });
}

function transformationModelEventListener(controller) {
    document.getElementById("translate-x-model").addEventListener("input", (event) => {
        controller.setModel().translate(0, event.target.value);
    });

    document.getElementById("translate-y-model").addEventListener("input", (event) => {
        controller.setModel().translate(1, event.target.value);
    });

    document.getElementById("translate-z-model").addEventListener("input", (event) => {
        controller.setModel().translate(2, event.target.value);
    });

    document.getElementById("rotate-x-model").addEventListener("input", (event) => {
        controller.setModel().rotate(0, event.target.value);
    });

    document.getElementById("rotate-y-model").addEventListener("input", (event) => {
        controller.setModel().rotate(1, event.target.value);
    });

    document.getElementById("rotate-z-model").addEventListener("input", (event) => {
        controller.setModel().rotate(2, event.target.value);
    });

    document.getElementById("scale-x-model").addEventListener("input", (event) => {
        controller.setModel().scale(0, event.target.value);
    });

    document.getElementById("scale-y-model").addEventListener("input", (event) => {
        controller.setModel().scale(1, event.target.value);
    });

    document.getElementById("scale-z-model").addEventListener("input", (event) => {
        controller.setModel().scale(2, event.target.value);
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

function projectionComponentEventListener(controller) {
    document.getElementById("orthographic-component").addEventListener("change", (event) => {
        controller.setComponent().projection(projectionType.ORTHOGRAPHIC);
    });

    document.getElementById("oblique-component").addEventListener("change", (event) => {
        controller.setComponent().projection(projectionType.OBLIQUE);
    });

    document.getElementById("perspective-component").addEventListener("change", (event) => {
        controller.setComponent().projection(projectionType.PERSPECTIVE);
    });
}

function textureComponentEventListener(controller) {
    document.getElementById("color-component").addEventListener("change", (event) => {
        controller.setComponent().texture(textureType.COLOR);
    });

    document.getElementById("bump-component").addEventListener("change", (event) => {
        controller.setComponent().texture(textureType.BUMP);
    });

    document.getElementById("reflective-component").addEventListener("change", (event) => {
        controller.setComponent().texture(textureType.REFLECTIVE);
    });

    document.getElementById("custom-component").addEventListener("change", (event) => {
        controller.setComponent().texture(textureType.IMAGE);
    });
}

function shadingComponentEventListener(controller) {
    document.getElementById("shading-component").addEventListener("change", (event) => {
        controller.setComponent().useShading(event.target.checked);
    });
}

function cameraAngleComponentEventListener(controller) {
    document.getElementById("camera-angle-component").addEventListener("input", (event) => {
        controller.setComponent().cameraAngle(event.target.value);
    });
}

function cameraRadiusComponentEventListener(controller) {
    document.getElementById("camera-radius-component").addEventListener("input", (event) => {
        controller.setComponent().cameraRadius(event.target.value);
    });
}

function transformationComponentEventListener(controller) {
    document.getElementById("translate-x-component").addEventListener("input", (event) => {
        controller.setComponent().translate(0, event.target.value);
    });

    document.getElementById("translate-y-component").addEventListener("input", (event) => {
        controller.setComponent().translate(1, event.target.value);
    });

    document.getElementById("translate-z-component").addEventListener("input", (event) => {
        controller.setComponent().translate(2, event.target.value);
    });

    document.getElementById("rotate-x-component").addEventListener("input", (event) => {
        controller.setComponent().rotate(0, event.target.value);
    });

    document.getElementById("rotate-y-component").addEventListener("input", (event) => {
        controller.setComponent().rotate(1, event.target.value);
    });

    document.getElementById("rotate-z-component").addEventListener("input", (event) => {
        controller.setComponent().rotate(2, event.target.value);
    });

    document.getElementById("scale-x-component").addEventListener("input", (event) => {
        controller.setComponent().scale(0, event.target.value);
    });

    document.getElementById("scale-y-component").addEventListener("input", (event) => {
        controller.setComponent().scale(1, event.target.value);
    });

    document.getElementById("scale-z-component").addEventListener("input", (event) => {
        controller.setComponent().scale(2, event.target.value);
    });
}

function configureEventListener(controller) {
    modelEventListener(controller);
    projectionModelEventListener(controller);
    textureModelEventListener(controller);
    shadingModelEventListener(controller);
    animationModelEventListener(controller);
    cameraAngleModelEventListener(controller);
    cameraRadiusModelEventListener(controller);
    transformationModelEventListener(controller);

    projectionComponentEventListener(controller);
    textureComponentEventListener(controller);
    shadingComponentEventListener(controller);
    cameraAngleComponentEventListener(controller);
    cameraRadiusComponentEventListener(controller);
    transformationComponentEventListener(controller);
}

export { configureEventListener };
