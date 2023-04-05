export const vec3 = {
    cross: function (a, b) {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
        ];
    },

    sub: function (a, b) {
        return [
            a[0] - b[0],
            a[1] - b[1],
            a[2] - b[2]
        ];
    },

    normalize: function (a) {
        let length = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);

        if (length === 0) return [0, 0, 0];
        return [
            a[0] / length,
            a[1] / length,
            a[2] / length
        ];
    }
}