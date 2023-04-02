const shapeType = {
    PERSON: 'PERSON',
    DOG: 'DOG',
    TABLE: 'TABLE',
    CAR: 'CAR',
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


export { projectionType, shadingType, shapeType, textureType };
