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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var QE;
(function (QE) {
    QE.__QE_EDITOR_MODE__ = false;
    QE.__QE_DEBUG__ = true;
    QE.__PROFILER__ = true;
})(QE || (QE = {}));
var QE;
(function (QE) {
    function run(data) {
        QE.WebGLBufferManager.instance.init();
        QE.RenderSystem.instance.init(data.div);
        QE.SceneManager.instance.init();
        window.onresize = function (ev) {
            var w = window.innerWidth;
            var h = window.innerHeight;
            onResize(w, h);
        };
        // 准备内置资源
        QE.ResourceManager.init(function () {
            onResize(window.innerWidth, window.innerHeight);
            frameUpdate(0);
            if (data.onEnginePrepared) {
                data.onEnginePrepared();
            }
        });
    }
    QE.run = run;
    function frameUpdate(deltaTime) {
        renderOneFrame(deltaTime / 1000);
        requestAnimationFrame(frameUpdate);
    }
    function renderOneFrame(deltaTime) {
        var mainScene = QE.SceneManager.instance.currentScene;
        if (!mainScene) {
            return;
        }
        mainScene.update(deltaTime);
        QE.RenderSystem.instance.beginScene();
        mainScene.render();
        QE.RenderSystem.instance.endScene();
        // mainScene.fixedUpdate(dt);
    }
    QE.renderOneFrame = renderOneFrame;
    function onResize(w, h) {
        QE.Screen.screenWidth = w;
        QE.Screen.screenHeight = h;
        QE.SceneManager.instance.currentScene.onResize(w, h);
        QE.RenderSystem.instance.onResize(w, h);
    }
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     * @private
     * 哈希计数
     */
    var _hashCount = 1;
    var _instanceId = 1;
    var HideFlags;
    (function (HideFlags) {
        HideFlags[HideFlags["None"] = 0] = "None";
        HideFlags[HideFlags["HideInHierarchy"] = 1] = "HideInHierarchy";
        HideFlags[HideFlags["HideInInspector"] = 2] = "HideInInspector";
        HideFlags[HideFlags["DontSaveInEditor"] = 4] = "DontSaveInEditor";
        HideFlags[HideFlags["NotEditable"] = 8] = "NotEditable";
        HideFlags[HideFlags["DontSaveInBuild"] = 16] = "DontSaveInBuild";
        HideFlags[HideFlags["DontUnloadUnusedAsset"] = 32] = "DontUnloadUnusedAsset";
        HideFlags[HideFlags["DontSave"] = 52] = "DontSave";
        HideFlags[HideFlags["HideAndDontSave"] = 61] = "HideAndDontSave";
    })(HideFlags = QE.HideFlags || (QE.HideFlags = {}));
    var HashObject = /** @class */ (function () {
        function HashObject() {
            this._isDestroyed = false;
            this._hashCode = _hashCount++;
            this._instanceId = _instanceId++;
        }
        Object.defineProperty(HashObject.prototype, "hashCode", {
            get: function () {
                return this._hashCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HashObject.prototype, "instanceId", {
            get: function () {
                return this._instanceId;
            },
            enumerable: true,
            configurable: true
        });
        HashObject.destroy = function (object) {
            object.destroy();
        };
        HashObject.clone = function (original) {
            return original.clone();
        };
        HashObject.prototype.isDestroyed = function () {
            return this._isDestroyed;
        };
        HashObject.prototype.destroy = function () {
            if (this._isDestroyed) {
                console.warn('重复调用destroy!');
                return;
            }
            this.onDestroy();
            this._isDestroyed = true;
        };
        HashObject.prototype.onDestroy = function () {
        };
        HashObject.prototype.copy = function (object) {
        };
        HashObject.prototype.clone = function () {
            var newObj = new HashObject();
            newObj.copy(this);
            return newObj;
        };
        return HashObject;
    }());
    QE.HashObject = HashObject;
})(QE || (QE = {}));
///<reference path="core/HashObject.ts" />
var QE;
///<reference path="core/HashObject.ts" />
(function (QE) {
    var Scene3D = /** @class */ (function (_super) {
        __extends(Scene3D, _super);
        function Scene3D() {
            var _this = _super.call(this) || this;
            _this._cameras = [];
            _this._frameId = 0;
            _this._rootChildren = [];
            var mainCamera = _this.createNode().addComponent(QE.Camera);
            mainCamera.setAspect(1280 / 720);
            mainCamera.setOrthoWidth(1280);
            mainCamera.setOrthoHeight(720);
            mainCamera.setCameraType(0 /* Perspective */);
            QE.Camera.MainCamera = mainCamera;
            _this._mainCamera = mainCamera;
            _this._cameras = [mainCamera];
            return _this;
        }
        Object.defineProperty(Scene3D.prototype, "children", {
            get: function () {
                return this._rootChildren;
            },
            enumerable: true,
            configurable: true
        });
        Scene3D.prototype.createNode = function (parent) {
            var node = new QE.GameObject();
            var transform = node.transform;
            this._rootChildren.push(node);
            if (parent) {
                transform.parent = parent;
            }
            return node;
        };
        Scene3D.prototype.insertNode = function (node, index) {
            var children = this._rootChildren;
            if (QE.__QE_DEBUG__ && children.indexOf(node) !== -1) {
                console.error('node already in the scene');
            }
            if (index !== undefined) {
                if (QE.__QE_DEBUG__) {
                    console.assert(!isNaN(index) && typeof (index) === 'number', 'the index is error' + index);
                }
                if (index < 0 || index >= children.length) {
                    console.error('insert node failed. the index is error: ' + index);
                    return;
                }
                children.splice(index, 0, node);
            }
            else {
                children.push(node);
            }
        };
        Scene3D.prototype.removeNode = function (node) {
            var children = this._rootChildren;
            if (QE.__QE_DEBUG__ && children.indexOf(node) === -1) {
                console.error('node not in the scene');
            }
            children.splice(children.indexOf(node), 1);
        };
        Scene3D.prototype.onResize = function (w, h) {
            var mainCamera = this._mainCamera;
            if (mainCamera) {
                mainCamera.setAspect(w / h);
                mainCamera.setOrthoWidth(w);
                mainCamera.setOrthoHeight(h);
            }
        };
        Scene3D.prototype.render = function () {
            var cameras = this._cameras;
            for (var i = 0, len = cameras.length; i < len; i++) {
                var camera = cameras[i];
                this._currentCamera = camera;
                camera.renderContext.doRender();
            }
            this._currentCamera = null;
            QE.RenderSystem.instance.setRenderTarget(null);
            this._frameId++;
        };
        Scene3D.prototype.update = function (deltaTime) {
            QE.Component.load();
            QE.Component.update(deltaTime);
            var children = this._rootChildren;
            // 更新动画?
            for (var i = 0, len = children.length; i < len; i++) {
                children[i].transform.update(true, true);
            }
        };
        return Scene3D;
    }(QE.HashObject));
    QE.Scene3D = Scene3D;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var SceneManager = /** @class */ (function () {
        function SceneManager() {
            SceneManager._sInstance = this;
            // 创建默认场景
            this._currentScene = SceneManager.createScene();
        }
        Object.defineProperty(SceneManager, "instance", {
            get: function () {
                if (!SceneManager._sInstance) {
                    SceneManager._sInstance = new SceneManager();
                }
                return this._sInstance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "currentScene", {
            get: function () {
                return this._currentScene;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.createScene = function () {
            return new QE.Scene3D();
        };
        SceneManager.prototype.init = function () {
        };
        return SceneManager;
    }());
    QE.SceneManager = SceneManager;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Screen = /** @class */ (function () {
        function Screen() {
        }
        Screen.screenWidth = 0;
        Screen.screenHeight = 0;
        return Screen;
    }());
    QE.Screen = Screen;
})(QE || (QE = {}));
var QE;
(function (QE) {
    function assert(cond, msg) {
    }
    QE.assert = assert;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Dictionary = /** @class */ (function () {
        function Dictionary(useOrderList) {
            if (useOrderList === void 0) { useOrderList = false; }
            this.data = {};
            this.list = new Array();
            if (useOrderList) {
                this.list = new Array();
            }
        }
        Dictionary.prototype.containsKey = function (key) {
            if (this.data[key]) {
                return true;
            }
            return false;
        };
        Dictionary.prototype.getValue = function (key) {
            return this.data[key];
        };
        Dictionary.prototype.getKeys = function () {
            return Object.keys(this.data);
        };
        Dictionary.prototype.getValues = function () {
            return this.list;
        };
        Dictionary.prototype.add = function (key, value) {
            this.data[key] = value;
            if (this.list) {
                this.list.push(value);
            }
        };
        Dictionary.prototype.remove = function (key) {
            if (this.list) {
                var index = this.list.indexOf(this.data[key]);
                if (index !== -1) {
                    this.list.splice(index);
                }
            }
            delete this.data[key];
        };
        Dictionary.prototype.dispose = function () {
            delete this.data;
            delete this.list;
        };
        return Dictionary;
    }());
    QE.Dictionary = Dictionary;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var QEListener = /** @class */ (function () {
        function QEListener(listener, func) {
            this._listener = listener;
            this._func = func;
        }
        QEListener.prototype.onCall = function () {
            this._func.call(this._listener);
        };
        return QEListener;
    }());
    QE.QEListener = QEListener;
    var QEEvent = /** @class */ (function () {
        function QEEvent() {
            this._listeners = [];
        }
        QEEvent.prototype.add = function (listener) {
            this._listeners.push(listener);
        };
        QEEvent.prototype.del = function (listener) {
            var idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        };
        QEEvent.prototype.clear = function () {
            this._listeners = [];
        };
        QEEvent.prototype.dispatchEvent = function () {
            var listeners = this._listeners;
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall();
            }
        };
        return QEEvent;
    }());
    QE.QEEvent = QEEvent;
    var QEListener1 = /** @class */ (function () {
        function QEListener1(listener, func) {
            this._listener = listener;
            this._func = func;
        }
        QEListener1.prototype.onCall = function (p) {
            this._func.call(this._listener, p);
        };
        return QEListener1;
    }());
    QE.QEListener1 = QEListener1;
    var QEEvent1 = /** @class */ (function () {
        function QEEvent1() {
            this._listeners = [];
        }
        QEEvent1.prototype.add = function (listener) {
            this._listeners.push(listener);
        };
        QEEvent1.prototype.del = function (listener) {
            var idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        };
        QEEvent1.prototype.clear = function () {
            this._listeners = [];
        };
        QEEvent1.prototype.dispatchEvent = function (t) {
            var listeners = this._listeners;
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(t);
            }
        };
        return QEEvent1;
    }());
    QE.QEEvent1 = QEEvent1;
    var QEListener2 = /** @class */ (function () {
        function QEListener2(listener, func) {
            this._listener = listener;
            this._func = func;
        }
        QEListener2.prototype.onCall = function (p1, p2) {
            this._func.call(this._listener, p1, p2);
        };
        return QEListener2;
    }());
    QE.QEListener2 = QEListener2;
    var QEEvent2 = /** @class */ (function () {
        function QEEvent2() {
            this._listeners = [];
        }
        QEEvent2.prototype.add = function (listener) {
            this._listeners.push(listener);
        };
        QEEvent2.prototype.del = function (listener) {
            var idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        };
        QEEvent2.prototype.clear = function () {
            this._listeners = [];
        };
        QEEvent2.prototype.dispatchEvent = function (p1, p2) {
            var listeners = this._listeners;
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(p1, p2);
            }
        };
        return QEEvent2;
    }());
    QE.QEEvent2 = QEEvent2;
    var QEListener3 = /** @class */ (function () {
        function QEListener3(listener, func) {
            this._listener = listener;
            this._func = func;
        }
        QEListener3.prototype.onCall = function (p1, p2, p3) {
            this._func.call(this._listener, p1, p2, p3);
        };
        return QEListener3;
    }());
    QE.QEListener3 = QEListener3;
    var QEEvent3 = /** @class */ (function () {
        function QEEvent3() {
            this._listeners = [];
        }
        QEEvent3.prototype.add = function (listener) {
            this._listeners.push(listener);
        };
        QEEvent3.prototype.del = function (listener) {
            var idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        };
        QEEvent3.prototype.clear = function () {
            this._listeners = [];
        };
        QEEvent3.prototype.dispatchEvent = function (p1, p2, p3) {
            var listeners = this._listeners;
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(p1, p2, p3);
            }
        };
        return QEEvent3;
    }());
    QE.QEEvent3 = QEEvent3;
    var QEListener4 = /** @class */ (function () {
        function QEListener4(listener, func) {
            this._listener = listener;
            this._func = func;
        }
        QEListener4.prototype.onCall = function (p1, p2, p3, p4) {
            this._func.call(this._listener, p1, p2, p3, p4);
        };
        return QEListener4;
    }());
    QE.QEListener4 = QEListener4;
    var QEEvent4 = /** @class */ (function () {
        function QEEvent4() {
            this._listeners = [];
        }
        QEEvent4.prototype.add = function (listener) {
            this._listeners.push(listener);
        };
        QEEvent4.prototype.del = function (listener) {
            var idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        };
        QEEvent4.prototype.clear = function () {
            this._listeners = [];
        };
        QEEvent4.prototype.dispatchEvent = function (p1, p2, p3, p4) {
            var listeners = this._listeners;
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(p1, p2, p3, p4);
            }
        };
        return QEEvent4;
    }());
    QE.QEEvent4 = QEEvent4;
    // ===================  Event4  ===================
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Log = /** @class */ (function () {
        function Log() {
        }
        Log.D = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log.apply(this, arguments);
        };
        Log.I = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.info.apply(this, arguments);
        };
        Log.W = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn.apply(this, arguments);
        };
        Log.E = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.error.apply(this, arguments);
        };
        Log.F = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.error.apply(this, arguments);
        };
        return Log;
    }());
    QE.Log = Log;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     * 最小堆
     */
    var MinHeap = /** @class */ (function () {
        function MinHeap(comparer) {
            this._heap = [];
            this._length = 0;
            this._comparer = comparer;
        }
        /**
         * 元素入队
         * @param x
         */
        MinHeap.prototype.enqueue = function (x) {
            this._heap.push(x);
            this.filterUp(this._length);
            this._length++;
            return true;
        };
        /**
         * 最小元素出队
         */
        MinHeap.prototype.dequeue = function () {
            var heap = this._heap;
            var x = heap[0];
            heap[0] = heap[this._length - 1];
            this._length--;
            this.filterDown(0, this._length - 1); // 调整新的根节点
            return x;
        };
        /**
         * 查看最小元素
         */
        MinHeap.prototype.peek = function () {
            return this._heap[0];
        };
        /**
         * 堆元素数量
         */
        MinHeap.prototype.count = function () {
            return this._length;
        };
        /**
         * 清空队列
         */
        MinHeap.prototype.clear = function () {
            this._heap = [];
            this._length = 0;
        };
        MinHeap.prototype.filterDown = function (start, end) {
            var i = start, j = 2 * i + 1;
            var heap = this._heap;
            var temp = heap[i];
            var comparer = this._comparer;
            if (comparer) {
                while (j <= end) {
                    if ((j < end) && (comparer(heap[j], heap[j + 1]) > 0)) {
                        j++;
                    }
                    if (comparer(temp, heap[j]) <= 0) {
                        break;
                    }
                    else {
                        heap[i] = heap[j];
                        i = j;
                        j = 2 * j + 1;
                    }
                }
            }
            else {
                while (j <= end) {
                    if ((j < end) && (heap[j] > heap[j + 1])) {
                        j++;
                    }
                    if (temp <= heap[j]) {
                        break;
                    }
                    else {
                        heap[i] = heap[j];
                        i = j;
                        j = 2 * j + 1;
                    }
                }
            }
            heap[i] = temp;
        };
        MinHeap.prototype.filterUp = function (start) {
            var j = start, i = Math.floor((j - 1) * 0.5); // i指向j的双亲节点
            var heap = this._heap;
            var temp = heap[j];
            var comparer = this._comparer;
            if (comparer) {
                while (j > 0) {
                    if (comparer(heap[i], temp) <= 0) {
                        break;
                    }
                    else {
                        heap[j] = heap[i];
                        j = i;
                        i = Math.floor((i - 1) * 0.5);
                    }
                }
            }
            else {
                while (j > 0) {
                    if (heap[i] <= temp) {
                        break;
                    }
                    else {
                        heap[j] = heap[i];
                        j = i;
                        i = Math.floor((i - 1) * 0.5);
                    }
                }
            }
            heap[j] = temp;
        };
        return MinHeap;
    }());
    QE.MinHeap = MinHeap;
})(QE || (QE = {}));
/**
 *  -
 *
 * create by wjl at
 *
 */
var QE;
/**
 *  -
 *
 * create by wjl at
 *
 */
