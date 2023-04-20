export class Texture {
    static __generateTexture(gl) {
        var textures = {
            bump: this.__getBumpTexture(gl),
            reflective: this.__getReflectiveTexture(gl),
            image: this.__getImageTexture(gl)
        }
        console.log(textures);
        return textures;
    }

    static __getBumpTexture(gl) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

        const image = new Image();
        image.src = './assets/bump.png';
        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

            if ((image.width & (image.width - 1)) === 0 && (image.height & (image.height - 1)) === 0) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        return texture;
    }

    static __getReflectiveTexture(gl) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

        const cubeFaces = [
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                url: './assets/pos-x.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                url: './assets/neg-x.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                url: './assets/pos-y.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                url: './assets/neg-y.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                url: './assets/pos-z.jpg',
            },
            {
                target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                url: './assets/neg-z.jpg',
            },
        ];

        cubeFaces.forEach((face) => {
            const { target, url } = face;
        
            const level = 0;
            const internalFormat = gl.RGBA;
            const width = 512;
            const height = 512;
            const border = 0;
            const srcFormat = gl.RGBA;
            const srcType = gl.UNSIGNED_BYTE;

            gl.texImage2D(target, level, internalFormat, width, height, border, srcFormat, srcType, null);

            const image = new Image();
            image.src = url;
            image.onload = function () {
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texImage2D(target, level, internalFormat, srcFormat, srcType, image);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            };
        });
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        return texture;
    }

    static __getImageTexture(gl) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

        const image = new Image();
        image.src = './assets/universe.png';
        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

            if ((image.width & (image.width - 1)) === 0 && (image.height & (image.height - 1)) === 0) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        return texture;
    }
}