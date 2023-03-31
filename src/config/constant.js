const shapeType = {
    CUBE: 'CUBE',
    PYRAMID: 'PYRAMID',
    DIAMOND: 'DIAMOND',
};

const projectionType = {
    ORTHOGRAPHIC: 'ORTHOGRAPHIC',
    OBLIQUE: 'OBLIQUE',
    PERSPECTIVE: 'PERSPECTIVE',
};

const shadingType = {
    LIGHT: 'LIGHT',
    FLAT: 'FLAT',
};

const defaultState = {
    shape: shapeType.CUBE,
    projection: projectionType.ORTHOGRAPHIC,
    color: "#000000",

    shading: shadingType.LIGHT,
    animation: false,

    transformation: {
        translation: {
            x: 0,
            y: 0,
            z: 0,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0,
        },
        scalation: {
            x: 1,
            y: 1,
            z: 1,
        },
    },
    camera: {
        radius: 0,
        rotation: 0,
    },
};

export { projectionType, shadingType, shapeType, defaultState };
