var UnitTest;
(function (UnitTest) {
    var Animator = QuickEngine.Animator;
    var AnimationClip = QuickEngine.AnimationClip;
    var AnimatorController = QuickEngine.AnimatorController;
    var Transform = QuickEngine.Transform;
    function testAnimation() {
        let mainScene = QuickEngine.SceneManager.instance.currentScene;
        let mainCamera = QuickEngine.Camera.MainCamera;
        mainCamera.setCameraType(0 /* Perspective */);
        let cameraNode = mainCamera.transform;
        cameraNode.localPosition = new QuickEngine.Vector3(0, 0, -6);
        // mesh
        let mesh = new QuickEngine.Mesh();
        mesh.name = "myMesh";
        QuickEngine.PrefabFactory.createCube(mesh);
        let node = mainScene.createNode();
        let meshRender = node.addComponent(QuickEngine.MeshRender);
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
        let sphereMeshRender = sphereNode.addComponent(QuickEngine.MeshRender);
        sphereMeshRender.mesh = sphereMesh;
        sphereMeshRender.setMaterial(QuickEngine.Material.getDefaultCubeMaterial());
        let tex = QuickEngine.ResourceManager.instance.load("assets/res/icon.png", QuickEngine.Reflection.Type.typeOf(QuickEngine.Texture));
        sphereMeshRender.getMaterial().shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;
        sphereNode.transform.localPosition = new QuickEngine.Vector3(1, 0, 0);
        sphereNode.transform.localScale = new QuickEngine.Vector3(0.5, 0.5, 0.5);
        // 添加Animator组件
        let animator = node.addComponent(Animator);
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
        curveTZ.addKeyFrameByValue(2000, 0);
        //
        posClip.addCurve("Node/sphereNode", QuickEngine.Reflection.Type.typeOf(Transform), "localPosition.x", curveTX);
        posClip.addCurve("Node/sphereNode", QuickEngine.Reflection.Type.typeOf(Transform), "localPosition.y", curveTY);
        posClip.addCurve("Node/sphereNode", QuickEngine.Reflection.Type.typeOf(Transform), "localPosition.z", curveTZ);
        posClip.length = 2000;
        animController.addClip(posClip);
        animator.animController = animController;
        animator.play("move");
    }
    UnitTest.testAnimation = testAnimation;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    class TestComponent extends QuickEngine.Component {
        constructor() {
            super(...arguments);
            this.onLoad = function () {
                console.log("UnitTest.TestComponent onLoad");
            };
            this.onUpdate = function () {
                console.log("UnitTest.TestComponent onUpdate");
            };
        }
    }
    TestComponent.__ClassName__ = "UnitTest.TestComponent";
    TestComponent.__ClassID__ = 0;
    function testComponent() {
        let mainScene = QuickEngine.SceneManager.instance.currentScene;
        let emptyNode = mainScene.createNode();
        let testComponent = emptyNode.addComponent(TestComponent);
        return testComponent;
    }
    UnitTest.testComponent = testComponent;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    var QuickEvent = QuickEngine.QuickEvent;
    var QuickListener = QuickEngine.QuickListener;
    var QuickEvent1 = QuickEngine.QuickEvent1;
    var QuickListener1 = QuickEngine.QuickListener1;
    var QuickEvent2 = QuickEngine.QuickEvent2;
    var QuickListener2 = QuickEngine.QuickListener2;
    var QuickEvent3 = QuickEngine.QuickEvent3;
    var QuickListener3 = QuickEngine.QuickListener3;
    var QuickEvent4 = QuickEngine.QuickEvent4;
    var QuickListener4 = QuickEngine.QuickListener4;
    class TestCaller {
        m() {
            console.log("TestCaller m");
        }
        m1(a) {
            console.log("TestCaller m1: " + a);
        }
        m2(a, b) {
            console.log("TestCaller m2: " + a + " b:" + b);
        }
        m3(a, b, c) {
            console.log("TestCaller m3: " + a + " b: " + b + " c:" + c);
        }
        m4(a, b, c, d) {
            console.log("TestCaller m4: " + a + " b: " + b + " c:" + c + " d: " + d);
        }
    }
    function testEvent() {
        test();
        test1();
        test2();
        test3();
        test4();
    }
    UnitTest.testEvent = testEvent;
    function test() {
        let evt = new QuickEvent();
        let listener = new QuickListener(new TestCaller(), TestCaller.prototype.m);
        evt.add(listener);
        let listener2 = new QuickListener(undefined, () => { console.log("QuickListener<Object, string>"); });
        evt.add(listener2);
        evt.dispatchEvent();
    }
    function test1() {
        let evt = new QuickEvent1();
        let listener = new QuickListener1(new TestCaller(), TestCaller.prototype.m1);
        evt.add(listener);
        let listener2 = new QuickListener1(undefined, (a) => { console.log("QuickListener1<Object, string>: " + a); });
        evt.add(listener2);
        evt.dispatchEvent("fuck xiaoming");
    }
    function test2() {
        let evt = new QuickEvent2();
        let listener = new QuickListener2(new TestCaller(), TestCaller.prototype.m2);
        evt.add(listener);
        let listener2 = new QuickListener2(undefined, (a) => { console.log("QuickListener2<Object, string>: " + a); });
        evt.add(listener2);
        evt.dispatchEvent("fuck xiaoming", 1);
    }
    function test3() {
        let evt = new QuickEvent3();
        let listener = new QuickListener3(new TestCaller(), TestCaller.prototype.m3);
        evt.add(listener);
        let listener2 = new QuickListener3(undefined, (a) => { console.log("QuickListener3<Object, string>: " + a); });
        evt.add(listener2);
        evt.dispatchEvent("fuck xiaoming", 1, 2);
    }
    function test4() {
        let evt = new QuickEvent4();
        let listener = new QuickListener4(new TestCaller(), TestCaller.prototype.m4);
        evt.add(listener);
        let listener2 = new QuickListener4(undefined, (a) => { console.log("QuickListener4<Object, string>: " + a); });
        evt.add(listener2);
        evt.dispatchEvent("fuck xiaoming", 1, 2, 3);
    }
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    var SceneManager = QuickEngine.SceneManager;
    var Camera = QuickEngine.Camera;
    var Vector3 = QuickEngine.Vector3;
    var Material = QuickEngine.Material;
    function testFbxModel() {
        let mainScene = SceneManager.instance.currentScene;
        let mainCamera = Camera.MainCamera;
        mainCamera.setCameraType(0 /* Perspective */);
        let cameraNode = mainCamera.transform;
        cameraNode.localPosition = new Vector3(0, 0, -10);
        let modelName = "jianshi";
        //    let modelName = "chan";
        let p = QuickEngine.ResourceManager.instance.loadAsync("assets/res/model/" + modelName + "/" + modelName + ".mesh.json", QuickEngine.Reflection.Type.typeOf(QuickEngine.TextResource));
        p.then(function (res) {
            let tex = QuickEngine.ResourceManager.instance.load("assets/res/model/" + modelName + "/" + modelName + ".png", QuickEngine.Reflection.Type.typeOf(QuickEngine.Texture));
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
    UnitTest.testFbxModel = testFbxModel;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    function testGeometry() {
        let mainScene = QuickEngine.SceneManager.instance.currentScene;
        let mainCamera = QuickEngine.Camera.MainCamera;
        mainCamera.setCameraType(0 /* Perspective */);
        mainCamera.renderContext.setColorClear(7 /* ALL */, [0, 0, 0, 0], 1, 0);
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
        let meshRender = node.addComponent(QuickEngine.MeshRender);
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
    UnitTest.testGeometry = testGeometry;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    var TestGetSet;
    (function (TestGetSet) {
        // 测试js不同方式获取值的性能
        // 1. get set方法
        // 2. 直接读取属性
        // 3. 函数取值
        // 结果：第一种和第三中差别不大，这两种耗时约等于第二种的十倍
        class TestGetSetObj {
            get hehe() {
                return this._hehe;
            }
            set hehe(val) {
                this._hehe = val;
            }
            getHehe() {
                return this._hehe;
            }
        }
        function run() {
            let count = 1000;
            let testObj = new TestGetSetObj();
            //for (let i = 0; i < count; i++) {
            //    array[i] = i;
            //    floatArray[i] = i;
            //}
            console.time("get function");
            for (let i = 0; i < count; i++) {
                let t = testObj.hehe;
            }
            console.timeEnd("get function");
            console.time("property value");
            for (let i = 0; i < count; i++) {
                let t = testObj._hehe;
            }
            console.timeEnd("property value");
            console.time("getHehe function");
            for (let i = 0; i < count; i++) {
                let t = testObj.getHehe();
            }
            console.timeEnd("getHehe function");
        }
        TestGetSet.run = run;
    })(TestGetSet = UnitTest.TestGetSet || (UnitTest.TestGetSet = {}));
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    //最小堆：根结点的键值是所有堆结点键值中最小者。
    function testMinHeap() {
        //let k, n = 11, a = [0, 5, 2, 4, 9, 7, 3, 1, 10, 8, 6];
        //let test = new QuickEngine.MinHeap<number>();
        //for (k = 0; k < n; k++)
        //    test.enqueue(a[k]);
        //for (k = 0; k < n; k++)
        //    console.log(test.dequeue());
        function comparer(x, y) {
            return x.v - y.v;
        }
        let k, n = 11, a = [
            { v: 0, b: 2 },
            { v: 5, b: 2 },
            { v: 2, b: 2 },
            { v: 4, b: 2 },
            { v: 9, b: 2 },
            { v: 7, b: 2 },
            { v: 3, b: 2 },
            { v: 1, b: 2 },
            { v: 10, b: 2 },
            { v: 8, b: 2 },
            { v: 6, b: 2 }
        ];
        let test = new QuickEngine.MinHeap(comparer);
        for (k = 0; k < n; k++)
            test.enqueue(a[k]);
        for (k = 0; k < n; k++)
            console.log(test.dequeue());
    }
    UnitTest.testMinHeap = testMinHeap;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    var TextResource = QuickEngine.TextResource;
    var Type = QuickEngine.Reflection.Type;
    function testTextLoader() {
        let p = QuickEngine.ResourceManager.instance.loadAsync('assets/res/test.txt', Type.typeOf(TextResource));
        p.then(function (textRes) {
            console.log(textRes.data);
        });
    }
    UnitTest.testTextLoader = testTextLoader;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    function initScene() {
        let mainScene = QuickEngine.SceneManager.instance.currentScene;
        let mainCamera = QuickEngine.Camera.MainCamera;
        mainCamera.setCameraType(1 /* Orthogonal */);
        let cameraNode = mainCamera.node.transform;
        cameraNode.localPosition = new QuickEngine.Vector3(0, 0, -10);
        cameraNode.localEulerAngle = new QuickEngine.Vector3(1, 1, 1);
    }
    function testSprite() {
        initScene();
        let mainScene = QuickEngine.SceneManager.instance.currentScene;
        let i = 0;
        let meshNode = mainScene.createNode();
        let spriteRender = meshNode.addComponent(QuickEngine.SpriteRender);
        let material = QuickEngine.SpriteMaterial.getDefaultSpriteMaterial();
        spriteRender.setMaterial(material);
        let tex = QuickEngine.ResourceManager.instance.load("assets/res/icon.png", QuickEngine.Reflection.Type.typeOf(QuickEngine.Texture));
        material.shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;
        meshNode.transform.localPosition = new QuickEngine.Vector3(0.1 * i, 0.1 * i, 1 * 0.1);
        setTimeout(function () {
            meshNode.transform.localPosition = new QuickEngine.Vector3(meshNode.transform.localPosition.x + 0.1, meshNode.transform.localPosition.y + 0.1, 1);
        }, this);
    }
    UnitTest.testSprite = testSprite;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    var TestMatrix;
    (function (TestMatrix) {
        function run() {
        }
        TestMatrix.run = run;
    })(TestMatrix = UnitTest.TestMatrix || (UnitTest.TestMatrix = {}));
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    // TODO: 重构测试框架
    function run() {
        let div = document.getElementById('gameDiv');
        QuickEngine.run({
            width: 720,
            height: 1280,
            div: div,
            debugMode: false,
            onEnginePrepared: function () {
                // testTextLoader();
                // testEvent();
                // TestPerformenceArrayBufferAndArray.run();
                // TestGetSet.run();
                // testMinHeap();
                // UnitTest.TestMatrix.run();
                // testSprite();
                // testAnimation();
                UnitTest.testGeometry();
                // testFbxModel();
            }
        });
    }
    UnitTest.run = run;
})(UnitTest || (UnitTest = {}));
window.onload = () => {
    UnitTest.run();
};
function dumpSceneHierarchy() {
    let obj = {};
    let animator;
    let currScene = QuickEngine.SceneManager.instance.currentScene;
    for (let i = 0; i < currScene.children.length; i++) {
        let rootChild = currScene.children[i];
        let childObj = obj[rootChild.name] = {};
        childObj['pos'] = [rootChild.transform.localPosition.x, rootChild.transform.localPosition.y, rootChild.transform.localPosition.z];
        animator = rootChild.getComponent(QuickEngine.Animator);
        function searchChild(rootNode, dict) {
            for (let ii = 0; ii < rootNode.childCount; ii++) {
                let subChild = rootNode.getChildByIndex(ii);
                let subChildObj = dict[subChild.node.name] = {};
                subChildObj['node'] = subChild.node;
                subChildObj['pos'] = [subChild.localPosition.x, subChild.localPosition.y, subChild.localPosition.z];
                searchChild(subChild, subChildObj);
            }
        }
        searchChild(rootChild.transform, childObj);
    }
    return obj;
}
function step(timePos) {
    let rootChild = QuickEngine.SceneManager.instance.currentScene.children[1].transform.getChildByIndex(0).node;
    let animator = QuickEngine.SceneManager.instance.currentScene.children[1].transform.getChildByIndex(0).node.getComponent(QuickEngine.Animator);
    ;
    animator.animController.animationClips[0].apply(rootChild, timePos);
}
function play() {
    let rootChild = QuickEngine.SceneManager.instance.currentScene.children[1].transform.node;
    let animator = QuickEngine.SceneManager.instance.currentScene.children[1].getComponent(QuickEngine.Animator);
    ;
    animator.play('Take 001');
}
function findChild(name) {
    let rootChild = QuickEngine.SceneManager.instance.currentScene.children[1].transform.node;
    return rootChild.transform.find(name);
}
//# sourceMappingURL=unittest.js.map