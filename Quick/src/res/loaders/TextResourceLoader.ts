namespace QE {
    export class TextResourceLoader implements IResLoader<TextResource> {

        public static readonly instance: TextResourceLoader = new TextResourceLoader();

        private _tasks: ((error?: string, data?: TextResource) => void)[];
        private _isLoading = false;
        private _res: TextResource;

        load(path: string, onEnd?: (error?: string, data?: TextResource) => void, onProgress?: (progress: null) => void): TextResource {
            const res = new TextResource();

            if (this._isLoading) {
                this._tasks.push(onEnd);
                return this._res;
            }

            this._res = res;

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
