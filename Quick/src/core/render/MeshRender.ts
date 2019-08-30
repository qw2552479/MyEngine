///<reference path="../rendersystem/Renderable.ts" />
namespace QE {

    export class MeshRender extends Renderable {

        protected _material: Material;

        public mesh: Mesh;

        public constructor() {
            super();
            this._materials = [];
            this._renderOp = new RenderOperation();
        }

        public isMultiMaterial(): boolean {
            return true;
        }

        public setMaterial(material: Material) {
            if (!this._material) {
                this._material = material;
            }
            this._materials.push(material);
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
