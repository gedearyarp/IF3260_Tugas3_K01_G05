import { ArticulatedObject } from "../object/articulated-object.js";

const SCALE = 0.6;
const yTranslate = 0.225;

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

        const leftArm = PersonModel.__generateLeftArm();
        const rightArm = PersonModel.__generateRightArm();

        const leftForeArm = PersonModel.__generateLeftForeArm();
        const rightForeArm = PersonModel.__generateRightForeArm();

        const leftThigh = PersonModel.__generateLeftThigh();
        const rightThigh = PersonModel.__generateRightThigh();

        const leftLowerLeg = PersonModel.__generateLeftLowerLeg();
        const rightLowerLeg = PersonModel.__generateRightLowerLeg();

        body.addChild(head);
        body.addChild(rightArm);
        body.addChild(leftArm);
        rightArm.addChild(rightForeArm);
        leftArm.addChild(leftForeArm);

        body.addChild(leftThigh);
        body.addChild(rightThigh);

        rightThigh.addChild(rightLowerLeg);
        leftThigh.addChild(leftLowerLeg);

        return body;
    }

    static __generateBody() {
        const vertices = [
            -0.45, -0.65, 0.3,
            0.45, -0.65, 0.3,
            0.45, 0.5, 0.3,
            -0.45, 0.5, 0.3,
            -0.45, -0.65, -0.3,
            0.45, -0.65, -0.3,
            0.45, 0.5, -0.3,
            -0.45, 0.5, -0.3,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7,
        ];

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= SCALE;
        }

        for (let i = 1; i < vertices.length; i += 3) {
            vertices[i] += yTranslate;
        }

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

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= SCALE;
        }

        for (let i = 1; i < vertices.length; i += 3) {
            vertices[i] += yTranslate;
        }

        return new ArticulatedObject("head", vertices, indices);
    }

    static __generateRightArm() {
        const vertices = [
            0.45, -0.15, 0.2,
            0.7, -0.15, 0.2,
            0.7, 0.5, 0.2,
            0.45, 0.5, 0.2,
            0.45, -0.15, -0.2,
            0.7, -0.15, -0.2,
            0.7, 0.5, -0.2,
            0.45, 0.5, -0.2,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7,
        ];

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= SCALE;
        }

        for (let i = 1; i < vertices.length; i += 3) {
            vertices[i] += yTranslate;
        }

        return new ArticulatedObject("rightArm", vertices, indices);
    }

    static __generateLeftArm() {
        const vertices = [
            -0.7, -0.15, 0.2,
            -0.45, -0.15, 0.2,
            -0.45, 0.5, 0.2,
            -0.7, 0.5, 0.2,
            -0.7, -0.15, -0.2,
            -0.45, -0.15, -0.2,
            -0.45, 0.5, -0.2,
            -0.7, 0.5, -0.2,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7,
        ];

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= SCALE;
        }

        for (let i = 1; i < vertices.length; i += 3) {
            vertices[i] += yTranslate;
        }

        return new ArticulatedObject("leftArm", vertices, indices);
    }

    static __generateRightForeArm() {
        const vertices = [
            0.45, -0.7, 0.15,
            0.7, -0.7, 0.15,
            0.7, -0.15, 0.15,
            0.45, -0.15, 0.15,
            0.45, -0.7, -0.15,
            0.7, -0.7, -0.15,
            0.7, -0.15, -0.15,
            0.45, -0.15, -0.15,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7,
        ];

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= SCALE;
        }

        for (let i = 1; i < vertices.length; i += 3) {
            vertices[i] += yTranslate;
        }

        return new ArticulatedObject("rightForeArm", vertices, indices);
    }

    static __generateLeftForeArm() {
        const vertices = [
            -0.7, -0.7, 0.15,
            -0.45, -0.7, 0.15,
            -0.45, -0.15, 0.15,
            -0.7, -0.15, 0.15,
            -0.7, -0.7, -0.15,
            -0.45, -0.7, -0.15,
            -0.45, -0.15, -0.15,
            -0.7, -0.15, -0.15,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7,
        ];

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= SCALE;
        }

        for (let i = 1; i < vertices.length; i += 3) {
            vertices[i] += yTranslate;
        }

        return new ArticulatedObject("leftForeArm", vertices, indices);
    }

    static __generateRightThigh() {
        const vertices = [
            0.02, -1.1, 0.25,
            0.45, -1.1, 0.25,
            0.45, -0.65, 0.25,
            0.02, -0.65, 0.25,
            0.02, -1.1, -0.25,
            0.45, -1.1, -0.25,
            0.45, -0.65, -0.25,
            0.02, -0.65, -0.25,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7,
        ];

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= SCALE;
        }

        for (let i = 1; i < vertices.length; i += 3) {
            vertices[i] += yTranslate;
        }

        return new ArticulatedObject("rightThigh", vertices, indices);
    }

    static __generateLeftThigh() {
        const vertices = [
            -0.45, -1.1, 0.25,
            -0.02, -1.1, 0.25,
            -0.02, -0.65, 0.25,
            -0.45, -0.65, 0.25,
            -0.45, -1.1, -0.25,
            -0.02, -1.1, -0.25,
            -0.02, -0.65, -0.25,
            -0.45, -0.65, -0.25,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7,
        ];

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= SCALE;
        }

        for (let i = 1; i < vertices.length; i += 3) {
            vertices[i] += yTranslate;
        }

        return new ArticulatedObject("leftThigh", vertices, indices);
    }

    static __generateRightLowerLeg() {
        const vertices = [
            0.05, -1.7, 0.25,
            0.42, -1.7, 0.25,
            0.42, -1.1, 0.25,
            0.05, -1.1, 0.25,
            0.05, -1.7, -0.25,
            0.42, -1.7, -0.25,
            0.42, -1.1, -0.25,
            0.05, -1.1, -0.25,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7,
        ];

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= SCALE;
        }

        for (let i = 1; i < vertices.length; i += 3) {
            vertices[i] += yTranslate;
        }

        return new ArticulatedObject("rightLowerLeg", vertices, indices);
    }

    static __generateLeftLowerLeg() {
        const vertices = [
            -0.42, -1.7, 0.25,
            -0.05, -1.7, 0.25,
            -0.05, -1.1, 0.25,
            -0.42, -1.1, 0.25,
            -0.42, -1.7, -0.25,
            -0.05, -1.7, -0.25,
            -0.05, -1.1, -0.25,
            -0.42, -1.1, -0.25,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            7, 6, 5, 7, 5, 4,
            4, 0, 3, 4, 3, 7,
            4, 5, 1, 4, 1, 0,
            3, 2, 6, 3, 6, 7,
        ];

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= SCALE;
        }

        for (let i = 1; i < vertices.length; i += 3) {
            vertices[i] += yTranslate;
        }

        return new ArticulatedObject("leftLowerLeg", vertices, indices);
    }
}

export { PersonModel };