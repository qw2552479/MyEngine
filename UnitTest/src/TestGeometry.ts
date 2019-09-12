module UnitTest {

    export function testGeometry() {

        const mainScene = QE.SceneManager.instance.currentScene;
        const mainCamera = QE.Camera.MainCamera;
        mainCamera.setCameraType(QE.CameraType.Perspective);
        mainCamera.renderContext.setColorClear(QE.ClearMask.ALL, [0, 0, 0, 0], 1, 0);

        const cameraNode = mainCamera.transform;
        cameraNode.localPosition = new QE.Vector3(0, 0, -3);
        cameraNode.localEulerAngle = new QE.Vector3(45, 45, 0);

        // mesh
        const mesh = QE.BuiltinResFactory.getCube();
        mesh.name = 'myMesh';
        // mesh
        const sphereMesh = QE.BuiltinResFactory.getSphere();
        sphereMesh.name = 'mySphereMesh';

        const node = mainScene.createNode();
        const meshRender = node.addComponent<QE.MeshRender>(QE.MeshRender);
        meshRender.mesh = sphereMesh;
        meshRender.setMaterial(QE.Material.getDefaultCubeMaterial());
        // meshRender.getMaterial().textures
        QE.ResourceManager.load<QE.Texture>('UnitTest/assets/res/icon.png').then((tex) => {
            QE.Material.getDefaultCubeMaterial().shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;
        });

        node.transform.localPosition = new QE.Vector3(0, 0, 0);
        node.name = 'Node';
        const rot = new QE.Quaternion();

        const x = 0;
        let y = 0;
        const z = 0;

        setInterval(function () {
            node.transform.localRotation = rot.fromEulerAngle(new QE.Vector3(x, y++, z));
            // node.transform.localPosition = new QE.Vector3((x++) * 0.01, 0, 0);
        }, 100);
    }

}
