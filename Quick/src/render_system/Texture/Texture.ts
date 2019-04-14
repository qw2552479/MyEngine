namespace QuickEngine {

    export const enum TextureUsage {
        STATIC = 1,                              //BufferUsage.STATIC
        DYNAMIC = 2,                             //BufferUsage.DYNAMIC
        WRITE_ONLY = 4,                          //BufferUsage.WRITE_ONLY
        STATIC_WRITE_ONLY = 5,                   //BufferUsage.STATIC_WRITE_ONLY
        DYNAMIC_WRITE_ONLY = 6,                  //BufferUsage.DYNAMIC_WRITE_ONLY
        DYNAMIC_WRITE_ONLY_DISCARDABLE = 14,     //BufferUsage.DYNAMIC_WRITE_ONLY_DISCARDABLE
        /// Mipmaps will be automatically generated for this texture
        AUTOMIPMAP = 16,
        /** This texture will be a render target, i.e. used as a target for render to texture
         setting this flag will ignore all other texture usages except TU_AUTOMIPMAP */
        RENDERTARGET = 32,
        /// Default to automatic mipmap generation static textures
        DEFAULT = AUTOMIPMAP | STATIC_WRITE_ONLY
    };

    // 每个顶点都有一个纹理坐标.2D纹理坐标用2d坐标(s, t)表示,也称作(u, v)
    // 纹理图像的左下角由st坐标(0.0, 0.0)指定, 右上角st坐标(1.0, 1.0)指定. 坐标区间为[0.0, 1.0], 区间外坐标也是允许的.
    // 纹理绑定步骤:
    /*
    *  let webglTex = gl.createTexture();           // 生成gl纹理对象
    *  gl.bindTexture(gl.TEXTURE_2D, webglTex);     // 绑定纹理对象, 绑定时, 会将之前绑定的纹理对象解除绑定
    *  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.imageData);//纹理真正第加载图像
    **/
    export class Texture extends Resource {

        private static Tid = 0;

        private readonly _tid: number = undefined;

        public get id() {
            return this._tid;
        }

        protected _width: number;
        public get width(): number {
            return this._width;
        }

        public set width(width: number) {
            this._width = width;
        }

        protected _height: number;
        public get height(): number {
            return this._height;
        }

        public set height(height: number) {
            this._height = height;
        }

        protected _resolution: number;
        public get resolution(): number {
            return this._resolution;
        }

        public set resolution(resolution: number) {
            this._resolution = resolution;
        }

        protected _webglTex: WebGLTexture;
        public get webglTex(): WebGLTexture {
            return this._webglTex;
        }

        public getWebGLTexture(): WebGLTexture {
            return this.webglTex;
        }

        mipmaps: number;

        format: PixelFormat;

        private _usage: TextureUsage;
        public get usage(): TextureUsage {
            return this._usage;
        }

        public set usage(usage: TextureUsage) {
            this._usage = usage;
        }

        private _image: HTMLImageElement;
        public get image() {
            return this._image;
        }

        private _imageData: ImageData;
        public get imageData() {
            return this._imageData;
        }

        constructor(name?: string) {
            super(name);
            this._tid = ++Texture.Tid;
        }

        public copy(object: Texture) {
            super.copy(object);
        }

        public clone(): Texture {
            let m = new Texture();
            m.copy(this);
            return m;
        }

        public loadImage(image: HTMLImageElement) {
            this._image = image;
            this._width = image.width;
            this._height = image.height;

            this.createWebGLTexture();
        }

        public loadRawData(data: ArrayBuffer, width: number, height: number) {
            if (data == undefined) {
                this.createWebGLTexture();
                return;
            }

            this._width = width;
            this._height = height;
            this._imageData = new ImageData(new Uint8ClampedArray(data), width, height);

            this.createWebGLTexture();
        }

        public destroy() {
            if (this._webglTex) {
                gl.deleteTexture(this._webglTex);
                this._webglTex = undefined;
            }

            this._image = undefined;
        }

        protected createWebGLTexture() {

            let webglTex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, webglTex);
            // 参数介绍,OpenGLES3.0编程指南,第九章纹理
            // opengl纹理左下角为起点, 纹理坐标是右上角为起点
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);

            GL_CHECK_ERROR();

            if (this._image) {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
            } else if (this._imageData) {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._imageData);
            }

            //texImage2D(target: number, level: number, internalformat: number, format: number, type: number, pixels: ImageData): void;
            //texImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: ArrayBufferView): void;

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            this._webglTex = webglTex;
        }

        protected loadImpl() {
            let self = this;

            ImageLoader.instance.loadAsync(this.name).then(function (data) {
                self._image = data;
                self._width = data.width;
                self._height = data.height;
                self._state = ResState.Loaded;

                self._onLoad();
            }).catch(function (err) {
                console.error('load text failed: ' + this.name + ' error: ' + err);

                self._state = ResState.Loaded;

                self._onLoad();
            });
        }

        protected unloadImpl() {
        }
    }
}