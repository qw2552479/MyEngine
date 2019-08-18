module UnitTest {

    import SceneManager = QE.SceneManager;
    import Camera = QE.Camera;
    import Vector3 = QE.Vector3;
    import Material = QE.Material;
    import Animator = QE.Animator;
    import AnimationClip = QE.AnimationClip;
    import AnimatorController = QE.AnimatorController;
    import KeyFrame = QE.KeyFrame;
    import Transform = QE.Transform;

    export function testAnimation() {

        const mainScene = QE.SceneManager.instance.currentScene;
        const mainCamera = QE.Camera.MainCamera;
        mainCamera.setCameraType(QE.CameraType.Perspective);

        const cameraNode = mainCamera.transform;
        cameraNode.localPosition = new QE.Vector3(0, 0, -6);

        // mesh
        const mesh = new QE.Mesh();
        mesh.name = 'myMesh';
        QE.PrefabFactory.createCube(mesh);

        const node = mainScene.createNode();

        const meshRender = node.addComponent<QE.MeshRender>(QE.MeshRender);
        meshRender.mesh = mesh;
        meshRender.setMaterial(QE.Material.getDefaultCubeMaterial());

        node.transform.localPosition = new QE.Vector3(0, 0, 0);
        node.name = 'Node';
        // mesh
        const sphereMesh = new QE.Mesh();
        sphereMesh.name = 'mySphereMesh';

        QE.PrefabFactory.createCube(sphereMesh);

        const sphereNode = mainScene.createNode(node.transform);
        sphereNode.name = 'sphereNode';

        const sphereMeshRender = sphereNode.addComponent<QE.MeshRender>(QE.MeshRender);
        sphereMeshRender.mesh = sphereMesh;
        sphereMeshRender.setMaterial(QE.Material.getDefaultCubeMaterial());

        QE.ResourceManager.load<QE.Texture>('assets/res/icon.png').then((tex: QE.Texture) => {
            sphereMeshRender.getMaterial().shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;

            sphereNode.transform.localPosition = new QE.Vector3(1, 0, 0);
            sphereNode.transform.localScale = new QE.Vector3(0.5, 0.5, 0.5);

            // 添加Animator组件
            const animator = node.addComponent<Animator>(Animator);

            // 创建动画控制器
            const animController = new AnimatorController();

            // 创建动画片段
            const posClip = new AnimationClip();
            posClip.name = 'move';

            const curveRX = new QE.AnimationCurve();
            curveRX.addKeyFrameByValue(0, 0);
            curveRX.addKeyFrameByValue(2000, -0);

            const curveRY = new QE.AnimationCurve();
            curveRY.addKeyFrameByValue(0, 0);
            curveRY.addKeyFrameByValue(2000, 360);

            const curveRZ = new QE.AnimationCurve();
            curveRZ.addKeyFrameByValue(0, 0);
            curveRZ.addKeyFrameByValue(2000, 0);

            // 组装动画
            // curve
            posClip.addCurve('Node/sphereNode', QE.Reflection.Type.typeOf(Transform), 'localEulerAngle.x', curveRX);
            posClip.addCurve('Node/sphereNode', QE.Reflection.Type.typeOf(Transform), 'localEulerAngle.y', curveRY);
            posClip.addCurve('Node/sphereNode', QE.Reflection.Type.typeOf(Transform), 'localEulerAngle.z', curveRZ);

            const curveTX = new QE.AnimationCurve();
            curveTX.addKeyFrameByValue(0, 1);
            curveTX.addKeyFrameByValue(2000, 2);

            const curveTY = new QE.AnimationCurve();
            curveTY.addKeyFrameByValue(0, 0);
            curveTY.addKeyFrameByValue(2000, 0);

            const curveTZ = new QE.AnimationCurve();
            curveTZ.addKeyFrameByValue(0, 0);
            curveTZ.addKeyFrameByValue(2000, 0);

            //
            posClip.addCurve('Node/sphereNode', QE.Reflection.Type.typeOf(Transform), 'localPosition.x', curveTX);
            posClip.addCurve('Node/sphereNode', QE.Reflection.Type.typeOf(Transform), 'localPosition.y', curveTY);
            posClip.addCurve('Node/sphereNode', QE.Reflection.Type.typeOf(Transform), 'localPosition.z', curveTZ);

            posClip.length = 2000;

            animController.addClip(posClip);
            animator.animController = animController;

            animator.play('move');
        });
    }
}
