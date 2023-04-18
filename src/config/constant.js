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


export { projectionType, shadingType, modelType, textureType };
