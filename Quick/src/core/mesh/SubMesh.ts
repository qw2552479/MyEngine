namespace QE {

    export class SubMesh {
        // 使用共享顶点
        public useSharedVertices: boolean;
        public vertexData: WebGLVertexBuffer[];
        public indexData: WebGLIndexBuffer;

        public renderOpType: RenderOperationType;

        // 顶点动画类型
        protected vertexAnimationType: VertexAnimationType;

        public parent: Mesh;

        // 使用的材质名称
        protected _materialName: string;

        public set materialName(val: string) {
            this._materialName = val;
        }

        public get materialName() {
            return this._materialName;
        }

        public constructor() {

        }

        /**
         * 复制一个新的SubMesh
         * @param newName 新的SubMesh名称
         * @param parentMesh 新的Submesh父Mesh, 如果为空, 父Mesh为被克隆的Mesh父Mesh
         */
        public clone(newName: string, parentMesh?: Mesh) {
            if (parentMesh) {
                const newSubMesh: SubMesh = parentMesh.createSubMesh(newName);
            } else {
                const newSubMesh: SubMesh = this.parent.createSubMesh(newName);
            }
        }

        public getRenderOperation(renderOp: RenderOperation) {
            renderOp.indexBuffer = this.indexData;
            renderOp.renderOpType = this.renderOpType;
            renderOp.vertexBuffers = this.useSharedVertices ? this.parent.sharedVertexData : this.vertexData;
        }
    }
}
