namespace QE {

    export const enum RenderOperationType {
        // A list of points, 1 vertex per point
        POINT_LIST,
        // A list of lines, 2 vertices per line
        LINE_LIST,
        // A strip of connected lines, 1 vertex per line plus 1 start vertex
        LINE_STRIP,
        // A list of triangles, 3 vertices per triangle
        TRIANGLE_LIST,
        // A strip of triangles, 3 vertices for the first triangle, and 1 per triangle after that
        TRIANGLE_STRIP,
        // A fan of triangles, 3 vertices for the first triangle, and 1 per triangle after that
        TRIANGLE_FAN,
    }

    export class RenderOperation {

        public indexBuffer: WebGLIndexBuffer;
        public vertexBuffers: WebGLVertexBuffer[] = []; // 顶点缓冲数组, 颜色缓冲,深度缓冲,模板缓冲
        public renderOpType: RenderOperationType = RenderOperationType.TRIANGLE_LIST;
        public primCount: number;
        public numberOfInstances = 0;

        public constructor() {

        }
    }

    @DisallowMultipleComponent
    export abstract class Renderable extends Component {
        protected _material: Material;
        protected _materials: Material[];
        protected _renderOp: RenderOperation;
        protected _renderOps: RenderOperation[];

        protected _isLighting: boolean;
        protected _castShadow: boolean;

        public setLighting(lighting: boolean): void {
            this._isLighting = lighting;
        }

        public isLighting(): boolean {
            return this._isLighting;
        }

        public setCastShadow(castShadow: boolean): void {
            this._castShadow = castShadow;
        }

        public isCastShadow(): boolean {
            return this._castShadow;
        }

        public abstract getWorldTransforms(): Matrix4;

        public abstract isMultiMaterial(): boolean;

        public setMaterial(mat: Material): void {
            if (mat === this._material) {
                return;
            }
            this._material = mat;
        }

        public getMaterial(): Material {
            return this._material;
        }

        public getMaterials(): Material[] {
            return this._materials;
        }

        public getRenderOperation(): RenderOperation {
            return this._renderOp;
        }

        public getRenderOperations(): RenderOperation[] {
            return this._renderOps;
        }

        public removeMaterial(material: Material) {
            const index = this._materials.indexOf(material);
            if (index > 0) {
                this._materials.splice(index, 1);
            }
        }

        public removeMaterialByIndex(index: number) {
            this._materials.splice(index, 1);
        }
    }
}
