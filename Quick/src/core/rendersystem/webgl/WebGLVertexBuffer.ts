namespace QE {

    export class WebGLVertexBuffer implements IDestroyable {

        // 顶点属性的分量数量, 有效值为[1, 4]
        public size: number;

        // 顶点索引I和(I+1)表示的顶点数据间的位移.
        public stride: number;
        public normalized: boolean;

        public type: VertexElementType; // 顶点缓冲数据类型
        public semantic: VertexElementSemantic; // 顶点数据语义, 指明此顶点代表哪种类型的顶点

        public vertexCount = 0;

        private readonly _usage: BufferUsage;
        private _data: ArrayBuffer;
        private _webGLBuffer: WebGLBuffer;

        /**
         * 构造函数
         * @param stride 相邻两个顶点间的字节数
         * @param size 缓冲区中每个顶点分量个数 (1-4)
         * @param normalize 是否归一化
         * @param usage 缓冲用例
         */
        public constructor(stride: number, size: number, normalize: boolean, usage: BufferUsage) {
            this.stride = stride;
            this.size = size;
            this._usage = usage;
            this.normalized = normalize;

            this.createBuffer();
        }

        public isDestroyed(): boolean {
            return false;
        }

        public destroy() {
            if (this._data) {
                this._data = undefined;
            }
            this.destroyBuffer();
        }

        public getGLBuffer(): WebGLBuffer {
            return this._webGLBuffer;
        }

        protected createBuffer() {
            const buf = gl.createBuffer();
            if (__QE_DEBUG__) {
                GL_CHECK_ERROR();
            }

            if (!buf) {
                throw new Error('无法创建WebGLBuffer');
            }

            this._webGLBuffer = buf;
        }

        protected destroyBuffer() {
            if (this._webGLBuffer) {
                gl.deleteBuffer(this._webGLBuffer);
                this._webGLBuffer = undefined;

                if (__QE_DEBUG__) {
                    GL_CHECK_ERROR();
                }
            }
        }

        public writeData(data: ArrayBuffer) {
            this._data = data;
        }

        public bindBuffer() {
            if (!this._webGLBuffer || !this._data) {
                return;
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this._webGLBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this._data, WebGLBufferManager.getGLUsage(this._usage));
        }
    }

}
