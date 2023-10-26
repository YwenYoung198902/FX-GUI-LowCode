import { ObjPool } from './ObjPool';
import './polyfill/ArrayBuffer_transfer';
export declare class ScalableBuffer {
    _arrayBuffer: ArrayBuffer;
    constructor();
    get byteLength(): number;
    resize(byteLength: number): void;
    get arrayBuffer(): ArrayBuffer;
}
export declare const scalableBufferPool: ObjPool<ScalableBuffer>;
