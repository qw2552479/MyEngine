///<reference path="../object/Node.ts" />
namespace QuickEngine {

    // 朝向
    export const enum OrientationMode {
        DEGREE_0 = 0,
        DEGREE_90 = 1,
        DEGREE_180 = 2,
        DEGREE_270 = 3,

        PORTRAIT = DEGREE_0,
        LANDSCAPERIGHT = DEGREE_90,
        LANDSCAPELEFT = DEGREE_270
    };

    /*
    * @param 投影类型
    */
    export const enum ProjectionType {
        ORTHOGRAPHIC,   //正交投影
        PERSPECTIVE     //透视投影
    };

    // 视锥体面
    export const enum FrustumPlane {
        FRUSTUM_PLANE_NEAR = 0,
        FRUSTUM_PLANE_FAR = 1,
        FRUSTUM_PLANE_LEFT = 2,
        FRUSTUM_PLANE_RIGHT = 3,
        FRUSTUM_PLANE_TOP = 4,
        FRUSTUM_PLANE_BOTTOM = 5
    }

    export class Frustum extends Node {

        public RenderOp: RenderOperation;
        public CurrentShader: Shader;

        private _projectionType: ProjectionType = ProjectionType.PERSPECTIVE;

        private _frustumPlanes: Plane[];

        public constructor() {

            super();

            let planes = [];
            for (let i = 0; i < 6; i++) {
                planes.push(new Plane());
            }

            this._frustumPlanes = planes;
        }

        public updateRenderQueue(renderQueue: RenderQueue) {

        }

        public preRender(/*SceneManager * sm, RenderSystem * rsys*/) {

        }

        public postRender(/*SceneManager * sm, RenderSystem * rsys*/) {

        }

        public getMaterial(): Material {
            return null;
        }

        public getRenderOperation(): RenderOperation {
            return null;
        }

        public getWorldTransforms(): Matrix4 {
            return null;
        }
    }

}