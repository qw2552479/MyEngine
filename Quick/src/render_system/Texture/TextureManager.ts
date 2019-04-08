namespace QuickEngine {

    export const DEF_WHITE_TEX_NAME: string = "defWhiteTex";

    export class TextureManager {

        private static _sInstance: TextureManager;
        public static get instance(): TextureManager {
            console.assert(!!TextureManager._sInstance);
            return this._sInstance;
        }

        private _textureList: Texture[] = [];
        private _textureDict: { [id: string]: Texture } = {};

        private _renderTargetList: RenderTarget[] = [];

        protected _defWhiteTex: Texture = undefined;
        public get whiteTex(): Texture {
            return this._defWhiteTex;
        }

        protected _defBlackTex: Texture = undefined;
        public get blackTex(): Texture {
            return this._defBlackTex;
        }

        protected _emptyWhiteTex: Texture = undefined;
        public get emptyTex(): Texture {
            return this._emptyWhiteTex;
        }

        public constructor() {
            TextureManager._sInstance = this; 

            this._defWhiteTex = this.loadRawData(DEF_WHITE_TEX_NAME, (new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])).buffer, 2, 2, 0, PixelFormat.RGBA, TextureUsage.STATIC);
            this._defBlackTex = this.loadRawData(DEF_WHITE_TEX_NAME, (new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])).buffer, 2, 2, 0, PixelFormat.RGBA, TextureUsage.STATIC);
            this._emptyWhiteTex = this.loadRawData(DEF_WHITE_TEX_NAME, undefined, 2, 2, 0, PixelFormat.RGBA, TextureUsage.STATIC);
        }

        public create(name: string, mipmaps: number, format: PixelFormat, usage: TextureUsage) {

            let tex = new Texture(name);
            tex.mipmaps = mipmaps;
            tex.format = format;
            tex.usage = usage;

            this._textureList.push(tex);
            this._textureDict[name] = tex;

            return tex;
        }

        public createManual(name: string, w: number, h: number, mipmaps: number, format: PixelFormat, usage: TextureUsage): Texture {

            let tex = this.getTexture(name);

            if (!tex) {
                tex = new Texture(name);
                tex.width = w;
                tex.height = h;
                tex.mipmaps = mipmaps;
                tex.format = format;
                tex.usage = usage;
            }

            this._textureList.push(tex);
            this._textureDict[name] = tex;

            tex.load();

            return tex;
        }

        public load(name: string, mipmaps: number, format: PixelFormat, usage: TextureUsage) {

            if (!name || name == "") {
                return null;
            }

            let tex = this.getTexture(name);

            if (!tex) {
                let tex = new Texture(name);
                tex.mipmaps = mipmaps;
                tex.format = format;
                tex.usage = usage;
                tex.load();
            }

            this._textureList.push(tex);
            this._textureDict[name] = tex;

            return tex;
        }

        public loadImage(name: string, image: HTMLImageElement, mipmaps: number, format: PixelFormat, usage: TextureUsage) {

            let tex = new Texture(name);
            tex.mipmaps = mipmaps;
            tex.format = format;
            tex.usage = usage;
            tex.loadImage(image);

            this._textureList.push(tex);
            this._textureDict[name] = tex;

            return tex;
        }

        public loadRawData(name: string, data: ArrayBuffer, width: number, height: number, mipmaps: number, format: PixelFormat, usage: TextureUsage) {

            let tex = new Texture(name);
            tex.mipmaps = mipmaps;
            tex.format = format;
            tex.usage = usage;
            tex.loadRawData(data, width, height);

            this._textureList.push(tex);
            this._textureDict[name] = tex;

            return tex;
        }

        public newRenderTexture(w: number, h: number, hasDepthBuffer: boolean, format: PixelFormat): RenderTarget {

            let tex = new RenderTarget();
            tex.width = w;
            tex.height = h;
            tex.hasDepthBuffer = hasDepthBuffer;
            tex.format = format;
            tex.init();

            this._renderTargetList.push(tex);

            return tex;
        }

        public getTexture(name: string): Texture {
            return this._textureDict[name];
        }

    }

}