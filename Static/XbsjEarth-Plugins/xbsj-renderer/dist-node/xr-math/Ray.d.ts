import { Number3, Number6 } from "./Numbers";
export declare namespace Ray {
    function getOrigin(ray: Readonly<Number6>, target?: Number3): Number3;
    function getDirection(ray: Readonly<Number6>, target?: Number3): Number3;
}
