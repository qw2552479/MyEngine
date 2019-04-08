///<reference path="MeshRender.ts" />
namespace QuickEngine {

    export class SkinedMeshRender extends Renderable {

        public static __ClassName__ = "QuickEngine.SkinedMeshRender";
        public static __ClassID__ = 0;

        protected _currentMaterial: Material;
        protected _materials: Material[];
        protected _renderOp: RenderOperation;

        public mesh: Mesh;

        public bones: Transform[];
        //public Bounds localBounds { get; set; }
        //public SkinQuality quality { get; set; }
        public rootBone: Transform;// { get; set; }
        public sharedMesh: Mesh;// { get; set; }
        public updateWhenOffscreen: boolean;// { get; set; }
        //public void BakeMesh(Mesh mesh);
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

        public setMaterial(material: Material) {
            if (!this._currentMaterial) {
                this._currentMaterial = material;
            }
            this._materials.push(material);
        }

        public removeMaterial(material: Material) {
            let index = this._materials.indexOf(material);
            if (index > 0) {
                this._materials.splice(index, 1);
            }
        }

        public removeMaterialByIndex(index: number) {
            this._materials.splice(index, 1);
        }

        public getMaterial(): Material {
            return this._currentMaterial;
        }

        public getRenderOperation(): RenderOperation {
            if (!this.mesh)
                return null;

            let renderOp = this._renderOp;
            let subMeshes = this.mesh.subMeshes;
            for (let i = 0, len = subMeshes.length; i < len; i++) {
                let subMesh = subMeshes[i];
                subMesh.getRenderOpreation(renderOp);
            }

            return renderOp;
        }

        public getWorldTransforms(): Matrix4 {
            return this.transform.localToWorldMatrix;
        }

    }

}