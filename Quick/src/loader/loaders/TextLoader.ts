namespace QuickEngine {
    export class TextLoader implements IResLoader<string> {

        public static readonly instance: TextLoader = new TextLoader();

        load(url: string, onLoaded: (err: string, data: string) => void, thisObj?: Object): void {
            Http.ajax({
                url: url,
                method: 'GET',
                responseType: 'text',
                async: true,
                callback: function (err: string, data: string, xhr: XMLHttpRequest, status: number) {
                    if (err) {
                        onLoaded && onLoaded.call(thisObj, err);
                        return;
                    }

                    onLoaded && onLoaded.call(thisObj, null, data);
                }
            });
        }

        loadAsync(url: string): Promise<string> {
            let promise = new Promise<string>(function (resolve, reject) {
                Http.ajax({
                    url: url,
                    method: 'GET',
                    responseType: 'text',
                    async: true,
                    callback: function (err: string, data: string, xhr: XMLHttpRequest, status: number) {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve(data);
                    }
                });
            });

            return promise;
        }
    }
}