﻿///<reference path="../render_system/Renderable.ts" />
namespace QuickEngine {

    export class DebugRender extends Renderable {

        public static __ClassName__ = "QuickEngine.DebugRender";
        public static __ClassID__ = 0;

        private _material: Material;
        private readonly _renderOp: RenderOperation;

        public mesh: Mesh;

        public constructor() {
            super();

            this._renderOp = new RenderOperation();
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
            return this._renderOp;
        }

        public getWorldTransforms(): Matrix4 {
            return this.transform.localToWorldMatrix;
        }

    }

}