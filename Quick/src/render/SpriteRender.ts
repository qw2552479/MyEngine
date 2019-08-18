///<reference path="../res/prefab/serialize/Serializer.ts"/>
namespace QE {

    export class SpriteRender extends Renderable {

        private _flipX = false;
        private _flipY = false;

        private _skewX = 0;
        private _skewY = 0;

        private _pivot: Vector2 = new Vector2(0, 0);
        private _pixelsPerUnit: number;

        @SerializeField('number')
        public get flipX(): boolean {
            return this._flipX;
        }

        public set flipX(val: boolean) {
            this._flipX = val;
        }

        @SerializeField('number')
        public get flipY(): boolean {
            return this._flipY;
        }

        public set flipY(val: boolean) {
            this._flipY = val;
        }

        @SerializeField('number')
        public get skewX(): number {
            return this._skewX;
        }

        public set skewX(val: number) {
            this.skewX = val;
        }

        @SerializeField('number')
        public get skewY(): number {
            return this._skewY;
        }

        public set skewY(val: number) {
            this._skewY = val;
        }

        @SerializeField('number')
        public get pivot(): Vector2 {
            return this._pivot;
        }

        public set pivot(val: Vector2) {
            this._pivot = val;
        }

        @SerializeField('number')
        public get pixelsPerUnit(): number {
            return this._pixelsPerUnit;
        }

        public set pixelsPerUnit(val: number) {
            this._pixelsPerUnit = val;
        }

        public constructor() {
            super();

            const material = SpriteMaterial.getDefaultSpriteMaterial();
            this._material = material;

            const renderOp = new RenderOperation();
            renderOp.primCount = 6;
            renderOp.renderOpType = RenderOperationType.TRIANGLE_LIST;

            const posBuf = WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, BufferUsage.DYNAMIC);
            posBuf.type = gl.FLOAT;
            posBuf.semantic = VertexElementSemantic.POSITION;
            posBuf.vertexCount = 12;
            posBuf.writeData((new Float32Array([
                0.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 1.0, 0.0,
                0.0, 1.0, 0.0]).buffer)
            );

            const colBuf = WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, BufferUsage.DYNAMIC);
            colBuf.type = gl.UNSIGNED_BYTE;
            colBuf.semantic = VertexElementSemantic.DIFFUSE;
            colBuf.vertexCount = 16;
            colBuf.writeData((new Uint8Array([
                255, 255, 255, 255,
                255, 255, 255, 255,
                255, 255, 255, 255,
                255, 255, 255, 255])).buffer);

            const texBuf = new WebGLVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, BufferUsage.DYNAMIC);
            texBuf.type = gl.FLOAT;
            texBuf.semantic = VertexElementSemantic.TEXTURE_COORDINATES;
            texBuf.vertexCount = 8;
            texBuf.writeData((new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])).buffer);

            renderOp.vertexBuffers = [];
            renderOp.vertexBuffers[0] = posBuf;
            renderOp.vertexBuffers[1] = colBuf;
            renderOp.vertexBuffers[2] = texBuf;

            const indexBuffer = WebGLBufferManager.instance.createIndexBuffer(6, BufferUsage.DYNAMIC, true);
            indexBuffer.writeData([0, 2, 3, 0, 1, 2]);
            indexBuffer.bindBuffer();
            renderOp.indexBuffer = indexBuffer;

            this._renderOp = renderOp;
        }

        public isMultiMaterial(): boolean {
            return false;
        }

        public getRenderOperation(): RenderOperation {
            if (!this._material) {
                return null;
            }
            return this._renderOp;
        }

        public getWorldTransforms(): Matrix4 {
            return this.transform.localToWorldMatrix;
        }
    }
}
