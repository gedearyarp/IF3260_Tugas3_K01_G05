import { ArticulatedObject } from "../object/articulated-object.js";

class ChickenModel {
    static getComponents() {
        return {
            BODY: "body",
            HEAD: "head",
            UPPER_BEAK: "upperBeak",
            LOWER_BEAK: "lowerBeak",
            WATTLE: "wattle",
            COMB: "comb",
            LEFT_WING: "leftWing",
            RIGHT_WING: "rightWing",
            LEFT_LEG: "leftLeg",
            RIGHT_LEG: "rightLeg",
            LEFT_TOE: "leftToe",
            RIGHT_TOE: "rightToe"
        }
    }


    static getModel() {
        const body = ChickenModel.__generateBody();
        const head = ChickenModel.__generateHead();
        const upperBeak = ChickenModel.__generateUpperBeak();
        const lowerBeak = ChickenModel.__generateLowerBeak();
        const wattle = ChickenModel.__generateWattle();
        const comb = ChickenModel.__generateComb();
        const leftWing = ChickenModel.__generateLeftWing();
        const rightWing = ChickenModel.__generateRightWing();
        const leftLeg = ChickenModel.__generateLeftLeg();
        const rightLeg = ChickenModel.__generateRightLeg();
        const leftToe = ChickenModel.__generateLeftToe();
        const rightToe = ChickenModel.__generateRightToe();

        body.addChild(head);
        head.addChild(upperBeak);
        head.addChild(lowerBeak);
        head.addChild(wattle);
        head.addChild(comb);
        body.addChild(leftWing);
        body.addChild(rightWing);
        body.addChild(leftLeg);
        body.addChild(rightLeg);
        leftLeg.addChild(leftToe);
        rightLeg.addChild(rightToe);

        return body;
    }


