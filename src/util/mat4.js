import { projectionType } from "../config/constant.js";

export const mat4 = {
    scalationMatrix: function (x, y, z) {
        return [
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ];
    },

    translationMatrix: function (x, y, z) {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ];
    },

    rotationMatrix: function (x, y, z) {
        const rotationX = [
            1, 0, 0, 0,
            0, Math.cos(x), Math.sin(x), 0,
            0, -Math.sin(x), Math.cos(x), 0,
            0, 0, 0, 1
        ];

        const rotationY = [
            Math.cos(y), 0, -Math.sin(y), 0,
            0, 1, 0, 0,
            Math.sin(y), 0, Math.cos(y), 0,
            0, 0, 0, 1
        ];

        const rotationZ = [
            Math.cos(z), Math.sin(z), 0, 0,
            -Math.sin(z), Math.cos(z), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        return this.mult(this.mult(rotationX, rotationY), rotationZ);
    },

    projectionMatrix: function (type) {
        switch (type) {
            case projectionType.ORTHOGRAPHIC:
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ];
            case projectionType.OBLIQUE:
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    Math.cos(64/180*Math.PI)/2, Math.cos(64/180*Math.PI)/2, 1, 0,
                    0, 0, 0, 1
                ];
            case projectionType.PERSPECTIVE:
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ];
        }
    },

    mult: function (a, b) {
        let result = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[i * 4 + j] = 0;
                for (let k = 0; k < 4; k++) {
                    result[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
                }
            }
        }

        return result;
    },

    inverse: function (a) {
        let result = [];
        let temp = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[i * 4 + j] = a[i * 4 + j];
                temp[i * 4 + j] = 0;
            }
            temp[i * 4 + i] = 1;
        }

        for (let i = 0; i < 4; i++) {
            let max = Math.abs(result[i * 4 + i]);
            let maxRow = i;
            for (let j = i + 1; j < 4; j++) {
                if (Math.abs(result[j * 4 + i]) > max) {
                    max = Math.abs(result[j * 4 + i]);
                    maxRow = j;
                }
            }

            if (maxRow != i) {
                for (let j = 0; j < 4; j++) {
                    let temp1 = result[i * 4 + j];
                    result[i * 4 + j] = result[maxRow * 4 + j];
                    result[maxRow * 4 + j] = temp1;

                    temp1 = temp[i * 4 + j];
                    temp[i * 4 + j] = temp[maxRow * 4 + j];
                    temp[maxRow * 4 + j] = temp1;
                }
            }

            for (let j = 0; j < 4; j++) {
                let temp1 = result[i * 4 + j] / result[i * 4 + i];
                result[i * 4 + j] = temp1;
                temp[i * 4 + j] = temp[i * 4 + j] / temp[i * 4 + i];
            }

            for (let j = 0; j < 4; j++) {
                if (j != i) {
                    for (let k = 0; k < 4; k++) {
                        let temp1 = result[j * 4 + i];
                        result[j * 4 + k] -= result[i * 4 + k] * temp1;
                        temp[j * 4 + k] -= temp[i * 4 + k] * temp1;
                    }
                }
            }
        }

        return temp;
    },
};