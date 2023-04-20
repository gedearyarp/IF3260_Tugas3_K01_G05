const modelType = {
    PERSON: 'PERSON',
    CHICKEN: 'CHICKEN',
    WOLF: 'WOLF',
    HORSE: 'HORSE',
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

const textureType = {
    COLOR: -1,
    BUMP: 0,
    REFLECTIVE: 1,
    IMAGE: 2,
}

const indicesCube = [
    0, 1, 2, 0, 2, 3,
    1, 5, 6, 1, 6, 2,
    7, 6, 5, 7, 5, 4,
    4, 0, 3, 4, 3, 7,
    4, 5, 1, 4, 1, 0,
    3, 2, 6, 3, 6, 7,
];


export { projectionType, shadingType, modelType, textureType, indicesCube };
