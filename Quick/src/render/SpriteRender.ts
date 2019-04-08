namespace QuickEngine {

    export class SpriteRender extends Renderable {

        public static __ClassName__ = "QuickEngine.SpriteRender";
        public static __ClassID__ = 0;

        private _material: Material;
        private _renderOp: RenderOperation;

        public constructor() {
            super();    

            let defmaterial = SpriteMaterial.getDefaultSpriteMaterial();
            this._material = defmaterial;

            let renderOp = new RenderOperation();
            renderOp.primCount = 6;
            renderOp.renderOpType = RenderOperationType.TRIANGLE_LIST;

            let posBuf = WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, BufferUsage.DYNAMIC);
            posBuf.type = gl.FLOAT;
            posBuf.semantic = VertexElementSemantic.POSITION;
            posBuf.vertexCount = 12;
            posBuf.writeData((new Float32Array([
                0.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 1.0, 0.0,
                0.0, 1.0, 0.0]).buffer)
            );

            let colBuf = WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, BufferUsage.DYNAMIC);
            colBuf.type = gl.UNSIGNED_BYTE;
            colBuf.semantic = VertexElementSemantic.DIFFUSE;
            colBuf.vertexCount = 16;
            colBuf.writeData((new Uint8Array([
                255, 255, 255, 255,
                255, 255, 255, 255,
                255, 255, 255, 255,
                255, 255, 255, 255])).buffer);

            let texBuf = new WebGLVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, BufferUsage.DYNAMIC);
            texBuf.type = gl.FLOAT;
            texBuf.semantic = VertexElementSemantic.TEXTURE_COORDINATES;
            texBuf.vertexCount = 8;
            texBuf.writeData((new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])).buffer);

            renderOp.vertexBuffers = [];
            renderOp.vertexBuffers[0] = posBuf;
            renderOp.vertexBuffers[1] = colBuf;
            renderOp.vertexBuffers[2] = texBuf;

            let indexBuffer = WebGLBufferManager.instance.createIndexBuffer(6, BufferUsage.DYNAMIC, true);
            indexBuffer.writeData([0, 2, 3, 0, 1, 2]);
            indexBuffer.bindBuffer();
            renderOp.indexBuffer = indexBuffer;

            this._renderOp = renderOp;
        }

        public setMaterial(material: Material) {
            if (this._material == material) {
                return;
            }
            this._material = material;
        }

        public getMaterial(): Material {
            return this._material;
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