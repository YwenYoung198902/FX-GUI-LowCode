// cesium声明文件补充
// 注意此声明文件不全，用到哪儿写到哪儿
// vtxf 20211215

declare module 'cesium' {
    interface Destroyable {
        isDestroyed(): boolean;
        destroy(): undefined;
    }

    interface Context {

    }

    // @ts-ignore
    type TextureOptions = {
        context: Context;
        width: number;
        height: number;
        flipY?: boolean;
    }

    const enum MipmapHint {
        DONT_CARE = WebGLConstants.DONT_CARE,
        FASTEST = WebGLConstants.FASTEST,
        NICEST = WebGLConstants.NICEST,
    }

    interface Texture extends Destroyable {
        copyFrom(options: {
            // arrayBufferView: ArrayBufferView,
            // width: number;
            // height: number;
            source: {
                width: number;
                height: number;
                arrayBufferView: ArrayBufferView;
            } | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
            xOffset?: number;
            yOffset?: number;
            skipColorSpaceConversion?: boolean; // false
        }): void;

        generateMipmap(hint: MipmapHint): void;
    }

    var Texture: {
        prototype: Texture;
        new(options: TextureOptions): Texture;
    };

    interface Scene {
        context: Context;
    }

    interface AttributeLocations {
        [k: string]: number;
    }

    const enum BufferUsage {
        STREAM_DRAW = WebGLConstants.STREAM_DRAW,
        STATIC_DRAW = WebGLConstants.STATIC_DRAW,
        DYNAMIC_DRAW = WebGLConstants.DYNAMIC_DRAW,
    }

    interface VertexArrayOptions {
        context: Context;
        attributes: {
            index: number,
            vertexBuffer: Buffer,
            componentsPerAttribute: number,
            componentDatatype: ComponentDatatype,
            normalize?: boolean, // false
        }[];
        attributeLocations: AttributeLocations;
        bufferUsage: BufferUsage;
        indexBuffer?: Buffer;
    }

    namespace ComponentDatatype {
        function createTypedArray(componentDatatype: ComponentDatatype, valuesOrLength: number | number[]): Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
    }

    interface VertexArray extends Destroyable {

    }

    var VertexArray: {
        prototype: VertexArray;
        new(options: VertexArrayOptions): VertexArray;
    }

    // interface ShaderProgramOptions {
    //     gl: WebGLRenderingContext | WebGL2RenderingContext;
    //     // debugShaders: boolean; 
    //     vertexShaderText: string;
    //     fragmentShaderText: string;
    //     attributeLocations: AttributeLocations;
    // }

    interface ShaderProgram extends Destroyable {

    }

    // var ShaderProgram:  {
    //     prototype: ShaderProgram;
    //     new(options: ShaderProgramOptions): ShaderProgram;
    // }

    interface ShaderSource {

    }

    var ShaderSource: {
        prototype: ShaderSource;
        new(options: {
            defines?: string[];
            sources: string[];
            includeBuiltIns?: boolean;
        }): ShaderSource;
    };

    namespace ShaderProgram {
        function fromCache(options: {
            context: Context,
            vertexShaderSource: ShaderSource,
            fragmentShaderSource: ShaderSource,
            attributeLocations: AttributeLocations,
        }): ShaderProgram;
    }

    interface UniformMap {
        [k: string]: () => Texture | number | Cartesian2 | Cartesian3 | Cartesian4;
    }

    interface RenderState {

    }

    interface RenderStateOptions {
        frontFace?: WindingOrder, // WindingOrder.COUNTER_CLOCKWISE,
        cull?: {
            enabled?: boolean, // false
            face?: CullFace, // CullFace.BACK
        },
        lineWidth?: number, // 1
        polygonOffset?: {
            enabled?: boolean, // false
            factor?: number, // 0,
            units?: number, // 0
        },
        scissorTest?: {
            enabled?: boolean, // false,
            rectangle?: {
                x?: number, // 0,
                y?: number, // 0,
                width?: number, // 0,
                height?: number, // 0
            }
        },
        depthRange?: {
            near?: number, // 0,
            far?: number, // 1
        },
        depthTest?: {
            enabled?: boolean; // false,
            func ?: DepthFunction; //DepthFunction.LESS
        },
        colorMask?: {
            red?: boolean, // true,
            green?: boolean, // true,
            blue?: boolean, // true,
            alpha?: boolean, // true
        },
        depthMask?: boolean, // true,
        stencilMask?: number, // ~0
        blending?: {
            enabled?: boolean, // false,
            color?: {
                red?: number, // 0.0,
                green?: number, // 0.0,
                blue?: number, // 0.0,
                alpha?: number, // 0.0
            },
            equationRgb?: BlendEquation, // BlendEquation.ADD,
            equationAlpha?: BlendEquation, // BlendEquation.ADD,
            functionSourceRgb?: BlendFunction, // BlendFunction.ONE,
            functionSourceAlpha?: BlendFunction, // BlendFunction.ONE,
            functionDestinationRgb?: BlendFunction, // BlendFunction.ZERO,
            functionDestinationAlpha?: BlendFunction, // BlendFunction.ZERO
        },
        stencilTest?: {
            enabled?: boolean, // false,
            frontFunction?: StencilFunction, // StencilFunction.ALWAYS,
            backFunction?: StencilFunction, // StencilFunction.ALWAYS,
            reference?: number; // 0,
            mask?: number; // ~0,
            frontOperation?: {
                fail?: StencilOperation, // StencilOperation.KEEP,
                zFail?: StencilOperation, // StencilOperation.KEEP,
                zPass?: StencilOperation, // StencilOperation.KEEP
            },
            backOperation?: {
                fail?: StencilOperation, // StencilOperation.KEEP,
                zFail?: StencilOperation, // StencilOperation.KEEP,
                zPass?: StencilOperation, // StencilOperation.KEEP
            }
        },
        sampleCoverage?: {
            enabled?: boolean, // false,
            value?: number, // 1.0,
            invert?: boolean, // false
        }
    }

