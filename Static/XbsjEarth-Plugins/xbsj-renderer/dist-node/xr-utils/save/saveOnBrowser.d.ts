/**
 *
 * @param bin 数据
 * @param mimeType 'image/jpeg' | 'image/png' | 'application/json' | 'application/octet-stream' | 'model/gltf+json' | 'model/gltf-binary'
 * @param name 名称
 * @example
 * saveOnBrowser('content'， '123.csv', text/plain');
 */
export declare function saveOnBrowser(bin: BlobPart, name: string, mimeType?: string): void;
