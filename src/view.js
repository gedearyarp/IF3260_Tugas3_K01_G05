import { projectionType, modelType, textureType } from "./config/constant.js";

function resetModelViewControl() {
    document.getElementById("translate-x-model").value = 0;
    document.getElementById("translate-y-model").value = 0;
    document.getElementById("translate-z-model").value = 0;

    document.getElementById("translate-x-model").nextElementSibling.value = 0;
    document.getElementById("translate-y-model").nextElementSibling.value = 0;
    document.getElementById("translate-z-model").nextElementSibling.value = 0;

    document.getElementById("rotate-x-model").value = 0;
    document.getElementById("rotate-y-model").value = 0;
    document.getElementById("rotate-z-model").value = 0;

    document.getElementById("rotate-x-model").nextElementSibling.value = 0;
    document.getElementById("rotate-y-model").nextElementSibling.value = 0;
    document.getElementById("rotate-z-model").nextElementSibling.value = 0;

    document.getElementById("scale-x-model").value = 1;
    document.getElementById("scale-y-model").value = 1;
    document.getElementById("scale-z-model").value = 1;

    document.getElementById("scale-x-model").nextElementSibling.value = 1;
    document.getElementById("scale-y-model").nextElementSibling.value = 1;
    document.getElementById("scale-z-model").nextElementSibling.value = 1;

    document.getElementById("camera-angle-model").value = 0;
    document.getElementById("camera-radius-model").value = 0;

    document.getElementById("camera-angle-model").nextElementSibling.value = 0;
    document.getElementById("camera-radius-model").nextElementSibling.value = 0;

    document.getElementById("shading-model").checked = true;
    document.getElementById("animation-model").checked = false;

    document.getElementById("orthographic-model").checked = true;
    document.getElementById("oblique-model").checked = false;
    document.getElementById("perspective-model").checked = false;

    resetComponentViewControl();
}

function resetComponentViewControl() {
    document.getElementById("translate-x-component").value = 0;
    document.getElementById("translate-y-component").value = 0;
    document.getElementById("translate-z-component").value = 0;

    document.getElementById("translate-x-component").nextElementSibling.value = 0;
    document.getElementById("translate-y-component").nextElementSibling.value = 0;
    document.getElementById("translate-z-component").nextElementSibling.value = 0;

    document.getElementById("rotate-x-component").value = 0;
    document.getElementById("rotate-y-component").value = 0;
    document.getElementById("rotate-z-component").value = 0;

    document.getElementById("rotate-x-component").nextElementSibling.value = 0;
    document.getElementById("rotate-y-component").nextElementSibling.value = 0;
    document.getElementById("rotate-z-component").nextElementSibling.value = 0;

    document.getElementById("scale-x-component").value = 1;
    document.getElementById("scale-y-component").value = 1;
    document.getElementById("scale-z-component").value = 1;

    document.getElementById("scale-x-component").nextElementSibling.value = 1;
    document.getElementById("scale-y-component").nextElementSibling.value = 1;
    document.getElementById("scale-z-component").nextElementSibling.value = 1;

    document.getElementById("camera-angle-component").value = 0;
    document.getElementById("camera-radius-component").value = 0;

    document.getElementById("camera-angle-component").nextElementSibling.value = 0;
    document.getElementById("camera-radius-component").nextElementSibling.value = 0;

    document.getElementById("shading-component").checked = true;

    document.getElementById("orthographic-component").checked = true;
    document.getElementById("oblique-component").checked = false;
    document.getElementById("perspective-component").checked = false;
}

function setComponentViewControl(data) {
    document.getElementById("translate-x-component").value = data.translate[0];
    document.getElementById("translate-y-component").value = data.translate[1];
    document.getElementById("translate-z-component").value = data.translate[2];

    document.getElementById("translate-x-component").nextElementSibling.value = data.translate[0];
    document.getElementById("translate-y-component").nextElementSibling.value = data.translate[1];
    document.getElementById("translate-z-component").nextElementSibling.value = data.translate[2];

    document.getElementById("rotate-x-component").value = data.rotate[0];
    document.getElementById("rotate-y-component").value = data.rotate[1];
    document.getElementById("rotate-z-component").value = data.rotate[2];

    document.getElementById("rotate-x-component").nextElementSibling.value = data.rotate[0];
    document.getElementById("rotate-y-component").nextElementSibling.value = data.rotate[1];
    document.getElementById("rotate-z-component").nextElementSibling.value = data.rotate[2];

    document.getElementById("scale-x-component").value = data.scale[0];
    document.getElementById("scale-y-component").value = data.scale[1];
    document.getElementById("scale-z-component").value = data.scale[2];

    document.getElementById("scale-x-component").nextElementSibling.value = data.scale[0];
    document.getElementById("scale-y-component").nextElementSibling.value = data.scale[1];
    document.getElementById("scale-z-component").nextElementSibling.value = data.scale[2];
}

function modelEventListener(controller) {
    document.getElementById("person").addEventListener("change", (event) => {
        controller.setModel().object(modelType.PERSON);

        const tree = document.getElementById("component-tree");
        tree.innerHTML = controller.getComponentTreeDisplay();

        const componentTreeButtons = document.querySelectorAll('[id^="component-part-"]');
        componentTreeButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                controller.setComponent().object(event.target.id.split("-")[2]);
            });
        });
    });

    document.getElementById("chicken").addEventListener("change", (event) => {
        controller.setModel().object(modelType.CHICKEN);

        const tree = document.getElementById("component-tree");
        tree.innerHTML = controller.getComponentTreeDisplay();

        const componentTreeButtons = document.querySelectorAll('[id^="component-part-"]');
        componentTreeButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                controller.setComponent().object(event.target.id.split("-")[2]);
            });
        });
    });

    document.getElementById("wolf").addEventListener("change", (event) => {
        controller.setModel().object(modelType.WOLF);

        const tree = document.getElementById("component-tree");
        tree.innerHTML = controller.getComponentTreeDisplay();

        const componentTreeButtons = document.querySelectorAll('[id^="component-part-"]');
        componentTreeButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                controller.setComponent().object(event.target.id.split("-")[2]);
            });
        });
    });

    document.getElementById("horse").addEventListener("change", (event) => {
        controller.setModel().object(modelType.HORSE);

        const tree = document.getElementById("component-tree");
        tree.innerHTML = controller.getComponentTreeDisplay();

        const componentTreeButtons = document.querySelectorAll('[id^="component-part-"]');
        componentTreeButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                controller.setComponent().object(event.target.id.split("-")[2]);
            });
        });
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

function resetEventListener(controller) {
    document.getElementById("reset-model-default").addEventListener("click", (event) => {
        controller.setModel().reset();
    });

    document.getElementById("reset-component-default").addEventListener("click", (event) => {
        controller.setComponent().reset();
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

    resetEventListener(controller);

    const tree = document.getElementById("component-tree");
    tree.innerHTML = controller.getComponentTreeDisplay();

    const componentTreeButtons = document.querySelectorAll('[id^="component-part-"]');
    componentTreeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            controller.setComponent().object(event.target.id.split("-")[2]);
        });
    });
}

export { 
    configureEventListener, 
    resetModelViewControl, 
    resetComponentViewControl, 
    setComponentViewControl 
};
