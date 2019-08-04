module UnitTest {

    import SceneManager = QuickEngine.SceneManager;
    import Camera = QuickEngine.Camera;
    import Vector3 = QuickEngine.Vector3;
    import Material = QuickEngine.Material;
    import Animator = QuickEngine.Animator;
    import AnimationClip = QuickEngine.AnimationClip;
    import AnimatorController = QuickEngine.AnimatorController;
    import AnimationCurve = QuickEngine.AnimationCurve;
    import KeyFrame = QuickEngine.KeyFrame;
    import Transform = QuickEngine.Transform;

    export function testFbxModel() {

        let mainScene = SceneManager.instance.currentScene;
        let mainCamera = Camera.MainCamera;
        mainCamera.setCameraType(QuickEngine.CameraType.Perspective);

        let cameraNode = mainCamera.transform;
        cameraNode.localPosition = new Vector3(0, 0, -10);

        let modelName = "jianshi";
    //    let modelName = "chan";
        let p = QuickEngine.ResourceManager.instance.loadAsync<QuickEngine.TextResource>("assets/res/model/" + modelName + "/" + modelName + ".mesh.json", QuickEngine.Reflection.Type.typeOf(QuickEngine.TextResource));
        p.then(function (res: QuickEngine.TextResource) {
            let tex = QuickEngine.ResourceManager.instance.load<QuickEngine.Texture>("assets/res/model/" + modelName + "/" + modelName + ".png", QuickEngine.Reflection.Type.typeOf(QuickEngine.Texture));
            Material.getDefaultCubeMaterial().shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;

            let rootNode = mainScene.createNode();

            let model = QuickEngine.MeshSerializer.loadModel(JSON.parse(res.data));
            let transform = model.transform;
            transform.localPosition = new Vector3(0, -1, 0);
            transform.localScale = new Vector3(1, 1, 1);

            rootNode.transform.parent = model.transform;

            let eulerAngle = new QuickEngine.Vector3(0, 0, 0);
            rootNode.transform.localRotation = rootNode.transform.localRotation.fromEulerAngle(eulerAngle);
        });
    }
}