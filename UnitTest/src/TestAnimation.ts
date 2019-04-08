module UnitTest {

    import SceneManager = QuickEngine.SceneManager;
    import Camera = QuickEngine.Camera;
    import Vector3 = QuickEngine.Vector3;
    import Material = QuickEngine.Material;
    import Animator = QuickEngine.Animator;
    import AnimationClip = QuickEngine.AnimationClip;
    import AnimatorController = QuickEngine.AnimatorController;
    import KeyFrame = QuickEngine.KeyFrame;
    import Transform = QuickEngine.Transform;

    export function testAnimation() {

        let mainScene = QuickEngine.SceneManager.instance.currentScene;
        let mainCamera = QuickEngine.Camera.MainCamera;
        mainCamera.setCameraType(QuickEngine.CameraType.Prespective);

        let cameraNode = mainCamera.transform;
        cameraNode.localPosition = new QuickEngine.Vector3(0, 0, -6);

        // mesh
        let mesh = new QuickEngine.Mesh();
        mesh.name = "myMesh";
        QuickEngine.PrefabFactory.createCube(mesh);

        let node = mainScene.createNode();

        let meshRender = node.addComponent<QuickEngine.MeshRender>(QuickEngine.MeshRender);
        meshRender.mesh = mesh;
        meshRender.setMaterial(QuickEngine.Material.getDefaultCubeMaterial());

        node.transform.localPosition = new QuickEngine.Vector3(0, 0, 0);
        node.name = "Node";
        // mesh
        let sphereMesh = new QuickEngine.Mesh();
        sphereMesh.name = "mySphereMesh";

        QuickEngine.PrefabFactory.createCube(sphereMesh);

        let sphereNode = mainScene.createNode(node.transform);
        sphereNode.name = "sphereNode";

        let sphereMeshRender = sphereNode.addComponent<QuickEngine.MeshRender>(QuickEngine.MeshRender);
        sphereMeshRender.mesh = sphereMesh;
        sphereMeshRender.setMaterial(QuickEngine.Material.getDefaultCubeMaterial());

        let tex = QuickEngine.TextureManager.instance.load("assets/res/icon.png", 0, QuickEngine.PixelFormat.RGBA, QuickEngine.TextureUsage.STATIC);
        sphereMeshRender.getMaterial().shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;


        sphereNode.transform.localPosition = new QuickEngine.Vector3(1, 0, 0);
        sphereNode.transform.localScale = new QuickEngine.Vector3(0.5,0.5,0.5);

        // 添加Animator组件
        let animator = node.addComponent<Animator>(Animator);

        // 创建动画控制器
        let animController = new AnimatorController();

        // 创建动画片段
        let posClip = new AnimationClip();
        posClip.name = "move";

        let curveRX = new QuickEngine.AnimationCurve();
        curveRX.addKeyFrameByValue(0, 0);
        curveRX.addKeyFrameByValue(2000, -0);

        let curveRY = new QuickEngine.AnimationCurve();
        curveRY.addKeyFrameByValue(0, 0);
        curveRY.addKeyFrameByValue(2000, 360);

        let curveRZ = new QuickEngine.AnimationCurve();
        curveRZ.addKeyFrameByValue(0, 0);
        curveRZ.addKeyFrameByValue(2000, 0);

        // 组装动画
        // curve
        posClip.addCurve("Node/sphereNode", QuickEngine.Reflection.Type.typeOf(Transform), "localEulerAngle.x", curveRX);
        posClip.addCurve("Node/sphereNode", QuickEngine.Reflection.Type.typeOf(Transform), "localEulerAngle.y", curveRY);
        posClip.addCurve("Node/sphereNode", QuickEngine.Reflection.Type.typeOf(Transform), "localEulerAngle.z", curveRZ);

        let curveTX = new QuickEngine.AnimationCurve();
        curveTX.addKeyFrameByValue(0, 1);
        curveTX.addKeyFrameByValue(2000, 2);

        let curveTY = new QuickEngine.AnimationCurve();
        curveTY.addKeyFrameByValue(0, 0);
        curveTY.addKeyFrameByValue(2000, 0);

        let curveTZ = new QuickEngine.AnimationCurve();
        curveTZ.addKeyFrameByValue(0, 0);
        curveTZ.addKeyFrameByValue(2000, 0)

        //
        posClip.addCurve("Node/sphereNode", QuickEngine.Reflection.Type.typeOf(Transform), "localPosition.x", curveTX);
        posClip.addCurve("Node/sphereNode", QuickEngine.Reflection.Type.typeOf(Transform), "localPosition.y", curveTY);
        posClip.addCurve("Node/sphereNode", QuickEngine.Reflection.Type.typeOf(Transform), "localPosition.z", curveTZ);

        posClip.length = 2000;

        animController.addClip(posClip);
        animator.animController = animController;

        animator.play("move");
    }
}