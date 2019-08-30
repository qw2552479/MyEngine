///<reference path="./msic/HashObject.ts" />
namespace QE {

    export class Scene3D extends HashObject {

        private _mainCamera: Camera;
        private _currentCamera: Camera;
        private _cameras: Camera[] = [];
        private _frameId = 0;

        private _rootChildren: GameObject[] = [];

        public constructor() {
            super();

            const mainCamera = this.createNode().addComponent<Camera>(Camera);

            mainCamera.setAspect(1280 / 720);
            mainCamera.setOrthoWidth(1280);
            mainCamera.setOrthoHeight(720);
            mainCamera.setCameraType(CameraType.Perspective);

            Camera.MainCamera = mainCamera;
            this._mainCamera = mainCamera;
            this._cameras = [mainCamera];
        }

        public get children(): GameObject[] {
            return this._rootChildren;
        }

        public createNode(parent?: Transform): GameObject {
            const node: GameObject = new GameObject();
            const transform = node.transform;

            this._rootChildren.push(node);

            if (parent) {
                transform.parent = parent;
            }

            return node;
        }

        public insertNode(node: GameObject, index?: number) {
            const children = this._rootChildren;
            if (__QE_DEBUG__ && children.indexOf(node) !== -1) {
                console.error('node already in the scene');
            }

            if (index !== undefined) {

                if (__QE_DEBUG__) {
                    console.assert(!isNaN(index) && typeof (index) === 'number', 'the index is error' + index);
                }

                if (index < 0 || index >= children.length) {
                    console.error('insert node failed. the index is error: ' + index);
                    return;
                }

                children.splice(index, 0, node);
            } else {
                children.push(node);
            }
        }

        public removeNode(node: GameObject) {
            const children = this._rootChildren;
            if (__QE_DEBUG__ && children.indexOf(node) === -1) {
                console.error('node not in the scene');
            }
            children.splice(children.indexOf(node), 1);
        }

        public onResize(w: number, h: number) {
            const mainCamera = this._mainCamera;
            if (mainCamera) {
                mainCamera.setAspect(w / h);
                mainCamera.setOrthoWidth(w);
                mainCamera.setOrthoHeight(h);
            }
        }

        public render() {
            const cameras = this._cameras;
            for (let i = 0, len = cameras.length; i < len; i++) {
                const camera = cameras[i];
                this._currentCamera = camera;
                camera.renderContext.doRender();
            }

            this._currentCamera = null;
            RenderSystem.instance.setRenderTarget(null);

            this._frameId++;
        }

        public update(deltaTime: number) {

            Component.load();
            Component.update(deltaTime);

            const children = this._rootChildren;

            // 更新动画?

            for (let i = 0, len = children.length; i < len; i++) {
                children[i].transform.update(true, true);
            }
        }
    }

}
