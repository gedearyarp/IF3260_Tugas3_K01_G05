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
            -0.45, -0.5, 0.5,
            0.45, -0.5, 0.5,
            0.45, 0.5, 0.5,
            -0.45, 0.5, 0.5,
            -0.45, -0.5, -0.5,
            0.45, -0.5, -0.5,
            0.45, 0.5, -0.5,
            -0.45, 0.5, -0.5,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7,
        ];

        return new ArticulatedObject("body", vertices, indices);
    }

    static __generateHead() {
        const vertices = [
            -0.25, 0.5, 0.25,
            0.25, 0.5, 0.25,
            0.25, 0.9, 0.25,
            -0.25, 0.9, 0.25,
            -0.25, 0.5, -0.25,
            0.25, 0.5, -0.25,
            0.25, 0.9, -0.25,
            -0.25, 0.9, -0.25,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7,
        ];

        return new ArticulatedObject("head", vertices, indices);
    }
}

export { PersonModel };