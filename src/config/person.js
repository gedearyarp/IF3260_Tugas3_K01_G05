import { ArticulatedObject } from "../object/articulated-object.js";

class PersonModel {
    static get(gl, program) {
        const body = PersonModel.__generateBody(gl, program);
        const head = PersonModel.__generateHead(gl, program);

        body.addChild(head);

        return body;
    }

    static __generateBody(gl, program) {
        const vertices = [
            1.0, 1.0, 1.0,
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0,
            -1.0, 1.0, -1.0,
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            0, 1, 5, 0, 5, 4,
            3, 2, 6, 3, 6, 7,
            0, 3, 7, 0, 7, 4,
            1, 2, 6, 1, 6, 5
        ];

        return new ArticulatedObject(gl, program, "body", vertices, indices);
    }
    
    static __generateHead(gl, program) {
        const vertices = [
            1.0, 1.0, 1.0,
            1.0, 1.0, -1.0,
            1.0, 0.0, -1.0,
            1.0, 0.0, 1.0,
            -1.0, 1.0, 1.0,
            -1.0, 1.0, -1.0,
            -1.0, 0.0, -1.0,
            -1.0, 0.0, 1.0
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            0, 1, 5, 0, 5, 4,
            3, 2, 6, 3, 6, 7,
            0, 3, 7, 0, 7, 4,
            1, 2, 6, 1, 6, 5
        ];

        return new ArticulatedObject(gl, program, "head", vertices, indices);
    }
}

export { PersonModel };