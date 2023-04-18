import { ArticulatedObject } from "../object/articulated-object.js";

class WolfModel {
    static getComponents() {
        return {
            BODY: "body",
                HEAD: "head",
                    NOSE: "nose",
                    RIGHT_EAR: "rightEar",
                    LEFT_EAR: "leftEar",
                TOP_MANE: "topMane",
                RIGHT_MANE: "rightMane",
                LEFT_MANE: "leftMane",
                RIGHT_FRONT_LEG: "rightFrontLeg",
                LEFT_FRONT_LEG: "leftFrontLeg",
                LEFT_HIND_LEG: "leftHindLeg",
                RIGHT_HIND_LEG: "rightHindLeg",
                TAIL: "tail",
        }
    }


    static getModel() {
        const body = WolfModel.__generateBody();
        const head = WolfModel.__generateHead();
        const nose = WolfModel.__generateNose();
        const rightEar = WolfModel.__generateRightEar();
        const leftEar = WolfModel.__generateLeftEar();
        const topMane = WolfModel.__generateTopMane();
        const rightMane = WolfModel.__generateRightMane();
        const leftMane = WolfModel.__generateLeftMane();
        const rightFrontLeg = WolfModel.__generateRightFrontLeg();
        const leftFrontLeg = WolfModel.__generateLeftFrontLeg();
        const leftHindLeg = WolfModel.__generateLeftHindLeg();
        const rightHindLeg = WolfModel.__generateRightHindLeg();
        const tail = WolfModel.__generateTail();

        body.addChild(head);
        head.addChild(nose);
        head.addChild(rightEar);
        head.addChild(leftEar);
        body.addChild(topMane);
        body.addChild(rightMane);
        body.addChild(leftMane);
        body.addChild(rightFrontLeg);
        body.addChild(leftFrontLeg);
        body.addChild(leftHindLeg);
        body.addChild(rightHindLeg);
        body.addChild(tail);

        return body;
    }


    static __generateBody() {
        const vertices = [
            -0.3, -0.3, 0.4,
            0.3, -0.3, 0.4,
            0.3, 0.2, 0.4,
            -0.3, 0.2, 0.4,
            -0.3, -0.3, -0.6,
            0.3, -0.3, -0.6,
            0.3, 0.2, -0.6,
            -0.3, 0.2, -0.6
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
            -0.3, -0.3, 0.4,
            0.3, -0.3, 0.4,
            0.3, 0.2, 0.4,
            -0.3, 0.2, 0.4,
            -0.3, -0.3, 0.6,
            0.3, -0.3, 0.6,
            0.3, 0.2, 0.6,
            -0.3, 0.2, 0.6,
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


    static __generateNose(gl, program) {
        const vertices = [
            -0.15, -0.3, 0.6,
            0.15, -0.3, 0.6,
            0.15, -0.05, 0.6,
            -0.15, -0.05, 0.6,
            -0.15, -0.3, 0.8,
            0.15, -0.3, 0.8,
            0.15, -0.05, 0.8,
            -0.15, -0.05, 0.8,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("nose", vertices, indices);
    }


    static __generateRightEar(gl, program) {
        const vertices = [
            0.1, 0.2, 0.4,
            0.3, 0.2, 0.4,
            0.3, 0.4, 0.4,
            0.1, 0.4, 0.4,

            0.1, 0.2, 0.5,
            0.3, 0.2, 0.5,
            0.3, 0.4, 0.5,
            0.1, 0.4, 0.5,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("rightEar", vertices, indices);
    }


    static __generateLeftEar(gl, program) {
        const vertices = [
            -0.3, 0.2, 0.4,
            -0.1, 0.2, 0.4,
            -0.1, 0.4, 0.4,
            -0.3, 0.4, 0.4,
            
            -0.3, 0.2, 0.5,
            -0.1, 0.2, 0.5,
            -0.1, 0.4, 0.5,
            -0.3, 0.4, 0.5,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("leftEar", vertices, indices);
    }


    static __generateTopMane(gl, program) {
        const vertices = [
            //Top Mane
            -0.3, 0.2, 0.0,
            0.3, 0.2, 0.0,
            0.3, 0.3, 0.0,
            -0.3, 0.3, 0.0,
            -0.3, 0.2, 0.4,
            0.3, 0.2, 0.4,
            0.3, 0.3, 0.4,
            -0.3, 0.3, 0.4,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("mane", vertices, indices);
    }

    static __generateRightMane(gl, program) {
        const vertices = [
            0.3, -0.3, 0.0,
            0.4, -0.3, 0.0,
            0.4, 0.3, 0.0,
            0.3, 0.3, 0.0,
            0.3, -0.3, 0.4,
            0.4, -0.3, 0.4,
            0.4, 0.3, 0.4,
            0.3, 0.3, 0.4,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("rightMane", vertices, indices);
    }

    static __generateLeftMane(gl, program) {
        const vertices = [
            -0.4, -0.3, 0.0,
            -0.3, -0.3, 0.0,
            -0.3, 0.3, 0.0,
            -0.4, 0.3, 0.0,
            -0.4, -0.3, 0.4,
            -0.3, -0.3, 0.4,
            -0.3, 0.3, 0.4,
            -0.4, 0.3, 0.4,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("leftMane", vertices, indices);
    }

    static __generateRightFrontLeg(gl, program) {
        const vertices = [
            0.1, -0.8, 0.2,
            0.3, -0.8, 0.2,
            0.3, -0.2, 0.2,
            0.1, -0.2, 0.2,
            0.1, -0.8, 0.4,
            0.3, -0.8, 0.4,
            0.3, -0.2, 0.4,
            0.1, -0.2, 0.4,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("rightFrontLeg", vertices, indices);
    }


    static __generateLeftFrontLeg(gl, program) {
        const vertices = [
            -0.3, -0.8, 0.2,
            -0.1, -0.8, 0.2,
            -0.1, -0.2, 0.2,
            -0.3, -0.2, 0.2,
            -0.3, -0.8, 0.4,
            -0.1, -0.8, 0.4,
            -0.1, -0.2, 0.4,
            -0.3, -0.2, 0.4,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("leftFrontLeg", vertices, indices);
    }


    static __generateLeftHindLeg(gl, program) {
        const vertices = [
            -0.3, -0.8, -0.6,
            -0.1, -0.8, -0.6,
            -0.1, -0.2, -0.6,
            -0.3, -0.2, -0.6,
            -0.3, -0.8, -0.4,
            -0.1, -0.8, -0.4,
            -0.1, -0.2, -0.4,
            -0.3, -0.2, -0.4,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("leftHindLeg", vertices, indices);
    }


    static __generateRightHindLeg(gl, program) {
        const vertices = [
            0.1, -0.8, -0.6,
            0.3, -0.8, -0.6,
            0.3, -0.2, -0.6,
            0.1, -0.2, -0.6,
            0.1, -0.8, -0.4,
            0.3, -0.8, -0.4,
            0.3, -0.2, -0.4,
            0.1, -0.2, -0.4,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("rightHindLeg", vertices, indices);
    }


    static __generateTail(gl, program) {
        const vertices = [
            -0.1, 0.0, -1.1,
            0.1, 0.0, -1.1,
            0.1, 0.2, -1.1,
            -0.1, 0.2, -1.1,
            -0.1, 0.0, -0.5,
            0.1, 0.0, -0.5,
            0.1, 0.2, -0.5,
            -0.1, 0.2, -0.5,
        ];

        const indices = [
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0
        ];

        return new ArticulatedObject("tail", vertices, indices);
    }
}

export { WolfModel };