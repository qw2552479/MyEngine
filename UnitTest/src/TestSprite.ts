module UnitTest {


    function initScene() {

        let mainScene: QuickEngine.Scene3D = QuickEngine.SceneManager.instance.currentScene;

        let mainCamera = QuickEngine.Camera.MainCamera;
        mainCamera.setCameraType(QuickEngine.CameraType.Orthogonal);

        let cameraNode = mainCamera.node.transform;
        cameraNode.localPosition = new QuickEngine.Vector3(0, 0, 0);
    }

    export function testSprite() {

        initScene();

        let mainScene: QuickEngine.Scene3D = QuickEngine.SceneManager.instance.currentScene;

        let i = 0;
        let meshNode = mainScene.createNode();
        let spriteRender = meshNode.addComponent<QuickEngine.SpriteRender>(QuickEngine.SpriteRender);

        let material = QuickEngine.SpriteMaterial.getDefaultSpriteMaterial();
        spriteRender.setMaterial(material);

        let tex = QuickEngine.ResourceManager.instance.load<QuickEngine.Texture>("assets/res/icon.png",  QuickEngine.Reflection.Type.typeOf(QuickEngine.Texture));
        material.shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;

        meshNode.transform.localPosition = new QuickEngine.Vector3(0.1 * i, 0.1 * i, 1 * 0.1);

        setTimeout(function () {
            meshNode.transform.localPosition = new QuickEngine.Vector3(meshNode.transform.localPosition.x + 0.1, meshNode.transform.localPosition.y + 0.1 , 1);
        }, this);
    }

}