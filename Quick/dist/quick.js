var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var QuickEngine;
(function (QuickEngine) {
    QuickEngine.__EDITOR_MODE__ = false;
    QuickEngine.__DEBUG__ = true;
    QuickEngine.__PROFILER__ = true;
})(QuickEngine || (QuickEngine = {}));
//https://github.com/jsdoc3/jsdoc
var QuickEngine;
//https://github.com/jsdoc3/jsdoc
(function (QuickEngine) {
    function run(data) {
        new QuickEngine.WebGLBufferManager();
        new QuickEngine.RenderSystem(data.div);
        new QuickEngine.SceneManager();
        window.onresize = (ev) => {
            let w = window.innerWidth;
            let h = window.innerHeight;
            onResize(w, h);
        };
        // 准备内置资源
        QuickEngine.ResourceManager.instance.makeBuiltinRes(function () {
            onResize(window.innerWidth, window.innerHeight);
            frameUpdate(0);
            data.onEnginePrepared && data.onEnginePrepared();
        });
    }
    QuickEngine.run = run;
    function frameUpdate(deltaTime) {
        renderOneFrame(deltaTime / 1000);
        requestAnimationFrame(frameUpdate);
    }
    function renderOneFrame(deltaTime) {
        let mainScene = QuickEngine.SceneManager.instance.currentScene;
        if (!mainScene) {
            return;
        }
        mainScene.update(deltaTime);
        QuickEngine.RenderSystem.instance.beginScene();
        mainScene.render();
        QuickEngine.RenderSystem.instance.endScene();
        //mainScene.fixedUpdate(dt);
    }
    QuickEngine.renderOneFrame = renderOneFrame;
    function onResize(w, h) {
        QuickEngine.Screen.screenWidth = w;
        QuickEngine.Screen.screenHeight = h;
        QuickEngine.SceneManager.instance.currentScene.onResize(w, h);
        QuickEngine.RenderSystem.instance.onResize(w, h);
    }
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    /**
     * @private
     * 哈希计数
     */
    let _hashCount = 1;
    let _instanceId = 1;
    class HashObject {
        constructor() {
            this._isDestroyed = false;
            this._hashCode = _hashCount++;
            this._instanceId = _instanceId++;
        }
        get hashCode() {
            return this._hashCode;
        }
        get instanceId() {
            return this._instanceId;
        }
        isDestroyed() {
            return this._isDestroyed;
        }
        destroy() {
            if (this._isDestroyed) {
                console.warn('重复调用destroy!');
                return;
            }
            this.onDestroy();
            this._isDestroyed = true;
        }
        onDestroy() {
        }
        copy(object) {
        }
        clone() {
            let newObj = new HashObject();
            newObj.copy(this);
            return newObj;
        }
        static destroy(object) {
            object.destroy();
        }
        static clone(original) {
            return original.clone();
        }
    }
    QuickEngine.HashObject = HashObject;
})(QuickEngine || (QuickEngine = {}));
///<reference path="core/HashObject.ts" />
var QuickEngine;
///<reference path="core/HashObject.ts" />
(function (QuickEngine) {
    class Scene3D extends QuickEngine.HashObject {
        constructor() {
            super();
            this._cameras = [];
            this._frameId = 0;
            this._rootChildren = [];
            let mainCamera = this.createNode().addComponent(QuickEngine.Camera.prototype.constructor);
            mainCamera.setAspect(1280 / 720);
            mainCamera.setOrthoWidth(1280);
            mainCamera.setOrthoHeight(720);
            mainCamera.setCameraType(0 /* Perspective */);
            QuickEngine.Camera.MainCamera = mainCamera;
            this._mainCamera = mainCamera;
            this._cameras = [mainCamera];
        }
        get children() {
            return this._rootChildren;
        }
        createNode(parent) {
            let node = new QuickEngine.Node();
            let transform = node.addComponent(QuickEngine.Transform);
            this._rootChildren.push(node);
            if (parent) {
                transform.parent = parent;
            }
            return node;
        }
        insertNode(node, index) {
            let children = this._rootChildren;
            if (QuickEngine.__DEBUG__ && children.indexOf(node) !== -1) {
                console.error("node already in the scene");
            }
            if (index !== undefined) {
                if (QuickEngine.__DEBUG__) {
                    console.assert(!isNaN(index) && typeof (index) === "number", "the index is error" + index);
                }
                if (index < 0 || index >= children.length) {
                    console.error("insert node failed. the index is error: " + index);
                    return;
                }
                children.splice(index, 0, node);
            }
            else {
                children.push(node);
            }
        }
        removeNode(node) {
            let children = this._rootChildren;
            if (QuickEngine.__DEBUG__ && children.indexOf(node) == -1) {
                console.error("node not in the scene");
            }
            children.splice(children.indexOf(node), 1);
        }
        onResize(w, h) {
            let mainCamera = this._mainCamera;
            if (mainCamera) {
                mainCamera.setAspect(w / h);
                mainCamera.setOrthoWidth(w);
                mainCamera.setOrthoHeight(h);
            }
        }
        render() {
            let cameras = this._cameras;
            for (let i = 0, len = cameras.length; i < len; i++) {
                let camera = cameras[i];
                this._currentCamera = camera;
                camera.renderContext.doRender();
            }
            this._currentCamera = null;
            QuickEngine.RenderSystem.instance.setRenderTarget(null);
            this._frameId++;
        }
        update(deltaTime) {
            QuickEngine.Component.load();
            QuickEngine.Component.update(deltaTime);
            let children = this._rootChildren;
            // 更新动画?
            for (let i = 0, len = children.length; i < len; i++) {
                children[i].transform.update(true, true);
            }
        }
    }
    QuickEngine.Scene3D = Scene3D;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class SceneManager {
        constructor() {
            SceneManager._sInstance = this;
            // 创建默认场景
            this._currentScene = SceneManager.createScene();
        }
        static get instance() {
            console.assert(!!SceneManager._sInstance);
            return this._sInstance;
        }
        get currentScene() {
            return this._currentScene;
        }
        static createScene() {
            return new QuickEngine.Scene3D();
        }
    }
    QuickEngine.SceneManager = SceneManager;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Screen {
    }
    Screen.screenWidth = 0;
    Screen.screenHeight = 0;
    QuickEngine.Screen = Screen;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    function assert(cond, msg) {
    }
    QuickEngine.assert = assert;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Dictionary {
        constructor(useOrderList = false) {
            this.data = {};
            this.list = new Array();
            if (useOrderList) {
                this.list = new Array();
            }
        }
        containsKey(key) {
            if (this.data[key])
                return true;
            return false;
        }
        getValue(key) {
            return this.data[key];
        }
        getKeys() {
            return Object.keys(this.data);
        }
        getValues() {
            return this.list;
        }
        add(key, value) {
            this.data[key] = value;
            if (this.list) {
                this.list.push(value);
            }
        }
        remove(key) {
            if (this.list) {
                let index = this.list.indexOf(this.data[key]);
                if (index != -1) {
                    this.list.splice(index);
                }
            }
            delete this.data[key];
        }
        dispose() {
            delete this.data;
            delete this.list;
        }
    }
    QuickEngine.Dictionary = Dictionary;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class QuickListener {
        constructor(listener, func) {
            this._listener = listener;
            this._func = func;
        }
        onCall() {
            this._func.call(this._listener);
        }
    }
    QuickEngine.QuickListener = QuickListener;
    class QuickEvent {
        constructor() {
            this._listeners = [];
        }
        add(listener) {
            this._listeners.push(listener);
        }
        del(listener) {
            let idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        }
        clear() {
            this._listeners = [];
        }
        dispatchEvent() {
            let listeners = this._listeners;
            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall();
            }
        }
    }
    QuickEngine.QuickEvent = QuickEvent;
    class QuickListener1 {
        constructor(listener, func) {
            this._listener = listener;
            this._func = func;
        }
        onCall(p) {
            this._func.call(this._listener, p);
        }
    }
    QuickEngine.QuickListener1 = QuickListener1;
    class QuickEvent1 {
        constructor() {
            this._listeners = [];
        }
        add(listener) {
            this._listeners.push(listener);
        }
        del(listener) {
            let idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        }
        clear() {
            this._listeners = [];
        }
        dispatchEvent(t) {
            let listeners = this._listeners;
            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(t);
            }
        }
    }
    QuickEngine.QuickEvent1 = QuickEvent1;
    class QuickListener2 {
        constructor(listener, func) {
            this._listener = listener;
            this._func = func;
        }
        onCall(p1, p2) {
            this._func.call(this._listener, p1, p2);
        }
    }
    QuickEngine.QuickListener2 = QuickListener2;
    class QuickEvent2 {
        constructor() {
            this._listeners = [];
        }
        add(listener) {
            this._listeners.push(listener);
        }
        del(listener) {
            let idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        }
        clear() {
            this._listeners = [];
        }
        dispatchEvent(p1, p2) {
            let listeners = this._listeners;
            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(p1, p2);
            }
        }
    }
    QuickEngine.QuickEvent2 = QuickEvent2;
    class QuickListener3 {
        constructor(listener, func) {
            this._listener = listener;
            this._func = func;
        }
        onCall(p1, p2, p3) {
            this._func.call(this._listener, p1, p2, p3);
        }
    }
    QuickEngine.QuickListener3 = QuickListener3;
    class QuickEvent3 {
        constructor() {
            this._listeners = [];
        }
        add(listener) {
            this._listeners.push(listener);
        }
        del(listener) {
            let idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        }
        clear() {
            this._listeners = [];
        }
        dispatchEvent(p1, p2, p3) {
            let listeners = this._listeners;
            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(p1, p2, p3);
            }
        }
    }
    QuickEngine.QuickEvent3 = QuickEvent3;
    class QuickListener4 {
        constructor(listener, func) {
            this._listener = listener;
            this._func = func;
        }
        onCall(p1, p2, p3, p4) {
            this._func.call(this._listener, p1, p2, p3, p4);
        }
    }
    QuickEngine.QuickListener4 = QuickListener4;
    class QuickEvent4 {
        constructor() {
            this._listeners = [];
        }
        add(listener) {
            this._listeners.push(listener);
        }
        del(listener) {
            let idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        }
        clear() {
            this._listeners = [];
        }
        dispatchEvent(p1, p2, p3, p4) {
            let listeners = this._listeners;
            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(p1, p2, p3, p4);
            }
        }
    }
    QuickEngine.QuickEvent4 = QuickEvent4;
    // ===================  Event4  ===================
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Log {
        static D(...args) {
            console.log.apply(this, arguments);
        }
        static I(...args) {
            console.info.apply(this, arguments);
        }
        static W(...args) {
            console.warn.apply(this, arguments);
        }
        static E(...args) {
            console.error.apply(this, arguments);
        }
        static F(...args) {
            console.error.apply(this, arguments);
        }
    }
    QuickEngine.Log = Log;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    /**
     * 最小堆
     */
    class MinHeap {
        constructor(comparer) {
            this._heap = [];
            this._length = 0;
            this._comparer = comparer;
        }
        /**
         * 元素入队
         * @param x
         */
        enqueue(x) {
            this._heap.push(x);
            this.filterUp(this._length);
            this._length++;
            return true;
        }
        /**
         * 最小元素出队
         */
        dequeue() {
            let heap = this._heap;
            let x = heap[0];
            heap[0] = heap[this._length - 1];
            this._length--;
            this.filterDown(0, this._length - 1); //调整新的根节点
            return x;
        }
        /**
         * 查看最小元素
         */
        peek() {
            return this._heap[0];
        }
        /**
         * 堆元素数量
         */
        count() {
            return this._length;
        }
        /**
         * 清空队列
         */
        clear() {
            this._heap = [];
            this._length = 0;
        }
        filterDown(start, end) {
            let i = start, j = 2 * i + 1;
            let heap = this._heap;
            let temp = heap[i];
            let comparer = this._comparer;
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
        }
        filterUp(start) {
            let j = start, i = Math.floor((j - 1) * 0.5); //i指向j的双亲节点
            let heap = this._heap;
            let temp = heap[j];
            let comparer = this._comparer;
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
        }
    }
    QuickEngine.MinHeap = MinHeap;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    let Reflection;
    (function (Reflection) {
        class Type {
            constructor(cls) {
                console.assert(!!cls, "类参数不能为空");
                this._cls = cls;
            }
            /**
             * 返回当前类型的上一层继承类型
             *@return {Function}
             */
            get baseType() {
                let proto = this._cls.prototype;
                if (!proto) {
                    return undefined;
                }
                let parentProto = Object.getPrototypeOf(proto);
                if (parentProto) {
                    return parentProto.constructor;
                }
                return undefined;
            }
            getConstructor() {
                return this._cls;
            }
            static getType(instance) {
                return new Type(instance.constructor);
            }
            static typeOf(cls) {
                return new Type(cls);
            }
            isSubClassOf(superClass) {
                return superClass._cls.prototype.isPrototypeOf(this._cls);
            }
            equal(type) {
                return this._cls == type._cls;
            }
        }
        Reflection.Type = Type;
    })(Reflection = QuickEngine.Reflection || (QuickEngine.Reflection = {}));
})(QuickEngine || (QuickEngine = {}));
///<reference path="../utils/Reflection.ts"/>
var QuickEngine;
///<reference path="../utils/Reflection.ts"/>
(function (QuickEngine) {
    class ResourceManager {
        constructor() {
            this._resourceCacheMap = new QuickEngine.Dictionary();
        }
        /**
         * 构建引擎内置资源
         * @param onFinished
         */
        makeBuiltinRes(onFinished) {
            let tex = new QuickEngine.Texture(ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME);
            tex.mipmaps = 0;
            tex.format = 4 /* RGBA */;
            tex.usage = 1 /* STATIC */;
            tex.loadRawData((new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255])).buffer, 2, 2);
            this._resourceCacheMap.add(ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME, tex);
            onFinished && onFinished.call(this);
        }
        get(path) {
            return this._resourceCacheMap.getValue(path);
        }
        load(path, type) {
            let res = this._resourceCacheMap.getValue(path);
            if (res && res.state != 0 /* UnLoaded */) {
                return res;
            }
            // @ts-ignore
            res = new (type.getConstructor())(path);
            this._resourceCacheMap.add(path, res);
            res.load();
            return res;
        }
        loadAsync(path, type) {
            return __awaiter(this, void 0, void 0, function* () {
                let res = this._resourceCacheMap.getValue(path);
                if (res && res.state != 0 /* UnLoaded */) {
                    return res;
                }
                // @ts-ignore
                res = new (type.getConstructor())(path);
                this._resourceCacheMap.add(path, res);
                let promise = new Promise(function (resolve, reject) {
                    res.load();
                    let listener = new QuickEngine.QuickListener1(this, function (data) {
                        res._loadedEvent.del(listener);
                        if (data) {
                            resolve(data);
                        }
                        else {
                            reject('load async failed: ' + path);
                        }
                    });
                    res._loadedEvent.add(listener);
                });
                return promise;
            });
        }
        reload(url, type) {
            this.unload(url);
            return this.load(url, type);
        }
        unload(url) {
            let res = this._resourceCacheMap.getValue(url);
            if (!res) {
                return;
            }
            this._resourceCacheMap.remove(url);
            res.unload();
        }
    }
    ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME = "__builtin_defWhiteTex";
    ResourceManager.instance = new ResourceManager();
    QuickEngine.ResourceManager = ResourceManager;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../core/HashObject.ts" />
