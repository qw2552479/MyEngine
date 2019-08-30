///<reference path="MeshRender.ts" />
namespace QE {

    export class SkinedMeshRender extends Renderable {

        public mesh: Mesh;

        public bones: Transform[];
        // public Bounds localBounds { get; set; }
        // public SkinQuality quality { get; set; }
        public rootBone: Transform; // { get; set; }
        public sharedMesh: Mesh; // { get; set; }
        public updateWhenOffscreen: boolean; // { get; set; }
        // public void BakeMesh(Mesh mesh);
        public GetBlendShapeWeight(index: number): number {
            return 0;
        }

        public SetBlendShapeWeight(index: number, value: number) {

        }

        public constructor() {
            super();
            this._materials = [];
            this._renderOp = new RenderOperation();
        }

        public isMultiMaterial(): boolean {
            return true;
        }

        public getRenderOperation(): RenderOperation {
            if (!this.mesh) {
                return null;
            }

            const renderOp = this._renderOp;
            const subMeshes = this.mesh.subMeshes;
            for (let i = 0, len = subMeshes.length; i < len; i++) {
                const subMesh = subMeshes[i];
                subMesh.getRenderOperation(renderOp);
            }

            return renderOp;
        }

        public getWorldTransforms(): Matrix4 {
            return this.transform.localToWorldMatrix;
        }
    }
}
