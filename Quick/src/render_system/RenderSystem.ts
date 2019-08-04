namespace QuickEngine {

    export const MAX_NUM_UNIFORM = 32;
    export const MAX_NUM_SAMPLER = 8;
    export const MAX_NUM_VELEMENT = 16;
    export const MAX_NUM_USER_CONST = 64;
    export const MAX_NUM_SHADER_PASS = 8;
    export const MAX_NUM_VERTEX_STREAM = 4;

    export class RenderSystem {

        protected static _sInstance: RenderSystem;

        public static get instance(): RenderSystem {
            return RenderSystem._sInstance;
        }

        protected _renderStatedChanged: boolean;
        protected _currentRenderState: RenderState; // 当前渲染状态
        protected _textureChanged: boolean[]; // 纹理改变标记
        protected _currentTextures: Texture[]; // 当前使用纹理数组

        protected _shaderPassChanged: boolean; // shader pass改变标记。改变时，重新绑定GLProgram
        protected _currentShaderPass: WebGLShaderPass; // 当前shaderPass

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

        protected _canvas: HTMLCanvasElement;

        public constructor(div?: HTMLElement) {
            this._currentRenderState = new RenderState();
            this._renderStatedChanged = true;

            this._textureChanged = [];
            for (let i = 0; i < MAX_NUM_SAMPLER; i++) {
                this._textureChanged.push(true);
            }

            this._currentTextures = [];
            this._currentTextures.length = MAX_NUM_SAMPLER;

            this._shaderPassChanged = true;

            RenderSystem._sInstance = this;

            let canvas = document.createElement('canvas');
            canvas.width = 1280;
            canvas.height = 720;
            canvas.style.position = 'absolute';

            gl = canvas.getContext('experimental-webgl', {
                alpha: false
            }) as WebGLRenderingContext;

            if (!gl) {
                return;
            }

            this._canvas = canvas;
            div.appendChild(canvas);
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

        public clear(mask: ClearMask, color: Number4, depth: number, stencil: number) {

            if (mask == ClearMask.None) {
                return;
            }

            let glMask = 0;
            if (mask & ClearMask.COLOR_BUFFER_BIT) {
                glMask |= gl.COLOR_BUFFER_BIT;
            }
            if (mask & ClearMask.DEPTH_BUFFER_BIT) {
                glMask |= gl.DEPTH_BUFFER_BIT;
            }
            if (mask & ClearMask.STENCIL_BUFFER_BIT) {
                glMask |= gl.STENCIL_BUFFER_BIT;
            }

            gl.clear(glMask);
            gl.clearColor(color[0], color[1], color[2], color[3]);
            gl.clearDepth(depth);
            gl.clearStencil(stencil);

            GL_CHECK_ERROR();
        }

        public setViewport(viewPort: Viewport) {
            this._viewport = viewPort;

            let rtWidth = Screen.screenWidth;
            let rtHeight = Screen.screenHeight;

            let currentRenderTarget = this._currentRenderTarget;
            if (currentRenderTarget) {
                rtWidth = currentRenderTarget.width;
                rtHeight = currentRenderTarget.height;
            }

            // 是否替换为限制vp在窗口大小内
            console.assert(
                viewPort.x >= 0 && viewPort.x + viewPort.w * rtWidth <= rtWidth &&
                viewPort.y >= 0 && viewPort.y + viewPort.h * rtHeight <= rtHeight);

            // 窗口坐标系原点为左下角
            let x = viewPort.x;
            let y = rtHeight - (viewPort.y + viewPort.h);
            let w = viewPort.w * rtWidth;
            let h = viewPort.h * rtHeight;

            gl.viewport(x, y, w, h);

            GL_CHECK_ERROR();
        }

        public setRenderTarget(renderTarget: RenderTarget) {
            this._currentRenderTarget = renderTarget;
            gl.bindFramebuffer(gl.FRAMEBUFFER, renderTarget);
        }

        public _setTexture(unit: number, enable: boolean, tex: Texture) {
            // 纹理未加载完成时,使用默认纹理
            if (!tex.getWebGLTexture()) {
                tex = ResourceManager.instance.get<Texture>(ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME);
            }

            if (!tex.getWebGLTexture()) {
                return;
            }

            gl.activeTexture(gl.TEXTURE0 + unit);

            if (enable) {
                gl.bindTexture(gl.TEXTURE_2D, tex.getWebGLTexture());
            } else {
                gl.bindTexture(gl.TEXTURE_2D, null);
            }

            GL_CHECK_ERROR();
        }

        private _bindRenderState(): void {

            if (!this._renderStatedChanged) {
                return;
            }

            let currentRenderState = this._currentRenderState;
            let cullMode = currentRenderState.cullMode;
            switch (cullMode) {
                case CullMode.FRONT: {
                    gl.enable(gl.FRONT_FACE);
                    gl.cullFace(gl.FRONT);
                }
                    break;
                case CullMode.BACK: {
                    gl.enable(gl.CULL_FACE);
                    gl.cullFace(gl.BACK);
                }
                    break;
                case CullMode.NONE:
                default: {
                    gl.disable(gl.CULL_FACE);
                }
                    break;
            }

            let depthTest = currentRenderState.depthCheck;
            switch (depthTest) {
                case DepthCheck.CHECK_ONLY: {
                    gl.enable(gl.DEPTH_TEST);
                    gl.depthMask(false);
                    gl.depthFunc(gl.LEQUAL);
                }
                    break;
                case DepthCheck.CHECK_WRITE: {
                    gl.enable(gl.DEPTH_TEST);
                    gl.depthMask(true);
                    gl.depthFunc(gl.LEQUAL);
                }
                    break;
                case DepthCheck.NONE:
                default: {
                    gl.disable(gl.DEPTH_TEST);
                    gl.depthMask(false);
                }
                    break;
            }

            let blendMode = currentRenderState.blendMode;
            switch (blendMode) {
                case BlendMode.OPACITY:
                case BlendMode.ALPHA_TEST: {
                    gl.disable(gl.BLEND);
                }
                    break;
                case BlendMode.ALPHA_BLEND: {
                    gl.enable(gl.BLEND);
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                }
                    break;
                case BlendMode.ADD: {
                    gl.enable(gl.BLEND);
                    gl.blendFunc(gl.ONE, gl.ONE);
                }
                    break;
                case BlendMode.MUL: {
                    gl.enable(gl.BLEND);
                    gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
                }
                    break;
            }

            let colorMask = currentRenderState.colorMask;
            gl.colorMask(
                !!(colorMask & ColorMask.RED),
                !!(colorMask & ColorMask.GREEN),
                !!(colorMask & ColorMask.BLUE),
                !!(colorMask & ColorMask.ALPHA));

            GL_CHECK_ERROR();

            this._renderStatedChanged = false;
        }

        public bindGpuProgram(gpuProgram: GLShaderProgram): void {
            gl.useProgram(gpuProgram.webglProgram);
        }

        private _bindVertexElement(vertexBuffer: WebGLVertexBuffer, shaderPass: WebGLShaderPass): void {
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.getGLBuffer());
            gl.enableVertexAttribArray(vertexBuffer.semantic);
        }

        public renderOperation(renderOp: RenderOperation) {

            console.assert(!!this._currentShaderPass && !!renderOp.vertexBuffers);
            // begin render
            this.begin();

            this._bindRenderState();

            let currentShaderPass = this._currentShaderPass;
            if (this._shaderPassChanged) {
                this.bindGpuProgram(currentShaderPass.getProgram());
                this._shaderPassChanged = false;
            }

            currentShaderPass.uploadUniforms();
            currentShaderPass.uploadSamplers();

            let primType: number;
            switch (renderOp.renderOpType) {
                case RenderOperationType.POINT_LIST:
                    primType = gl.POINTS;
                    break;
                case RenderOperationType.LINE_LIST:
                    primType = gl.LINES;
                    break;
                case RenderOperationType.LINE_STRIP:
                    primType = gl.LINE_STRIP;
                    break;
                case RenderOperationType.TRIANGLE_LIST:
                    primType = gl.TRIANGLES;
                    break;
                case RenderOperationType.TRIANGLE_STRIP:
                    primType = gl.TRIANGLE_STRIP;
                    break;
                case RenderOperationType.TRIANGLE_FAN:
                    primType = gl.TRIANGLE_FAN;
                    break;
                default:
                    primType = gl.TRIANGLES;
                    break;
            }

            let renderAttribsBound: number[] = [];
            // 绑定顶点属性
            let vbBuffers = renderOp.vertexBuffers;
            for (let i = 0, len = vbBuffers.length; i < len; i++) {
                let vb = vbBuffers[i];

                let location = currentShaderPass.getAttribute(vb.semantic);
                if (location === undefined) {
                    continue;
                }

                gl.bindBuffer(gl.ARRAY_BUFFER, vb.getGLBuffer());
                gl.bufferData(gl.ARRAY_BUFFER, vb._data, WebGLBufferManager.getGLUsage(vb._usage));

                GL_CHECK_ERROR();

                gl.enableVertexAttribArray(location);
                gl.vertexAttribPointer(location, vb._size, vb.type, vb._normalized, 0, 0);

                GL_CHECK_ERROR();
                renderAttribsBound.push(location);
            }

            let indexBuffer = renderOp.indexBuffer;
            if (indexBuffer) {

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.getGLIndexBuffer());
                GL_CHECK_ERROR();

                gl.drawElements(primType, indexBuffer.count, gl.UNSIGNED_SHORT, 0);
            } else {
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, vbBuffers[0].vertexCount);
            }

            GL_CHECK_ERROR();

            // end render

            // 清除属性绑定
            let len = renderAttribsBound.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    gl.disableVertexAttribArray(renderAttribsBound[i]);
                }
            }

            this.end();
        }

        static getGLDrawCount(type: RenderOperationType, primCount: number) {
            switch (type) {
                case RenderOperationType.TRIANGLE_LIST:
                    return primCount * 3;

                case RenderOperationType.TRIANGLE_STRIP:
                    return primCount + 2;

                case RenderOperationType.LINE_LIST:
                    return primCount * 2;

                case RenderOperationType.LINE_STRIP:
                    return primCount + 1;

                case RenderOperationType.POINT_LIST:
                    return primCount;
            }

            return 0;
        }

        public onResize(w: number, h: number): void {
            let thisCanvas = this._canvas;
            thisCanvas.width = w;
            thisCanvas.height = h;
        }

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

                this._worldViewTM.identity();
                this._viewProjTM.identity();
                this._worldViewProjTM.identity();

                this._viewMatrix.multiply(this._worldMatrix, this._worldViewTM);
                this._projectionMatrix.multiply(this._viewMatrix, this._viewProjTM);
                this._projectionMatrix.multiply(this._worldViewTM, this._worldViewProjTM);

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