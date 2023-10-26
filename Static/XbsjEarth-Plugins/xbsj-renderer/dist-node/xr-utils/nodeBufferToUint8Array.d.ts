/// <reference types="node" />
/**
 * node的Buffer转成Uint8Array
 * 注意，不能直接用new Uint8Array(buffer.buffer),
 * 否则调试时是好的，但是实际项目使用就会有问题，因为node的buffer可能只用了ArrayBuffer中的一部分！
 * @param buffer Node的buffer
 */
export declare function nodeBufferToUint8Array(buffer: Buffer): Uint8Array;
