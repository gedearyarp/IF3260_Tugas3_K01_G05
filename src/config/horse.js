import { ArticulatedObject } from "../object/articulated-object.js";

class HorseModel{
    static getComponents(){
        return{
            BODY: "body",
            RIGHT_FRONT_LEG: "rightFrontLeg",
            LEFT_FRONT_LEG: "leftFrontLeg",
            RIGHT_BACK_LEG: "rightBackLeg",
            LEFT_BACK_LEG: "leftBackLeg",

        }
    }

    static getModel(){
        const body = HorseModel.__generateBody();
        const rightFrontLeg = HorseModel.__generateRightFrontLeg();
        const leftFrontLeg = HorseModel.__generateLeftFrontLeg();
        const rightBackLeg = HorseModel.__generateRightBackLeg();
        const leftBackLeg = HorseModel.__generateLeftBackLeg();

        body.addChild(rightFrontLeg);
        body.addChild(leftFrontLeg);
        body.addChild(rightBackLeg);
        body.addChild(leftBackLeg);

        return body;
    }

    static __generateBody(){
        const vertices = [
            -0.3, -0.2, 0.6, // 0
            0.3, -0.2, 0.6, // 1
            0.3, 0.2, 0.6, // 2
            -0.3, 0.2, 0.6, // 3

            -0.3, -0.2, -0.6, // 4
            0.3, -0.2, -0.6, // 5
            0.3, 0.2, -0.6, // 6
            -0.3, 0.2, -0.6 // 7
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

            0.15, -0.2, 0.45, //4
            0.15, -0.8, 0.45, //5
            0.3, -0.8, 0.45, //6
            0.3, -0.2, 0.45, //7
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

            -0.15, -0.2, 0.45, //4
            -0.15, -0.8, 0.45, //5
            -0.3, -0.8, 0.45, //6
            -0.3, -0.2, 0.45, //7
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

            0.15, -0.2, -0.45, //4
            0.15, -0.8, -0.45, //5
            0.3, -0.8, -0.45, //6
            0.3, -0.2, -0.45, //7
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

            -0.15, -0.2, -0.45, //4
            -0.15, -0.8, -0.45, //5
            -0.3, -0.8, -0.45, //6
            -0.3, -0.2, -0.45, //7
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
}


export { HorseModel };