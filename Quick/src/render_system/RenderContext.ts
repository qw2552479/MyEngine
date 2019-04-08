namespace QuickEngine {

    export class RenderContext {

        private _name: string;
        private _isEnable: boolean;

        protected _camera: Camera;
        protected _clearMode: ClearMask = ClearMask.ALL;// 清除缓冲类型
        protected _clearColor: Number4 = [0, 0, 0, 1];// 清屏颜色
        protected _clearDepth: number; // 清除深度
        protected _clearStencil: number; // 清除模板
        protected _visibleCuller;// 可见裁剪对象
        protected _shaderProvider;// shader供应器
        protected _renderPipeline: RenderPipeline;// 渲染管道

        constructor(camera: Camera, name?: string) {
            this._name = name;
            this._camera = camera;
            this._renderPipeline = new RenderPipeline();
        }

        public get name(): string {
            return this._name
        }

        public set enable(enable: boolean) {
            this._isEnable = enable;
        }

        public get enable() {
            return this._isEnable;
        }

        public set renderPipeline(renderPipeline: RenderPipeline) {
            this._renderPipeline = renderPipeline;
        }

        public get renderPipeline(): RenderPipeline {
            return this._renderPipeline;
        }

        // TODO: 删除此处
        public set camera(camera: Camera) {
            this._camera = camera;
        }

        public get camera() {
            return this._camera;
        }

        public setColorClear(clearMode: ClearMask, clearColor: Number4, depth: number = 1, stencil: number = 0) {
            this._clearMode = clearMode;
            this._clearColor = clearColor;
            this._clearDepth = depth;
            this._clearStencil = stencil;
        }
        // 渲染步骤
        /**
        1.设置帧缓冲
        2.清除缓冲区状态
        3.使用shader
        4.绑定顶点和属性
        5.裁剪测试
        6.设置混合模式
        7.提交数据
         */
        public doRender() {

            // 没有摄像机就不需要渲染了
            let camera = this._camera;
            if (!camera) {
                return;
            }

            let viewport = camera.viewPort;
            if (viewport.w == 0 || viewport.h == 0) {
                return;
            }

            // 剔除不可见物体
            let children = SceneManager.instance.currentScene.children;

            let renderSystem = RenderSystem.instance;

            // 设置rendertarget
            renderSystem.setRenderTarget(camera.renderTarget);

            // 清除缓冲区   
            renderSystem.clear(this._clearMode, this._clearColor, this._clearDepth, this._clearStencil);

            // 设置视口
            renderSystem.setViewport(viewport);

            // 设置相机
            renderSystem.setCamera(camera);

            // 管道渲染
            if (this._renderPipeline)
                this._renderPipeline.doRender(this);
        }        

        public readPixels(x: number, y: number, w: number, h: number, format: number, type: number, pixels: ArrayBufferView) {
            let renderSystem = RenderSystem.instance;

            renderSystem.setRenderTarget(this._camera.renderTarget);
            renderSystem.readPixels(x, y, w, h, format, type, pixels);
        }
    }

}