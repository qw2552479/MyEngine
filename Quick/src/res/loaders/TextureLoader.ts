namespace QE {
    export class TextureLoader implements IResLoader<Texture> {

        public static readonly instance: TextureLoader = new TextureLoader();

        load(path: string, onEnd?: (error?: string, data?: Texture) => void, onProgress?: (progress: null) => void): Texture {
            const res = new Texture();

            Http.loadImageAsync(path)
                .then(value => {
                    res.loadImage(value);

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
