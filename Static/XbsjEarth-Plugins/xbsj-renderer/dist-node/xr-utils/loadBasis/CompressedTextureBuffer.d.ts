export declare class CompressedTextureBuffer {
    constructor(
        internalFormat: any,
        width: number,
        height: number,
        buffer: Uint8Array,
        mipLevels: any,
    );

    readonly internalFormat: any;
    readonly width: number;
    readonly height: number;
    readonly bufferView: Uint8Array;
    readonly mipLevels: any;

    clone(object: CompressedTextureBuffer): CompressedTextureBuffer;

    static clone(object: CompressedTextureBuffer): CompressedTextureBuffer;
}
