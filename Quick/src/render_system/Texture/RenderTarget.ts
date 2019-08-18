namespace QE {

    export class RenderTarget extends HashObject {
        private static RdtId = 0;
        protected _rid = -1;
        protected _texture: Texture;

        width: number;
        height: number;

        _frameBuffer: WebGLFramebuffer;
        _depthBuffer: WebGLRenderbuffer;
        _hasDepthBuffer: boolean;

        private _format: PixelFormat;
        public get format(): PixelFormat {
            return this._format;
        }

        public set format(v: PixelFormat) {
            this._format = v;
        }

        public get id() {
            return this._rid;
        }

        public getTexture() {
            return this._texture;
        }

        public constructor() {
            super();
            this._rid = RenderTarget.RdtId++;
        }

        public init() {
            const w = this.width, h = this.height;
            console.assert(w > 0 && h > 0);

            const texture = new Texture('RenderTarget' + this._rid);
            texture.width = w;
            texture.height = h;
            texture.mipmaps = 0;
            texture.format = this.format;
            texture.usage = TextureUsage.STATIC;
            this._texture = texture;

            const webglTex = texture.getWebGLTexture();

            // 创建帧缓冲
            const frameBuffer = gl.createFramebuffer();
            // 绑定帧缓冲
            gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
            // 连接创建的2d纹理作为帧缓冲区附着
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, webglTex, 0);
            // 用完临时解除绑定
            gl.bindTexture(gl.TEXTURE_2D, undefined);

            this._frameBuffer = frameBuffer;

            if (this._hasDepthBuffer) {
                // 创建深度渲染缓冲对象
                const renderBuffer = gl.createRenderbuffer();
                // 绑定深度渲染缓冲对象
                gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
                // 指定保存在渲染缓冲区的图像大小和格式, 格式参数参考OPengl3.0 第12章 12.4.2渲染缓冲区格式
                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
                // 连接渲染缓冲区作为帧缓冲区附着
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);
                // 用完临时解除绑定
                gl.bindRenderbuffer(gl.RENDERBUFFER, undefined);

                this._depthBuffer = renderBuffer;
            }

            // 检查帧缓冲区完整性, 状态参数参考12.5.4
            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (status != gl.FRAMEBUFFER_COMPLETE) {
                if (__QE_DEBUG__) {
                    // TODO: 打印状态描述
                    switch (status) {
                        case gl.FRAMEBUFFER_UNSUPPORTED:
                            break;
                        case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                            break;
                        case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                            break;
                        case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                            break;
                        default:
                            break;
                    }
                }

                console.log('Error: Create RenderTarget Failed, format: ' + this.format + '.');

                this.destroy();
            }

            // 用完临时解除绑定
            gl.bindFramebuffer(gl.FRAMEBUFFER, undefined);

            GL_CHECK_ERROR();
        }

        public destroy() {
            super.destroy();
            if (this._depthBuffer) {
                gl.deleteRenderbuffer(this._depthBuffer);
                this._depthBuffer = undefined;
            }
            if (this._frameBuffer) {
                gl.deleteFramebuffer(this._frameBuffer);
                this._frameBuffer = undefined;
            }
            if (this._texture) {
                this._texture.destroy();
                this._texture = undefined;
            }
        }
    }

}
