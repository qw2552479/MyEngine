namespace QE {
    export class WebGLIndexBuffer {
        private readonly _usage: BufferUsage;
        private _buffer: WebGLBuffer;
        public _data: Uint16Array;

        public get count() {
            return this._data.length;
        }

        public constructor(indexes: number[], usage: BufferUsage, useShadowBuffer: boolean) {
            this._data = new Uint16Array(indexes);
            this._usage = usage;

            this.createBuffer();
        }

        public createBuffer(): void {
            const buffer = gl.createBuffer();
            if (!buffer) {
                throw new Error('Failed to create buffer');
            }
            this._buffer = buffer;
        }

        public getGLIndexBuffer(): WebGLBuffer {
            return this._buffer;
        }

        public destroy() {
            if (this._buffer) {
                gl.deleteBuffer(this._buffer);
                this._buffer = undefined;
            }
            if (this._data) {
                this._data = undefined;
            }
        }

        public bindBuffer() {
            if (!this._buffer || !this._data) {
                return;
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._data, WebGLBufferManager.getGLUsage(this._usage));
        }
    }
}
