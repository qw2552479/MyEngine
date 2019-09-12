var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var UnitTest;
(function (UnitTest) {
    var Animator = QE.Animator;
    var AnimationClip = QE.AnimationClip;
    var AnimatorController = QE.AnimatorController;
    var Transform = QE.Transform;
    function testAnimation() {
        var mainScene = QE.SceneManager.instance.currentScene;
        var mainCamera = QE.Camera.MainCamera;
        mainCamera.setCameraType(0 /* Perspective */);
        var cameraNode = mainCamera.transform;
        cameraNode.localPosition = new QE.Vector3(0, 0, -6);
        // mesh
        var mesh = QE.BuiltinResFactory.getCube();
        mesh.name = 'myMesh';
        var node = mainScene.createNode();
        var meshRender = node.addComponent(QE.MeshRender);
        meshRender.mesh = mesh;
        meshRender.setMaterial(QE.Material.getDefaultCubeMaterial());
        node.transform.localPosition = new QE.Vector3(0, 0, 0);
        node.name = 'Node';
        // mesh
        var sphereMesh = QE.BuiltinResFactory.getSphere();
        sphereMesh.name = 'mySphereMesh';
        var sphereNode = mainScene.createNode(node.transform);
        sphereNode.name = 'sphereNode';
        var sphereMeshRender = sphereNode.addComponent(QE.MeshRender);
        sphereMeshRender.mesh = sphereMesh;
        sphereMeshRender.setMaterial(QE.Material.getDefaultCubeMaterial());
        QE.ResourceManager.load('assets/assets/icon.png').then(function (tex) {
            sphereMeshRender.getMaterial().shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;
            sphereNode.transform.localPosition = new QE.Vector3(1, 0, 0);
            sphereNode.transform.localScale = new QE.Vector3(0.5, 0.5, 0.5);
            // 添加Animator组件
            var animator = node.addComponent(Animator);
            // 创建动画控制器
            var animController = new AnimatorController();
            // 创建动画片段
            var posClip = new AnimationClip();
            posClip.name = 'move';
            var curveRX = new QE.AnimationCurve();
            curveRX.addKeyFrameByValue(0, 0);
            curveRX.addKeyFrameByValue(2000, -0);
            var curveRY = new QE.AnimationCurve();
            curveRY.addKeyFrameByValue(0, 0);
            curveRY.addKeyFrameByValue(2000, 360);
            var curveRZ = new QE.AnimationCurve();
            curveRZ.addKeyFrameByValue(0, 0);
            curveRZ.addKeyFrameByValue(2000, 0);
            // 组装动画
            // curve
            posClip.addCurve('Node/sphereNode', QE.Reflection.Type.typeOf(Transform), 'localEulerAngle.x', curveRX);
            posClip.addCurve('Node/sphereNode', QE.Reflection.Type.typeOf(Transform), 'localEulerAngle.y', curveRY);
            posClip.addCurve('Node/sphereNode', QE.Reflection.Type.typeOf(Transform), 'localEulerAngle.z', curveRZ);
            var curveTX = new QE.AnimationCurve();
            curveTX.addKeyFrameByValue(0, 1);
            curveTX.addKeyFrameByValue(2000, 2);
            var curveTY = new QE.AnimationCurve();
            curveTY.addKeyFrameByValue(0, 0);
            curveTY.addKeyFrameByValue(2000, 0);
            var curveTZ = new QE.AnimationCurve();
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
    UnitTest.testAnimation = testAnimation;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    var TestComponent = /** @class */ (function (_super) {
        __extends(TestComponent, _super);
        function TestComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.onLoad = function () {
                console.log('UnitTest.TestComponent onLoad');
            };
            _this.onUpdate = function () {
                console.log('UnitTest.TestComponent onUpdate');
            };
            return _this;
        }
        return TestComponent;
    }(QE.Component));
    function testComponent() {
        var mainScene = QE.SceneManager.instance.currentScene;
        var emptyNode = mainScene.createNode();
        var testComponent = emptyNode.addComponent(TestComponent);
        return testComponent;
    }
    UnitTest.testComponent = testComponent;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    var TestCaller = /** @class */ (function () {
        function TestCaller() {
        }
        TestCaller.prototype.m = function () {
            console.log('TestCaller m');
        };
        TestCaller.prototype.m1 = function (a) {
            console.log('TestCaller m1: ' + a);
        };
        TestCaller.prototype.m2 = function (a, b) {
            console.log('TestCaller m2: ' + a + ' b:' + b);
        };
        TestCaller.prototype.m3 = function (a, b, c) {
            console.log('TestCaller m3: ' + a + ' b: ' + b + ' c:' + c);
        };
        TestCaller.prototype.m4 = function (a, b, c, d) {
            console.log('TestCaller m4: ' + a + ' b: ' + b + ' c:' + c + ' d: ' + d);
        };
        return TestCaller;
    }());
    function testEvent() {
        test();
        test1();
        test2();
        test3();
        test4();
    }
    UnitTest.testEvent = testEvent;
    function test() {
        var evt = new QE.QEEvent();
        var listener = new QE.QEListener(new TestCaller(), TestCaller.prototype.m);
        evt.add(listener);
        var listener2 = new QE.QEListener(undefined, function () {
            console.log('QEListener<Object, string>');
        });
        evt.add(listener2);
        evt.dispatchEvent();
    }
    function test1() {
        var evt = new QE.QEEvent1();
        var listener = new QE.QEListener1(new TestCaller(), TestCaller.prototype.m1);
        evt.add(listener);
        var listener2 = new QE.QEListener1(undefined, function (a) {
            console.log('QEListener1<Object, string>: ' + a);
        });
        evt.add(listener2);
        evt.dispatchEvent('fuck xiaoming');
    }
    function test2() {
        var evt = new QE.QEEvent2();
        var listener = new QE.QEListener2(new TestCaller(), TestCaller.prototype.m2);
        evt.add(listener);
        var listener2 = new QE.QEListener2(undefined, function (a) {
            console.log('QEListener2<Object, string>: ' + a);
        });
        evt.add(listener2);
        evt.dispatchEvent('fuck xiaoming', 1);
    }
    function test3() {
        var evt = new QE.QEEvent3();
        var listener = new QE.QEListener3(new TestCaller(), TestCaller.prototype.m3);
        evt.add(listener);
        var listener2 = new QE.QEListener3(undefined, function (a) {
            console.log('QEListener3<Object, string>: ' + a);
        });
        evt.add(listener2);
        evt.dispatchEvent('fuck xiaoming', 1, 2);
    }
    function test4() {
        var evt = new QE.QEEvent4();
        var listener = new QE.QEListener4(new TestCaller(), TestCaller.prototype.m4);
        evt.add(listener);
        var listener2 = new QE.QEListener4(undefined, function (a) {
            console.log('QEListener4<Object, string>: ' + a);
        });
        evt.add(listener2);
        evt.dispatchEvent('fuck xiaoming', 1, 2, 3);
    }
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    var SceneManager = QE.SceneManager;
    var Camera = QE.Camera;
    var Vector3 = QE.Vector3;
    var Material = QE.Material;
    function testFbxModel() {
        var mainScene = SceneManager.instance.currentScene;
        var mainCamera = Camera.MainCamera;
        mainCamera.setCameraType(0 /* Perspective */);
        var cameraNode = mainCamera.transform;
        cameraNode.localPosition = new Vector3(0, 0, -10);
        var modelName = 'jianshi';
        //    let modelName = "chan";
        var modelPath = 'UnitTest/assets/res/model/' + modelName + '/' + modelName + '.mesh.json';
        QE.ResourceManager.load(modelPath)
            .then(function (res) {
            QE.ResourceManager.load('UnitTest/assets/res/model/' + modelName + '/' + modelName + '.png')
                .then(function (tex) {
                Material.getDefaultCubeMaterial().shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;
                var rootNode = mainScene.createNode();
                var model = QE.MeshSerializer.loadModel(JSON.parse(res.text));
                var transform = model.transform;
                transform.localPosition = new Vector3(0, -1, 0);
                transform.localScale = new Vector3(1, 1, 1);
                rootNode.transform.parent = model.transform;
                var eulerAngle = new QE.Vector3(0, 0, 0);
                rootNode.transform.localRotation = rootNode.transform.localRotation.fromEulerAngle(eulerAngle);
            });
        });
    }
    UnitTest.testFbxModel = testFbxModel;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    function testGeometry() {
        var mainScene = QE.SceneManager.instance.currentScene;
        var mainCamera = QE.Camera.MainCamera;
        mainCamera.setCameraType(0 /* Perspective */);
        mainCamera.renderContext.setColorClear(7 /* ALL */, [0, 0, 0, 0], 1, 0);
        var cameraNode = mainCamera.transform;
        cameraNode.localPosition = new QE.Vector3(0, 0, -3);
        cameraNode.localEulerAngle = new QE.Vector3(45, 45, 0);
        // mesh
        var mesh = QE.BuiltinResFactory.getCube();
        mesh.name = 'myMesh';
        // mesh
        var sphereMesh = QE.BuiltinResFactory.getSphere();
        sphereMesh.name = 'mySphereMesh';
        var node = mainScene.createNode();
        var meshRender = node.addComponent(QE.MeshRender);
        meshRender.mesh = sphereMesh;
        meshRender.setMaterial(QE.Material.getDefaultCubeMaterial());
        // meshRender.getMaterial().textures
        QE.ResourceManager.load('UnitTest/assets/res/icon.png').then(function (tex) {
            QE.Material.getDefaultCubeMaterial().shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;
        });
        node.transform.localPosition = new QE.Vector3(0, 0, 0);
        node.name = 'Node';
        var rot = new QE.Quaternion();
        var x = 0;
        var y = 0;
        var z = 0;
        setInterval(function () {
            node.transform.localRotation = rot.fromEulerAngle(new QE.Vector3(x, y++, z));
            // node.transform.localPosition = new QE.Vector3((x++) * 0.01, 0, 0);
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
        var TestGetSetObj = /** @class */ (function () {
            function TestGetSetObj() {
            }
            Object.defineProperty(TestGetSetObj.prototype, "hehe", {
                get: function () {
                    return this._hehe;
                },
                set: function (val) {
                    this._hehe = val;
                },
                enumerable: true,
                configurable: true
            });
            TestGetSetObj.prototype.getHehe = function () {
                return this._hehe;
            };
            return TestGetSetObj;
        }());
        function run() {
            var count = 1000;
            var testObj = new TestGetSetObj();
            // for (let i = 0; i < count; i++) {
            //    array[i] = i;
            //    floatArray[i] = i;
            // }
            console.time('get function');
            for (var i = 0; i < count; i++) {
                var t = testObj.hehe;
            }
            console.timeEnd('get function');
            console.time('property value');
            for (var i = 0; i < count; i++) {
                var t = testObj._hehe;
            }
            console.timeEnd('property value');
            console.time('getHehe function');
            for (var i = 0; i < count; i++) {
                var t = testObj.getHehe();
            }
            console.timeEnd('getHehe function');
        }
        TestGetSet.run = run;
    })(TestGetSet = UnitTest.TestGetSet || (UnitTest.TestGetSet = {}));
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    // 最小堆：根结点的键值是所有堆结点键值中最小者。
    function testMinHeap() {
        // let k, n = 11, a = [0, 5, 2, 4, 9, 7, 3, 1, 10, 8, 6];
        // let test = new QE.MinHeap<number>();
        // for (k = 0; k < n; k++)
        //    test.enqueue(a[k]);
        // for (k = 0; k < n; k++)
        //    console.log(test.dequeue());
        function comparer(x, y) {
            return x.v - y.v;
        }
        var k, n = 11, a = [
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
        var test = new QE.MinHeap(comparer);
        for (k = 0; k < n; k++) {
            test.enqueue(a[k]);
        }
        for (k = 0; k < n; k++) {
            console.log(test.dequeue());
        }
    }
    UnitTest.testMinHeap = testMinHeap;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    function testTextLoader() {
        QE.ResourceManager.load('assets/assets/test.txt').then(function (textRes) {
            console.log(textRes.text);
        });
    }
    UnitTest.testTextLoader = testTextLoader;
})(UnitTest || (UnitTest = {}));
var UnitTest;
(function (UnitTest) {
    function initScene() {
        var mainScene = QE.SceneManager.instance.currentScene;
        var mainCamera = QE.Camera.MainCamera;
        mainCamera.setCameraType(0 /* Perspective */);
        mainCamera.setNearClip(0.1);
        mainCamera.setFarClip(100);
        mainCamera.setFOV(45);
        var cameraNode = mainCamera.node.transform;
        cameraNode.localPosition = new QE.Vector3(0, 0, -3);
        cameraNode.localEulerAngle = new QE.Vector3(0, 0, 0);
    }
    function testSprite() {
        return __awaiter(this, void 0, void 0, function () {
            var mainScene, tex, meshNode, spriteRender, material;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initScene();
                        mainScene = QE.SceneManager.instance.currentScene;
                        return [4 /*yield*/, QE.ResourceManager.load('UnitTest/assets/res/icon.png')];
                    case 1:
                        tex = _a.sent();
                        meshNode = mainScene.createNode();
                        spriteRender = meshNode.addComponent(QE.SpriteRender);
                        material = QE.SpriteMaterial.getDefaultSpriteMaterial();
                        spriteRender.setMaterial(material);
                        material.shader.shaderPasses[0].getSamplers()[0].samplerTex = tex;
                        return [2 /*return*/];
                }
            });
        });
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
        var _this = this;
        var div = document.getElementById('gameDiv');
        QE.run({
            width: 720,
            height: 1280,
            div: div,
            debugMode: false,
            onEnginePrepared: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // testTextLoader();
                    // testEvent();
                    // TestGetSet.run();
                    // testMinHeap();
                    // UnitTest.TestMatrix.run();
                    // await testSprite();
                    // testAnimation();
                    UnitTest.testGeometry();
                    return [2 /*return*/];
                });
            }); }
        });
    }
    UnitTest.run = run;
})(UnitTest || (UnitTest = {}));
window.onload = function () {
    UnitTest.run();
};
function dumpSceneHierarchy() {
    var obj = {};
    var animator;
    var currScene = QE.SceneManager.instance.currentScene;
    for (var i = 0; i < currScene.children.length; i++) {
        var rootChild = currScene.children[i];
        var childObj = obj[rootChild.name] = {};
        childObj['pos'] = [rootChild.transform.localPosition.x, rootChild.transform.localPosition.y, rootChild.transform.localPosition.z];
        animator = rootChild.getComponent(QE.Animator);
        function searchChild(rootNode, dict) {
            for (var ii = 0; ii < rootNode.childCount; ii++) {
                var subChild = rootNode.getChildByIndex(ii);
                var subChildObj = dict[subChild.node.name] = {};
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
    var rootChild = QE.SceneManager.instance.currentScene.children[1].transform.getChildByIndex(0).node;
    var animator = QE.SceneManager.instance.currentScene.children[1].transform.getChildByIndex(0).node.getComponent(QE.Animator);
    animator.animController.animationClips[0].apply(rootChild, timePos);
}
function play() {
    var rootChild = QE.SceneManager.instance.currentScene.children[1].transform.node;
    var animator = QE.SceneManager.instance.currentScene.children[1].getComponent(QE.Animator);
    animator.play('Take 001');
}
function findChild(name) {
    var rootChild = QE.SceneManager.instance.currentScene.children[1].transform.node;
    return rootChild.transform.find(name);
}

//# sourceMappingURL=unittest.js.map
