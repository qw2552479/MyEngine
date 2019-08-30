namespace QE {
    export interface RunData {
        width: number;
        height: number;
        div?: HTMLElement;
        clearColor?: Color;
        debugMode?: boolean;
        frameRate?: number;
        onEnginePrepared?: () => void;
    }

    export function run(data: RunData) {

        WebGLBufferManager.instance.init();
        RenderSystem.instance.init(data.div);
        SceneManager.instance.init();

        window.onresize = (ev: UIEvent) => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            onResize(w, h);
        };

        // 准备内置资源
        ResourceManager.init(() => {
            onResize(window.innerWidth, window.innerHeight);

            frameUpdate(0);

            if (data.onEnginePrepared) {
                data.onEnginePrepared();
            }
        });
    }

    function frameUpdate(deltaTime: number) {
        renderOneFrame(deltaTime / 1000);
        requestAnimationFrame(frameUpdate);
    }

    export function renderOneFrame(deltaTime: number) {

        const mainScene = SceneManager.instance.currentScene;

        if (!mainScene) {
            return;
        }

        mainScene.update(deltaTime);

        RenderSystem.instance.beginScene();

        mainScene.render();

        RenderSystem.instance.endScene();

        // mainScene.fixedUpdate(dt);
    }

    function onResize(w: number, h: number) {

        Screen.screenWidth = w;
        Screen.screenHeight = h;

        SceneManager.instance.currentScene.onResize(w, h);
        RenderSystem.instance.onResize(w, h);
    }
}
