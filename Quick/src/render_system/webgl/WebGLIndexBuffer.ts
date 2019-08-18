namespace QE {

    const enum IndexType {
        Int16,
        Int32,
    }

    export class WebGLIndexBuffer {

        private _buffer: WebGLBuffer;
        public _usage: BufferUsage;

        private _count: number;

        public get count() {
            return this._count;
        }

        public _data: Uint16Array;

        public constructor(numIndexes: number, usage: BufferUsage, useShadowBuffer: boolean) {

            this._data = new Uint16Array(numIndexes);
            this._count = numIndexes;
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

        public dispose() {
            if (this._buffer) {
                gl.deleteBuffer(this._buffer);
                this._buffer = undefined;
            }
            if (this._data) {
                this._data = undefined;
            }
        }

        public writeData(data: number[]) {
            this._data.set(data);
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
