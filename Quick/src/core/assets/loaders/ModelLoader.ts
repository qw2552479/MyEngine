/**
 *  -
 *
 * create by wjl at
 *
 */


namespace QE {
    export class ModelLoader implements IResLoader<ModelData> {

        public static readonly instance: ModelLoader = new ModelLoader();

        load(path: string, onEnd?: (error?: string, data?: ModelData) => void, onProgress?: (progress: null) => void): ModelData {
            let res: ModelData = {
                metadata: '',
                meshes: []
            };

            Http.loadTxtAsync(path)
                .then(value => {
                    try {
                        res = JSON.parse(value);

                        if (onEnd) {
                            onEnd(null, res);
                        }
                    } catch (e) {
                        console.error(e);

                        if (onEnd) {
                            onEnd(null, res);
                        }
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