    namespace RenderState {
        function fromCache(options: RenderStateOptions): RenderState;
    }

    namespace Appearance {
        /**
         * 
         * @param translucent 是否是透明的？透明对象的depthMask设为false，blending设为ALPHA_BLEND
         * @param closed 是否为封闭体，如果是封闭体，会开启背面裁剪 cull { enabled: true, face: CullFace.BACK }
         * @param existing 是否和一个已存在的RenderState进行合并，已存在的RenderState不做修改
         */
        function getDefaultRenderState(translucent: boolean, closed: boolean, existing?: RenderStateOptions): RenderStateOptions;
    }


    const enum Pass {
        ENVIRONMENT = 0,
        COMPUTE = 1,
        GLOBE = 2,
        TERRAIN_CLASSIFICATION = 3,
        CESIUM_3D_TILE = 4,
        CESIUM_3D_TILE_CLASSIFICATION = 5,
        CESIUM_3D_TILE_CLASSIFICATION_IGNORE_SHOW = 6,
        OPAQUE = 7,
        TRANSLUCENT = 8,
        OVERLAY = 9,
        NUMBER_OF_PASSES = 10,
    }

    // interface DrawCommandOptions 

    interface DrawCommand {

    }

    var DrawCommand: {
        prototype: DrawCommand;
        new(options: {
            // boundingVolume: BoundingVoluem;
            cull?: boolean;
            occlude?: boolean;
            modelMatrix: Matrix4;
            primitiveType?: PrimitiveType; // TRIANGLES
            vertexArray: VertexArray;
            count?: number;
            offset?: number;
            instanceCount?: number; // 0
            shaderProgram: ShaderProgram;
            uniformMap?: UniformMap;
            renderState: RenderState;
            // framebuffer: ;
            pass: Pass;
            // executeInClosestFrustum: boolean;
            owner?: any;
            debugShowBoundingVolume?: boolean;
            castShadows?: boolean; // false;
            receiveShadows?: boolean; // false
            pickId?: any;
            pickOnly?: boolean; // false
            depthForTranslucentClassification?: boolean; // false
        }): Texture;
    };

    interface ShadowMap {

    }

    interface FrameState {
        context: Context;
        commandList: DrawCommand[];
        shadowMaps: ShadowMap[];
        // brdfLutGenerator
        // environmentMap
        // sphericalHarmonicCoefficients
        // specularEnvironmentMaps
        mode: SceneMode;
        morphTime: number;
        frameNumber: number; // 0
        newFrame: boolean;
        time: JulianDate;
        // jobScheduler
        // mapProjection
        camera: Camera;
        cameraUnderground: boolean;
        // globeTranslucencyState
        // cullingVolume
        // occluder
        maximumScreenSpaceError: number; // 2
        pixelRatio: number; // 1.0
        passes: {
            render: boolean;
            pick: boolean;
            depth: boolean;
            postProcess: boolean;
            offscreen: boolean;
        };
        // creditDisplay
        afterRender: (() => void)[];
        scene3DOnly: boolean;
        // fog: FrameState.Fog
        terrainExaggeration: number; // 1.0
        imagerySplitPosition: number;
        // frustumSplits
        // light
        // minimumDisableDepthTestDistance
        // invertClassification
        useLogDepth: boolean;
        // tilesetPassState
        minimumTerrainHeight: number; // 0.0
    }

    interface Buffer {
        copyFromArrayView(arrayView: ArrayBufferView, offsetInBytes?: number): void;
        readonly sizeInBytes: number;
        readonly usage: BufferUsage;
    }

    // const enum IndexDatatype {
    //     /**
    //      * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
    //      * of an element in <code>Uint8Array</code>.
    //      */
    //     UNSIGNED_BYTE = WebGLConstants.UNSIGNED_BYTE,
    //     /**
    //      * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
    //      * of an element in <code>Uint16Array</code>.
    //      */
    //     UNSIGNED_SHORT = WebGLConstants.UNSIGNED_SHORT,
    //     /**
    //      * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
    //      * of an element in <code>Uint32Array</code>.
    //      */
    //     UNSIGNED_INT = WebGLConstants.UNSIGNED_INT
    // }

    interface IndexBuffer extends Buffer {
        indexDatatype: IndexDatatype;
        bytesPerIndex: number;
        numberOfIndices: number;
    }

    namespace Buffer {
        function createVertexBuffer(options: {
            context: Context;
            typedArray: ArrayBufferView;
            usage: BufferUsage;
        }): Buffer;

        function createIndexBuffer(options: {
            context: Context;
            typedArray: Uint8Array | Uint16Array | Uint32Array;
            usage: BufferUsage;
            indexDatatype: IndexDatatype;
        }): IndexBuffer;
    }
}
