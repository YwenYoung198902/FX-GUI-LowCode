/**
 * 获取需要padding的字节数
 * @param offsetByteLength 原始内容的偏移量
 * @param boundaryByteLength 边界字节数，一般是1/2/4/8
 * @return paddingByteLength
 */
export declare function getPaddingByteLength(offsetByteLength: number, boundaryByteLength: number): number;
