module UnitTest {


    function initScene() {

        let mainScene: QuickEngine.Scene3D = QuickEngine.SceneManager.instance.currentScene;

        let mainCamera = QuickEngine.Camera.MainCamera;
        mainCamera.setCameraType(QuickEngine.CameraType.Prespective);

        let cameraNode = mainCamera.node.transform;
        cameraNode.localPosition = new QuickEngine.Vector3(0, 0, 0);
    }

    export function testSprite() {

        initScene();

        let mainScene: QuickEngine.Scene3D = QuickEngine.SceneManager.instance.currentScene;

        for (let i = 0; i < 10; i++) {
            let meshNode = mainScene.createNode();
            let spriteRender = meshNode.addComponent<QuickEngine.SpriteRender>(QuickEngine.SpriteRender);

            let material = QuickEngine.SpriteMaterial.getDefaultSpriteMaterial();
            spriteRender.setMaterial(material);

            material.shader.shaderPasses[0].getSamplers()[0].samplerTex = QuickEngine.TextureManager.instance.load("assets/res/icon.png", 0, QuickEngine.PixelFormat.RGBA, QuickEngine.TextureUsage.STATIC);

            meshNode.transform.localPosition = new QuickEngine.Vector3(0.1 * i, 0.1 * i, -11+i * 0.1);
        }
    }

}