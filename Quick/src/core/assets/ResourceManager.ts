namespace QE {
    /**
     * 资源类型
     */
    export enum ResType {
        Texture, // 贴图资源
        TEXT, // 文本资源
        BINARY, // 二进制资源
        FBX, // fbx模型资源
        MATERIAL, // 材质资源
        SHADER, // shader资源
        SCENE, // 场景资源
        ANIM, // 动画资源
        FONT, // 字体资源
        PREFAB// 预设资源
    }

    const ExtNameMap: { [key: string]: ResType } = {
        '.png': ResType.Texture,
        '.jpg': ResType.Texture,
        '.jpeg': ResType.Texture,
        '.txt': ResType.TEXT,
        '.bin': ResType.BINARY,
        '.fbx': ResType.FBX,
        '.mat': ResType.MATERIAL,
        '.shader': ResType.SHADER,
        '.scene': ResType.SCENE,
        '.anim': ResType.ANIM,
        '.font': ResType.FONT,
        '.prefab': ResType.PREFAB,
        'fallback': ResType.BINARY
    };

    function extNameToResType(extName: string) {
        let type = ExtNameMap[extName];

        if (type == null) {
            type = ExtNameMap['fallback'];
        }

        return type;
    }

    export type ResourceClassType<T extends Resource> = new(filePath: string) => T;

    export function extname(path: string) {
        // 文件扩展名匹配正则
        const reg = /\.[^\.]+$/;
        const matches = reg.exec(path);
        if (matches) {
            return matches[0];
        }
        return '';
    }

    interface ResRequest {
        state: ResState;
        res?: Resource;
        listeners: ((error?: string, data?: any) => void)[];
    }

    export class ResourceManager {
        private static _loaderMap: { [key: string]: IResLoader<any> } = {};
        private static _resMap: { [key: string]: ResRequest } = {};

        public static get<T extends Resource>(path: string): T {
            const item = this._resMap[path];
            if (item && item.state === ResState.Loaded) {
                return item.res as T;
            }
            return null;
        }

        public static async load<T extends Resource>(path: string, onProgress?: (progress: number) => void): Promise<T> {
            const res = this.get<T>(path);

            if (res) {
                return res;
            }

            const ext = extname(path);
            const loader = this._loaderMap[ext];

            if (!loader) {
                console.error('assets loader is not found: ' + path);
                return null;
            }

            let resRequest = this._resMap[path];

            if (!resRequest) {
                resRequest = {
                    state: ResState.UnLoaded,
                    listeners: []
                };

                this._resMap[path] = resRequest;
            }

            return await new Promise<T>((resolve, reject) => {
                resRequest.listeners.push((error?: string, data?: T) => {
                    if (error) {
                        console.error(error);
                        reject(null);
                        return;
                    }

                    if (!data) {
                        console.error('file not exist');
                        reject(null);
                        return;
                    }

                    resolve(data);
                });

                if (resRequest.state === ResState.Loading) {
                    return;
                }

                resRequest.state = ResState.Loading;

                loader.load(path, (error?: string, data?: T) => {
                    resRequest.state = ResState.Loaded;

                    resRequest.listeners.forEach((listener) => {
                        listener(error, data);
                    });

                    resRequest.listeners.length = 0;
                }, onProgress);
            });
        }

        public static unload(url: string): void {
            const res = this._resMap[url];

            if (!res) {
                return;
            }

            delete this._resMap[url];

            res.res.destroy();
        }

        public static removeUnusedResources(): void {

        }

        public static init(onFinished: () => void) {
            this.setLoader(['.png', '.jpg', '.jpeg'], TextureLoader.instance);
            this.setLoader(['.txt', '.xml', '.json', '.plist', '.fnt', '.atlas'], TextResourceLoader.instance);
            this.setLoader(['.mesh'], MeshLoader.instance);
            this.setLoader(['.prefab'], PrefabLoader.instance);
            this.setLoader(['.model'], ModelLoader.instance);

            BuiltinResFactory.init(onFinished);
        }

        public static setLoader(extName: string | string[], loader: IResLoader<any>) {
            if (!Array.isArray(extName)) {
                extName = [extName];
            }
            extName.forEach((value) => {
                this._loaderMap[value] = loader;
            });
        }
    }
}
