namespace QuickEngine {
	export class ImageLoader implements IResLoader<HTMLImageElement> {

        public static readonly instance: ImageLoader = new ImageLoader();

        load(path: string, onLoaded: (err: string, data: HTMLImageElement) => void, thisObj?: Object): void {
            this.loadAsync(path).then(function (data: HTMLImageElement) {
                onLoaded && onLoaded.call(thisObj, null, data);
            }).catch(function (err: string) {
                onLoaded && onLoaded.call(thisObj, err);
            });
        }

        loadAsync(path: string): Promise<HTMLImageElement> {
            let promise = new Promise<HTMLImageElement>(function (resolve, reject) {
                let image = new Image();

                image.onload = function () {
                    resolve(image);
                };

                image.onerror = function () {
                    reject('load image failed: ' + path);
                };

                image.src = path;
            });

            return promise;
        }
	}
}