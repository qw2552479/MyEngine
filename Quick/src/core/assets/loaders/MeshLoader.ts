/**
 *  -
 *
 * create by wjl at
 *
 */

namespace QE {
    export class MeshLoader implements IResLoader<Mesh> {

        public static readonly instance: MeshLoader = new MeshLoader();

        load(path: string, onEnd?: (error?: string, data?: Mesh) => void, onProgress?: (progress: null) => void): Mesh {
            const res = new Mesh();

            Http.loadJsonAsync(path)
                .then(value => {
                    MeshSerializer.serializeByJson(value, res);

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

