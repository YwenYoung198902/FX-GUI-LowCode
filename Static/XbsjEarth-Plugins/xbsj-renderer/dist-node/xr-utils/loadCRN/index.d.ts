import { CompressedTextureBuffer } from "../loadBasis/CompressedTextureBuffer";
/**
 * Asynchronously loads and parses the given URL to a CRN file or parses the raw binary data of a CRN file.
 * Returns a promise that will resolve to an object containing the image buffer, width, height and format once loaded,
 * or reject if the URL failed to load or failed to parse the data.  The data is loaded
 * using XMLHttpRequest, which means that in order to make requests to another origin,
 * the server must have Cross-Origin Resource Sharing (CORS) headers enabled.
 *
 * @function loadCRN
 *
 * @param {Resource|String|ArrayBuffer} resourceOrUrlOrBuffer The URL of the binary data or an ArrayBuffer.
 * @returns {Promise.<CompressedTextureBuffer>|undefined} A promise that will resolve to the requested data when loaded. Returns undefined if <code>request.throttle</code> is true and the request does not have high enough priority.
 *
 * @exception {RuntimeError} Unsupported compressed format.
 *
 * @example
 * // load a single URL asynchronously
 * Cesium.loadCRN('some/url').then(function(textureData) {
 *     var width = textureData.width;
 *     var height = textureData.height;
 *     var format = textureData.internalFormat;
 *     var arrayBufferView = textureData.bufferView;
 *     // use the data to create a texture
 * }).otherwise(function(error) {
 *     // an error occurred
 * });
 *
 * @see {@link https://github.com/BinomialLLC/crunch|crunch DXTc texture compression and transcoding library}
 * @see {@link http://www.w3.org/TR/cors/|Cross-Origin Resource Sharing}
 * @see {@link http://wiki.commonjs.org/wiki/Promises/A|CommonJS Promises/A}
 */
export declare function loadCRN(resourceOrUrlOrBuffer: any): Promise<CompressedTextureBuffer> | undefined;
