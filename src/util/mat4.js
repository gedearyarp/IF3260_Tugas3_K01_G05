import { vec3 } from "./vec3.js";

export const mat4 = {
    identityMatrix: function () {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    },

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

    lookAt: function (eye, center, up) {
        let z = vec3.normalize(vec3.sub(eye, center));
        let x = vec3.normalize(vec3.cross(up, z));
        let y = vec3.cross(z, x);

        return [
            x[0], x[1], x[2], 0,
            y[0], y[1], y[2], 0,
            z[0], z[1], z[2], 0,
            eye[0], eye[1], eye[2], 1
        ];
    },

    orthographic: function (left, right, bottom, top, near, far) {
        return [
            2 / (right - left), 0, 0, 0,
            0, 2 / (top - bottom), 0, 0,
            0, 0, 2 / (near - far), 0,
            (left + right) / (left - right), (bottom + top) / (bottom - top), (near + far) / (near - far), 1
        ];
    },

    perspective: function (fovy, aspect, near, far) {
        let f = 1 / Math.tan(fovy / 2);
        let nf = 1 / (near - far);

        return [
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) * nf, -1,
            0, 0, (2 * far * near) * nf, 0
        ];
    },

    oblique: function (a, b) {
        const cot = 1 / Math.tan(a);
        const cot2 = 1 / Math.tan(b);

        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            cot, cot2, 1, 0,
            0, 0, 0, 1
        ];
    },

    transpose: function (a) {
        return [
            a[0], a[4], a[8], a[12],
            a[1], a[5], a[9], a[13],
            a[2], a[6], a[10], a[14],
            a[3], a[7], a[11], a[15]
        ];
    }
};