(function (QE) {
    var RefObj = /** @class */ (function (_super) {
        __extends(RefObj, _super);
        function RefObj() {
            var _this = _super.call(this) || this;
            _this._retainCount = 1;
            return _this;
        }
        Object.defineProperty(RefObj.prototype, "retainCount", {
            get: function () {
                return this._retainCount;
            },
            enumerable: true,
            configurable: true
        });
        RefObj.prototype.retain = function () {
            this._retainCount++;
        };
        RefObj.prototype.release = function () {
            console.assert(this._retainCount > 0, 'retain count must greater than 0');
            this._retainCount--;
            if (this._retainCount === 0) {
                this.destroy();
            }
        };
        return RefObj;
    }(QE.HashObject));
    QE.RefObj = RefObj;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Timer;
    (function (Timer) {
        var TimerHeap = /** @class */ (function (_super) {
            __extends(TimerHeap, _super);
            function TimerHeap() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TimerHeap.prototype.remove = function (timerId) {
                var heap = this._heap;
                var len = this._length;
                for (var i = 0; i < len; i++) {
                    var data = heap[i];
                    if (data.id === timerId) {
                        heap[i] = heap[this._length - 1];
                        this._length--;
                        this.filterDown(i, this._length - 1); // 调整新的根节点
                        break;
                    }
                }
            };
            return TimerHeap;
        }(QE.MinHeap));
        function _TimerDataComparer(x, y) {
            return x.endTick - y.endTick;
        }
        var _timerHeap = new TimerHeap(_TimerDataComparer);
        var _timerId = 0;
        var _tick = 0;
        /**
         * 添加一个定时器
         * @param callback 回调函数
         * @param delay    延迟时间, 单位毫秒
         * @param repeat   重复次数, 默认为0, 不重复
         * @param interval 重复间隔时间, 单位毫秒
         * @return 定时器id
         */
        function addTimer(callback, delay, repeat, interval) {
            if (repeat === void 0) { repeat = 0; }
            if (interval === void 0) { interval = 0; }
            var newTimerId = _timerId++;
            var timerData = {
                id: newTimerId,
                callback: callback,
                delay: delay,
                repeat: repeat,
                interval: interval,
                endTick: _tick + Date.now()
            };
            _timerHeap.enqueue(timerData);
            return timerData.id;
        }
        Timer.addTimer = addTimer;
        /**
         * 删除一个定时器
         * @param timerId 定时器id
         */
        function killTimer(timerId) {
            _timerHeap.remove(timerId);
        }
        Timer.killTimer = killTimer;
        function update(dt) {
            _tick += dt;
            while (_timerHeap.count() > 0) {
                var timerData = _timerHeap.peek();
                if (_tick < timerData.endTick) {
                    break;
                }
                _timerHeap.dequeue();
                var repeatCount = timerData.repeat;
                if (repeatCount === 0) {
                    timerData.callback(dt);
                }
                else if (repeatCount === -1) {
                    // 无限定时器
                    timerData.callback(dt);
                    timerData.endTick = _tick + timerData.interval;
                    _timerHeap.enqueue(timerData);
                }
                else {
                    timerData.callback(dt);
                    timerData.repeat = repeatCount--;
                    timerData.endTick = _tick + timerData.interval;
                    _timerHeap.enqueue(timerData);
                }
            }
        }
        Timer.update = update;
    })(Timer = QE.Timer || (QE.Timer = {}));
})(QE || (QE = {}));
var QE;
(function (QE) {
    var UUID;
    (function (UUID) {
        // Private array of chars to use
        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        function uuid(len, radix) {
            var chars = CHARS;
            var ret = [];
            var i;
            radix = radix || chars.length;
            if (len) {
                // Compact form
                for (i = 0; i < len; i++) {
                    ret[i] = chars[0 | Math.random() * radix];
                }
            }
            else {
                // rfc4122, version 4 form
                var r = void 0;
                // rfc4122 requires these characters
                ret[8] = ret[13] = ret[18] = ret[23] = '-';
                ret[14] = '4';
                // Fill in random data.  At i==19 set the high bits of clock sequence as
                // per rfc4122, sec. 4.1.5
                for (i = 0; i < 36; i++) {
                    if (!ret[i]) {
                        r = 0 | Math.random() * 16;
                        ret[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return ret.join('');
        }
        // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
        // by minimizing calls to random()
        function uuidFast() {
            var chars = CHARS;
            var ret = new Array(36);
            var rnd = 0;
            var r;
            for (var i = 0; i < 36; i++) {
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                    ret[i] = '-';
                }
                else if (i === 14) {
                    ret[i] = '4';
                }
                else {
                    if (rnd <= 0x02) {
                        rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                    }
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    ret[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return ret.join('');
        }
        // A more compact, but less performant, RFC4122v4 solution:
        function newUuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        UUID.newUuid = newUuid;
    })(UUID = QE.UUID || (QE.UUID = {}));
})(QE || (QE = {}));
var QE;
(function (QE) {
    var AABB = /** @class */ (function () {
        function AABB() {
        }
        return AABB;
    }());
    QE.AABB = AABB;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     * ��ɫ
     */
    var Color = /** @class */ (function () {
        function Color(r, g, b, a) {
            if (r === void 0) { r = 255; }
            if (g === void 0) { g = 255; }
            if (b === void 0) { b = 255; }
            if (a === void 0) { a = 255; }
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        Object.defineProperty(Color, "white", {
            get: function () {
                return new Color();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "black", {
            get: function () {
                return new Color(0, 0, 0, 255);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "red", {
            get: function () {
                return new Color(255, 0, 0, 255);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "green", {
            get: function () {
                return new Color(0, 255, 0, 255);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color, "blue", {
            get: function () {
                return new Color(0, 0, 255, 255);
            },
            enumerable: true,
            configurable: true
        });
        Color.colorToHex = function (color) {
            return color.r << 16 | color.g << 8 | color.b;
        };
        Color.colorToString = function (color) {
            return '#' + Color.colorToHex(color).toString(16);
        };
        Color.stringToColor = function (colorString) {
            var hex = parseInt(colorString, 16);
            return new Color(hex >> 16 & 0xff, hex >> 8 & 0xff, hex & 0xff);
        };
        Color.prototype.clone = function (oriangl) {
            return new Color(oriangl.r, oriangl.g, oriangl.b, oriangl.a);
        };
        return Color;
    }());
    QE.Color = Color;
})(QE || (QE = {}));
///<reference path="../core/HashObject.ts" />
var QE;
///<reference path="../core/HashObject.ts" />
(function (QE) {
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        function GameObject(name) {
            if (name === void 0) { name = 'GameObject'; }
            var _this = _super.call(this) || this;
            _this._isActive = false;
            _this._componentList = [];
            _this._name = name;
            _this._transform = _this.addComponent(QE.Transform);
            return _this;
        }
        Object.defineProperty(GameObject.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (val) {
                this._name = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "transform", {
            get: function () {
                return this._transform;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.updateRenderQueue = function (renderQueue) {
            var render = this.getComponent(QE.MeshRender);
            // TODO render是固定存在的属性,可以使用固定属性保存下来,避免每次取组件列表查询
            if (render && render.enabled && render.getRenderOperation() && render.getMaterial()) {
                renderQueue.addRenderable(render);
                // TODO: 添加一个线框渲染组件
                var debugRender = this.getComponent(QE.DebugRender);
                if (!debugRender) {
                    debugRender = this.addComponent(QE.DebugRender);
                }
                debugRender.mesh = render.mesh;
                debugRender.setMaterial(QE.SpriteMaterial.getDefaultSpriteMaterial());
                var oldOp = render.getRenderOperation();
                var wfOp = debugRender.getRenderOperation();
                wfOp.indexBuffer = oldOp.indexBuffer;
                wfOp.numberOfInstances = oldOp.numberOfInstances;
                wfOp.primCount = oldOp.primCount;
                wfOp.renderOpType = 2 /* LINE_STRIP */;
                wfOp.vertexBuffers = oldOp.vertexBuffers;
                //   renderQueue.addRenderable(debugRender);
                return;
            }
            var skinMeshRender = this.getComponent(QE.SkinedMeshRender);
            if (skinMeshRender && skinMeshRender.enabled && skinMeshRender.getRenderOperation() && skinMeshRender.getMaterial()) {
                renderQueue.addRenderable(skinMeshRender);
                return;
            }
            var spriteRender = this.getComponent(QE.SpriteRender);
            if (spriteRender && spriteRender.enabled && spriteRender.getRenderOperation() && spriteRender.getMaterial()) {
                renderQueue.addRenderable(spriteRender);
                return;
            }
        };
        GameObject.prototype.addComponent = function (compCls) {
            var componentList = this._componentList;
            var newComp = new compCls();
            // hack type
            var anyType = newComp;
            if (anyType.__QE_DisallowMultipleComponent__) {
                componentList.forEach(function (comp) {
                    // TODO sub class and the class self， but not instanceof compCls
                    if (comp instanceof compCls) {
                        throw new Error('不允许重复添加组件: ' + compCls.name);
                    }
                });
            }
            this._componentList.push(newComp);
            // node关联transfrom控件
            if (newComp instanceof QE.Transform) {
                this._transform = newComp;
            }
            newComp.notifyAttachNode(this);
            // 启动脚本
            newComp.enabled = true;
            return newComp;
        };
        GameObject.prototype.getComponent = function (compCls) {
            var componentList = this._componentList;
            for (var i = 0, len = componentList.length; i < len; i++) {
                var comp = componentList[i];
                if (comp instanceof compCls) {
                    return comp;
                }
            }
            return null;
        };
        GameObject.prototype.getComponentInChildren = function (compCls, includeInactive) {
            if (includeInactive === void 0) { includeInactive = false; }
            var childCount = this._transform.childCount;
            if (childCount <= 0) {
                return null;
            }
            for (var i = 0; i < childCount; i++) {
                var child = this._transform.getChildByIndex(i);
                if (!includeInactive && child instanceof Comment && !child.enabled) {
                    continue;
                }
                var comp = child.getComponent(compCls);
                if (comp) {
                    return comp;
                }
                comp = child.getComponentInChildren(compCls);
                if (comp) {
                    return comp;
                }
            }
            return null;
        };
        GameObject.prototype.GetComponentInParent = function (compCls) {
            var parent = this._transform.parent;
            while (parent) {
                var comp = parent.getComponent(compCls);
                if (comp) {
                    return comp;
                }
                parent = parent.parent;
            }
            return null;
        };
        GameObject.prototype.getComponents = function (compCls) {
            var ret = [];
            var componentList = this._componentList;
            for (var i = 0, len = componentList.length; i < len; i++) {
                var comp = componentList[i];
                if (comp instanceof compCls) {
                    ret.push(comp);
                }
            }
            return ret;
        };
        GameObject.prototype.getComponentsInChildren = function (compCls, includeInactive, outCompList) {
            if (includeInactive === void 0) { includeInactive = false; }
            var childCount = this._transform.childCount;
            if (childCount <= 0) {
                return null;
            }
            for (var i = 0; i < childCount; i++) {
                var child = this._transform.getChildByIndex(i);
                if (!includeInactive && !child.enabled) {
                    continue;
                }
                var comp = child.getComponents(compCls);
                if (comp) {
                    return comp;
                }
                comp = child.getComponentsInChildren(compCls);
                if (comp) {
                    return comp;
                }
            }
            return null;
        };
        GameObject.prototype.getComponentsInParent = function (compCls, includeInactive, outCompList) {
            if (includeInactive === void 0) { includeInactive = false; }
            var parent = this._transform.parent;
            while (parent) {
                var comp = parent.getComponents(compCls);
                if (comp) {
                    return comp;
                }
                parent = parent.parent;
            }
            return null;
        };
        return GameObject;
    }(QE.HashObject));
    QE.GameObject = GameObject;
})(QE || (QE = {}));
///<reference path="../object/GameObject.ts" />
var QE;
///<reference path="../object/GameObject.ts" />
(function (QE) {
    var Frustum = /** @class */ (function (_super) {
        __extends(Frustum, _super);
        function Frustum() {
            var _this = _super.call(this) || this;
            _this._projectionType = 1 /* PERSPECTIVE */;
            var planes = [];
            for (var i = 0; i < 6; i++) {
                planes.push(new QE.Plane());
            }
            _this._frustumPlanes = planes;
            return _this;
        }
        Frustum.prototype.updateRenderQueue = function (renderQueue) {
        };
        Frustum.prototype.preRender = function ( /*SceneManager * sm, RenderSystem * rsys*/) {
        };
        Frustum.prototype.postRender = function ( /*SceneManager * sm, RenderSystem * rsys*/) {
        };
        Frustum.prototype.getMaterial = function () {
            return null;
        };
        Frustum.prototype.getRenderOperation = function () {
            return null;
        };
        Frustum.prototype.getWorldTransforms = function () {
            return null;
        };
        return Frustum;
    }(QE.GameObject));
    QE.Frustum = Frustum;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     * 弧度每角度
     */
    QE.RADIANS_TO_DEGREES = 180 / Math.PI;
    /**
     * 角度每弧度 Math.PI / 180;
     */
    QE.DEGREES_TO_RADIANS = Math.PI / 180;
    var MathUtil;
    (function (MathUtil) {
        /**
         * @private
         * 1角度为多少弧度
         */
        MathUtil.RAW_DATA_CONTAINER = new Float32Array(16);
        /**
         * 把一个值固定在一个范围之内
         * @param value 当前判定的值
         * @param min 最小取值
         * @param max 最大取值
         * @returns number 计算后的结果
         */
        function clampf(value, min, max) {
            if (min > max) {
                var temp = min;
                min = max;
                max = temp;
            }
            return value < min ? min : (value < max ? value : max);
        }
        MathUtil.clampf = clampf;
        function lerp(a, b, t) {
            return (b - a) * t + a;
        }
        MathUtil.lerp = lerp;
        function lerpColor(fromC, toC, t, out) {
            if (!out) {
                out = new QE.Color();
            }
            out.r = t * (toC.r - fromC.r) + fromC.r;
            out.g = t * (toC.g - fromC.g) + fromC.g;
            out.b = t * (toC.b - fromC.b) + fromC.b;
            out.a = t * (toC.a - fromC.a) + fromC.a;
            return out;
        }
        MathUtil.lerpColor = lerpColor;
    })(MathUtil = QE.MathUtil || (QE.MathUtil = {}));
})(QE || (QE = {}));
var QE;
(function (QE) {
    // 复用的单位矩阵
    var identifyMatrixArray = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
    /**
     * 矩阵存储和openGL规则一致,列主序
     * 学习资料:
     * http://www.euclideanspace.com/maths/algebra/matrix/
     * https://www.geometrictools.com/GTEngine/Include/Mathematics/GteMatrix4x4.h
     * 线性代数课本
     * 矩阵是列向量矩阵
     | 0 2 |     | 0 3 6 |       | 0 4 8  12 |      | 00 01 02 03 |
     | 1 3 |     | 1 4 7 |       | 1 5 9  13 |      | 10 11 12 13 |
     | 2 5 8 |       | 2 6 10 14 |      | 20 21 22 23 |
     | 3 7 11 15 |      | 30 31 32 33 |
     */
    var Matrix4 = /** @class */ (function () {
        function Matrix4() {
            this._rawData = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
        Object.defineProperty(Matrix4.prototype, "_00", {
            get: function () {
                return this._rawData[0];
            },
            set: function (val) {
                this._rawData[0] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_01", {
            get: function () {
                return this._rawData[4];
            },
            set: function (val) {
                this._rawData[4] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_02", {
            get: function () {
                return this._rawData[8];
            },
            set: function (val) {
                this._rawData[8] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_03", {
            get: function () {
                return this._rawData[12];
            },
            set: function (val) {
                this._rawData[12] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_10", {
            get: function () {
                return this._rawData[1];
            },
            set: function (val) {
                this._rawData[1] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_11", {
            get: function () {
                return this._rawData[5];
            },
            set: function (val) {
                this._rawData[5] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_12", {
            get: function () {
                return this._rawData[9];
            },
            set: function (val) {
                this._rawData[9] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_13", {
            get: function () {
                return this._rawData[13];
            },
            set: function (val) {
                this._rawData[13] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_20", {
            get: function () {
                return this._rawData[2];
            },
            set: function (val) {
                this._rawData[2] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_21", {
            get: function () {
                return this._rawData[6];
            },
            set: function (val) {
                this._rawData[6] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_22", {
            get: function () {
                return this._rawData[10];
            },
            set: function (val) {
                this._rawData[10] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_23", {
            get: function () {
                return this._rawData[14];
            },
            set: function (val) {
                this._rawData[14] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_30", {
            get: function () {
                return this._rawData[3];
            },
            set: function (val) {
                this._rawData[3] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_31", {
            get: function () {
                return this._rawData[7];
            },
            set: function (val) {
                this._rawData[7] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_32", {
            get: function () {
                return this._rawData[11];
            },
            set: function (val) {
                this._rawData[11] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "_33", {
            get: function () {
                return this._rawData[15];
            },
            set: function (val) {
                this._rawData[15] = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "rawData", {
            get: function () {
                return this._rawData;
            },
            enumerable: true,
            configurable: true
        });
        Matrix4.create = function (_00, _01, _02, _03, _10, _11, _12, _13, _20, _21, _22, _23, _30, _31, _32, _33) {
            var matrix = new Matrix4();
            matrix._00 = _00, matrix._01 = _01, matrix._02 = _02, matrix._03 = _03;
            matrix._10 = _10, matrix._11 = _11, matrix._12 = _12, matrix._13 = _13;
            matrix._20 = _20, matrix._21 = _21, matrix._22 = _22, matrix._23 = _23;
            matrix._30 = _30, matrix._31 = _31, matrix._32 = _32, matrix._33 = _33;
            return matrix;
        };
        /**
         *
         a00 a01 a02 a03    x
         a10 a11 a12 a13 *  y
         a20 a21 a22 a23    z
         a30 a31 a32 a33    w=0
         * @param position
         * @param rotation
         * @param scale
         * @param out
         */
        Matrix4.makeTransform = function (position, rotation, scale, out) {
            if (!out) {
                out = new Matrix4();
            }
            // Ordering:
            //    1. Scale
            //    2. Rotate
            //    3. Translate
            // 右乘
            // M = Mt * Mr * Ms
            // Quaternion math
            var x = rotation.x, y = rotation.y, z = rotation.z, w = rotation.w;
            var x2 = x + x;
            var y2 = y + y;
            var z2 = z + z;
            var xx = x * x2;
            var xy = x * y2;
            var xz = x * z2;
            var yy = y * y2;
            var yz = y * z2;
            var zz = z * z2;
            var wx = w * x2;
            var wy = w * y2;
            var wz = w * z2;
            var sx = scale.x;
            var sy = scale.y;
            var sz = scale.z;
            var out0 = (1 - (yy + zz)) * sx;
            var out1 = (xy + wz) * sx;
            var out2 = (xz - wy) * sx;
            var out4 = (xy - wz) * sy;
            var out5 = (1 - (xx + zz)) * sy;
            var out6 = (yz + wx) * sy;
            var out8 = (xz + wy) * sz;
            var out9 = (yz - wx) * sz;
            var out10 = (1 - (xx + yy)) * sz;
            var rawData = out._rawData;
            rawData[0] = out0;
            rawData[1] = out1;
            rawData[2] = out2;
            rawData[3] = 0;
            rawData[4] = out4;
            rawData[5] = out5;
            rawData[6] = out6;
            rawData[7] = 0;
            rawData[8] = out8;
            rawData[9] = out9;
            rawData[10] = out10;
            rawData[11] = 0;
            rawData[12] = position.x;
            rawData[13] = position.y;
            rawData[14] = position.z;
            rawData[15] = 1;
            return out;
        };
        /**
         * 生成正交视图矩阵
         * @param left
         * @param right
         * @param bottom
         * @param top
         * @param near
         * @param far
         * @param target
         */
        Matrix4.makeOrthoRH = function (left, right, bottom, top, near, far, target) {
            if (!target) {
                target = new Matrix4();
            }
            var inv_d = 1 / (far - near);
            var w = right - left;
            var h = top - bottom;
            var d = far - near;
            var x = (right + left) / w;
            var y = (top + bottom) / h;
            var z = (far + near) / d;
            var rawData = target._rawData;
            rawData[0] = 2 / w;
            rawData[1] = 0;
            rawData[2] = 0;
            rawData[3] = 0;
            rawData[4] = 0;
            rawData[5] = 2 / h;
            rawData[6] = 0;
            rawData[7] = 0;
            rawData[8] = 0;
            rawData[9] = 0;
            rawData[10] = -2 / d;
            rawData[11] = 0;
            rawData[12] = -x;
            rawData[13] = -y;
            rawData[14] = -z;
            rawData[15] = 1;
            return target;
        };
        /**
         * 构造右手投影矩阵
         * @param left
         * @param right
         * @param top
         * @param bottom
         * @param near
         * @param far
         * @param target
         */
        Matrix4.makePerspectiveRH = function (left, right, top, bottom, near, far, target) {
            if (!target) {
                target = new Matrix4();
            }
            var inv_w = 1 / (right - left);
            var inv_h = 1 / (top - bottom);
            var inv_d = 1 / (far - near);
            var A = 2 * near * inv_w;
            var B = 2 * near * inv_h;
            var C = (right + left) * inv_w;
            var D = (top + bottom) * inv_h;
            var q, qn;
            if (far === 0) {
                // Infinite far plane
                q = Number.EPSILON - 1;
                qn = near * (Number.EPSILON - 2);
            }
            else {
                q = -(far + near) * inv_d;
                qn = -2 * (far * near) * inv_d;
            }
            var rawData = target._rawData;
            rawData[0] = A;
            rawData[1] = 0;
            rawData[2] = 0;
            rawData[3] = 0;
            rawData[4] = 0;
            rawData[5] = B;
            rawData[6] = 0;
            rawData[7] = 0;
            rawData[8] = C;
            rawData[11] = -1;
            rawData[9] = D;
            rawData[10] = q;
            rawData[12] = 0;
            rawData[13] = 0;
            rawData[14] = qn;
            rawData[15] = 0;
            return target;
        };
        /**
         * 根据fov构造右手透视投影矩阵
         * @param fov
         * @param aspect
         * @param near
         * @param far
         * @param target
         */
        Matrix4.makePerspectiveFovRH = function (fov, aspect, near, far, target) {
            var ymax = near * Math.tan(fov * Math.PI / 360);
            var ymin = -ymax;
            var xmin = ymin * aspect;
            var xmax = ymax * aspect;
            return Matrix4.makePerspectiveRH(xmin, xmax, ymax, ymin, near, far, target);
        };
        Matrix4.prototype.setArray = function (array) {
            this._rawData.set(array, 0);
            return this;
        };
        Matrix4.prototype.set = function (_00, _01, _02, _03, _10, _11, _12, _13, _20, _21, _22, _23, _30, _31, _32, _33) {
            this._rawData[0] = _00, this._rawData[4] = _01, this._rawData[8] = _02, this._rawData[12] = _03;
            this._rawData[1] = _10, this._rawData[5] = _11, this._rawData[9] = _12, this._rawData[13] = _13;
            this._rawData[2] = _20, this._rawData[6] = _21, this._rawData[10] = _22, this._rawData[14] = _23;
            this._rawData[3] = _30, this._rawData[7] = _31, this._rawData[11] = _32, this._rawData[15] = _33;
            return this;
        };
        Matrix4.prototype.copyFrom = function (other) {
            return this.setArray(other.rawData);
        };
        Matrix4.prototype.clone = function () {
            return new Matrix4().copyFrom(this);
        };
        /**
         * 矩阵相乘
         a00 a01 a02 a03     b00 b01 b02 b03     a00*b00+a01*b10+a02*b20+a03*b30 a00*b01+a01*b11+a02*b21+a03*b31 a00*b02+a01*b12+a02*b22+a03*b32 a00*b03+a01*b13+a02*b23+a03*b33
         a10 a11 a12 a13  *  b10 b11 b12 b13  =  a10*b00+a11*b10+a12*b20+a13*b30 a10*b01+a11*b11+a12*b21+a13*b31 a10*b02+a11*b12+a12*b22+a13*b32 a10*b03+a11*b13+a12*b23+a13*b33
         a20 a21 a22 a23     b20 b21 b22 b23     a20*b00+a21*b10+a22*b20+a23*b30 a20*b01+a21*b11+a22*b21+a23*b31 a20*b02+a21*b12+a22*b22+a23*b32 a20*b03+a21*b13+a22*b23+a23*b33
         a30 a31 a32 a33     b30 b31 b32 b33     a30*b00+a31*b10+a32*b20+a33*b30 a30*b01+a31*b11+a32*b21+a33*b31 a30*b02+a31*b12+a32*b22+a33*b32 a30*b03+a31*b13+a32*b23+a33*b33
         */
        Matrix4.prototype.multiply = function (v, outMat) {
            if (!outMat) {
                outMat = new Matrix4();
            }
            var out = outMat._rawData;
            var a = this._rawData;
            var b = v._rawData;
            var m111 = a[0], m121 = a[4], m131 = a[8], m141 = a[12];
            var m112 = a[1], m122 = a[5], m132 = a[9], m142 = a[13];
            var m113 = a[2], m123 = a[6], m133 = a[10], m143 = a[14];
            var m114 = a[3], m124 = a[7], m134 = a[11], m144 = a[15];
            var m211 = b[0], m221 = b[4], m231 = b[8], m241 = b[12];
            var m212 = b[1], m222 = b[5], m232 = b[9], m242 = b[13];
            var m213 = b[2], m223 = b[6], m233 = b[10], m243 = b[14];
            var m214 = b[3], m224 = b[7], m234 = b[11], m244 = b[15];
            out[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
            out[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
            out[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
            out[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
            out[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
            out[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
            out[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
            out[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
            out[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
            out[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
            out[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
            out[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
            out[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
            out[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
            out[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
            out[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
            return outMat;
        };
        /**
         * 矩阵向量相乘, 列向量应该右乘矩阵
         * @param vec
         a00 a01 a02 a03    x
         a10 a11 a12 a13 *  y
         a20 a21 a22 a23    z
         a30 a31 a32 a33    w=0
         */
        Matrix4.prototype.transformVector3 = function (v, out) {
            var x = v.x;
            var y = v.y;
            var z = v.z;
            var m = this._rawData;
            var x1 = m[0] * x + m[4] * y + m[8] * z + m[12];
            var y1 = m[1] * x + m[5] * y + m[9] * z + m[13];
            var z1 = m[2] * x + m[6] * y + m[10] * z + m[14];
            if (!out) {
                out = new QE.Vector3(x1, y1, z1);
            }
            else {
                out.set(x1, y1, z1);
            }
            return out;
        };
        /**
         * 单位矩阵
         */
        Matrix4.prototype.identity = function () {
            var out = this._rawData;
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return this;
        };
        /**
         * 矩阵求逆
         * TODO
         */
        Matrix4.prototype.inverse = function (outMat) {
            if (!outMat) {
                outMat = new Matrix4();
            }
            var a = this._rawData;
            var out = outMat._rawData;
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            var b00 = a00 * a11 - a01 * a10;
            var b01 = a00 * a12 - a02 * a10;
            var b02 = a00 * a13 - a03 * a10;
            var b03 = a01 * a12 - a02 * a11;
            var b04 = a01 * a13 - a03 * a11;
            var b05 = a02 * a13 - a03 * a12;
            var b06 = a20 * a31 - a21 * a30;
            var b07 = a20 * a32 - a22 * a30;
            var b08 = a20 * a33 - a23 * a30;
            var b09 = a21 * a32 - a22 * a31;
            var b10 = a21 * a33 - a23 * a31;
            var b11 = a22 * a33 - a23 * a32;
            // Calculate the determinant
            var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
            return outMat;
        };
        /**
         * 矩阵转置
         每一列变成每一行
         | a b |  T   | a c |
         | c d | ===> | b d |
         */
        Matrix4.prototype.transpose = function () {
            var a = this._rawData;
            var a01 = a[1];
            var a02 = a[2];
            var a03 = a[3];
            var a12 = a[6];
            var a13 = a[7];
            var a23 = a[11];
            a[1] = a[4];
            a[2] = a[8];
            a[3] = a[12];
            a[4] = a01;
            a[6] = a[9];
            a[7] = a[13];
            a[8] = a02;
            a[9] = a12;
            a[11] = a[14];
            a[12] = a03;
            a[13] = a13;
            a[14] = a23;
            return this;
        };
        Matrix4.prototype.isAffine = function () {
            return this._30 === 0 && this._31 === 0 && this._32 === 0 && this._33 === 1;
        };
        /**
         * 绕任意轴旋转
         */
        Matrix4.prototype.rotateByAxis = function (angle, axis) {
            var x = axis.x, y = axis.y, z = axis.z;
            var ca = Math.cos(angle), sa = Math.sin(angle), c1 = 1 - ca;
            var x2 = x * x, y2 = y * y, z2 = z * z;
            var xz = x * z, xy = x * y, yz = y * z;
            var xs = x * sa, ys = y * sa, zs = z * sa;
            this._00 = x2 * c1 + ca;
            this._01 = xy * c1 + zs;
            this._02 = xz * c1 - ys;
            this._03 = 0;
            this._10 = xy * c1 - zs;
            this._11 = y2 * c1 + ca;
            this._12 = yz * c1 + xs;
            this._13 = 0;
            this._20 = xz * c1 + ys;
            this._21 = yz * c1 - xs;
            this._22 = z2 * c1 + ca;
            this._23 = 0;
            this._30 = 0;
            this._31 = 0;
            this._32 = 0;
            this._33 = 1;
            return this;
        };
        Matrix4.prototype.rotateByScalar = function (x, y, z) {
            var yaw = y, pitch = x, roll = z;
            var sinx = Math.sin(pitch);
            var cosx = Math.cos(pitch);
            var siny = Math.sin(yaw);
            var cosy = Math.cos(yaw);
            var sinz = Math.sin(roll);
            var cosz = Math.cos(roll);
            this._00 = cosy * cosz + siny * sinx * sinz;
            this._01 = sinz * cosx;
            this._02 = -siny * sinz + cosy * sinx * sinz;
            this._03 = 0;
            this._10 = -cosy * sinz + siny * sinx * cosz;
            this._11 = cosz * cosx;
            this._12 = sinz * siny + cosy * sinx * cosz;
            this._13 = 0;
            this._20 = siny * cosx;
            this._21 = -sinx;
            this._22 = cosy * cosx;
            this._23 = 0;
            this._30 = 0;
            this._31 = 0;
            this._32 = 0;
            this._33 = 1;
            return this;
        };
        /**
         * 矩阵分解, 可分解为position,scale,quaternion
         * @param outPosition
         * @param outScale
         * @param outQuaternion
         */
        Matrix4.prototype.decompose = function (outPosition, outScale, outQuaternion) {
            var mat = this._rawData;
            // pos
            outPosition.x = mat[12];
            outPosition.y = mat[13];
            outPosition.z = mat[14];
            // scale
            outScale.x = Math.hypot(mat[0], mat[1], mat[2]);
            outScale.y = Math.hypot(mat[4], mat[5], mat[6]);
            outScale.z = Math.hypot(mat[8], mat[9], mat[10]);
            // quaternion
            var is1 = 1 / outScale.x;
            var is2 = 1 / outScale.y;
            var is3 = 1 / outScale.z;
            var sm11 = mat[0] * is1;
            var sm12 = mat[1] * is1;
            var sm13 = mat[2] * is1;
            var sm21 = mat[4] * is2;
            var sm22 = mat[5] * is2;
            var sm23 = mat[6] * is2;
            var sm31 = mat[8] * is3;
            var sm32 = mat[9] * is3;
            var sm33 = mat[10] * is3;
            var trace = sm11 + sm22 + sm33;
            var S = 0;
            if (trace > 0) {
                S = Math.sqrt(trace + 1.0) * 2;
                outQuaternion.w = 0.25 * S;
                outQuaternion.x = (sm23 - sm32) / S;
                outQuaternion.y = (sm31 - sm13) / S;
                outQuaternion.z = (sm12 - sm21) / S;
            }
            else if ((sm11 > sm22) && (sm11 > sm33)) {
                S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
                outQuaternion.w = (sm23 - sm32) / S;
                outQuaternion.x = 0.25 * S;
                outQuaternion.y = (sm12 + sm21) / S;
                outQuaternion.z = (sm31 + sm13) / S;
            }
            else if (sm22 > sm33) {
                S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
                outQuaternion.w = (sm31 - sm13) / S;
                outQuaternion.x = (sm12 + sm21) / S;
                outQuaternion.y = 0.25 * S;
                outQuaternion.z = (sm23 + sm32) / S;
            }
            else {
                S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
                outQuaternion.w = (sm12 - sm21) / S;
                outQuaternion.x = (sm31 + sm13) / S;
                outQuaternion.y = (sm23 + sm32) / S;
                outQuaternion.z = 0.25 * S;
            }
        };
        Matrix4.ClassName = 'Matrix4';
        return Matrix4;
    }());
    QE.Matrix4 = Matrix4;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     * 平面, 隐式定义方程ax + by + cz = d, 向量(a, b, c)为平面法向量
     */
    var Plane = /** @class */ (function () {
        function Plane(x, y, z, d) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (d === void 0) { d = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
            this.d = d;
        }
        /**
         * 计算点集最佳平面
         * @param points
         */
        Plane.computeBestFitNormal = function (points) {
            var x = 0, y = 0, z = 0;
            var len = points.length;
            var point = points[len - 1];
            for (var i = 0; i < len; i++) {
                var tempPoint = points[i];
                x += (point.z + tempPoint.z) * (point.y - tempPoint.y);
                y += (point.x + tempPoint.x) * (point.z - tempPoint.z);
                z += (point.y + tempPoint.y) * (point.x - tempPoint.x);
                point = tempPoint;
            }
            return new QE.Vector3(x, y, z);
        };
        Plane.prototype.set = function (x, y, z, d) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (d === void 0) { d = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
            this.d = d;
        };
        /**
         * 归一化
         */
        Plane.prototype.normalize = function () {
            var x = this.x, y = this.y, z = this.z;
            var len = Math.sqrt(x * x + y * y + z * z);
            if (len > 0.0) {
                var invLen = 1.0 / len;
                this.x = x * invLen;
                this.y = y * invLen;
                this.z = z * invLen;
                this.d *= invLen;
            }
            return len;
        };
        /**
         * 求点到面的距离
         * @param v
         */
        Plane.prototype.distance = function (v) {
            return this.x * v.x + this.y * v.y + this.z * v.z + this.d;
        };
        /**
         * 判断点在平面的方向
         * @param v
         */
        Plane.prototype.atSide = function (v) {
            var d = this.distance(v);
            if (d > 0) {
                return 0 /* Front */;
            }
            else if (d < 0) {
                return 1 /* Back */;
            }
            else {
                return 2 /* INTERSECT */;
            }
        };
        /**
         *
         * @param m
         */
        Plane.prototype.transform = function (m) {
        };
        /**
         * 3点构造平面, 3点不能共线, 否则有无数个面
         * @param p1
         * @param p2
         * @param p3
         */
        Plane.prototype.fromPoints = function (p1, p2, p3) {
            // 向量1
            var v1x = p2.x - p1.x;
            var v1y = p2.y - p1.y;
            var v1z = p2.z - p1.z;
            // 向量2
            var v2x = p3.x - p1.x;
            var v2y = p3.y - p1.y;
            var v2z = p3.z - p1.z;
            // 向量1和2叉乘求法向量
            this.x = v1y * v2z - v1z * v2y;
            this.y = v1z * v2x - v1x * v2z;
            this.z = v1x * v2y - v1y * v2x;
            // d = dot(p, normal), 取p1(3点任意一点都可以)点与法向量点乘求得d
            this.d = -(this.x * p1.x + this.y * p1.y + this.z * p1.z);
        };
        /**
         * 法向量和平面一点坐标构造平面
         * @param normal
         * @param p
         */
        Plane.prototype.fromNormalAndPoint = function (normal, p) {
            this.x = normal.x;
            this.y = normal.y;
            this.z = normal.z;
            // d = dot(p, normal)
            this.d = -(this.x * p.x + this.y * p.y + this.z * p.z);
        };
        Plane.ClassName = 'Plane';
        return Plane;
    }());
    QE.Plane = Plane;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var s_epsilon = 1e-03;
    /**
     * 四元数 [w, x, y, z]
     * 假设轴角对(n, θ): 绕n指定的旋转轴θ角, 则 q = [cos(θ / 2), sin(θ / 2) * nx, sin(θ / 2) * ny, sin(θ / 2) * nz]
     */
    var Quaternion = /** @class */ (function () {
        function Quaternion(w, x, y, z) {
            if (w === void 0) { w = 1; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.w = w;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Object.defineProperty(Quaternion, "ZERO", {
            get: function () {
                return new Quaternion(1, 0, 0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quaternion, "IDENTITY", {
            get: function () {
                return new Quaternion(1, 0, 0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "magnitude", {
            /**
             * 模长
             */
            get: function () {
                return this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "sqrMagnitude", {
            /**
             * 模长平方
             */
            get: function () {
                return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
            },
            enumerable: true,
            configurable: true
        });
        Quaternion.multiplyScalar = function (s, q) {
            return new Quaternion(q.w * s, q.x * s, q.y * s, q.z * s);
        };
        Quaternion.prototype.copyFrom = function (q) {
            this.w = q.w;
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
            return this;
        };
        Quaternion.prototype.clone = function () {
            return new Quaternion(this.w, this.x, this.y, this.z);
        };
        // ----------------------------------基本计算-------------------------------------
        /**
         * 加法
         * @param q
         */
        Quaternion.prototype.add = function (q) {
            return new Quaternion(this.w + q.w, this.x + q.x, this.y + q.y, this.z + q.z);
        };
        /**
         * 减法
         * @param q
         */
        Quaternion.prototype.minus = function (q) {
            return new Quaternion(this.w - q.w, this.x - q.x, this.y - q.y, this.z - q.z);
        };
        /**
         * 点乘
         * @param q
         */
        Quaternion.prototype.dot = function (q) {
            return this.w * q.w + this.x * q.x + this.y * q.y + this.z * q.z;
        };
        /**
         * 叉乘
         * @param q
         */
        Quaternion.prototype.multiply = function (q) {
            var w1 = this.w, x1 = this.x, y1 = this.y, z1 = this.z;
            var w2 = q.w, x2 = q.x, y2 = q.y, z2 = q.z;
            return new Quaternion(w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2, w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2, w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2, w1 * z2 + x1 * y2 + z1 * w2 - y1 * x2);
        };
        /**
         * 乘以一个标量
         * @param s
         */
        Quaternion.prototype.multiplyScalar = function (s) {
            return new Quaternion(this.w * s, this.x * s, this.y * s, this.z * s);
        };
        Quaternion.prototype.multiplyVector = function (vector) {
            var w = this.w, x = this.x, y = this.y, z = this.z;
            var x2 = vector.x;
            var y2 = vector.y;
            var z2 = vector.z;
            return new Quaternion(-x * x2 - y * y2 - z * z2, w * x2 + y * z2 - z * y2, w * y2 - x * z2 + z * x2, w * z2 + x * y2 - y * x2);
        };
        Quaternion.prototype.rotateVector3 = function (v) {
            // this.clone().multiplyVector(v).toEulerAngle();
            // let qvec = new Vector3(this.x, this.y, this.z);
            // let uv = qvec.cross(v);
            // let uuv = qvec.cross(uv);
            //
            // uv = uv.multiplyScalar(2.0 * this.w);
            // uuv = uuv.multiplyScalar(2.0);
            //
            // return new Vector3(v.x + uv.x + uuv.x, v.y + uv.y + uuv.y, v.z + uv.z + uuv.z);
            var out = new QE.Vector3();
            var src = this;
            var vector = v;
            var x1, y1, z1, w1;
            var x2 = vector.x, y2 = vector.y, z2 = vector.z;
            w1 = -src.x * x2 - src.y * y2 - src.z * z2;
            x1 = src.w * x2 + src.y * z2 - src.z * y2;
            y1 = src.w * y2 - src.x * z2 + src.z * x2;
            z1 = src.w * z2 + src.x * y2 - src.y * x2;
            out.x = -w1 * src.x + x1 * src.w - y1 * src.z + z1 * src.y;
            out.y = -w1 * src.y + x1 * src.z + y1 * src.w - z1 * src.x;
            out.z = -w1 * src.z - x1 * src.y + y1 * src.x + z1 * src.w;
            return out;
        };
        /**
         * 对数. 公式: log(q) = [0, αN], N 为单位向量
         */
        Quaternion.prototype.log = function () {
            var w = this.w, x = this.x, y = this.y, z = this.z;
            var rw = 0.0, rx = 0.0, ry = 0.0, rz = 0.0;
            // w = cos(θ / 2)
            if (Math.abs(w) < 1.0) {
                var angle = Math.acos(w);
                var sina = Math.sin(angle);
                if (Math.abs(sina) >= s_epsilon) {
                    var fCoeff = angle / sina;
                    rx = fCoeff * x;
                    ry = fCoeff * y;
                    rz = fCoeff * z;
                }
            }
            return new Quaternion(rw, rx, ry, rz);
        };
        /**
         * 指数. 公式: exp(p) = [cos() ]
         */
        Quaternion.prototype.exp = function () {
            var w = this.w, x = this.x, y = this.y, z = this.z;
            var rw = 0.0, rx = 0.0, ry = 0.0, rz = 0.0;
            var fAngle = Math.sqrt(x * x + y * y + z * z);
            var fSin = Math.sin(fAngle);
            rw = Math.cos(fAngle);
            if (Math.abs(fSin) >= s_epsilon) {
                var fCoeff = fSin / (fAngle);
                rx = fCoeff * x;
                ry = fCoeff * y;
                rz = fCoeff * z;
            }
            else {
                rx = x;
                ry = y;
                rz = z;
            }
            return new Quaternion(rw, rx, ry, rz);
        };
        /**
         * 共轭四元数, 四元数逆q-1 = 它的共轭除以模长
         */
        Quaternion.prototype.conjugate = function () {
            return new Quaternion(this.w, -this.x, -this.y, -this.z);
        };
        /**
         * 四元数的逆
         */
        Quaternion.prototype.inverse = function () {
            var w = this.w, x = this.x, y = this.y, z = this.z;
            var mag = w * w + x * x + y * y + z * z;
            if (mag > 0.0) {
                var invMag = 1.0 / mag;
                return new Quaternion(w * invMag, -x * invMag, -y * invMag, -z * invMag);
            }
            else {
                return new Quaternion(0, 0, 0, 0);
            }
        };
        /**
         * 单位四元数求逆, 必须是单位四元数才能调用此方法
         */
        Quaternion.prototype.unitInverse = function () {
            return new Quaternion(this.w, -this.x, -this.y, -this.z);
        };
        /**
         * 正则化
         */
        Quaternion.prototype.normalize = function () {
            // 模长
            var len = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
            console.assert(len != 0);
            var invLen = 1.0 / len;
            this.x *= invLen;
            this.y *= invLen;
            this.z *= invLen;
            this.w *= invLen;
            return this;
        };
        /**
         * 比较两个四元素是否相等
         * @param other
         */
        Quaternion.prototype.equal = function (q) {
            return this.x === q.x && this.y === q.y && this.z === q.z && this.w === q.w;
        };
        // ----------------------------------插值操作-------------------------------------
        /**
         * 线性插值(Linear Interpolation)
         * @param lhs
         * @param rhs
         * @param t
         */
        Quaternion.prototype.lerp = function (lhs, rhs, t) {
            var w0 = lhs.w, x0 = lhs.x, y0 = lhs.y, z0 = lhs.z;
            var w1 = rhs.w, x1 = rhs.x, y1 = rhs.y, z1 = rhs.z;
            // 两四元数点乘
            var cosOmega = w0 * w1 + x0 * x1 + y0 * y1 + z0 * z1;
            // 点乘为负, 反转四元数以取得短弧
            if (cosOmega < 0) {
                w1 = -w1;
                x1 = -x1;
                y1 = -y1;
                z1 = -z1;
            }
            var w = w0 + t * (w1 - w0);
            var x = x0 + t * (x1 - x0);
            var y = y0 + t * (y1 - y0);
            var z = z0 + t * (z1 - z0);
            var invLen = 1.0 / Math.sqrt(w * w + x * x + y * y + z * z);
            this.w = w * invLen;
            this.x = x * invLen;
            this.y = y * invLen;
            this.z = z * invLen;
            return this;
        };
        /**
         * 球面线性插值(Spherical Linear Interpolation)
         * @param lhs
         * @param rhs
         * @param t
         */
        Quaternion.prototype.slerp = function (lhs, rhs, t) {
            var w0, x0, y0, z0;
            var w1, x1, y1, z1;
            // 两四元数点乘
            var cosOmega = w0 * w1 + x0 * x1 + y0 * y1 + z0 * z1;
            // 点乘为负, 反转四元数以取得短弧
            if (cosOmega < 0) {
                w1 = -w1;
                x1 = -x1;
                y1 = -y1;
                z1 = -z1;
                cosOmega = -cosOmega;
            }
            var k0 = 0, k1 = 0;
            if (cosOmega > 1 - s_epsilon) {
                k0 = 1 - t;
                k1 = t;
            }
            else {
                var sinOmega = Math.sqrt(1 - cosOmega * cosOmega);
                var omega = Math.atan2(sinOmega, cosOmega);
                var invSinOmega = 1 / sinOmega;
                k0 = Math.sin((1 - t) * omega) * invSinOmega;
                k1 = Math.sin(t * omega) * invSinOmega;
            }
            this.w = w0 * k0 + w1 * k1;
            this.x = x0 * k0 + x1 * k1;
            this.y = y0 * k0 + y1 * k1;
            this.z = z0 * k0 + z1 * k1;
            return this;
        };
        Quaternion.prototype.squad = function (q0, q1, s0, s1, t) {
            var slerpT = 2 * t * (1 - t);
            var slerpQ0 = Quaternion._TempQuat0.slerp(q0, q1, t);
            var slerpQ1 = Quaternion._TempQuat1.slerp(s0, s1, t);
            return this.slerp(slerpQ0, slerpQ1, slerpT);
        };
        // ------------------------------四元数,矩阵,向量互相转换--------------------------
        /**
         * 通过旋转矩阵构造四元数
         * @param rotMat
         */
        Quaternion.prototype.FromRotationMatrix = function (rotMat) {
            var w = this.w, x = this.x, y = this.y, z = this.z;
            return this;
        };
        Quaternion.prototype.ToRotationMatrix = function (rotMat) {
            if (!rotMat) {
                rotMat = new QE.Matrix4();
            }
            var w = this.w, x = this.x, y = this.y, z = this.z;
            var _2x = x + x, _2y = y + y, _2z = z + z;
            var _2xw = _2x * w, _2yw = _2y * w, _2zw = _2z * w;
            var _2xx = _2x * x, _2xy = _2y * x, _2xz = _2z * x;
            var _2yy = _2y * y, _2yz = _2z * y, _2zz = _2z * z;
            rotMat._00 = 1.0 - (_2yy + _2zz);
            rotMat._01 = _2xy + _2zw; /*-----*/
            rotMat._02 = _2xz - _2yw; /*-----*/
            rotMat._03 = 0;
            rotMat._10 = _2xy - _2zw; /*-----*/
            rotMat._11 = 1.0 - (_2xx + _2zz);
            rotMat._12 = _2yz + _2xw; /*-----*/
            rotMat._13 = 0;
            rotMat._20 = _2xz + _2yw; /*-----*/
            rotMat._21 = _2yz - _2xw; /*-----*/
            rotMat._22 = 1.0 - (_2xx + _2yy);
            rotMat._23 = 0;
            rotMat._30 = 0; /*---------------*/
            rotMat._31 = 0; /*---------------*/
            rotMat._32 = 0; /*---------------*/
            rotMat._33 = 1;
            return rotMat;
        };
        /**
         * 创建一个以axis轴为中心旋转rads弧度的四元数
         * @param axis
         * @param rads
         */
        Quaternion.prototype.fromAngleAxis = function (axis, rads) {
            var half_rads = rads / 2.0;
            var cosine = Math.cos(half_rads);
            var sine = Math.sin(half_rads);
            this.x = axis.x * sine;
            this.y = axis.y * sine;
            this.z = axis.z * sine;
            this.w = cosine;
            this.normalize();
        };
        /**
         * 返回四元数绕轴心和角度
         * @param axis 旋转轴
         * @returns 弧度
         */
        Quaternion.prototype.toAngleAxis = function (axis) {
            var rads = Math.acos(this.w) * 2.0;
            var s = Math.sin(rads / 2.0);
            if (s > 0) {
                axis.x = this.x / s;
                axis.y = this.y / s;
                axis.z = this.z / s;
            }
            else {
                axis.x = 1;
                axis.y = 0;
                axis.z = 0;
            }
            return rads;
        };
        /**
         * 欧拉角转四元数
         * @param eulerAngle 欧拉角
         * @param refQuaternion 欧拉角引用，如果不为空，将会改变传入的四元数，并返回传入的四元数
         * @return Quaternion 四元数
         */
        Quaternion.prototype.fromEulerAngle = function (eulerAngle) {
            return this.fromEulerAngleScalar(eulerAngle.x, eulerAngle.y, eulerAngle.z);
        };
        Quaternion.prototype.fromEulerAngleScalar = function (x, y, z) {
            var halfX = x * 0.5 * QE.DEGREES_TO_RADIANS;
            var sx = Math.sin(halfX);
            var cx = Math.cos(halfX);
            var halfY = y * 0.5 * QE.DEGREES_TO_RADIANS;
            var sy = Math.sin(halfY);
            var cy = Math.cos(halfY);
            var halfZ = z * 0.5 * QE.DEGREES_TO_RADIANS;
            var sz = Math.sin(halfZ);
            var cz = Math.cos(halfZ);
            this.w = cx * cy * cz + sx * sy * sz;
            this.x = sx * cy * cz - cx * sy * sz;
            this.y = cx * sy * cz + sx * cy * sz;
            this.z = cx * cy * sz - sx * sy * cz;
            return this;
        };
        /**
         * 四元数转欧拉角
         */
        Quaternion.prototype.toEulerAngle = function (refEulerAngle) {
            var w = this.w, x = this.x, y = this.y, z = this.z;
            if (!refEulerAngle) {
                refEulerAngle = new QE.Vector3();
            }
            refEulerAngle.x = Math.atan2(2.0 * (w * x + y * z), 1.0 - 2.0 * (x * x + y * y));
            var temp = 2.0 * (w * y - z * x);
            temp = QE.MathUtil.clampf(temp, -1.0, 1.0);
            refEulerAngle.y = Math.asin(temp);
            refEulerAngle.z = Math.atan2(2.0 * (w * z + x * y), 1.0 - 2.0 * (y * y + z * z));
            refEulerAngle.x *= QE.RADIANS_TO_DEGREES;
            refEulerAngle.y *= QE.RADIANS_TO_DEGREES;
            refEulerAngle.z *= QE.RADIANS_TO_DEGREES;
            return refEulerAngle;
        };
        Quaternion.prototype.getRightVector = function () {
            var w = this.w, x = this.x, y = this.y, z = this.z;
            return new QE.Vector3(1.0 - 2.0 * (y * y + z * z), 2.0 * (x * y + w * z), 2.0 * (x * z - w * y));
        };
        Quaternion.prototype.getUpVector = function () {
            var w = this.w, x = this.x, y = this.y, z = this.z;
            return new QE.Vector3(2.0 * (x * y - w * z), 1.0 - 2.0 * (x * x + z * z), 2.0 * (y * z + w * x));
        };
        Quaternion.prototype.getDirVector = function () {
            var w = this.w, x = this.x, y = this.y, z = this.z;
            return new QE.Vector3(2.0 * (w * y + x * z), 2.0 * (y * z - w * x), 1.0 - 2.0 * (x * x + y * y));
        };
        Quaternion.ClassName = 'Quaternion';
        /**
         * 四元数样条 squad(qi, qi1, si, si1, t) = slerp(slerp(qi, qi1, t), slerp(si, si1, t), 2 * t * (1 - t))
         */
        Quaternion._TempQuat0 = new Quaternion();
        Quaternion._TempQuat1 = new Quaternion();
        return Quaternion;
    }());
    QE.Quaternion = Quaternion;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     * 射线, 隐式定义方程
     */
    var Ray = /** @class */ (function () {
        function Ray(origin, direction) {
            this.origin = origin ? new QE.Vector3(origin.x, origin.y, origin.z) : new QE.Vector3();
            this.direction = direction ? new QE.Vector3(direction.x, direction.y, direction.z) : new QE.Vector3();
        }
        Ray.prototype.intersectPlane = function () {
            return true;
        };
        Ray.prototype.intersectTriangle = function () {
            return true;
        };
        Ray.prototype.intersectSphere = function () {
            return true;
        };
        Ray.prototype.intersectAABB = function () {
            return true;
        };
        Ray.prototype.intersectMesh = function () {
            return true;
        };
        Ray.ClassName = 'Ray';
        return Ray;
    }());
    QE.Ray = Ray;
    var Ray2D = /** @class */ (function () {
        function Ray2D() {
        }
        return Ray2D;
    }());
    QE.Ray2D = Ray2D;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Rect = /** @class */ (function () {
        function Rect(l, t, w, h) {
            this.left = l;
            this.top = t;
            this.width = w;
            this.height = h;
        }
        Rect.ClassName = 'Rect';
        return Rect;
    }());
    QE.Rect = Rect;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     * 球 (x - cx) * (x - cx) + (y - cy) *  (y - cy) +(z - cz) *  (z - cz) = r * r
     */
    var Sphere = /** @class */ (function () {
        function Sphere(x, y, z, radius) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (radius === void 0) { radius = 0; }
            this.center = new QE.Vector3(x, y, z);
            this.radius = radius;
        }
        Sphere.ClassName = 'Sphere';
        return Sphere;
    }());
    QE.Sphere = Sphere;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Spline = /** @class */ (function () {
        function Spline() {
        }
        return Spline;
    }());
    QE.Spline = Spline;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Vector2 = /** @class */ (function () {
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        /**
         * ���
         * @param lhs
         * @param rhs
         */
        Vector2.dot = function (lhs, rhs) {
            return lhs.x * rhs.x + lhs.y * rhs.y;
        };
        /**
         * ���
         * @param other
         */
        Vector2.prototype.add = function (other) {
            this.x += other.x;
            this.y += other.y;
            return this;
        };
        /**
         * ���
         * @param other
         */
        Vector2.prototype.sub = function (other) {
            this.x -= other.x;
            this.y -= other.y;
            return this;
        };
        /**
         * Scalar Product �����
         * @param multiplier
         */
        Vector2.prototype.scalarProduct = function (multiplier) {
            this.x *= multiplier;
            this.y *= multiplier;
            return this;
        };
        Vector2.prototype.vectorProduct = function (other) {
            this.x *= other.x;
            this.y *= other.y;
            return this;
        };
        /**
         * ���
         * @param other
         */
        Vector2.prototype.dot = function (other) {
            return this.x * other.x + this.y * other.y;
        };
        Vector2.prototype.divide = function (val) {
            console.assert(val > 0);
            this.x /= val;
            this.y /= val;
            return this;
        };
        Vector2.prototype.divideVector = function (other) {
            console.assert(other.x > 0 && other.y > 0);
            this.x /= other.x;
            this.y /= other.y;
            return this;
        };
        /**
         * ������һ��
         */
        Vector2.prototype.normalize = function () {
            var len = this.x * this.x + this.y * this.y;
            if (len) {
                var t = 1 / Math.sqrt(len);
                this.x *= t;
                this.y *= t;
            }
            else {
                this.x = 0;
                this.y = 0;
            }
            return this;
        };
        /**
         * ��ȡ��������
         */
        Vector2.prototype.getLength = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        /**
         * ��ȡ��������ƽ��
         */
        Vector2.prototype.getLengthSquare = function () {
            return this.x * this.x + this.y * this.y;
        };
        /**
         * ����������
         * @param v0
         * @param v1
         */
        Vector2.prototype.distance = function (v0, v1) {
            var dx = v0.x - v1.x;
            var dy = v0.y - v1.y;
            var distSquare = dx * dx + dy * dy;
            return Math.sqrt(distSquare);
        };
        /**
         * ����������ƽ��
         * @param v0
         * @param v1
         */
        Vector2.prototype.distanceSquare = function (v0, v1) {
            var dx = v0.x - v1.x;
            var dy = v0.y - v1.y;
            return dx * dx + dy * dy;
        };
        Vector2.prototype.lerp = function (v0, v1, t) {
            var x0 = v0.x, y0 = v0.y;
            var x1 = v1.x, y1 = v1.y;
            this.x = (x1 - x0) * t + x0;
            this.y = (y1 - y0) * t + y0;
            return this;
        };
        Vector2.ClassName = 'Vector2';
        return Vector2;
    }());
    QE.Vector2 = Vector2;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Vector3 = /** @class */ (function () {
        function Vector3(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Object.defineProperty(Vector3, "right", {
            get: function () {
                return new Vector3(1, 0, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3, "up", {
            get: function () {
                return new Vector3(0, 1, 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3, "forward", {
            get: function () {
                return new Vector3(0, 0, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "magnitude", {
            /**
             * 求模长
             */
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "sqrMagnitude", {
            /**
             * 求模长平方
             */
            get: function () {
                return this.x * this.x + this.y * this.y + this.z * this.z;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 点积
         * @param lhs
         * @param rhs
         */
        Vector3.dot = function (lhs, rhs) {
            return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
        };
        /**
         * 叉积
         * @param lhs
         * @param rhs
         */
        Vector3.cross = function (lhs, rhs) {
            var x1 = lhs.x, y1 = lhs.y, z1 = lhs.z;
            var x2 = rhs.x, y2 = rhs.y, z2 = rhs.z;
            var x = y1 * z2 - y2 * z1;
            var y = z1 * x2 - z2 * x1;
            var z = x1 * y2 - x2 * y1;
            return new Vector3(x, y, z);
        };
        /**
         * 两向量距离
         * @param v0
         * @param v1
         */
        Vector3.distance = function (v0, v1) {
            var dx = v0.x - v1.x;
            var dy = v0.y - v1.y;
            var dz = v0.z - v1.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        };
        /**
         * 两向量距离平方
         * @param v0
         * @param v1
         */
        Vector3.sqrDistance = function (v0, v1) {
            var dx = v0.x - v1.x;
            var dy = v0.y - v1.y;
            var dz = v0.z - v1.z;
            return dx * dx + dy * dy + dz * dz;
        };
        /**
         *
         * @param other
         */
        Vector3.prototype.copy = function (other) {
            this.x = other.x;
            this.y = other.y;
            this.z = other.z;
            return this;
        };
        /**
         * 复制一个自己,返回一个新的vector3
         */
        Vector3.prototype.clone = function () {
            return new Vector3(this.x, this.y, this.z);
        };
        /**
         * 是否相同
         * @param other
         */
        Vector3.prototype.equals = function (other) {
            return other.x === other.x && other.y === other.y && other.z === other.z;
        };
        /**
         * 置0
         */
        Vector3.prototype.setZero = function () {
            this.x = this.y = this.z = 0;
            return this;
        };
        Vector3.prototype.set = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        };
        /**
         * 相加
         * @param other
         */
        Vector3.prototype.add = function (other) {
            return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
        };
        /**
         * 相减
         * @param other
         */
        Vector3.prototype.sub = function (other) {
            var x = this.x - other.x;
            var y = this.y - other.y;
            var z = this.z - other.z;
            return new Vector3(x, y, z);
        };
        /**
         * Scalar Product 乘以标量
         * @param multiplier
         */
        Vector3.prototype.multiplyScalar = function (multiplier) {
            var x = this.x * multiplier;
            var y = this.y * multiplier;
            var z = this.z * multiplier;
            return new Vector3(x, y, z);
        };
        /**
         * 乘以向量
         * @param other
         */
        Vector3.prototype.multiplyVector3 = function (other) {
            var x = this.x * other.x;
            var y = this.y * other.y;
            var z = this.z * other.z;
            return new Vector3(x, y, z);
        };
        /**
         * 点积
         * @param other
         */
        Vector3.prototype.dot = function (other) {
            return this.x * other.x + this.y * other.y + this.z * other.z;
        };
        /**
         * 叉积
         * @param other
         */
        Vector3.prototype.cross = function (other) {
            var x1 = this.x, y1 = this.y, z1 = this.z;
            var x2 = other.x, y2 = other.y, z2 = other.z;
            var x = y1 * z2 - y2 * z1;
            var y = z1 * x2 - z2 * x1;
            var z = x1 * y2 - x2 * y1;
            return new Vector3(x, y, z);
        };
        /**
         * 除以标量
         * @param val
         */
        Vector3.prototype.divide = function (val) {
            // 不做除0检查
            console.assert(val != 0);
            var t = 1.0 / val;
            var x = this.x * t;
            var y = this.y * t;
            var z = this.z * t;
            return new Vector3(x, y, z);
        };
        /**
         * 除以向量
         * @param other
         */
        Vector3.prototype.divideVector = function (other) {
            console.assert(other.x > 0 && other.y > 0 && other.z > 0);
            var x = this.x / other.x;
            var y = this.y / other.y;
            var z = this.z / other.z;
            return new Vector3(x, y, z);
        };
        /**
         * 向量归一化
         */
        Vector3.prototype.normalize = function () {
            var x = this.x, y = this.y, z = this.z;
            var len = x * x + y * y + z * z;
            if (len) {
                var t = 1.0 / Math.sqrt(len);
                this.x = x * t;
                this.y = y * t;
                this.z = z * t;
            }
            return this;
        };
        Vector3.prototype.lerp = function (v0, v1, t) {
            var x0 = v0.x, y0 = v0.y, z0 = v0.z;
            var x1 = v1.x, y1 = v1.y, z1 = v1.z;
            this.x = (x1 - x0) * t + x0;
            this.y = (y1 - y0) * t + y0;
            this.z = (z1 - z0) * t + z0;
            return this;
        };
        Vector3.ClassName = 'Vector3';
        return Vector3;
    }());
    QE.Vector3 = Vector3;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Vector4 = /** @class */ (function () {
        function Vector4(x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 0; }
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        return Vector4;
    }());
    QE.Vector4 = Vector4;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Sound = /** @class */ (function () {
        function Sound() {
        }
        return Sound;
    }());
    QE.Sound = Sound;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Video = /** @class */ (function () {
        function Video() {
        }
        return Video;
    }());
    QE.Video = Video;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     * @class
     * @static
     */
    var Http = /** @class */ (function () {
        function Http() {
        }
        // 把参数data转为url查询参数
        Http.getUrlParam = function (url, data) {
            if (!data) {
                return '';
            }
            var paramsStr = data instanceof Object ? Http.getQueryString(data) : data;
            return (url.indexOf('?') !== -1) ? paramsStr : '?' + paramsStr;
        };
        // 获取ajax请求参数
        Http.getQueryData = function (data) {
            if (!data) {
                return null;
            }
            if (typeof data === 'string') {
                return data;
            }
            if (data instanceof FormData) {
                return data;
            }
            return Http.getQueryString(data);
        };
        // 把对象转为查询字符串
        Http.getQueryString = function (data) {
            var paramsArr = [];
            if (data instanceof Object) {
                Object.keys(data).forEach(function (key) {
                    var val = data[key];
                    paramsArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
                });
            }
            return paramsArr.join('&');
        };
        Http.ajax = function (options) {
            options = options ? Object.assign(Http._defaultOptions, options) : Http._defaultOptions;
            QE.assert(!options.url || !options.method || !options.responseType, '参数有误');
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (ev) {
                switch (xhr.readyState) {
                    case 0 /* Uninitialized */:
                        break;
                    case 1 /* Open */:
                        break;
                    case 2 /* Sent */:
                        break;
                    case 3 /* Receiving */:
                        break;
                    case 4 /* Loaded */:
                        var result = void 0;
                        var err = void 0;
                        var status_1 = xhr.status;
                        if ((status_1 >= 200 && status_1 < 300) || status_1 === 304) {
                            switch (xhr.responseType) {
                                case 'arraybuffer':
                                case 'blob':
                                case 'json':
                                    result = xhr.response;
                                    break;
                                case 'document':
                                    result = xhr.responseXML;
                                    break;
                                case 'text':
                                    result = xhr.responseText;
                                    break;
                                default:
                                    result = xhr.responseText;
                                    break;
                            }
                        }
                        else if (status_1 === 408) {
                            err = 'timeout';
                        }
                        else {
                            err = 'load failed: ' + url;
                        }
                        if (options.callback) {
                            options.callback.call(options.thisObj, err, result);
                        }
                        break;
                    default:
                        QE.Log.E('todo state: ' + xhr.readyState);
                        break;
                }
            };
            var url = options.url;
            var sendData;
            var method = options.method.toUpperCase();
            if (method === 'GET') {
                url += Http.getUrlParam(options.url, options.data);
            }
            else {
                sendData = Http.getQueryData(options.data);
            }
            for (var _i = 0, _a = Object.keys(options.headers); _i < _a.length; _i++) {
                var key = _a[_i];
                xhr.setRequestHeader(key, options.headers[key]);
            }
            xhr.open(method, url, options.async);
            xhr.responseType = options.responseType;
            if (options.async && options.timeout) {
                xhr.timeout = options.timeout;
            }
            xhr.send(sendData);
            return xhr;
        };
        /**
         *
         * @param url
         * @param data
         * @param header
         * @param callback
         * @param thisObj
         * @param isAsync
         */
        Http.get = function (url, data, callback, thisObj, isAsync) {
            if (isAsync === void 0) { isAsync = true; }
            return this.ajax({
                url: url,
                method: 'GET',
                responseType: 'text',
                data: data,
                callback: callback,
                thisObj: thisObj,
                async: isAsync
            });
        };
        Http.post = function (url, data, callback, thisObj, isAsync) {
            if (isAsync === void 0) { isAsync = true; }
            return this.ajax({
                url: url,
                method: 'POST',
                responseType: 'text',
                data: data,
                callback: callback,
                thisObj: thisObj,
                async: isAsync
            });
        };
        Http.loadTxtAsync = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                Http.ajax({
                                    url: url,
                                    method: 'GET',
                                    responseType: 'text',
                                    async: true,
                                    callback: function (err, data, xhr, status) {
                                        if (err) {
                                            reject(err);
                                        }
                                        else {
                                            resolve(data);
                                        }
                                    }
                                });
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Http.loadImageAsync = function (path) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var image = new Image();
                            image.onload = function () {
                                resolve(image);
                            };
                            image.onerror = function () {
                                reject('load image failed: ' + path);
                            };
                            image.src = path;
                        })];
                });
            });
        };
        Http.loadArrayBufferAsync = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            Http.ajax({
                                url: url,
                                method: 'GET',
                                responseType: 'arraybuffer',
                                async: true,
                                callback: function (err, data, xhr, status) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(data);
                                    }
                                }
                            });
                        })];
                });
            });
        };
        Http.loadAudioBufferAsync = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var arrayBuffer, e_1, buf, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.loadArrayBufferAsync(url)];
                        case 1:
                            arrayBuffer = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            console.error(e_1);
                            return [2 /*return*/, null];
                        case 3:
                            if (!arrayBuffer) {
                                console.error('file is not exist: ' + url);
                                return [2 /*return*/, null];
                            }
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this._context.decodeAudioData(arrayBuffer)];
                        case 5:
                            buf = _a.sent();
                            if (buf) {
                                return [2 /*return*/, buf];
                            }
                            else {
                                console.log('decode audio data failed');
                                return [2 /*return*/, null];
                            }
                            return [3 /*break*/, 7];
                        case 6:
                            e_2 = _a.sent();
                            console.error(e_2);
                            return [2 /*return*/, null];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        Http._defaultOptions = {
            url: '',
            method: 'GET',
            responseType: 'json',
            async: true,
            data: null,
            headers: {},
            timeout: 1000,
        };
        Http._context = new (window['AudioContext'] || window['webkitAudioContext'])();
        return Http;
    }());
    QE.Http = Http;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Billboard = /** @class */ (function () {
        function Billboard() {
        }
        return Billboard;
    }());
    QE.Billboard = Billboard;
    var BillboardSet = /** @class */ (function (_super) {
        __extends(BillboardSet, _super);
        function BillboardSet() {
            return _super.call(this) || this;
        }
        return BillboardSet;
    }(QE.GameObject));
    QE.BillboardSet = BillboardSet;
})(QE || (QE = {}));
///<reference path="../core/HashObject.ts" />
var QE;
///<reference path="../core/HashObject.ts" />
(function (QE) {
    function DisallowMultipleComponent(constructor) {
        constructor.__QE_DisallowMultipleComponent__ = true;
    }
    QE.DisallowMultipleComponent = DisallowMultipleComponent;
    var Component = /** @class */ (function (_super) {
        __extends(Component, _super);
        function Component() {
            var _this = _super.call(this) || this;
            _this._needCallStart = true;
            _this._enable = false;
            // 脚本函数
            // 启动时调用
            _this.onLoad = undefined;
            // 更新时调用
            _this.onUpdate = undefined;
            // 调试调用
            _this.onDebugDraw = undefined;
            return _this;
        }
        Object.defineProperty(Component.prototype, "node", {
            get: function () {
                return this._node;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "transform", {
            get: function () {
                return this.node.transform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "enabled", {
            get: function () {
                return this._enable;
            },
            set: function (val) {
                if (this._enable === val) {
                    return;
                }
                this._enable = val;
                if (val) {
                    this.enqueueComponent();
                }
                else {
                    this.dequeueComponent();
                }
            },
            enumerable: true,
            configurable: true
        });
        // 组件基本逻辑
        Component.load = function () {
            var unStartedComponentArr = Component.s_unStartedComponentArr;
            for (var i = 0, len = unStartedComponentArr.length; i < len; i++) {
                var comp = unStartedComponentArr[i];
                comp._needCallStart = false;
                Component.s_startedComponentArr.push(comp);
                if (comp.onLoad) {
                    comp.onLoad.call(comp);
                }
            }
            Component.s_unStartedComponentArr.length = 0;
        };
        Component.update = function (deltaTime) {
            var startedCompArr = Component.s_startedComponentArr;
            for (var i = 0, len = startedCompArr.length; i < len; i++) {
                var comp = startedCompArr[i];
                if (comp.onUpdate) {
                    comp.onUpdate.call(this, deltaTime);
                }
            }
        };
        Component.prototype.onDestroy = function () {
            this.enabled = false;
            this._node = null;
        };
        Component.prototype.compareTag = function (tag) {
            return this.tag === tag;
        };
        Component.prototype.getComponent = function (compCls) {
            return this.node.getComponent(compCls);
        };
        Component.prototype.getComponentInChildren = function (compCls, includeInactive) {
            if (includeInactive === void 0) { includeInactive = false; }
            return this.node.getComponentInChildren(compCls, includeInactive);
        };
        Component.prototype.GetComponentInParent = function (compCls) {
            return this.node.GetComponentInParent(compCls);
        };
        Component.prototype.getComponents = function (compCls) {
            return this.node.getComponents(compCls);
        };
        Component.prototype.getComponentsInChildren = function (compCls, includeInactive, outCompList) {
            if (includeInactive === void 0) { includeInactive = false; }
            return this.node.getComponentsInChildren(compCls, includeInactive, outCompList);
        };
        Component.prototype.getComponentsInParent = function (compCls, includeInactive, outCompList) {
            if (includeInactive === void 0) { includeInactive = false; }
            return this.node.getComponentsInParent(compCls, includeInactive, outCompList);
        };
        Component.prototype.notifyAttachNode = function (val) {
            console.assert(!this._node, '重复挂载节点');
            console.assert(!!val, '挂载节点为空');
            this._node = val;
        };
        Component.prototype.enqueueComponent = function () {
            if (this._needCallStart) {
                Component.s_unStartedComponentArr.push(this);
            }
            else {
                Component.s_startedComponentArr.push(this);
            }
        };
        Component.prototype.dequeueComponent = function () {
            if (this._needCallStart) {
                var idx = Component.s_unStartedComponentArr.indexOf(this);
                if (idx != -1) {
                    Component.s_unStartedComponentArr.splice(idx, 1);
                }
            }
            else {
                var idx = Component.s_startedComponentArr.indexOf(this);
                if (idx != -1) {
                    Component.s_startedComponentArr.splice(idx, 1);
                }
            }
        };
        Component.__QE_DisallowMultipleComponent__ = false;
        // 脚本管理
        Component.s_unStartedComponentArr = [];
        Component.s_startedComponentArr = [];
        return Component;
    }(QE.HashObject));
    QE.Component = Component;
})(QE || (QE = {}));
///<reference path="Component.ts" />
var QE;
///<reference path="Component.ts" />
(function (QE) {
    var DEFAULT_FOV = 45;
    var DEFAULT_ASPECT = 1;
    var DEFAULT_NEAR = 0.1;
    var DEFAULT_FAR = 100;
    var Camera = /** @class */ (function (_super) {
        __extends(Camera, _super);
        function Camera() {
            var _this = _super.call(this) || this;
            _this._clearFlags = 0 /* SkyBox */;
            _this._fovY = DEFAULT_FOV; // fovY: (0, 180) fovY = atan(（(r - l) / 2） / n)
            _this._near = DEFAULT_NEAR;
            _this._far = DEFAULT_FAR;
            _this._aspect = DEFAULT_ASPECT;
            _this._isDirty = true;
            _this._viewportDirty = false;
            _this._projMatrix = new QE.Matrix4();
            _this._viewport = {
                x: 0, y: 0, w: 1, h: 1
            };
            _this._cameraType = 0 /* Perspective */;
            _this._renderContext = new QE.RenderContext(_this);
            return _this;
        }
        Object.defineProperty(Camera.prototype, "renderContext", {
            get: function () {
                return this._renderContext;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.setCameraType = function (cameraType) {
            if (this._cameraType != cameraType) {
                this._cameraType = cameraType;
                this._isDirty = true;
            }
        };
        Camera.prototype.getCameraType = function () {
            return this._cameraType;
        };
        Camera.prototype.setFOV = function (fovY) {
            if (this._fovY != fovY) {
                this._fovY = fovY;
                this._viewportDirty = true;
            }
        };
        Camera.prototype.getFOV = function () {
            return this._fovY;
        };
        Camera.prototype.setNearClip = function (near) {
            if (this._near != near) {
                this._near = near;
                this._viewportDirty = true;
            }
        };
        Camera.prototype.getNearClip = function () {
            return this._near;
        };
        Camera.prototype.setFarClip = function (far) {
            if (this._far != far) {
                this._far = far;
                this._viewportDirty = true;
            }
        };
        Camera.prototype.getFarClip = function () {
            return this._far;
        };
        Camera.prototype.setAspect = function (aspect) {
            if (this._aspect != aspect) {
                this._aspect = aspect;
                this._viewportDirty = true;
            }
        };
        Camera.prototype.getAspect = function () {
            return this._aspect;
        };
        Camera.prototype.setOrthoWidth = function (w) {
            this._orthoWidth = w;
            this._isDirty = true;
        };
        Camera.prototype.setOrthoHeight = function (h) {
            this._orthoHeight = h;
            this._isDirty = true;
        };
        Object.defineProperty(Camera.prototype, "viewPort", {
            get: function () {
                return this._viewport;
            },
            set: function (val) {
                this._viewport = val;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.getViewMatrix = function () {
            console.assert(!!this.transform);
            return this.transform.localToWorldMatrix;
        };
        Camera.prototype.getProjMatrix = function () {
            this._update();
            return this._projMatrix;
        };
        Object.defineProperty(Camera.prototype, "renderTarget", {
            get: function () {
                return this._renderTarget;
            },
            set: function (val) {
                this._renderTarget = val;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype._update = function () {
            if (!this._isDirty) {
                return;
            }
            var far = this._far;
            var near = this._near;
            var viewport = this._viewport;
            var left = viewport.x;
            var right = viewport.x + viewport.w * QE.Screen.screenWidth;
            var top = viewport.y + viewport.h * QE.Screen.screenHeight;
            var bottom = viewport.y;
            if (this._cameraType === 1 /* Orthogonal */) {
                var half_w = this._orthoWidth * 0.5;
                var half_h = this._orthoHeight * 0.5;
                left = -half_w;
                right = +half_w;
                bottom = -half_h;
                top = +half_h;
            }
            switch (this._cameraType) {
                case 1 /* Orthogonal */:
                    QE.Matrix4.makeOrthoRH(left, right, bottom, top, near, far, this._projMatrix);
                    break;
                case 0 /* Perspective */:
                    QE.Matrix4.makePerspectiveFovRH(this._fovY, this._aspect, this._near, this._far, this._projMatrix);
                    break;
                default:
                    console.warn('unkonw camera type: ' + this._cameraType);
                    break;
            }
            this._isDirty = false;
        };
        return Camera;
    }(QE.Component));
    QE.Camera = Camera;
})(QE || (QE = {}));
var QE;
(function (QE) {
    // 标准光照方程
    // Clit = C_spec + C_diff + C_amb;
    // Clit: 光照颜色值
    // C_spec: 镜面反射分量
    // C_diff: 漫反射分量
    // C_amb: 环境分量
    var Light = /** @class */ (function (_super) {
        __extends(Light, _super);
        function Light() {
            var _this = _super.call(this) || this;
            /**
             * 光类型
             */
            _this.lightType = 1 /* Direction */;
            return _this;
        }
        Light.prototype.updateRenderQueue = function (renderQueue) {
        };
        return Light;
    }(QE.Component));
    QE.Light = Light;
})(QE || (QE = {}));
///<reference path="Component.ts" />
var QE;
///<reference path="Component.ts" />
(function (QE) {
    /**
     * 变换组件
     */
    var Transform = /** @class */ (function (_super) {
        __extends(Transform, _super);
        function Transform() {
            var _this = _super.call(this) || this;
            _this._children = [];
            _this._parent = undefined;
            _this._needParentUpdate = false;
            _this._needChildUpdate = false;
            _this._needTransformUpdate = false;
            _this._needWorldToLocalMatrixUpdate = true;
            _this._needEulerUpdate = true;
            _this._parentNotified = false;
            _this._childrenToUpdate = [];
            _this._position = new QE.Vector3();
            _this._localPosition = new QE.Vector3();
            _this._rotation = new QE.Quaternion();
            _this._localRotation = new QE.Quaternion();
            _this._eulerAngle = new QE.Vector3();
            _this._localEulerAngle = new QE.Vector3();
            _this._scale = new QE.Vector3(1, 1, 1);
            _this._localScale = new QE.Vector3(1, 1, 1);
            _this._localToWorldMatrix = new QE.Matrix4();
            _this._worldToLocalMatrix = new QE.Matrix4();
            _this._childNameDict = {};
            return _this;
        }
        Object.defineProperty(Transform.prototype, "childCount", {
            /**
             * 子节点数量
             */
            get: function () {
                return this._children.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "parent", {
            /**
            * 返回父节点
            */
            get: function () {
                return this._parent;
            },
            /**
            * 设置父节点
            * @param {QE.Transform} parent 父节点, 为空则从当前父节点删除
            */
            set: function (parent) {
                this._parentNotified = false;
                var prevParent = this._parent;
                if (prevParent === parent) {
                    return;
                }
                this._parent = parent;
                // remove from the previous parent
                if (prevParent) {
                    var childs = prevParent._children;
                    var index = childs.indexOf(this);
                    if (index === -1) {
                        console.error('not found the node: ' + this.node.name);
                    }
                    else {
                        childs.splice(index);
                        prevParent.needUpdate(true);
                    }
                    // insert into scene children
                    QE.SceneManager.instance.currentScene.insertNode(this.node);
                }
                else {
                    // this is a root node, remove from the scene.
                    QE.SceneManager.instance.currentScene.removeNode(this.node);
                }
                if (parent) {
                    parent._children.push(this);
                }
                this.needUpdate(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "position", {
            /*
             * 返回世界坐标
            */
            get: function () {
                if (this._needTransformUpdate) {
                    this._updateFromParent();
                }
                return this._position;
            },
            /*
             * 设置世界坐标
            */
            set: function (val) {
                this._position = val;
                if (this._parent) {
                    var localMat = this.worldToLocalMatrix;
                    // 世界坐标转换到本地坐标系
                    val = localMat.transformVector3(val);
                }
                this._localPosition.copy(val);
                this.needUpdate(false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localPosition", {
            /*
             * 返回本地坐标
            */
            get: function () {
                return this._localPosition;
            },
            /*
             * 设置本地坐标
            */
            set: function (val) {
                this._localPosition.copy(val);
                this.needUpdate(false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "rotation", {
            /*
             * 返回世界旋转四元数
            */
            get: function () {
                if (this._needTransformUpdate) {
                    this._updateFromParent();
                }
                return this._rotation;
            },
            /*
             * 设置世界旋转四元数
            */
            set: function (q) {
                if (this._parent) {
                    q = this._parent.rotation.inverse().multiply(q);
                }
                // 只需要设置localRotation, rotation会延迟自动计算
                this.localRotation = q;
                this._needEulerUpdate = true;
                this.needUpdate(false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localRotation", {
            /*
             * 返回本地旋转四元数
            */
            get: function () {
                return this._localRotation;
            },
            /*
             * 设置本地旋转四元数
            */
            set: function (q) {
                this._localRotation.copyFrom(q);
                this._needEulerUpdate = true;
                this.needUpdate(false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "eulerAngle", {
            /*
             * 返回世界欧拉角
            */
            get: function () {
                if (this._needTransformUpdate) {
                    this._updateFromParent();
                }
                this.rotation.toEulerAngle(this._eulerAngle);
                return this._eulerAngle;
            },
            /*
             * 设置本地欧拉角
            */
            set: function (e) {
                this._eulerAngle.copy(e);
                var tempQuat = new QE.Quaternion();
                this.rotation = tempQuat.fromEulerAngle(e);
                this.needUpdate(false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localEulerAngle", {
            /*
             * 返回本地欧拉角
            */
            get: function () {
                if (this._needTransformUpdate) {
                    this._updateFromParent();
                }
                this.localRotation.toEulerAngle(this._localEulerAngle);
                return this._localEulerAngle;
            },
            /*
             * 设置本地欧拉角
            */
            set: function (e) {
                this._localEulerAngle.copy(e);
                this.localRotation = this._localRotation.fromEulerAngle(e);
                this.needUpdate(false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "scale", {
            /*
             * 返回世界缩放
            */
            get: function () {
                return this._scale;
            },
            /*
             * 设置世界缩放
            */
            set: function (s) {
                this._scale.copy(s);
                // TODO:
                this.needUpdate(false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localScale", {
            /*
             * 返回本地缩放
            */
            get: function () {
                return this._localScale;
            },
            /*
             * 设置本地缩放
            */
            set: function (s) {
                this._localScale.copy(s);
                this.needUpdate(false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localToWorldMatrix", {
            /*
             * 返回世界矩阵
            */
            get: function () {
                if (this._needTransformUpdate) {
                    this._updateFromParent();
                }
                return this._localToWorldMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "worldToLocalMatrix", {
            /*
             * 设置本地矩阵
            */
            get: function () {
                var worldMatrix = this._worldToLocalMatrix;
                if (this._needWorldToLocalMatrixUpdate) {
                    if (this._needTransformUpdate) {
                        this._updateFromParent();
                    }
                    var theRotation = this._localRotation;
                    var axisX = new QE.Vector3(1, 0, 0);
                    var axisY = new QE.Vector3(0, 1, 0);
                    var axisZ = new QE.Vector3(0, 0, 1);
                    axisX = theRotation.rotateVector3(axisX);
                    axisY = theRotation.rotateVector3(axisY);
                    axisZ = theRotation.rotateVector3(axisZ);
                    worldMatrix.set(axisX.x, axisY.x, axisZ.x, 0, axisX.y, axisY.y, axisZ.y, 0, axisX.z, axisY.z, axisZ.z, 0, 0, 0, 0, 1);
                    this._needWorldToLocalMatrixUpdate = false;
                }
                return worldMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Transform.prototype.removeChildren = function () {
            var childs = this._children;
            for (var i = 0, len = childs.length; i < len; i++) {
                var c = childs[i];
                c.parent = null;
            }
            this._children = [];
            this.needUpdate();
        };
        Transform.prototype.getChildByIndex = function (index) {
            var childs = this._children;
            if (index < 0 || index >= childs.length) {
                throw new Error('out of range');
            }
            return this._children[index];
        };
        Transform.prototype.find = function (name) {
            var thisChildNameDict = this._childNameDict;
            var child = thisChildNameDict[name];
            if (child) {
                return child;
            }
            var pathSegment = name.split('/');
            child = this._findByPath(pathSegment, 0);
            if (child) {
                thisChildNameDict[name] = child;
            }
            return child;
        };
        Transform.prototype._findByPath = function (pathSegment, startIdx) {
            var deep = pathSegment.length;
            if (startIdx >= deep) {
                return null;
            }
            var theNode;
            var name = pathSegment[startIdx];
            if (this.node.name != name) {
                return null;
            }
            if (startIdx === deep - 1) {
                return this;
            }
            var childs = this._children;
            for (var i = 0, len = childs.length; i < len; i++) {
                var find = childs[i]._findByPath(pathSegment, startIdx + 1);
                if (find) {
                    return find;
                }
            }
        };
        Transform.prototype.findChild = function (name) {
            var thisChildNameDict = this._childNameDict;
            var pathSegment = name.split('/').splice(0, 0, this.node.name + '/');
            return this._findByPath(pathSegment, 1);
        };
        Transform.prototype.update = function (updateChildren, parentHasChanged) {
            this._parentNotified = false;
            // 父节点改变则更新自身
            if (parentHasChanged) {
                this._updateFromParent();
            }
            // 不更新子节点的话，直接return
            if (!updateChildren) {
                return;
            }
            // 子节点树改变或者父节点改变，都需要更新子节点
            if (this._needChildUpdate || parentHasChanged) {
                var childs = this._children;
                for (var i = 0, len = childs.length; i < len; i++) {
                    childs[i].update(true, true);
                }
                this._needChildUpdate = false;
            }
            else {
                // 存在待更新的子节点
                var childs = this._childrenToUpdate;
                for (var i = 0, len = childs.length; i < len; i++) {
                    childs[i].update(true, false);
                }
            }
            // 清空待更新的数组
            this._childrenToUpdate.length = 0;
        };
        Transform.prototype._updateFromParent = function () {
            this._needTransformUpdate = true;
            var parent = this._parent;
            if (parent) {
                // Update orientation
                var parentRotation = parent.rotation;
                this._rotation = this._localRotation.multiply(parentRotation);
                // Update scale
                var parentScale = parent.scale;
                this._scale = parentScale.multiplyVector3(this._localScale);
                // Change position vector based on parent's orientation & scale
                var tempPos = parentRotation.rotateVector3(parentScale.multiplyVector3(this._localPosition));
                // Add altered position vector to parents
                this._position = tempPos.add(parent.position);
            }
            else {
                this._position.copy(this._localPosition);
                this._rotation.copyFrom(this._localRotation);
                this._scale.copy(this._localScale);
            }
            QE.Matrix4.makeTransform(this._position, this._rotation, this._scale, this._localToWorldMatrix);
            this._needTransformUpdate = false;
            this._needParentUpdate = false;
            // TODO: post event node updated
        };
        Transform.prototype.needUpdate = function (forceParentUpdate) {
            this._needParentUpdate = true;
            this._needChildUpdate = true;
            this._needTransformUpdate = true;
            this._needWorldToLocalMatrixUpdate = true;
            var theParent = this._parent;
            if (theParent && (!this._parentNotified || forceParentUpdate)) {
                theParent.requestUpdate(this, forceParentUpdate);
                this._parentNotified = true;
            }
            this._childrenToUpdate.length = 0;
        };
        Transform.prototype.requestUpdate = function (child, forceParentUpdate) {
            if (this._needChildUpdate) {
                return;
            }
            this._childrenToUpdate.push(child);
            var theParent = this._parent;
            if (theParent && (!this._parentNotified || forceParentUpdate)) {
                theParent.requestUpdate(this, forceParentUpdate);
                this._parentNotified = true;
            }
        };
        Transform = __decorate([
            QE.DisallowMultipleComponent
        ], Transform);
        return Transform;
    }(QE.Component));
    QE.Transform = Transform;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var MeshFilter = /** @class */ (function (_super) {
        __extends(MeshFilter, _super);
        function MeshFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MeshFilter.prototype, "mesh", {
            get: function () {
                return this._mesh;
            },
            set: function (mesh) {
                this._mesh = mesh;
            },
            enumerable: true,
            configurable: true
        });
        return MeshFilter;
    }(QE.Component));
    QE.MeshFilter = MeshFilter;
    /**
     * 网格
     */
    var Mesh = /** @class */ (function (_super) {
        __extends(Mesh, _super);
        function Mesh() {
            var _this = _super.call(this) || this;
            /**
             * 子网格数组
             */
            _this.subMeshes = [];
            return _this;
        }
        Object.defineProperty(Mesh.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (val) {
                this._name = val;
            },
            enumerable: true,
            configurable: true
        });
        Mesh.prototype.copy = function (object) {
            _super.prototype.copy.call(this, object);
        };
        Mesh.prototype.clone = function () {
            var m = new Mesh();
            m.copy(this);
            return m;
        };
        Mesh.prototype.addSubMesh = function (subMesh) {
            if (QE.__QE_DEBUG__) {
                console.assert(subMesh != null);
                console.assert(this.subMeshes.indexOf(subMesh) === -1);
            }
            subMesh.parent = this;
            this.subMeshes.push(subMesh);
        };
        Mesh.prototype.createSubMesh = function (name) {
            // TODO: implement here
            return undefined;
        };
        Mesh.prototype.update = function () {
        };
        Mesh.prototype.loadImpl = function () {
        };
        Mesh.prototype.unloadImpl = function () {
        };
        return Mesh;
    }(QE.HashObject));
    QE.Mesh = Mesh;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var MeshManager = /** @class */ (function () {
        function MeshManager() {
        }
        return MeshManager;
    }());
    QE.MeshManager = MeshManager;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var MeshSerializer = /** @class */ (function () {
        function MeshSerializer() {
        }
        MeshSerializer.exportMeshWithJson = function (mesh, filename) {
        };
        MeshSerializer.exportMeshWithBinary = function (mesh, filename) {
        };
        MeshSerializer.importMeshWithJson = function (meshData, mesh) {
            mesh.id = meshData.id;
            mesh.name = meshData.name;
            var vertices = [];
            var colors = [];
            var normals = [];
            var uvs = [];
            var indices = [];
            // load mesh info
            var position = meshData['position'] || [];
            for (var i = 0; i < position.length; i += 3) {
                vertices.push(position[i]);
                vertices.push(position[i + 1]);
                vertices.push(-position[i + 2]);
            }
            var color = meshData['color'] || [];
            for (var i = 0; i < Math.floor(position.length / 3); i++) {
                colors.push(255);
                colors.push(255);
                colors.push(255);
                colors.push(255);
            }
            var normal = meshData['normal'] || [];
            for (var i = 0; i < normal.length; i += 3) {
                var p = normal[i];
                normals.push(normal[i]);
                normals.push(normal[i + 1]);
                normals.push(normal[i + 2]);
            }
            var uv = meshData['uv'] || [];
            for (var i = 0; i < uv.length; i += 2) {
                uvs.push(uv[i]);
                uvs.push(uv[i + 1]);
            }
            var posBuf = QE.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            posBuf.type = QE.gl.FLOAT;
            posBuf.semantic = 1 /* POSITION */;
            posBuf.vertexCount = vertices.length / 3;
            posBuf.writeData((new Float32Array(vertices)).buffer);
            posBuf.bindBuffer();
            var colBuf = QE.WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, 1 /* STATIC */);
            colBuf.type = QE.gl.UNSIGNED_BYTE;
            colBuf.semantic = 5 /* DIFFUSE */;
            colBuf.vertexCount = colors.length;
            colBuf.writeData((new Uint8Array(colors)).buffer);
            colBuf.bindBuffer();
            var normalBuf = QE.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            normalBuf.type = QE.gl.FLOAT;
            normalBuf.semantic = 4 /* NORMAL */;
            normalBuf.vertexCount = normals.length;
            normalBuf.writeData((new Float32Array(normals)).buffer);
            normalBuf.bindBuffer();
            var uvBuf = QE.WebGLBufferManager.instance.createVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, 1 /* STATIC */);
            uvBuf.type = QE.gl.FLOAT;
            uvBuf.semantic = 7 /* TEXTURE_COORDINATES */;
            uvBuf.vertexCount = uvs.length;
            uvBuf.writeData((new Float32Array(uvs)).buffer);
            uvBuf.bindBuffer();
            var sharedVertexData = [];
            sharedVertexData[0] = posBuf;
            sharedVertexData[1] = colBuf;
            sharedVertexData[2] = normalBuf;
            sharedVertexData[3] = uvBuf;
            mesh.sharedVertexData = sharedVertexData;
            var subMeshes = meshData['subMeshes'];
            for (var i = 0, len = subMeshes.length; i < len; i++) {
                var indicesData = meshData['subMeshes'][0]['indices'];
                for (var i_1 = 0; i_1 < indicesData.length; i_1++) {
                    indices.push(indicesData[i_1]);
                }
                var subMesh = new QE.SubMesh();
                // 共享mesh顶点数据
                subMesh.useSharedVertices = true;
                // TODO: 解析material
                var defmaterial = QE.Material.getDefaultCubeMaterial();
                // 子网格索引数据
                var indicesBuf = QE.WebGLBufferManager.instance.createIndexBuffer(indices.length, 1 /* STATIC */, false);
                indicesBuf.writeData(indices);
                indicesBuf.bindBuffer();
                subMesh.indexData = indicesBuf;
                mesh.addSubMesh(subMesh);
            }
        };
        MeshSerializer.importMeshWithBinary = function (data, mesh) {
        };
        MeshSerializer.loadModel = function (modelData) {
            var currentScene = QE.SceneManager.instance.currentScene;
            var rootNodes = [];
            // export interface ModelData {
            //    metadata: string;
            //    materials?: string[];
            //    textures?: string[];
            //    skeleton?: SkeletonData[];
            //    poses?: PoseData[];
            //    hierarchy?: BoneData[];
            //    meshes: MeshData[];
            //    animations?: Object[];
            // }
            var hierarchyData = modelData.hierarchy;
            var hierarchy = {};
            for (var i = 0, len = hierarchyData.length; i < len; i++) {
                var boneData = hierarchyData[i];
                console.assert(!!!hierarchy[boneData.id], '重复的骨骼id: ' + boneData.id);
                var parentBoneNode = hierarchy[boneData.parentId];
                var boneNode = void 0;
                // 存在父节点
                if (parentBoneNode) {
                    boneNode = currentScene.createNode(parentBoneNode.transform);
                }
                else {
                    boneNode = currentScene.createNode();
                    // root node
                    rootNodes.push(boneNode);
                }
                boneNode.name = boneData.name;
                hierarchy[boneData.id] = boneNode;
                var boneTransform = boneNode.transform;
                boneTransform.localPosition = new QE.Vector3(boneData.position[0], boneData.position[1], boneData.position[2]);
                boneTransform.localScale = new QE.Vector3(boneData.scale[0], boneData.scale[1], boneData.scale[2]);
                var eulerAngle = new QE.Vector3(boneData.eulerAngle[0], boneData.eulerAngle[1], boneData.eulerAngle[2]);
                var tempQ = boneTransform.localRotation.fromEulerAngle(eulerAngle);
                boneTransform.localRotation = tempQ;
            }
            // bind pose
            var poseDatas = modelData.poses || [];
            for (var i = 0, len = poseDatas.length; i < len; i++) {
                var poseData = poseDatas[i];
                if (poseData.isBindPose) {
                    var isCharacter = poseData.isCharacter;
                    var poseItems = poseData.items;
                    var poseItemDict = {};
                    for (var ii = 0, len2 = poseItems.length; ii < len2; ii++) {
                        poseItemDict[poseItems[ii].id] = poseItems[ii];
                    }
                    for (var ii = 0, len2 = hierarchyData.length; ii < len2; ii++) {
                        var data = hierarchyData[ii];
                        var poseItem = poseItemDict[data.id];
                        if (!poseItem) {
                            continue;
                        }
                        var bindNode = hierarchy[data.id];
                        if (!bindNode) {
                            console.error('bind pose error. bone not find: ' + poseItem.id);
                            continue;
                        }
                        var matrix = poseItem.matrix;
                        var mat = new QE.Matrix4();
                        mat.set(matrix[0], matrix[4], matrix[8], matrix[12], matrix[1], matrix[5], matrix[9], matrix[13], matrix[2], matrix[6], matrix[10], matrix[14], matrix[3], matrix[7], matrix[11], matrix[15]);
                        if (poseItem.isLocalMatrix) {
                            // bindNode.transform.position = mat.getTrans();
                            var q = new QE.Quaternion();
                            q.FromRotationMatrix(mat);
                            // bindNode.transform.localRotation = bindNode.transform.localRotation.multiply(q);
                        }
                        else {
                            // bindNode.transform.position = mat.getTrans();
                            var q = new QE.Quaternion();
                            q.FromRotationMatrix(mat);
                            bindNode.transform.rotation = bindNode.transform.localRotation.multiply(q);
                        }
                    }
                }
            }
            for (var i = 0, len = hierarchyData.length; i < len; i++) {
                var boneData = hierarchyData[i];
                var boneNode = hierarchy[boneData.id];
                var boneTransform = boneNode.transform;
                console.log('load bone {' + boneData.name + '}. pos: ' + JSON.stringify(boneTransform.localPosition) +
                    '  \n euler: ' + JSON.stringify(boneTransform.localEulerAngle) +
                    '  \n rot: ' + JSON.stringify(boneTransform.localRotation));
            }
            // add mesh component
            var meshes = modelData.meshes;
            for (var i = 0, len = meshes.length; i < len; i++) {
                var meshData = meshes[i];
                var meshNode = hierarchy[meshData.id];
                if (!meshNode) {
                    console.error('bind pose error. bone not find: ' + meshData.id);
                    continue;
                }
                meshNode.name = meshData.name;
                var mesh = new QE.Mesh();
                MeshSerializer.importMeshWithJson(meshData, mesh);
                var meshFilter = meshNode.addComponent(QE.MeshFilter);
                meshFilter.mesh = mesh;
                var meshRender = meshNode.addComponent(QE.MeshRender);
                meshRender.mesh = mesh;
                meshRender.setMaterial(QE.Material.getDefaultCubeMaterial());
            }
            // load animation
            var animations = modelData.animations || [];
            if (animations && animations.length > 0) {
                // 创建动画控制器
                var animController = new QE.AnimatorController();
                for (var i = 0, len = animations.length; i < len; i++) {
                    var animData = animations[i];
                    var clip = parseAnimationClip(animData);
                    animController.addClip(clip);
                }
                // 添加Animator组件
                var animator = rootNodes[0].addComponent(QE.Animator);
                animator.animController = animController;
            }
            // animator.play("Take 001");
            return rootNodes[0];
        };
        return MeshSerializer;
    }());
    QE.MeshSerializer = MeshSerializer;
    function parseAnimationClip(animData) {
        // 创建动画片段
        var posClip = new QE.AnimationClip();
        posClip.name = 'Take 001';
        var maxTime = 0;
        for (var nodePath in animData) {
            var nodeCurveData = animData[nodePath];
            for (var curveName in nodeCurveData) {
                if (curveName === '') {
                    continue;
                }
                var curveData = nodeCurveData[curveName];
                var curve = new QE.AnimationCurve();
                for (var i = 0, len = curveData.length; i < len; i++) {
                    var keyFrameData = curveData[i];
                    var reverse = 1;
                    if (curveName.indexOf('localEulerAngle.z') > -1 || curveName.indexOf('localPosition.z') > -1) {
                        reverse = -1;
                    }
                    curve.addKeyFrameByValue(keyFrameData['time'], reverse * keyFrameData['value']);
                    if (keyFrameData['time'] > maxTime) {
                        maxTime = keyFrameData['time'];
                    }
                }
                if (nodePath != '') {
                    posClip.addCurve(nodePath, QE.Reflection.Type.typeOf(QE.Transform), curveName, curve);
                }
                else {
                    posClip.addCurve('RootNode', QE.Reflection.Type.typeOf(QE.Transform), curveName, curve);
                }
            }
        }
        posClip.length = maxTime;
        return posClip;
    }
})(QE || (QE = {}));
var QE;
(function (QE) {
    var SubMesh = /** @class */ (function () {
        function SubMesh() {
        }
        Object.defineProperty(SubMesh.prototype, "materialName", {
            get: function () {
                return this._materialName;
            },
            set: function (val) {
                this._materialName = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 复制一个新的SubMesh
         * @param newName 新的SubMesh名称
         * @param parentMesh 新的Submesh父Mesh, 如果为空, 父Mesh为被克隆的Mesh父Mesh
         */
        SubMesh.prototype.clone = function (newName, parentMesh) {
            if (parentMesh) {
                var newSubMesh = parentMesh.createSubMesh(newName);
            }
            else {
                var newSubMesh = this.parent.createSubMesh(newName);
            }
        };
        SubMesh.prototype.getRenderOperation = function (renderOp) {
            renderOp.indexBuffer = this.indexData;
            renderOp.renderOpType = this.renderOpType;
            renderOp.vertexBuffers = this.useSharedVertices ? this.parent.sharedVertexData : this.vertexData;
        };
        return SubMesh;
    }());
    QE.SubMesh = SubMesh;
})(QE || (QE = {}));
///<reference path="../../../core/HashObject.ts" />
var QE;
///<reference path="../../../core/HashObject.ts" />
(function (QE) {
    /**
     * 动画片段
     * 动画片段包含一组动画曲线.每个曲线对应节点路径
     */
    var AnimationClip = /** @class */ (function (_super) {
        __extends(AnimationClip, _super);
        /**
         *
         */
        function AnimationClip() {
            var _this = _super.call(this) || this;
            _this._frameRate = 0;
            _this._length = 0;
            _this._keyFrameTimes = [];
            _this._positionCurveDict = {};
            _this._scaleCurveDict = {};
            _this._eulerCurveDict = {};
            _this._numberCurveDict = {};
            _this._objCurveDict = {};
            return _this;
        }
        Object.defineProperty(AnimationClip.prototype, "frameRate", {
            get: function () {
                return this._frameRate;
            },
            set: function (val) {
                this._frameRate = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "length", {
            get: function () {
                return this._length;
            },
            set: function (val) {
                this._length = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (val) {
                this._name = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加一条曲线
         * @param relativePath 曲线对应节点路径
         * @param type 属性类型
         * @param propertyName 属性名
         * @param curve 曲线
         */
        AnimationClip.prototype.addCurve = function (relativePath, type, propertyName, curve) {
            curve._propName = propertyName;
            curve._valueType = type;
            if (type.equal(QE.Reflection.Type.typeOf(QE.Transform))) {
                var segmentProp = splitProperty(propertyName);
                console.assert(segmentProp.length === 2, 'Transform属性长度为2');
                var transCurveArr = void 0;
                if (segmentProp[0] === 'localPosition') {
                    transCurveArr = this._positionCurveDict[relativePath];
                    if (!transCurveArr) {
                        this._positionCurveDict[relativePath] = transCurveArr = [];
                    }
                }
                else if (segmentProp[0] === 'localEulerAngle') {
                    transCurveArr = this._eulerCurveDict[relativePath];
                    if (!transCurveArr) {
                        this._eulerCurveDict[relativePath] = transCurveArr = [];
                    }
                }
                else if (segmentProp[0] === 'localScale') {
                    transCurveArr = this._scaleCurveDict[relativePath];
                    if (!transCurveArr) {
                        this._scaleCurveDict[relativePath] = transCurveArr = [];
                    }
                }
                else {
                    console.error('不支持的变换属性：' + segmentProp[0]);
                }
                if (segmentProp[1] === 'x') {
                    transCurveArr.splice(0, 1, curve);
                }
                else if (segmentProp[1] === 'y') {
                    transCurveArr.splice(1, 1, curve);
                }
                else if (segmentProp[1] === 'z') {
                    transCurveArr.splice(2, 1, curve);
                }
            }
            else if (type.equal(QE.Reflection.Type.typeOf(Number))) {
                var numberCurveArr = this._numberCurveDict[relativePath];
                if (!numberCurveArr) {
                    this._numberCurveDict[relativePath] = numberCurveArr = [];
                }
                numberCurveArr.push(curve);
            }
            else {
                var objCurveArr = this._objCurveDict[relativePath];
                if (objCurveArr) {
                    this._objCurveDict[relativePath] = objCurveArr = [];
                }
                objCurveArr.push(curve);
            }
        };
        AnimationClip.prototype.removeCurve = function (relativePath, type, propertyName) {
            var curveArr = this._objCurveDict[relativePath];
            if (!curveArr) {
                console.warn('[AnimationClip.removeCurve] 删除的curve不存在. path: ' + relativePath + '  propertyName: ' + propertyName);
                return;
            }
            for (var i = 0, len = curveArr.length; i < len; i++) {
                var curve = curveArr[i];
                if (curve._propName === propertyName) {
                    curveArr.splice(i, 1);
                    return;
                }
            }
            console.warn('[AnimationClip.removeCurve] 删除的curve不存在. path: ' + relativePath + '  propertyName: ' + propertyName);
        };
        /**
         * 清除动画数据
         */
        AnimationClip.prototype.clearAllCurves = function () {
            this._positionCurveDict = {};
            this._scaleCurveDict = {};
            this._eulerCurveDict = {};
            this._numberCurveDict = {};
            this._objCurveDict = {};
        };
        AnimationClip.prototype.apply = function (node, timePos) {
            var timeIndex = this.getTimeIndex(timePos);
            // 变换缩放
            this._applyScale(node, timeIndex, 1);
            // 变换旋转
            this._applyRotation(node, timeIndex, 1);
            // 变换位移
            this._applyPosition(node, timeIndex, 1);
            // 对象属性变换
            this._applyObj(node, timeIndex, 1);
            if (!node.transform) {
                return;
            }
            var meshFilter = node.transform.getComponent(QE.MeshFilter);
            if (!meshFilter) {
                return;
            }
            var mesh = meshFilter.mesh;
            if (!mesh) {
                return;
            }
            // 网格形变动画
        };
        AnimationClip.prototype._applyScale = function (node, timeIndex, weight) {
            var curveDict = this._scaleCurveDict;
            var timePos = timeIndex.timePos;
            var keyIndex = timeIndex.keyIndex;
            // apply position
            for (var path in curveDict) {
                var target = void 0;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                }
                else {
                    target = node.transform.find(path);
                }
                if (!target) {
                    console.warn('[AnimationClip._applyScale] 动画对象节点不存在： ' + path);
                    continue;
                }
                var objCurves = curveDict[path];
                var curveX = objCurves[0];
                var curveY = objCurves[1];
                var curveZ = objCurves[2];
                var interpolationX = curveX.getInterpolation(timePos, keyIndex);
                var interpolationY = curveY.getInterpolation(timePos, keyIndex);
                var interpolationZ = curveZ.getInterpolation(timePos, keyIndex);
                // TODO: 计算权重
                // 设置本地坐标
                target.localScale = target.localScale.set(interpolationX, interpolationY, interpolationZ);
            }
        };
        AnimationClip.prototype._applyRotation = function (node, timeIndex, weight) {
            var curveDict = this._eulerCurveDict;
            var timePos = timeIndex.timePos;
            var keyIndex; // timeIndex.keyIndex;
            // apply position
            for (var path in curveDict) {
                var target = void 0;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                }
                else {
                    target = node.transform.find(path);
                }
                if (!target) {
                    console.warn('[AnimationClip._applyRotation] 动画对象节点不存在： ' + path);
                    continue;
                }
                var objCurves = curveDict[path];
                var curveX = objCurves[0];
                var curveY = objCurves[1];
                var curveZ = objCurves[2];
                var interpolationX = curveX.getInterpolation(timePos);
                var interpolationY = curveY.getInterpolation(timePos);
                var interpolationZ = curveZ.getInterpolation(timePos);
                // TODO: 计算权重
                // 设置本地坐标
                target.localRotation = target.localRotation.fromEulerAngleScalar(interpolationX, interpolationY, interpolationZ);
            }
        };
        AnimationClip.prototype._applyPosition = function (node, timeIndex, weight) {
            var curveDict = this._positionCurveDict;
            var timePos = timeIndex.timePos;
            var keyIndex = timeIndex.keyIndex;
            // apply position
            for (var path in curveDict) {
                var target = void 0;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                }
                else {
                    target = node.transform.find(path);
                }
                if (!target) {
                    console.warn('[AnimationClip._applyPosition] 动画对象节点不存在： ' + path);
                    continue;
                }
                var objCurves = curveDict[path];
                var curveX = objCurves[0];
                var curveY = objCurves[1];
                var curveZ = objCurves[2];
                var interpolationX = curveX.getInterpolation(timePos);
                var interpolationY = curveY.getInterpolation(timePos);
                var interpolationZ = curveZ.getInterpolation(timePos);
                // TODO: 计算权重
                // 设置本地坐标
                target.localPosition = target.localPosition.set(interpolationX, interpolationY, interpolationZ);
            }
        };
        AnimationClip.prototype._applyObj = function (node, timeIndex, weight) {
            var curveDict = this._objCurveDict;
            var timePos = timeIndex.timePos;
            var keyIndex = timeIndex.keyIndex;
            for (var path in curveDict) {
                var target = void 0;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                }
                else {
                    target = node.transform.find(path);
                }
                if (!target) {
                    console.warn('[AnimationClip._applyObj] 动画对象节点不存在： ' + path);
                    continue;
                }
                var objCurveArr = curveDict[path];
                for (var i = 0, len = objCurveArr.length; i < len; i++) {
                    var objCurve = objCurveArr[i];
                    if (!objCurve._objInstance || !objCurve._objInstance.hasOwnProperty(objCurve._propName)) {
                        console.error('脚本属性不存在. PropName: ' + objCurve._propName);
                        continue;
                    }
                    var interpolation = objCurve.getInterpolation(timePos, keyIndex);
                    objCurve._objInstance[objCurve._propName] = interpolation;
                }
            }
        };
        AnimationClip.prototype.getTimeIndex = function (timePos) {
            if (this._keyFrameTimesDirty) {
                this.buildKeyFrameTimeList();
            }
            var totalAnimationLength = this.length;
            if (timePos > totalAnimationLength && totalAnimationLength > 0.0) {
                timePos = timePos % totalAnimationLength;
            }
            var keyFrameTimes = this._keyFrameTimes;
            var index = 0;
            for (var i = 0, len = this._keyFrameTimes.length; i < len - 1; i++) {
                var prev = keyFrameTimes[i];
                var next = keyFrameTimes[i + 1];
                if (timePos < prev) {
                    index = i;
                    break;
                }
                else if (timePos >= prev && timePos < next) {
                    index = i + 1;
                    break;
                }
                index = i + 1;
            }
            return { timePos: timePos, keyIndex: index };
        };
        AnimationClip.prototype.buildKeyFrameTimeList = function () {
            var thisKeyFrameTimes = this._keyFrameTimes;
            var thisCurveDict = this._positionCurveDict;
            // let keys = Object.keys(thisCurveDict);
            for (var key in thisCurveDict) {
                var val = thisCurveDict[key];
                for (var i = 0, len = val.length; i < len; i++) {
                    var curve = val[i];
                    curve._collectKeyFrameTimes(thisKeyFrameTimes);
                }
            }
            this._keyFrameTimesDirty = false;
        };
        return AnimationClip;
    }(QE.HashObject));
    QE.AnimationClip = AnimationClip;
    function splitProperty(prop) {
        return prop.split('.');
    }
})(QE || (QE = {}));
var QE;
(function (QE) {
    var AnimationCurve = /** @class */ (function () {
        function AnimationCurve(objCurve) {
            if (objCurve === void 0) { objCurve = false; }
            this._isObjCurve = false;
            this._keyFrames = [];
            this._isObjCurve = objCurve;
        }
        AnimationCurve.prototype.isObjectKeyFrame = function () {
            return false;
        };
        AnimationCurve.prototype.getKeyFrameCount = function () {
            return this._keyFrames.length;
        };
        AnimationCurve.prototype.addKeyFrame = function (keyFrame, index) {
            // 检查KeyFrame类型是否一致
            if (QE.__QE_EDITOR_MODE__) {
                if (this._keyFrames.length > 0) {
                }
            }
            if (index === undefined || this._keyFrames.length <= index) {
                this._keyFrames.push(keyFrame);
                return;
            }
            this._keyFrames.splice(index, 0, keyFrame);
        };
        AnimationCurve.prototype.addKeyFrameByValue = function (time, value, inTangent, outTangent, index) {
            // 检查KeyFrame类型是否一致
            if (QE.__QE_EDITOR_MODE__) {
                if (this._keyFrames.length > 0) {
                }
            }
            var keyFrame = new QE.KeyFrame(time, value, inTangent, outTangent);
            if (index === undefined || this._keyFrames.length <= index) {
                this._keyFrames.push(keyFrame);
                return;
            }
            this._keyFrames.splice(index, 0, keyFrame);
        };
        AnimationCurve.prototype.moveKeyFrame = function (index, keyFrame) {
            var thisKeyFrame = this._keyFrames;
            if (index < 0 || thisKeyFrame.length > index) {
                return;
            }
            thisKeyFrame.splice(index, 1);
            thisKeyFrame.splice(index, 0, keyFrame);
        };
        AnimationCurve.prototype.removeKeyFrame = function (index) {
            var thisKeyFrame = this._keyFrames;
            if (index < 0 || thisKeyFrame.length > index) {
                return;
            }
            this._keyFrames.splice(index, 1);
        };
        /**
         * 根据时间索引, 取得当前一对关键帧
         * @param {number} timePos 动画时间位置，这个时间应当和动画片段的总时间做过取余计算
         * @param {number} keyIndex 帧索引
         * @return {KeyFramePair}
         */
        AnimationCurve.prototype.getKeyFramePairAtTime = function (timePos, keyIndex) {
            var keyframe1, keyframe2;
            var keys = this._keyFrames;
            // 直接设置帧索引
            if (keyIndex !== undefined) {
                if (keyIndex + 1 === keys.length) {
                    keyframe1 = keys[keyIndex];
                    keyframe2 = keys[keyIndex];
                }
                else {
                    keyframe1 = keys[keyIndex];
                    keyframe2 = keys[keyIndex + 1];
                }
            }
            else {
                // 计算帧索引
                var i = 1;
                var len = keys.length;
                for (; i < len; i++) {
                    var frame = keys[i - 1];
                    var nextFrame = keys[i];
                    if (timePos < frame.time) {
                        // 小于等于前一帧时间点，则命中
                        // timePos---------firstKey_time---------k2_time
                        i--;
                        break;
                    }
                    else if (timePos >= frame.time && timePos <= nextFrame.time) {
                        // 小于下一帧时间点，则命中
                        // k1_time---------timePos---------k2_time
                        break;
                    }
                    // 最后一帧还没有找到对应的时间点，意味着timepos超出了最后一帧，直接使用最后一帧作为关键帧
                    if (i === len - 1) {
                        // k1_time---------laseKey_time---------timePos
                        i++;
                        break;
                    }
                }
                if (i === 0) {
                    keyframe1 = keys[i];
                    keyframe2 = keys[i];
                }
                else if (i === len) {
                    keyframe1 = keys[i - 1];
                    keyframe2 = keys[i - 1];
                }
                else {
                    keyframe1 = keys[i - 1];
                    keyframe2 = keys[i];
                }
            }
            // timePos在两帧之间的比例
            //       |------------total-------------|
            //       |-elapsed-|
            // k1_time----------timePos-------------k2_time
            var total = keyframe2.time - keyframe1.time;
            var elapsed = timePos - keyframe1.time;
            var t = (total === 0 || elapsed === 0) ? 0 : elapsed / total;
            var pair = {
                keyframe1: keyframe1,
                keyframe2: keyframe2,
                t: t
            };
            return pair;
        };
        /**
         * 根据时间索引, 计算关键帧插值
         * @param {number} timePos 时间点
         * @param {number} keyIndex 索引
         */
        AnimationCurve.prototype.getInterpolation = function (timePos, keyIndex) {
            if (this._keyFrames.length === 0) {
                return 0;
            }
            var ret = 0;
            // #1 根据时间点, 取得前后一组关键帧
            var keyFramePair = this.getKeyFramePairAtTime(timePos, keyIndex);
            var k1 = keyFramePair.keyframe1;
            var k2 = keyFramePair.keyframe2;
            // 插值系数为0，直接返回k1帧的值
            if (keyFramePair.t === 0) {
                return k1.value;
            }
            // #2 求两关键帧在当前时间的插值
            var interpolationMode = k1.interpolationMode;
            switch (interpolationMode) {
                case 0 /* Liner */:
                    {
                        QE.MathUtil.clampf;
                        ret = QE.MathUtil.lerp(k1.value, k2.value, keyFramePair.t);
                    }
                    break;
                case 1 /* Spline */:
                    {
                        // TODO: 补全样条插值
                        ret = QE.MathUtil.lerp(k1.value, k2.value, keyFramePair.t);
                    }
                    break;
                case 2 /* Constant */:
                    {
                        // 常数的话,直接使用k1的属性
                        ret = k1.value;
                    }
                    break;
                default:
                    {
                        // 是否支持自定义插值函数
                        console.error('[AnimationCurve.getInterpolation] 不支持的插值类型: ' + interpolationMode);
                    }
                    break;
            }
            return ret;
        };
        /**
         * 收集所有关键帧时间
         * @param outKeyFrameTimes 关键帧时间数组
         */
        AnimationCurve.prototype._collectKeyFrameTimes = function (outKeyFrameTimes) {
            var thisKeyFrames = this._keyFrames;
            // 遍历所有关键帧, 如果outKeyFrameTimes没有包含关键帧时间, 插入关键帧时间
            for (var i = 0, len = thisKeyFrames.length; i < len; i++) {
                var keyFrame = thisKeyFrames[i];
                var timePos = keyFrame.time;
                var index = 0;
                var keyTimePos = 0;
                for (var j = 0, len_1 = outKeyFrameTimes.length; j < len_1 - 1; j++) {
                    var prev = outKeyFrameTimes[j];
                    var next = outKeyFrameTimes[j + 1];
                    if (timePos < prev) {
                        index = i;
                        break;
                    }
                    else if (timePos >= prev && timePos < next) {
                        index = i + 1;
                        break;
                    }
                    index = i + 1;
                }
                if (index === len || timePos != keyTimePos) {
                    outKeyFrameTimes.splice(index, 0, timePos);
                }
            }
        };
        AnimationCurve.prototype._buildKeyFrameIndexMap = function (outKeyFrameTimes) {
            // Pre-allocate memory
            // mKeyFrameIndexMap.resize(keyFrameTimes.size() + 1);
            // size_t i = 0, j = 0;
            // while (j <= keyFrameTimes.size()) {
            //    mKeyFrameIndexMap[j] = static_cast<ushort>(i);
            //    while (i < mKeyFrames.size() && mKeyFrames[i] ->getTime() <= keyFrameTimes[j])
            //        ++i;
            //    ++j;
            // }
        };
        return AnimationCurve;
    }());
    QE.AnimationCurve = AnimationCurve;
    // export class QuaternionCurve extends AnimationCurve {
    //    public getInterpolation(timePos: number, keyIndex?: number): any {
    //        let ret = new Quaternion();
    //        // #1 根据时间点, 求得关键帧
    //        let keyFramePair = this.getKeyFramePairAtTime(timePos, keyIndex);
    //        let k1: QuaternionKeyFrame = keyFramePair.keyframe1 as QuaternionKeyFrame;
    //        let k2: QuaternionKeyFrame = keyFramePair.keyframe2 as QuaternionKeyFrame;
    //        // #2 求两关键帧在当前时间的插值
    //        let interpolationMode = k1.interpolationMode;
    //        switch (interpolationMode) {
    //            case InterpolationMode.Liner: {
    //                ret = ret.lerp(k1.value, k2.value, keyFramePair.t);
    //            } break;
    //            case InterpolationMode.Spline: {
    //                // TODO: 补全样条插值
    //                ret = ret.lerp(k1.value, k2.value, keyFramePair.t);
    //            } break;
    //            case InterpolationMode.Constant: {
    //                // 常数的话,直接使用k1的属性
    //                ret = ret.copy(k1.value);
    //            } break;
    //            default: {
    //                console.error("[QuaternionCurve.getInterpolation] 不支持的插值类型: " + interpolationMode);
    //            } break;
    //        }
    //        return ret;
    //    }
    //    public apply(go: Node, index: number, timePos: number, weight: number) {
    //        let ret = this.getInterpolation(timePos) as Quaternion;
    //        go.transform.rotation = ret.lerp(Quaternion.IDENTITY, ret, weight);
    //    }
    // }
    // export class VectorCurve extends AnimationCurve {
    //    public getInterpolation(timePos: number, keyIndex?: number): any {
    //        let ret;
    //        // #1 根据时间点, 求得关键帧
    //        let k1: KeyFrame, k2: KeyFrame;
    //        // #2 求两关键帧在当前时间的插值
    //        return ret;
    //    }
    //    public apply(go: Node, index: number, timePos: number, weight: number) {
    //        let ret = this.getInterpolation(timePos) as Vector3;
    //        switch (this._propName) {
    //            case 'position': {
    //                go.transform.position = ret;
    //            } break;
    //            case 'scale': {
    //                go.transform.position = ret;
    //            } break;
    //            default: go[this._propName] = ret; break;
    //        }
    //    }
    // }
    // export class NumericCurve extends AnimationCurve {
    //    public getInterpolation(timePos: number, keyIndex?: number): any {
    //        let ret;
    //        // #1 根据时间点, 求得关键帧
    //        let k1: KeyFrame, k2: KeyFrame;
    //        // #2 求两关键帧在当前时间的插值
    //        return ret;
    //    }
    //    public apply(go: Node, index: number, timePos: number, weight: number) {
    //        let t = this.getInterpolation(timePos);
    //        switch (this._propName) {
    //            case 'x': {
    //                go.transform.x = 0;
    //            } break;
    //            default: ; break;
    //        }
    //        if (this.isObjectKeyFrame()) {
    //        } else {
    //        }
    //    }
    // }
    // export class ObjectCurve extends AnimationCurve {
    //    public getInterpolation(timePos: number, keyIndex?: number): any {
    //        let ret;
    //        // #1 根据时间点, 求得关键帧
    //        let k1: KeyFrame, k2: KeyFrame;
    //        // #2 求两关键帧在当前时间的插值
    //        return ret;
    //    }
    //    public apply(go: Node, index: number, timePos: number, weight: number) {
    //        let t = this.getInterpolation(timePos, index);
    //        switch (this._propName) {
    //            case 'x': {
    //                go.transform.x = 0;
    //            } break;
    //            default: ; break;
    //        }
    //        if (this.isObjectKeyFrame()) {
    //        } else {
    //        }
    //    }
    // }
})(QE || (QE = {}));
var QE;
(function (QE) {
    var AnimationLoader = /** @class */ (function () {
        function AnimationLoader() {
        }
        AnimationLoader.load = function (fileJson) {
        };
        return AnimationLoader;
    }());
})(QE || (QE = {}));
var QE;
(function (QE) {
    var AnimationBlendMode;
    (function (AnimationBlendMode) {
        AnimationBlendMode[AnimationBlendMode["Add"] = 0] = "Add";
    })(AnimationBlendMode = QE.AnimationBlendMode || (QE.AnimationBlendMode = {}));
    /**
     * 动画控制器
     * 动画控制器控制管理一组动画片段
     */
    var AnimationState = /** @class */ (function () {
        function AnimationState() {
            this._blendMode = AnimationBlendMode.Add;
        }
        Object.defineProperty(AnimationState.prototype, "blendMode", {
            get: function () {
                return this._blendMode;
            },
            set: function (val) {
                this._blendMode = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationState.prototype, "clip", {
            get: function () {
                return this._clip;
            },
            enumerable: true,
            configurable: true
        });
        AnimationState.prototype.AddMixingTransform = function (mix, recursive) {
            if (recursive === void 0) { recursive = true; }
        };
        AnimationState.prototype.RemoveMixingTransform = function (mix) {
        };
        return AnimationState;
    }());
    QE.AnimationState = AnimationState;
})(QE || (QE = {}));
///<reference path="../../Component.ts" />
///<reference path="AnimationLoader.ts"/>
var QE;
///<reference path="../../Component.ts" />
///<reference path="AnimationLoader.ts"/>
(function (QE) {
    /**
     * 动画播放器
     * 动画控制器控制动画的状态切换
     */
    var Animator = /** @class */ (function (_super) {
        __extends(Animator, _super);
        function Animator() {
            var _this = _super.call(this) || this;
            _this._timePos = 0;
            /**
             * 更新动画
             *@param {number} deltaTime 间隔时间
             */
            _this.onUpdate = function (deltaTime) {
                if (!_this._playingClip) {
                    return;
                }
                _this._timePos += deltaTime;
                _this._playingClip.apply(_this.node, _this._timePos);
                if (_this._timePos >= _this._playingClip.length) {
                    _this.stop();
                }
            };
            return _this;
        }
        Object.defineProperty(Animator.prototype, "animController", {
            get: function () {
                return this._animController;
            },
            set: function (animController) {
                this._animController = animController;
            },
            enumerable: true,
            configurable: true
        });
        Animator.prototype.play = function (animName) {
            if (this._playingClip && this._playingClip.name === animName) {
                return;
            }
            if (!this._animController) {
                return;
            }
            var clips = this._animController.animationClips;
            for (var i = 0, len = clips.length; i < len; i++) {
                var clip = clips[i];
                if (clip.name === animName) {
                    this._playingClip = clip;
                    break;
                }
            }
            this._timePos = 0;
        };
        Animator.prototype.stop = function () {
            this._playingClip = undefined;
            this._timePos = 0;
        };
        return Animator;
    }(QE.Component));
    QE.Animator = Animator;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     * 动画控制器
     * 动画控制器控制管理一组动画片段
     */
    var AnimatorController = /** @class */ (function (_super) {
        __extends(AnimatorController, _super);
        function AnimatorController() {
            var _this = _super.call(this) || this;
            _this._animationClips = [];
            return _this;
        }
        Object.defineProperty(AnimatorController.prototype, "animationClips", {
            get: function () {
                return this._animationClips;
            },
            set: function (clips) {
                this._animationClips = clips;
            },
            enumerable: true,
            configurable: true
        });
        AnimatorController.prototype.addClip = function (clip) {
            this._animationClips.push(clip);
        };
        AnimatorController.prototype.removeClip = function (clip) {
            var clips = this._animationClips;
            var idx = clips.indexOf(clip);
            if (idx != -1) {
                clips.splice(idx, 1);
            }
        };
        return AnimatorController;
    }(QE.HashObject));
    QE.AnimatorController = AnimatorController;
})(QE || (QE = {}));
///<reference path="../../GameObject.ts" />
var QE;
///<reference path="../../GameObject.ts" />
(function (QE) {
    /**
     * 骨骼
     */
    var Bone = /** @class */ (function () {
        function Bone(skeleton, name) {
            this._skeleton = skeleton;
            this._name = name;
        }
        Object.defineProperty(Bone.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (val) {
                this._name = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bone.prototype, "handle", {
            get: function () {
                return this._handle;
            },
            set: function (val) {
                this._handle = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bone.prototype, "node", {
            get: function () {
                return this._node;
            },
            set: function (val) {
                this._node = val;
            },
            enumerable: true,
            configurable: true
        });
        Bone.prototype._update = function (updateChilren, parentHasChanged) {
            this._node.transform.update(updateChilren, parentHasChanged);
        };
        return Bone;
    }());
    QE.Bone = Bone;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     *
     */
    var KeyFrame = /** @class */ (function () {
        function KeyFrame(time, value, inTangent, outTangent) {
            if (inTangent === void 0) { inTangent = 0; }
            if (outTangent === void 0) { outTangent = 0; }
            this._interpolationMode = 0 /* Liner */;
            this._time = time;
            this._value = value;
            this._inTangent = inTangent;
            this._outTangent = outTangent;
        }
        Object.defineProperty(KeyFrame.prototype, "time", {
            /**
             * 返回关键帧所在时间，以毫秒为单位
             *@return {number}
             */
            get: function () {
                return this._time;
            },
            /**
             * 设置关键帧所在时间，以毫秒为单位
             *@param {number} val 时间
             */
            set: function (val) {
                this._time = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyFrame.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                this._value = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyFrame.prototype, "inTangent", {
            get: function () {
                return this._inTangent;
            },
            set: function (val) {
                this._inTangent = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyFrame.prototype, "outTangent", {
            get: function () {
                return this._outTangent;
            },
            set: function (val) {
                this._outTangent = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyFrame.prototype, "interpolationMode", {
            get: function () {
                return this._interpolationMode;
            },
            set: function (val) {
                this._interpolationMode = val;
            },
            enumerable: true,
            configurable: true
        });
        return KeyFrame;
    }());
    QE.KeyFrame = KeyFrame;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Skeleton = /** @class */ (function () {
        function Skeleton(name) {
            this._boneMapByName = {};
            this._boneMapByPath = {};
            this._name = name;
        }
        Skeleton.prototype.createBone = function (name, relativePath) {
            console.assert(!!this._boneMapByPath[name], '[Skeleton.createBone] A bone with the releativePath ' + relativePath + ' already exists');
            var bone = new QE.Bone(this, name);
            this._boneMapByName[name] = bone;
            this._boneMapByPath[relativePath] = bone;
            return bone;
        };
        Skeleton.prototype.getRootBone = function () {
            var rootBones = this._rootBones;
            if (!rootBones) {
                rootBones = this._rootBones = [];
            }
            if (rootBones.length === 0) {
                for (var i = 0; i < rootBones.length; i++) {
                    var bone = rootBones[i];
                    // 没有父节点的骨骼皆为根骨骼
                    if (!bone.node.transform.parent) {
                        rootBones.push(bone);
                    }
                }
            }
            return rootBones[0];
        };
        Skeleton.prototype.getBone = function (name) {
            return this._boneMapByName[name];
        };
        Skeleton.prototype.getBoneByPath = function (relativePath) {
            return this._boneMapByPath[relativePath];
        };
        Skeleton.prototype.hasBone = function (name) {
            return !!this._boneMapByName[name];
        };
        Skeleton.prototype.updateTransforms = function () {
            var rootBones = this._rootBones;
            for (var i = 0, len = rootBones.length; i < len; i++) {
                var rootBone = rootBones[i];
                rootBone._update(true, false);
            }
        };
        return Skeleton;
    }());
    QE.Skeleton = Skeleton;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var RenderOperation = /** @class */ (function () {
        function RenderOperation() {
            this.renderOpType = 3 /* TRIANGLE_LIST */;
            this.numberOfInstances = 0;
        }
        return RenderOperation;
    }());
    QE.RenderOperation = RenderOperation;
    var Renderable = /** @class */ (function (_super) {
        __extends(Renderable, _super);
        function Renderable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Renderable.prototype.setLighting = function (lighting) {
            this._isLighting = lighting;
        };
        Renderable.prototype.isLighting = function () {
            return this._isLighting;
        };
        Renderable.prototype.setCastShadow = function (castShadow) {
            this._castShadow = castShadow;
        };
        Renderable.prototype.isCastShadow = function () {
            return this._castShadow;
        };
        Renderable.prototype.setMaterial = function (mat) {
            if (mat === this._material) {
                return;
            }
            this._material = mat;
        };
        Renderable.prototype.getMaterial = function () {
            return this._material;
        };
        Renderable.prototype.getMaterials = function () {
            return this._materials;
        };
        Renderable.prototype.getRenderOperation = function () {
            return this._renderOp;
        };
        Renderable.prototype.getRenderOperations = function () {
            return this._renderOps;
        };
        Renderable.prototype.removeMaterial = function (material) {
            var index = this._materials.indexOf(material);
            if (index > 0) {
                this._materials.splice(index, 1);
            }
        };
        Renderable.prototype.removeMaterialByIndex = function (index) {
            this._materials.splice(index, 1);
        };
        Renderable = __decorate([
            QE.DisallowMultipleComponent
        ], Renderable);
        return Renderable;
    }(QE.Component));
    QE.Renderable = Renderable;
})(QE || (QE = {}));
///<reference path="../render_system/Renderable.ts" />
var QE;
///<reference path="../render_system/Renderable.ts" />
(function (QE) {
    var DebugRender = /** @class */ (function (_super) {
        __extends(DebugRender, _super);
        function DebugRender() {
            var _this = _super.call(this) || this;
            _this._renderOp = new QE.RenderOperation();
            return _this;
        }
        DebugRender.prototype.isMultiMaterial = function () {
            return false;
        };
        DebugRender.prototype.setMaterial = function (material) {
            if (this._material === material) {
                return;
            }
            this._material = material;
        };
        DebugRender.prototype.getMaterial = function () {
            return this._material;
        };
        DebugRender.prototype.getRenderOperation = function () {
            return this._renderOp;
        };
        DebugRender.prototype.getWorldTransforms = function () {
            return this.transform.localToWorldMatrix;
        };
        return DebugRender;
    }(QE.Renderable));
    QE.DebugRender = DebugRender;
})(QE || (QE = {}));
/**
 *  -
 *
 * create by wjl at
 *
 */ 
///<reference path="../render_system/Renderable.ts" />
var QE;
///<reference path="../render_system/Renderable.ts" />
(function (QE) {
    var MeshRender = /** @class */ (function (_super) {
        __extends(MeshRender, _super);
        function MeshRender() {
            var _this = _super.call(this) || this;
            _this._materials = [];
            _this._renderOp = new QE.RenderOperation();
            return _this;
        }
        MeshRender.prototype.isMultiMaterial = function () {
            return true;
        };
        MeshRender.prototype.setMaterial = function (material) {
            if (!this._material) {
                this._material = material;
            }
            this._materials.push(material);
        };
        MeshRender.prototype.removeMaterial = function (material) {
            var index = this._materials.indexOf(material);
            if (index > 0) {
                this._materials.splice(index, 1);
            }
        };
        MeshRender.prototype.removeMaterialByIndex = function (index) {
            this._materials.splice(index, 1);
        };
        MeshRender.prototype.getRenderOperation = function () {
            if (!this.mesh) {
                return null;
            }
            var renderOp = this._renderOp;
            var subMeshes = this.mesh.subMeshes;
            for (var i = 0, len = subMeshes.length; i < len; i++) {
                var subMesh = subMeshes[i];
                subMesh.getRenderOperation(renderOp);
            }
            return renderOp;
        };
        MeshRender.prototype.getWorldTransforms = function () {
            return this.transform.localToWorldMatrix;
        };
        return MeshRender;
    }(QE.Renderable));
    QE.MeshRender = MeshRender;
})(QE || (QE = {}));
///<reference path="MeshRender.ts" />
var QE;
///<reference path="MeshRender.ts" />
(function (QE) {
    var SkinedMeshRender = /** @class */ (function (_super) {
        __extends(SkinedMeshRender, _super);
        function SkinedMeshRender() {
            var _this = _super.call(this) || this;
            _this._materials = [];
            _this._renderOp = new QE.RenderOperation();
            return _this;
        }
        // public void BakeMesh(Mesh mesh);
        SkinedMeshRender.prototype.GetBlendShapeWeight = function (index) {
            return 0;
        };
        SkinedMeshRender.prototype.SetBlendShapeWeight = function (index, value) {
        };
        SkinedMeshRender.prototype.isMultiMaterial = function () {
            return true;
        };
        SkinedMeshRender.prototype.getRenderOperation = function () {
            if (!this.mesh) {
                return null;
            }
            var renderOp = this._renderOp;
            var subMeshes = this.mesh.subMeshes;
            for (var i = 0, len = subMeshes.length; i < len; i++) {
                var subMesh = subMeshes[i];
                subMesh.getRenderOperation(renderOp);
            }
            return renderOp;
        };
        SkinedMeshRender.prototype.getWorldTransforms = function () {
            return this.transform.localToWorldMatrix;
        };
        return SkinedMeshRender;
    }(QE.Renderable));
    QE.SkinedMeshRender = SkinedMeshRender;
})(QE || (QE = {}));
/**
 *  -
 *
 * create by wjl at
 *
 */
var QE;
/**
 *  -
 *
 * create by wjl at
 *
 */
(function (QE) {
    /**
     * 序列化属性
     * @param {string|Function} fieldType
     */
    function SerializeField(fieldType) {
        return function (target, name, descriptor) {
            // console.log(`SerializeField field ${name}`);
            if (QE.__QE_EDITOR_MODE__) {
                var serializedFieldMap = target.constructor.__QE_SerializedFieldMap;
                if (!serializedFieldMap) {
                    serializedFieldMap = {};
                    target.constructor.__QE_SerializedFieldMap = serializedFieldMap;
                }
                serializedFieldMap[name] = fieldType;
            }
            return descriptor;
        };
    }
    QE.SerializeField = SerializeField;
    var Serializer = /** @class */ (function () {
        function Serializer() {
        }
        return Serializer;
    }());
    QE.Serializer = Serializer;
})(QE || (QE = {}));
///<reference path="../res/prefab/serialize/Serializer.ts"/>
var QE;
///<reference path="../res/prefab/serialize/Serializer.ts"/>
(function (QE) {
    var SpriteRender = /** @class */ (function (_super) {
        __extends(SpriteRender, _super);
        function SpriteRender() {
            var _this = _super.call(this) || this;
            _this._flipX = false;
            _this._flipY = false;
            _this._skewX = 0;
            _this._skewY = 0;
            _this._pivot = new QE.Vector2(0, 0);
            var material = QE.SpriteMaterial.getDefaultSpriteMaterial();
            _this._material = material;
            var renderOp = new QE.RenderOperation();
            renderOp.primCount = 6;
            renderOp.renderOpType = 3 /* TRIANGLE_LIST */;
            var posBuf = QE.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 2 /* DYNAMIC */);
            posBuf.type = QE.gl.FLOAT;
            posBuf.semantic = 1 /* POSITION */;
            posBuf.vertexCount = 12;
            posBuf.writeData((new Float32Array([
                0.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 1.0, 0.0,
                0.0, 1.0, 0.0
            ]).buffer));
            var colBuf = QE.WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, 2 /* DYNAMIC */);
            colBuf.type = QE.gl.UNSIGNED_BYTE;
            colBuf.semantic = 5 /* DIFFUSE */;
            colBuf.vertexCount = 16;
            colBuf.writeData((new Uint8Array([
                255, 255, 255, 255,
                255, 255, 255, 255,
                255, 255, 255, 255,
                255, 255, 255, 255
            ])).buffer);
            var texBuf = new QE.WebGLVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, 2 /* DYNAMIC */);
            texBuf.type = QE.gl.FLOAT;
            texBuf.semantic = 7 /* TEXTURE_COORDINATES */;
            texBuf.vertexCount = 8;
            texBuf.writeData((new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])).buffer);
            renderOp.vertexBuffers = [];
            renderOp.vertexBuffers[0] = posBuf;
            renderOp.vertexBuffers[1] = colBuf;
            renderOp.vertexBuffers[2] = texBuf;
            var indexBuffer = QE.WebGLBufferManager.instance.createIndexBuffer(6, 2 /* DYNAMIC */, true);
            indexBuffer.writeData([0, 2, 3, 0, 1, 2]);
            indexBuffer.bindBuffer();
            renderOp.indexBuffer = indexBuffer;
            _this._renderOp = renderOp;
            return _this;
        }
        Object.defineProperty(SpriteRender.prototype, "flipX", {
            get: function () {
                return this._flipX;
            },
            set: function (val) {
                this._flipX = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteRender.prototype, "flipY", {
            get: function () {
                return this._flipY;
            },
            set: function (val) {
                this._flipY = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteRender.prototype, "skewX", {
            get: function () {
                return this._skewX;
            },
            set: function (val) {
                this.skewX = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteRender.prototype, "skewY", {
            get: function () {
                return this._skewY;
            },
            set: function (val) {
                this._skewY = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteRender.prototype, "pivot", {
            get: function () {
                return this._pivot;
            },
            set: function (val) {
                this._pivot = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriteRender.prototype, "pixelsPerUnit", {
            get: function () {
                return this._pixelsPerUnit;
            },
            set: function (val) {
                this._pixelsPerUnit = val;
            },
            enumerable: true,
            configurable: true
        });
        SpriteRender.prototype.isMultiMaterial = function () {
            return false;
        };
        SpriteRender.prototype.getRenderOperation = function () {
            if (!this._material) {
                return null;
            }
            return this._renderOp;
        };
        SpriteRender.prototype.getWorldTransforms = function () {
            return this.transform.localToWorldMatrix;
        };
        __decorate([
            QE.SerializeField('number')
        ], SpriteRender.prototype, "flipX", null);
        __decorate([
            QE.SerializeField('number')
        ], SpriteRender.prototype, "flipY", null);
        __decorate([
            QE.SerializeField('number')
        ], SpriteRender.prototype, "skewX", null);
        __decorate([
            QE.SerializeField('number')
        ], SpriteRender.prototype, "skewY", null);
        __decorate([
            QE.SerializeField('number')
        ], SpriteRender.prototype, "pivot", null);
        __decorate([
            QE.SerializeField('number')
        ], SpriteRender.prototype, "pixelsPerUnit", null);
        return SpriteRender;
    }(QE.Renderable));
    QE.SpriteRender = SpriteRender;
})(QE || (QE = {}));
var QE;
(function (QE) {
    // 渲染状态
    var RenderState = /** @class */ (function () {
        function RenderState() {
            this.cullMode = 2 /* BACK */;
            this.blendMode = 0 /* Normal */;
            this.depthCheck = 2 /* CHECK_WRITE */;
            this.colorMask = 15 /* ALL */;
        }
        return RenderState;
    }());
    QE.RenderState = RenderState;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var GL;
    (function (GL) {
        var _matrixStack = [];
        var _renderOperationType = 1 /* LINE_LIST */;
        var _arrayBuffer = new ArrayBuffer(100000);
        var _vertexBuffer = new Int32Array(_arrayBuffer);
        var VBO;
        var _init = false;
        function init() {
            VBO = QE.gl.createBuffer();
            QE.gl.bindBuffer(QE.gl.ARRAY_BUFFER, VBO);
            QE.gl.bufferData(QE.gl.ARRAY_BUFFER, _arrayBuffer, QE.gl.STATIC_DRAW);
            QE.gl.viewport(0, 0, 500, 500);
            // Vertex shader program
            var vsSource = "\n    attribute vec4 aVertexPosition;\n\n    uniform mat4 uModelViewMatrix;\n    uniform mat4 uProjectionMatrix;\n\n    void main() {\n      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n    }\n  ";
            var fsSource = "\n    void main() {\n      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n    }\n  ";
            //
            //  初始化着色器程序，让WebGL知道如何绘制我们的数据
            function initShaderProgram(gl, vsSource, fsSource) {
                var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
                var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
                // 创建着色器程序
                var shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, vertexShader);
                gl.attachShader(shaderProgram, fragmentShader);
                gl.linkProgram(shaderProgram);
                // 创建失败， alert
                if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
                    return null;
                }
                return shaderProgram;
            }
            //
            // 创建指定类型的着色器，上传source源码并编译
            //
            function loadShader(gl, type, source) {
                var shader = gl.createShader(type);
                // Send the source to the shader object
                gl.shaderSource(shader, source);
                // Compile the shader program
                gl.compileShader(shader);
                // See if it compiled successfully
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
                    gl.deleteShader(shader);
                    return null;
                }
                return shader;
            }
            var shaderProgram = initShaderProgram(QE.gl, vsSource, fsSource);
            var programInfo = {
                program: shaderProgram,
                attribLocations: {
                    vertexPosition: QE.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
                },
                uniformLocations: {
                    projectionMatrix: QE.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                    modelViewMatrix: QE.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
                },
            };
            var horizAspect = 480.0 / 640.0;
            var squareVerticesBuffer;
            function initBuffers() {
                squareVerticesBuffer = QE.gl.createBuffer();
                QE.gl.bindBuffer(QE.gl.ARRAY_BUFFER, squareVerticesBuffer);
                var vertices = [
                    1.0, 1.0, 0.0,
                    -1.0, 1.0, 0.0,
                    1.0, -1.0, 0.0,
                    -1.0, -1.0, 0.0
                ];
                QE.gl.bufferData(QE.gl.ARRAY_BUFFER, new Float32Array(vertices), QE.gl.STATIC_DRAW);
            }
            function drawScene(programInfo, buffers) {
                QE.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
                QE.gl.clearDepth(1.0); // Clear everything
                QE.gl.enable(QE.gl.DEPTH_TEST); // Enable depth testing
                QE.gl.depthFunc(QE.gl.LEQUAL); // Near things obscure far things
                // Clear the canvas before we start drawing on it.
                QE.gl.clear(QE.gl.COLOR_BUFFER_BIT | QE.gl.DEPTH_BUFFER_BIT);
                // Create a perspective matrix, a special matrix that is
                // used to simulate the distortion of perspective in a camera.
                // Our field of view is 45 degrees, with a width/height
                // ratio that matches the display size of the canvas
                // and we only want to see objects between 0.1 units
                // and 100 units away from the camera.
                var fieldOfView = 45 * Math.PI / 180; // in radians
                var aspect = QE.gl.canvas.clientWidth / QE.gl.canvas.clientHeight;
                var zNear = 0.1;
                var zFar = 100.0;
                var projectionMatrix1 = QE.Matrix4.makePerspectiveFovRH(45, aspect, zNear, zFar);
                var modelViewMatrix1 = new QE.Matrix4();
                var transMatrix = QE.Matrix4.makeTransform(new QE.Vector3(0, 0, -6), QE.Quaternion.IDENTITY, new QE.Vector3(1, 1, 1));
                modelViewMatrix1.multiply(transMatrix, modelViewMatrix1);
                var projectionMatrix = mat4.create();
                // note: glmatrix.js always has the first argument
                // as the destination to receive the result.
                mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
                // Set the drawing position to the "identity" point, which is
                // the center of the scene.
                var modelViewMatrix = mat4.create();
                // Now move the drawing position a bit to where we want to
                // start drawing the square.
                mat4.translate(modelViewMatrix, // destination matrix
                modelViewMatrix, // matrix to translate
                [-0.0, 0.0, -6.0]); // amount to translate
                {
                    var numComponents = 2; // pull out 2 values per iteration
                    var type = QE.gl.FLOAT; // the data in the buffer is 32bit floats
                    var normalize = false; // don't normalize
                    var stride = 0; // how many bytes to get from one set of values to the next
                    // 0 = use type and numComponents above
                    var offset = 0; // how many bytes inside the buffer to start from
                    QE.gl.bindBuffer(QE.gl.ARRAY_BUFFER, buffers);
                    QE.gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
                    QE.gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
                }
                // Tell WebGL to use our program when drawing
                QE.gl.useProgram(programInfo.program);
                // Set the shader uniforms
                QE.gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix1.rawData);
                QE.gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix1.rawData);
                {
                    var offset = 0;
                    var vertexCount = 4;
                    QE.gl.drawArrays(QE.gl.TRIANGLE_STRIP, offset, vertexCount);
                }
            }
            initBuffers();
            function loop() {
                drawScene(programInfo, squareVerticesBuffer);
                window.requestAnimationFrame(loop);
            }
            window.requestAnimationFrame(loop);
        }
        GL.init = init;
        function pushMatrix() {
            _matrixStack.push(new QE.Matrix4());
        }
        GL.pushMatrix = pushMatrix;
        function popMatrix() {
            _matrixStack.pop();
        }
        GL.popMatrix = popMatrix;
        function multMatrix(matrix) {
            var topMatrix = _matrixStack[_matrixStack.length - 1];
            if (!topMatrix) {
                return;
            }
            topMatrix.multiply(matrix);
        }
        GL.multMatrix = multMatrix;
        function loadOrtho() {
        }
        GL.loadOrtho = loadOrtho;
        function loadPrespective() {
        }
        GL.loadPrespective = loadPrespective;
        function begin(rot) {
            _renderOperationType = rot;
            if (!_init) {
                init();
            }
        }
        GL.begin = begin;
        function end() {
        }
        GL.end = end;
        function setColor() {
        }
        GL.setColor = setColor;
        function vertex3(x, y, z) {
            GL.begin(0 /* POINT_LIST */);
            _vertexBuffer.set([-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 0.0, 1.0, 0.0], 0);
            QE.gl.useProgram(QE.Material.getDefaultCubeMaterial().shader.shaderPasses[0].getProgram().webglProgram);
            QE.gl.enableVertexAttribArray(0);
            QE.gl.bindBuffer(QE.gl.ARRAY_BUFFER, VBO);
            QE.gl.vertexAttribPointer(0, 3, QE.gl.FLOAT, false, 0, 0);
            QE.gl.drawArrays(QE.gl.TRIANGLES, 0, 3);
            QE.gl.disableVertexAttribArray(0);
            QE.gl.flush();
        }
        GL.vertex3 = vertex3;
    })(GL = QE.GL || (QE.GL = {}));
})(QE || (QE = {}));
var QE;
(function (QE) {
    var RenderContext = /** @class */ (function () {
        function RenderContext(camera, name) {
            this._clearMode = 7 /* ALL */; // 清除缓冲类型
            this._clearColor = [0, 0, 0, 255]; // 清屏颜色
            this._clearDepth = 1; // 清除深度
            this._clearStencil = 0; // 清除模板
            this._name = name;
            this._camera = camera;
            this._renderPipeline = new QE.RenderPipeline();
            console.assert(!!camera);
        }
        Object.defineProperty(RenderContext.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContext.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderContext.prototype, "renderPipeline", {
            get: function () {
                return this._renderPipeline;
            },
            set: function (renderPipeline) {
                this._renderPipeline = renderPipeline;
            },
            enumerable: true,
            configurable: true
        });
        RenderContext.prototype.setColorClear = function (clearMode, clearColor, depth, stencil) {
            if (depth === void 0) { depth = 1; }
            if (stencil === void 0) { stencil = 0; }
            this._clearMode = clearMode;
            this._clearColor = clearColor;
            this._clearDepth = depth;
            this._clearStencil = stencil;
        };
        // 渲染步骤
        /**
         1.设置帧缓冲
         2.清除缓冲区状态
         3.使用shader
         4.绑定顶点和属性
         5.裁剪测试
         6.设置混合模式
         7.提交数据
         */
        RenderContext.prototype.doRender = function () {
            // 没有摄像机就不需要渲染了
            var camera = this._camera;
            var viewport = camera.viewPort;
            if (viewport.w === 0 || viewport.h === 0) {
                return;
            }
            var renderSystem = QE.RenderSystem.instance;
            // 设置render target
            renderSystem.setRenderTarget(camera.renderTarget);
            // 清除缓冲区
            renderSystem.clear(this._clearMode, this._clearColor, this._clearDepth, this._clearStencil);
            // 设置视口
            renderSystem.setViewport(viewport);
            // 设置相机
            renderSystem.setCamera(camera);
            // 管道渲染
            if (this._renderPipeline) {
                this._renderPipeline.doRender(this);
            }
        };
        RenderContext.prototype.readPixels = function (x, y, w, h, format, type, pixels) {
            var renderSystem = QE.RenderSystem.instance;
            renderSystem.setRenderTarget(this._camera.renderTarget);
            renderSystem.readPixels(x, y, w, h, format, type, pixels);
        };
        return RenderContext;
    }());
    QE.RenderContext = RenderContext;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     * 队列渲染管道
     */
    var RenderPipeline = /** @class */ (function () {
        function RenderPipeline() {
            this.renderQueue = new QE.RenderQueue();
        }
        RenderPipeline.prototype.doRender = function (renderContext) {
            var camera = renderContext.camera;
            var renderQueue = this.renderQueue;
            var renderSystem = QE.RenderSystem.instance;
            // 清除渲染队列
            renderQueue.clear();
            // TODO: 封装裁剪
            function doCull() {
                var outArr = [];
                function cull(transfrom, outNodeArr) {
                    outNodeArr.push(transfrom.node);
                    for (var ii = 0, len_2 = transfrom.childCount; ii < len_2; ii++) {
                        cull(transfrom.getChildByIndex(ii), outNodeArr);
                    }
                }
                var children = QE.SceneManager.instance.currentScene.children;
                for (var i = 0, len_3 = children.length; i < len_3; i++) {
                    cull(children[i].transform, outArr);
                }
                return outArr;
            }
            // 裁剪
            var visibleList = doCull();
            var len = visibleList.length;
            // 节点加入渲染队列
            for (var i = 0; i < len; i++) {
                var child = visibleList[i];
                if (child) {
                    child.updateRenderQueue(renderQueue);
                }
            }
            // 设置视图矩阵,投影矩阵,裁剪面
            renderSystem.setViewMatrix(camera.getViewMatrix());
            renderSystem.setProjectionMatrix(camera.getProjMatrix());
            // #1 渲染不透明物体(完成后渲染透明物体)
            // 设置shader pass
            var solidObjs = renderQueue.solidObjects;
            if (len > 0) {
                // 排序
            }
            // 设置光照
            renderSystem.setLight();
            // 渲染
            for (var i = 0, len_4 = solidObjs.length; i < len_4; i++) {
                var solidObj = solidObjs[i];
                renderSystem.render(solidObj.getMaterial().shader, solidObj);
            }
            // 执行光照
            this.doLighting();
            // #2 渲染不透明物体完成后, 开始渲染透明物体)
            var alphaObjs = renderQueue.alphaObjects;
            if (len > 0) {
                // 排序
            }
            // 渲染
            for (var i = 0, len_5 = alphaObjs.length; i < len_5; i++) {
                var alphaObj = alphaObjs[i];
                renderSystem.render(alphaObj.getMaterial().shader, alphaObj);
            }
        };
        // 不透明物体绘制完成后, 执行光照.每个物体可以创建一个renderbuffer,避免多次渲染,但是会增加内存.
        RenderPipeline.prototype.doLighting = function () {
        };
        return RenderPipeline;
    }());
    QE.RenderPipeline = RenderPipeline;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var RenderQueue = /** @class */ (function () {
        function RenderQueue() {
            this._solidObjects = [];
            this._alphaObjects = [];
        }
        Object.defineProperty(RenderQueue.prototype, "solidObjects", {
            get: function () {
                return this._solidObjects;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderQueue.prototype, "alphaObjects", {
            get: function () {
                return this._alphaObjects;
            },
            enumerable: true,
            configurable: true
        });
        RenderQueue.prototype.addRenderable = function (renderable) {
            // TODO:添加不透明对象判断
            var mat = renderable.getMaterial();
            if (mat.opacity >= 1) {
                this._solidObjects.unshift(renderable);
            }
            else {
                this._alphaObjects.push(renderable);
            }
        };
        RenderQueue.prototype.clear = function () {
            this._solidObjects.length = 0;
            this._alphaObjects.length = 0;
        };
        return RenderQueue;
    }());
    QE.RenderQueue = RenderQueue;
})(QE || (QE = {}));
var QE;
(function (QE) {
    QE.MAX_NUM_UNIFORM = 32;
    QE.MAX_NUM_SAMPLER = 8;
    QE.MAX_NUM_VELEMENT = 16;
    QE.MAX_NUM_USER_CONST = 64;
    QE.MAX_NUM_SHADER_PASS = 8;
    QE.MAX_NUM_VERTEX_STREAM = 4;
    var RenderSystem = /** @class */ (function () {
        function RenderSystem() {
            this._worldViewTM = new QE.Matrix4(); // 世界视图矩阵
            this._viewProjTM = new QE.Matrix4(); // 视图投影矩阵
            this._worldViewProjTM = new QE.Matrix4(); // 世界视图投影矩阵
        }
        Object.defineProperty(RenderSystem, "instance", {
            get: function () {
                if (!RenderSystem._sInstance) {
                    RenderSystem._sInstance = new RenderSystem();
                }
                return RenderSystem._sInstance;
            },
            enumerable: true,
            configurable: true
        });
        RenderSystem.getGLDrawCount = function (type, primCount) {
            switch (type) {
                case 3 /* TRIANGLE_LIST */:
                    return primCount * 3;
                case 4 /* TRIANGLE_STRIP */:
                    return primCount + 2;
                case 1 /* LINE_LIST */:
                    return primCount * 2;
                case 2 /* LINE_STRIP */:
                    return primCount + 1;
                case 0 /* POINT_LIST */:
                    return primCount;
            }
            return 0;
        };
        RenderSystem.getGLDrawMode = function (type) {
            var drawMode;
            switch (type) {
                case 0 /* POINT_LIST */:
                    drawMode = QE.gl.POINTS;
                    break;
                case 1 /* LINE_LIST */:
                    drawMode = QE.gl.LINES;
                    break;
                case 2 /* LINE_STRIP */:
                    drawMode = QE.gl.LINE_STRIP;
                    break;
                case 3 /* TRIANGLE_LIST */:
                    drawMode = QE.gl.TRIANGLES;
                    break;
                case 4 /* TRIANGLE_STRIP */:
                    drawMode = QE.gl.TRIANGLE_STRIP;
                    break;
                case 5 /* TRIANGLE_FAN */:
                    drawMode = QE.gl.TRIANGLE_FAN;
                    break;
                default:
                    drawMode = QE.gl.TRIANGLES;
                    break;
            }
            return drawMode;
        };
        RenderSystem.prototype.init = function (div) {
            this._currentRenderState = new QE.RenderState();
            this._renderStatedChanged = true;
            this._textureChanged = [];
            for (var i = 0; i < QE.MAX_NUM_SAMPLER; i++) {
                this._textureChanged.push(true);
            }
            this._currentTextures = [];
            this._currentTextures.length = QE.MAX_NUM_SAMPLER;
            this._shaderPassChanged = true;
            var canvas = document.createElement('canvas');
            canvas.width = 1280;
            canvas.height = 720;
            canvas.style.position = 'absolute';
            QE.gl = canvas.getContext('experimental-webgl', {
                alpha: false
            });
            if (!QE.gl) {
                return;
            }
            this._canvas = canvas;
            div.appendChild(canvas);
        };
        RenderSystem.prototype._clearState = function () {
        };
        RenderSystem.prototype.onInit = function () {
        };
        RenderSystem.prototype.onShutdown = function () {
        };
        RenderSystem.prototype.beginScene = function () {
        };
        RenderSystem.prototype.endScene = function () {
        };
        RenderSystem.prototype.clear = function (mask, color, depth, stencil) {
            if (mask === 0 /* None */) {
                return;
            }
            var glMask = 0;
            if (mask & 1 /* COLOR_BUFFER_BIT */) {
                glMask |= QE.gl.COLOR_BUFFER_BIT;
            }
            if (mask & 2 /* DEPTH_BUFFER_BIT */) {
                glMask |= QE.gl.DEPTH_BUFFER_BIT;
            }
            if (mask & 4 /* STENCIL_BUFFER_BIT */) {
                glMask |= QE.gl.STENCIL_BUFFER_BIT;
            }
            QE.gl.clear(glMask);
            QE.gl.clearColor(color[0], color[1], color[2], color[3]);
            QE.gl.clearDepth(depth);
            QE.gl.clearStencil(stencil);
            QE.GL_CHECK_ERROR();
        };
        RenderSystem.prototype.setViewport = function (viewPort) {
            this._viewport = viewPort;
            var rtWidth = QE.Screen.screenWidth;
            var rtHeight = QE.Screen.screenHeight;
            var currentRenderTarget = this._currentRenderTarget;
            if (currentRenderTarget) {
                rtWidth = currentRenderTarget.width;
                rtHeight = currentRenderTarget.height;
            }
            // 是否替换为限制vp在窗口大小内
            console.assert(viewPort.x >= 0 && viewPort.x + viewPort.w * rtWidth <= rtWidth &&
                viewPort.y >= 0 && viewPort.y + viewPort.h * rtHeight <= rtHeight);
            // 窗口坐标系原点为左下角
            var x = viewPort.x;
            var y = viewPort.y;
            var w = viewPort.w * rtWidth;
            var h = viewPort.h * rtHeight;
            QE.gl.viewport(x, y, w, h);
            QE.GL_CHECK_ERROR();
        };
        RenderSystem.prototype.setRenderTarget = function (renderTarget) {
            this._currentRenderTarget = renderTarget;
            QE.gl.bindFramebuffer(QE.gl.FRAMEBUFFER, renderTarget);
        };
        RenderSystem.prototype._setTexture = function (unit, enable, tex) {
            // 纹理未加载完成时,使用默认纹理
            if (!tex.getWebGLTexture()) {
                tex = QE.ResourceManager.get(QE.ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME);
            }
            if (!tex.getWebGLTexture()) {
                return;
            }
            QE.gl.activeTexture(QE.gl.TEXTURE0 + unit);
            if (enable) {
                QE.gl.bindTexture(QE.gl.TEXTURE_2D, tex.getWebGLTexture());
            }
            else {
                QE.gl.bindTexture(QE.gl.TEXTURE_2D, null);
            }
            QE.GL_CHECK_ERROR();
        };
        RenderSystem.prototype._bindRenderState = function () {
            if (!this._renderStatedChanged) {
                return;
            }
            var currentRenderState = this._currentRenderState;
            var cullMode = currentRenderState.cullMode;
            switch (cullMode) {
                case 1 /* FRONT */:
                    QE.gl.enable(QE.gl.FRONT_FACE);
                    QE.gl.cullFace(QE.gl.FRONT);
                    break;
                case 2 /* BACK */:
                    QE.gl.enable(QE.gl.CULL_FACE);
                    QE.gl.cullFace(QE.gl.BACK);
                    break;
                case 0 /* NONE */:
                default:
                    QE.gl.disable(QE.gl.CULL_FACE);
                    break;
            }
            var depthTest = currentRenderState.depthCheck;
            switch (depthTest) {
                case 1 /* CHECK_ONLY */:
                    QE.gl.enable(QE.gl.DEPTH_TEST);
                    QE.gl.depthMask(false);
                    QE.gl.depthFunc(QE.gl.LEQUAL);
                    break;
                case 2 /* CHECK_WRITE */:
                    QE.gl.enable(QE.gl.DEPTH_TEST);
                    QE.gl.depthMask(true);
                    QE.gl.depthFunc(QE.gl.LEQUAL);
                    break;
                case 0 /* NONE */:
                default:
                    QE.gl.disable(QE.gl.DEPTH_TEST);
                    QE.gl.depthMask(false);
                    break;
            }
            var blendMode = currentRenderState.blendMode;
            switch (blendMode) {
                case 1 /* OPACITY */:
                case 2 /* ALPHA_TEST */:
                    QE.gl.disable(QE.gl.BLEND);
                    break;
                case 3 /* ALPHA_BLEND */:
                    QE.gl.enable(QE.gl.BLEND);
                    QE.gl.blendFunc(QE.gl.SRC_ALPHA, QE.gl.ONE_MINUS_SRC_ALPHA);
                    break;
                case 4 /* ADD */:
                    QE.gl.enable(QE.gl.BLEND);
                    QE.gl.blendFunc(QE.gl.ONE, QE.gl.ONE);
                    break;
                case 5 /* MUL */:
                    QE.gl.enable(QE.gl.BLEND);
                    QE.gl.blendFunc(QE.gl.ZERO, QE.gl.SRC_COLOR);
                    break;
            }
            var colorMask = currentRenderState.colorMask;
            QE.gl.colorMask(!!(colorMask & 1 /* RED */), !!(colorMask & 2 /* GREEN */), !!(colorMask & 4 /* BLUE */), !!(colorMask & 8 /* ALPHA */));
            QE.GL_CHECK_ERROR();
            this._renderStatedChanged = false;
        };
        RenderSystem.prototype.bindGpuProgram = function (gpuProgram) {
            QE.gl.useProgram(gpuProgram.webglProgram);
        };
        RenderSystem.prototype._bindVertexElement = function (vertexBuffer, shaderPass) {
            QE.gl.bindBuffer(QE.gl.ARRAY_BUFFER, vertexBuffer.getGLBuffer());
            QE.gl.enableVertexAttribArray(vertexBuffer.semantic);
        };
        RenderSystem.prototype.onResize = function (w, h) {
            var thisCanvas = this._canvas;
            thisCanvas.width = w;
            thisCanvas.height = h;
        };
        RenderSystem.prototype.setWorldMatrix = function (worldMatrix) {
            this._worldMatrix = worldMatrix;
            this._isTransformDirty = true;
        };
        RenderSystem.prototype.getWorldMatrix = function () {
            return this._worldMatrix;
        };
        RenderSystem.prototype.setViewMatrix = function (viewMatrix) {
            this._viewMatrix = viewMatrix;
            this._isTransformDirty = true;
        };
        RenderSystem.prototype.getViewMatrix = function () {
            return this._viewMatrix;
        };
        RenderSystem.prototype.setProjectionMatrix = function (projectionMatrix) {
            this._projectionMatrix = projectionMatrix;
            this._isTransformDirty = true;
        };
        RenderSystem.prototype.getProjectionMatrix = function () {
            return this._projectionMatrix;
        };
        RenderSystem.prototype.getWorldViewMatrix = function () {
            return this._worldViewTM;
        };
        RenderSystem.prototype.getViewProjMatrix = function () {
            return this._viewProjTM;
        };
        RenderSystem.prototype.getWorldViewProjMatrix = function () {
            return this._worldViewProjTM;
        };
        RenderSystem.prototype.setCamera = function (camera) {
        };
        RenderSystem.prototype.setMaterial = function (material) {
        };
        RenderSystem.prototype.setLight = function () {
        };
        RenderSystem.prototype.setFog = function (fogColor, fogNear, fogFar) {
        };
        RenderSystem.prototype.setClipPlane = function (near, far) {
        };
        RenderSystem.prototype._setTextureUnitSettings = function (unit, tex) {
            this._setTexture(unit, true, tex);
        };
        RenderSystem.prototype.setShaderPass = function (pass) {
            if (this._currentShaderPass != pass) {
                this._currentShaderPass = pass;
                this._shaderPassChanged = true;
            }
        };
        RenderSystem.prototype.setRenderState = function (cullMode, blendMode, depthCheck, colorMask) {
            this._currentRenderState.cullMode = cullMode;
            this._currentRenderState.blendMode = blendMode;
            this._currentRenderState.depthCheck = depthCheck;
            this._currentRenderState.colorMask = colorMask;
        };
        RenderSystem.prototype.getCurrentTextures = function () {
            return this._currentTextures;
        };
        RenderSystem.prototype.begin = function () {
            if (this._isTransformDirty) {
                this._worldViewTM.identity();
                this._viewProjTM.identity();
                this._worldViewProjTM.identity();
                this._worldMatrix.multiply(this._viewMatrix, this._worldViewTM);
                this._viewMatrix.multiply(this._projectionMatrix, this._viewProjTM);
                this._worldViewTM.multiply(this._projectionMatrix, this._worldViewProjTM);
                this._isTransformDirty = false;
            }
        };
        RenderSystem.prototype.end = function () {
        };
        RenderSystem.prototype.render = function (shader, renderable) {
            if (!shader) {
                return;
            }
            // 准备渲染事件
            var material = renderable.getMaterial();
            var renderOp = renderable.getRenderOperation();
            this.setMaterial(material);
            var worldMatrix = renderable.getWorldTransforms();
            var tempWM = new QE.Matrix4();
            tempWM.copyFrom(worldMatrix);
            this.setWorldMatrix(tempWM);
            // ShaderPass
            var passes = shader.shaderPasses;
            for (var i = 0, len = passes.length; i < len; ++i) {
                var pass = passes[i];
                var renderState = pass.getRenderState();
                // 设置当前shader pass
                this.setShaderPass(pass);
                // 设置渲染状态
                this.setRenderState(renderState.cullMode, renderState.blendMode, renderState.depthCheck, renderState.colorMask);
                // 设置纹理
                var samplers = pass.getSamplers();
                for (var ii = 0; ii < samplers.length; ii++) {
                    var sampler = samplers[ii];
                    switch (sampler.bindType) {
                        case 10 /* SAMPLER */:
                            this._setTextureUnitSettings(ii, sampler.samplerTex);
                            break;
                        default:
                            // this.setTexture(sampler.index, sampler.samplerTex);
                            break;
                    }
                }
                this.renderOperation(renderOp);
            }
        };
        RenderSystem.prototype.renderOperation = function (renderOp) {
            console.assert(!!this._currentShaderPass && !!renderOp.vertexBuffers);
            // begin render
            this.begin();
            this._bindRenderState();
            var currentShaderPass = this._currentShaderPass;
            if (this._shaderPassChanged) {
                this.bindGpuProgram(currentShaderPass.getProgram());
                this._shaderPassChanged = false;
            }
            currentShaderPass.uploadUniforms();
            currentShaderPass.uploadSamplers();
            var drawMode = RenderSystem.getGLDrawMode(renderOp.renderOpType);
            var renderAttribsBound = [];
            // 绑定顶点属性
            var vbBuffers = renderOp.vertexBuffers;
            for (var i = 0, len_6 = vbBuffers.length; i < len_6; i++) {
                var vb = vbBuffers[i];
                var location_1 = currentShaderPass.getAttribute(vb.semantic);
                if (location_1 === undefined) {
                    continue;
                }
                QE.gl.bindBuffer(QE.gl.ARRAY_BUFFER, vb.getGLBuffer());
                QE.gl.bufferData(QE.gl.ARRAY_BUFFER, vb._data, QE.WebGLBufferManager.getGLUsage(vb._usage));
                QE.GL_CHECK_ERROR();
                QE.gl.enableVertexAttribArray(location_1);
                QE.gl.vertexAttribPointer(location_1, vb._size, vb.type, vb._normalized, 0, 0);
                QE.GL_CHECK_ERROR();
                renderAttribsBound.push(location_1);
            }
            var indexBuffer = renderOp.indexBuffer;
            if (indexBuffer) {
                QE.gl.bindBuffer(QE.gl.ELEMENT_ARRAY_BUFFER, indexBuffer.getGLIndexBuffer());
                QE.GL_CHECK_ERROR();
                QE.gl.drawElements(drawMode, indexBuffer.count, QE.gl.UNSIGNED_SHORT, 0);
            }
            else {
                QE.gl.drawArrays(QE.gl.TRIANGLE_STRIP, 0, vbBuffers[0].vertexCount);
            }
            QE.GL_CHECK_ERROR();
            // end render
            // 清除属性绑定
            var len = renderAttribsBound.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    QE.gl.disableVertexAttribArray(renderAttribsBound[i]);
                }
            }
            this.end();
        };
        RenderSystem.prototype.readPixels = function (x, y, width, height, format, type, pixels) {
        };
        return RenderSystem;
    }());
    QE.RenderSystem = RenderSystem;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var RenderTarget = /** @class */ (function (_super) {
        __extends(RenderTarget, _super);
        function RenderTarget() {
            var _this = _super.call(this) || this;
            _this._rid = -1;
            _this._rid = RenderTarget.RdtId++;
            return _this;
        }
        Object.defineProperty(RenderTarget.prototype, "format", {
            get: function () {
                return this._format;
            },
            set: function (v) {
                this._format = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RenderTarget.prototype, "id", {
            get: function () {
                return this._rid;
            },
            enumerable: true,
            configurable: true
        });
        RenderTarget.prototype.getTexture = function () {
            return this._texture;
        };
        RenderTarget.prototype.init = function () {
            var w = this.width, h = this.height;
            console.assert(w > 0 && h > 0);
            var texture = new QE.Texture('RenderTarget' + this._rid);
            texture.width = w;
            texture.height = h;
            texture.mipmaps = 0;
            texture.format = this.format;
            texture.usage = 1 /* STATIC */;
            this._texture = texture;
            var webglTex = texture.getWebGLTexture();
            // 创建帧缓冲
            var frameBuffer = QE.gl.createFramebuffer();
            // 绑定帧缓冲
            QE.gl.bindFramebuffer(QE.gl.FRAMEBUFFER, frameBuffer);
            // 连接创建的2d纹理作为帧缓冲区附着
            QE.gl.framebufferTexture2D(QE.gl.FRAMEBUFFER, QE.gl.COLOR_ATTACHMENT0, QE.gl.TEXTURE_2D, webglTex, 0);
            // 用完临时解除绑定
            QE.gl.bindTexture(QE.gl.TEXTURE_2D, undefined);
            this._frameBuffer = frameBuffer;
            if (this._hasDepthBuffer) {
                // 创建深度渲染缓冲对象
                var renderBuffer = QE.gl.createRenderbuffer();
                // 绑定深度渲染缓冲对象
                QE.gl.bindRenderbuffer(QE.gl.RENDERBUFFER, renderBuffer);
                // 指定保存在渲染缓冲区的图像大小和格式, 格式参数参考OPengl3.0 第12章 12.4.2渲染缓冲区格式
                QE.gl.renderbufferStorage(QE.gl.RENDERBUFFER, QE.gl.DEPTH_COMPONENT16, w, h);
                // 连接渲染缓冲区作为帧缓冲区附着
                QE.gl.framebufferRenderbuffer(QE.gl.FRAMEBUFFER, QE.gl.DEPTH_ATTACHMENT, QE.gl.RENDERBUFFER, renderBuffer);
                // 用完临时解除绑定
                QE.gl.bindRenderbuffer(QE.gl.RENDERBUFFER, undefined);
                this._depthBuffer = renderBuffer;
            }
            // 检查帧缓冲区完整性, 状态参数参考12.5.4
            var status = QE.gl.checkFramebufferStatus(QE.gl.FRAMEBUFFER);
            if (status != QE.gl.FRAMEBUFFER_COMPLETE) {
                if (QE.__QE_DEBUG__) {
                    // TODO: 打印状态描述
                    switch (status) {
                        case QE.gl.FRAMEBUFFER_UNSUPPORTED:
                            break;
                        case QE.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                            break;
                        case QE.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                            break;
                        case QE.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                            break;
                        default:
                            break;
                    }
                }
                console.log('Error: Create RenderTarget Failed, format: ' + this.format + '.');
                this.destroy();
            }
            // 用完临时解除绑定
            QE.gl.bindFramebuffer(QE.gl.FRAMEBUFFER, undefined);
            QE.GL_CHECK_ERROR();
        };
        RenderTarget.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this._depthBuffer) {
                QE.gl.deleteRenderbuffer(this._depthBuffer);
                this._depthBuffer = undefined;
            }
            if (this._frameBuffer) {
                QE.gl.deleteFramebuffer(this._frameBuffer);
                this._frameBuffer = undefined;
            }
            if (this._texture) {
                this._texture.destroy();
                this._texture = undefined;
            }
        };
        RenderTarget.RdtId = 0;
        return RenderTarget;
    }(QE.HashObject));
    QE.RenderTarget = RenderTarget;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /**
     * 资源类型
     */
    var ResType;
    (function (ResType) {
        ResType[ResType["Texture"] = 0] = "Texture";
        ResType[ResType["TEXT"] = 1] = "TEXT";
        ResType[ResType["BINARY"] = 2] = "BINARY";
        ResType[ResType["FBX"] = 3] = "FBX";
        ResType[ResType["MATERIAL"] = 4] = "MATERIAL";
        ResType[ResType["SHADER"] = 5] = "SHADER";
        ResType[ResType["SCENE"] = 6] = "SCENE";
        ResType[ResType["ANIM"] = 7] = "ANIM";
        ResType[ResType["FONT"] = 8] = "FONT";
        ResType[ResType["PREFAB"] = 9] = "PREFAB"; // 预设资源
    })(ResType = QE.ResType || (QE.ResType = {}));
    var ExtNameMap = {
        '.png': ResType.Texture,
        '.jpg': ResType.Texture,
        '.jpeg': ResType.Texture,
        '.txt': ResType.TEXT,
        '.bin': ResType.BINARY,
        '.fbx': ResType.FBX,
        '.mat': ResType.MATERIAL,
        '.shader': ResType.SHADER,
        '.scene': ResType.SCENE,
        '.anim': ResType.ANIM,
        '.font': ResType.FONT,
        '.prefab': ResType.PREFAB,
        'fallback': ResType.BINARY
    };
    function extNameToResType(extName) {
        var type = ExtNameMap[extName];
        if (type == null) {
            type = ExtNameMap['fallback'];
        }
        return type;
    }
    function extname(path) {
        // 文件扩展名匹配正则
        var reg = /\.[^\.]+$/;
        var matches = reg.exec(path);
        if (matches) {
            return matches[0];
        }
        return '';
    }
    QE.extname = extname;
    var ResourceManager = /** @class */ (function () {
        function ResourceManager() {
        }
        ResourceManager.get = function (path) {
            var item = this._resMap[path];
            if (item && item.state === 2 /* Loaded */) {
                return item.res;
            }
            return null;
        };
        ResourceManager.load = function (path, onProgress) {
            return __awaiter(this, void 0, void 0, function () {
                var res, ext, loader, resRequest;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res = this.get(path);
                            if (res) {
                                return [2 /*return*/, res];
                            }
                            ext = extname(path);
                            loader = this._loaderMap[ext];
                            if (!loader) {
                                console.error('res loader is not found: ' + path);
                                return [2 /*return*/, null];
                            }
                            resRequest = this._resMap[path];
                            if (!resRequest) {
                                resRequest = {
                                    state: 0 /* UnLoaded */,
                                    listeners: []
                                };
                                this._resMap[path] = resRequest;
                            }
                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    resRequest.listeners.push(function (error, data) {
                                        if (error) {
                                            console.error(error);
                                            reject(null);
                                            return;
                                        }
                                        if (!data) {
                                            console.error('file not exist');
                                            reject(null);
                                            return;
                                        }
                                        resolve(data);
                                    });
                                    if (resRequest.state === 1 /* Loading */) {
                                        return;
                                    }
                                    resRequest.state = 1 /* Loading */;
                                    loader.load(path, function (error, data) {
                                        resRequest.state = 2 /* Loaded */;
                                        resRequest.listeners.forEach(function (listener) {
                                            listener(error, data);
                                        });
                                        resRequest.listeners.length = 0;
                                    }, onProgress);
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ResourceManager.unload = function (url) {
            var res = this._resMap[url];
            if (!res) {
                return;
            }
            delete this._resMap[url];
            res.res.destroy();
        };
        ResourceManager.removeUnusedResources = function () {
        };
        ResourceManager.init = function (onFinished) {
            this.setLoader(['.png', '.jpg', '.jpeg'], QE.TextureLoader.instance);
            this.setLoader(['.txt', '.xml', '.json', '.plist', '.fnt', '.atlas'], QE.TextResourceLoader.instance);
            this.makeBuiltinRes(onFinished);
        };
        /**
         * 构建引擎内置资源
         * @param onFinished
         */
        ResourceManager.makeBuiltinRes = function (onFinished) {
            var tex = new QE.Texture(ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME);
            tex.mipmaps = 0;
            tex.format = 4 /* RGBA */;
            tex.usage = 1 /* STATIC */;
            var pixels = [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255];
            tex.loadRawData((new Uint8Array(pixels)).buffer, 2, 2);
            // this._resMap[ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME] = tex;
            if (onFinished) {
                onFinished.call(this);
            }
        };
        ResourceManager.setLoader = function (extName, loader) {
            var _this = this;
            if (!Array.isArray(extName)) {
                extName = [extName];
            }
            extName.forEach(function (value) {
                _this._loaderMap[value] = loader;
            });
        };
        ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME = '__builtin_defWhiteTex';
        ResourceManager._loaderMap = {};
        ResourceManager._resMap = {};
        return ResourceManager;
    }());
    QE.ResourceManager = ResourceManager;
})(QE || (QE = {}));
///<reference path="../core/HashObject.ts" />
///<reference path="ResourceManager.ts" />
///<reference path="../core/RefObj.ts"/>
var QE;
///<reference path="../core/HashObject.ts" />
///<reference path="ResourceManager.ts" />
///<reference path="../core/RefObj.ts"/>
(function (QE) {
    var ResourceDependence = /** @class */ (function (_super) {
        __extends(ResourceDependence, _super);
        function ResourceDependence(mainRes, subRes) {
            var _this = _super.call(this) || this;
            _this._mainRes = mainRes;
            _this._subRes = subRes;
            _this._listener = new QE.QEListener(_this, ResourceDependence.prototype._onLoaded);
            subRes._loadedEvent.add(_this._listener);
            return _this;
        }
        ResourceDependence.prototype.getMainRes = function () {
            return this._mainRes;
        };
        ResourceDependence.prototype.getSubRes = function () {
            return this._subRes;
        };
        ResourceDependence.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._subRes._loadedEvent.del(this._listener);
            this._listener = null;
            this._subRes = null;
            this._mainRes = null;
        };
        ResourceDependence.prototype._onLoaded = function () {
            this._mainRes._removeDependence(this._subRes);
        };
        return ResourceDependence;
    }(QE.HashObject));
    // Font,Shader,Material,Mesh,Skeleton,Texture,Audio,Video
    var Resource = /** @class */ (function (_super) {
        __extends(Resource, _super);
        function Resource(name, group) {
            var _this = _super.call(this) || this;
            _this._dependenceFiles = [];
            _this._state = 0 /* UnLoaded */;
            _this._loadedEvent = new QE.QEEvent1();
            _this._unloadedEvent = new QE.QEEvent1();
            _this._name = name;
            _this._group = group;
            return _this;
        }
        Object.defineProperty(Resource.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "priority", {
            get: function () {
                return this._priority;
            },
            set: function (priority) {
                this._priority = priority;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "state", {
            get: function () {
                return this._state;
            },
            set: function (val) {
                this._state = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "isComplete", {
            get: function () {
                return this._state === 2 /* Loaded */;
            },
            enumerable: true,
            configurable: true
        });
        Resource.prototype.copy = function (object) {
            _super.prototype.copy.call(this, object);
        };
        Resource.prototype._addDependence = function (subResource) {
            var dep = new ResourceDependence(this, subResource);
            this._dependenceFiles.push(dep);
        };
        Resource.prototype._removeDependence = function (pSubResource) {
            var deps = this._dependenceFiles;
            for (var i = 0, len = deps.length; i < len; i++) {
                var dep = deps[i];
                if (dep.instanceId === pSubResource.instanceId) {
                    dep.destroy();
                    deps.splice(i, 1);
                    break;
                }
            }
            if (this._state === 1 /* Loading */ && !this._hasDependencies()) {
            }
        };
        Resource.prototype._removeAllDependence = function () {
            var deps = this._dependenceFiles;
            for (var k in deps) {
                deps[k].destroy();
            }
            this._dependenceFiles.length = 0;
        };
        Resource.prototype._hasDependencies = function () {
            return this._dependenceFiles.length > 0;
        };
        return Resource;
    }(QE.RefObj));
    QE.Resource = Resource;
})(QE || (QE = {}));
///<reference path="../../res/Resource.ts"/>
var QE;
///<reference path="../../res/Resource.ts"/>
(function (QE) {
    // 每个顶点都有一个纹理坐标.2D纹理坐标用2d坐标(s, t)表示,也称作(u, v)
    // 纹理图像的左下角由st坐标(0.0, 0.0)指定, 右上角st坐标(1.0, 1.0)指定. 坐标区间为[0.0, 1.0], 区间外坐标也是允许的.
    // 纹理绑定步骤:
    /*
    *  let webglTex = gl.createTexture();           // 生成gl纹理对象
    *  gl.bindTexture(gl.TEXTURE_2D, webglTex);     // 绑定纹理对象, 绑定时, 会将之前绑定的纹理对象解除绑定
    *  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.imageData);//纹理真正第加载图像
    **/
    var Texture = /** @class */ (function (_super) {
        __extends(Texture, _super);
        function Texture(name) {
            var _this = _super.call(this, name) || this;
            _this._tid = undefined;
            _this._tid = ++Texture.Tid;
            return _this;
        }
        Object.defineProperty(Texture.prototype, "id", {
            get: function () {
                return this._tid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "resolution", {
            get: function () {
                return this._resolution;
            },
            set: function (resolution) {
                this._resolution = resolution;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "webglTex", {
            get: function () {
                return this._webglTex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "usage", {
            get: function () {
                return this._usage;
            },
            set: function (usage) {
                this._usage = usage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "image", {
            get: function () {
                return this._image;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "imageData", {
            get: function () {
                return this._imageData;
            },
            enumerable: true,
            configurable: true
        });
        Texture.prototype.getWebGLTexture = function () {
            return this.webglTex;
        };
        Texture.prototype.copy = function (object) {
            _super.prototype.copy.call(this, object);
        };
        Texture.prototype.clone = function () {
            var m = new Texture();
            m.copy(this);
            return m;
        };
        Texture.prototype.loadImage = function (image) {
            this._image = image;
            this._width = image.width;
            this._height = image.height;
            this.createWebGLTexture();
        };
        Texture.prototype.loadRawData = function (data, width, height) {
            if (data === undefined) {
                this.createWebGLTexture();
                return;
            }
            this._width = width;
            this._height = height;
            this._imageData = new ImageData(new Uint8ClampedArray(data), width, height);
            this.createWebGLTexture();
        };
        Texture.prototype.destroy = function () {
            if (this._webglTex) {
                QE.gl.deleteTexture(this._webglTex);
                this._webglTex = undefined;
            }
            this._image = undefined;
        };
        Texture.prototype.createWebGLTexture = function () {
            var webglTex = QE.gl.createTexture();
            QE.gl.bindTexture(QE.gl.TEXTURE_2D, webglTex);
            // 参数介绍,OpenGLES3.0编程指南,第九章纹理
            // opengl纹理左下角为起点, 纹理坐标是右上角为起点
            QE.gl.pixelStorei(QE.gl.UNPACK_FLIP_Y_WEBGL, 1);
            QE.gl.pixelStorei(QE.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
            QE.GL_CHECK_ERROR();
            if (this._image) {
                QE.gl.texImage2D(QE.gl.TEXTURE_2D, 0, QE.gl.RGBA, QE.gl.RGBA, QE.gl.UNSIGNED_BYTE, this._image);
            }
            else if (this._imageData) {
                QE.gl.texImage2D(QE.gl.TEXTURE_2D, 0, QE.gl.RGBA, QE.gl.RGBA, QE.gl.UNSIGNED_BYTE, this._imageData);
            }
            QE.gl.texParameteri(QE.gl.TEXTURE_2D, QE.gl.TEXTURE_MIN_FILTER, QE.gl.LINEAR);
            QE.gl.texParameteri(QE.gl.TEXTURE_2D, QE.gl.TEXTURE_MAG_FILTER, QE.gl.LINEAR);
            QE.gl.texParameteri(QE.gl.TEXTURE_2D, QE.gl.TEXTURE_WRAP_S, QE.gl.CLAMP_TO_EDGE);
            QE.gl.texParameteri(QE.gl.TEXTURE_2D, QE.gl.TEXTURE_WRAP_T, QE.gl.CLAMP_TO_EDGE);
            this._webglTex = webglTex;
        };
        Texture.prototype.unloadImpl = function () {
        };
        Texture.Tid = 0;
        return Texture;
    }(QE.Resource));
    QE.Texture = Texture;
})(QE || (QE = {}));
var QE;
(function (QE) {
    /*
    一个shader 包含多个pass, 每个pass可以选择使用shader中得uniforms,attributes,samplers,programs
    shader
    {
        state: {
            cullMode:,
            depthCheck:,
            blendMode:,
        }
        uniforms: {

        }
        attributes: {

        }
        samplers: {
            samplerName:,
        }
        vsCodes: [
            codeName: "",
            codeName2: "",
        ]
        fsCodes: [
            codeName: "",
            codeName2: "",
        ]
        pass
        {
            state,
            uniforms,
            attributes,
            samplers,
            vsCodes[0],
            fsCodes[1]
        },
        pass
        {
            vsCodes[0],
            fsCodes[1]
        }
    }
    */
    /*
    材质数据结构:
        包含基本数据,
        shader,
        shader所需数据
    material name
    {
        properties
        {
            shader:{fileid:0}
            textures:
            {
                texture_unit
                {
                    texture Panels_Diffuse.png
                }
            },
            floats:{

            },
            colors: {

            },
            ints: {

            },
            vec3: {

            }
        }
    }

    */
    /**
     * 材质基类
     */
    var Material = /** @class */ (function (_super) {
        __extends(Material, _super);
        function Material(name) {
            return _super.call(this, name) || this;
        }
        Material.getDefaultCubeMaterial = function () {
            if (!Material._defMatGLTex) {
                Material._defMatGLTex = QE.ResourceManager.get(QE.ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME);
            }
            var m = Material._defaultCubeMaterial;
            if (!m) {
                m = new Material();
                Material._defaultCubeMaterial = m;
                var defShader = new QE.Shader('defaultCubeShader');
                // one pass
                var pass = new QE.WebGLShaderPass();
                var program = new QE.GLShaderProgram(QE.ShaderChunks.BaseMeshShadervs, QE.ShaderChunks.BaseMeshShaderfs);
                pass.setProgram(program);
                var uniforms = ['mvpMatrix', 'u_lightDirection', 'u_lightColor'];
                for (var i = 0, len = uniforms.length; i < len; i++) {
                    var uniformName = uniforms[i];
                    var u = void 0;
                    if (uniformName === 'mvpMatrix') {
                        u = {
                            name: uniformName,
                            type: 2 /* WORLD_MATRIX */,
                            location: QE.gl.getUniformLocation(program.webglProgram, uniformName)
                        };
                    }
                    else if (uniformName === 'u_lightDirection') {
                        u = {
                            name: uniformName,
                            type: 13 /* LIGHT_DIRECTION */,
                            location: QE.gl.getUniformLocation(program.webglProgram, uniformName)
                        };
                    }
                    else {
                        u = {
                            name: uniformName,
                            type: 18 /* DIFFUSE */,
                            location: QE.gl.getUniformLocation(program.webglProgram, uniformName)
                        };
                    }
                    pass.addUniform(u);
                }
                pass.setAttribute(1 /* POSITION */, QE.gl.getAttribLocation(program.webglProgram, 'a_position'));
                pass.setAttribute(5 /* DIFFUSE */, QE.gl.getAttribLocation(program.webglProgram, 'a_color'));
                pass.setAttribute(4 /* NORMAL */, QE.gl.getAttribLocation(program.webglProgram, 'a_normal'));
                pass.setAttribute(7 /* TEXTURE_COORDINATES */, QE.gl.getAttribLocation(program.webglProgram, 'a_texCoord0'));
                var samplers = ['texture0'];
                for (var i = 0, len = samplers.length; i < len; i++) {
                    var sampler = samplers[i];
                    var s = {
                        index: 0,
                        name: sampler,
                        samplerTex: Material._defMatGLTex,
                        location: QE.gl.getUniformLocation(program.webglProgram, sampler),
                        bindType: 10 /* SAMPLER */
                    };
                    pass.addSampler(s);
                }
                var renderState = new QE.RenderState();
                pass.setRenderState(renderState);
                defShader.addPass(pass);
                m.shader = defShader;
            }
            return m;
        };
        Material.prototype.copy = function (object) {
            _super.prototype.copy.call(this, object);
        };
        Material.prototype.clone = function () {
            var m = new Material(name);
            m.copy(this);
            return m;
        };
        Material.prototype.loadImpl = function () {
        };
        Material.prototype.unloadImpl = function () {
        };
        Material.ClassName = 'Material';
        return Material;
    }(QE.Resource));
    QE.Material = Material;
})(QE || (QE = {}));
///<reference path="Material.ts" />
var QE;
///<reference path="Material.ts" />
(function (QE) {
    var SpriteMaterial = /** @class */ (function (_super) {
        __extends(SpriteMaterial, _super);
        function SpriteMaterial() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = 'SpriteMaterial';
            _this.fog = true;
            _this.lights = true;
            _this.opacity = 1;
            _this.transparent = false;
            _this.blendSrc = QE.gl.ONE;
            _this.blendDst = QE.gl.ONE_MINUS_SRC_ALPHA;
            _this.blendEquation = QE.gl.FUNC_ADD;
            _this.blendSrcAlpha = null;
            _this.blendDstAlpha = null;
            _this.blendEquationAlpha = null;
            _this.premultipliedAlpha = true;
            _this._needsUpdate = true;
            return _this;
        }
        SpriteMaterial.getDefaultSpriteMaterial = function () {
            if (!SpriteMaterial._defGLTex) {
                SpriteMaterial._defGLTex = QE.ResourceManager.get(QE.ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME);
            }
            var m = SpriteMaterial._shared;
            if (!m) {
                m = new SpriteMaterial();
                SpriteMaterial._shared = m;
                var defShader = new QE.Shader('default');
                // one pass
                var pass = new QE.WebGLShaderPass();
                var program = new QE.GLShaderProgram(QE.ShaderChunks.defaultSpriteShadervs, QE.ShaderChunks.defaultSpriteShaderfs);
                pass.setProgram(program);
                var uniforms = ['mvpMatrix'];
                for (var i = 0, len = uniforms.length; i < len; i++) {
                    var uname = uniforms[i];
                    var u = {
                        name: uname,
                        data: new QE.Matrix4(),
                        type: 2 /* WORLD_MATRIX */,
                        location: QE.gl.getUniformLocation(program.webglProgram, uname)
                    };
                    pass.addUniform(u);
                }
                pass.setAttribute(1 /* POSITION */, QE.gl.getAttribLocation(program.webglProgram, 'a_position'));
                pass.setAttribute(5 /* DIFFUSE */, QE.gl.getAttribLocation(program.webglProgram, 'a_color'));
                pass.setAttribute(7 /* TEXTURE_COORDINATES */, QE.gl.getAttribLocation(program.webglProgram, 'a_texCoord0'));
                var samplers = ['texture0'];
                for (var i = 0, len = samplers.length; i < len; i++) {
                    var samplerName = samplers[i];
                    var s = {
                        index: 0,
                        name: samplerName,
                        samplerTex: SpriteMaterial._defGLTex,
                        location: QE.gl.getUniformLocation(program.webglProgram, samplerName),
                        bindType: 10 /* SAMPLER */
                    };
                    pass.addSampler(s);
                }
                var renderState = new QE.RenderState();
                renderState.cullMode = 0 /* NONE */;
                pass.setRenderState(renderState);
                defShader.addPass(pass);
                m.shader = defShader;
            }
            return m;
        };
        return SpriteMaterial;
    }(QE.Material));
    QE.SpriteMaterial = SpriteMaterial;
})(QE || (QE = {}));
///<reference path="../../core/IDisposable.ts" />
var QE;
///<reference path="../../core/IDisposable.ts" />
(function (QE) {
    function loadPass() {
    }
    function compileShader(type, code) {
        var shader = QE.gl.createShader(type);
        QE.gl.shaderSource(shader, code);
        QE.gl.compileShader(shader);
        if (QE.gl.getShaderParameter(shader, QE.gl.COMPILE_STATUS) === false) {
            console.error('QE.GLShader: compile shader failed: ' + QE.gl.getShaderInfoLog(shader));
        }
        return shader;
    }
    var GLShaderManager = /** @class */ (function () {
        function GLShaderManager() {
            this._shaders = [];
        }
        GLShaderManager.compileShader = function (type, code) {
            var shader = QE.gl.createShader(type);
            QE.gl.shaderSource(shader, code);
            QE.gl.compileShader(shader);
            if (QE.gl.getShaderParameter(shader, QE.gl.COMPILE_STATUS) === false) {
                console.error('QE.GLShader: compile shader failed: ' + QE.gl.getShaderInfoLog(shader));
            }
            return shader;
        };
        GLShaderManager.prototype.isDestroyed = function () {
            return false;
        };
        GLShaderManager.prototype.destroy = function () {
            for (var i = 0, len = this._shaders.length; i < len; i++) {
                // this._shaders[i]
            }
            this._shaders = undefined;
        };
        GLShaderManager.prototype.find = function (name) {
            var shaders = this._shaders;
            for (var i = 0, len = shaders.length; i < len; i++) {
                var shader = shaders[i];
                if (name === shader.getName()) {
                    return shader;
                }
            }
            return null;
        };
        GLShaderManager.prototype.load = function (name) {
            var shader = this.find(name);
            if (shader) {
                return shader;
            }
        };
        GLShaderManager.prototype.remove = function (name) {
            var shaders = this._shaders;
            for (var i = 0, len = shaders.length; i < len; i++) {
                var shader = shaders[i];
                if (name === shader.getName()) {
                    shaders.splice(i, 1);
                    return;
                }
            }
        };
        return GLShaderManager;
    }());
    QE.GLShaderManager = GLShaderManager;
})(QE || (QE = {}));
///<reference path="../../core/IDisposable.ts" />
var QE;
///<reference path="../../core/IDisposable.ts" />
(function (QE) {
    var WebGLShaderPass = /** @class */ (function () {
        function WebGLShaderPass() {
            this._renderState = new QE.RenderState();
            this._attributes = {};
            this._uniforms = [];
            this._samplers = [];
        }
        WebGLShaderPass.prototype.isDestroyed = function () {
            return false;
        };
        WebGLShaderPass.prototype.destroy = function () {
            if (this.isDestroyed()) {
                return;
            }
            this._renderState = undefined;
            this._uniforms = undefined;
            this._samplers = undefined;
        };
        /**
         * 设置shader程序
         * @param program
         */
        WebGLShaderPass.prototype.setProgram = function (program) {
            this._program = program;
        };
        WebGLShaderPass.prototype.getProgram = function () {
            return this._program;
        };
        WebGLShaderPass.prototype.setUniform = function (index, data) {
            this._uniforms[index].data = data;
        };
        WebGLShaderPass.prototype.addUniform = function (uniform) {
            this._uniforms.push(uniform);
        };
        WebGLShaderPass.prototype.addSampler = function (sampler) {
            this._samplers.push(sampler);
        };
        WebGLShaderPass.prototype.setSampler = function (index, sampler) {
            this._samplers[index] = sampler;
        };
        WebGLShaderPass.prototype.getSamplers = function () {
            return this._samplers;
        };
        WebGLShaderPass.prototype.setAttribute = function (attrName, attrLoc) {
            this._attributes[attrName] = attrLoc;
        };
        WebGLShaderPass.prototype.getAttribute = function (attrName) {
            return this._attributes[attrName];
        };
        WebGLShaderPass.prototype.setRenderState = function (renderState) {
            this._renderState = renderState;
        };
        WebGLShaderPass.prototype.getRenderState = function () {
            return this._renderState;
        };
        WebGLShaderPass.prototype.clone = function () {
            return new WebGLShaderPass();
        };
        WebGLShaderPass.prototype.uploadUniforms = function () {
            var worldMat = QE.RenderSystem.instance.getWorldMatrix();
            var viewMat = QE.RenderSystem.instance.getViewMatrix();
            var projMat = QE.RenderSystem.instance.getProjectionMatrix();
            var mvpMat = QE.RenderSystem.instance.getWorldViewProjMatrix();
            var uniforms = this._uniforms;
            for (var i = 0, len = uniforms.length; i < len; i++) {
                var uniform = uniforms[i];
                switch (uniform.type) {
                    case 2 /* WORLD_MATRIX */:
                        QE.gl.uniformMatrix4fv(uniform.location, false, mvpMat.rawData);
                        break;
                    case 13 /* LIGHT_DIRECTION */:
                        QE.gl.uniform3f(uniform.location, 0.5, 3.0, 4.0);
                        break;
                    case 18 /* DIFFUSE */:
                        QE.gl.uniform3f(uniform.location, 1, 1, 1);
                        break;
                    default:
                        console.error("unknow type: " + uniform.type);
                        // gl.uniform1f(uniform.location, 0);
                        break;
                }
                if (QE.__QE_DEBUG__) {
                    QE.GL_CHECK_ERROR();
                }
            }
        };
        WebGLShaderPass.prototype.uploadSamplers = function () {
            var samplers = this._samplers;
            for (var i = 0, len = samplers.length; i < len; i++) {
                var sampler = samplers[i];
                if (!sampler.samplerTex || !sampler.samplerTex.getWebGLTexture()) {
                    continue;
                }
                QE.gl.uniform1i(sampler.location, sampler.index);
                if (QE.__QE_DEBUG__) {
                    QE.GL_CHECK_ERROR();
                }
            }
        };
        return WebGLShaderPass;
    }());
    QE.WebGLShaderPass = WebGLShaderPass;
})(QE || (QE = {}));
///<reference path="../../core/IDisposable.ts" />
var QE;
///<reference path="../../core/IDisposable.ts" />
(function (QE) {
    var GLShaderProgram = /** @class */ (function () {
        function GLShaderProgram(vsCode, fsCode) {
            this.vsCode = vsCode;
            this.fsCode = fsCode;
            var glVertexShader = QE.GLShaderManager.compileShader(QE.gl.VERTEX_SHADER, vsCode);
            var glFragmentShader = QE.GLShaderManager.compileShader(QE.gl.FRAGMENT_SHADER, fsCode);
            var webglProgram = QE.gl.createProgram();
            // 绑定shader
            QE.gl.attachShader(webglProgram, glVertexShader);
            QE.gl.attachShader(webglProgram, glFragmentShader);
            QE.gl.linkProgram(webglProgram);
            var programLog = QE.gl.getProgramInfoLog(webglProgram);
            var vertexLog = QE.gl.getShaderInfoLog(glVertexShader);
            var fragmentLog = QE.gl.getShaderInfoLog(glFragmentShader);
            if (QE.gl.getProgramParameter(webglProgram, QE.gl.LINK_STATUS) === false) {
                console.error('THREE.WebGLProgram: shader error: ', QE.gl.getError(), 'gl.VALIDATE_STATUS', QE.gl.getProgramParameter(webglProgram, QE.gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);
            }
            else if (programLog !== '') {
                console.error('THREE.WebGLProgram: shader error: ', QE.gl.getError(), 'gl.VALIDATE_STATUS', QE.gl.getProgramParameter(webglProgram, QE.gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);
            }
            QE.gl.deleteShader(glVertexShader);
            QE.gl.deleteShader(glFragmentShader);
            this.webglProgram = webglProgram;
            GLShaderProgram.GLProgramCount++;
        }
        GLShaderProgram.prototype.apply = function () {
            if (this.webglProgram) {
                QE.gl.useProgram(this.webglProgram);
            }
        };
        GLShaderProgram.prototype.isDestroyed = function () {
            return true;
        };
        GLShaderProgram.prototype.destroy = function () {
            if (this.webglProgram) {
                QE.gl.deleteProgram(this.webglProgram);
                this.webglProgram = undefined;
                GLShaderProgram.GLProgramCount--;
            }
            this.vsCode = undefined;
            this.fsCode = undefined;
        };
        GLShaderProgram.GLProgramCount = 0;
        return GLShaderProgram;
    }());
    QE.GLShaderProgram = GLShaderProgram;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Shader = /** @class */ (function () {
        function Shader(name, passes) {
            this._name = name;
            this.shaderPasses = passes || [];
        }
        Shader.prototype.getName = function () {
            return this._name;
        };
        Shader.prototype.addPass = function (pass) {
            this.shaderPasses.push(pass);
        };
        return Shader;
    }());
    QE.Shader = Shader;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var ShaderChunks;
    (function (ShaderChunks) {
        // json
        /*
        {
            attributes: [
                type,
            ],
            unifroms: [
                {
                    name:"xxx",
                    type:"xxx",
                    default:"xxx",
                }
            ],
            vsCode: string,
            fsCode: string,
    
            pass: [
    
            ]
        }
        */
        ShaderChunks.defaultSpriteShadervs = "\n        attribute vec3 a_position;\n        attribute vec4 a_color;\n        attribute vec2 a_texCoord0;\n        uniform mat4 mvpMatrix;\n        varying vec4 v_color;\n        varying vec2 v_texCoord0;\n        void main(void){\n            v_color = a_color;\n            v_texCoord0 = a_texCoord0;\n\t        gl_Position = mvpMatrix * vec4(a_position, 1.0);\n        }";
        ShaderChunks.defaultSpriteShaderfs = "\n        precision mediump float;\n        uniform sampler2D texture0;\n        varying vec4 v_color;\n        varying vec2 v_texCoord0;\n        void main(void) {\n            vec4 col = texture2D(texture0, v_texCoord0);\n\t        gl_FragColor = col * v_color;\n        }";
        ShaderChunks.BaseMeshShadervs = "\n        attribute vec3 a_position;\n        attribute vec4 a_color;\n        attribute vec2 a_texCoord0;\n        attribute vec3 a_normal;\n        uniform vec3 u_lightColor;\n        uniform vec3 u_lightDirection;\n        uniform mat4 mvpMatrix;\n        varying vec2 v_texCoord0;\n        varying vec4 v_color;\n        void main(void){\n            gl_Position = mvpMatrix * vec4(a_position, 1.0);\n\n            v_texCoord0 = a_texCoord0;\n\n            vec3 normal = normalize(vec3(mvpMatrix * vec4(a_normal, 1.0)));\n            float nDotL = max(dot(u_lightDirection, normal), 0.0);\n            vec3 diffuse = u_lightColor * a_color.rgb * nDotL;\n            vec3 ambient = vec3(0.2, 0.2, 0.2) * a_color.rgb;\n         //   v_color = vec4(diffuse + ambient, a_color.a);\n        //    v_color = vec4(diffuse, a_color.a);\n            v_color = a_color;\n        }";
        ShaderChunks.BaseMeshShaderfs = "\n        precision mediump float;\n        uniform sampler2D texture0;\n        varying vec4 v_color;\n        varying vec2 v_texCoord0;\n        void main(void) {\n            vec4 col = texture2D(texture0, v_texCoord0);\n            gl_FragColor = col * v_color;\n        }";
    })(ShaderChunks = QE.ShaderChunks || (QE.ShaderChunks = {}));
})(QE || (QE = {}));
var QE;
(function (QE) {
    var WebGLBufferManager = /** @class */ (function () {
        function WebGLBufferManager() {
            this._indexBuffers = [];
            this._vertexBuffers = [];
        }
        Object.defineProperty(WebGLBufferManager, "instance", {
            get: function () {
                if (!WebGLBufferManager._sInstance) {
                    WebGLBufferManager._sInstance = new WebGLBufferManager();
                }
                return this._sInstance;
            },
            enumerable: true,
            configurable: true
        });
        WebGLBufferManager.getGLUsage = function (usage) {
            switch (usage) {
                case 1 /* STATIC */:
                    return QE.gl.STATIC_DRAW;
                case 2 /* DYNAMIC */:
                    return QE.gl.DYNAMIC_DRAW;
                case 8 /* DISCARDABLE */:
                    return QE.gl.STREAM_DRAW;
                default:
                    return QE.gl.DYNAMIC_DRAW;
            }
        };
        WebGLBufferManager.prototype.init = function () {
        };
        WebGLBufferManager.prototype.createIndexBuffer = function (numIndexes, usage, useShadowBuffer) {
            var buf = new QE.WebGLIndexBuffer(numIndexes, usage, useShadowBuffer);
            this._indexBuffers.push(buf);
            return buf;
        };
        WebGLBufferManager.prototype.createVertexBuffer = function (stride, count, normalize, usage) {
            var buf = new QE.WebGLVertexBuffer(stride, count, normalize, usage);
            this._vertexBuffers.push(buf);
            return buf;
        };
        return WebGLBufferManager;
    }());
    QE.WebGLBufferManager = WebGLBufferManager;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var WebGLIndexBuffer = /** @class */ (function () {
        function WebGLIndexBuffer(numIndexes, usage, useShadowBuffer) {
            this._data = new Uint16Array(numIndexes);
            this._count = numIndexes;
            this._usage = usage;
            this.createBuffer();
        }
        Object.defineProperty(WebGLIndexBuffer.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        WebGLIndexBuffer.prototype.createBuffer = function () {
            var buffer = QE.gl.createBuffer();
            if (!buffer) {
                throw new Error('Failed to create buffer');
            }
            this._buffer = buffer;
        };
        WebGLIndexBuffer.prototype.getGLIndexBuffer = function () {
            return this._buffer;
        };
        WebGLIndexBuffer.prototype.dispose = function () {
            if (this._buffer) {
                QE.gl.deleteBuffer(this._buffer);
                this._buffer = undefined;
            }
            if (this._data) {
                this._data = undefined;
            }
        };
        WebGLIndexBuffer.prototype.writeData = function (data) {
            this._data.set(data);
        };
        WebGLIndexBuffer.prototype.bindBuffer = function () {
            if (!this._buffer || !this._data) {
                return;
            }
            QE.gl.bindBuffer(QE.gl.ELEMENT_ARRAY_BUFFER, this._buffer);
            QE.gl.bufferData(QE.gl.ELEMENT_ARRAY_BUFFER, this._data, QE.WebGLBufferManager.getGLUsage(this._usage));
        };
        return WebGLIndexBuffer;
    }());
    QE.WebGLIndexBuffer = WebGLIndexBuffer;
})(QE || (QE = {}));
///<reference path="../RenderSystem.ts" />
var QE;
///<reference path="../RenderSystem.ts" />
(function (QE) {
    function GL_CHECK_ERROR() {
        if (QE.__QE_DEBUG__) {
            console.assert(QE.gl.getError() === 0);
        }
    }
    QE.GL_CHECK_ERROR = GL_CHECK_ERROR;
    /**
     * @deprecated 不会有多种类型渲染器
     */
    var WebGLRendererSystem = /** @class */ (function (_super) {
        __extends(WebGLRendererSystem, _super);
        function WebGLRendererSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return WebGLRendererSystem;
    }(QE.RenderSystem));
    QE.WebGLRendererSystem = WebGLRendererSystem;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var WebGLVertexBuffer = /** @class */ (function () {
        /**
         *
         * @param stride 相邻两个顶点间的字节数
         * @param size 缓冲区中每个顶点分量个数 (1-4)
         * @param usage
         */
        function WebGLVertexBuffer(stride, size, normalize, usage) {
            this.vertexCount = 0;
            this._stride = stride;
            this._size = size;
            this._usage = usage;
            this._normalized = normalize;
            this.createBuffer();
        }
        WebGLVertexBuffer.prototype.isDestroyed = function () {
            return false;
        };
        WebGLVertexBuffer.prototype.destroy = function () {
            if (this._data) {
                this._data = undefined;
            }
            this.destroyBuffer();
        };
        WebGLVertexBuffer.prototype.getGLBuffer = function () {
            return this.webGLBuffer;
        };
        WebGLVertexBuffer.prototype.createBuffer = function () {
            var buf = QE.gl.createBuffer();
            if (QE.__QE_DEBUG__) {
                QE.GL_CHECK_ERROR();
            }
            if (!buf) {
                throw new Error('无法创建WebGLBuffer');
            }
            this.webGLBuffer = buf;
        };
        WebGLVertexBuffer.prototype.destroyBuffer = function () {
            if (this.webGLBuffer) {
                QE.gl.deleteBuffer(this.webGLBuffer);
                this.webGLBuffer = undefined;
                if (QE.__QE_DEBUG__) {
                    QE.GL_CHECK_ERROR();
                }
            }
        };
        WebGLVertexBuffer.prototype.writeData = function (data) {
            this._data = data;
        };
        WebGLVertexBuffer.prototype.bindBuffer = function () {
            if (!this.webGLBuffer || !this._data) {
                return;
            }
            QE.gl.bindBuffer(QE.gl.ARRAY_BUFFER, this.webGLBuffer);
            QE.gl.bufferData(QE.gl.ARRAY_BUFFER, this._data, QE.WebGLBufferManager.getGLUsage(this._usage));
        };
        return WebGLVertexBuffer;
    }());
    QE.WebGLVertexBuffer = WebGLVertexBuffer;
})(QE || (QE = {}));
///<reference path="Resource.ts"/>
var QE;
///<reference path="Resource.ts"/>
(function (QE) {
    var TextResource = /** @class */ (function (_super) {
        __extends(TextResource, _super);
        function TextResource() {
            var _this = _super.call(this) || this;
            _this._text = '';
            return _this;
        }
        Object.defineProperty(TextResource.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (txt) {
                this._text = txt;
            },
            enumerable: true,
            configurable: true
        });
        TextResource.prototype.clone = function () {
            var obj = new TextResource();
            obj._text = this._text;
            return obj;
        };
        return TextResource;
    }(QE.Resource));
    QE.TextResource = TextResource;
})(QE || (QE = {}));
/**
 *  -
 *
 * create by wjl at
 *
 */ 
/**
 *  -
 *
 * create by wjl at
 *
 */ 
/**
 *  -
 *
 * create by wjl at
 *
 */ 
/**
 *  -
 *
 * create by wjl at
 *
 */ 
/**
 *  -
 *
 * create by wjl at
 *
 */ 
/**
 *  -
 *
 * create by wjl at
 *
 */ 
/**
 *  -
 *
 * create by wjl at
 *
 */ 
var QE;
(function (QE) {
    var TextResourceLoader = /** @class */ (function () {
        function TextResourceLoader() {
            this._isLoading = false;
        }
        TextResourceLoader.prototype.load = function (path, onEnd, onProgress) {
            var res = new QE.TextResource();
            if (this._isLoading) {
                this._tasks.push(onEnd);
                return this._res;
            }
            this._res = res;
            QE.Http.loadTxtAsync(path)
                .then(function (value) {
                res.text = value;
                if (onEnd) {
                    onEnd(null, res);
                }
            })
                .catch(function (reason) {
                if (onEnd) {
                    onEnd(reason);
                }
            });
            return res;
        };
        TextResourceLoader.instance = new TextResourceLoader();
        return TextResourceLoader;
    }());
    QE.TextResourceLoader = TextResourceLoader;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var TextureLoader = /** @class */ (function () {
        function TextureLoader() {
        }
        TextureLoader.prototype.load = function (path, onEnd, onProgress) {
            var res = new QE.Texture();
            QE.Http.loadImageAsync(path)
                .then(function (value) {
                res.loadImage(value);
                if (onEnd) {
                    onEnd(null, res);
                }
            })
                .catch(function (reason) {
                if (onEnd) {
                    onEnd(reason);
                }
            });
            return res;
        };
        TextureLoader.instance = new TextureLoader();
        return TextureLoader;
    }());
    QE.TextureLoader = TextureLoader;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var FbxPrefab = /** @class */ (function () {
        function FbxPrefab() {
        }
        FbxPrefab.prototype.load = function (json) {
        };
        return FbxPrefab;
    }());
})(QE || (QE = {}));
var QE;
(function (QE) {
    /*
       1-------2
      /|      /|
     / |     / |
    5-------4  |
    |  0----|--3
    | /     | /
    |/      |/
    6-------7
    */
    QE.CUBE_SIZE = 1.0;
    QE.CUBE_HALF_SIZE = QE.CUBE_SIZE / 2.0;
    QE.CubeMeshData = {
        vertices: [
            // front side
            -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
            QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
            QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
            -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
            // back side
            QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            // left side
            -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
            -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
            -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            // right side
            QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
            QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
            // up side
            -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
            QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
            QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            // down side
            -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE,
            QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
            -QE.CUBE_HALF_SIZE, -QE.CUBE_HALF_SIZE, QE.CUBE_HALF_SIZE,
        ],
        colors: [
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
        ],
        indices: [
            // front
            0, 1, 2,
            0, 2, 3,
            // back
            4, 5, 6,
            4, 6, 7,
            // left
            8, 9, 10,
            8, 10, 11,
            // right
            12, 13, 14,
            12, 14, 15,
            // up
            16, 17, 18,
            16, 18, 19,
            // down
            20, 21, 22,
            20, 22, 23
        ],
        normals: [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0
        ],
        uvs: [
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            1, 0,
            0, 0
        ]
    };
    var PrefabFactory = /** @class */ (function () {
        function PrefabFactory() {
        }
        PrefabFactory.createCube = function (mesh) {
            var subMesh = new QE.SubMesh();
            mesh.addSubMesh(subMesh);
            var posBuf = QE.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            posBuf.type = QE.gl.FLOAT;
            posBuf.semantic = 1 /* POSITION */;
            posBuf.vertexCount = QE.CubeMeshData.vertices.length;
            posBuf.writeData((new Float32Array(QE.CubeMeshData.vertices)).buffer);
            posBuf.bindBuffer();
            var colBuf = QE.WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, 1 /* STATIC */);
            colBuf.type = QE.gl.UNSIGNED_BYTE;
            colBuf.semantic = 5 /* DIFFUSE */;
            colBuf.vertexCount = QE.CubeMeshData.colors.length;
            colBuf.writeData((new Uint8Array(QE.CubeMeshData.colors)).buffer);
            colBuf.bindBuffer();
            var normalBuf = QE.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            normalBuf.type = QE.gl.FLOAT;
            normalBuf.semantic = 4 /* NORMAL */;
            normalBuf.vertexCount = QE.CubeMeshData.normals.length;
            normalBuf.writeData((new Float32Array(QE.CubeMeshData.normals)).buffer);
            normalBuf.bindBuffer();
            var uvBuf = QE.WebGLBufferManager.instance.createVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, 1 /* STATIC */);
            uvBuf.type = QE.gl.FLOAT;
            uvBuf.semantic = 7 /* TEXTURE_COORDINATES */;
            normalBuf.vertexCount = QE.CubeMeshData.uvs.length;
            uvBuf.writeData((new Float32Array(QE.CubeMeshData.uvs)).buffer);
            uvBuf.bindBuffer();
            var vertexData = [];
            vertexData[0] = posBuf;
            vertexData[1] = colBuf;
            vertexData[2] = normalBuf;
            vertexData[3] = uvBuf;
            subMesh.vertexData = vertexData;
            var indicesBuf = QE.WebGLBufferManager.instance.createIndexBuffer(QE.CubeMeshData.indices.length, 1 /* STATIC */, false);
            indicesBuf.writeData(QE.CubeMeshData.indices);
            indicesBuf.bindBuffer();
            subMesh.indexData = indicesBuf;
        };
        PrefabFactory.createSphere = function (mesh) {
            var NUM_SEGMENTS = 24;
            var NUM_RINGS = 24;
            var SPHERE_RADIUS = 1;
            var subMesh = new QE.SubMesh();
            mesh.addSubMesh(subMesh);
            var deltaRingAngle = (Math.PI / NUM_RINGS);
            var deltaSegAngle = (2 * Math.PI / NUM_SEGMENTS);
            var verticeIndex = 0;
            var vertices = [], normals = [], uvs = [], colors = [], indices = [];
            var vCount = 0;
            for (var ring = 0; ring <= NUM_RINGS; ring++) {
                var r0 = SPHERE_RADIUS * Math.sin(ring * deltaRingAngle);
                var y0 = SPHERE_RADIUS * Math.cos(ring * deltaRingAngle);
                // Generate the group of segments for the current ring
                for (var seg = 0; seg <= NUM_SEGMENTS; seg++) {
                    var x0 = r0 * Math.sin(seg * deltaSegAngle);
                    var z0 = r0 * Math.cos(seg * deltaSegAngle);
                    // Add one vertex to the strip which makes up the sphere
                    vertices[vCount * 3 + 0] = x0;
                    vertices[vCount * 3 + 1] = y0;
                    vertices[vCount * 3 + 2] = z0;
                    var vNormal = new QE.Vector3(x0, y0, z0).normalize();
                    normals[vCount * 3 + 0] = vNormal.x;
                    normals[vCount * 3 + 1] = vNormal.y;
                    normals[vCount * 3 + 2] = vNormal.z;
                    colors[vCount * 4 + 0] = 255.0;
                    colors[vCount * 4 + 1] = 255.0;
                    colors[vCount * 4 + 2] = 255.0;
                    colors[vCount * 4 + 3] = 255.0;
                    uvs[vCount * 2 + 0] = seg / NUM_SEGMENTS;
                    uvs[vCount * 2 + 1] = ring / NUM_RINGS;
                    if (ring != NUM_RINGS) {
                        // each vertex (except the last) has six indicies pointing to it
                        indices[verticeIndex * 6 + 0] = verticeIndex + NUM_SEGMENTS + 1;
                        indices[verticeIndex * 6 + 1] = verticeIndex;
                        indices[verticeIndex * 6 + 2] = verticeIndex + NUM_SEGMENTS;
                        indices[verticeIndex * 6 + 3] = verticeIndex + NUM_SEGMENTS + 1;
                        indices[verticeIndex * 6 + 4] = verticeIndex + 1;
                        indices[verticeIndex * 6 + 5] = verticeIndex;
                        verticeIndex++;
                    }
                    vCount++;
                }
                // end for seg
            } // end for ring
            var posBuf = QE.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            posBuf.type = QE.gl.FLOAT;
            posBuf.semantic = 1 /* POSITION */;
            posBuf.vertexCount = vertices.length;
            posBuf.writeData((new Float32Array(vertices)).buffer);
            posBuf.bindBuffer();
            var colorBuf = QE.WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, 1 /* STATIC */);
            colorBuf.type = QE.gl.UNSIGNED_BYTE;
            colorBuf.semantic = 5 /* DIFFUSE */;
            colorBuf.vertexCount = colors.length;
            colorBuf.writeData((new Uint8Array(colors)).buffer);
            colorBuf.bindBuffer();
            var normalBuf = QE.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            normalBuf.type = QE.gl.FLOAT;
            normalBuf.semantic = 4 /* NORMAL */;
            normalBuf.vertexCount = normals.length;
            normalBuf.writeData((new Float32Array(normals)).buffer);
            normalBuf.bindBuffer();
            var uvBuf = QE.WebGLBufferManager.instance.createVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, 1 /* STATIC */);
            uvBuf.type = QE.gl.FLOAT;
            uvBuf.semantic = 7 /* TEXTURE_COORDINATES */;
            normalBuf.vertexCount = uvs.length;
            uvBuf.writeData((new Float32Array(uvs)).buffer);
            uvBuf.bindBuffer();
            var vertexData = [];
            vertexData[0] = posBuf;
            vertexData[1] = colorBuf;
            vertexData[2] = normalBuf;
            vertexData[3] = uvBuf;
            subMesh.vertexData = vertexData;
            var indicesBuf = QE.WebGLBufferManager.instance.createIndexBuffer(indices.length, 1 /* STATIC */, false);
            indicesBuf.writeData(indices);
            indicesBuf.bindBuffer();
            subMesh.indexData = indicesBuf;
        };
        return PrefabFactory;
    }());
    QE.PrefabFactory = PrefabFactory;
})(QE || (QE = {}));
var QE;
(function (QE) {
    var Reflection;
    (function (Reflection) {
        var Type = /** @class */ (function () {
            function Type(cls) {
                console.assert(!!cls, '类参数不能为空');
                this._cls = cls;
            }
            Object.defineProperty(Type.prototype, "baseType", {
                /**
                 * 返回当前类型的上一层继承类型
                 *@return {Function}
                 */
                get: function () {
                    var proto = this._cls.prototype;
                    if (!proto) {
                        return undefined;
                    }
                    var parentProto = Object.getPrototypeOf(proto);
                    if (parentProto) {
                        return parentProto.constructor;
                    }
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Type.getType = function (instance) {
                return new Type(instance.constructor);
            };
            Type.typeOf = function (cls) {
                return new Type(cls);
            };
            Type.prototype.getConstructor = function () {
                return this._cls;
            };
            Type.prototype.isSubClassOf = function (superClass) {
                return superClass._cls.prototype.isPrototypeOf(this._cls);
            };
            Type.prototype.equal = function (type) {
                return this._cls === type._cls;
            };
            return Type;
        }());
        Reflection.Type = Type;
    })(Reflection = QE.Reflection || (QE.Reflection = {}));
})(QE || (QE = {}));
