/* This file is automatically rebuilt by the Cesium build process. */
define(['exports', './when-7be8a9d0'], function (exports, when) { 'use strict';

  /**
   * Describes a compressed texture and contains a compressed texture buffer.
   * @alias CompressedTextureBuffer
   * @constructor
   *
   * @param {PixelFormat} internalFormat The pixel format of the compressed texture.
   * @param {Number} width The width of the texture.
   * @param {Number} height The height of the texture.
   * @param {Uint8Array} buffer The compressed texture buffer.
   */
  // 实现压缩纹理多级LOD vtxf 20200630 origin
  // function CompressedTextureBuffer(internalFormat, width, height, buffer) {
  //   this._format = internalFormat;
  //   this._width = width;
  //   this._height = height;
  //   this._buffer = buffer;
  // }
  // 实现压缩纹理多级LOD vtxf 20200630 begin
  function CompressedTextureBuffer(
    internalFormat,
    width,
    height,
    buffer,
    mipLevels
  ) {
    this._format = internalFormat;
    this._width = width;
    this._height = height;
    this._buffer = buffer;
    this._mipLevels = mipLevels;
  }
  // 实现压缩纹理多级LOD vtxf 20200630 end

  Object.defineProperties(CompressedTextureBuffer.prototype, {
    /**
     * The format of the compressed texture.
     * @type PixelFormat
     * @readonly
     * @memberof CompressedTextureBuffer.prototype
     */
    internalFormat: {
      get: function () {
        return this._format;
      },
    },
    /**
     * The width of the texture.
     * @type Number
     * @readonly
     * @memberof CompressedTextureBuffer.prototype
     */
    width: {
      get: function () {
        return this._width;
      },
    },
    /**
     * The height of the texture.
     * @type Number
     * @readonly
     * @memberof CompressedTextureBuffer.prototype
     */
    height: {
      get: function () {
        return this._height;
      },
    },
    /**
     * The compressed texture buffer.
     * @type Uint8Array
     * @readonly
     * @memberof CompressedTextureBuffer.prototype
     */
    bufferView: {
      get: function () {
        return this._buffer;
      },
    },
    // 实现压缩纹理多级LOD vtxf 20200630 begin
    mipLevels: {
      get: function () {
        return this._mipLevels;
      },
    },
    // 实现压缩纹理多级LOD vtxf 20200630 end
  });

  /**
   * Creates a shallow clone of a compressed texture buffer.
   *
   * @param {CompressedTextureBuffer} object The compressed texture buffer to be cloned.
   * @return {CompressedTextureBuffer} A shallow clone of the compressed texture buffer.
   */
  CompressedTextureBuffer.clone = function (object) {
    if (!when.defined(object)) {
      return undefined;
    }

    return new CompressedTextureBuffer(
      object._format,
      object._width,
      object._height,
      object._buffer,
      object._mipLevels // 实现压缩纹理多级LOD vtxf 20200701
    );
  };

  /**
   * Creates a shallow clone of this compressed texture buffer.
   *
   * @return {CompressedTextureBuffer} A shallow clone of the compressed texture buffer.
   */
  CompressedTextureBuffer.prototype.clone = function () {
    return CompressedTextureBuffer.clone(this);
  };

  exports.CompressedTextureBuffer = CompressedTextureBuffer;

});
