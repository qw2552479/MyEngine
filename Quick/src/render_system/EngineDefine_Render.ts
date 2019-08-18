namespace QE {

    /// Vertex element semantics, used to identify the meaning of vertex buffer contents
    export const enum VertexElementSemantic {
        /// Position, 3 reals per vertex
        POSITION = 1,
        /// Blending weights
        BLEND_WEIGHTS = 2,
        /// Blending indices
        BLEND_INDICES = 3,
        /// Normal, 3 reals per vertex
        NORMAL = 4,
        /// Diffuse colours
        DIFFUSE = 5,
        /// Specular colours
        SPECULAR = 6,
        /// Texture coordinates
        TEXTURE_COORDINATES = 7,
        /// Binormal (Y axis if normal is Z)
        BINORMAL = 8,
        /// Tangent (X axis if normal is Z)
        TANGENT = 9,
        /// The  number of VertexElementSemantic elements (note - the first value VES_POSITION is 1)
        COUNT = 9
    }

    /// Vertex element type, used to identify the base types of the vertex contents
    export const enum VertexElementType {
        FLOAT1 = 0,
        FLOAT2 = 1,
        FLOAT3 = 2,
        FLOAT4 = 3,
        /// alias to more specific colour type - use the current render_system's colour packing
        COLOUR = 4,
        SHORT1 = 5,
        SHORT2 = 6,
        SHORT3 = 7,
        SHORT4 = 8,
        UBYTE4 = 9,
        /// D3D style compact colour
        COLOUR_ARGB = 10,
        /// GL style compact colour
        COLOUR_ABGR = 11,
        DOUBLE1 = 12,
        DOUBLE2 = 13,
        DOUBLE3 = 14,
        DOUBLE4 = 15,
        USHORT1 = 16,
        USHORT2 = 17,
        USHORT3 = 18,
        USHORT4 = 19,
        INT1 = 20,
        INT2 = 21,
        INT3 = 22,
        INT4 = 23,
        UINT1 = 24,
        UINT2 = 25,
        UINT3 = 26,
        UINT4 = 27
    }

    // ===================== 纹理相关定义 =====================
    // 纹理类型
    export const enum TextureType {
        TEXTURE_2D,
        TEXTURE_2D_ARRAY,
        TEXTURE_3D,
        TEXTURE_CUBE_MAP,
    }

    export const enum FilterMode {
        Point,
        Bilinear,
        Trilinear
    }

    export const enum WrapMode {
        Clamp,
        Repeat
    }

    // 纹理基本格式
    export const enum PixelFormat {
        UNKNOWN,
        RED,
        RG,
        RGB,
        RGBA,
        LUMINANCE,
        LUMINANCE_ALPHA,
        ALPHA,
        DEPTH_COMPONENT,
        DEPTH_STENCIL,
        RED_INTEGER,
        RG_INTEGER,
        RGB_INTEGER,
        RGBA_INTEGER
    }

    // 像素数据类型
    export const enum DataType {
        GL_UNSIGNED_BYTE,
        GL_BYTE,
        GL_UNSIGNED_SHORT,
        GL_SHORT,
        GL_UNSIGNED_INT,
        GL_INT,
        GL_HALF_FLOAT,
        GL_FLOAT,
        GL_UNSIGNED_SHORT_5_6_5,
    }

    // 像素解包类型 glPixelStorei使用
    export const enum PixelUnpackType {
        UNPACK_ALIGNMENT,
        UNPACK_COLORSPACE_CONVERSION_WEBGL,
        UNPACK_FLIP_Y_WEBGL,
        UNPACK_PREMULTIPLY_ALPHA_WEBGL,
    }

    // 像素打包类型 glReadPixels使用
    export const enum PixelPackType {
        PACK_ALIGNMENT
    }

    export const enum BufferUsage {
        STATIC = 1,
        DYNAMIC = 2,
        WRITE_ONLY = 4,
        DISCARDABLE = 8,
        // Combination of HBU_STATIC and HBU_WRITE_ONLY
        STATIC_WRITE_ONLY = 5,
        DYNAMIC_WRITE_ONLY = 6,
        /// Combination of HBU_DYNAMIC, HBU_WRITE_ONLY and HBU_DISCARDABLE
        DYNAMIC_WRITE_ONLY_DISCARDABLE = 14,
    }

    // ===================== 纹理相关定义 =====================
    export const enum ShaderType {
        Vertex,
        Fragment
    }

    // 裁剪模式
    export const enum CullMode {
        NONE,
        FRONT,
        BACK,
        OVERLAPPED
    }

    // 填充模式
    export const enum FillMode {
        POINT,
        FRAME,
        SOLID
    }

    // 混合模式
    export const enum BlendMode {
        Normal,
        OPACITY,
        ALPHA_TEST,
        ALPHA_BLEND,
        ADD,
        MUL,
        OVERLAPPED,
    }

    // 深度检测
    export const enum DepthCheck {
        NONE,
        CHECK_ONLY,
        CHECK_WRITE,
        OVERLAPPED,
    }

    // 颜色掩码
    export const enum ColorMask {
        NONE = 0,
        RED = 1,
        GREEN = 2,
        BLUE = 4,
        ALPHA = 8,
        ALL = RED | GREEN | BLUE | ALPHA,
    }

    export const enum ClearMask {
        None = 0,
        COLOR_BUFFER_BIT = 1 << 0,
        DEPTH_BUFFER_BIT = 1 << 1,
        STENCIL_BUFFER_BIT = 1 << 2,
        ALL = COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT | STENCIL_BUFFER_BIT
    }

    // 渲染状态
    export class RenderState {

        // 剔除模式
        cullMode: CullMode;
        // 混合模式
        blendMode: BlendMode;
        // 深度检查
        depthCheck: DepthCheck;
        // 颜色缓冲区分量掩码
        colorMask: ColorMask;

        constructor() {
            this.cullMode = CullMode.BACK;
            this.blendMode = BlendMode.Normal;
            this.depthCheck = DepthCheck.CHECK_WRITE;
            this.colorMask = ColorMask.ALL;
        }
    }

    export interface Viewport {
        x: number;
        y: number;
        w: number;
        h: number;
    }
}
