///<reference path="Component.ts" />
namespace QE {
    export const enum CameraType {
        Perspective,
        Orthogonal,
        VR
    }

    export const enum ClearFlags {
        SkyBox,
        SolidColor,
        DepthOnly,
        DontClear
    }

    /*
    * 可见性类型
    */
    export const enum VisibilityType {
        NONE, // 完全不可见
        FULL, // 完全可见
        PARTIAL, // 部分可见
    }

    const DEFAULT_FOV = 45;
    const DEFAULT_ASPECT = 1;
    const DEFAULT_NEAR = 0.1;
    const DEFAULT_FAR = 100;

    export class Camera extends Component {
        public static MainCamera: Camera;

        protected _cameraType: CameraType;
        protected _clearFlags: ClearFlags = ClearFlags.SkyBox;

        // perspective
        protected _fovY: number;
        protected _near: number;
        protected _far: number;
        protected _aspect: number;

        // orth
        protected _viewport: Viewport;
        protected _orthoWidth: number;
        protected _orthoHeight: number;

        protected _projMatrix: Matrix4;

        protected _isDirty: boolean;
        protected _viewportDirty: boolean;

        private readonly _renderContext: RenderContext;
        private _renderTarget: RenderTarget;

        public constructor() {

            super();

            this._fovY = DEFAULT_FOV; // fovY: (0, 180) fovY = atan(（(r - l) / 2） / n)
            this._near = DEFAULT_NEAR;
            this._far = DEFAULT_FAR;
            this._aspect = DEFAULT_ASPECT;

            this._isDirty = true;
            this._viewportDirty = false;

            this._projMatrix = new Matrix4();

            this._viewport = {
                x: 0, y: 0, w: 1, h: 1
            };

            this._cameraType = CameraType.Perspective;

            this._renderContext = new RenderContext(this);
        }

        public get renderContext(): RenderContext {
            return this._renderContext;
        }

        public setCameraType(cameraType: CameraType) {
            if (this._cameraType != cameraType) {
                this._cameraType = cameraType;
                this._isDirty = true;
            }
        }

        public getCameraType() {
            return this._cameraType;
        }

        public setFOV(fovY: number) {
            if (this._fovY != fovY) {
                this._fovY = fovY;
                this._viewportDirty = true;
            }
        }

        public getFOV(): number {
            return this._fovY;
        }

        public setNearClip(near: number) {
            if (this._near != near) {
                this._near = near;
                this._viewportDirty = true;
            }
        }

        public getNearClip() {
            return this._near;
        }

        public setFarClip(far: number) {
            if (this._far != far) {
                this._far = far;
                this._viewportDirty = true;
            }
        }

        public getFarClip() {
            return this._far;
        }

        public setAspect(aspect: number) {
            if (this._aspect != aspect) {
                this._aspect = aspect;
                this._viewportDirty = true;
            }
        }

        public getAspect(): number {
            return this._aspect;
        }

        public setOrthoWidth(w: number): void {
            this._orthoWidth = w;
            this._isDirty = true;
        }

        public setOrthoHeight(h: number): void {
            this._orthoHeight = h;
            this._isDirty = true;
        }

        public set viewPort(val: Viewport) {
            this._viewport = val;
        }

        public get viewPort() {
            return this._viewport;
        }

        public getViewMatrix(): Matrix4 {
            console.assert(!!this.transform);
            return this.transform.localToWorldMatrix;
        }

        public getProjMatrix(): Matrix4 {
            this._update();
            return this._projMatrix;
        }

        public get renderTarget(): RenderTarget {
            return this._renderTarget;
        }

        public set renderTarget(val: RenderTarget) {
            this._renderTarget = val;
        }

        private _update(): void {

            if (!this._isDirty) {
                return;
            }

            const far = this._far;
            const near = this._near;
            const viewport = this._viewport;

            let left = viewport.x;
            let right = viewport.x + viewport.w * Screen.screenWidth;
            let top = viewport.y + viewport.h * Screen.screenHeight;
            let bottom = viewport.y;

            if (this._cameraType === CameraType.Orthogonal) {
                const half_w = this._orthoWidth * 0.5;
                const half_h = this._orthoHeight * 0.5;

                left = -half_w;
                right = +half_w;
                bottom = -half_h;
                top = +half_h;
            }

            switch (this._cameraType) {
                case CameraType.Orthogonal:
                    Matrix4.makeOrthoRH(left, right, bottom, top, near, far, this._projMatrix);
                    break;
                case CameraType.Perspective:
                    Matrix4.makePerspectiveFovRH(this._fovY, this._aspect, this._near, this._far, this._projMatrix);
                    break;
                default:
                    console.warn('unkonw camera type: ' + this._cameraType);
                    break;
            }

            this._isDirty = false;
        }
    }

}
