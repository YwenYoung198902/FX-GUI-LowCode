/**
 * Destroys an object.
 *
 * @param object The object to destroy.
 * @param [message] The message to include in the exception that is thrown if
 *                           a destroyed object's function is called.
 * @example
 * // How a texture would destroy itself.
 * this.destroy = function () {
 *     _gl.deleteTexture(_texture);
 *     return Cesium.destroyObject(this);
 * };
 *
 * @see DeveloperError
 */
export declare function destroyObject(object: {
    [k: string]: any;
}): undefined;
