namespace QuickEngine {

    export class SceneManager {

        private static _sInstance: SceneManager;
        public static get instance(): SceneManager {
            console.assert(!!SceneManager._sInstance);
            return this._sInstance;
        }

        protected _currentScene: Scene3D;
        public get currentScene(): Scene3D {
            return this._currentScene;
        }

        public static createScene(): Scene3D {
            return new Scene3D();
        }

        public constructor() {
            SceneManager._sInstance = this;
            // 创建默认场景
            this._currentScene = SceneManager.createScene();
        }
    }

}