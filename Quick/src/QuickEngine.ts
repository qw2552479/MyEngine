//https://github.com/jsdoc3/jsdoc
namespace QuickEngine {

    export interface RunData {
        width: number;
        height: number;
        div?: HTMLElement;
        clearColor?: Color;
        debugMode?: boolean;
        frameRate?: number;
        onEnginePrepared?: Function;
    }

    export function run(data: RunData) {

        new WebGLBufferManager();
        new WebGLRendererSystem(data.div);
        let sceneManager = new SceneManager();
        sceneManager.currentScene = SceneManager.createScene();

        window.onresize = (ev: UIEvent) => {
            let w = window.innerWidth;
            let h = window.innerHeight;
            onResize(w, h);  
        };    

        // 准备内置资源
        ResourceManager.instance.makeBuiltinRes(function () {
            onResize(window.innerWidth, window.innerHeight);

            frameUpdate(0);

            data.onEnginePrepared && data.onEnginePrepared();
        })
    }
    
    function frameUpdate(deltaTime: number) {

        renderOneFrame(deltaTime / 1000);

        requestAnimationFrame(frameUpdate);
    }

    export function renderOneFrame(deltaTime: number) {

        let mainScene = SceneManager.instance.currentScene;

        if (!mainScene) {
            return;
        }

        mainScene.update(deltaTime);

        RenderSystem.instance.beginScene();

        mainScene.render();

        RenderSystem.instance.endScene();

        //mainScene.fixedUpdate(dt);
    }

    function onResize(w: number, h: number) {

        Screen.screenWidth = w;
        Screen.screenHeight = h;

        SceneManager.instance.currentScene.onResize(w, h);
        RenderSystem.instance.onResize(w, h);
    }
}
