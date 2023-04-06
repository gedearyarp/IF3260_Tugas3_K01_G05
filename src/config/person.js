import { ArticulatedObject } from "../object/articulated-object.js";

class PersonModel {
    static getComponents() {
        return {
            BODY: "body",
            HEAD: "head",
        }
    }

    static getModel() {
        const body = PersonModel.__generateBody();
        const head = PersonModel.__generateHead();

        body.addChild(head);

        return body;
    }

    static __generateBody() {
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

        return new ArticulatedObject("body", vertices, indices);
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

        return new ArticulatedObject("head", vertices, indices);
    }
}

export { PersonModel };