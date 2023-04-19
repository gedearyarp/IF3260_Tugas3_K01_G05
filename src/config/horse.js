import { ArticulatedObject } from "../object/articulated-object.js";

class HorseModel{
    static getComponents(){
        return{
            BODY: "body",
            RIGHT_FRONT_LEG: "rightFrontLeg",
            LEFT_FRONT_LEG: "leftFrontLeg",
            RIGHT_BACK_LEG: "rightBackLeg",
            LEFT_BACK_LEG: "leftBackLeg",
            NECK: "neck",
            HEAD: "head",
            RIGHT_EAR: "rightEar",
            LEFT_EAR: "leftEar",
            NOSE: "nose",
            TAIL: "tail"

        }
    }

    static getModel(){
        const body = HorseModel.__generateBody();
        const rightFrontLeg = HorseModel.__generateRightFrontLeg();
        const leftFrontLeg = HorseModel.__generateLeftFrontLeg();
        const rightBackLeg = HorseModel.__generateRightBackLeg();
        const leftBackLeg = HorseModel.__generateLeftBackLeg();
        const neck = HorseModel.__generateNeck();
        const head = HorseModel.__generateHead();
        const rightEar = HorseModel.__generateRightEar();
        const leftEar = HorseModel.__generateLeftEar();
        const nose = HorseModel.__generateNose();
        const tail = HorseModel.__generateTail();

        body.addChild(rightFrontLeg);
        body.addChild(leftFrontLeg);
        body.addChild(rightBackLeg);
        body.addChild(leftBackLeg);
        body.addChild(neck);
        neck.addChild(head);
        head.addChild(rightEar);
        head.addChild(leftEar);
        head.addChild(nose);
        body.addChild(tail);

        return body;
    }

    static __generateBody(){
        const vertices = [
            -0.3, -0.32, 0.6, // 0
            0.3, -0.32, 0.6, // 1
            0.3, 0.27, 0.6, // 2
            -0.3, 0.27, 0.6, // 3

            -0.3, -0.32, -0.6, // 4
            0.3, -0.32, -0.6, // 5
            0.3, 0.27, -0.6, // 6
            -0.3, 0.27, -0.6 // 7
        ];

        const indices = [
            0, 1, 2, 2, 3, 0,
            4, 0, 3, 3, 7, 4,
            1, 5, 6, 6, 2, 1,
            4, 5, 6, 6, 7, 4,
            7, 3, 2, 2, 6, 7,
            0, 1, 5, 5, 4, 0,


        ];
        return new ArticulatedObject("body", vertices, indices);
    }

    static __generateRightFrontLeg(gl, program){
        const vertices = [
            0.15, -0.2, 0.6,//0
            0.15, -0.8, 0.6, // 1
            0.3, -0.8, 0.6, // 2
            0.3, -0.2, 0.6, //3

            0.15, -0.2, 0.35, //4
            0.15, -0.8, 0.35, //5
            0.3, -0.8, 0.35, //6
            0.3, -0.2, 0.35, //7
        ];

        const indices = [
            0, 1, 2, 2, 3, 0,
            4, 5, 6, 6, 7, 4,
            5, 1, 2, 2, 6, 5,
            3, 2, 6, 6, 7, 3,
            4, 5, 1, 1, 0, 4, 


        ];

        return new ArticulatedObject("rightFrontLeg", vertices, indices);
    }

    static __generateLeftFrontLeg(gl, program){
        const vertices = [
            -0.15, -0.2, 0.6,//0
            -0.15, -0.8, 0.6, // 1
            -0.3, -0.8, 0.6, // 2
            -0.3, -0.2, 0.6, //3

            -0.15, -0.2, 0.35, //4
            -0.15, -0.8, 0.35, //5
            -0.3, -0.8, 0.35, //6
            -0.3, -0.2, 0.35, //7
        ];

        const indices = [
            0, 1, 2, 2, 3, 0,
            4, 5, 6, 6, 7, 4,
            5, 1, 2, 2, 6, 5,
            3, 2, 6, 6, 7, 3,
            4, 5, 1, 1, 0, 4, 


        ];

        return new ArticulatedObject("leftFrontLeg", vertices, indices);
    }

    static __generateRightBackLeg(gl, program){
        const vertices = [
            0.15, -0.2, -0.6,//0
            0.15, -0.8, -0.6, // 1
            0.3, -0.8, -0.6, // 2
            0.3, -0.2, -0.6, //3

            0.15, -0.2, -0.35, //4
            0.15, -0.8, -0.35, //5
            0.3, -0.8, -0.35, //6
            0.3, -0.2, -0.35, //7
        ];

        const indices = [
            0, 1, 2, 2, 3, 0,
            4, 5, 6, 6, 7, 4,
            5, 1, 2, 2, 6, 5,
            3, 2, 6, 6, 7, 3,
            4, 5, 1, 1, 0, 4, 


        ];

        return new ArticulatedObject("rightBackLeg", vertices, indices);
    }

