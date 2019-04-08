namespace QuickEngine {

    export class WebGLVertexBuffer {

        //
        public webGLBuffer: WebGLBuffer;

        // 顶点属性的分量数量, 有效值为[1, 4]
        public _size: number;

        // 顶点索引I和(I+1)表示的顶点数据间的位移.
        public _stride: number;
        public _normalized: boolean;

        public _usage: BufferUsage;
        public _data: ArrayBuffer;
        
        public type: VertexElementType;//顶点缓冲数据类型
        public semantic: VertexElementSemantic;//顶点数据语义, 指明此顶点代表哪种类型的顶点

        public vertexCount: number = 0;

        /**
         * 
         * @param stride 相邻两个顶点间的字节数
         * @param size 缓冲区中每个顶点分量个数 (1-4)
         * @param usage
         */
        public constructor(stride: number, size: number, normalize: boolean, usage: BufferUsage) {            
            this._stride = stride;
            this._size = size;
            this._usage = usage;
            this._normalized = normalize;

            this.createBuffer();
        }

        public dispose() {
            if (this._data) {
                this._data = undefined;
            }
            this.destroyBuffer();
        }

        public getGLBuffer(): WebGLBuffer {
            return this.webGLBuffer;
        }

        protected createBuffer() {
            let buf = gl.createBuffer();
            GL_CHECK_ERROR();

            if (!buf) {
                throw new Error("无法创建WebGLBuffer");
            }

            this.webGLBuffer = buf;
        }

        protected destroyBuffer() {
            if (this.webGLBuffer) {
                gl.deleteBuffer(this.webGLBuffer);
                this.webGLBuffer = undefined;

                GL_CHECK_ERROR();
            }
        }

        public writeData(data: ArrayBuffer) {
            this._data = data;
        }

        public bindBuffer() {
            if (!this.webGLBuffer || !this._data) {
                return;
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.webGLBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this._data, WebGLBufferManager.getGLUsage(this._usage));
        }
    }

}