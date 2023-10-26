import { Number16, Number3 } from "./Numbers";
export declare class InverseViewMatrix {
    static getDirection(inverseViewMatrix: Readonly<Number16>, target?: Number3): Number3;
    static getRight(inverseViewMatrix: Readonly<Number16>, target?: Number3): Number3;
    static getUp(inverseViewMatrix: Readonly<Number16>, target?: Number3): Number3;
    static getEye(inverseViewMatrix: Readonly<Number16>, target?: Number3): Number3;
}
