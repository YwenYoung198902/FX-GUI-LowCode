import { Numbers } from './Numbers';
export declare namespace Vector {
    function set<T extends Numbers>(target?: T, ...args: number[]): T;
    function every(vector: Readonly<Numbers>, operator: (current: number, index: number) => boolean): boolean;
    function reduce<U>(vector: Readonly<Numbers>, operator: (previousValue: U, currentValue: number, currentIndex: number) => U, initialValue: U): U;
    function itr(vector: Readonly<Numbers>): Generator<number, void, unknown>;
    function magnitudeSquared(vector: Readonly<Numbers>): number;
    function magnitude(vector: Readonly<Numbers>): number;
    function isNormalized(vector: Readonly<Numbers>, epsilon?: number): boolean;
    function dot(left: Readonly<Numbers>, right: Readonly<Numbers>): number;
    function distanceSquared(left: Readonly<Numbers>, right: Readonly<Numbers>): number;
    function distance(left: Readonly<Numbers>, right: Readonly<Numbers>): number;
    function equals(left: Readonly<Numbers>, right: Readonly<Numbers>): boolean;
    function equalsEpsilon(left: Readonly<Numbers>, right: Readonly<Numbers>, epsilon?: number): boolean;
    function op1<T extends Numbers>(vector: Readonly<Numbers>, operator: (value: number, index: number) => number, target?: T): T;
    function op2<T extends Numbers>(left: Readonly<Numbers>, right: Readonly<Numbers>, operator: (a: number, b: number) => number, target?: T): T;
    function clone<T extends Numbers>(vector: Readonly<Numbers>, target?: T): T;
    function multiplyByScalar<T extends Numbers>(vector: Readonly<Numbers>, scalar: number, target?: T): T;
    function normalize<T extends Numbers>(vector: Readonly<Numbers>, target?: T, epsilon?: number): T | undefined;
    function negate<T extends Numbers>(vector: Readonly<Numbers>, target?: T): T;
    function abs<T extends Numbers>(vector: Readonly<Numbers>, target?: T): T;
    function fract<T extends Numbers>(vector: Readonly<Numbers>, target?: T): T;
    function subtract<T extends Numbers>(left: Readonly<Numbers>, right: Readonly<Numbers>, target?: T): T;
    function add<T extends Numbers>(left: Readonly<Numbers>, right: Readonly<Numbers>, target?: T): T;
    function multiply<T extends Numbers>(left: Readonly<Numbers>, right: Readonly<Numbers>, target?: T): T;
    function divide<T extends Numbers>(left: Readonly<Numbers>, right: Readonly<Numbers>, target?: T): T;
    function lerp<T extends Numbers>(left: Readonly<Numbers>, right: Readonly<Numbers>, t: number, target?: T): T;
}
