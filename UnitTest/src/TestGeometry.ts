module UnitTest {

    export function testGeometry() {

        let mainScene = QE.SceneManager.instance.currentScene;
        let mainCamera = QE.Camera.MainCamera;
        mainCamera.setCameraType(QE.CameraType.Perspective);
        mainCamera.renderContext.setColorClear(QE.ClearMask.ALL, [0, 0, 0, 0], 1, 0);

        let cameraNode = mainCamera.transform;
        cameraNode.localPosition = new QE.Vector3(0, 0, -3);
        cameraNode.localEulerAngle = new QE.Vector3(45, 45, 0);

        // mesh
        let mesh = new QE.Mesh();
        mesh.name = 'myMesh';
        QE.PrefabFactory.createCube(mesh);
        // mesh
        let sphereMesh = new QE.Mesh();
        sphereMesh.name = 'mySphereMesh';

        QE.PrefabFactory.createSphere(sphereMesh);

        let node = mainScene.createNode();
        let meshRender = node.addComponent<QE.MeshRender>(QE.MeshRender);
        meshRender.mesh = sphereMesh;
        meshRender.setMaterial(QE.Material.getDefaultCubeMaterial());

        node.transform.localPosition = new QE.Vector3(0, 0, 0);
        node.name = 'Node';
        let rot = new QE.Quaternion();

        let x = 0;
        let y = 0;
        let z = 0;

        setInterval(function () {
            // node.transform.localRotation = rot.FromEulerAngle(new QE.Vector3(x, y++, z));
            // node.transform.localPosition = new QE.Vector3((x++) * 0.01, 0, 0);
        }, 100);
    }

}