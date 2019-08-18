namespace QE {

    export class WebGLBufferManager {
        public static get instance(): WebGLBufferManager {
            if (!WebGLBufferManager._sInstance) {
                WebGLBufferManager._sInstance = new WebGLBufferManager();
            }
            return this._sInstance;
        }

        private constructor() {
            this._indexBuffers = [];
            this._vertexBuffers = [];
        }

        private static _sInstance: WebGLBufferManager;

        protected _indexBuffers: WebGLIndexBuffer[];
        protected _vertexBuffers: WebGLVertexBuffer[];

        public static getGLUsage(usage: BufferUsage) {
            switch (usage) {
                case BufferUsage.STATIC:
                    return gl.STATIC_DRAW;
                case BufferUsage.DYNAMIC:
                    return gl.DYNAMIC_DRAW;
                case BufferUsage.DISCARDABLE:
                    return gl.STREAM_DRAW;
                default:
                    return gl.DYNAMIC_DRAW;
            }
        }

        public init() {

        }

        public createIndexBuffer(numIndexes: number, usage: BufferUsage, useShadowBuffer: boolean): WebGLIndexBuffer {
            const buf: WebGLIndexBuffer = new WebGLIndexBuffer(numIndexes, usage, useShadowBuffer);
            this._indexBuffers.push(buf);
            return buf;
        }

        public createVertexBuffer(stride: number, count: number, normalize: boolean, usage: BufferUsage): WebGLVertexBuffer {
            const buf: WebGLVertexBuffer = new WebGLVertexBuffer(stride, count, normalize, usage);
            this._vertexBuffers.push(buf);
            return buf;
        }
    }

}
