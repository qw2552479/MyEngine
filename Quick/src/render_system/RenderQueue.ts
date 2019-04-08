namespace QuickEngine {

    export class RenderQueue {

        public solidObjects: Renderable[];
        public alphaObjects: Renderable[];

        public constructor() {
            this.solidObjects = [];
            this.alphaObjects = [];
        }

        public addRenderable(renderable: Renderable) {
            // 不透明对象
            //TODO:添加不透明对象判断
            let mat = renderable.getMaterial();
            if (mat.opacity >= 1) {
                this.solidObjects.unshift(renderable);
            } else {
                this.alphaObjects.push(renderable);
            }
        }

        public clear(): void {
            this.solidObjects = [];
            this.alphaObjects = [];
        }

    }

}