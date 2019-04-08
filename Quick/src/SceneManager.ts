namespace QuickEngine {

    export class SceneManager {

        private static _sInstance: SceneManager;
        public static get instance(): SceneManager {
            console.assert(!!SceneManager._sInstance);
            return this._sInstance;
        }

        public static set instance(val: SceneManager) {
            // TODO:
        }

        public currentScene: Scene3D;

        public static createScene(): Scene3D {
            return new Scene3D();
        }        

        public constructor() {

            SceneManager._sInstance = this;

        }
    }

}