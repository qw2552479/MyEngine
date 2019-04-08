namespace QuickEngine {

    export class WebGLBufferManager {

        private static _sInstance: WebGLBufferManager;
        public static get instance(): WebGLBufferManager {
            console.assert(!!WebGLBufferManager._sInstance);
            return this._sInstance;
        }

        public static set instance(value: WebGLBufferManager) {
            
        }

        protected _indexBuffers: WebGLIndexBuffer[];
        protected _vertexBuffers: WebGLVertexBuffer[];

        public constructor() {

            WebGLBufferManager._sInstance = this;

            this._indexBuffers = [];
            this._vertexBuffers = [];
        }

        public createIndexBuffer(numIndexes: number, usage: BufferUsage, useShadowBuffer: boolean): WebGLIndexBuffer {
            let buf: WebGLIndexBuffer = new WebGLIndexBuffer(numIndexes, usage, useShadowBuffer);
            this._indexBuffers.push(buf);
            return buf;
        }

        public createVertexBuffer(stride: number, count: number, normalize: boolean, usage: BufferUsage): WebGLVertexBuffer {
            let buf: WebGLVertexBuffer = new WebGLVertexBuffer(stride, count, normalize, usage);
            this._vertexBuffers.push(buf);
            return buf;            
        }

        public static getGLUsage(usage: BufferUsage) {
            switch (usage) {
                case BufferUsage.STATIC:        return gl.STATIC_DRAW;                
                case BufferUsage.DYNAMIC:       return gl.DYNAMIC_DRAW;                
                case BufferUsage.DISCARDABLE:   return gl.STREAM_DRAW;
                default:                        return gl.DYNAMIC_DRAW;               
            }
        }
    }

}