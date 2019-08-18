module UnitTest {


    function initScene() {

        const mainScene: QE.Scene3D = QE.SceneManager.instance.currentScene;

        const mainCamera = QE.Camera.MainCamera;
        mainCamera.setCameraType(QE.CameraType.Perspective);
        mainCamera.setNearClip(0.1);
        mainCamera.setFarClip(100);
        mainCamera.setFOV(45);

        const cameraNode = mainCamera.node.transform;
        cameraNode.localPosition = new QE.Vector3(0, 0, -3);
        cameraNode.localEulerAngle = new QE.Vector3(0, 0, 0);
    }

    export async function testSprite() {

        initScene();

        const mainScene: QE.Scene3D = QE.SceneManager.instance.currentScene;

        const tex: QE.Texture = await QE.ResourceManager.load<QE.Texture>('UnitTest/assets/res/icon.png');
        const meshNode = mainScene.createNode();
        const spriteRender = meshNode.addComponent<QE.SpriteRender>(QE.SpriteRender);

        const material = QE.SpriteMaterial.getDefaultSpriteMaterial();
        spriteRender.setMaterial(material);
        material.shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;
        //
        // meshNode.transform.localPosition = new QE.Vector3(0.1 * i, 0.1 * i, 1 * 0.1);

        // setTimeout(function () {
        //     meshNode.transform.localPosition = new QE.Vector3(
        //     meshNode.transform.localPosition.x + 0.1,
        //     meshNode.transform.localPosition.y + 0.1 , 1);
        // }, this);

    }

}
