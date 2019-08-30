/**
 *  -
 *
 * create by wjl at
 *
 */

namespace QE {
    export class PrefabLoader implements IResLoader<GameObject> {

        public static readonly instance: PrefabLoader = new PrefabLoader();

        load(path: string, onEnd?: (error?: string, data?: GameObject) => void, onProgress?: (progress: null) => void): GameObject {
            const res = new GameObject();

            Http.loadJsonAsync(path)
                .then(value => {
                    if (onEnd) {
                        onEnd(null, res);
                    }
                })
                .catch(reason => {
                    if (onEnd) {
                        onEnd(reason);
                    }
                });

            return res;
        }
    }
}