    static __generateBody() {
        const vertices = [
            -0.3, -0.3, 0.4,
            0.3, -0.3, 0.4,
            0.3, 0.3, 0.4,
            -0.3, 0.3, 0.4,
            -0.3, -0.3, -0.4,
            0.3, -0.3, -0.4,
            0.3, 0.3, -0.4,
            -0.3, 0.3, -0.4
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("body", vertices, indices);
    }


    static __generateHead(gl, program) {
        const vertices = [
            -0.2, 0.1, 0.6,
            0.2, 0.1, 0.6,
            0.2, 0.7, 0.6,
            -0.2, 0.7, 0.6,
            -0.2, 0.1, 0.3,
            0.2, 0.1, 0.3,
            0.2, 0.7, 0.3,
            -0.2, 0.7, 0.3
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("head", vertices, indices);
    }


    static __generateUpperBeak(gl, program) {
        const vertices = [
            -0.2, 0.3, 0.8,
            0.2, 0.3, 0.8,
            0.2, 0.4, 0.8,
            -0.2, 0.4, 0.8,
            -0.2, 0.3, 0.6,
            0.2, 0.3, 0.6,
            0.2, 0.4, 0.6,
            -0.2, 0.4, 0.6
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("upperBeak", vertices, indices);
    }


    static __generateLowerBeak(gl, program) {
        const vertices = [
            -0.2, 0.4, 0.8,
            0.2, 0.4, 0.8,
            0.2, 0.5, 0.8,
            -0.2, 0.5, 0.8,
            -0.2, 0.4, 0.6,
            0.2, 0.4, 0.6,
            0.2, 0.5, 0.6,
            -0.2, 0.5, 0.6
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("lowerBeak", vertices, indices);
    }


    static __generateWattle(gl, program) {
        const vertices = [
            -0.1, 0.05, 0.7,
            0.1, 0.05, 0.7,
            0.1, 0.3, 0.7,
            -0.1, 0.3, 0.7,
            -0.1, 0.05, 0.6,
            0.1, 0.05, 0.6,
            0.1, 0.3, 0.6,
            -0.1, 0.3, 0.6
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("wattle", vertices, indices);
    }


    static __generateComb(gl, program) {
        const vertices = [
            -0.05, 0.7, 0.55,
            0.05, 0.7, 0.55,
            0.05, 0.8, 0.55,
            -0.05, 0.8, 0.55,
            -0.05, 0.7, 0.3,
            0.05, 0.7, 0.3,
            0.05, 0.8, 0.3,
            -0.05, 0.8, 0.3
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("comb", vertices, indices);
    }


    static __generateLeftWing(gl, program) {
        const vertices = [
            -0.4, -0.1, 0.3,
            -0.3, -0.1, 0.3,
            -0.3, 0.3, 0.3,
            -0.4, 0.3, 0.3,
            -0.4, -0.1, -0.3,
            -0.3, -0.1, -0.3,
            -0.3, 0.3, -0.3,
            -0.4, 0.3, -0.3
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("leftWing", vertices, indices);
    }


    static __generateRightWing(gl, program) {
        const vertices = [
            0.3, -0.1, 0.3,
            0.4, -0.1, 0.3,
            0.4, 0.3, 0.3,
            0.3, 0.3, 0.3,
            0.3, -0.1, -0.3,
            0.4, -0.1, -0.3,
            0.4, 0.3, -0.3,
            0.3, 0.3, -0.3
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("rightWing", vertices, indices);
    }


    static __generateLeftLeg(gl, program) {
        const vertices = [
            -0.2, -0.7, 0.0,
            -0.1, -0.7, 0.0,
            -0.1, -0.3, 0.0,
            -0.2, -0.3, 0.0,
            -0.2, -0.7, -0.1,
            -0.1, -0.7, -0.1,
            -0.1, -0.3, -0.1,
            -0.2, -0.3, -0.1
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("leftLeg", vertices, indices);
    }


    static __generateRightLeg(gl, program) {
        const vertices = [
            0.1, -0.7, 0.0,
            0.2, -0.7, 0.0,
            0.2, -0.3, 0.0,
            0.1, -0.3, 0.0,
            0.1, -0.7, -0.1,
            0.2, -0.7, -0.1,
            0.2, -0.3, -0.1,
            0.1, -0.3, -0.1
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("rightLeg", vertices, indices);
    }


    static __generateLeftToe(gl, program) {
        const vertices = [
            -0.3, -0.8, 0.2,
            0.0, -0.8, 0.2,
            0.0, -0.7, 0.2,
            -0.3, -0.7, 0.2,
            -0.3, -0.8, -0.075,
            0.0, -0.8, -0.075,
            0.0, -0.7, -0.075,
            -0.3, -0.7, -0.075,
            -0.2, -0.8, 0.3,
            -0.1, -0.8, 0.3,
            -0.1, -0.7, 0.3,
            -0.2, -0.7, 0.3,
            -0.2, -0.8, 0.2,
            -0.1, -0.8, 0.2,
            -0.1, -0.7, 0.2,
            -0.2, -0.7, 0.2
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0,
            8, 9, 10, 8, 10, 11,
            9, 13, 14, 9, 14, 10,
            13, 12, 15, 13, 15, 14,
            12, 8, 11, 12, 11, 15,
            11, 10, 14, 11, 14, 15,
            12, 13, 9, 12, 9, 8
        ];

        return new ArticulatedObject("leftToe", vertices, indices);
    }


    static __generateRightToe(gl, program) {
        const vertices = [
            0.0, -0.8, 0.2,
            0.3, -0.8, 0.2,
            0.3, -0.7, 0.2,
            0.0, -0.7, 0.2,
            0.0, -0.8, -0.075,
            0.3, -0.8, -0.075,
            0.3, -0.7, -0.075,
            0.0, -0.7, -0.075,
            0.1, -0.8, 0.3,
            0.2, -0.8, 0.3,
            0.2, -0.7, 0.3,
            0.1, -0.7, 0.3,
            0.1, -0.8, 0.2,
            0.2, -0.8, 0.2,
            0.2, -0.7, 0.2,
            0.1, -0.7, 0.2
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0,
            8, 9, 10, 8, 10, 11,
            9, 13, 14, 9, 14, 10,
            13, 12, 15, 13, 15, 14,
            12, 8, 11, 12, 11, 15,
            11, 10, 14, 11, 14, 15,
            12, 13, 9, 12, 9, 8
        ];

        return new ArticulatedObject("rightToe", vertices, indices);
    }

}

export { ChickenModel };