///<reference path="ResourceManager.ts" />
var QuickEngine;
///<reference path="../core/HashObject.ts" />
///<reference path="ResourceManager.ts" />
(function (QuickEngine) {
    class RefObj extends QuickEngine.HashObject {
        constructor() {
            super();
            this._retainCount = 1;
        }
        get retainCount() {
            return this._retainCount;
        }
        retain() {
            this._retainCount++;
        }
        release() {
            console.assert(this._retainCount > 0, "retain count must greater than 0");
            this._retainCount--;
            if (this._retainCount == 0) {
                this.dispose();
            }
        }
        dispose() {
        }
    }
    QuickEngine.RefObj = RefObj;
    class ResourceDependence extends QuickEngine.HashObject {
        constructor(mainRes, subRes) {
            super();
            this._mainRes = mainRes;
            this._subRes = subRes;
            this._listener = new QuickEngine.QuickListener(this, ResourceDependence.prototype._onLoaded);
            subRes._loadedEvent.add(this._listener);
        }
        getMainRes() {
            return this._mainRes;
        }
        getSubRes() {
            return this._subRes;
        }
        destroy() {
            super.destroy();
            this._subRes._loadedEvent.del(this._listener);
            this._listener = null;
            this._subRes = null;
            this._mainRes = null;
        }
        _onLoaded() {
            this._mainRes._removeDependence(this._subRes);
        }
    }
    // Font,Shader,Material,Mesh,Skeleton,Texture,Audio,Video
    class Resource extends RefObj {
        constructor(name, group) {
            super();
            this._isDisposed = false;
            this._dependenceFiles = [];
            this._state = 0 /* UnLoaded */;
            this._loadedEvent = new QuickEngine.QuickEvent1();
            this._unloadedEvent = new QuickEngine.QuickEvent1();
            this._name = name;
            this._group = group;
        }
        get name() {
            return this._name;
        }
        set name(name) {
            this._name = name;
        }
        get priority() {
            return this._priority;
        }
        set priority(priority) {
            this._priority = priority;
        }
        get state() {
            return this._state;
        }
        get isComplete() {
            return this._state == 2 /* Loaded */;
        }
        isDestroyed() {
            return this._isDisposed;
        }
        destroy() {
            this._isDisposed = true;
        }
        copy(object) {
            super.copy(object);
        }
        load(data) {
            // 已经加载
            if (this._state == 2 /* Loaded */ || this._state == 1 /* Loading */) {
                return;
            }
            this._state = 1 /* Loading */;
            this.loadImpl(data);
        }
        unload() {
            if (this._state != 2 /* Loaded */) {
                return;
            }
            this.unloadImpl();
        }
        reload() {
        }
        _onLoad() {
            this._loadedEvent.dispatchEvent(this);
        }
        _addDependence(subResource) {
            let dep = new ResourceDependence(this, subResource);
            this._dependenceFiles.push(dep);
        }
        _removeDependence(pSubResource) {
            let deps = this._dependenceFiles;
            for (let i = 0, len = deps.length; i < len; i++) {
                let dep = deps[i];
                if (dep.instanceId == pSubResource.instanceId) {
                    dep.destroy();
                    deps.splice(i, 1);
                    break;
                }
            }
            if (this._state == 1 /* Loading */ && !this._hasDependencies()) {
                this._onLoad();
            }
        }
        _removeAllDependence() {
            let deps = this._dependenceFiles;
            for (let k in deps) {
                deps[k].destroy();
            }
            this._dependenceFiles.length = 0;
        }
        _hasDependencies() {
            return this._dependenceFiles.length > 0;
        }
    }
    QuickEngine.Resource = Resource;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../loader/Resource.ts"/>
var QuickEngine;
///<reference path="../loader/Resource.ts"/>
(function (QuickEngine) {
    class TextResource extends QuickEngine.Resource {
        constructor(name) {
            super(name);
        }
        get data() {
            return this._data;
        }
        clone() {
            let obj = new TextResource(this._name);
            obj._data = this._data;
            return obj;
        }
        loadImpl() {
            QuickEngine.TextLoader.instance.load(this.name, (err, data) => {
                if (err || !data) {
                    console.error('load text failed: ' + this.name + ' error: ' + err);
                    this._state = 2 /* Loaded */;
                    this._data = '';
                    this._onLoad();
                    return;
                }
                this._data = data;
                this._state = 2 /* Loaded */;
                this._onLoad();
            }, this);
        }
        unloadImpl() {
            this._data = null;
        }
    }
    QuickEngine.TextResource = TextResource;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    let Timer;
    (function (Timer) {
        class TimerHeap extends QuickEngine.MinHeap {
            remove(timerId) {
                let heap = this._heap;
                let len = this._length;
                for (let i = 0; i < len; i++) {
                    let data = heap[i];
                    if (data.id == timerId) {
                        heap[i] = heap[this._length - 1];
                        this._length--;
                        this.filterDown(i, this._length - 1); //调整新的根节点
                        break;
                    }
                }
            }
        }
        function _TimerDataComparer(x, y) {
            return x.endTick - y.endTick;
        }
        let _timerHeap = new TimerHeap(_TimerDataComparer);
        let _timerId = 0;
        let _tick = 0;
        /**
         * 添加一个定时器
         * @param callback 回调函数
         * @param delay    延迟时间, 单位毫秒
         * @param repeat   重复次数, 默认为0, 不重复
         * @param interval 重复间隔时间, 单位毫秒
         * @return 定时器id
         */
        function addTimer(callback, delay, repeat = 0, interval = 0) {
            let newTimerId = _timerId++;
            let timerData = {
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
                let timerData = _timerHeap.peek();
                if (_tick < timerData.endTick) {
                    break;
                }
                _timerHeap.dequeue();
                let repeatCount = timerData.repeat;
                if (repeatCount == 0) {
                    timerData.callback(dt);
                }
                else if (repeatCount == -1) {
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
    })(Timer = QuickEngine.Timer || (QuickEngine.Timer = {}));
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    let UUID;
    (function (UUID) {
        // Private array of chars to use  
        let CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        function uuid(len, radix) {
            let chars = CHARS, uuid = [], i;
            radix = radix || chars.length;
            if (len) {
                // Compact form  
                for (i = 0; i < len; i++)
                    uuid[i] = chars[0 | Math.random() * radix];
            }
            else {
                // rfc4122, version 4 form  
                let r;
                // rfc4122 requires these characters  
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';
                // Fill in random data.  At i==19 set the high bits of clock sequence as  
                // per rfc4122, sec. 4.1.5  
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        }
        ;
        // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance  
        // by minimizing calls to random()  
        function uuidFast() {
            let chars = CHARS, uuid = new Array(36), rnd = 0, r;
            for (let i = 0; i < 36; i++) {
                if (i == 8 || i == 13 || i == 18 || i == 23) {
                    uuid[i] = '-';
                }
                else if (i == 14) {
                    uuid[i] = '4';
                }
                else {
                    if (rnd <= 0x02)
                        rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return uuid.join('');
        }
        ;
        // A more compact, but less performant, RFC4122v4 solution:  
        function newUuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        UUID.newUuid = newUuid;
        ;
    })(UUID = QuickEngine.UUID || (QuickEngine.UUID = {}));
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class ImageLoader {
        load(path, onLoaded, thisObj) {
            this.loadAsync(path).then(function (data) {
                onLoaded && onLoaded.call(thisObj, null, data);
            }).catch(function (err) {
                onLoaded && onLoaded.call(thisObj, err);
            });
        }
        loadAsync(path) {
            let promise = new Promise(function (resolve, reject) {
                let image = new Image();
                image.onload = function () {
                    resolve(image);
                };
                image.onerror = function () {
                    reject('load image failed: ' + path);
                };
                image.src = path;
            });
            return promise;
        }
    }
    ImageLoader.instance = new ImageLoader();
    QuickEngine.ImageLoader = ImageLoader;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class TextLoader {
        load(url, onLoaded, thisObj) {
            QuickEngine.Http.ajax({
                url: url,
                method: 'GET',
                responseType: 'text',
                async: true,
                callback: function (err, data, xhr, status) {
                    if (err) {
                        onLoaded && onLoaded.call(thisObj, err);
                        return;
                    }
                    onLoaded && onLoaded.call(thisObj, null, data);
                }
            });
        }
        loadAsync(url) {
            let promise = new Promise(function (resolve, reject) {
                QuickEngine.Http.ajax({
                    url: url,
                    method: 'GET',
                    responseType: 'text',
                    async: true,
                    callback: function (err, data, xhr, status) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(data);
                    }
                });
            });
            return promise;
        }
    }
    TextLoader.instance = new TextLoader();
    QuickEngine.TextLoader = TextLoader;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class AABB {
    }
    QuickEngine.AABB = AABB;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    /**
     * ��ɫ
     */
    class Color {
        constructor(r = 255, g = 255, b = 255, a = 255) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        static get white() {
            return new Color();
        }
        static get black() {
            return new Color(0, 0, 0, 255);
        }
        static get red() {
            return new Color(255, 0, 0, 255);
        }
        static get green() {
            return new Color(0, 255, 0, 255);
        }
        static get blue() {
            return new Color(0, 0, 255, 255);
        }
        clone(oriangl) {
            return new Color(oriangl.r, oriangl.g, oriangl.b, oriangl.a);
        }
        static colorToHex(color) {
            return color.r << 16 | color.g << 8 | color.b;
        }
        static colorToString(color) {
            return "#" + Color.colorToHex(color).toString(16);
        }
        static stringToColor(colorString) {
            let hex = parseInt(colorString, 16);
            return new Color(hex >> 16 & 0xff, hex >> 8 & 0xff, hex & 0xff);
        }
    }
    QuickEngine.Color = Color;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../core/HashObject.ts" />
var QuickEngine;
///<reference path="../core/HashObject.ts" />
(function (QuickEngine) {
    class Node extends QuickEngine.HashObject {
        constructor(name = "GameObject") {
            super();
            this._isActive = false;
            this._componentList = [];
            this._componentDict = {};
            this._name = name;
        }
        get name() {
            return this._name;
        }
        set name(val) {
            this._name = val;
        }
        get transform() {
            return this._transfrom;
        }
        updateRenderQueue(renderQueue) {
            let render = this.getComponent(QuickEngine.MeshRender);
            if (render && render.enabled && render.getRenderOperation() && render.getMaterial()) {
                renderQueue.addRenderable(render);
                // TODO: 添加一个线框渲染组件
                let debugRender = this.getComponent(QuickEngine.DebugRender);
                if (!debugRender) {
                    debugRender = this.addComponent(QuickEngine.DebugRender);
                }
                debugRender.mesh = render.mesh;
                debugRender.setMaterial(QuickEngine.SpriteMaterial.getDefaultSpriteMaterial());
                let oldOp = render.getRenderOperation();
                let wfOp = debugRender.getRenderOperation();
                wfOp.indexBuffer = oldOp.indexBuffer;
                wfOp.numberOfInstances = oldOp.numberOfInstances;
                wfOp.primCount = oldOp.primCount;
                wfOp.renderOpType = 2 /* LINE_STRIP */;
                wfOp.vertexBuffers = oldOp.vertexBuffers;
                //   renderQueue.addRenderable(debugRender);
                return;
            }
            let skinMeshRender = this.getComponent(QuickEngine.SkinedMeshRender);
            if (skinMeshRender && skinMeshRender.enabled && skinMeshRender.getRenderOperation() && skinMeshRender.getMaterial()) {
                renderQueue.addRenderable(skinMeshRender);
                return;
            }
            let spriteRender = this.getComponent(QuickEngine.SpriteRender);
            if (spriteRender && spriteRender.enabled && spriteRender.getRenderOperation() && spriteRender.getMaterial()) {
                renderQueue.addRenderable(spriteRender);
                return;
            }
        }
        addComponent(compName) {
            let newComp = new compName();
            let compKey;
            if (typeof compName === 'string') {
                compKey = compName;
            }
            else {
                compKey = compName.__ClassName__;
            }
            let oldComp = this._componentDict[compKey];
            if (!oldComp) {
                this._componentDict[compKey] = [newComp];
            }
            else if (!compName.__DisallowMultipleComponent__) {
                throw new Error("组件不允许重复添加: " + compName.__ClassName__);
            }
            else if (Array.isArray(oldComp)) {
                oldComp.push(newComp);
            }
            else {
                this._componentDict[compKey] = [oldComp, newComp];
            }
            this._componentList.push(newComp);
            // node关联transfrom控件
            if (newComp instanceof QuickEngine.Transform) {
                this._transfrom = newComp;
            }
            newComp.notifyAttachNode(this);
            // 启动脚本
            newComp.enabled = true;
            return newComp;
        }
        getComponent(compName) {
            let compKey;
            if (typeof compName === 'string') {
                compKey = compName;
            }
            else {
                compKey = compName.__ClassName__;
            }
            let comp = this._componentDict[compKey];
            if (!comp) {
                return null;
            }
            if (Array.isArray(comp)) {
                return comp[0];
            }
            else {
                return comp;
            }
        }
        getComponentInChildren(compName, includeInactive = false) {
            let childCount = this._transfrom.childCount;
            if (childCount <= 0) {
                return null;
            }
            for (let i = 0; i < childCount; i++) {
                let child = this._transfrom.getChildByIndex(i);
                if (!includeInactive && child instanceof Comment && !child.enabled) {
                    continue;
                }
                let comp = child.getComponent(compName);
                if (comp) {
                    return comp;
                }
                comp = child.getComponentInChildren(compName);
                if (comp) {
                    return comp;
                }
            }
            return null;
        }
        GetComponentInParent(compName) {
            let parent = this._transfrom.parent;
            while (parent) {
                let comp = parent.getComponent(compName);
                if (comp) {
                    return comp;
                }
                parent = parent.parent;
            }
            return null;
        }
        getComponents(compName) {
            let compKey;
            if (typeof compName !== 'string') {
                compKey = compName;
            }
            else {
                compKey = compName.__ClassName__;
            }
            let comp = this._componentDict[compKey];
            if (!comp) {
                return [];
            }
            if (Array.isArray(comp)) {
                return comp;
            }
            else {
                return [comp];
            }
        }
        getComponentsInChildren(compName, includeInactive = false, outCompList) {
            let childCount = this._transfrom.childCount;
            if (childCount <= 0) {
                return null;
            }
            for (let i = 0; i < childCount; i++) {
                let child = this._transfrom.getChildByIndex(i);
                if (!includeInactive && child instanceof Comment && !child.enabled) {
                    continue;
                }
                let comp = child.getComponents(compName);
                if (comp) {
                    return comp;
                }
                comp = child.getComponentsInChildren(compName);
                if (comp) {
                    return comp;
                }
            }
            return null;
        }
        getComponentsInParent(compName, includeInactive = false, outCompList) {
            let parent = this._transfrom.parent;
            while (parent) {
                let comp = parent.getComponents(compName);
                if (comp) {
                    return comp;
                }
                parent = parent.parent;
            }
            return null;
        }
    }
    Node.__ClassName__ = "QuickEngine.Node";
    Node.__ClassID__ = 0;
    QuickEngine.Node = Node;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../object/Node.ts" />
var QuickEngine;
///<reference path="../object/Node.ts" />
(function (QuickEngine) {
    ;
    ;
    class Frustum extends QuickEngine.Node {
        constructor() {
            super();
            this._projectionType = 1 /* PERSPECTIVE */;
            let planes = [];
            for (let i = 0; i < 6; i++) {
                planes.push(new QuickEngine.Plane());
            }
            this._frustumPlanes = planes;
        }
        updateRenderQueue(renderQueue) {
        }
        preRender( /*SceneManager * sm, RenderSystem * rsys*/) {
        }
        postRender( /*SceneManager * sm, RenderSystem * rsys*/) {
        }
        getMaterial() {
            return null;
        }
        getRenderOperation() {
            return null;
        }
        getWorldTransforms() {
            return null;
        }
    }
    QuickEngine.Frustum = Frustum;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    /**
     * 弧度每角度
     */
    QuickEngine.RADIANS_TO_DEGREES = 180 / Math.PI;
    /**
     * 角度每弧度 Math.PI / 180;
     */
    QuickEngine.DEGREES_TO_RADIANS = Math.PI / 180;
    let MathUtil;
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
                let temp = min;
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
                out = new QuickEngine.Color();
            }
            out.r = t * (toC.r - fromC.r) + fromC.r;
            out.g = t * (toC.g - fromC.g) + fromC.g;
            out.b = t * (toC.b - fromC.b) + fromC.b;
            out.a = t * (toC.a - fromC.a) + fromC.a;
            return out;
        }
        MathUtil.lerpColor = lerpColor;
    })(MathUtil = QuickEngine.MathUtil || (QuickEngine.MathUtil = {}));
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    // 复用的单位矩阵
    const identifyMatrixArray = [
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
    class Matrix4 {
        constructor() {
            this._rawData = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
        get _00() {
            return this._rawData[0];
        }
        set _00(val) {
            this._rawData[0] = val;
        }
        get _01() {
            return this._rawData[4];
        }
        set _01(val) {
            this._rawData[4] = val;
        }
        get _02() {
            return this._rawData[8];
        }
        set _02(val) {
            this._rawData[8] = val;
        }
        get _03() {
            return this._rawData[12];
        }
        set _03(val) {
            this._rawData[12] = val;
        }
        get _10() {
            return this._rawData[1];
        }
        set _10(val) {
            this._rawData[1] = val;
        }
        get _11() {
            return this._rawData[5];
        }
        set _11(val) {
            this._rawData[5] = val;
        }
        get _12() {
            return this._rawData[9];
        }
        set _12(val) {
            this._rawData[9] = val;
        }
        get _13() {
            return this._rawData[13];
        }
        set _13(val) {
            this._rawData[13] = val;
        }
        get _20() {
            return this._rawData[2];
        }
        set _20(val) {
            this._rawData[2] = val;
        }
        get _21() {
            return this._rawData[6];
        }
        set _21(val) {
            this._rawData[6] = val;
        }
        get _22() {
            return this._rawData[10];
        }
        set _22(val) {
            this._rawData[10] = val;
        }
        get _23() {
            return this._rawData[14];
        }
        set _23(val) {
            this._rawData[14] = val;
        }
        get _30() {
            return this._rawData[3];
        }
        set _30(val) {
            this._rawData[3] = val;
        }
        get _31() {
            return this._rawData[7];
        }
        set _31(val) {
            this._rawData[7] = val;
        }
        get _32() {
            return this._rawData[11];
        }
        set _32(val) {
            this._rawData[11] = val;
        }
        get _33() {
            return this._rawData[15];
        }
        set _33(val) {
            this._rawData[15] = val;
        }
        get rawData() {
            return this._rawData;
        }
        static create(_00, _01, _02, _03, _10, _11, _12, _13, _20, _21, _22, _23, _30, _31, _32, _33) {
            let matrix = new Matrix4();
            matrix._00 = _00, matrix._01 = _01, matrix._02 = _02, matrix._03 = _03;
            matrix._10 = _10, matrix._11 = _11, matrix._12 = _12, matrix._13 = _13;
            matrix._20 = _20, matrix._21 = _21, matrix._22 = _22, matrix._23 = _23;
            matrix._30 = _30, matrix._31 = _31, matrix._32 = _32, matrix._33 = _33;
            return matrix;
        }
        setArray(array) {
            this._rawData.set(array, 0);
            return this;
        }
        set(_00, _01, _02, _03, _10, _11, _12, _13, _20, _21, _22, _23, _30, _31, _32, _33) {
            this._rawData[0] = _00, this._rawData[4] = _01, this._rawData[8] = _02, this._rawData[12] = _03;
            this._rawData[1] = _10, this._rawData[5] = _11, this._rawData[9] = _12, this._rawData[13] = _13;
            this._rawData[2] = _20, this._rawData[6] = _21, this._rawData[10] = _22, this._rawData[14] = _23;
            this._rawData[3] = _30, this._rawData[7] = _31, this._rawData[11] = _32, this._rawData[15] = _33;
            return this;
        }
        copyFrom(other) {
            return this.setArray(other.rawData);
        }
        clone() {
            return new Matrix4().copyFrom(this);
        }
        /**
         * 矩阵相乘
         a00 a01 a02 a03     b00 b01 b02 b03     a00*b00+a01*b10+a02*b20+a03*b30 a00*b01+a01*b11+a02*b21+a03*b31 a00*b02+a01*b12+a02*b22+a03*b32 a00*b03+a01*b13+a02*b23+a03*b33
         a10 a11 a12 a13  *  b10 b11 b12 b13  =  a10*b00+a11*b10+a12*b20+a13*b30 a10*b01+a11*b11+a12*b21+a13*b31 a10*b02+a11*b12+a12*b22+a13*b32 a10*b03+a11*b13+a12*b23+a13*b33
         a20 a21 a22 a23     b20 b21 b22 b23     a20*b00+a21*b10+a22*b20+a23*b30 a20*b01+a21*b11+a22*b21+a23*b31 a20*b02+a21*b12+a22*b22+a23*b32 a20*b03+a21*b13+a22*b23+a23*b33
         a30 a31 a32 a33     b30 b31 b32 b33     a30*b00+a31*b10+a32*b20+a33*b30 a30*b01+a31*b11+a32*b21+a33*b31 a30*b02+a31*b12+a32*b22+a33*b32 a30*b03+a31*b13+a32*b23+a33*b33
         */
        multiply(v, outMat) {
            if (!outMat) {
                outMat = new Matrix4();
            }
            const out = outMat._rawData;
            const a = this._rawData;
            const b = v._rawData;
            const m111 = a[0], m121 = a[4], m131 = a[8], m141 = a[12];
            const m112 = a[1], m122 = a[5], m132 = a[9], m142 = a[13];
            const m113 = a[2], m123 = a[6], m133 = a[10], m143 = a[14];
            const m114 = a[3], m124 = a[7], m134 = a[11], m144 = a[15];
            const m211 = b[0], m221 = b[4], m231 = b[8], m241 = b[12];
            const m212 = b[1], m222 = b[5], m232 = b[9], m242 = b[13];
            const m213 = b[2], m223 = b[6], m233 = b[10], m243 = b[14];
            const m214 = b[3], m224 = b[7], m234 = b[11], m244 = b[15];
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
        }
        /**
         * 矩阵向量相乘, 列向量应该右乘矩阵
         * @param vec
         a00 a01 a02 a03    x
         a10 a11 a12 a13 *  y
         a20 a21 a22 a23    z
         a30 a31 a32 a33    w=0
         */
        transformVector3(v, out) {
            const x = v.x;
            const y = v.y;
            const z = v.z;
            const m = this._rawData;
            const x1 = m[0] * x + m[4] * y + m[8] * z + m[12];
            const y1 = m[1] * x + m[5] * y + m[9] * z + m[13];
            const z1 = m[2] * x + m[6] * y + m[10] * z + m[14];
            if (!out) {
                out = new QuickEngine.Vector3(x1, y1, z1);
            }
            else {
                out.set(x1, y1, z1);
            }
            return out;
        }
        /**
         * 单位矩阵
         */
        identity() {
            const out = this._rawData;
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
        }
        /**
         * 矩阵求逆
         * TODO
         */
        inverse(outMat) {
            if (!outMat) {
                outMat = new Matrix4();
            }
            const a = this._rawData;
            const out = outMat._rawData;
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            let b00 = a00 * a11 - a01 * a10;
            let b01 = a00 * a12 - a02 * a10;
            let b02 = a00 * a13 - a03 * a10;
            let b03 = a01 * a12 - a02 * a11;
            let b04 = a01 * a13 - a03 * a11;
            let b05 = a02 * a13 - a03 * a12;
            let b06 = a20 * a31 - a21 * a30;
            let b07 = a20 * a32 - a22 * a30;
            let b08 = a20 * a33 - a23 * a30;
            let b09 = a21 * a32 - a22 * a31;
            let b10 = a21 * a33 - a23 * a31;
            let b11 = a22 * a33 - a23 * a32;
            // Calculate the determinant
            let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
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
        }
        /**
         * 矩阵转置
         每一列变成每一行
         | a b |  T   | a c |
         | c d | ===> | b d |
         */
        transpose() {
            const a = this._rawData;
            const a01 = a[1];
            const a02 = a[2];
            const a03 = a[3];
            const a12 = a[6];
            const a13 = a[7];
            const a23 = a[11];
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
        }
        isAffine() {
            return this._30 === 0 && this._31 === 0 && this._32 === 0 && this._33 === 1;
        }
        /**
         * 绕任意轴旋转
         */
        rotateByAxis(angle, axis) {
            let x = axis.x, y = axis.y, z = axis.z;
            let ca = Math.cos(angle), sa = Math.sin(angle), c1 = 1 - ca;
            let x2 = x * x, y2 = y * y, z2 = z * z;
            let xz = x * z, xy = x * y, yz = y * z;
            let xs = x * sa, ys = y * sa, zs = z * sa;
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
        }
        rotateByScalar(x, y, z) {
            let yaw = y, pitch = x, roll = z;
            let sinx = Math.sin(pitch);
            let cosx = Math.cos(pitch);
            let siny = Math.sin(yaw);
            let cosy = Math.cos(yaw);
            let sinz = Math.sin(roll);
            let cosz = Math.cos(roll);
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
        }
        /**
         * 矩阵分解, 可分解为position,scale,quaternion
         * @param outPosition
         * @param outScale
         * @param outQuaternion
         */
        decompose(outPosition, outScale, outQuaternion) {
            const mat = this._rawData;
            // pos
            outPosition.x = mat[12];
            outPosition.y = mat[13];
            outPosition.z = mat[14];
            // scale
            outScale.x = Math.hypot(mat[0], mat[1], mat[2]);
            outScale.y = Math.hypot(mat[4], mat[5], mat[6]);
            outScale.z = Math.hypot(mat[8], mat[9], mat[10]);
            // quaternion
            let is1 = 1 / outScale.x;
            let is2 = 1 / outScale.y;
            let is3 = 1 / outScale.z;
            let sm11 = mat[0] * is1;
            let sm12 = mat[1] * is1;
            let sm13 = mat[2] * is1;
            let sm21 = mat[4] * is2;
            let sm22 = mat[5] * is2;
            let sm23 = mat[6] * is2;
            let sm31 = mat[8] * is3;
            let sm32 = mat[9] * is3;
            let sm33 = mat[10] * is3;
            let trace = sm11 + sm22 + sm33;
            let S = 0;
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
        }
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
        static makeTransform(position, rotation, scale, out) {
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
            let x = rotation.x, y = rotation.y, z = rotation.z, w = rotation.w;
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let xy = x * y2;
            let xz = x * z2;
            let yy = y * y2;
            let yz = y * z2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            let sx = scale.x;
            let sy = scale.y;
            let sz = scale.z;
            let out0 = (1 - (yy + zz)) * sx;
            let out1 = (xy + wz) * sx;
            let out2 = (xz - wy) * sx;
            let out4 = (xy - wz) * sy;
            let out5 = (1 - (xx + zz)) * sy;
            let out6 = (yz + wx) * sy;
            let out8 = (xz + wy) * sz;
            let out9 = (yz - wx) * sz;
            let out10 = (1 - (xx + yy)) * sz;
            const rawData = out._rawData;
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
        }
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
        static makeOrthoRH(left, right, bottom, top, near, far, target) {
            if (!target) {
                target = new Matrix4();
            }
            let inv_d = 1 / (far - near);
            let w = right - left;
            let h = top - bottom;
            let d = far - near;
            let x = (right + left) / w;
            let y = (top + bottom) / h;
            let z = (far + near) / d;
            const rawData = target._rawData;
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
        }
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
        static makePerspectiveRH(left, right, top, bottom, near, far, target) {
            if (!target) {
                target = new Matrix4();
            }
            let inv_w = 1 / (right - left);
            let inv_h = 1 / (top - bottom);
            let inv_d = 1 / (far - near);
            let A = 2 * near * inv_w;
            let B = 2 * near * inv_h;
            let C = (right + left) * inv_w;
            let D = (top + bottom) * inv_h;
            let q, qn;
            if (far == 0) {
                // Infinite far plane
                q = Number.EPSILON - 1;
                qn = near * (Number.EPSILON - 2);
            }
            else {
                q = -(far + near) * inv_d;
                qn = -2 * (far * near) * inv_d;
            }
            const rawData = target._rawData;
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
        }
        /**
         * 根据fov构造右手透视投影矩阵
         * @param fov
         * @param aspect
         * @param near
         * @param far
         * @param target
         */
        static makePerspectiveFovRH(fov, aspect, near, far, target) {
            let ymax = near * Math.tan(fov * Math.PI / 360);
            let ymin = -ymax;
            let xmin = ymin * aspect;
            let xmax = ymax * aspect;
            return Matrix4.makePerspectiveRH(xmin, xmax, ymax, ymin, near, far, target);
        }
    }
    Matrix4.ClassName = 'Matrix4';
    QuickEngine.Matrix4 = Matrix4;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    ;
    /**
     * 平面, 隐式定义方程ax + by + cz = d, 向量(a, b, c)为平面法向量
     */
    class Plane {
        constructor(x = 0, y = 0, z = 0, d = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.d = d;
        }
        set(x = 0, y = 0, z = 0, d = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.d = d;
        }
        /**
         * 归一化
         */
        normalize() {
            let x = this.x, y = this.y, z = this.z;
            let len = Math.sqrt(x * x + y * y + z * z);
            if (len > 0.0) {
                let invLen = 1.0 / len;
                this.x = x * invLen;
                this.y = y * invLen;
                this.z = z * invLen;
                this.d *= invLen;
            }
            return len;
        }
        /**
         * 求点到面的距离
         * @param v
         */
        distance(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z + this.d;
        }
        /**
         * 判断点在平面的方向
         * @param v
         */
        atSide(v) {
            let d = this.distance(v);
            if (d > 0) {
                return 0 /* Front */;
            }
            else if (d < 0) {
                return 1 /* Back */;
            }
            else {
                return 2 /* INTERSECT */;
            }
        }
        /**
         *
         * @param m
         */
        transform(m) {
        }
        /**
         * 3点构造平面, 3点不能共线, 否则有无数个面
         * @param p1
         * @param p2
         * @param p3
         */
        fromPoints(p1, p2, p3) {
            // 向量1
            let v1x = p2.x - p1.x;
            let v1y = p2.y - p1.y;
            let v1z = p2.z - p1.z;
            // 向量2
            let v2x = p3.x - p1.x;
            let v2y = p3.y - p1.y;
            let v2z = p3.z - p1.z;
            // 向量1和2叉乘求法向量
            this.x = v1y * v2z - v1z * v2y;
            this.y = v1z * v2x - v1x * v2z;
            this.z = v1x * v2y - v1y * v2x;
            //d = dot(p, normal), 取p1(3点任意一点都可以)点与法向量点乘求得d
            this.d = -(this.x * p1.x + this.y * p1.y + this.z * p1.z);
        }
        /**
         * 法向量和平面一点坐标构造平面
         * @param normal
         * @param p
         */
        fromNormalAndPoint(normal, p) {
            this.x = normal.x;
            this.y = normal.y;
            this.z = normal.z;
            //d = dot(p, normal)
            this.d = -(this.x * p.x + this.y * p.y + this.z * p.z);
        }
        /**
         * 计算点集最佳平面
         * @param points
         */
        static computeBestFitNormal(points) {
            let x = 0, y = 0, z = 0;
            let len = points.length;
            let point = points[len - 1];
            for (let i = 0; i < len; i++) {
                let tempPoint = points[i];
                x += (point.z + tempPoint.z) * (point.y - tempPoint.y);
                y += (point.x + tempPoint.x) * (point.z - tempPoint.z);
                z += (point.y + tempPoint.y) * (point.x - tempPoint.x);
                point = tempPoint;
            }
            return new QuickEngine.Vector3(x, y, z);
        }
    }
    Plane.ClassName = "Plane";
    QuickEngine.Plane = Plane;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    const s_epsilon = 1e-03;
    /**
     * 四元数 [w, x, y, z]
     * 假设轴角对(n, θ): 绕n指定的旋转轴θ角, 则 q = [cos(θ / 2), sin(θ / 2) * nx, sin(θ / 2) * ny, sin(θ / 2) * nz]
     */
    class Quaternion {
        constructor(w = 1, x = 0, y = 0, z = 0) {
            this.w = w;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        static get ZERO() {
            return new Quaternion(1, 0, 0, 0);
        }
        static get IDENTITY() {
            return new Quaternion(1, 0, 0, 0);
        }
        copyFrom(q) {
            this.w = q.w;
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
            return this;
        }
        clone() {
            return new Quaternion(this.w, this.x, this.y, this.z);
        }
        //----------------------------------基本计算-------------------------------------
        /**
         * 加法
         * @param q
         */
        add(q) {
            return new Quaternion(this.w + q.w, this.x + q.x, this.y + q.y, this.z + q.z);
        }
        /**
         * 减法
         * @param q
         */
        minus(q) {
            return new Quaternion(this.w - q.w, this.x - q.x, this.y - q.y, this.z - q.z);
        }
        /**
         * 点乘
         * @param q
         */
        dot(q) {
            return this.w * q.w + this.x * q.x + this.y * q.y + this.z * q.z;
        }
        /**
         * 叉乘
         * @param q
         */
        multiply(q) {
            const w1 = this.w, x1 = this.x, y1 = this.y, z1 = this.z;
            const w2 = q.w, x2 = q.x, y2 = q.y, z2 = q.z;
            return new Quaternion(w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2, w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2, w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2, w1 * z2 + x1 * y2 + z1 * w2 - y1 * x2);
        }
        /**
         * 乘以一个标量
         * @param s
         */
        multiplyScalar(s) {
            return new Quaternion(this.w * s, this.x * s, this.y * s, this.z * s);
        }
        static multiplyScalar(s, q) {
            return new Quaternion(q.w * s, q.x * s, q.y * s, q.z * s);
        }
        multiplyVector(vector) {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            let x2 = vector.x;
            let y2 = vector.y;
            let z2 = vector.z;
            return new Quaternion(-x * x2 - y * y2 - z * z2, w * x2 + y * z2 - z * y2, w * y2 - x * z2 + z * x2, w * z2 + x * y2 - y * x2);
        }
        rotateVector3(v) {
            // this.clone().multiplyVector(v).toEulerAngle();
            // let qvec = new Vector3(this.x, this.y, this.z);
            // let uv = qvec.cross(v);
            // let uuv = qvec.cross(uv);
            //
            // uv = uv.multiplyScalar(2.0 * this.w);
            // uuv = uuv.multiplyScalar(2.0);
            //
            // return new Vector3(v.x + uv.x + uuv.x, v.y + uv.y + uuv.y, v.z + uv.z + uuv.z);
            let out = new QuickEngine.Vector3();
            let src = this;
            let vector = v;
            let x1, y1, z1, w1;
            let x2 = vector.x, y2 = vector.y, z2 = vector.z;
            w1 = -src.x * x2 - src.y * y2 - src.z * z2;
            x1 = src.w * x2 + src.y * z2 - src.z * y2;
            y1 = src.w * y2 - src.x * z2 + src.z * x2;
            z1 = src.w * z2 + src.x * y2 - src.y * x2;
            out.x = -w1 * src.x + x1 * src.w - y1 * src.z + z1 * src.y;
            out.y = -w1 * src.y + x1 * src.z + y1 * src.w - z1 * src.x;
            out.z = -w1 * src.z - x1 * src.y + y1 * src.x + z1 * src.w;
            return out;
        }
        /**
         * 对数. 公式: log(q) = [0, αN], N 为单位向量
         */
        log() {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            let rw = 0.0, rx = 0.0, ry = 0.0, rz = 0.0;
            // w = cos(θ / 2)
            if (Math.abs(w) < 1.0) {
                let angle = Math.acos(w);
                let sina = Math.sin(angle);
                if (Math.abs(sina) >= s_epsilon) {
                    let fCoeff = angle / sina;
                    rx = fCoeff * x;
                    ry = fCoeff * y;
                    rz = fCoeff * z;
                }
            }
            return new Quaternion(rw, rx, ry, rz);
        }
        /**
         * 指数. 公式: exp(p) = [cos() ]
         */
        exp() {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            let rw = 0.0, rx = 0.0, ry = 0.0, rz = 0.0;
            let fAngle = Math.sqrt(x * x + y * y + z * z);
            let fSin = Math.sin(fAngle);
            rw = Math.cos(fAngle);
            if (Math.abs(fSin) >= s_epsilon) {
                let fCoeff = fSin / (fAngle);
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
        }
        /**
         * 共轭四元数, 四元数逆q-1 = 它的共轭除以模长
         */
        conjugate() {
            return new Quaternion(this.w, -this.x, -this.y, -this.z);
        }
        /**
         * 四元数的逆
         */
        inverse() {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            let mag = w * w + x * x + y * y + z * z;
            if (mag > 0.0) {
                let invMag = 1.0 / mag;
                return new Quaternion(w * invMag, -x * invMag, -y * invMag, -z * invMag);
            }
            else {
                return new Quaternion(0, 0, 0, 0);
            }
        }
        /**
         * 单位四元数求逆, 必须是单位四元数才能调用此方法
         */
        unitInverse() {
            return new Quaternion(this.w, -this.x, -this.y, -this.z);
        }
        /**
         * 模长
         */
        get magnitude() {
            return this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
        }
        /**
         * 模长平方
         */
        get sqrMagnitude() {
            return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
        }
        /**
         * 正则化
         */
        normalize() {
            // 模长
            let len = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
            console.assert(len != 0);
            let invLen = 1.0 / len;
            this.x *= invLen;
            this.y *= invLen;
            this.z *= invLen;
            this.w *= invLen;
            return this;
        }
        /**
         * 比较两个四元素是否相等
         * @param other
         */
        equal(q) {
            return this.x == q.x && this.y == q.y && this.z == q.z && this.w == q.w;
        }
        //----------------------------------插值操作-------------------------------------
        /**
         * 线性插值(Linear Interpolation)
         * @param lhs
         * @param rhs
         * @param t
         */
        lerp(lhs, rhs, t) {
            let w0 = lhs.w, x0 = lhs.x, y0 = lhs.y, z0 = lhs.z;
            let w1 = rhs.w, x1 = rhs.x, y1 = rhs.y, z1 = rhs.z;
            // 两四元数点乘
            let cosOmega = w0 * w1 + x0 * x1 + y0 * y1 + z0 * z1;
            // 点乘为负, 反转四元数以取得短弧
            if (cosOmega < 0) {
                w1 = -w1;
                x1 = -x1;
                y1 = -y1;
                z1 = -z1;
            }
            let w = w0 + t * (w1 - w0);
            let x = x0 + t * (x1 - x0);
            let y = y0 + t * (y1 - y0);
            let z = z0 + t * (z1 - z0);
            let invLen = 1.0 / Math.sqrt(w * w + x * x + y * y + z * z);
            this.w = w * invLen;
            this.x = x * invLen;
            this.y = y * invLen;
            this.z = z * invLen;
            return this;
        }
        /**
         * 球面线性插值(Spherical Linear Interpolation)
         * @param lhs
         * @param rhs
         * @param t
         */
        slerp(lhs, rhs, t) {
            let w0, x0, y0, z0;
            let w1, x1, y1, z1;
            // 两四元数点乘
            let cosOmega = w0 * w1 + x0 * x1 + y0 * y1 + z0 * z1;
            // 点乘为负, 反转四元数以取得短弧
            if (cosOmega < 0) {
                w1 = -w1;
                x1 = -x1;
                y1 = -y1;
                z1 = -z1;
                cosOmega = -cosOmega;
            }
            let k0 = 0, k1 = 0;
            if (cosOmega > 1 - s_epsilon) {
                k0 = 1 - t;
                k1 = t;
            }
            else {
                let sinOmega = Math.sqrt(1 - cosOmega * cosOmega);
                let omega = Math.atan2(sinOmega, cosOmega);
                let invSinOmega = 1 / sinOmega;
                k0 = Math.sin((1 - t) * omega) * invSinOmega;
                k1 = Math.sin(t * omega) * invSinOmega;
            }
            this.w = w0 * k0 + w1 * k1;
            this.x = x0 * k0 + x1 * k1;
            this.y = y0 * k0 + y1 * k1;
            this.z = z0 * k0 + z1 * k1;
            return this;
        }
        squad(q0, q1, s0, s1, t) {
            let slerpT = 2 * t * (1 - t);
            let slerpQ0 = Quaternion._TempQuat0.slerp(q0, q1, t);
            let slerpQ1 = Quaternion._TempQuat1.slerp(s0, s1, t);
            return this.slerp(slerpQ0, slerpQ1, slerpT);
        }
        //------------------------------四元数,矩阵,向量互相转换--------------------------
        /**
         * 通过旋转矩阵构造四元数
         * @param rotMat
         */
        FromRotationMatrix(rotMat) {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            return this;
        }
        ToRotationMatrix(rotMat) {
            if (!rotMat) {
                rotMat = new QuickEngine.Matrix4();
            }
            let w = this.w, x = this.x, y = this.y, z = this.z;
            let _2x = x + x, _2y = y + y, _2z = z + z;
            let _2xw = _2x * w, _2yw = _2y * w, _2zw = _2z * w;
            let _2xx = _2x * x, _2xy = _2y * x, _2xz = _2z * x;
            let _2yy = _2y * y, _2yz = _2z * y, _2zz = _2z * z;
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
        }
        /**
         * 创建一个以axis轴为中心旋转rads弧度的四元数
         * @param axis
         * @param rads
         */
        fromAngleAxis(axis, rads) {
            let half_rads = rads / 2.0;
            let cosine = Math.cos(half_rads);
            let sine = Math.sin(half_rads);
            this.x = axis.x * sine;
            this.y = axis.y * sine;
            this.z = axis.z * sine;
            this.w = cosine;
            this.normalize();
        }
        /**
         * 返回四元数绕轴心和角度
         * @param axis 旋转轴
         * @returns 弧度
         */
        toAngleAxis(axis) {
            let rads = Math.acos(this.w) * 2.0;
            const s = Math.sin(rads / 2.0);
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
        }
        /**
         * 欧拉角转四元数
         * @param eulerAngle 欧拉角
         * @param refQuaternion 欧拉角引用，如果不为空，将会改变传入的四元数，并返回传入的四元数
         * @return Quaternion 四元数
         */
        fromEulerAngle(eulerAngle) {
            return this.fromEulerAngleScalar(eulerAngle.x, eulerAngle.y, eulerAngle.z);
        }
        fromEulerAngleScalar(x, y, z) {
            let halfX = x * 0.5 * QuickEngine.DEGREES_TO_RADIANS;
            let sx = Math.sin(halfX);
            let cx = Math.cos(halfX);
            let halfY = y * 0.5 * QuickEngine.DEGREES_TO_RADIANS;
            let sy = Math.sin(halfY);
            let cy = Math.cos(halfY);
            let halfZ = z * 0.5 * QuickEngine.DEGREES_TO_RADIANS;
            let sz = Math.sin(halfZ);
            let cz = Math.cos(halfZ);
            this.w = cx * cy * cz + sx * sy * sz;
            this.x = sx * cy * cz - cx * sy * sz;
            this.y = cx * sy * cz + sx * cy * sz;
            this.z = cx * cy * sz - sx * sy * cz;
            return this;
        }
        /**
         * 四元数转欧拉角
         */
        toEulerAngle(refEulerAngle) {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            if (!refEulerAngle) {
                refEulerAngle = new QuickEngine.Vector3();
            }
            refEulerAngle.x = Math.atan2(2.0 * (w * x + y * z), 1.0 - 2.0 * (x * x + y * y));
            let temp = 2.0 * (w * y - z * x);
            temp = QuickEngine.MathUtil.clampf(temp, -1.0, 1.0);
            refEulerAngle.y = Math.asin(temp);
            refEulerAngle.z = Math.atan2(2.0 * (w * z + x * y), 1.0 - 2.0 * (y * y + z * z));
            refEulerAngle.x *= QuickEngine.RADIANS_TO_DEGREES;
            refEulerAngle.y *= QuickEngine.RADIANS_TO_DEGREES;
            refEulerAngle.z *= QuickEngine.RADIANS_TO_DEGREES;
            return refEulerAngle;
        }
        getRightVector() {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            return new QuickEngine.Vector3(1.0 - 2.0 * (y * y + z * z), 2.0 * (x * y + w * z), 2.0 * (x * z - w * y));
        }
        getUpVector() {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            return new QuickEngine.Vector3(2.0 * (x * y - w * z), 1.0 - 2.0 * (x * x + z * z), 2.0 * (y * z + w * x));
        }
        getDirVector() {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            return new QuickEngine.Vector3(2.0 * (w * y + x * z), 2.0 * (y * z - w * x), 1.0 - 2.0 * (x * x + y * y));
        }
    }
    Quaternion.ClassName = "Quaternion";
    /**
     * 四元数样条 squad(qi, qi1, si, si1, t) = slerp(slerp(qi, qi1, t), slerp(si, si1, t), 2 * t * (1 - t))
     */
    Quaternion._TempQuat0 = new Quaternion();
    Quaternion._TempQuat1 = new Quaternion();
    QuickEngine.Quaternion = Quaternion;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    /**
     * 射线, 隐式定义方程
     */
    class Ray {
        constructor(origin, direction) {
            this.origin = origin ? new QuickEngine.Vector3(origin.x, origin.y, origin.z) : new QuickEngine.Vector3();
            this.direction = direction ? new QuickEngine.Vector3(direction.x, direction.y, direction.z) : new QuickEngine.Vector3();
        }
        intersectPlane() {
            return true;
        }
        intersectTriangle() {
            return true;
        }
        intersectSphere() {
            return true;
        }
        intersectAABB() {
            return true;
        }
        intersectMesh() {
            return true;
        }
    }
    Ray.ClassName = "Ray";
    QuickEngine.Ray = Ray;
    class Ray2D {
    }
    QuickEngine.Ray2D = Ray2D;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Rect {
        constructor(l, t, w, h) {
            this.left = l;
            this.top = t;
            this.width = w;
            this.height = h;
        }
    }
    Rect.ClassName = "Rect";
    QuickEngine.Rect = Rect;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    /**
     * 球 (x - cx) * (x - cx) + (y - cy) *  (y - cy) +(z - cz) *  (z - cz) = r * r
     */
    class Sphere {
        constructor(x = 0, y = 0, z = 0, radius = 0) {
            this.center = new QuickEngine.Vector3(x, y, z);
            this.radius = radius;
        }
    }
    Sphere.ClassName = "Sphere";
    QuickEngine.Sphere = Sphere;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Spline {
    }
    QuickEngine.Spline = Spline;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Vector2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        /**
         * ���
         * @param other
         */
        add(other) {
            this.x += other.x;
            this.y += other.y;
            return this;
        }
        /**
         * ���
         * @param other
         */
        sub(other) {
            this.x -= other.x;
            this.y -= other.y;
            return this;
        }
        /**
         * Scalar Product �����
         * @param multiplier
         */
        scalarProduct(multiplier) {
            this.x *= multiplier;
            this.y *= multiplier;
            return this;
        }
        vectorProduct(other) {
            this.x *= other.x;
            this.y *= other.y;
            return this;
        }
        /**
         * ���
         * @param other
         */
        dot(other) {
            return this.x * other.x + this.y * other.y;
        }
        /**
         * ���
         * @param lhs
         * @param rhs
         */
        static dot(lhs, rhs) {
            return lhs.x * rhs.x + lhs.y * rhs.y;
        }
        divide(val) {
            console.assert(val > 0);
            this.x /= val;
            this.y /= val;
            return this;
        }
        divideVector(other) {
            console.assert(other.x > 0 && other.y > 0);
            this.x /= other.x;
            this.y /= other.y;
            return this;
        }
        /**
         * ������һ��
         */
        normalize() {
            let len = this.x * this.x + this.y * this.y;
            if (len) {
                let t = 1 / Math.sqrt(len);
                this.x *= t;
                this.y *= t;
            }
            else {
                this.x = 0;
                this.y = 0;
            }
            return this;
        }
        /**
         * ��ȡ��������
         */
        getLength() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        /**
         * ��ȡ��������ƽ��
         */
        getLengthSquare() {
            return this.x * this.x + this.y * this.y;
        }
        /**
         * ����������
         * @param v0
         * @param v1
         */
        distance(v0, v1) {
            let dx = v0.x - v1.x;
            let dy = v0.y - v1.y;
            let distSquare = dx * dx + dy * dy;
            return Math.sqrt(distSquare);
        }
        /**
         * ����������ƽ��
         * @param v0
         * @param v1
         */
        distanceSquare(v0, v1) {
            let dx = v0.x - v1.x;
            let dy = v0.y - v1.y;
            return dx * dx + dy * dy;
        }
        lerp(v0, v1, t) {
            let x0 = v0.x, y0 = v0.y;
            let x1 = v1.x, y1 = v1.y;
            this.x = (x1 - x0) * t + x0;
            this.y = (y1 - y0) * t + y0;
            return this;
        }
    }
    Vector2.ClassName = "Vector2";
    QuickEngine.Vector2 = Vector2;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Vector3 {
        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        static get right() {
            return new Vector3(1, 0, 0);
        }
        static get up() {
            return new Vector3(0, 1, 0);
        }
        static get forward() {
            return new Vector3(0, 0, 1);
        }
        /**
         *
         * @param other
         */
        copy(other) {
            this.x = other.x;
            this.y = other.y;
            this.z = other.z;
            return this;
        }
        /**
         * 复制一个自己,返回一个新的vector3
         */
        clone() {
            return new Vector3(this.x, this.y, this.z);
        }
        /**
         * 是否相同
         * @param other
         */
        equals(other) {
            return other.x === other.x && other.y === other.y && other.z === other.z;
        }
        /**
         * 置0
         */
        setZero() {
            this.x = this.y = this.z = 0;
            return this;
        }
        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }
        /**
         * 相加
         * @param other
         */
        add(other) {
            return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
        }
        /**
         * 相减
         * @param other
         */
        sub(other) {
            let x = this.x - other.x;
            let y = this.y - other.y;
            let z = this.z - other.z;
            return new Vector3(x, y, z);
        }
        /**
         * Scalar Product 乘以标量
         * @param multiplier
         */
        multiplyScalar(multiplier) {
            let x = this.x * multiplier;
            let y = this.y * multiplier;
            let z = this.z * multiplier;
            return new Vector3(x, y, z);
        }
        /**
         * 乘以向量
         * @param other
         */
        multiplyVector3(other) {
            let x = this.x * other.x;
            let y = this.y * other.y;
            let z = this.z * other.z;
            return new Vector3(x, y, z);
        }
        /**
         * 点积
         * @param other
         */
        dot(other) {
            return this.x * other.x + this.y * other.y + this.z * other.z;
        }
        /**
         * 点积
         * @param lhs
         * @param rhs
         */
        static dot(lhs, rhs) {
            return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
        }
        /**
         * 叉积
         * @param other
         */
        cross(other) {
            let x1 = this.x, y1 = this.y, z1 = this.z;
            let x2 = other.x, y2 = other.y, z2 = other.z;
            let x = y1 * z2 - y2 * z1;
            let y = z1 * x2 - z2 * x1;
            let z = x1 * y2 - x2 * y1;
            return new Vector3(x, y, z);
        }
        /**
         * 叉积
         * @param lhs
         * @param rhs
         */
        static cross(lhs, rhs) {
            let x1 = lhs.x, y1 = lhs.y, z1 = lhs.z;
            let x2 = rhs.x, y2 = rhs.y, z2 = rhs.z;
            let x = y1 * z2 - y2 * z1;
            let y = z1 * x2 - z2 * x1;
            let z = x1 * y2 - x2 * y1;
            return new Vector3(x, y, z);
        }
        /**
         * 除以标量
         * @param val
         */
        divide(val) {
            // 不做除0检查
            console.assert(val != 0);
            let t = 1.0 / val;
            let x = this.x * t;
            let y = this.y * t;
            let z = this.z * t;
            return new Vector3(x, y, z);
        }
        /**
         * 除以向量
         * @param other
         */
        divideVector(other) {
            console.assert(other.x > 0 && other.y > 0 && other.z > 0);
            let x = this.x / other.x;
            let y = this.y / other.y;
            let z = this.z / other.z;
            return new Vector3(x, y, z);
        }
        /**
         * 向量归一化
         */
        normalize() {
            let x = this.x, y = this.y, z = this.z;
            let len = x * x + y * y + z * z;
            if (len) {
                let t = 1.0 / Math.sqrt(len);
                this.x = x * t;
                this.y = y * t;
                this.z = z * t;
            }
            return this;
        }
        /**
         * 求模长
         */
        get magnitude() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        /**
         * 求模长平方
         */
        get sqrMagnitude() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        /**
         * 两向量距离
         * @param v0
         * @param v1
         */
        static distance(v0, v1) {
            let dx = v0.x - v1.x;
            let dy = v0.y - v1.y;
            let dz = v0.z - v1.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        /**
         * 两向量距离平方
         * @param v0
         * @param v1
         */
        static sqrDistance(v0, v1) {
            let dx = v0.x - v1.x;
            let dy = v0.y - v1.y;
            let dz = v0.z - v1.z;
            return dx * dx + dy * dy + dz * dz;
        }
        lerp(v0, v1, t) {
            let x0 = v0.x, y0 = v0.y, z0 = v0.z;
            let x1 = v1.x, y1 = v1.y, z1 = v1.z;
            this.x = (x1 - x0) * t + x0;
            this.y = (y1 - y0) * t + y0;
            this.z = (z1 - z0) * t + z0;
            return this;
        }
    }
    Vector3.ClassName = 'Vector3';
    QuickEngine.Vector3 = Vector3;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Vector4 {
        constructor(x = 0, y = 0, z = 0, w = 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
    }
    QuickEngine.Vector4 = Vector4;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Sound {
        constructor() {
        }
    }
    QuickEngine.Sound = Sound;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Vedio {
        constructor() {
        }
    }
    QuickEngine.Vedio = Vedio;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    /**
     * @class
     * @static
     */
    class Http /** @lends QuickEngine.Http */ {
        // 把参数data转为url查询参数
        static getUrlParam(url, data) {
            if (!data) {
                return '';
            }
            let paramsStr = data instanceof Object ? Http.getQueryString(data) : data;
            return (url.indexOf('?') !== -1) ? paramsStr : '?' + paramsStr;
        }
        // 获取ajax请求参数
        static getQueryData(data) {
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
        }
        // 把对象转为查询字符串
        static getQueryString(data) {
            let paramsArr = [];
            if (data instanceof Object) {
                Object.keys(data).forEach(key => {
                    let val = data[key];
                    // todo 参数Date类型需要根据后台api酌情处理
                    if (val instanceof Date) {
                        // val = dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
                    }
                    paramsArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
                });
            }
            return paramsArr.join('&');
        }
        static ajax(options) {
            options = options ? Object.assign(Http._defaultOptions, options) : Http._defaultOptions;
            QuickEngine.assert(!options.url || !options.method || !options.responseType, '参数有误');
            let xhr = new XMLHttpRequest();
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
                        let result;
                        let err;
                        const status = xhr.status;
                        if ((status >= 200 && status < 300) || status === 304) {
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
                        else if (status === 408) {
                            err = 'timeout';
                        }
                        else {
                            err = 'load failed: ' + url;
                        }
                        options.callback && options.callback.call(options.thisObj, err, result);
                        break;
                    default:
                        QuickEngine.Log.E('todo state: ' + xhr.readyState);
                        break;
                }
            };
            let url = options.url;
            let sendData;
            let method = options.method.toUpperCase();
            if (method === 'GET') {
                url += Http.getUrlParam(options.url, options.data);
            }
            else {
                sendData = Http.getQueryData(options.data);
            }
            for (const key of Object.keys(options.headers)) {
                xhr.setRequestHeader(key, options.headers[key]);
            }
            xhr.open(method, url, options.async);
            xhr.responseType = options.responseType;
            if (options.async && options.timeout) {
                xhr.timeout = options.timeout;
            }
            xhr.send(sendData);
            return xhr;
        }
        /**
         *
         * @param url
         * @param data
         * @param header
         * @param callback
         * @param thisObj
         * @param isAsync
         */
        static get(url, data, callback, thisObj, isAsync = true) {
            return this.ajax({
                url: url,
                method: 'GET',
                responseType: 'text',
                data: data,
                callback: callback,
                thisObj: thisObj,
                async: isAsync
            });
        }
        static post(url, data, callback, thisObj, isAsync = true) {
            return this.ajax({
                url: url,
                method: 'POST',
                responseType: 'text',
                data: data,
                callback: callback,
                thisObj: thisObj,
                async: isAsync
            });
        }
    }
    Http._defaultOptions = {
        url: '',
        method: 'GET',
        responseType: 'json',
        async: true,
        data: null,
        headers: {},
        timeout: 1000,
    };
    QuickEngine.Http = Http;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Billboard {
    }
    QuickEngine.Billboard = Billboard;
    class BillboardSet extends QuickEngine.Node {
        constructor() {
            super();
        }
    }
    BillboardSet.__ClassName__ = "QuickEngine.BillboardSet";
    BillboardSet.__ClassID__ = 0;
    QuickEngine.BillboardSet = BillboardSet;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../core/HashObject.ts" />
var QuickEngine;
///<reference path="../core/HashObject.ts" />
(function (QuickEngine) {
    let __id = 0;
    function NewClassID() {
        return __id++;
    }
    class Component extends QuickEngine.HashObject {
        constructor() {
            super();
            this._needCallStart = true;
            this._enable = false;
            // 脚本函数
            // 启动时调用
            this.onLoad = undefined;
            // 更新时调用
            this.onUpdate = undefined;
            // 调试调用
            this.onDebugDraw = undefined;
        }
        get node() {
            return this._node;
        }
        set node(val) {
        }
        get transform() {
            return this.node.transform;
        }
        get enabled() {
            return this._enable;
        }
        set enabled(val) {
            if (this._enable == val) {
                return;
            }
            this._enable = val;
            if (val) {
                this.enqueueComponent();
            }
            else {
                this.dequeueComponent();
            }
        }
        onDestroy() {
            this.enabled = false;
            this._node = null;
        }
        // 组件基本逻辑
        static load() {
            let unStartedComponentArr = Component.s_unStartedComponentArr;
            for (let i = 0, len = unStartedComponentArr.length; i < len; i++) {
                let comp = unStartedComponentArr[i];
                comp._needCallStart = false;
                Component.s_startedComponentArr.push(comp);
                if (comp.onLoad) {
                    comp.onLoad.call(comp);
                }
            }
            Component.s_unStartedComponentArr.length = 0;
        }
        static update(deltaTime) {
            let startedCompArr = Component.s_startedComponentArr;
            for (let i = 0, len = startedCompArr.length; i < len; i++) {
                let comp = startedCompArr[i];
                if (comp.onUpdate) {
                    comp.onUpdate.call(this, deltaTime);
                }
            }
        }
        compareTag(tag) {
            return this.tag === tag;
        }
        getComponent(compName) {
            return this.node.getComponent(compName);
        }
        getComponentInChildren(compName, includeInactive = false) {
            return this.node.getComponentInChildren(compName, includeInactive);
        }
        GetComponentInParent(compName) {
            return this.node.GetComponentInParent(compName);
        }
        getComponents(compName) {
            return this.node.getComponents(compName);
        }
        getComponentsInChildren(compName, includeInactive = false, outCompList) {
            return this.node.getComponentsInChildren(compName, includeInactive, outCompList);
        }
        getComponentsInParent(compName, includeInactive = false, outCompList) {
            return this.node.getComponentsInParent(compName, includeInactive, outCompList);
        }
        notifyAttachNode(val) {
            console.assert(!this._node, '重复挂载节点');
            console.assert(!!val, '挂载节点为空');
            this._node = val;
        }
        enqueueComponent() {
            if (this._needCallStart) {
                Component.s_unStartedComponentArr.push(this);
            }
            else {
                Component.s_startedComponentArr.push(this);
            }
        }
        dequeueComponent() {
            if (this._needCallStart) {
                let idx = Component.s_unStartedComponentArr.indexOf(this);
                if (idx != -1) {
                    Component.s_unStartedComponentArr.splice(idx, 1);
                }
            }
            else {
                let idx = Component.s_startedComponentArr.indexOf(this);
                if (idx != -1) {
                    Component.s_startedComponentArr.splice(idx, 1);
                }
            }
        }
    }
    Component.__DisallowMultipleComponent__ = false;
    Component.__ClassName__ = "QuickEngine.Component";
    Component.__ClassID__ = NewClassID();
    // 脚本管理
    Component.s_unStartedComponentArr = [];
    Component.s_startedComponentArr = [];
    QuickEngine.Component = Component;
})(QuickEngine || (QuickEngine = {}));
///<reference path="Component.ts" />
var QuickEngine;
///<reference path="Component.ts" />
(function (QuickEngine) {
    ;
    const DEFAULT_FOV = 45;
    const DEFAULT_ASPECT = 1;
    const DEFAULT_NEAR = 0.1;
    const DEFAULT_FAR = 100;
    class Camera extends QuickEngine.Component {
        constructor() {
            super();
            this._clearFlags = 0 /* SkyBox */;
            this._fovY = DEFAULT_FOV; // fovY: (0, 180) fovY = atan(（(r - l) / 2） / n)
            this._near = DEFAULT_NEAR;
            this._far = DEFAULT_FAR;
            this._aspect = DEFAULT_ASPECT;
            this._isDirty = true;
            this._viewportDirty = false;
            this._projMatrix = new QuickEngine.Matrix4();
            this._viewport = {
                x: 0, y: 0, w: 1, h: 1
            };
            this._cameraType = 0 /* Perspective */;
            this._renderContext = new QuickEngine.RenderContext(this);
        }
        get renderContext() {
            return this._renderContext;
        }
        setCameraType(cameraType) {
            if (this._cameraType != cameraType) {
                this._cameraType = cameraType;
                this._isDirty = true;
            }
        }
        getCameraType() {
            return this._cameraType;
        }
        setFOV(fovY) {
            if (this._fovY != fovY) {
                this._fovY = fovY;
                this._viewportDirty = true;
            }
        }
        getFOV() {
            return this._fovY;
        }
        setNearClip(near) {
            if (this._near != near) {
                this._near = near;
                this._viewportDirty = true;
            }
        }
        getNearClip() {
            return this._near;
        }
        setFarClip(far) {
            if (this._far != far) {
                this._far = far;
                this._viewportDirty = true;
            }
        }
        getFarClip() {
            return this._far;
        }
        setAspect(aspect) {
            if (this._aspect != aspect) {
                this._aspect = aspect;
                this._viewportDirty = true;
            }
        }
        getAspect() {
            return this._aspect;
        }
        setOrthoWidth(w) {
            this._orthoWidth = w;
            this._isDirty = true;
        }
        setOrthoHeight(h) {
            this._orthoHeight = h;
            this._isDirty = true;
        }
        set viewPort(val) {
            this._viewport = val;
        }
        get viewPort() {
            return this._viewport;
        }
        getViewMatrix() {
            console.assert(!!this.transform);
            return this.transform.localToWorldMatrix;
        }
        getProjMatrix() {
            this._update();
            return this._projMatrix;
        }
        get renderTarget() {
            return this._renderTarget;
        }
        set renderTarget(val) {
            this._renderTarget = val;
        }
        _update() {
            if (!this._isDirty) {
                return;
            }
            let far = this._far;
            let near = this._near;
            let viewport = this._viewport;
            let left = viewport.x;
            let right = viewport.x + viewport.w * QuickEngine.Screen.screenWidth;
            let top = viewport.y + viewport.h * QuickEngine.Screen.screenHeight;
            let bottom = viewport.y;
            if (this._cameraType == 1 /* Orthogonal */) {
                let half_w = this._orthoWidth * 0.5;
                let half_h = this._orthoHeight * 0.5;
                left = -half_w;
                right = +half_w;
                bottom = -half_h;
                top = +half_h;
            }
            switch (this._cameraType) {
                case 1 /* Orthogonal */:
                    QuickEngine.Matrix4.makeOrthoRH(left, right, bottom, top, near, far, this._projMatrix);
                    break;
                case 0 /* Perspective */:
                    QuickEngine.Matrix4.makePerspectiveFovRH(this._fovY, this._aspect, this._near, this._far, this._projMatrix);
                    break;
                default:
                    console.warn('unkonw camera type: ' + this._cameraType);
                    break;
            }
            this._isDirty = false;
        }
    }
    Camera.__ClassName__ = 'QuickEngine.Camera';
    Camera.__ClassID__ = 0;
    QuickEngine.Camera = Camera;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    // 标准光照方程
    // Clit = C_spec + C_diff + C_amb;
    // Clit: 光照颜色值     
    // C_spec: 镜面反射分量
    // C_diff: 漫反射分量   
    // C_amb: 环境分量   
    class Light extends QuickEngine.Component {
        constructor() {
            super();
            /**
             * 光类型
             */
            this.lightType = 1 /* Direction */;
        }
        updateRenderQueue(renderQueue) {
        }
    }
    Light.__ClassName__ = "QuickEngine.Light";
    Light.__ClassID__ = 0;
    QuickEngine.Light = Light;
})(QuickEngine || (QuickEngine = {}));
///<reference path="Component.ts" />
var QuickEngine;
///<reference path="Component.ts" />
(function (QuickEngine) {
    /**
     * 变换组件
     */
    class Transform extends QuickEngine.Component {
        constructor() {
            super();
            this._children = [];
            this._parent = undefined;
            this._needParentUpdate = false;
            this._needChildUpdate = false;
            this._needTransformUpdate = false;
            this._needWorldToLocalMatrixUpdate = true;
            this._needEulerUpdate = true;
            this._parentNotified = false;
            this._childrenToUpdate = [];
            this._position = new QuickEngine.Vector3();
            this._localPosition = new QuickEngine.Vector3();
            this._rotation = new QuickEngine.Quaternion();
            this._localRotation = new QuickEngine.Quaternion();
            this._eulerAngle = new QuickEngine.Vector3();
            this._localEulerAngle = new QuickEngine.Vector3();
            this._scale = new QuickEngine.Vector3(1, 1, 1);
            this._localScale = new QuickEngine.Vector3(1, 1, 1);
            this._localToWorldMatrix = new QuickEngine.Matrix4();
            this._worldToLocalMatrix = new QuickEngine.Matrix4();
            this._childNameDict = {};
        }
        /**
         * 子节点数量
         */
        get childCount() {
            return this._children.length;
        }
        set childCount(val) {
        }
        /**
        * 返回父节点
        */
        get parent() {
            return this._parent;
        }
        /**
        * 设置父节点
        * @param {QuickEngine.Transform} parent 父节点, 为空则从当前父节点删除
        */
        set parent(parent) {
            this._parentNotified = false;
            let prevParent = this._parent;
            if (prevParent == parent) {
                return;
            }
            this._parent = parent;
            // remove from the previous parent
            if (prevParent) {
                let childs = prevParent._children;
                let index = childs.indexOf(this);
                if (index == -1) {
                    console.error("not found the node: " + this.node.name);
                }
                else {
                    childs.splice(index);
                    prevParent.needUpdate(true);
                }
                // insert into scene children
                QuickEngine.SceneManager.instance.currentScene.insertNode(this.node);
            }
            else {
                // this is a root node, remove from the scene.
                QuickEngine.SceneManager.instance.currentScene.removeNode(this.node);
            }
            if (parent) {
                parent._children.push(this);
            }
            this.needUpdate(true);
        }
        /*
         * 返回世界坐标
        */
        get position() {
            if (this._needTransformUpdate) {
                this._updateFromParent();
            }
            return this._position;
        }
        /*
         * 设置世界坐标
        */
        set position(val) {
            this._position = val;
            if (this._parent) {
                let localMat = this.worldToLocalMatrix;
                // 世界坐标转换到本地坐标系
                val = localMat.transformVector3(val);
            }
            this._localPosition.copy(val);
            this.needUpdate(false);
        }
        /*
         * 返回本地坐标
        */
        get localPosition() {
            return this._localPosition;
        }
        /*
         * 设置本地坐标
        */
        set localPosition(val) {
            this._localPosition.copy(val);
            this.needUpdate(false);
        }
        /*
         * 返回世界旋转四元数
        */
        get rotation() {
            if (this._needTransformUpdate) {
                this._updateFromParent();
            }
            return this._rotation;
        }
        /*
         * 设置世界旋转四元数
        */
        set rotation(q) {
            if (this._parent) {
                q = this._parent.rotation.inverse().multiply(q);
            }
            // 只需要设置localRotation, rotation会延迟自动计算
            this.localRotation = q;
            this._needEulerUpdate = true;
            this.needUpdate(false);
        }
        /*
         * 返回本地旋转四元数
        */
        get localRotation() {
            return this._localRotation;
        }
        /*
         * 设置本地旋转四元数
        */
        set localRotation(q) {
            this._localRotation.copyFrom(q);
            this._needEulerUpdate = true;
            this.needUpdate(false);
        }
        /*
         * 返回世界欧拉角
        */
        get eulerAngle() {
            if (this._needTransformUpdate) {
                this._updateFromParent();
            }
            this.rotation.toEulerAngle(this._eulerAngle);
            return this._eulerAngle;
        }
        /*
         * 设置本地欧拉角
        */
        set eulerAngle(e) {
            this._eulerAngle.copy(e);
            let tempQuat = new QuickEngine.Quaternion();
            this.rotation = tempQuat.fromEulerAngle(e);
            this.needUpdate(false);
        }
        /*
         * 返回本地欧拉角
        */
        get localEulerAngle() {
            if (this._needTransformUpdate) {
                this._updateFromParent();
            }
            this.localRotation.toEulerAngle(this._localEulerAngle);
            return this._localEulerAngle;
        }
        /*
         * 设置本地欧拉角
        */
        set localEulerAngle(e) {
            this._localEulerAngle.copy(e);
            this.localRotation = this._localRotation.fromEulerAngle(e);
            this.needUpdate(false);
        }
        /*
         * 返回世界缩放
        */
        get scale() {
            return this._scale;
        }
        /*
         * 设置世界缩放
        */
        set scale(s) {
            this._scale.copy(s);
            // TODO:
            this.needUpdate(false);
        }
        /*
         * 返回本地缩放
        */
        get localScale() {
            return this._localScale;
        }
        /*
         * 设置本地缩放
        */
        set localScale(s) {
            this._localScale.copy(s);
            this.needUpdate(false);
        }
        /*
         * 返回世界矩阵
        */
        get localToWorldMatrix() {
            if (this._needTransformUpdate) {
                this._updateFromParent();
            }
            return this._localToWorldMatrix;
        }
        /*
         * 设置本地矩阵
        */
        get worldToLocalMatrix() {
            let worldMatrix = this._worldToLocalMatrix;
            if (this._needWorldToLocalMatrixUpdate) {
                if (this._needTransformUpdate) {
                    this._updateFromParent();
                }
                let theRotation = this._localRotation;
                let axisX = new QuickEngine.Vector3(1, 0, 0);
                let axisY = new QuickEngine.Vector3(0, 1, 0);
                let axisZ = new QuickEngine.Vector3(0, 0, 1);
                axisX = theRotation.rotateVector3(axisX);
                axisY = theRotation.rotateVector3(axisY);
                axisZ = theRotation.rotateVector3(axisZ);
                worldMatrix.set(axisX.x, axisY.x, axisZ.x, 0, axisX.y, axisY.y, axisZ.y, 0, axisX.z, axisY.z, axisZ.z, 0, 0, 0, 0, 1);
                this._needWorldToLocalMatrixUpdate = false;
            }
            return worldMatrix;
        }
        removeChildren() {
            let childs = this._children;
            for (let i = 0, len = childs.length; i < len; i++) {
                let c = childs[i];
                c.parent = null;
            }
            this._children = [];
            this.needUpdate();
        }
        getChildByIndex(index) {
            let childs = this._children;
            if (index < 0 || index >= childs.length) {
                throw new Error("out of range");
            }
            return this._children[index];
        }
        find(name) {
            let thisChildNameDict = this._childNameDict;
            let child = thisChildNameDict[name];
            if (child) {
                return child;
            }
            let pathSegment = name.split("/");
            child = this._findByPath(pathSegment, 0);
            if (child) {
                thisChildNameDict[name] = child;
            }
            return child;
        }
        _findByPath(pathSegment, startIdx) {
            let deep = pathSegment.length;
            if (startIdx >= deep) {
                return null;
            }
            let theNode;
            let name = pathSegment[startIdx];
            if (this.node.name != name) {
                return null;
            }
            if (startIdx == deep - 1) {
                return this;
            }
            let childs = this._children;
            for (let i = 0, len = childs.length; i < len; i++) {
                let find = childs[i]._findByPath(pathSegment, startIdx + 1);
                if (find) {
                    return find;
                }
            }
        }
        findChild(name) {
            let thisChildNameDict = this._childNameDict;
            let pathSegment = name.split("/").splice(0, 0, this.node.name + "/");
            return this._findByPath(pathSegment, 1);
        }
        update(updateChildren, parentHasChanged) {
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
                let childs = this._children;
                for (let i = 0, len = childs.length; i < len; i++) {
                    childs[i].update(true, true);
                }
                this._needChildUpdate = false;
            }
            else {
                // 存在待更新的子节点
                let childs = this._childrenToUpdate;
                for (let i = 0, len = childs.length; i < len; i++) {
                    childs[i].update(true, false);
                }
            }
            // 清空待更新的数组
            this._childrenToUpdate.length = 0;
        }
        _updateFromParent() {
            this._needTransformUpdate = true;
            let parent = this._parent;
            if (parent) {
                // Update orientation
                let parentRotation = parent.rotation;
                this._rotation = this._localRotation.multiply(parentRotation);
                // Update scale
                let parentScale = parent.scale;
                this._scale = parentScale.multiplyVector3(this._localScale);
                // Change position vector based on parent's orientation & scale
                let tempPos = parentRotation.rotateVector3(parentScale.multiplyVector3(this._localPosition));
                // Add altered position vector to parents
                this._position = tempPos.add(parent.position);
            }
            else {
                this._position.copy(this._localPosition);
                this._rotation.copyFrom(this._localRotation);
                this._scale.copy(this._localScale);
            }
            QuickEngine.Matrix4.makeTransform(this._position, this._rotation, this._scale, this._localToWorldMatrix);
            this._needTransformUpdate = false;
            this._needParentUpdate = false;
            //TODO: post event node updated
        }
        needUpdate(forceParentUpdate) {
            this._needParentUpdate = true;
            this._needChildUpdate = true;
            this._needTransformUpdate = true;
            this._needWorldToLocalMatrixUpdate = true;
            let theParent = this._parent;
            if (theParent && (!this._parentNotified || forceParentUpdate)) {
                theParent.requestUpdate(this, forceParentUpdate);
                this._parentNotified = true;
            }
            this._childrenToUpdate.length = 0;
        }
        requestUpdate(child, forceParentUpdate) {
            if (this._needChildUpdate) {
                return;
            }
            this._childrenToUpdate.push(child);
            let theParent = this._parent;
            if (theParent && (!this._parentNotified || forceParentUpdate)) {
                theParent.requestUpdate(this, forceParentUpdate);
                this._parentNotified = true;
            }
        }
    }
    Transform.__ClassName__ = "QuickEngine.Transform";
    Transform.__ClassID__ = 0;
    QuickEngine.Transform = Transform;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class MeshFilter extends QuickEngine.Component {
        get mesh() {
            return this._mesh;
        }
        set mesh(mesh) {
            this._mesh = mesh;
        }
    }
    MeshFilter.__ClassName__ = "QuickEngine.MeshFilter";
    MeshFilter.__ClassID__ = 0;
    QuickEngine.MeshFilter = MeshFilter;
    /**
     * 网格
     */
    class Mesh extends QuickEngine.HashObject {
        constructor() {
            super();
            /**
             * 子网格数组
             */
            this.subMeshes = [];
        }
        get name() {
            return this._name;
        }
        set name(val) {
            this._name = val;
        }
        copy(object) {
            super.copy(object);
        }
        clone() {
            let m = new Mesh();
            m.copy(this);
            return m;
        }
        addSubMesh(subMesh) {
            if (QuickEngine.__DEBUG__) {
                console.assert(subMesh != null);
                console.assert(this.subMeshes.indexOf(subMesh) === -1);
            }
            subMesh.parent = this;
            this.subMeshes.push(subMesh);
        }
        createSubMesh(name) {
            // TODO: implement here            
            return undefined;
        }
        update() {
        }
        loadImpl() {
        }
        unloadImpl() {
        }
    }
    Mesh.__ClassName__ = "QuickEngine.Mesh";
    Mesh.__ClassID__ = 0;
    QuickEngine.Mesh = Mesh;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class MeshManager {
        constructor() {
        }
    }
    MeshManager.__ClassName__ = "QuickEngine.MeshManager";
    MeshManager.__ClassID__ = 0;
    QuickEngine.MeshManager = MeshManager;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class MeshSerializer {
        static exportMeshWithJson(mesh, filename) {
        }
        static exportMeshWithBinary(mesh, filename) {
        }
        static importMeshWithJson(meshData, mesh) {
            mesh.id = meshData.id;
            mesh.name = meshData.name;
            let vertices = [];
            let colors = [];
            let normals = [];
            let uvs = [];
            let indices = [];
            // load mesh info
            let position = meshData["position"] || [];
            for (let i = 0; i < position.length; i += 3) {
                vertices.push(position[i]);
                vertices.push(position[i + 1]);
                vertices.push(-position[i + 2]);
            }
            let color = meshData["color"] || [];
            for (let i = 0; i < Math.floor(position.length / 3); i++) {
                colors.push(255);
                colors.push(255);
                colors.push(255);
                colors.push(255);
            }
            let normal = meshData["normal"] || [];
            for (let i = 0; i < normal.length; i += 3) {
                let p = normal[i];
                normals.push(normal[i]);
                normals.push(normal[i + 1]);
                normals.push(normal[i + 2]);
            }
            let uv = meshData["uv"] || [];
            for (let i = 0; i < uv.length; i += 2) {
                uvs.push(uv[i]);
                uvs.push(uv[i + 1]);
            }
            let posBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            posBuf.type = QuickEngine.gl.FLOAT;
            posBuf.semantic = 1 /* POSITION */;
            posBuf.vertexCount = vertices.length / 3;
            posBuf.writeData((new Float32Array(vertices)).buffer);
            posBuf.bindBuffer();
            let colBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, 1 /* STATIC */);
            colBuf.type = QuickEngine.gl.UNSIGNED_BYTE;
            colBuf.semantic = 5 /* DIFFUSE */;
            colBuf.vertexCount = colors.length;
            colBuf.writeData((new Uint8Array(colors)).buffer);
            colBuf.bindBuffer();
            let normalBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            normalBuf.type = QuickEngine.gl.FLOAT;
            normalBuf.semantic = 4 /* NORMAL */;
            normalBuf.vertexCount = normals.length;
            normalBuf.writeData((new Float32Array(normals)).buffer);
            normalBuf.bindBuffer();
            let uvBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, 1 /* STATIC */);
            uvBuf.type = QuickEngine.gl.FLOAT;
            uvBuf.semantic = 7 /* TEXTURE_COORDINATES */;
            uvBuf.vertexCount = uvs.length;
            uvBuf.writeData((new Float32Array(uvs)).buffer);
            uvBuf.bindBuffer();
            let sharedVertexData = [];
            sharedVertexData[0] = posBuf;
            sharedVertexData[1] = colBuf;
            sharedVertexData[2] = normalBuf;
            sharedVertexData[3] = uvBuf;
            mesh.sharedVertexData = sharedVertexData;
            let subMeshes = meshData["subMeshes"];
            for (let i = 0, len = subMeshes.length; i < len; i++) {
                let indicesData = meshData["subMeshes"][0]["indices"];
                for (let i = 0; i < indicesData.length; i++) {
                    indices.push(indicesData[i]);
                }
                let subMesh = new QuickEngine.SubMesh();
                // 共享mesh顶点数据
                subMesh.useSharedVertices = true;
                // TODO: 解析material
                let defmaterial = QuickEngine.Material.getDefaultCubeMaterial();
                // 子网格索引数据
                let indicesBuf = QuickEngine.WebGLBufferManager.instance.createIndexBuffer(indices.length, 1 /* STATIC */, false);
                indicesBuf.writeData(indices);
                indicesBuf.bindBuffer();
                subMesh.indexData = indicesBuf;
                mesh.addSubMesh(subMesh);
            }
        }
        static importMeshWithBinary(data, mesh) {
        }
        static loadModel(modelData) {
            let currentScene = QuickEngine.SceneManager.instance.currentScene;
            let rootNodes = [];
            //export interface ModelData {
            //    metadata: string;
            //    materials?: string[];
            //    textures?: string[];
            //    skeleton?: SkeletonData[];
            //    poses?: PoseData[];
            //    hierarchy?: BoneData[];
            //    meshes: MeshData[];
            //    animations?: Object[];
            //}
            let hierarchyData = modelData.hierarchy;
            let hierarchy = {};
            for (let i = 0, len = hierarchyData.length; i < len; i++) {
                let boneData = hierarchyData[i];
                console.assert(!!!hierarchy[boneData.id], "重复的骨骼id: " + boneData.id);
                let parentBoneNode = hierarchy[boneData.parentId];
                let boneNode;
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
                let boneTransform = boneNode.transform;
                boneTransform.localPosition = new QuickEngine.Vector3(boneData.position[0], boneData.position[1], boneData.position[2]);
                boneTransform.localScale = new QuickEngine.Vector3(boneData.scale[0], boneData.scale[1], boneData.scale[2]);
                let eulerAngle = new QuickEngine.Vector3(boneData.eulerAngle[0], boneData.eulerAngle[1], boneData.eulerAngle[2]);
                let tempQ = boneTransform.localRotation.fromEulerAngle(eulerAngle);
                boneTransform.localRotation = tempQ;
            }
            // bind pose
            let poseDatas = modelData.poses || [];
            for (let i = 0, len = poseDatas.length; i < len; i++) {
                let poseData = poseDatas[i];
                if (poseData.isBindPose) {
                    let isCharacter = poseData.isCharacter;
                    let poseItems = poseData.items;
                    let poseItemDict = {};
                    for (let ii = 0, len2 = poseItems.length; ii < len2; ii++) {
                        poseItemDict[poseItems[ii].id] = poseItems[ii];
                    }
                    for (let ii = 0, len2 = hierarchyData.length; ii < len2; ii++) {
                        let data = hierarchyData[ii];
                        let poseItem = poseItemDict[data.id];
                        if (!poseItem) {
                            continue;
                        }
                        let bindNode = hierarchy[data.id];
                        if (!bindNode) {
                            console.error("bind pose error. bone not find: " + poseItem.id);
                            continue;
                        }
                        let matrix = poseItem.matrix;
                        let mat = new QuickEngine.Matrix4();
                        mat.set(matrix[0], matrix[4], matrix[8], matrix[12], matrix[1], matrix[5], matrix[9], matrix[13], matrix[2], matrix[6], matrix[10], matrix[14], matrix[3], matrix[7], matrix[11], matrix[15]);
                        if (poseItem.isLocalMatrix) {
                            // bindNode.transform.position = mat.getTrans();
                            let q = new QuickEngine.Quaternion();
                            q.FromRotationMatrix(mat);
                            // bindNode.transform.localRotation = bindNode.transform.localRotation.multiply(q);
                        }
                        else {
                            // bindNode.transform.position = mat.getTrans();
                            let q = new QuickEngine.Quaternion();
                            q.FromRotationMatrix(mat);
                            bindNode.transform.rotation = bindNode.transform.localRotation.multiply(q);
                        }
                    }
                }
            }
            for (let i = 0, len = hierarchyData.length; i < len; i++) {
                let boneData = hierarchyData[i];
                let boneNode = hierarchy[boneData.id];
                let boneTransform = boneNode.transform;
                console.log("load bone {" + boneData.name + "}. pos: " + JSON.stringify(boneTransform.localPosition) +
                    "  \n euler: " + JSON.stringify(boneTransform.localEulerAngle) +
                    "  \n rot: " + JSON.stringify(boneTransform.localRotation));
            }
            // add mesh component
            let meshes = modelData.meshes;
            for (let i = 0, len = meshes.length; i < len; i++) {
                let meshData = meshes[i];
                let meshNode = hierarchy[meshData.id];
                if (!meshNode) {
                    console.error("bind pose error. bone not find: " + meshData.id);
                    continue;
                }
                meshNode.name = meshData.name;
                let mesh = new QuickEngine.Mesh();
                MeshSerializer.importMeshWithJson(meshData, mesh);
                let meshFilter = meshNode.addComponent(QuickEngine.MeshFilter);
                meshFilter.mesh = mesh;
                let meshRender = meshNode.addComponent(QuickEngine.MeshRender);
                meshRender.mesh = mesh;
                meshRender.setMaterial(QuickEngine.Material.getDefaultCubeMaterial());
            }
            // load animation
            let animations = modelData.animations || [];
            if (animations && animations.length > 0) {
                // 创建动画控制器
                let animController = new QuickEngine.AnimatorController();
                for (let i = 0, len = animations.length; i < len; i++) {
                    let animData = animations[i];
                    let clip = parseAnimationClip(animData);
                    animController.addClip(clip);
                }
                // 添加Animator组件
                let animator = rootNodes[0].addComponent(QuickEngine.Animator);
                animator.animController = animController;
            }
            //animator.play("Take 001");
            return rootNodes[0];
        }
    }
    QuickEngine.MeshSerializer = MeshSerializer;
    function parseAnimationClip(animData) {
        // 创建动画片段
        let posClip = new QuickEngine.AnimationClip();
        posClip.name = "Take 001";
        let maxTime = 0;
        for (let nodePath in animData) {
            let nodeCurveData = animData[nodePath];
            for (let curveName in nodeCurveData) {
                if (curveName == '') {
                    continue;
                }
                let curveData = nodeCurveData[curveName];
                let curve = new QuickEngine.AnimationCurve();
                for (let i = 0, len = curveData.length; i < len; i++) {
                    let keyFrameData = curveData[i];
                    let reverse = 1;
                    if (curveName.indexOf("localEulerAngle.z") > -1 || curveName.indexOf("localPosition.z") > -1) {
                        reverse = -1;
                    }
                    curve.addKeyFrameByValue(keyFrameData["time"], reverse * keyFrameData["value"]);
                    if (keyFrameData["time"] > maxTime) {
                        maxTime = keyFrameData["time"];
                    }
                }
                if (nodePath != '') {
                    posClip.addCurve(nodePath, QuickEngine.Reflection.Type.typeOf(QuickEngine.Transform), curveName, curve);
                }
                else {
                    posClip.addCurve("RootNode", QuickEngine.Reflection.Type.typeOf(QuickEngine.Transform), curveName, curve);
                }
            }
        }
        posClip.length = maxTime;
        return posClip;
    }
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class SubMesh {
        constructor() {
        }
        set materialName(val) {
            this._materialName = val;
        }
        get materialName() {
            return this._materialName;
        }
        /**
         * 复制一个新的SubMesh
         * @param newName 新的SubMesh名称
         * @param parentMesh 新的Submesh父Mesh, 如果为空, 父Mesh为被克隆的Mesh父Mesh
         */
        clone(newName, parentMesh) {
            if (parentMesh) {
                let newSubmesh = parentMesh.createSubMesh(newName);
            }
            else {
                let newSubmesh = this.parent.createSubMesh(newName);
            }
        }
        getRenderOpreation(renderOp) {
            renderOp.indexBuffer = this.indexData;
            renderOp.renderOpType = this.renderOpType;
            renderOp.vertexBuffers = this.useSharedVertices ? this.parent.sharedVertexData : this.vertexData;
        }
    }
    SubMesh.__ClassName__ = "QuickEngine.__ClassName__";
    SubMesh.__ClassID__ = 0;
    QuickEngine.SubMesh = SubMesh;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../../../core/HashObject.ts" />
var QuickEngine;
///<reference path="../../../core/HashObject.ts" />
(function (QuickEngine) {
    /**
     * 动画片段
     * 动画片段包含一组动画曲线.每个曲线对应节点路径
     */
    class AnimationClip extends QuickEngine.HashObject {
        /**
         *
         */
        constructor() {
            super();
            this._frameRate = 0;
            this._length = 0;
            this._keyFrameTimes = [];
            this._positionCurveDict = {};
            this._scaleCurveDict = {};
            this._eulerCurveDict = {};
            this._numberCurveDict = {};
            this._objCurveDict = {};
        }
        get frameRate() {
            return this._frameRate;
        }
        set frameRate(val) {
            this._frameRate = val;
        }
        get length() {
            return this._length;
        }
        set length(val) {
            this._length = val;
        }
        get name() {
            return this._name;
        }
        set name(val) {
            this._name = val;
        }
        /**
         * 添加一条曲线
         * @param relativePath 曲线对应节点路径
         * @param type 属性类型
         * @param propertyName 属性名
         * @param curve 曲线
         */
        addCurve(relativePath, type, propertyName, curve) {
            curve._propName = propertyName;
            curve._valueType = type;
            if (type.equal(QuickEngine.Reflection.Type.typeOf(QuickEngine.Transform))) {
                let segmentProp = splitProperty(propertyName);
                console.assert(segmentProp.length == 2, "Transform属性长度为2");
                let transCurveArr;
                if (segmentProp[0] == 'localPosition') {
                    transCurveArr = this._positionCurveDict[relativePath];
                    if (!transCurveArr) {
                        this._positionCurveDict[relativePath] = transCurveArr = [];
                    }
                }
                else if (segmentProp[0] == "localEulerAngle") {
                    transCurveArr = this._eulerCurveDict[relativePath];
                    if (!transCurveArr) {
                        this._eulerCurveDict[relativePath] = transCurveArr = [];
                    }
                }
                else if (segmentProp[0] == "localScale") {
                    transCurveArr = this._scaleCurveDict[relativePath];
                    if (!transCurveArr) {
                        this._scaleCurveDict[relativePath] = transCurveArr = [];
                    }
                }
                else {
                    console.error("不支持的变换属性：" + segmentProp[0]);
                }
                if (segmentProp[1] == 'x') {
                    transCurveArr.splice(0, 1, curve);
                }
                else if (segmentProp[1] == 'y') {
                    transCurveArr.splice(1, 1, curve);
                }
                else if (segmentProp[1] == 'z') {
                    transCurveArr.splice(2, 1, curve);
                }
            }
            else if (type.equal(QuickEngine.Reflection.Type.typeOf(Number))) {
                let numberCurveArr = this._numberCurveDict[relativePath];
                if (!numberCurveArr) {
                    this._numberCurveDict[relativePath] = numberCurveArr = [];
                }
                numberCurveArr.push(curve);
            }
            else {
                let objCurveArr = this._objCurveDict[relativePath];
                if (objCurveArr) {
                    this._objCurveDict[relativePath] = objCurveArr = [];
                }
                objCurveArr.push(curve);
            }
        }
        removeCurve(relativePath, type, propertyName) {
            let curveArr = this._objCurveDict[relativePath];
            if (!curveArr) {
                console.warn('[AnimationClip.removeCurve] 删除的curve不存在. path: ' + relativePath + '  propertyName: ' + propertyName);
                return;
            }
            for (let i = 0, len = curveArr.length; i < len; i++) {
                let curve = curveArr[i];
                if (curve._propName == propertyName) {
                    curveArr.splice(i, 1);
                    return;
                }
            }
            console.warn('[AnimationClip.removeCurve] 删除的curve不存在. path: ' + relativePath + '  propertyName: ' + propertyName);
        }
        /**
         * 清除动画数据
         */
        clearAllCurves() {
            this._positionCurveDict = {};
            this._scaleCurveDict = {};
            this._eulerCurveDict = {};
            this._numberCurveDict = {};
            this._objCurveDict = {};
        }
        apply(node, timePos) {
            let timeIndex = this.getTimeIndex(timePos);
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
            let meshFilter = node.transform.getComponent(QuickEngine.MeshFilter);
            if (!meshFilter) {
                return;
            }
            let mesh = meshFilter.mesh;
            if (!mesh) {
                return;
            }
            // 网格形变动画
        }
        _applyScale(node, timeIndex, weight) {
            let curveDict = this._scaleCurveDict;
            let timePos = timeIndex.timePos;
            let keyIndex = timeIndex.keyIndex;
            // apply position
            for (let path in curveDict) {
                let target;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                }
                else {
                    target = node.transform.find(path);
                }
                if (!target) {
                    console.warn("[AnimationClip._applyScale] 动画对象节点不存在： " + path);
                    continue;
                }
                let objCurves = curveDict[path];
                let curveX = objCurves[0];
                let curveY = objCurves[1];
                let curveZ = objCurves[2];
                let interpolationX = curveX.getInterpolation(timePos, keyIndex);
                let interpolationY = curveY.getInterpolation(timePos, keyIndex);
                let interpolationZ = curveZ.getInterpolation(timePos, keyIndex);
                // TODO: 计算权重
                // 设置本地坐标
                target.localScale = target.localScale.set(interpolationX, interpolationY, interpolationZ);
            }
        }
        _applyRotation(node, timeIndex, weight) {
            let curveDict = this._eulerCurveDict;
            let timePos = timeIndex.timePos;
            let keyIndex = undefined; //timeIndex.keyIndex;
            // apply position
            for (let path in curveDict) {
                let target;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                }
                else {
                    target = node.transform.find(path);
                }
                if (!target) {
                    console.warn("[AnimationClip._applyRotation] 动画对象节点不存在： " + path);
                    continue;
                }
                let objCurves = curveDict[path];
                let curveX = objCurves[0];
                let curveY = objCurves[1];
                let curveZ = objCurves[2];
                let interpolationX = curveX.getInterpolation(timePos);
                let interpolationY = curveY.getInterpolation(timePos);
                let interpolationZ = curveZ.getInterpolation(timePos);
                // TODO: 计算权重
                // 设置本地坐标                
                target.localRotation = target.localRotation.fromEulerAngleScalar(interpolationX, interpolationY, interpolationZ);
            }
        }
        _applyPosition(node, timeIndex, weight) {
            let curveDict = this._positionCurveDict;
            let timePos = timeIndex.timePos;
            let keyIndex = timeIndex.keyIndex;
            // apply position
            for (let path in curveDict) {
                let target;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                }
                else {
                    target = node.transform.find(path);
                }
                if (!target) {
                    console.warn("[AnimationClip._applyPosition] 动画对象节点不存在： " + path);
                    continue;
                }
                let objCurves = curveDict[path];
                let curveX = objCurves[0];
                let curveY = objCurves[1];
                let curveZ = objCurves[2];
                let interpolationX = curveX.getInterpolation(timePos);
                let interpolationY = curveY.getInterpolation(timePos);
                let interpolationZ = curveZ.getInterpolation(timePos);
                // TODO: 计算权重
                // 设置本地坐标
                target.localPosition = target.localPosition.set(interpolationX, interpolationY, interpolationZ);
            }
        }
        _applyObj(node, timeIndex, weight) {
            let curveDict = this._objCurveDict;
            let timePos = timeIndex.timePos;
            let keyIndex = timeIndex.keyIndex;
            for (let path in curveDict) {
                let target;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                }
                else {
                    target = node.transform.find(path);
                }
                if (!target) {
                    console.warn("[AnimationClip._applyObj] 动画对象节点不存在： " + path);
                    continue;
                }
                let objCurveArr = curveDict[path];
                for (let i = 0, len = objCurveArr.length; i < len; i++) {
                    let objCurve = objCurveArr[i];
                    if (!objCurve._valueType.hasOwnProperty(objCurve._propName)) {
                        console.error('脚本属性不存在. PropName: ' + objCurve._propName);
                        continue;
                    }
                    let comp = target.getComponent(QuickEngine.Component.__ClassName__);
                    let interpolation = objCurve.getInterpolation(timePos, keyIndex);
                    // TODO: 计算权重
                    // 设置脚本属性
                    comp[objCurve._propName] = comp;
                }
            }
        }
        getTimeIndex(timePos) {
            if (this._keyFrameTimesDirty) {
                this.buildKeyFrameTimeList();
            }
            let totalAnimationLength = this.length;
            if (timePos > totalAnimationLength && totalAnimationLength > 0.0) {
                timePos = timePos % totalAnimationLength;
            }
            let keyFrameTimes = this._keyFrameTimes;
            let index = 0;
            for (let i = 0, len = this._keyFrameTimes.length; i < len - 1; i++) {
                let prev = keyFrameTimes[i];
                let next = keyFrameTimes[i + 1];
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
        }
        buildKeyFrameTimeList() {
            let thisKeyFrameTimes = this._keyFrameTimes;
            let thisCurveDict = this._positionCurveDict;
            //let keys = Object.keys(thisCurveDict);
            for (let key in thisCurveDict) {
                let val = thisCurveDict[key];
                for (let i = 0, len = val.length; i < len; i++) {
                    let curve = val[i];
                    curve._collectKeyFrameTimes(thisKeyFrameTimes);
                }
            }
            this._keyFrameTimesDirty = false;
        }
    }
    AnimationClip.__ClassName__ = "QuickEngine.AnimationClip";
    AnimationClip.__ClassID__ = 0;
    QuickEngine.AnimationClip = AnimationClip;
    function splitProperty(prop) {
        return prop.split('.');
    }
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class AnimationCurve {
        constructor(objCurve = false) {
            this._isObjCurve = false;
            this._keyFrames = [];
            this._isObjCurve = objCurve;
        }
        isObjectKeyFrame() {
            return false;
        }
        getKeyFrameCount() {
            return this._keyFrames.length;
        }
        addKeyFrame(keyFrame, index) {
            // 检查KeyFrame类型是否一致
            if (QuickEngine.__EDITOR_MODE__) {
                if (this._keyFrames.length > 0) {
                }
            }
            if (index === undefined || this._keyFrames.length <= index) {
                this._keyFrames.push(keyFrame);
                return;
            }
            this._keyFrames.splice(index, 0, keyFrame);
        }
        addKeyFrameByValue(time, value, inTangent, outTangent, index) {
            // 检查KeyFrame类型是否一致
            if (QuickEngine.__EDITOR_MODE__) {
                if (this._keyFrames.length > 0) {
                }
            }
            let keyFrame = new QuickEngine.KeyFrame(time, value, inTangent, outTangent);
            if (index === undefined || this._keyFrames.length <= index) {
                this._keyFrames.push(keyFrame);
                return;
            }
            this._keyFrames.splice(index, 0, keyFrame);
        }
        moveKeyFrame(index, keyFrame) {
            let thisKeyFrame = this._keyFrames;
            if (index < 0 || thisKeyFrame.length > index) {
                return;
            }
            thisKeyFrame.splice(index, 1);
            thisKeyFrame.splice(index, 0, keyFrame);
        }
        removeKeyFrame(index) {
            let thisKeyFrame = this._keyFrames;
            if (index < 0 || thisKeyFrame.length > index) {
                return;
            }
            this._keyFrames.splice(index, 1);
        }
        /**
         * 根据时间索引, 取得当前一对关键帧
         * @param {number} timePos 动画时间位置，这个时间应当和动画片段的总时间做过取余计算
         * @param {number} keyIndex 帧索引
         * @return {KeyFramePair}
         */
        getKeyFramePairAtTime(timePos, keyIndex) {
            let keyframe1, keyframe2;
            let keys = this._keyFrames;
            // 直接设置帧索引
            if (keyIndex !== undefined) {
                if (keyIndex + 1 == keys.length) {
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
                let i = 1;
                let len = keys.length;
                for (; i < len; i++) {
                    let frame = keys[i - 1];
                    let nextFrame = keys[i];
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
                    if (i == len - 1) {
                        // k1_time---------laseKey_time---------timePos
                        i++;
                        break;
                    }
                }
                if (i == 0) {
                    keyframe1 = keys[i];
                    keyframe2 = keys[i];
                }
                else if (i == len) {
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
            let total = keyframe2.time - keyframe1.time;
            let elapsed = timePos - keyframe1.time;
            let t = (total == 0 || elapsed == 0) ? 0 : elapsed / total;
            let pair = {
                keyframe1: keyframe1,
                keyframe2: keyframe2,
                t: t
            };
            return pair;
        }
        /**
         * 根据时间索引, 计算关键帧插值
         * @param {number} timePos 时间点
         * @param {number} keyIndex 索引
         */
        getInterpolation(timePos, keyIndex) {
            if (this._keyFrames.length == 0) {
                return 0;
            }
            let ret = 0;
            // #1 根据时间点, 取得前后一组关键帧
            let keyFramePair = this.getKeyFramePairAtTime(timePos, keyIndex);
            let k1 = keyFramePair.keyframe1;
            let k2 = keyFramePair.keyframe2;
            // 插值系数为0，直接返回k1帧的值
            if (keyFramePair.t == 0) {
                return k1.value;
            }
            // #2 求两关键帧在当前时间的插值
            let interpolationMode = k1.interpolationMode;
            switch (interpolationMode) {
                case 0 /* Liner */:
                    {
                        QuickEngine.MathUtil.clampf;
                        ret = QuickEngine.MathUtil.lerp(k1.value, k2.value, keyFramePair.t);
                    }
                    break;
                case 1 /* Spline */:
                    {
                        // TODO: 补全样条插值
                        ret = QuickEngine.MathUtil.lerp(k1.value, k2.value, keyFramePair.t);
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
                        console.error("[AnimationCurve.getInterpolation] 不支持的插值类型: " + interpolationMode);
                    }
                    break;
            }
            return ret;
        }
        /**
         * 收集所有关键帧时间
         * @param outKeyFrameTimes 关键帧时间数组
         */
        _collectKeyFrameTimes(outKeyFrameTimes) {
            let thisKeyFrames = this._keyFrames;
            // 遍历所有关键帧, 如果outKeyFrameTimes没有包含关键帧时间, 插入关键帧时间
            for (let i = 0, len = thisKeyFrames.length; i < len; i++) {
                let keyFrame = thisKeyFrames[i];
                let timePos = keyFrame.time;
                let index = 0;
                let keyTimePos = 0;
                for (let j = 0, len = outKeyFrameTimes.length; j < len - 1; j++) {
                    let prev = outKeyFrameTimes[j];
                    let next = outKeyFrameTimes[j + 1];
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
                if (index == len || timePos != keyTimePos) {
                    outKeyFrameTimes.splice(index, 0, timePos);
                }
            }
        }
        _buildKeyFrameIndexMap(outKeyFrameTimes) {
            // Pre-allocate memory
            //mKeyFrameIndexMap.resize(keyFrameTimes.size() + 1);
            //size_t i = 0, j = 0;
            //while (j <= keyFrameTimes.size()) {
            //    mKeyFrameIndexMap[j] = static_cast<ushort>(i);
            //    while (i < mKeyFrames.size() && mKeyFrames[i] ->getTime() <= keyFrameTimes[j])
            //        ++i;
            //    ++j;
            //}
        }
    }
    AnimationCurve.__ClassName__ = "QuickEngine.AnimationCurve";
    AnimationCurve.__ClassID__ = 0;
    QuickEngine.AnimationCurve = AnimationCurve;
    //export class QuaternionCurve extends AnimationCurve {
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
    //}
    //export class VectorCurve extends AnimationCurve {
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
    //}
    //export class NumericCurve extends AnimationCurve {
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
    //}
    //export class ObjectCurve extends AnimationCurve {
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
    //}
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class AnimationLoader {
        static load(fileJson) {
        }
    }
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    let AnimationBlendMode;
    (function (AnimationBlendMode) {
        AnimationBlendMode[AnimationBlendMode["Add"] = 0] = "Add";
    })(AnimationBlendMode = QuickEngine.AnimationBlendMode || (QuickEngine.AnimationBlendMode = {}));
    /**
     * 动画控制器
     * 动画控制器控制管理一组动画片段
     */
    class AnimationState {
        constructor() {
            this._blendMode = AnimationBlendMode.Add;
        }
        get blendMode() {
            return this._blendMode;
        }
        set blendMode(val) {
            this._blendMode = val;
        }
        get clip() {
            return this._clip;
        }
        AddMixingTransform(mix, recursive = true) {
        }
        RemoveMixingTransform(mix) {
        }
    }
    QuickEngine.AnimationState = AnimationState;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../../Component.ts" />
///<reference path="AnimationLoader.ts"/>
var QuickEngine;
///<reference path="../../Component.ts" />
///<reference path="AnimationLoader.ts"/>
(function (QuickEngine) {
    /**
     * 动画播放器
     * 动画控制器控制动画的状态切换
     */
    class Animator extends QuickEngine.Component {
        constructor() {
            super();
            this._timePos = 0;
            /**
             * 更新动画
             *@param {number} deltaTime 间隔时间
             */
            this.onUpdate = (deltaTime) => {
                if (!this._playingClip) {
                    return;
                }
                this._timePos += deltaTime;
                this._playingClip.apply(this.node, this._timePos);
                if (this._timePos >= this._playingClip.length) {
                    this.stop();
                }
            };
        }
        get animController() {
            return this._animController;
        }
        set animController(animController) {
            this._animController = animController;
        }
        play(animName) {
            if (this._playingClip && this._playingClip.name == animName) {
                return;
            }
            if (!this._animController) {
                return;
            }
            let clips = this._animController.animationClips;
            for (let i = 0, len = clips.length; i < len; i++) {
                let clip = clips[i];
                if (clip.name == animName) {
                    this._playingClip = clip;
                    break;
                }
            }
            this._timePos = 0;
        }
        stop() {
            this._playingClip = undefined;
            this._timePos = 0;
        }
    }
    Animator.__ClassName__ = "QuickEngine.Animator";
    Animator.__ClassID__ = 0;
    QuickEngine.Animator = Animator;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    /**
     * 动画控制器
     * 动画控制器控制管理一组动画片段
     */
    class AnimatorController extends QuickEngine.HashObject {
        constructor() {
            super();
            this._animationClips = [];
        }
        get animationClips() {
            return this._animationClips;
        }
        set animationClips(clips) {
            this._animationClips = clips;
        }
        addClip(clip) {
            this._animationClips.push(clip);
        }
        removeClip(clip) {
            let clips = this._animationClips;
            let idx = clips.indexOf(clip);
            if (idx != -1) {
                clips.splice(idx, 1);
            }
        }
    }
    QuickEngine.AnimatorController = AnimatorController;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../../Node.ts" />
var QuickEngine;
///<reference path="../../Node.ts" />
(function (QuickEngine) {
    /**
     * 骨骼
     */
    class Bone {
        constructor(skeleton, name) {
            this._skeleton = skeleton;
            this._name = name;
        }
        get name() {
            return this._name;
        }
        set name(val) {
            this._name = val;
        }
        get handle() {
            return this._handle;
        }
        set handle(val) {
            this._handle = val;
        }
        get node() {
            return this._node;
        }
        set node(val) {
            this._node = val;
        }
        _update(updateChilren, parentHasChanged) {
            this._node.transform.update(updateChilren, parentHasChanged);
        }
    }
    Bone.__ClassName__ = "QuickEngine.Bone";
    Bone.__ClassID__ = 0;
    QuickEngine.Bone = Bone;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    /**
     *
     */
    class KeyFrame {
        constructor(time, value, inTangent = 0, outTangent = 0) {
            this._interpolationMode = 0 /* Liner */;
            this._time = time;
            this._value = value;
            this._inTangent = inTangent;
            this._outTangent = outTangent;
        }
        /**
         * 返回关键帧所在时间，以毫秒为单位
         *@return {number}
         */
        get time() {
            return this._time;
        }
        /**
         * 设置关键帧所在时间，以毫秒为单位
         *@param {number} val 时间
         */
        set time(val) {
            this._time = val;
        }
        get value() {
            return this._value;
        }
        set value(val) {
            this._value = val;
        }
        get inTangent() {
            return this._inTangent;
        }
        set inTangent(val) {
            this._inTangent = val;
        }
        get outTangent() {
            return this._outTangent;
        }
        set outTangent(val) {
            this._outTangent = val;
        }
        get interpolationMode() {
            return this._interpolationMode;
        }
        set interpolationMode(val) {
            this._interpolationMode = val;
        }
    }
    KeyFrame.__ClassName__ = "QuickEngine.KeyFrame";
    KeyFrame.__ClassID__ = 0;
    QuickEngine.KeyFrame = KeyFrame;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Skeleton {
        constructor(name) {
            this._boneMapByName = {};
            this._boneMapByPath = {};
            this._name = name;
        }
        createBone(name, relativePath) {
            console.assert(!!this._boneMapByPath[name], "[Skeleton.createBone] A bone with the releativePath " + relativePath + " already exists");
            let bone = new QuickEngine.Bone(this, name);
            this._boneMapByName[name] = bone;
            this._boneMapByPath[relativePath] = bone;
            return bone;
        }
        getRootBone() {
            let rootBones = this._rootBones;
            if (!rootBones) {
                rootBones = this._rootBones = [];
            }
            if (rootBones.length == 0) {
                for (let i = 0; i < rootBones.length; i++) {
                    let bone = rootBones[i];
                    // 没有父节点的骨骼皆为根骨骼
                    if (!bone.node.transform.parent) {
                        rootBones.push(bone);
                    }
                }
            }
            return rootBones[0];
        }
        getBone(name) {
            return this._boneMapByName[name];
        }
        getBoneByPath(relativePath) {
            return this._boneMapByPath[relativePath];
        }
        hasBone(name) {
            return !!this._boneMapByName[name];
        }
        updateTransforms() {
            let rootBones = this._rootBones;
            for (let i = 0, len = rootBones.length; i < len; i++) {
                let rootBone = rootBones[i];
                rootBone._update(true, false);
            }
        }
    }
    Skeleton.__NameSpace__ = "QuickEngine";
    Skeleton.__ClassName__ = "Skeleton";
    Skeleton.__FullClassName__ = "QuickEngine.Skeleton";
    Skeleton.__ClassID__ = 0;
    QuickEngine.Skeleton = Skeleton;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class FbxPrefab {
        load(json) {
        }
    }
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
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
    const CUBE_SIZE = 1.0;
    const CUBE_HALF_SIZE = CUBE_SIZE / 2.0;
    const CubeMeshData = {
        vertices: [
            // front side
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            // back side
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            // left side
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            // right side
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            // up side
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            // down side
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,
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
    class PrefabFactory {
        static createCube(mesh) {
            let subMesh = new QuickEngine.SubMesh();
            mesh.addSubMesh(subMesh);
            let posBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            posBuf.type = QuickEngine.gl.FLOAT;
            posBuf.semantic = 1 /* POSITION */;
            posBuf.vertexCount = CubeMeshData.vertices.length;
            posBuf.writeData((new Float32Array(CubeMeshData.vertices)).buffer);
            posBuf.bindBuffer();
            let colBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, 1 /* STATIC */);
            colBuf.type = QuickEngine.gl.UNSIGNED_BYTE;
            colBuf.semantic = 5 /* DIFFUSE */;
            colBuf.vertexCount = CubeMeshData.colors.length;
            colBuf.writeData((new Uint8Array(CubeMeshData.colors)).buffer);
            colBuf.bindBuffer();
            let normalBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            normalBuf.type = QuickEngine.gl.FLOAT;
            normalBuf.semantic = 4 /* NORMAL */;
            normalBuf.vertexCount = CubeMeshData.normals.length;
            normalBuf.writeData((new Float32Array(CubeMeshData.normals)).buffer);
            normalBuf.bindBuffer();
            let uvBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, 1 /* STATIC */);
            uvBuf.type = QuickEngine.gl.FLOAT;
            uvBuf.semantic = 7 /* TEXTURE_COORDINATES */;
            normalBuf.vertexCount = CubeMeshData.uvs.length;
            uvBuf.writeData((new Float32Array(CubeMeshData.uvs)).buffer);
            uvBuf.bindBuffer();
            let vertexData = [];
            vertexData[0] = posBuf;
            vertexData[1] = colBuf;
            vertexData[2] = normalBuf;
            vertexData[3] = uvBuf;
            subMesh.vertexData = vertexData;
            let indicesBuf = QuickEngine.WebGLBufferManager.instance.createIndexBuffer(CubeMeshData.indices.length, 1 /* STATIC */, false);
            indicesBuf.writeData(CubeMeshData.indices);
            indicesBuf.bindBuffer();
            subMesh.indexData = indicesBuf;
        }
        static createSphere(mesh) {
            const NUM_SEGMENTS = 24;
            const NUM_RINGS = 24;
            const SPHERE_RADIUS = 1;
            let subMesh = new QuickEngine.SubMesh();
            mesh.addSubMesh(subMesh);
            let vertices = [
                1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0
            ];
            let posBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            posBuf.type = QuickEngine.gl.FLOAT;
            posBuf.semantic = 1 /* POSITION */;
            posBuf.vertexCount = Math.floor(vertices.length / 3);
            posBuf.writeData((new Float32Array(vertices)).buffer);
            posBuf.bindBuffer();
            let colorBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, 1 /* STATIC */);
            colorBuf.type = QuickEngine.gl.UNSIGNED_BYTE;
            colorBuf.semantic = 5 /* DIFFUSE */;
            colorBuf.vertexCount = CubeMeshData.colors.length;
            colorBuf.writeData((new Uint8Array(CubeMeshData.colors)).buffer);
            colorBuf.bindBuffer();
            let normalBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 1 /* STATIC */);
            normalBuf.type = QuickEngine.gl.FLOAT;
            normalBuf.semantic = 4 /* NORMAL */;
            normalBuf.vertexCount = CubeMeshData.normals.length;
            normalBuf.writeData((new Float32Array(CubeMeshData.normals)).buffer);
            normalBuf.bindBuffer();
            let uvBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, 1 /* STATIC */);
            uvBuf.type = QuickEngine.gl.FLOAT;
            uvBuf.semantic = 7 /* TEXTURE_COORDINATES */;
            normalBuf.vertexCount = CubeMeshData.uvs.length;
            uvBuf.writeData((new Float32Array(CubeMeshData.uvs)).buffer);
            uvBuf.bindBuffer();
            let vertexData = [];
            vertexData[0] = posBuf;
            vertexData[1] = colorBuf;
            vertexData[2] = normalBuf;
            vertexData[3] = uvBuf;
            subMesh.vertexData = vertexData;
        }
    }
    QuickEngine.PrefabFactory = PrefabFactory;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    ;
    class RenderOperation {
        constructor() {
            this.renderOpType = 3 /* TRIANGLE_LIST */;
            this.numberOfInstances = 0;
        }
    }
    QuickEngine.RenderOperation = RenderOperation;
    class Renderable extends QuickEngine.Component {
        setLighting(lighting) {
            this._isLighting = lighting;
        }
        isLighting() {
            return this._isLighting;
        }
        setCastShadow(castShadow) {
            this._castShadow = castShadow;
        }
        isCastShadow() {
            return this._castShadow;
        }
        preRender( /*SceneManager * sm, RenderSystem * rsys*/) {
        }
        postRender( /*SceneManager * sm, RenderSystem * rsys*/) {
        }
    }
    QuickEngine.Renderable = Renderable;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../render_system/Renderable.ts" />
var QuickEngine;
///<reference path="../render_system/Renderable.ts" />
(function (QuickEngine) {
    class DebugRender extends QuickEngine.Renderable {
        constructor() {
            super();
            this._renderOp = new QuickEngine.RenderOperation();
        }
        setMaterial(material) {
            if (this._material == material) {
                return;
            }
            this._material = material;
        }
        getMaterial() {
            return this._material;
        }
        getRenderOperation() {
            return this._renderOp;
        }
        getWorldTransforms() {
            return this.transform.localToWorldMatrix;
        }
    }
    DebugRender.__ClassName__ = "QuickEngine.DebugRender";
    DebugRender.__ClassID__ = 0;
    QuickEngine.DebugRender = DebugRender;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../render_system/Renderable.ts" />
var QuickEngine;
///<reference path="../render_system/Renderable.ts" />
(function (QuickEngine) {
    class MeshRender extends QuickEngine.Renderable {
        constructor() {
            super();
            this._materials = [];
            this._renderOp = new QuickEngine.RenderOperation();
        }
        setMaterial(material) {
            if (!this._currentMaterial) {
                this._currentMaterial = material;
            }
            this._materials.push(material);
        }
        removeMaterial(material) {
            let index = this._materials.indexOf(material);
            if (index > 0) {
                this._materials.splice(index, 1);
            }
        }
        removeMaterialByIndex(index) {
            this._materials.splice(index, 1);
        }
        getMaterial() {
            return this._currentMaterial;
        }
        getRenderOperation() {
            if (!this.mesh)
                return null;
            let renderOp = this._renderOp;
            let subMeshes = this.mesh.subMeshes;
            for (let i = 0, len = subMeshes.length; i < len; i++) {
                let subMesh = subMeshes[i];
                subMesh.getRenderOpreation(renderOp);
            }
            return renderOp;
        }
        getWorldTransforms() {
            return this.transform.localToWorldMatrix;
        }
    }
    MeshRender.__ClassName__ = "QuickEngine.MeshRender";
    MeshRender.__ClassID__ = 0;
    QuickEngine.MeshRender = MeshRender;
})(QuickEngine || (QuickEngine = {}));
///<reference path="MeshRender.ts" />
var QuickEngine;
///<reference path="MeshRender.ts" />
(function (QuickEngine) {
    class SkinedMeshRender extends QuickEngine.Renderable {
        constructor() {
            super();
            this._materials = [];
            this._renderOp = new QuickEngine.RenderOperation();
        }
        //public void BakeMesh(Mesh mesh);
        GetBlendShapeWeight(index) {
            return 0;
        }
        SetBlendShapeWeight(index, value) {
        }
        setMaterial(material) {
            if (!this._currentMaterial) {
                this._currentMaterial = material;
            }
            this._materials.push(material);
        }
        removeMaterial(material) {
            let index = this._materials.indexOf(material);
            if (index > 0) {
                this._materials.splice(index, 1);
            }
        }
        removeMaterialByIndex(index) {
            this._materials.splice(index, 1);
        }
        getMaterial() {
            return this._currentMaterial;
        }
        getRenderOperation() {
            if (!this.mesh)
                return null;
            let renderOp = this._renderOp;
            let subMeshes = this.mesh.subMeshes;
            for (let i = 0, len = subMeshes.length; i < len; i++) {
                let subMesh = subMeshes[i];
                subMesh.getRenderOpreation(renderOp);
            }
            return renderOp;
        }
        getWorldTransforms() {
            return this.transform.localToWorldMatrix;
        }
    }
    SkinedMeshRender.__ClassName__ = "QuickEngine.SkinedMeshRender";
    SkinedMeshRender.__ClassID__ = 0;
    QuickEngine.SkinedMeshRender = SkinedMeshRender;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class SpriteRender extends QuickEngine.Renderable {
        constructor() {
            super();
            let material = QuickEngine.SpriteMaterial.getDefaultSpriteMaterial();
            this._material = material;
            let renderOp = new QuickEngine.RenderOperation();
            renderOp.primCount = 6;
            renderOp.renderOpType = 3 /* TRIANGLE_LIST */;
            let posBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, 2 /* DYNAMIC */);
            posBuf.type = QuickEngine.gl.FLOAT;
            posBuf.semantic = 1 /* POSITION */;
            posBuf.vertexCount = 12;
            posBuf.writeData((new Float32Array([
                0.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 1.0, 0.0,
                0.0, 1.0, 0.0
            ]).buffer));
            let colBuf = QuickEngine.WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, 2 /* DYNAMIC */);
            colBuf.type = QuickEngine.gl.UNSIGNED_BYTE;
            colBuf.semantic = 5 /* DIFFUSE */;
            colBuf.vertexCount = 16;
            colBuf.writeData((new Uint8Array([
                255, 255, 255, 255,
                255, 255, 255, 255,
                255, 255, 255, 255,
                255, 255, 255, 255
            ])).buffer);
            let texBuf = new QuickEngine.WebGLVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, 2 /* DYNAMIC */);
            texBuf.type = QuickEngine.gl.FLOAT;
            texBuf.semantic = 7 /* TEXTURE_COORDINATES */;
            texBuf.vertexCount = 8;
            texBuf.writeData((new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])).buffer);
            renderOp.vertexBuffers = [];
            renderOp.vertexBuffers[0] = posBuf;
            renderOp.vertexBuffers[1] = colBuf;
            renderOp.vertexBuffers[2] = texBuf;
            let indexBuffer = QuickEngine.WebGLBufferManager.instance.createIndexBuffer(6, 2 /* DYNAMIC */, true);
            indexBuffer.writeData([0, 2, 3, 0, 1, 2]);
            indexBuffer.bindBuffer();
            renderOp.indexBuffer = indexBuffer;
            this._renderOp = renderOp;
        }
        setMaterial(material) {
            if (this._material == material) {
                return;
            }
            this._material = material;
        }
        getMaterial() {
            return this._material;
        }
        getRenderOperation() {
            if (!this._material) {
                return null;
            }
            return this._renderOp;
        }
        getWorldTransforms() {
            return this.transform.localToWorldMatrix;
        }
    }
    SpriteRender.__ClassName__ = "QuickEngine.SpriteRender";
    SpriteRender.__ClassID__ = 0;
    QuickEngine.SpriteRender = SpriteRender;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    ;
    ;
    ;
    ;
    ;
    ;
    // 渲染状态
    class RenderState {
        constructor() {
            this.cullMode = 2 /* BACK */;
            this.blendMode = 0 /* Normal */;
            this.depthCheck = 2 /* CHECK_WRITE */;
            this.colorMask = 15 /* ALL */;
        }
    }
    QuickEngine.RenderState = RenderState;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    let GL;
    (function (GL) {
        const _matrixStack = [];
        let _renderOperationType = 1 /* LINE_LIST */;
        const _arrayBuffer = new ArrayBuffer(100000);
        const _vertexBuffer = new Int32Array(_arrayBuffer);
        let VBO;
        let _init = false;
        function init() {
            VBO = QuickEngine.gl.createBuffer();
            QuickEngine.gl.bindBuffer(QuickEngine.gl.ARRAY_BUFFER, VBO);
            QuickEngine.gl.bufferData(QuickEngine.gl.ARRAY_BUFFER, _arrayBuffer, QuickEngine.gl.STATIC_DRAW);
            QuickEngine.gl.viewport(0, 0, 500, 500);
            // Vertex shader program
            const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;
            const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;
            //
            //  初始化着色器程序，让WebGL知道如何绘制我们的数据
            function initShaderProgram(gl, vsSource, fsSource) {
                const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
                const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
                // 创建着色器程序
                const shaderProgram = gl.createProgram();
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
                const shader = gl.createShader(type);
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
            const shaderProgram = initShaderProgram(QuickEngine.gl, vsSource, fsSource);
            const programInfo = {
                program: shaderProgram,
                attribLocations: {
                    vertexPosition: QuickEngine.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
                },
                uniformLocations: {
                    projectionMatrix: QuickEngine.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                    modelViewMatrix: QuickEngine.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
                },
            };
            const horizAspect = 480.0 / 640.0;
            let squareVerticesBuffer;
            function initBuffers() {
                squareVerticesBuffer = QuickEngine.gl.createBuffer();
                QuickEngine.gl.bindBuffer(QuickEngine.gl.ARRAY_BUFFER, squareVerticesBuffer);
                const vertices = [
                    1.0, 1.0, 0.0,
                    -1.0, 1.0, 0.0,
                    1.0, -1.0, 0.0,
                    -1.0, -1.0, 0.0
                ];
                QuickEngine.gl.bufferData(QuickEngine.gl.ARRAY_BUFFER, new Float32Array(vertices), QuickEngine.gl.STATIC_DRAW);
            }
            function drawScene(programInfo, buffers) {
                QuickEngine.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
                QuickEngine.gl.clearDepth(1.0); // Clear everything
                QuickEngine.gl.enable(QuickEngine.gl.DEPTH_TEST); // Enable depth testing
                QuickEngine.gl.depthFunc(QuickEngine.gl.LEQUAL); // Near things obscure far things
                // Clear the canvas before we start drawing on it.
                QuickEngine.gl.clear(QuickEngine.gl.COLOR_BUFFER_BIT | QuickEngine.gl.DEPTH_BUFFER_BIT);
                // Create a perspective matrix, a special matrix that is
                // used to simulate the distortion of perspective in a camera.
                // Our field of view is 45 degrees, with a width/height
                // ratio that matches the display size of the canvas
                // and we only want to see objects between 0.1 units
                // and 100 units away from the camera.
                const fieldOfView = 45 * Math.PI / 180; // in radians
                const aspect = QuickEngine.gl.canvas.clientWidth / QuickEngine.gl.canvas.clientHeight;
                const zNear = 0.1;
                const zFar = 100.0;
                const projectionMatrix1 = QuickEngine.Matrix4.makePerspectiveFovRH(45, aspect, zNear, zFar);
                const modelViewMatrix1 = new QuickEngine.Matrix4();
                const transMatrix = QuickEngine.Matrix4.makeTransform(new QuickEngine.Vector3(0, 0, -6), QuickEngine.Quaternion.IDENTITY, new QuickEngine.Vector3(1, 1, 1));
                modelViewMatrix1.multiply(transMatrix, modelViewMatrix1);
                const projectionMatrix = mat4.create();
                // note: glmatrix.js always has the first argument
                // as the destination to receive the result.
                mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
                // Set the drawing position to the "identity" point, which is
                // the center of the scene.
                const modelViewMatrix = mat4.create();
                // Now move the drawing position a bit to where we want to
                // start drawing the square.
                mat4.translate(modelViewMatrix, // destination matrix
                modelViewMatrix, // matrix to translate
                [-0.0, 0.0, -6.0]); // amount to translate
                {
                    const numComponents = 2; // pull out 2 values per iteration
                    const type = QuickEngine.gl.FLOAT; // the data in the buffer is 32bit floats
                    const normalize = false; // don't normalize
                    const stride = 0; // how many bytes to get from one set of values to the next
                    // 0 = use type and numComponents above
                    const offset = 0; // how many bytes inside the buffer to start from
                    QuickEngine.gl.bindBuffer(QuickEngine.gl.ARRAY_BUFFER, buffers);
                    QuickEngine.gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
                    QuickEngine.gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
                }
                // Tell WebGL to use our program when drawing
                QuickEngine.gl.useProgram(programInfo.program);
                // Set the shader uniforms
                QuickEngine.gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix1.rawData);
                QuickEngine.gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix1.rawData);
                {
                    const offset = 0;
                    const vertexCount = 4;
                    QuickEngine.gl.drawArrays(QuickEngine.gl.TRIANGLE_STRIP, offset, vertexCount);
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
            _matrixStack.push(new QuickEngine.Matrix4());
        }
        GL.pushMatrix = pushMatrix;
        function popMatrix() {
            _matrixStack.pop();
        }
        GL.popMatrix = popMatrix;
        function multMatrix(matrix) {
            const topMatrix = _matrixStack[_matrixStack.length - 1];
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
            QuickEngine.gl.useProgram(QuickEngine.Material.getDefaultCubeMaterial().shader.shaderPasses[0].getProgram().webglProgram);
            QuickEngine.gl.enableVertexAttribArray(0);
            QuickEngine.gl.bindBuffer(QuickEngine.gl.ARRAY_BUFFER, VBO);
            QuickEngine.gl.vertexAttribPointer(0, 3, QuickEngine.gl.FLOAT, false, 0, 0);
            QuickEngine.gl.drawArrays(QuickEngine.gl.TRIANGLES, 0, 3);
            QuickEngine.gl.disableVertexAttribArray(0);
            QuickEngine.gl.flush();
        }
        GL.vertex3 = vertex3;
    })(GL = QuickEngine.GL || (QuickEngine.GL = {}));
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class RenderContext {
        constructor(camera, name) {
            this._clearMode = 7 /* ALL */; // 清除缓冲类型
            this._clearColor = [255, 255, 255, 255]; // 清屏颜色
            this._name = name;
            this._camera = camera;
            this._renderPipeline = new QuickEngine.RenderPipeline();
            console.assert(!!camera);
        }
        get name() {
            return this._name;
        }
        get camera() {
            return this._camera;
        }
        set renderPipeline(renderPipeline) {
            this._renderPipeline = renderPipeline;
        }
        get renderPipeline() {
            return this._renderPipeline;
        }
        setColorClear(clearMode, clearColor, depth = 1, stencil = 0) {
            this._clearMode = clearMode;
            this._clearColor = clearColor;
            this._clearDepth = depth;
            this._clearStencil = stencil;
        }
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
        doRender() {
            // 没有摄像机就不需要渲染了
            let camera = this._camera;
            let viewport = camera.viewPort;
            if (viewport.w == 0 || viewport.h == 0) {
                return;
            }
            let renderSystem = QuickEngine.RenderSystem.instance;
            // 设置render target
            renderSystem.setRenderTarget(camera.renderTarget);
            // 清除缓冲区
            renderSystem.clear(this._clearMode, this._clearColor, this._clearDepth, this._clearStencil);
            // 设置视口
            renderSystem.setViewport(viewport);
            // 设置相机
            renderSystem.setCamera(camera);
            // 管道渲染
            if (this._renderPipeline)
                this._renderPipeline.doRender(this);
        }
        readPixels(x, y, w, h, format, type, pixels) {
            let renderSystem = QuickEngine.RenderSystem.instance;
            renderSystem.setRenderTarget(this._camera.renderTarget);
            renderSystem.readPixels(x, y, w, h, format, type, pixels);
        }
    }
    QuickEngine.RenderContext = RenderContext;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    /**
     * 队列渲染管道
     */
    class RenderPipeline {
        constructor() {
            this.renderQueue = new QuickEngine.RenderQueue();
        }
        doRender(renderContext) {
            let camera = renderContext.camera;
            let renderQueue = this.renderQueue;
            let renderSystem = QuickEngine.RenderSystem.instance;
            // 清除渲染队列
            renderQueue.clear();
            // TODO: 封装裁剪
            function doCull() {
                let outArr = [];
                function cull(transfrom, outNodeArr) {
                    outNodeArr.push(transfrom.node);
                    for (let ii = 0, len = transfrom.childCount; ii < len; ii++) {
                        cull(transfrom.getChildByIndex(ii), outNodeArr);
                    }
                }
                let children = QuickEngine.SceneManager.instance.currentScene.children;
                for (let i = 0, len = children.length; i < len; i++) {
                    cull(children[i].transform, outArr);
                }
                return outArr;
            }
            // 裁剪
            let visibleList = doCull();
            let len = visibleList.length;
            // 节点加入渲染队列
            for (let i = 0; i < len; i++) {
                let child = visibleList[i];
                if (child) {
                    child.updateRenderQueue(renderQueue);
                }
            }
            // 设置视图矩阵,投影矩阵,裁剪面
            renderSystem.setViewMatrix(camera.getViewMatrix());
            renderSystem.setProjectionMatrix(camera.getProjMatrix());
            // #1 渲染不透明物体(完成后渲染透明物体)
            // 设置shader pass
            const solidObjs = renderQueue.solidObjects;
            if (len > 0) {
                // 排序
            }
            // 设置光照
            renderSystem.setLight();
            // 渲染
            for (let i = 0, len = solidObjs.length; i < len; i++) {
                const solidObj = solidObjs[i];
                renderSystem.render(solidObj.getMaterial().shader, solidObj);
            }
            // 执行光照
            this.doLighting();
            // #2 渲染不透明物体完成后, 开始渲染透明物体)
            const alphaObjs = renderQueue.alphaObjects;
            if (len > 0) {
                // 排序
            }
            // 渲染
            for (let i = 0, len = alphaObjs.length; i < len; i++) {
                const alphaObj = alphaObjs[i];
                renderSystem.render(alphaObj.getMaterial().shader, alphaObj);
            }
        }
        // 不透明物体绘制完成后, 执行光照.每个物体可以创建一个renderbuffer,避免多次渲染,但是会增加内存.
        doLighting() {
        }
    }
    QuickEngine.RenderPipeline = RenderPipeline;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class RenderQueue {
        constructor() {
            this._solidObjects = [];
            this._alphaObjects = [];
        }
        get solidObjects() {
            return this._solidObjects;
        }
        get alphaObjects() {
            return this._alphaObjects;
        }
        addRenderable(renderable) {
            //TODO:添加不透明对象判断
            let mat = renderable.getMaterial();
            if (mat.opacity >= 1) {
                this._solidObjects.unshift(renderable);
            }
            else {
                this._alphaObjects.push(renderable);
            }
        }
        clear() {
            this._solidObjects.length = 0;
            this._alphaObjects.length = 0;
        }
    }
    QuickEngine.RenderQueue = RenderQueue;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    QuickEngine.MAX_NUM_UNIFORM = 32;
    QuickEngine.MAX_NUM_SAMPLER = 8;
    QuickEngine.MAX_NUM_VELEMENT = 16;
    QuickEngine.MAX_NUM_USER_CONST = 64;
    QuickEngine.MAX_NUM_SHADER_PASS = 8;
    QuickEngine.MAX_NUM_VERTEX_STREAM = 4;
    class RenderSystem {
        constructor(div) {
            this._worldViewTM = new QuickEngine.Matrix4(); // 世界视图矩阵
            this._viewProjTM = new QuickEngine.Matrix4(); // 视图投影矩阵
            this._worldViewProjTM = new QuickEngine.Matrix4(); // 世界视图投影矩阵
            this._currentRenderState = new QuickEngine.RenderState();
            this._renderStatedChanged = true;
            this._textureChanged = [];
            for (let i = 0; i < QuickEngine.MAX_NUM_SAMPLER; i++) {
                this._textureChanged.push(true);
            }
            this._currentTextures = [];
            this._currentTextures.length = QuickEngine.MAX_NUM_SAMPLER;
            this._shaderPassChanged = true;
            RenderSystem._sInstance = this;
            let canvas = document.createElement('canvas');
            canvas.width = 1280;
            canvas.height = 720;
            canvas.style.position = 'absolute';
            QuickEngine.gl = canvas.getContext('experimental-webgl', {
                alpha: false
            });
            if (!QuickEngine.gl) {
                return;
            }
            this._canvas = canvas;
            div.appendChild(canvas);
        }
        static get instance() {
            return RenderSystem._sInstance;
        }
        _clearState() {
        }
        onInit() {
        }
        onShutdown() {
        }
        beginScene() {
        }
        endScene() {
        }
        clear(mask, color, depth, stencil) {
            if (mask == 0 /* None */) {
                return;
            }
            let glMask = 0;
            if (mask & 1 /* COLOR_BUFFER_BIT */) {
                glMask |= QuickEngine.gl.COLOR_BUFFER_BIT;
            }
            if (mask & 2 /* DEPTH_BUFFER_BIT */) {
                glMask |= QuickEngine.gl.DEPTH_BUFFER_BIT;
            }
            if (mask & 4 /* STENCIL_BUFFER_BIT */) {
                glMask |= QuickEngine.gl.STENCIL_BUFFER_BIT;
            }
            QuickEngine.gl.clear(glMask);
            QuickEngine.gl.clearColor(color[0], color[1], color[2], color[3]);
            QuickEngine.gl.clearDepth(depth);
            QuickEngine.gl.clearStencil(stencil);
            QuickEngine.GL_CHECK_ERROR();
        }
        setViewport(viewPort) {
            this._viewport = viewPort;
            let rtWidth = QuickEngine.Screen.screenWidth;
            let rtHeight = QuickEngine.Screen.screenHeight;
            let currentRenderTarget = this._currentRenderTarget;
            if (currentRenderTarget) {
                rtWidth = currentRenderTarget.width;
                rtHeight = currentRenderTarget.height;
            }
            // 是否替换为限制vp在窗口大小内
            console.assert(viewPort.x >= 0 && viewPort.x + viewPort.w * rtWidth <= rtWidth &&
                viewPort.y >= 0 && viewPort.y + viewPort.h * rtHeight <= rtHeight);
            // 窗口坐标系原点为左下角
            let x = viewPort.x;
            let y = rtHeight - (viewPort.y + viewPort.h);
            let w = viewPort.w * rtWidth;
            let h = viewPort.h * rtHeight;
            QuickEngine.gl.viewport(x, y, w, h);
            QuickEngine.GL_CHECK_ERROR();
        }
        setRenderTarget(renderTarget) {
            this._currentRenderTarget = renderTarget;
            QuickEngine.gl.bindFramebuffer(QuickEngine.gl.FRAMEBUFFER, renderTarget);
        }
        _setTexture(unit, enable, tex) {
            // 纹理未加载完成时,使用默认纹理
            if (!tex.getWebGLTexture()) {
                tex = QuickEngine.ResourceManager.instance.get(QuickEngine.ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME);
            }
            if (!tex.getWebGLTexture()) {
                return;
            }
            QuickEngine.gl.activeTexture(QuickEngine.gl.TEXTURE0 + unit);
            if (enable) {
                QuickEngine.gl.bindTexture(QuickEngine.gl.TEXTURE_2D, tex.getWebGLTexture());
            }
            else {
                QuickEngine.gl.bindTexture(QuickEngine.gl.TEXTURE_2D, null);
            }
            QuickEngine.GL_CHECK_ERROR();
        }
        _bindRenderState() {
            if (!this._renderStatedChanged) {
                return;
            }
            let currentRenderState = this._currentRenderState;
            let cullMode = currentRenderState.cullMode;
            switch (cullMode) {
                case 1 /* FRONT */:
                    {
                        QuickEngine.gl.enable(QuickEngine.gl.FRONT_FACE);
                        QuickEngine.gl.cullFace(QuickEngine.gl.FRONT);
                    }
                    break;
                case 2 /* BACK */:
                    {
                        QuickEngine.gl.enable(QuickEngine.gl.CULL_FACE);
                        QuickEngine.gl.cullFace(QuickEngine.gl.BACK);
                    }
                    break;
                case 0 /* NONE */:
                default:
                    {
                        QuickEngine.gl.disable(QuickEngine.gl.CULL_FACE);
                    }
                    break;
            }
            let depthTest = currentRenderState.depthCheck;
            switch (depthTest) {
                case 1 /* CHECK_ONLY */:
                    {
                        QuickEngine.gl.enable(QuickEngine.gl.DEPTH_TEST);
                        QuickEngine.gl.depthMask(false);
                        QuickEngine.gl.depthFunc(QuickEngine.gl.LEQUAL);
                    }
                    break;
                case 2 /* CHECK_WRITE */:
                    {
                        QuickEngine.gl.enable(QuickEngine.gl.DEPTH_TEST);
                        QuickEngine.gl.depthMask(true);
                        QuickEngine.gl.depthFunc(QuickEngine.gl.LEQUAL);
                    }
                    break;
                case 0 /* NONE */:
                default:
                    {
                        QuickEngine.gl.disable(QuickEngine.gl.DEPTH_TEST);
                        QuickEngine.gl.depthMask(false);
                    }
                    break;
            }
            let blendMode = currentRenderState.blendMode;
            switch (blendMode) {
                case 1 /* OPACITY */:
                case 2 /* ALPHA_TEST */:
                    {
                        QuickEngine.gl.disable(QuickEngine.gl.BLEND);
                    }
                    break;
                case 3 /* ALPHA_BLEND */:
                    {
                        QuickEngine.gl.enable(QuickEngine.gl.BLEND);
                        QuickEngine.gl.blendFunc(QuickEngine.gl.SRC_ALPHA, QuickEngine.gl.ONE_MINUS_SRC_ALPHA);
                    }
                    break;
                case 4 /* ADD */:
                    {
                        QuickEngine.gl.enable(QuickEngine.gl.BLEND);
                        QuickEngine.gl.blendFunc(QuickEngine.gl.ONE, QuickEngine.gl.ONE);
                    }
                    break;
                case 5 /* MUL */:
                    {
                        QuickEngine.gl.enable(QuickEngine.gl.BLEND);
                        QuickEngine.gl.blendFunc(QuickEngine.gl.ZERO, QuickEngine.gl.SRC_COLOR);
                    }
                    break;
            }
            let colorMask = currentRenderState.colorMask;
            QuickEngine.gl.colorMask(!!(colorMask & 1 /* RED */), !!(colorMask & 2 /* GREEN */), !!(colorMask & 4 /* BLUE */), !!(colorMask & 8 /* ALPHA */));
            QuickEngine.GL_CHECK_ERROR();
            this._renderStatedChanged = false;
        }
        bindGpuProgram(gpuProgram) {
            QuickEngine.gl.useProgram(gpuProgram.webglProgram);
        }
        _bindVertexElement(vertexBuffer, shaderPass) {
            QuickEngine.gl.bindBuffer(QuickEngine.gl.ARRAY_BUFFER, vertexBuffer.getGLBuffer());
            QuickEngine.gl.enableVertexAttribArray(vertexBuffer.semantic);
        }
        renderOperation(renderOp) {
            console.assert(!!this._currentShaderPass && !!renderOp.vertexBuffers);
            // begin render
            this.begin();
            this._bindRenderState();
            let currentShaderPass = this._currentShaderPass;
            if (this._shaderPassChanged) {
                this.bindGpuProgram(currentShaderPass.getProgram());
                this._shaderPassChanged = false;
            }
            currentShaderPass.uploadUniforms();
            currentShaderPass.uploadSamplers();
            let primType;
            switch (renderOp.renderOpType) {
                case 0 /* POINT_LIST */:
                    primType = QuickEngine.gl.POINTS;
                    break;
                case 1 /* LINE_LIST */:
                    primType = QuickEngine.gl.LINES;
                    break;
                case 2 /* LINE_STRIP */:
                    primType = QuickEngine.gl.LINE_STRIP;
                    break;
                case 3 /* TRIANGLE_LIST */:
                    primType = QuickEngine.gl.TRIANGLES;
                    break;
                case 4 /* TRIANGLE_STRIP */:
                    primType = QuickEngine.gl.TRIANGLE_STRIP;
                    break;
                case 5 /* TRIANGLE_FAN */:
                    primType = QuickEngine.gl.TRIANGLE_FAN;
                    break;
                default:
                    primType = QuickEngine.gl.TRIANGLES;
                    break;
            }
            let renderAttribsBound = [];
            // 绑定顶点属性
            let vbBuffers = renderOp.vertexBuffers;
            for (let i = 0, len = vbBuffers.length; i < len; i++) {
                let vb = vbBuffers[i];
                let location = currentShaderPass.getAttribute(vb.semantic);
                if (location === undefined) {
                    continue;
                }
                QuickEngine.gl.bindBuffer(QuickEngine.gl.ARRAY_BUFFER, vb.getGLBuffer());
                QuickEngine.gl.bufferData(QuickEngine.gl.ARRAY_BUFFER, vb._data, QuickEngine.WebGLBufferManager.getGLUsage(vb._usage));
                QuickEngine.GL_CHECK_ERROR();
                QuickEngine.gl.enableVertexAttribArray(location);
                QuickEngine.gl.vertexAttribPointer(location, vb._size, vb.type, vb._normalized, 0, 0);
                QuickEngine.GL_CHECK_ERROR();
                renderAttribsBound.push(location);
            }
            let indexBuffer = renderOp.indexBuffer;
            if (indexBuffer) {
                QuickEngine.gl.bindBuffer(QuickEngine.gl.ELEMENT_ARRAY_BUFFER, indexBuffer.getGLIndexBuffer());
                QuickEngine.GL_CHECK_ERROR();
                QuickEngine.gl.drawElements(primType, indexBuffer.count, QuickEngine.gl.UNSIGNED_SHORT, 0);
            }
            else {
                QuickEngine.gl.drawArrays(QuickEngine.gl.TRIANGLE_STRIP, 0, vbBuffers[0].vertexCount);
            }
            QuickEngine.GL_CHECK_ERROR();
            // end render
            // 清除属性绑定
            let len = renderAttribsBound.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    QuickEngine.gl.disableVertexAttribArray(renderAttribsBound[i]);
                }
            }
            this.end();
        }
        static getGLDrawCount(type, primCount) {
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
        }
        onResize(w, h) {
            let thisCanvas = this._canvas;
            thisCanvas.width = w;
            thisCanvas.height = h;
        }
        setWorldMatrix(worldMatrix) {
            this._worldMatrix = worldMatrix;
            this._isTransformDirty = true;
        }
        getWorldMatrix() {
            return this._worldMatrix;
        }
        setViewMatrix(viewMatrix) {
            this._viewMatrix = viewMatrix;
            this._isTransformDirty = true;
        }
        getViewMatrix() {
            return this._viewMatrix;
        }
        setProjectionMatrix(projectionMatrix) {
            this._projectionMatrix = projectionMatrix;
            this._isTransformDirty = true;
        }
        getProjectionMatrix() {
            return this._projectionMatrix;
        }
        getWorldViewMatrix() {
            return this._worldViewTM;
        }
        getViewProjMatrix() {
            return this._viewProjTM;
        }
        getWorldViewProjMatrix() {
            return this._worldViewProjTM;
        }
        setCamera(camera) {
        }
        setMaterial(material) {
        }
        setLight() {
        }
        setFog(fogColor, fogNear, fogFar) {
        }
        setClipPlane(near, far) {
        }
        _setTextureUnitSettings(unit, tex) {
            this._setTexture(unit, true, tex);
        }
        setShaderPass(pass) {
            if (this._currentShaderPass != pass) {
                this._currentShaderPass = pass;
                this._shaderPassChanged = true;
            }
        }
        setRenderState(cullMode, blendMode, depthCheck, colorMask) {
            this._currentRenderState.cullMode = cullMode;
            this._currentRenderState.blendMode = blendMode;
            this._currentRenderState.depthCheck = depthCheck;
            this._currentRenderState.colorMask = colorMask;
        }
        getCurrentTextures() {
            return this._currentTextures;
        }
        begin() {
            if (this._isTransformDirty) {
                this._worldViewTM.identity();
                this._viewProjTM.identity();
                this._worldViewProjTM.identity();
                this._viewMatrix.multiply(this._worldMatrix, this._worldViewTM);
                this._projectionMatrix.multiply(this._viewMatrix, this._viewProjTM);
                this._projectionMatrix.multiply(this._worldViewTM, this._worldViewProjTM);
                this._isTransformDirty = false;
            }
        }
        end() {
        }
        render(shader, renderable) {
            if (!shader) {
                return;
            }
            // 准备渲染事件
            let material = renderable.getMaterial();
            let renderOp = renderable.getRenderOperation();
            this.setMaterial(material);
            let worldMatrix = renderable.getWorldTransforms();
            let tempWM = new QuickEngine.Matrix4();
            tempWM.copyFrom(worldMatrix);
            this.setWorldMatrix(tempWM);
            // ShaderPass
            let passes = shader.shaderPasses;
            for (let i = 0, len = passes.length; i < len; ++i) {
                let pass = passes[i];
                let renderState = pass.getRenderState();
                // 设置当前shader pass
                this.setShaderPass(pass);
                // 设置渲染状态
                this.setRenderState(renderState.cullMode, renderState.blendMode, renderState.depthCheck, renderState.colorMask);
                // 设置纹理
                let samplers = pass.getSamplers();
                for (let ii = 0, len2 = samplers; ii < samplers.length; ii++) {
                    let sampler = samplers[ii];
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
        }
        readPixels(x, y, width, height, format, type, pixels) {
        }
    }
    QuickEngine.RenderSystem = RenderSystem;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class RenderTarget extends QuickEngine.HashObject {
        constructor() {
            super();
            this._rid = -1;
            this._rid = RenderTarget.RdtId++;
        }
        get format() {
            return this._format;
        }
        set format(v) {
            this._format = v;
        }
        get id() {
            return this._rid;
        }
        getTexture() {
            return this._texture;
        }
        init() {
            let w = this.width, h = this.height;
            console.assert(w > 0 && h > 0);
            let texture = new QuickEngine.Texture('RenderTarget' + this._rid);
            texture.width = w;
            texture.height = h;
            texture.mipmaps = 0;
            texture.format = this.format;
            texture.usage = 1 /* STATIC */;
            this._texture = texture;
            let webglTex = texture.getWebGLTexture();
            // 创建帧缓冲
            let frameBuffer = QuickEngine.gl.createFramebuffer();
            // 绑定帧缓冲
            QuickEngine.gl.bindFramebuffer(QuickEngine.gl.FRAMEBUFFER, frameBuffer);
            // 连接创建的2d纹理作为帧缓冲区附着
            QuickEngine.gl.framebufferTexture2D(QuickEngine.gl.FRAMEBUFFER, QuickEngine.gl.COLOR_ATTACHMENT0, QuickEngine.gl.TEXTURE_2D, webglTex, 0);
            // 用完临时解除绑定
            QuickEngine.gl.bindTexture(QuickEngine.gl.TEXTURE_2D, undefined);
            this._frameBuffer = frameBuffer;
            if (this._hasDepthBuffer) {
                // 创建深度渲染缓冲对象
                let renderBuffer = QuickEngine.gl.createRenderbuffer();
                // 绑定深度渲染缓冲对象
                QuickEngine.gl.bindRenderbuffer(QuickEngine.gl.RENDERBUFFER, renderBuffer);
                // 指定保存在渲染缓冲区的图像大小和格式, 格式参数参考OPengl3.0 第12章 12.4.2渲染缓冲区格式
                QuickEngine.gl.renderbufferStorage(QuickEngine.gl.RENDERBUFFER, QuickEngine.gl.DEPTH_COMPONENT16, w, h);
                // 连接渲染缓冲区作为帧缓冲区附着
                QuickEngine.gl.framebufferRenderbuffer(QuickEngine.gl.FRAMEBUFFER, QuickEngine.gl.DEPTH_ATTACHMENT, QuickEngine.gl.RENDERBUFFER, renderBuffer);
                // 用完临时解除绑定
                QuickEngine.gl.bindRenderbuffer(QuickEngine.gl.RENDERBUFFER, undefined);
                this._depthBuffer = renderBuffer;
            }
            // 检查帧缓冲区完整性, 状态参数参考12.5.4
            let status = QuickEngine.gl.checkFramebufferStatus(QuickEngine.gl.FRAMEBUFFER);
            if (status != QuickEngine.gl.FRAMEBUFFER_COMPLETE) {
                if (QuickEngine.__DEBUG__) {
                    // TODO: 打印状态描述
                    switch (status) {
                        case QuickEngine.gl.FRAMEBUFFER_UNSUPPORTED:
                            break;
                        case QuickEngine.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                            break;
                        case QuickEngine.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                            break;
                        case QuickEngine.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                            break;
                        default:
                            break;
                    }
                }
                console.log('Error: Create RenderTarget Failed, format: ' + this.format + '.');
                this.destroy();
            }
            // 用完临时解除绑定
            QuickEngine.gl.bindFramebuffer(QuickEngine.gl.FRAMEBUFFER, undefined);
            QuickEngine.GL_CHECK_ERROR();
        }
        destroy() {
            super.destroy();
            if (this._depthBuffer) {
                QuickEngine.gl.deleteRenderbuffer(this._depthBuffer);
                this._depthBuffer = undefined;
            }
            if (this._frameBuffer) {
                QuickEngine.gl.deleteFramebuffer(this._frameBuffer);
                this._frameBuffer = undefined;
            }
            if (this._texture) {
                this._texture.destroy();
                this._texture = undefined;
            }
        }
    }
    RenderTarget.RdtId = 0;
    QuickEngine.RenderTarget = RenderTarget;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    ;
    // 每个顶点都有一个纹理坐标.2D纹理坐标用2d坐标(s, t)表示,也称作(u, v)
    // 纹理图像的左下角由st坐标(0.0, 0.0)指定, 右上角st坐标(1.0, 1.0)指定. 坐标区间为[0.0, 1.0], 区间外坐标也是允许的.
    // 纹理绑定步骤:
    /*
    *  let webglTex = gl.createTexture();           // 生成gl纹理对象
    *  gl.bindTexture(gl.TEXTURE_2D, webglTex);     // 绑定纹理对象, 绑定时, 会将之前绑定的纹理对象解除绑定
    *  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.imageData);//纹理真正第加载图像
    **/
    class Texture extends QuickEngine.Resource {
        constructor(name) {
            super(name);
            this._tid = undefined;
            this._tid = ++Texture.Tid;
        }
        get id() {
            return this._tid;
        }
        get width() {
            return this._width;
        }
        set width(width) {
            this._width = width;
        }
        get height() {
            return this._height;
        }
        set height(height) {
            this._height = height;
        }
        get resolution() {
            return this._resolution;
        }
        set resolution(resolution) {
            this._resolution = resolution;
        }
        get webglTex() {
            return this._webglTex;
        }
        getWebGLTexture() {
            return this.webglTex;
        }
        get usage() {
            return this._usage;
        }
        set usage(usage) {
            this._usage = usage;
        }
        get image() {
            return this._image;
        }
        get imageData() {
            return this._imageData;
        }
        copy(object) {
            super.copy(object);
        }
        clone() {
            let m = new Texture();
            m.copy(this);
            return m;
        }
        loadImage(image) {
            this._image = image;
            this._width = image.width;
            this._height = image.height;
            this.createWebGLTexture();
        }
        loadRawData(data, width, height) {
            if (data == undefined) {
                this.createWebGLTexture();
                return;
            }
            this._width = width;
            this._height = height;
            this._imageData = new ImageData(new Uint8ClampedArray(data), width, height);
            this.createWebGLTexture();
        }
        destroy() {
            if (this._webglTex) {
                QuickEngine.gl.deleteTexture(this._webglTex);
                this._webglTex = undefined;
            }
            this._image = undefined;
        }
        createWebGLTexture() {
            let webglTex = QuickEngine.gl.createTexture();
            QuickEngine.gl.bindTexture(QuickEngine.gl.TEXTURE_2D, webglTex);
            // 参数介绍,OpenGLES3.0编程指南,第九章纹理
            // opengl纹理左下角为起点, 纹理坐标是右上角为起点
            QuickEngine.gl.pixelStorei(QuickEngine.gl.UNPACK_FLIP_Y_WEBGL, 1);
            QuickEngine.gl.pixelStorei(QuickEngine.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
            QuickEngine.GL_CHECK_ERROR();
            if (this._image) {
                QuickEngine.gl.texImage2D(QuickEngine.gl.TEXTURE_2D, 0, QuickEngine.gl.RGBA, QuickEngine.gl.RGBA, QuickEngine.gl.UNSIGNED_BYTE, this._image);
            }
            else if (this._imageData) {
                QuickEngine.gl.texImage2D(QuickEngine.gl.TEXTURE_2D, 0, QuickEngine.gl.RGBA, QuickEngine.gl.RGBA, QuickEngine.gl.UNSIGNED_BYTE, this._imageData);
            }
            //texImage2D(target: number, level: number, internalformat: number, format: number, type: number, pixels: ImageData): void;
            //texImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: ArrayBufferView): void;
            QuickEngine.gl.texParameteri(QuickEngine.gl.TEXTURE_2D, QuickEngine.gl.TEXTURE_MIN_FILTER, QuickEngine.gl.LINEAR);
            QuickEngine.gl.texParameteri(QuickEngine.gl.TEXTURE_2D, QuickEngine.gl.TEXTURE_MAG_FILTER, QuickEngine.gl.LINEAR);
            QuickEngine.gl.texParameteri(QuickEngine.gl.TEXTURE_2D, QuickEngine.gl.TEXTURE_WRAP_S, QuickEngine.gl.CLAMP_TO_EDGE);
            QuickEngine.gl.texParameteri(QuickEngine.gl.TEXTURE_2D, QuickEngine.gl.TEXTURE_WRAP_T, QuickEngine.gl.CLAMP_TO_EDGE);
            this._webglTex = webglTex;
        }
        loadImpl() {
            let self = this;
            QuickEngine.ImageLoader.instance.loadAsync(this.name).then(function (data) {
                self._image = data;
                self._width = data.width;
                self._height = data.height;
                self._state = 2 /* Loaded */;
                self._onLoad();
            }).catch(function (err) {
                console.error('load text failed: ' + this.name + ' error: ' + err);
                self._state = 2 /* Loaded */;
                self._onLoad();
            });
        }
        unloadImpl() {
        }
    }
    Texture.Tid = 0;
    QuickEngine.Texture = Texture;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
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
    class Material extends QuickEngine.Resource {
        constructor(name) {
            super(name);
        }
        copy(object) {
            super.copy(object);
        }
        clone() {
            let m = new Material(name);
            m.copy(this);
            return m;
        }
        loadImpl() {
        }
        unloadImpl() {
        }
        static getDefaultCubeMaterial() {
            if (!Material._defMatGLTex) {
                Material._defMatGLTex = QuickEngine.ResourceManager.instance.get(QuickEngine.ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME);
            }
            let m = Material._defaultCubeMaterial;
            if (!m) {
                m = new Material();
                Material._defaultCubeMaterial = m;
                let defShader = new QuickEngine.Shader("defaultCubeShader");
                // one pass
                let pass = new QuickEngine.WebGLShaderPass();
                let program = new QuickEngine.GLShaderProgram(QuickEngine.ShaderChunks.BaseMeshShadervs, QuickEngine.ShaderChunks.BaseMeshShaderfs);
                pass.setProgram(program);
                let uniforms = ["mvpMatrix", "u_lightDirection", "u_lightColor"];
                for (let i = 0, len = uniforms.length; i < len; i++) {
                    let uname = uniforms[i];
                    let u;
                    if (uname == "mvpMatrix") {
                        u = {
                            name: uname,
                            type: 2 /* WORLD_MATRIX */,
                            location: QuickEngine.gl.getUniformLocation(program.webglProgram, uname)
                        };
                    }
                    else if (uname == "u_lightDirection") {
                        u = {
                            name: uname,
                            type: 13 /* LIGHT_DIRECTION */,
                            location: QuickEngine.gl.getUniformLocation(program.webglProgram, uname)
                        };
                    }
                    else {
                        u = {
                            name: uname,
                            type: 18 /* DIFFUSE */,
                            location: QuickEngine.gl.getUniformLocation(program.webglProgram, uname)
                        };
                    }
                    pass.addUniform(u);
                }
                pass.setAttribute(1 /* POSITION */, QuickEngine.gl.getAttribLocation(program.webglProgram, "a_position"));
                pass.setAttribute(5 /* DIFFUSE */, QuickEngine.gl.getAttribLocation(program.webglProgram, "a_color"));
                pass.setAttribute(4 /* NORMAL */, QuickEngine.gl.getAttribLocation(program.webglProgram, "a_normal"));
                pass.setAttribute(7 /* TEXTURE_COORDINATES */, QuickEngine.gl.getAttribLocation(program.webglProgram, "a_texCoord0"));
                let samplers = ["texture0"];
                for (let i = 0, len = samplers.length; i < len; i++) {
                    let sampler = samplers[i];
                    let s = {
                        index: 0,
                        name: sampler,
                        samplerTex: Material._defMatGLTex,
                        location: QuickEngine.gl.getUniformLocation(program.webglProgram, sampler),
                        bindType: 10 /* SAMPLER */
                    };
                    pass.addSampler(s);
                }
                let renderState = new QuickEngine.RenderState();
                pass.setRenderState(renderState);
                defShader.addPass(pass);
                m.shader = defShader;
            }
            return m;
        }
    }
    Material.ClassName = 'Material';
    QuickEngine.Material = Material;
})(QuickEngine || (QuickEngine = {}));
///<reference path="Material.ts" />
var QuickEngine;
///<reference path="Material.ts" />
(function (QuickEngine) {
    class SpriteMaterial extends QuickEngine.Material {
        constructor() {
            super(...arguments);
            this.type = "SpriteMaterial";
            this.fog = true;
            this.lights = true;
            this.opacity = 1;
            this.transparent = false;
            this.blendSrc = QuickEngine.gl.ONE;
            this.blendDst = QuickEngine.gl.ONE_MINUS_SRC_ALPHA;
            this.blendEquation = QuickEngine.gl.FUNC_ADD;
            this.blendSrcAlpha = null;
            this.blendDstAlpha = null;
            this.blendEquationAlpha = null;
            this.premultipliedAlpha = true;
            this._needsUpdate = true;
        }
        static getDefaultSpriteMaterial() {
            if (!SpriteMaterial._defGLTex) {
                SpriteMaterial._defGLTex = QuickEngine.ResourceManager.instance.get(QuickEngine.ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME);
            }
            let m = SpriteMaterial._shared;
            if (!m) {
                m = new SpriteMaterial();
                SpriteMaterial._shared = m;
                let defShader = new QuickEngine.Shader("default");
                // one pass
                let pass = new QuickEngine.WebGLShaderPass();
                let program = new QuickEngine.GLShaderProgram(QuickEngine.ShaderChunks.defaultSpriteShadervs, QuickEngine.ShaderChunks.defaultSpriteShaderfs);
                pass.setProgram(program);
                let uniforms = ["mvpMatrix"];
                for (let i = 0, len = uniforms.length; i < len; i++) {
                    let uname = uniforms[i];
                    let u = {
                        name: uname,
                        data: new QuickEngine.Matrix4(),
                        type: 2 /* WORLD_MATRIX */,
                        location: QuickEngine.gl.getUniformLocation(program.webglProgram, uname)
                    };
                    pass.addUniform(u);
                }
                pass.setAttribute(1 /* POSITION */, QuickEngine.gl.getAttribLocation(program.webglProgram, "a_position"));
                pass.setAttribute(5 /* DIFFUSE */, QuickEngine.gl.getAttribLocation(program.webglProgram, "a_color"));
                pass.setAttribute(7 /* TEXTURE_COORDINATES */, QuickEngine.gl.getAttribLocation(program.webglProgram, "a_texCoord0"));
                let samplers = ["texture0"];
                for (let i = 0, len = samplers.length; i < len; i++) {
                    let samplerName = samplers[i];
                    let s = {
                        index: 0,
                        name: samplerName,
                        samplerTex: SpriteMaterial._defGLTex,
                        location: QuickEngine.gl.getUniformLocation(program.webglProgram, samplerName),
                        bindType: 10 /* SAMPLER */
                    };
                    pass.addSampler(s);
                }
                let renderState = new QuickEngine.RenderState();
                renderState.cullMode = 0 /* NONE */;
                pass.setRenderState(renderState);
                defShader.addPass(pass);
                m.shader = defShader;
            }
            return m;
        }
    }
    QuickEngine.SpriteMaterial = SpriteMaterial;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../../core/IDisposable.ts" />
var QuickEngine;
///<reference path="../../core/IDisposable.ts" />
(function (QuickEngine) {
    function loadPass() {
    }
    function compileShader(type, code) {
        let shader = QuickEngine.gl.createShader(type);
        QuickEngine.gl.shaderSource(shader, code);
        QuickEngine.gl.compileShader(shader);
        if (QuickEngine.gl.getShaderParameter(shader, QuickEngine.gl.COMPILE_STATUS) === false) {
            console.error('QuickEngine.GLShader: compile shader failed: ' + QuickEngine.gl.getShaderInfoLog(shader));
        }
        return shader;
    }
    class GLShaderManager {
        constructor() {
            this._shaders = [];
        }
        static compileShader(type, code) {
            let shader = QuickEngine.gl.createShader(type);
            QuickEngine.gl.shaderSource(shader, code);
            QuickEngine.gl.compileShader(shader);
            if (QuickEngine.gl.getShaderParameter(shader, QuickEngine.gl.COMPILE_STATUS) === false) {
                console.error('QuickEngine.GLShader: compile shader failed: ' + QuickEngine.gl.getShaderInfoLog(shader));
            }
            return shader;
        }
        isDestroyed() {
            return false;
        }
        destroy() {
            for (let i = 0, len = this._shaders.length; i < len; i++) {
                //this._shaders[i]
            }
            this._shaders = undefined;
        }
        find(name) {
            let shaders = this._shaders;
            for (let i = 0, len = shaders.length; i < len; i++) {
                let shader = shaders[i];
                if (name == shader.getName()) {
                    return shader;
                }
            }
            return null;
        }
        load(name) {
            let shader = this.find(name);
            if (shader) {
                return shader;
            }
        }
        remove(name) {
            let shaders = this._shaders;
            for (let i = 0, len = shaders.length; i < len; i++) {
                let shader = shaders[i];
                if (name == shader.getName()) {
                    shaders.splice(i, 1);
                    return;
                }
            }
        }
    }
    QuickEngine.GLShaderManager = GLShaderManager;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../../core/IDisposable.ts" />
var QuickEngine;
///<reference path="../../core/IDisposable.ts" />
(function (QuickEngine) {
    ;
    ;
    ;
    ;
    ;
    class WebGLShaderPass {
        constructor() {
            this._renderState = new QuickEngine.RenderState();
            this._attributes = {};
            this._uniforms = [];
            this._samplers = [];
        }
        isDestroyed() {
            return false;
        }
        destroy() {
            this._renderState = undefined;
            this._uniforms = undefined;
            this._samplers = undefined;
        }
        /**
         * 设置shader程序
         * @param program
         */
        setProgram(program) {
            this._program = program;
        }
        getProgram() {
            return this._program;
        }
        setUniform(index, data) {
            this._uniforms[index].data = data;
        }
        addUniform(uniform) {
            this._uniforms.push(uniform);
        }
        addSampler(sampler) {
            this._samplers.push(sampler);
        }
        setAttribute(attrName, attrLoc) {
            this._attributes[attrName] = attrLoc;
        }
        getAttribute(attrName) {
            return this._attributes[attrName];
        }
        setRenderState(renderState) {
            this._renderState = renderState;
        }
        getRenderState() {
            return this._renderState;
        }
        getSamplers() {
            return this._samplers;
        }
        clone() {
            return new WebGLShaderPass();
        }
        uploadUniforms() {
            let worldMat = QuickEngine.RenderSystem.instance.getWorldMatrix();
            let viewMat = QuickEngine.RenderSystem.instance.getViewMatrix();
            let projMat = QuickEngine.RenderSystem.instance.getProjectionMatrix();
            let mvpMat = QuickEngine.RenderSystem.instance.getWorldViewProjMatrix();
            // this._viewMatrix.multiply(this._worldMatrix, this._worldViewTM);
            // this._projectionMatrix.multiply(this._viewMatrix, this._viewProjTM);
            // this._projectionMatrix.multiply(this._worldViewTM, this._worldViewProjTM);
            //
            // const projectionMatrix1 = Matrix4.makePerspectiveFovRH(45, aspect, zNear, zFar);
            const modelViewMatrix1 = new QuickEngine.Matrix4();
            const transMatrix = QuickEngine.Matrix4.makeTransform(new QuickEngine.Vector3(0, 0, -6), QuickEngine.Quaternion.IDENTITY, new QuickEngine.Vector3(1, 1, 1));
            modelViewMatrix1.multiply(transMatrix, modelViewMatrix1);
            mvpMat = projMat.multiply(modelViewMatrix1);
            let uniforms = this._uniforms;
            for (let i = 0, len = uniforms.length; i < len; i++) {
                let uniform = uniforms[i];
                switch (uniform.type) {
                    case 2 /* WORLD_MATRIX */:
                        QuickEngine.gl.uniformMatrix4fv(uniform.location, false, mvpMat.rawData);
                        break;
                    case 13 /* LIGHT_DIRECTION */:
                        QuickEngine.gl.uniform3f(uniform.location, 0.5, 3.0, 4.0);
                        break;
                    case 18 /* DIFFUSE */:
                        QuickEngine.gl.uniform3f(uniform.location, 1, 1, 1);
                        break;
                    default:
                        console.error(`unknow type: ${uniform.type}`);
                        //gl.uniform1f(uniform.location, 0);
                        break;
                }
                if (QuickEngine.__DEBUG__) {
                    QuickEngine.GL_CHECK_ERROR();
                }
            }
        }
        uploadSamplers() {
            let samplers = this._samplers;
            let textures = QuickEngine.RenderSystem.instance.getCurrentTextures();
            for (let i = 0, len = samplers.length; i < len; i++) {
                let sampler = samplers[i];
                if (!sampler.samplerTex || !sampler.samplerTex.getWebGLTexture()) {
                    continue;
                }
                QuickEngine.gl.uniform1i(sampler.location, sampler.index);
                QuickEngine.GL_CHECK_ERROR();
            }
        }
    }
    QuickEngine.WebGLShaderPass = WebGLShaderPass;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../../core/IDisposable.ts" />
var QuickEngine;
///<reference path="../../core/IDisposable.ts" />
(function (QuickEngine) {
    class GLShaderProgram {
        constructor(vsCode, fsCode) {
            this.vsCode = vsCode;
            this.fsCode = fsCode;
            let glVertexShader = QuickEngine.GLShaderManager.compileShader(QuickEngine.gl.VERTEX_SHADER, vsCode);
            let glFragmentShader = QuickEngine.GLShaderManager.compileShader(QuickEngine.gl.FRAGMENT_SHADER, fsCode);
            let webglProgram = QuickEngine.gl.createProgram();
            // 绑定shader
            QuickEngine.gl.attachShader(webglProgram, glVertexShader);
            QuickEngine.gl.attachShader(webglProgram, glFragmentShader);
            QuickEngine.gl.linkProgram(webglProgram);
            let programLog = QuickEngine.gl.getProgramInfoLog(webglProgram);
            let vertexLog = QuickEngine.gl.getShaderInfoLog(glVertexShader);
            let fragmentLog = QuickEngine.gl.getShaderInfoLog(glFragmentShader);
            if (QuickEngine.gl.getProgramParameter(webglProgram, QuickEngine.gl.LINK_STATUS) === false) {
                console.error('THREE.WebGLProgram: shader error: ', QuickEngine.gl.getError(), 'gl.VALIDATE_STATUS', QuickEngine.gl.getProgramParameter(webglProgram, QuickEngine.gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);
            }
            else if (programLog !== "") {
                console.error('THREE.WebGLProgram: shader error: ', QuickEngine.gl.getError(), 'gl.VALIDATE_STATUS', QuickEngine.gl.getProgramParameter(webglProgram, QuickEngine.gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);
            }
            QuickEngine.gl.deleteShader(glVertexShader);
            QuickEngine.gl.deleteShader(glFragmentShader);
            this.webglProgram = webglProgram;
            GLShaderProgram.GLProgramCount++;
        }
        apply() {
            if (this.webglProgram) {
                QuickEngine.gl.useProgram(this.webglProgram);
            }
        }
        isDestroyed() {
            return true;
        }
        destroy() {
            if (this.webglProgram) {
                QuickEngine.gl.deleteProgram(this.webglProgram);
                this.webglProgram = undefined;
                GLShaderProgram.GLProgramCount--;
            }
            this.vsCode = undefined;
            this.fsCode = undefined;
        }
    }
    GLShaderProgram.GLProgramCount = 0;
    QuickEngine.GLShaderProgram = GLShaderProgram;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class Shader {
        constructor(name, passes) {
            this._name = name;
            this.shaderPasses = passes || [];
        }
        getName() {
            return this._name;
        }
        addPass(pass) {
            this.shaderPasses.push(pass);
        }
    }
    QuickEngine.Shader = Shader;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
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
        ShaderChunks.defaultSpriteShadervs = `
        attribute vec3 a_position;
        attribute vec4 a_color;
        attribute vec2 a_texCoord0;
        uniform mat4 mvpMatrix;
        varying vec4 v_color;
        varying vec2 v_texCoord0;
        void main(void){
            v_color = a_color;
            v_texCoord0 = a_texCoord0;
	        gl_Position = mvpMatrix * vec4(a_position, 1.0);
        }`;
        ShaderChunks.defaultSpriteShaderfs = `
        precision mediump float;
        uniform sampler2D texture0; 
        varying vec4 v_color;
        varying vec2 v_texCoord0;
        void main(void) {
            vec4 col = texture2D(texture0, v_texCoord0);
	        gl_FragColor = col * v_color;
        }`;
        ShaderChunks.BaseMeshShadervs = `
        attribute vec3 a_position;
        attribute vec4 a_color;
        attribute vec2 a_texCoord0;
        attribute vec3 a_normal;
        uniform vec3 u_lightColor;
        uniform vec3 u_lightDirection;
        uniform mat4 mvpMatrix;
        varying vec2 v_texCoord0;
        varying vec4 v_color;
        void main(void){
            v_texCoord0 = a_texCoord0;
	        // gl_Position = mvpMatrix * vec4(a_position, 1.0);
	        gl_Position = vec4(a_position, 1.0);
            vec3 normal = normalize(vec3(mvpMatrix * vec4(a_normal, 1.0)));
            float nDotL = max(dot(u_lightDirection, normal), 0.0);
            vec3 diffuse = u_lightColor * a_color.rgb * nDotL;
            vec3 ambient = vec3(0.2, 0.2, 0.2) * a_color.rgb;
         //   v_color = vec4(diffuse + ambient, a_color.a);
        //    v_color = vec4(diffuse, a_color.a);
            v_color = a_color;
        }`;
        ShaderChunks.BaseMeshShaderfs = `
        precision mediump float;
        uniform sampler2D texture0; 
        varying vec4 v_color;
        varying vec2 v_texCoord0;
        void main(void) {
            vec4 col = texture2D(texture0, v_texCoord0);
	        //gl_FragColor = v_color;
            // gl_FragColor = col * v_color;
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }`;
    })(ShaderChunks = QuickEngine.ShaderChunks || (QuickEngine.ShaderChunks = {}));
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class WebGLBufferManager {
        constructor() {
            WebGLBufferManager._sInstance = this;
            this._indexBuffers = [];
            this._vertexBuffers = [];
        }
        static get instance() {
            console.assert(!!WebGLBufferManager._sInstance);
            return this._sInstance;
        }
        static set instance(value) {
        }
        createIndexBuffer(numIndexes, usage, useShadowBuffer) {
            let buf = new QuickEngine.WebGLIndexBuffer(numIndexes, usage, useShadowBuffer);
            this._indexBuffers.push(buf);
            return buf;
        }
        createVertexBuffer(stride, count, normalize, usage) {
            let buf = new QuickEngine.WebGLVertexBuffer(stride, count, normalize, usage);
            this._vertexBuffers.push(buf);
            return buf;
        }
        static getGLUsage(usage) {
            switch (usage) {
                case 1 /* STATIC */: return QuickEngine.gl.STATIC_DRAW;
                case 2 /* DYNAMIC */: return QuickEngine.gl.DYNAMIC_DRAW;
                case 8 /* DISCARDABLE */: return QuickEngine.gl.STREAM_DRAW;
                default: return QuickEngine.gl.DYNAMIC_DRAW;
            }
        }
    }
    QuickEngine.WebGLBufferManager = WebGLBufferManager;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class WebGLIndexBuffer {
        constructor(numIndexes, usage, useShadowBuffer) {
            this._data = new Uint16Array(numIndexes);
            this._count = numIndexes;
            this._usage = usage;
            this.createBuffer();
        }
        get count() {
            return this._count;
        }
        set count(val) {
        }
        createBuffer() {
            let buffer = QuickEngine.gl.createBuffer();
            if (!buffer) {
                throw new Error("Failed to create buffer");
            }
            this._buffer = buffer;
        }
        getGLIndexBuffer() {
            return this._buffer;
        }
        dispose() {
            if (this._buffer) {
                QuickEngine.gl.deleteBuffer(this._buffer);
                this._buffer = undefined;
            }
            if (this._data) {
                this._data = undefined;
            }
        }
        writeData(data) {
            this._data.set(data);
        }
        bindBuffer() {
            if (!this._buffer || !this._data) {
                return;
            }
            QuickEngine.gl.bindBuffer(QuickEngine.gl.ELEMENT_ARRAY_BUFFER, this._buffer);
            QuickEngine.gl.bufferData(QuickEngine.gl.ELEMENT_ARRAY_BUFFER, this._data, QuickEngine.WebGLBufferManager.getGLUsage(this._usage));
        }
    }
    QuickEngine.WebGLIndexBuffer = WebGLIndexBuffer;
})(QuickEngine || (QuickEngine = {}));
///<reference path="../RenderSystem.ts" />
var QuickEngine;
///<reference path="../RenderSystem.ts" />
(function (QuickEngine) {
    function GL_CHECK_ERROR() {
        if (QuickEngine.__DEBUG__) {
            console.assert(QuickEngine.gl.getError() == 0);
        }
    }
    QuickEngine.GL_CHECK_ERROR = GL_CHECK_ERROR;
    /**
     * @deprecated 不会有多种类型渲染器
     */
    class WebGLRendererSystem extends QuickEngine.RenderSystem {
    }
    QuickEngine.WebGLRendererSystem = WebGLRendererSystem;
})(QuickEngine || (QuickEngine = {}));
var QuickEngine;
(function (QuickEngine) {
    class WebGLVertexBuffer {
        /**
         *
         * @param stride 相邻两个顶点间的字节数
         * @param size 缓冲区中每个顶点分量个数 (1-4)
         * @param usage
         */
        constructor(stride, size, normalize, usage) {
            this.vertexCount = 0;
            this._stride = stride;
            this._size = size;
            this._usage = usage;
            this._normalized = normalize;
            this.createBuffer();
        }
        dispose() {
            if (this._data) {
                this._data = undefined;
            }
            this.destroyBuffer();
        }
        getGLBuffer() {
            return this.webGLBuffer;
        }
        createBuffer() {
            let buf = QuickEngine.gl.createBuffer();
            QuickEngine.GL_CHECK_ERROR();
            if (!buf) {
                throw new Error("无法创建WebGLBuffer");
            }
            this.webGLBuffer = buf;
        }
        destroyBuffer() {
            if (this.webGLBuffer) {
                QuickEngine.gl.deleteBuffer(this.webGLBuffer);
                this.webGLBuffer = undefined;
                QuickEngine.GL_CHECK_ERROR();
            }
        }
        writeData(data) {
            this._data = data;
        }
        bindBuffer() {
            if (!this.webGLBuffer || !this._data) {
                return;
            }
            QuickEngine.gl.bindBuffer(QuickEngine.gl.ARRAY_BUFFER, this.webGLBuffer);
            QuickEngine.gl.bufferData(QuickEngine.gl.ARRAY_BUFFER, this._data, QuickEngine.WebGLBufferManager.getGLUsage(this._usage));
        }
    }
    QuickEngine.WebGLVertexBuffer = WebGLVertexBuffer;
})(QuickEngine || (QuickEngine = {}));
//# sourceMappingURL=quick.js.map