import { Destroyable } from 'xbsj-renderer/dist-node/xr-utils';
import * as Cesium from 'cesium';
export declare class CzmSmartCommand extends Destroyable {
    _attributeLocations: Cesium.AttributeLocations;
    _shaderProgram: Cesium.ShaderProgram;
    _command: Cesium.DrawCommand;
    _attributeBuffers: {
        [k: string]: Cesium.Buffer;
    };
    _indexBuffer: Cesium.IndexBuffer;
    constructor(options: {
        context: Cesium.Context;
        modelMatrix: Cesium.Matrix4;
        attributes: {
            [k: string]: {
                typedArray: Float32Array | Float64Array | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array;
                componentsPerAttribute: 1 | 2 | 3 | 4;
                usage?: Cesium.BufferUsage;
                normalize?: boolean;
            };
        };
        indexTypedArray: Uint8Array | Uint16Array | Uint32Array;
        vertexShaderSource: string;
        vertexShaderDefines?: string[];
        fragmentShaderSource: string;
        fragmentSahderDefines?: string[];
        pass?: Cesium.Pass;
        renderState?: Cesium.RenderStateOptions;
        uniformMap?: Cesium.UniformMap;
        primitiveType?: Cesium.PrimitiveType;
    });
    get vertexBuffers(): {
        [k: string]: Cesium.Buffer;
    };
    get indexBuffer(): Cesium.IndexBuffer;
    setShader(options: {
        vertexShaderSource: string;
        fragmentShaderSource: string;
        vertexShaderDefines: string[];
        fragmentSahderDefines: string[];
    }): void;
    get command(): Cesium.DrawCommand;
}
