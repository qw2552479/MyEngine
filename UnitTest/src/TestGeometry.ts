module UnitTest {

    export function testGeometry() {

        let mainScene = QuickEngine.SceneManager.instance.currentScene;
        let mainCamera = QuickEngine.Camera.MainCamera;
        mainCamera.setCameraType(QuickEngine.CameraType.Prespective);

        let cameraNode = mainCamera.transform;
        cameraNode.localPosition = new QuickEngine.Vector3(0, 0, -6);

        // mesh
        let mesh = new QuickEngine.Mesh();
        mesh.name = "myMesh";
        QuickEngine.PrefabFactory.createCube(mesh);
        // mesh
        let sphereMesh = new QuickEngine.Mesh();
        sphereMesh.name = "mySphereMesh";

        QuickEngine.PrefabFactory.createSphere(sphereMesh);

        let node = mainScene.createNode();
        let meshRender = node.addComponent<QuickEngine.MeshRender>(QuickEngine.MeshRender);
        meshRender.mesh = sphereMesh;
        meshRender.setMaterial(QuickEngine.Material.getDefaultCubeMaterial());

        node.transform.localPosition = new QuickEngine.Vector3(0, 0, 0);
        node.name = "Node";
        let rot = new QuickEngine.Quaternion();

        let x = 0;
        let y = 0;
        let z = 0;

        node.transform.localRotation = rot.FromEulerAngle(new QuickEngine.Vector3(0, 0, 0));
        setInterval(function () {
           // node.transform.localRotation = rot.FromEulerAngle(new QuickEngine.Vector3(x, y++, z));
            node.transform.localPosition = new QuickEngine.Vector3((x++)*0.01, 0, 0);
        }, 100);  

        let node2 = mainScene.createNode(node.transform);
        node2.name = "Node2";
        let meshRender2 = node2.addComponent<QuickEngine.MeshRender>(QuickEngine.MeshRender);
        meshRender2.mesh = mesh;
        meshRender2.setMaterial(QuickEngine.Material.getDefaultCubeMaterial());

        node2.transform.localPosition = new QuickEngine.Vector3(-1.5, 0, 0);
        node2.transform.localScale = new QuickEngine.Vector3(1, 1, 1);

        let sphereNode = mainScene.createNode(node2.transform);
        sphereNode.name = "sphereNode";

        let sphereMeshRender = sphereNode.addComponent<QuickEngine.MeshRender>(QuickEngine.MeshRender);
        sphereMeshRender.mesh = sphereMesh;
        sphereMeshRender.setMaterial(QuickEngine.Material.getDefaultCubeMaterial());

        sphereNode.transform.localPosition = new QuickEngine.Vector3(-1.5, 0, 0);

        let x2 = 0, y2 = 0;
        setInterval(function () {
            node2.transform.localRotation = rot.FromEulerAngle(new QuickEngine.Vector3(0, y2++, 0));
          //  node2.transform.localPosition = new QuickEngine.Vector3(-1.5 - (x2++)*0.01, 0, 0);
        }, 100);

        let tex = QuickEngine.ResourceManager.instance.load<QuickEngine.Texture>("assets/res/icon.png",  QuickEngine.Reflection.Type.typeOf(QuickEngine.Texture));
        sphereMeshRender.getMaterial().shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;
    }

}