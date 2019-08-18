///<reference path="../render_system/Renderable.ts" />
namespace QE {

    export class DebugRender extends Renderable {

        public mesh: Mesh;

        public constructor() {
            super();

            this._renderOp = new RenderOperation();
        }

        public isMultiMaterial(): boolean {
            return false;
        }

        public setMaterial(material: Material) {
            if (this._material === material) {
                return;
            }
            this._material = material;
        }

        public getMaterial(): Material {
            return this._material;
        }

        public getRenderOperation(): RenderOperation {
            return this._renderOp;
        }

        public getWorldTransforms(): Matrix4 {
            return this.transform.localToWorldMatrix;
        }

    }

}
