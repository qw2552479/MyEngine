namespace QuickEngine {

    export const MAX_NUM_UNIFORM = 32;
    export const MAX_NUM_SAMPLER = 8;
    export const MAX_NUM_VELEMENT = 16;
    export const MAX_NUM_USER_CONST = 64;
    export const MAX_NUM_SHADER_PASS = 8;
    export const MAX_NUM_VERTEX_STREAM = 4;

    export abstract class RenderSystem {

        protected static _sInstance: RenderSystem;

        public static get instance(): RenderSystem {
            return RenderSystem._sInstance;
        }

        protected _renderStatedChanged: boolean;
        protected _currentRenderState: RenderState; // 当前渲染状态
        protected _textureChanged: boolean[]; // 纹理改变标记
        protected _currentTextures: Texture[]; // 当前使用纹理数组

        protected _shaderPassChanged: boolean;
        protected _currentShaderPass: WebGLShaderPass;

        protected _currentRenderTarget: RenderTarget;

        protected _viewport: Viewport; // 视口
        protected _worldMatrix: Matrix4; // 世界矩阵
        protected _viewMatrix: Matrix4; // 视图矩阵
        protected _projectionMatrix: Matrix4; // 投影矩阵
        protected _worldViewTM: Matrix4 = new Matrix4(); // 世界视图矩阵
        protected _viewProjTM: Matrix4 = new Matrix4(); // 视图投影矩阵
        protected _worldViewProjTM: Matrix4 = new Matrix4(); // 世界视图投影矩阵

        protected _textureTM: Matrix4[]; // 纹理矩阵

        protected _isTransformDirty: boolean; // 是否需要更新变换矩阵

        protected _boneCount: boolean; // 骨骼数量
        protected _boneTM: Matrix4[]; // 骨骼矩阵

        protected _cameraPosition: Vector4; // 相机位置
        protected _cameraDirection: Vector4; // 相机方向

        protected _materialEmissive: Vector4; // 自发光颜色
        protected _materialAmbient: Vector4; // 环境颜色
        protected _materialDiffuse: Vector4; // 漫反射颜色
        protected _materialSpecular: Vector4; // 反射颜色
        protected _materialOpacity: Vector4; //

        protected _lightPosition: Vector4;//光源坐标
        protected _lightDirection: Vector4;//光源方向单位向量
        protected _lightAmbient: Vector4;//环境光颜色
        protected _lightDiffuse: Vector4;//漫反射光颜色
        protected _lightSpecular: Vector4;//反射光颜色
        protected _lightAttenParam: Vector4; // 距离衰减因子K0, K1, K2, K3
        // 点光源参数 说明: Opengl3.0 第八章 顶点着色器 点光源介绍
        // direction: 规范化的点方向向量
        // exponent: 用于计算点截止因子的聚光灯指数
        // cutoffAngle: 聚光灯截止角度, 以度数表示
        protected _lightSpotParam: Vector4;

        protected _ambient: Vector4; // 环境
        protected _diffuse: Vector4; // 漫反射
        protected _specular: Vector4; // 反射

        protected _fogColor: Vector4;
        protected _fogParam: Vector4;

        protected _shaderState: Vector4;

        protected _time: Vector4;
        protected _clipPlane: Vector4;

        protected _userConst: Vector4[];

        constructor() {

            this._currentRenderState = new RenderState();
            this._renderStatedChanged = true;

            this._textureChanged = [];
            for (let i = 0; i < MAX_NUM_SAMPLER; i++) {
                this._textureChanged.push(true);
            }

            this._currentTextures = [];
            this._currentTextures.length = MAX_NUM_SAMPLER;

            this._currentShaderPass = undefined;
            this._shaderPassChanged = true;
        }

        private _clearState(): void {

        }

        public onInit(): void {

        }

        public onShutdown(): void {

        }

        public beginScene(): void {

        }

        public endScene(): void {

        }

        /**
         * 清除缓冲区
         * @param mode 要清除的缓冲区掩码
         * @param color 指定颜色缓冲区清除值
         * @param depth 指定深度缓冲区清除值
         * @param stencil 指定模板缓冲区清除值
         */
        public abstract clear(mask: ClearMask, color: Number4, depth: number, stencil: number);

        public abstract setViewport(viewPort: Viewport);

        public abstract setRenderTarget(renderTarget: RenderTarget);

        public abstract renderOperation(renderOp: RenderOperation);

        public abstract bindGpuProgram(gpuProgram: GLShaderProgram);

        public abstract onResize(w: number, h: number): void;

        public setWorldMatrix(worldMatrix: Matrix4): void {
            this._worldMatrix = worldMatrix;
            this._isTransformDirty = true;
        }

        public getWorldMatrix(): Matrix4 {
            return this._worldMatrix;
        }

        public setViewMatrix(viewMatrix: Matrix4): void {
            this._viewMatrix = viewMatrix;
            this._isTransformDirty = true;
        }

        public getViewMatrix(): Matrix4 {
            return this._viewMatrix;
        }

        public setProjectionMatrix(projectionMatrix: Matrix4): void {
            this._projectionMatrix = projectionMatrix;
            this._isTransformDirty = true;
        }

        public getProjectionMatrix(): Matrix4 {
            return this._projectionMatrix;
        }

        public getWorldViewMatrix(): Matrix4 {
            return this._worldViewTM;
        }

        public getViewProjMatrix(): Matrix4 {
            return this._viewProjTM;
        }

        public getWorldViewProjMatrix(): Matrix4 {
            return this._worldViewProjTM;
        }

        public setCamera(camera: Camera): void {

        }

        public setMaterial(material: Material): void {

        }

        public setLight(): void {

        }

        public setFog(fogColor: Color, fogNear: number, fogFar: number): void {

        }

        public setClipPlane(near: number, far: number): void {

        }

        public _setTextureUnitSettings(unit: number, tex: Texture) {
            this._setTexture(unit, true, tex);
        }

        public abstract _setTexture(unit: number, enable: boolean, tex: Texture): void;

        public setShaderPass(pass: WebGLShaderPass) {
            if (this._currentShaderPass != pass) {
                this._currentShaderPass = pass;
                this._shaderPassChanged = true;
            }
        }

        public setRenderState(cullMode: CullMode, blendMode: BlendMode, depthCheck: DepthCheck, colorMask: ColorMask) {
            this._currentRenderState.cullMode = cullMode;
            this._currentRenderState.blendMode = blendMode;
            this._currentRenderState.depthCheck = depthCheck;
            this._currentRenderState.colorMask = colorMask;
        }

        public getCurrentTextures() {
            return this._currentTextures;
        }

        public begin() {
            if (this._isTransformDirty) {

                Matrix4.multiply(this._viewMatrix, this._worldMatrix, this._worldViewTM);
                Matrix4.multiply(this._projectionMatrix, this._viewMatrix, this._viewProjTM);
                Matrix4.multiply(this._projectionMatrix, this._worldViewTM, this._worldViewProjTM);

                this._isTransformDirty = false;
            }
        }

        public end() {
        }

        public render(shader: Shader, renderable: Renderable) {

            if (!shader) {
                return;
            }

            // 准备渲染事件

            let material = renderable.getMaterial();
            let renderOp = renderable.getRenderOperation();

            this.setMaterial(material);

            let worldMatrix = renderable.getWorldTransforms();
            let tempWM = new Matrix4();
            tempWM.copyFrom(worldMatrix);
            this.setWorldMatrix(tempWM);

            // ShaderPass
            let passes = shader.shaderPasses;
            for (let i = 0, len = passes.length; i < len; ++i) {
                let pass = passes[i];
                let renderState = pass.getRenderState();

                // 设置当前shader pass
                this.setShaderPass(pass);
                // 设置渲染状态
                this.setRenderState(renderState.cullMode, renderState.blendMode, renderState.depthCheck, renderState.colorMask);

                // 设置纹理
                let samplers = pass.getSamplers();
                for (let ii = 0, len2 = samplers; ii < samplers.length; ii++) {
                    let sampler = samplers[ii];
                    switch (sampler.bindType) {
                        case SamplerBindType.SAMPLER:
                            this._setTextureUnitSettings(ii, sampler.samplerTex);
                            break;
                        default:
                            // this.setTexture(sampler.index, sampler.samplerTex);
                            break;
                    }
                }

                this.renderOperation(renderOp);
            }
        }

        public readPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: ArrayBufferView) {

        }
    }

}