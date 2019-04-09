namespace QuickEngine {
    import Type = QuickEngine.Reflection.Type;
	export const BUILTIN_DEF_WHITE_TEX_NAME: string = "__builtin_defWhiteTex";
	export const BUILTIN_DEF_BLACK_TEX_NAME: string = "__builtin_defBlackTex";

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

        public constructor() {
            TextureManager._sInstance = this; 

            this._defWhiteTex = this.createManual(BUILTIN_DEF_WHITE_TEX_NAME, 2, 2, 0, PixelFormat.RGBA, TextureUsage.STATIC);
            this._defBlackTex = this.createManual(BUILTIN_DEF_BLACK_TEX_NAME, 2, 2, 0, PixelFormat.RGBA, TextureUsage.STATIC);
        }

        public createManual(path: string, w: number, h: number, mipmaps: number, format: PixelFormat, usage: TextureUsage): Texture {

            let tex = this.getTexture(path);

            if (!tex) {
                let imgRes = ResourceManager.instance.load<ImageResource>(path, Type.typeOf(ImageResource));
				imgRes._loadedEvent.add(new class implements IQuickListener1<Resource> {
					_func: QuickEngine.Action1<QuickEngine.Resource>;
					onCall: QuickEngine.Action1<QuickEngine.Resource>;
				});
                tex = new Texture();
                tex.name = path;
                tex.width = w;
                tex.height = h;
                tex.mipmaps = mipmaps;
                tex.format = format;
                tex.usage = usage;
            }

            this._textureList.push(tex);
            this._textureDict[path] = tex;

            return tex;
        }

        public load(path: string, mipmaps: number, format: PixelFormat, usage: TextureUsage): Texture {

            if (!path || path == "") {
                return null;
            }

            let tex = this.getTexture(path);

            if (!tex) {
                let tex = new Texture();
                tex.mipmaps = mipmaps;
                tex.format = format;
                tex.usage = usage;
            }

            this._textureList.push(tex);
            this._textureDict[path] = tex;

            return tex;
        }

        public newRenderTexture(w: number, h: number, hasDepthBuffer: boolean, format: PixelFormat): RenderTarget {

            let tex = new RenderTarget();
            tex.width = w;
            tex.height = h;
            tex._hasDepthBuffer = hasDepthBuffer;
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