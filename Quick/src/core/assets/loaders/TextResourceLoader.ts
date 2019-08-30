namespace QE {
    export class TextResourceLoader implements IResLoader<TextResource> {

        public static readonly instance: TextResourceLoader = new TextResourceLoader();

        load(path: string, onEnd?: (error?: string, data?: TextResource) => void, onProgress?: (progress: null) => void): TextResource {
            const res = new TextResource();

            Http.loadTxtAsync(path)
                .then(value => {
                    res.text = value;

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
