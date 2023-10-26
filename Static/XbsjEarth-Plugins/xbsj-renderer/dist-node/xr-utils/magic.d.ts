/**
 * 获取某个字符串的magic字符
 * 注意不能处理超过字符串长度超过4的情况，不含4.
 * @param str
 * @example
 * const magic_b3dm = getMagic('b3dm');
 * // magic_b3dm 1835283298 / 0x6D643362
 */
export declare function magicStrToUint32(str: string): number;
