module UnitTest {

    import SceneManager = QE.SceneManager;
    import Camera = QE.Camera;
    import Vector3 = QE.Vector3;
    import Material = QE.Material;
    import Animator = QE.Animator;
    import AnimationClip = QE.AnimationClip;
    import AnimatorController = QE.AnimatorController;
    import AnimationCurve = QE.AnimationCurve;
    import KeyFrame = QE.KeyFrame;
    import Transform = QE.Transform;

    export function testFbxModel() {

        const mainScene = SceneManager.instance.currentScene;
        const mainCamera = Camera.MainCamera;
        mainCamera.setCameraType(QE.CameraType.Perspective);

        const cameraNode = mainCamera.transform;
        cameraNode.localPosition = new Vector3(0, 0, -10);

        const modelName = 'jianshi';
        //    let modelName = "chan";
        const modelPath = 'UnitTest/assets/res/model/' + modelName + '/' + modelName + '.mesh.json';
        QE.ResourceManager.load<QE.TextResource>(modelPath)
            .then((res: QE.TextResource) => {
                QE.ResourceManager.load<QE.Texture>('UnitTest/assets/res/model/' + modelName + '/' + modelName + '.png')
                    .then((tex: QE.Texture) => {
                        Material.getDefaultCubeMaterial().shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;
                        const rootNode = mainScene.createNode();

                        const model = QE.MeshSerializer.loadModel(JSON.parse(res.text));
                        const transform = model.transform;
                        transform.localPosition = new Vector3(0, -1, 0);
                        transform.localScale = new Vector3(1, 1, 1);

                        rootNode.transform.parent = model.transform;

                        const eulerAngle = new QE.Vector3(0, 0, 0);
                        rootNode.transform.localRotation = rootNode.transform.localRotation.fromEulerAngle(eulerAngle);
                    });
            });
    }
}