    static __generateLeftBackLeg(gl, program){
        const vertices = [
            -0.15, -0.2, -0.6,//0
            -0.15, -0.8, -0.6, // 1
            -0.3, -0.8, -0.6, // 2
            -0.3, -0.2, -0.6, //3

            -0.15, -0.2, -0.35, //4
            -0.15, -0.8, -0.35, //5
            -0.3, -0.8, -0.35, //6
            -0.3, -0.2, -0.35, //7
        ];

        const indices = [
            0, 1, 2, 2, 3, 0,
            4, 5, 6, 6, 7, 4,
            5, 1, 2, 2, 6, 5,
            3, 2, 6, 6, 7, 3,
            4, 5, 1, 1, 0, 4, 


        ];

        return new ArticulatedObject("leftBackLeg", vertices, indices);
    }

    static __generateNeck(gl, program){
        const vertices = [
            -0.15, 0.1, 0.6,
            0.15, 0.1, 0.6,
            0.15, 0.9, 0.8,
            -0.15, 0.9, 0.8,

            -0.15, 0.1, 0.1,
            0.15, 0.1, 0.1,
            0.15, 0.9, 0.3,
            -0.15, 0.9, 0.3,


        ];

        const indices = [
            0, 1, 2, 2, 3, 0,
            4, 5, 6, 6, 7, 4,
            1, 5, 6, 6, 2, 1,
            4, 0, 3, 3, 7, 4,

        ];

        return new ArticulatedObject("neck", vertices, indices);
    }

    static __generateHead(gl, program){
        const vertices = [
            -0.3, 0.6, 0.75,
            0.3, 0.6, 0.75,
            0.3, 0.9, 0.85,
            -0.3, 0.9, 0.85,

            -0.3, 0.6, 0.3,
            0.3, 0.6, 0.3,
            0.3, 0.9, 0.4,
            -0.3, 0.9, 0.4,


        ];

        const indices = [
            0, 1, 2, 2, 3, 0,
            4, 5, 6, 6, 7, 4,
            1, 5, 6, 6, 2, 1,
            4, 0, 3, 3, 7, 4,

        ];

        return new ArticulatedObject("head", vertices, indices);
    }

    static __generateRightEar(gl, program){
        const vertices = [
            0.25, 0.9, 0.63,
            0.1, 0.9, 0.63,
            0.1, 1, 0.65,
            0.25, 1, 0.65,

            0.25, 0.9, 0.53,
            0.1, 0.9, 0.53,
            0.1, 1, 0.55,
            0.25, 1, 0.55,


        ];

        const indices = [
            0, 1, 2, 2, 3, 0,
            4, 5, 6, 6, 7, 4,
            1, 5, 6, 6, 2, 1,
            4, 0, 3, 3, 7, 4,

        ];

        return new ArticulatedObject("rightEar", vertices, indices);
    }

    static __generateLeftEar(gl, program){
        const vertices = [
            -0.25, 0.9, 0.63,
            -0.1, 0.9, 0.63,
            -0.1, 1, 0.65,
            -0.25, 1, 0.65,

            -0.25, 0.9, 0.53,
            -0.1, 0.9, 0.53,
            -0.1, 1, 0.55,
            -0.25, 1, 0.55,


        ];

        const indices = [
            0, 1, 2, 2, 3, 0,
            4, 5, 6, 6, 7, 4,
            1, 5, 6, 6, 2, 1,
            4, 0, 3, 3, 7, 4,

        ];

        return new ArticulatedObject("leftEar", vertices, indices);
    }

    static __generateNose(gl, program){
        const vertices = [
            -0.15, 0.6, 1.2,
            0.15, 0.6, 1.2,
            0.15, 0.9, 1.3,
            -0.15, 0.9, 1.3,

            -0.15, 0.6, 0.7,
            0.15, 0.6, 0.7,
            0.15, 0.9, 0.8,
            -0.15, 0.9, 0.8,

        ];

        const indices = [
            0, 1, 2, 2, 3, 0,
            4, 5, 6, 6, 7, 4,
            1, 5, 6, 6, 2, 1,
            4, 0, 3, 3, 7, 4,

        ];

        return new ArticulatedObject("nose", vertices, indices);
    }

    static __generateTail(gl, program){
        const vertices = [
            -0.15, 0.27, -0.6,
            0.15, 0.27, -0.6,
            0.15, 0, -0.6,
            -0.15, 0, -0.6,

            -0.15, -0.15, -0.9,
            0.15, -0.15, -0.9,
            0.15, -0.42, -0.9,
            -0.15, -0.42, -0.9,

        ];

        const indices = [
            0, 1, 2, 2, 3, 0,
            4, 0, 3, 3, 7, 4,
            1, 5, 6, 6, 2, 1,
            4, 5, 6, 6, 7, 4,
            7, 3, 2, 2, 6, 7,
            0, 1, 5, 5, 4, 0,

        ];

        return new ArticulatedObject("tail", vertices, indices);
    }
}


export { HorseModel };