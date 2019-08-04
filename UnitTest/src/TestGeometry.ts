module UnitTest {

    export function testGeometry() {

        let mainScene = QuickEngine.SceneManager.instance.currentScene;
        let mainCamera = QuickEngine.Camera.MainCamera;
        mainCamera.setCameraType(QuickEngine.CameraType.Perspective);
        mainCamera.renderContext.setColorClear(QuickEngine.ClearMask.ALL, [0, 0, 0, 0], 1, 0);

        let cameraNode = mainCamera.transform;
        cameraNode.localPosition = new QuickEngine.Vector3(0, 0, 6);

        // mesh
        let mesh = new QuickEngine.Mesh();
        mesh.name = 'myMesh';
        QuickEngine.PrefabFactory.createCube(mesh);
        // mesh
        let sphereMesh = new QuickEngine.Mesh();
        sphereMesh.name = 'mySphereMesh';

        QuickEngine.PrefabFactory.createSphere(sphereMesh);

        let node = mainScene.createNode();
        let meshRender = node.addComponent<QuickEngine.MeshRender>(QuickEngine.MeshRender);
        meshRender.mesh = sphereMesh;
        meshRender.setMaterial(QuickEngine.Material.getDefaultCubeMaterial());

        node.transform.localPosition = new QuickEngine.Vector3(0, 0, 0);
        node.name = 'Node';
        let rot = new QuickEngine.Quaternion();

        let x = 0;
        let y = 0;
        let z = 0;

        setInterval(function () {
            // node.transform.localRotation = rot.FromEulerAngle(new QuickEngine.Vector3(x, y++, z));
            // node.transform.localPosition = new QuickEngine.Vector3((x++) * 0.01, 0, 0);
        }, 100);
    }

}