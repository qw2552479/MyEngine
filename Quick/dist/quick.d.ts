declare namespace QuickEngine {
    let __EDITOR_MODE__: boolean;
    let __DEBUG__: boolean;
    let __PROFILER__: boolean;
    let __USE_COLUMN_MATRIX__: boolean;
}
declare namespace QuickEngine {
    interface RunData {
        width: number;
        height: number;
        div?: HTMLElement;
        clearColor?: Color;
        debugMode?: boolean;
        frameRate?: number;
        onEnginePrepared?: Function;
    }
    function run(data: RunData): void;
    function renderOneFrame(deltaTime: number): void;
}
declare namespace QuickEngine {
    class HashObject implements IDestroyable {
        private readonly _hashCode;
        private readonly _instanceId;
        protected _isDestroyed: boolean;
        readonly hashCode: number;
        readonly instanceId: number;
        constructor();
        isDestroyed(): boolean;
        destroy(): void;
        protected onDestroy(): void;
        copy(object: HashObject): void;
        clone(): HashObject;
        static destroy(object: HashObject): void;
        static clone<T extends HashObject>(original: T): T;
    }
}
declare namespace QuickEngine {
    class Scene3D extends HashObject {
        private _mainCamera;
        private _currentCamera;
        private _cameras;
        private _frameId;
        private _rootChildren;
        constructor();
        readonly children: Node[];
        createNode(parent?: Transform): Node;
        insertNode(node: Node, index?: number): void;
        removeNode(node: Node): void;
        onResize(w: number, h: number): void;
        render(): void;
        update(deltaTime: number): void;
    }
}
declare namespace QuickEngine {
    class SceneManager {
        private static _sInstance;
        static readonly instance: SceneManager;
        protected _currentScene: Scene3D;
        readonly currentScene: Scene3D;
        static createScene(): Scene3D;
        constructor();
    }
}
declare namespace QuickEngine {
    interface Resolution {
        height: number;
        width: number;
        refreshRate: number;
    }
    class Screen {
        static screenWidth: number;
        static screenHeight: number;
        static currentResolution: Resolution;
        static dpi: number;
        static fullScreen: boolean;
    }
}
declare namespace QuickEngine {
    function assert(cond: any, msg: any): void;
}
declare namespace QuickEngine {
    interface IStringDictionary<TValue> {
        [key: string]: TValue;
    }
    interface INumberDictionary<TValue> {
        [key: string]: TValue;
    }
    class Dictionary<TValue> {
        private data;
        private list;
        constructor(useOrderList?: boolean);
        containsKey(key: string): boolean;
        getValue(key: string): TValue;
        getKeys(): string[];
        getValues(): Array<TValue>;
        add(key: string, value: TValue): void;
        remove(key: string): void;
        dispose(): void;
    }
}
declare namespace QuickEngine {
    type Action = () => void;
    type Action1<T> = (t: T) => void;
    type Action2<T1, T2> = (t: T1, t2: T2) => void;
    type Action3<T1, T2, T3> = (t: T1, t2: T2, t3: T3) => void;
    type Action4<T1, T2, T3, T4> = (t: T1, t2: T2, t3: T3, t4: T4) => void;
    type Func<TResult> = () => TResult;
    type Func1<T, TResult> = (t: T) => TResult;
    type Func2<T1, T2, TResult> = (t: T1, t2: T2) => TResult;
    type Func3<T1, T2, T3, TResult> = (t: T1, t2: T2, t3: T3) => TResult;
    type Func4<T1, T2, T3, T4, TResult> = (t: T1, t2: T2, t3: T3, t4: T4) => TResult;
    interface IQuickListener {
        _func: Action;
        onCall: Action;
    }
    class QuickListener<T> implements IQuickListener {
        _listener: T;
        _func: Action;
        constructor(listener: T, func: Action);
        onCall(): void;
    }
    class QuickEvent {
        private _listeners;
        add(listener: IQuickListener): void;
        del(listener: IQuickListener): void;
        clear(): void;
        dispatchEvent(): void;
    }
    interface IQuickListener1<P> {
        _func: Action1<P>;
        onCall: Action1<P>;
    }
    class QuickListener1<T, P> implements IQuickListener1<P> {
        _listener: T;
        _func: Action1<P>;
        constructor(listener: T, func: Action1<P>);
        onCall(p: P): void;
    }
    class QuickEvent1<P> {
        private _listeners;
        add(listener: IQuickListener1<P>): void;
        del(listener: IQuickListener1<P>): void;
        clear(): void;
        dispatchEvent(t: P): void;
    }
    interface IQuickListener2<P1, P2> {
        _func: Action2<P1, P2>;
        onCall: Action2<P1, P2>;
    }
    class QuickListener2<T, P1, P2> implements IQuickListener2<P1, P2> {
        _listener: T;
        _func: Action2<P1, P2>;
        constructor(listener: T, func: Action2<P1, P2>);
        onCall(p1: P1, p2: P2): void;
    }
    class QuickEvent2<P1, P2> {
        private _listeners;
        add(listener: IQuickListener2<P1, P2>): void;
        del(listener: IQuickListener2<P1, P2>): void;
        clear(): void;
        dispatchEvent(p1: P1, p2: P2): void;
    }
    interface IQuickListener3<P1, P2, P3> {
        _func: Action3<P1, P2, P3>;
        onCall: Action3<P1, P2, P3>;
    }
    class QuickListener3<T, P1, P2, P3> implements IQuickListener3<P1, P2, P3> {
        _listener: T;
        _func: Action3<P1, P2, P3>;
        constructor(listener: T, func: Action3<P1, P2, P3>);
        onCall(p1: P1, p2: P2, p3: P3): void;
    }
    class QuickEvent3<P1, P2, P3> {
        private _listeners;
        add(listener: IQuickListener3<P1, P2, P3>): void;
        del(listener: IQuickListener3<P1, P2, P3>): void;
        clear(): void;
        dispatchEvent(p1: P1, p2: P2, p3: P3): void;
    }
    interface IQuickListener4<P1, P2, P3, P4> {
        _func: Action4<P1, P2, P3, P4>;
        onCall: Action4<P1, P2, P3, P4>;
    }
    class QuickListener4<T, P1, P2, P3, P4> implements IQuickListener4<P1, P2, P3, P4> {
        _listener: T;
        _func: Action4<P1, P2, P3, P4>;
        constructor(listener: T, func: Action4<P1, P2, P3, P4>);
        onCall(p1: P1, p2: P2, p3: P3, p4: P4): void;
    }
    class QuickEvent4<P1, P2, P3, P4> {
        private _listeners;
        add(listener: IQuickListener4<P1, P2, P3, P4>): void;
        del(listener: IQuickListener4<P1, P2, P3, P4>): void;
        clear(): void;
        dispatchEvent(p1: P1, p2: P2, p3: P3, p4: P4): void;
    }
}
declare namespace QuickEngine {
    interface IDestroyable {
        isDestroyed(): boolean;
        destroy(): void;
    }
}
declare namespace QuickEngine {
    class Log {
        static D(...args: any[]): void;
        static I(...args: any[]): void;
        static W(...args: any[]): void;
        static E(...args: any[]): void;
        static F(...args: any[]): void;
    }
}
declare namespace QuickEngine {
    type MinHeapComparer<T> = (x: T, y: T) => number;
    /**
     * 最小堆
     */
    class MinHeap<T> {
        protected _heap: T[];
        protected _comparer: MinHeapComparer<T>;
        protected _length: number;
        constructor(comparer?: MinHeapComparer<T>);
        /**
         * 元素入队
         * @param x
         */
        enqueue(x: T): boolean;
        /**
         * 最小元素出队
         */
        dequeue(): T;
        /**
         * 查看最小元素
         */
        peek(): T;
        /**
         * 堆元素数量
         */
        count(): number;
        /**
         * 清空队列
         */
        clear(): void;
        protected filterDown(start: number, end: number): void;
        protected filterUp(start: number): void;
    }
}
declare namespace QuickEngine {
    module Reflection {
        class Type {
            private readonly _cls;
            /**
             * 返回当前类型的上一层继承类型
             *@return {Function}
             */
            readonly baseType: Function;
            getConstructor(): Function;
            constructor(cls: Function);
            static getType(instance: Object): Type;
            static typeOf(cls: Function): Type;
            isSubClassOf(superClass: Type): boolean;
            equal(type: Type): boolean;
        }
    }
}
declare namespace QuickEngine {
    import Type = QuickEngine.Reflection.Type;
    class ResourceManager {
        static readonly BUILTIN_DEF_WHITE_TEX_NAME: string;
        private _resourceCacheMap;
        static readonly instance: ResourceManager;
        constructor();
        /**
         * 构建引擎内置资源
         * @param onFinished
         */
        makeBuiltinRes(onFinished: Function): void;
        get<T extends Resource>(path: string): T;
        load<T extends Resource>(path: string, type: Type): T;
        loadAsync<T extends Resource>(path: string, type: Type): Promise<T>;
        reload<T extends Resource>(url: string, type: Type): T;
        unload(url: string): void;
    }
}
declare namespace QuickEngine {
    /**
     * 资源加载状态
     */
    const enum ResState {
        UnLoaded = 0,
        Loading = 1,
        Loaded = 2,
        Prepared = 3,
        Preparing = 4
    }
    class RefObj extends HashObject {
        private _retainCount;
        readonly retainCount: number;
        constructor();
        retain(): void;
        release(): void;
        dispose(): void;
    }
    class ResourceDependence extends HashObject {
        _mainRes: Resource;
        _subRes: Resource;
        _listener: QuickListener<ResourceDependence>;
        constructor(mainRes: any, subRes: any);
        getMainRes(): Resource;
        getSubRes(): Resource;
        destroy(): void;
        private _onLoaded;
    }
    abstract class Resource extends RefObj {
        protected _group: string;
        protected _isDisposed: boolean;
        protected _dependenceFiles: Array<ResourceDependence>;
        protected _name: string;
        name: string;
        _priority: number;
        priority: number;
        protected _state: ResState;
        readonly state: ResState;
        readonly isComplete: boolean;
        _loadedEvent: QuickEvent1<Resource>;
        _unloadedEvent: QuickEvent1<Resource>;
        protected constructor(name?: string, group?: string);
        isDestroyed(): boolean;
        destroy(): void;
        abstract clone(): HashObject;
        copy(object: HashObject): void;
        protected abstract loadImpl(data?: ArrayBuffer | Blob | string): any;
        protected abstract unloadImpl(): any;
        load(data?: ArrayBuffer | Blob | string): void;
        unload(): void;
        reload(): void;
        protected _onLoad(): void;
        _addDependence(subResource: Resource): void;
        _removeDependence(pSubResource: Resource): void;
        _removeAllDependence(): void;
        _hasDependencies(): boolean;
    }
}
declare namespace QuickEngine {
    class TextResource extends Resource {
        private _data;
        readonly data: string;
        constructor(name: string);
        clone(): HashObject;
        protected loadImpl(): void;
        protected unloadImpl(): void;
    }
}
declare namespace QuickEngine {
    module Timer {
        /**
         * 添加一个定时器
         * @param callback 回调函数
         * @param delay    延迟时间, 单位毫秒
         * @param repeat   重复次数, 默认为0, 不重复
         * @param interval 重复间隔时间, 单位毫秒
         * @return 定时器id
         */
        function addTimer(callback: (dt: number) => void, delay: number, repeat?: number, interval?: number): number;
        /**
         * 删除一个定时器
         * @param timerId 定时器id
         */
        function killTimer(timerId: number): void;
        function update(dt: number): void;
    }
}
declare namespace QuickEngine {
    module UUID {
        function newUuid(): string;
    }
}
declare namespace QuickEngine {
    interface IResLoader<T> {
        load(path: string, onLoaded: (err: any, data: T) => void, thisObj?: Object): void;
        loadAsync(path: string): Promise<T>;
    }
}
declare namespace QuickEngine {
    class ImageLoader implements IResLoader<HTMLImageElement> {
        static readonly instance: ImageLoader;
        load(path: string, onLoaded: (err: string, data: HTMLImageElement) => void, thisObj?: Object): void;
        loadAsync(path: string): Promise<HTMLImageElement>;
    }
}
declare namespace QuickEngine {
    class TextLoader implements IResLoader<string> {
        static readonly instance: TextLoader;
        load(url: string, onLoaded: (err: string, data: string) => void, thisObj?: Object): void;
        loadAsync(url: string): Promise<string>;
    }
}
declare namespace QuickEngine {
    class AABB {
        max: Vector3;
        min: Vector3;
        size: number;
        center: Vector3;
    }
}
declare namespace QuickEngine {
    /**
     * ��ɫ
     */
    class Color {
        static White: Color;
        static Black: Color;
        static Red: Color;
        static Green: Color;
        static Blue: Color;
        r: number;
        g: number;
        b: number;
        a: number;
        constructor(r?: number, g?: number, b?: number, a?: number);
        clone(oriangl: Color): Color;
        static colorToHex(color: Color): number;
        static colorToString(color: Color): string;
        static stringToColor(colorString: string): Color;
    }
}
declare namespace QuickEngine {
    class Node extends HashObject {
        static __ClassName__: string;
        static __ClassID__: number;
        protected _transfrom: Transform;
        protected _worldAABB: AABB;
        protected _isActive: boolean;
        private _componentList;
        private _componentDict;
        constructor(name?: string);
        protected _name: string;
        name: string;
        transform: Transform;
        updateRenderQueue(renderQueue: RenderQueue): void;
        addComponent<T extends Component>(compName: any): T;
        getComponent<T extends Component>(compName: string | Function): T;
        getComponentInChildren<T extends Component>(compName: string | Function, includeInactive?: boolean): T;
        GetComponentInParent<T extends Component>(compName: string | Function): T;
        getComponents<T extends Component>(compName: string | Function): T[];
        getComponentsInChildren<T extends Component>(compName: string | Function, includeInactive?: boolean, outCompList?: T[]): T[];
        getComponentsInParent<T extends Component>(compName: string | Function, includeInactive?: boolean, outCompList?: T[]): T[];
    }
}
declare namespace QuickEngine {
    const enum OrientationMode {
        DEGREE_0 = 0,
        DEGREE_90 = 1,
        DEGREE_180 = 2,
        DEGREE_270 = 3,
        PORTRAIT = 0,
        LANDSCAPERIGHT = 1,
        LANDSCAPELEFT = 3
    }
    const enum ProjectionType {
        ORTHOGRAPHIC = 0,
        PERSPECTIVE = 1
    }
    const enum FrustumPlane {
        FRUSTUM_PLANE_NEAR = 0,
        FRUSTUM_PLANE_FAR = 1,
        FRUSTUM_PLANE_LEFT = 2,
        FRUSTUM_PLANE_RIGHT = 3,
        FRUSTUM_PLANE_TOP = 4,
        FRUSTUM_PLANE_BOTTOM = 5
    }
    class Frustum extends Node {
        RenderOp: RenderOperation;
        CurrentShader: Shader;
        private _projectionType;
        private _frustumPlanes;
        constructor();
        updateRenderQueue(renderQueue: RenderQueue): void;
        preRender(): void;
        postRender(): void;
        getMaterial(): Material;
        getRenderOperation(): RenderOperation;
        getWorldTransforms(): Matrix4;
    }
}
declare namespace QuickEngine {
    type Degree = number;
    type Radian = number;
    /**
    * 弧度每角度
    */
    const RADIANS_TO_DEGREES: number;
    /**
    * 角度每弧度 Math.PI / 180;
    */
    const DEGREES_TO_RADIANS: number;
    module MathUtil {
        /**
        * @private
        * 1角度为多少弧度
        */
        const RAW_DATA_CONTAINER: Float32Array;
        /**
        * 把一个值固定在一个范围之内
        * @param value 当前判定的值
        * @param min_inclusive 最小取值
        * @param max_inclusive 最大取值
        * @returns number 计算后的结果
        */
        function clampf(value: number, min_inclusive: number, max_inclusive: number): number;
        function lerp(a: number, b: number, t: number): number;
    }
}
declare namespace QuickEngine {
    /**
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
    /**
     * TODO: 矩阵数据使用array buffer, 数组计算更缓存友好
     */
    class Matrix4 {
        static ClassName: string;
        _00: number;
        _10: number;
        _20: number;
        _30: number;
        _01: number;
        _11: number;
        _21: number;
        _31: number;
        _02: number;
        _12: number;
        _22: number;
        _32: number;
        _03: number;
        _13: number;
        _23: number;
        _33: number;
        private _rawData;
        constructor();
        static create(_00: number, _01: number, _02: number, _03: number, _10: number, _11: number, _12: number, _13: number, _20: number, _21: number, _22: number, _23: number, _30: number, _31: number, _32: number, _33: number): Matrix4;
        set(_00: number, _01: number, _02: number, _03: number, _10: number, _11: number, _12: number, _13: number, _20: number, _21: number, _22: number, _23: number, _30: number, _31: number, _32: number, _33: number): Matrix4;
        copyFrom(other: Matrix4): Matrix4;
        clone(): Matrix4;
        /**
         * 矩阵相乘
         a00 a01 a02 a03     b00 b01 b02 b03     a00*b00+a01*b10+a02*b20+a03*b30 a00*b01+a01*b11+a02*b21+a03*b31 a00*b02+a01*b12+a02*b22+a03*b32 a00*b03+a01*b13+a02*b23+a03*b33
         a10 a11 a12 a13  *  b10 b11 b12 b13  =  a10*b00+a11*b10+a12*b20+a13*b30 a10*b01+a11*b11+a12*b21+a13*b31 a10*b02+a11*b12+a12*b22+a13*b32 a10*b03+a11*b13+a12*b23+a13*b33
         a20 a21 a22 a23     b20 b21 b22 b23     a20*b00+a21*b10+a22*b20+a23*b30 a20*b01+a21*b11+a22*b21+a23*b31 a20*b02+a21*b12+a22*b22+a23*b32 a20*b03+a21*b13+a22*b23+a23*b33
         a30 a31 a32 a33     b30 b31 b32 b33     a30*b00+a31*b10+a32*b20+a33*b30 a30*b01+a31*b11+a32*b21+a33*b31 a30*b02+a31*b12+a32*b22+a33*b32 a30*b03+a31*b13+a32*b23+a33*b33
         */
        multiply(v: Matrix4, out?: Matrix4): Matrix4;
        static multiply(v1: Matrix4, v2: Matrix4, out?: Matrix4): Matrix4;
        /**
         * 矩阵向量相乘, 列向量应该右乘矩阵
         * @param vec
         a00 a01 a02 a03    x
         a10 a11 a12 a13 *  y
         a20 a21 a22 a23    z
         a30 a31 a32 a33    w=0
         */
        transformVector3(v: Vector3): Vector3;
        /**
         * 单位矩阵
         */
        identity(): Matrix4;
        static identity(): Matrix4;
        /**
         * 矩阵求逆
         */
        inverse(): Matrix4;
        /**
         * 矩阵转置
         每一列变成每一行
         | a b |  T   | a c |
         | c d | ===> | b d |
         */
        transpose(): Matrix4;
        static transpose(target: Matrix4): Matrix4;
        isAffine(): boolean;
        /**
         * 绕任意轴旋转
         */
        rotateByAxis(angle: number, axis: Vector3): Matrix4;
        rotateByScalar(x: number, y: number, z: number): Matrix4;
        /**
         * 矩阵分解, 可分解为position,scale,quaternion
         */
        decompose(): void;
        toArrayBuffer(): Float32Array;
        static makeTransform(position: Vector3, rotation: Quaternion, scale: Vector3, out?: Matrix4): Matrix4;
        /**
         * 构造平移矩阵
         * @param v
         * @param out
         * @example
         *          |1, 0, 0, x|
         *          |0, 1, 0, y|
         *          |0, 0, 1, z|
         *          |0, 0, 0, 1|
         */
        static makeTranslate(v: Vector3): Matrix4;
        /**
         * 根据x，y，z标量构造平移矩阵
         * @param t_x
         * @param t_y
         * @param t_z
         * @param out
         */
        static makeTranslateByScalar(t_x: number, t_y: number, t_z: number): Matrix4;
        /**
         * 构造缩放矩阵
         * @param s_x
         * @param s_y
         * @param s_z
         * @param out 如果传入out，则不创建新的matrix，返回out
         * @example
         *          |sx, 0 , 0 , 0|
         *          |0 , sy, 0 , 0|
         *          |0 , 0 , sz, 0|
         *          |0 , 0 , 0 , 1|
         */
        static makeScale(s_x: number, s_y: number, s_z: number): Matrix4;
        /**
         * 根据标量, 绕任意轴旋转构造旋转矩阵
         * @param a
         * @param x
         * @param y
         * @param z
         * @param out
         */
        static makeRotation(a: number, x: number, y: number, z: number): Matrix4;
        /**
         * 根据向量，绕任意轴构造旋转矩阵
         * @param angle
         * @param axis
         */
        static makeRotationByAxis(angle: number, axis: Vector3): Matrix4;
        static makeRotationEulerAngle(eulerAngle: Vector3): Matrix4;
        static makeRotationQuaternion(q: Quaternion, out?: Matrix4): Matrix4;
        /**
         * 绕X轴旋转，也叫做俯仰角
         * @param a
         * @param out
         */
        static pitch(a: number, out?: Matrix4): Matrix4;
        /**
         * 绕Y轴旋转，也叫偏航角
         */
        static yaw(a: number, out?: Matrix4): Matrix4;
        /**
         * 绕Z轴旋转，也叫翻滚角
         */
        static roll(a: number, out?: Matrix4): Matrix4;
        /**
         * 生成左手视图矩阵
         * @param position
         * @param orientation
         * @param reflectMatrix
         * @param viewMatrix
         */
        static makeViewMatrixLH(position: Vector3, orientation: Quaternion, reflectMatrix?: Matrix4, viewMatrix?: Matrix4): Matrix4;
        /**
         * 构造左手正交视图矩阵
         * 生成正交投影矩阵 矩阵推导可以参考 http://www.codeguru.com/cpp/misc/misc/graphics/article.php/c10123/Deriving-Projection-Matrices.htm
         * @param w
         * @param h
         * @param zn
         * @param zf
         * @param target
         * @example
         * |2 / (right - left), 0,                  0,                -(right + left) / (right - left) |
         * |0,                  2 / (top - bottom), 0,                -(top + bottom) / (top - bottom) |
         * |0,                  0,                  2 / (far - near), -(far + near) / (far - near)     |
         * |0,                  0,                  0,                1                                |
         */
        static makeOrthoLH(left: number, right: number, top: number, bottom: number, near: number, far: number, target?: Matrix4): Matrix4;
        /**
         * TODO:
         * @param w
         * @param h
         * @param near
         * @param far
         * @param target
         */
        static makeOrthoFovLH(w: number, h: number, near: number, far: number, target?: Matrix4): Matrix4;
        /**
         * 生成正交视图矩阵
         * @param w
         * @param h
         * @param zn
         * @param zf
         * @param target
         */
        static makeOrthoRH(left: number, right: number, top: number, bottom: number, near: number, far: number, target?: Matrix4): Matrix4;
        /**
         * 构造左手投影矩阵
         * @param left
         * @param right
         * @param top
         * @param bottom
         * @param near
         * @param far
         * @param target
         */
        static makePerspectiveLH(left: number, right: number, top: number, bottom: number, near: number, far: number, target?: Matrix4): Matrix4;
        /**
         * 根据fov构造左手透视投影矩阵
         * @param fov
         * @param aspect
         * @param near
         * @param far
         * @param target
         */
        static makePerspectiveFovLH(fov: number, aspect: number, near: number, far: number, target?: Matrix4): Matrix4;
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
        static makePerspectiveRH(left: number, right: number, top: number, bottom: number, near: number, far: number, target?: Matrix4): Matrix4;
        /**
         * 根据fov构造右手透视投影矩阵
         * @param fov
         * @param aspect
         * @param near
         * @param far
         * @param target
         */
        static makePerspectiveFovRH(fov: number, aspect: number, near: number, far: number, target?: Matrix4): Matrix4;
    }
}
declare namespace QuickEngine {
    const enum PlaneSide {
        Front = 0,
        Back = 1,
        INTERSECT = 2
    }
    /**
     * 平面, 隐式定义方程ax + by + cz = d, 向量(a, b, c)为平面法向量
     */
    class Plane {
        static ClassName: string;
        x: number;
        y: number;
        z: number;
        d: number;
        constructor(x?: number, y?: number, z?: number, d?: number);
        set(x?: number, y?: number, z?: number, d?: number): void;
        /**
         * 归一化
         */
        normalize(): number;
        /**
         * 求点到面的距离
         * @param v
         */
        distance(v: Vector3): number;
        /**
         * 判断点在平面的方向
         * @param v
         */
        atSide(v: Vector3): PlaneSide;
        /**
         *
         * @param m
         */
        transform(m: Matrix4): void;
        /**
         * 3点构造平面, 3点不能共线, 否则有无数个面
         * @param p1
         * @param p2
         * @param p3
         */
        fromPoints(p1: Vector3, p2: Vector3, p3: Vector3): void;
        /**
         * 法向量和平面一点坐标构造平面
         * @param normal
         * @param p
         */
        fromNormalAndPoint(normal: Vector3, p: Vector3): void;
        /**
         * 计算点集最佳平面
         * @param points
         */
        static computeBestFitNormal(points: Vector3[]): Vector3;
    }
}
declare namespace QuickEngine {
    /**
     * 四元数 [w, x, y, z]
     * 假设轴角对(n, θ): 绕n指定的旋转轴θ角, 则 q = [cos(θ / 2), sin(θ / 2) * nx, sin(θ / 2) * ny, sin(θ / 2) * nz]
     */
    class Quaternion {
        static ClassName: string;
        static ZERO: Quaternion;
        static IDENTITY: Quaternion;
        x: number;
        y: number;
        z: number;
        w: number;
        constructor(w?: number, x?: number, y?: number, z?: number);
        copyFrom(q: Quaternion): Quaternion;
        clone(): Quaternion;
        /**
         * 加法
         * @param q
         */
        add(q: Quaternion): Quaternion;
        /**
         * 减法
         * @param q
         */
        minus(q: Quaternion): Quaternion;
        /**
         * 点乘
         * @param q
         */
        dot(q: Quaternion): number;
        /**
         * 叉乘
         * @param q
         */
        multiply(q: Quaternion): Quaternion;
        /**
         * 乘以一个标量
         * @param s
         */
        multiplyScalar(s: number): Quaternion;
        static multiplyScalar(s: number, q: Quaternion): Quaternion;
        multiplyVector(vector: Vector3): Quaternion;
        rotateVector3(v: Vector3): Vector3;
        /**
         * 对数. 公式: log(q) = [0, αN], N 为单位向量
         */
        log(): Quaternion;
        /**
         * 指数. 公式: exp(p) = [cos() ]
         */
        exp(): Quaternion;
        /**
         * 共轭四元数, 四元数逆q-1 = 它的共轭除以模长
         */
        conjugate(): Quaternion;
        /**
         * 四元数的逆
         */
        inverse(): Quaternion;
        /**
         * 单位四元数求逆, 必须是单位四元数才能调用此方法
         */
        unitInverse(): Quaternion;
        /**
         * 模长
         */
        readonly magnitude: number;
        /**
         * 模长平方
         */
        readonly sqrMagnitude: number;
        /**
         * 正则化
         */
        normalize(): Quaternion;
        /**
         * 比较两个四元素是否相等
         * @param other
         */
        equal(q: Quaternion): boolean;
        /**
         * 线性插值(Linear Interpolation)
         * @param lhs
         * @param rhs
         * @param t
         */
        lerp(lhs: Quaternion, rhs: Quaternion, t: number): Quaternion;
        /**
         * 球面线性插值(Spherical Linear Interpolation)
         * @param lhs
         * @param rhs
         * @param t
         */
        slerp(lhs: Quaternion, rhs: Quaternion, t: number): Quaternion;
        /**
         * 四元数样条 squad(qi, qi1, si, si1, t) = slerp(slerp(qi, qi1, t), slerp(si, si1, t), 2 * t * (1 - t))
         */
        private static _TempQuat0;
        private static _TempQuat1;
        squad(q0: any, q1: any, s0: any, s1: any, t: any): Quaternion;
        /**
         * 通过旋转矩阵构造四元数
         * @param rotMat
         */
        FromRotationMatrix(rotMat: Matrix4): Quaternion;
        ToRotationMatrix(rotMat?: Matrix4): Matrix4;
        /**
         * 创建一个以axis轴为中心旋转rads弧度的四元数
         * @param axis
         * @param rads
         */
        FromAngleAxis(axis: Vector3, rads: Radian): void;
        /**
         * 返回四元数绕轴心和角度
         * @param axis 旋转轴
         * @returns 弧度
         */
        ToAngleAxis(axis: Vector3): Radian;
        /**
         * 欧拉角转四元数
         * @param eulerAngle 欧拉角
         * @param refQuaternion 欧拉角引用，如果不为空，将会改变传入的四元数，并返回传入的四元数
         * @return Quaternion 四元数
         */
        FromEulerAngle(eulerAngle: Vector3, refQuaternion?: Quaternion): Quaternion;
        FromEulerAngleScalar(x: number, y: number, z: number, refQuaternion?: Quaternion): Quaternion;
        /**
         * 四元数转欧拉角
         */
        ToEulerAngle(refEulerAngle?: Vector3): Vector3;
        getRightVector(): Vector3;
        getUpVector(): Vector3;
        getDirVector(): Vector3;
    }
}
declare namespace QuickEngine {
    /**
     * 射线, 隐式定义方程
     */
    class Ray {
        static ClassName: string;
        origin: Vector3;
        direction: Vector3;
        constructor(origin?: Vector3, direction?: Vector3);
        intersectPlane(): boolean;
        intersectTriangle(): boolean;
        intersectSphere(): boolean;
        intersectAABB(): boolean;
        IntersectMesh(): boolean;
    }
    class Ray2D {
    }
}
declare namespace QuickEngine {
    class Rect {
        static ClassName: string;
        left: number;
        top: number;
        width: number;
        height: number;
        constructor(l: number, t: number, w: number, h: number);
    }
}
declare namespace QuickEngine {
    /**
     * 球 (x - cx) * (x - cx) + (y - cy) *  (y - cy) +(z - cz) *  (z - cz) = r * r
     */
    class Sphere {
        static ClassName: string;
        center: Vector3;
        radius: number;
        constructor(x?: number, y?: number, z?: number, radius?: number);
    }
}
declare namespace QuickEngine {
    class Spline {
    }
}
declare namespace QuickEngine {
    type Number2 = [number, number];
    class Vector2 {
        static ClassName: string;
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        /**
         * ���
         * @param other
         */
        add(other: Vector2): Vector2;
        /**
         * ���
         * @param other
         */
        sub(other: Vector2): Vector2;
        /**
         * Scalar Product �����
         * @param multiplier
         */
        scalarProduct(multiplier: number): Vector2;
        vectorProduct(other: Vector2): Vector2;
        /**
         * ���
         * @param other
         */
        dot(other: Vector2): number;
        /**
         * ���
         * @param lhs
         * @param rhs
         */
        static dot(lhs: Vector2, rhs: Vector2): number;
        divide(val: number): Vector2;
        divideVector(other: Vector2): Vector2;
        /**
         * ������һ��
         */
        normalize(): Vector2;
        /**
         * ��ȡ��������
         */
        getLength(): number;
        /**
         * ��ȡ��������ƽ��
         */
        getLengthSquare(): number;
        /**
         * ����������
         * @param v0
         * @param v1
         */
        distance(v0: Vector2, v1: Vector2): number;
        /**
         * ����������ƽ��
         * @param v0
         * @param v1
         */
        distanceSquare(v0: Vector2, v1: Vector2): number;
        lerp(v0: Vector2, v1: Vector2, t: number): Vector2;
    }
}
declare namespace QuickEngine {
    type Number3 = [number, number, number];
    class Vector3 {
        static ClassName: string;
        static readonly Right: Vector3;
        static readonly Up: Vector3;
        static readonly Forward: Vector3;
        x: number;
        y: number;
        z: number;
        constructor(x?: number, y?: number, z?: number);
        /**
         *
         * @param other
         */
        copy(other: Vector3): Vector3;
        /**
         * 复制一个自己,返回一个新的vector3
         */
        clone(): Vector3;
        /**
         * 是否相同
         * @param other
         */
        isEqual(other: Vector3): boolean;
        /**
         * 置0
         */
        setZero(): Vector3;
        set(x: number, y: number, z: number): Vector3;
        /**
         * 相加
         * @param other
         */
        add(other: Vector3): Vector3;
        /**
         * 相减
         * @param other
         */
        sub(other: Vector3): Vector3;
        /**
         * Scalar Product 乘以标量
         * @param multiplier
         */
        multiplyScalar(multiplier: number): Vector3;
        /**
         * 乘以向量
         * @param other
         */
        multiplyVector3(other: Vector3): Vector3;
        /**
         * 点积
         * @param other
         */
        dot(other: Vector3): number;
        /**
         * 点积
         * @param lhs
         * @param rhs
         */
        static dot(lhs: Vector3, rhs: Vector3): number;
        /**
         * 叉积
         * @param other
         */
        cross(other: Vector3): Vector3;
        /**
         * 叉积
         * @param lhs
         * @param rhs
         */
        static cross(lhs: Vector3, rhs: Vector3): Vector3;
        /**
         * 除以标量
         * @param val
         */
        divide(val: number): Vector3;
        /**
         * 除以向量
         * @param other
         */
        divideVector(other: Vector3): Vector3;
        /**
         * 向量归一化
         */
        normalize(): Vector3;
        /**
         * 求模长
         */
        readonly magnitude: number;
        /**
         * 求模长平方
         */
        readonly sqrMagnitude: number;
        /**
         * 两向量距离
         * @param v0
         * @param v1
         */
        static distance(v0: Vector3, v1: Vector3): number;
        /**
         * 两向量距离平方
         * @param v0
         * @param v1
         */
        static sqrDistance(v0: Vector3, v1: Vector3): number;
        lerp(v0: Vector3, v1: Vector3, t: number): Vector3;
    }
}
declare namespace QuickEngine {
    type Number4 = [number, number, number, number];
    class Vector4 {
        static ClassName: string;
        x: number;
        y: number;
        z: number;
        w: number;
        constructor(x?: number, y?: number, z?: number, w?: number);
    }
}
declare namespace QuickEngine {
    class Sound {
        constructor();
    }
}
declare namespace QuickEngine {
    class Vedio {
        constructor();
    }
}
declare namespace QuickEngine {
    const enum XHRState {
        Uninitialized = 0,
        Open = 1,
        Sent = 2,
        Receiving = 3,
        Loaded = 4
    }
    interface IAjaxOptions {
        url: string;
        method: string;
        responseType: XMLHttpRequestResponseType;
        async?: boolean;
        data?: any;
        headers?: {
            [key: string]: string;
        };
        timeout?: number;
        callback?: (err: string, data: any, xhr: XMLHttpRequest, status: number) => void;
        thisObj?: Object;
    }
    /**
     * @class
     * @static
     */
    class Http /** @lends QuickEngine.Http */ {
        static _defaultOptions: IAjaxOptions;
        static getUrlParam(url: any, data: any): any;
        static getQueryData(data: any): string | FormData;
        static getQueryString(data: any): string;
        static ajax(options: IAjaxOptions): XMLHttpRequest;
        /**
         *
         * @param url
         * @param data
         * @param header
         * @param callback
         * @param thisObj
         * @param isAsync
         */
        static get(url: string, data?: any, callback?: (err: string, data: any, xhr: XMLHttpRequest, status: number) => void, thisObj?: any, isAsync?: boolean): XMLHttpRequest;
        static post(url: string, data?: any, callback?: (err: string, data: any, xhr: XMLHttpRequest, status: number) => void, thisObj?: any, isAsync?: boolean): XMLHttpRequest;
    }
}
declare namespace QuickEngine {
    class Billboard {
    }
    class BillboardSet extends Node {
        static __ClassName__: string;
        static __ClassID__: number;
        private _renderable;
        constructor();
    }
}
declare namespace QuickEngine {
    interface IScriptable {
        onLoad?: () => void;
        onUpdate?: (deltaTime: number) => void;
    }
    class Component extends HashObject implements IScriptable {
        static __DisallowMultipleComponent__: boolean;
        static __ClassName__: string;
        static __ClassID__: number;
        tag: string;
        private _needCallStart;
        private _node;
        node: Node;
        readonly transform: Transform;
        private _enable;
        enabled: boolean;
        onLoad: () => void;
        onUpdate: (deltaTime: number) => void;
        onDebugDraw: () => void;
        constructor();
        protected onDestroy(): void;
        static load(): void;
        static update(deltaTime: number): void;
        compareTag(tag: string): boolean;
        getComponent<T extends Component>(compName: string | Function): T;
        getComponentInChildren<T extends Component>(compName: string | Function, includeInactive?: boolean): T;
        GetComponentInParent<T extends Component>(compName: string | Function): T;
        getComponents<T extends Component>(compName: string | Function): T[];
        getComponentsInChildren<T extends Component>(compName: string | Function, includeInactive?: boolean, outCompList?: T[]): T[];
        getComponentsInParent<T extends Component>(compName: string | Function, includeInactive?: boolean, outCompList?: T[]): T[];
        notifyAttachNode(val: Node): void;
        private static s_unStartedcomponentArr;
        private static s_startedComponentArr;
        private enqueComponent;
        private dequeComponent;
    }
}
declare namespace QuickEngine {
    const enum CameraType {
        Prespective = 0,
        Orthogonal = 1,
        VR = 2
    }
    const enum ClearFlags {
        Skybox = 0,
        SoildColor = 1,
        DepthOnly = 2,
        DontClear = 3
    }
    const enum VisibilityType {
        NONE = 0,
        FULL = 1,
        PARTIAL = 2
    }
    class Camera extends Component {
        static __ClassName__: string;
        static __ClassID__: number;
        static MainCamera: Camera;
        protected _cameraType: CameraType;
        protected _clearFlags: ClearFlags;
        protected _fovY: number;
        protected _near: number;
        protected _far: number;
        protected _aspect: number;
        protected _viewport: Viewport;
        protected _orthoWidth: number;
        protected _orthoHeight: number;
        protected _projMatrix: Matrix4;
        protected _isDirty: boolean;
        protected _viewportDirty: boolean;
        private _renderContext;
        private _renderTarget;
        constructor();
        renderContext: RenderContext;
        setCameraType(cameraType: CameraType): void;
        getCameraType(): CameraType;
        setFOV(fovY: number): void;
        getFOV(): number;
        setNearClip(near: number): void;
        getNearClip(): number;
        setFarClip(far: number): void;
        getFarClip(): number;
        setAspect(aspect: number): void;
        getAspect(): number;
        setOrthoWidth(w: number): void;
        setOrthoHeight(h: number): void;
        viewPort: Viewport;
        getViewMatrix(): Matrix4;
        getProjMatrix(): Matrix4;
        renderTarget: RenderTarget;
        private _update;
    }
}
declare namespace QuickEngine {
    /**
    * 光源类型
    */
    const enum LightType {
        /**
         * 点光源光
         */
        Point = 0,
        /**
         * 平行光
         */
        Direction = 1,
        /**
         * 聚光灯光
         */
        Spot = 2,
        /**
         * 环境光
         */
        Area = 3
    }
    class Light extends Component {
        static __ClassName__: string;
        static __ClassID__: number;
        /**
         * 光类型
         */
        lightType: LightType;
        position: Vector3;
        direction: Vector3;
        diffuse: Color;
        specular: Color;
        spotOuter: Radian;
        spotInner: Radian;
        spotFalloff: number;
        spotNearClip: number;
        range: number;
        attenuationConst: number;
        attenuationLinear: number;
        attenuationQuad: number;
        powerScale: number;
        constructor();
        updateRenderQueue(renderQueue: RenderQueue): void;
    }
}
declare namespace QuickEngine {
    /**
     * 变换组件
     */
    class Transform extends Component {
        static __ClassName__: string;
        static __ClassID__: number;
        protected _children: Transform[];
        protected _parent: Transform;
        protected _needParentUpdate: boolean;
        protected _needChildUpdate: boolean;
        protected _needTransformUpdate: boolean;
        protected _needWorldToLocalMatrixUpdate: boolean;
        protected _needEulerUpdate: boolean;
        protected _parentNotified: boolean;
        protected _childrenToUpdate: Transform[];
        protected _position: Vector3;
        protected _localPosition: Vector3;
        protected _rotation: Quaternion;
        protected _localRotation: Quaternion;
        protected _eulerAngle: Vector3;
        protected _localEulerAngle: Vector3;
        protected _scale: Vector3;
        protected _localScale: Vector3;
        protected _localToWorldMatrix: Matrix4;
        protected _worldToLocalMatrix: Matrix4;
        constructor();
        /**
         * 子节点数量
         */
        childCount: number;
        /**
        * 返回父节点
        */
        /**
        * 设置父节点
        * @param {QuickEngine.Transform} parent 父节点, 为空则从当前父节点删除
        */
        parent: Transform;
        /*
         * 设置世界坐标
        */
        position: Vector3;
        /*
         * 设置本地坐标
        */
        localPosition: Vector3;
        /*
         * 设置世界旋转四元数
        */
        rotation: Quaternion;
        /*
         * 设置本地旋转四元数
        */
        localRotation: Quaternion;
        /*
         * 设置本地欧拉角
        */
        eulerAngle: Vector3;
        /*
         * 设置本地欧拉角
        */
        localEulerAngle: Vector3;
        /*
         * 设置世界缩放
        */
        scale: Vector3;
        /*
         * 设置本地缩放
        */
        localScale: Vector3;
        readonly localToWorldMatrix: Matrix4;
        readonly worldToLocalMatrix: Matrix4;
        removeChildren(): void;
        getChildByIndex(index: number): Transform;
        private _childNameDict;
        find(name: string): Transform;
        private _findByPath;
        findChild(name: string): Transform;
        update(updateChildren: boolean, parentHasChanged: boolean): void;
        protected _updateFromParent(): void;
        needUpdate(forceParentUpdate?: boolean): void;
        requestUpdate(child: Transform, forceParentUpdate: boolean): void;
    }
}
declare namespace QuickEngine {
    class MeshFilter extends Component {
        static __ClassName__: string;
        static __ClassID__: number;
        private _mesh;
        mesh: Mesh;
    }
    /**
     * 网格
     */
    class Mesh extends HashObject {
        static __ClassName__: string;
        static __ClassID__: number;
        sharedVertexData: WebGLVertexBuffer[];
        id: number;
        protected _name: string;
        name: string;
        /**
         * 子网格数组
         */
        subMeshes: SubMesh[];
        constructor();
        copy(object: Mesh): void;
        clone(): HashObject;
        addSubMesh(subMesh: SubMesh): void;
        createSubMesh(name: string): SubMesh;
        update(): void;
        protected loadImpl(): void;
        protected unloadImpl(): void;
    }
}
declare namespace QuickEngine {
    class MeshManager {
        static __ClassName__: string;
        static __ClassID__: number;
        static instance: MeshManager;
        constructor();
    }
}
declare namespace QuickEngine {
    interface SubMeshData {
    }
    interface MeshData {
        id: number;
        parent: number;
        name: string;
        normal: number[];
        uv: number[];
        position: number[];
        subMeshes: SubMeshData[];
        skinInfo?: any;
    }
    interface SkinData {
    }
    interface SkinnedMeshData extends MeshData {
        skins: SkinData[];
    }
    interface BoneData {
        name: string;
        id: number;
        parentId: number;
        position: Number3;
        eulerAngle: Number3;
        scale: Number3;
    }
    interface SkeletonData {
        id: number;
        size: number;
        type: number;
    }
    interface PoseItem {
        eNodeId: number;
        id: number;
        isLocalMatrix: boolean;
        matrix: number[];
    }
    interface PoseData {
        isBindPose: boolean;
        isCharacter: boolean;
        items: PoseItem[];
    }
    interface ModelData {
        metadata: string;
        materials?: string[];
        textures?: string[];
        skeleton?: SkeletonData[];
        poses?: PoseData[];
        hierarchy?: BoneData[];
        meshes: MeshData[];
        animations?: Object[];
    }
    class MeshSerializer {
        static exportMeshWithJson(mesh: Mesh, filename: string): void;
        static exportMeshWithBinary(mesh: Mesh, filename: string): void;
        static importMeshWithJson(meshData: MeshData, mesh: Mesh): void;
        static importMeshWithBinary(data: ArrayBuffer, mesh: Mesh): void;
        static loadModel(modelData: ModelData): Node;
    }
}
declare namespace QuickEngine {
    class SubMesh {
        static __ClassName__: string;
        static __ClassID__: number;
        useSharedVertices: boolean;
        vertexData: WebGLVertexBuffer[];
        indexData: WebGLIndexBuffer;
        renderOpType: RenderOperationType;
        protected vertexAnimationType: VertexAnimationType;
        parent: Mesh;
        protected _materialName: string;
        materialName: string;
        constructor();
        /**
         * 复制一个新的SubMesh
         * @param newName 新的SubMesh名称
         * @param parentMesh 新的Submesh父Mesh, 如果为空, 父Mesh为被克隆的Mesh父Mesh
         */
        clone(newName: string, parentMesh?: Mesh): void;
        getRenderOpreation(renderOp: RenderOperation): void;
    }
}
declare namespace QuickEngine {
    const enum VertexAnimationType {
        NONE = 0,
        MORPH = 1,
        POSE = 2
    }
    /**
     * 动画片段
     * 动画片段包含一组动画曲线.每个曲线对应节点路径
     */
    class AnimationClip extends HashObject {
        static __ClassName__: string;
        static __ClassID__: number;
        private _frameRate;
        frameRate: number;
        private _length;
        length: number;
        protected _name: string;
        name: string;
        private _keyFrameTimes;
        private _keyFrameTimesDirty;
        private _positionCurveDict;
        private _scaleCurveDict;
        private _eulerCurveDict;
        private _numberCurveDict;
        private _objCurveDict;
        /**
         *
         */
        constructor();
        /**
         * 添加一条曲线
         * @param relativePath 曲线对应节点路径
         * @param type 属性类型
         * @param propertyName 属性名
         * @param curve 曲线
         */
        addCurve(relativePath: string, type: Reflection.Type, propertyName: string, curve: AnimationCurve): void;
        removeCurve(relativePath: string, type: string, propertyName: string): void;
        /**
         * 清除动画数据
         */
        clearAllCurves(): void;
        apply(node: Node, timePos: number): void;
        private _applyScale;
        private _applyRotation;
        private _applyPosition;
        private _applyObj;
        getTimeIndex(timePos: number): TimeIndex;
        private buildKeyFrameTimeList;
    }
}
declare namespace QuickEngine {
    namespace AnimationCurve {
        /**
         * 插值模式
         */
        const enum InterpolationMode {
            Liner = 0,
            Spline = 1,
            Constant = 2
        }
    }
    /**
     * 关键帧索引数据
     */
    interface TimeIndex {
        timePos: number;
        keyIndex: number;
    }
    /**
     * timeline的指定时间点上，相邻的一对关键帧，以及时间系数
     */
    interface KeyFramePair {
        t: number;
        keyframe1: KeyFrame;
        keyframe2: KeyFrame;
        firstKeyFrameIndex?: number;
    }
    class AnimationCurve {
        static __ClassName__: string;
        static __ClassID__: number;
        private _isObjCurve;
        private _keyFrames;
        _propName: string;
        _valueType: Object;
        constructor(objCurve?: boolean);
        isObjectKeyFrame(): boolean;
        getKeyFrameCount(): number;
        addKeyFrame(keyFrame: KeyFrame, index?: number): void;
        addKeyFrameByValue(time: number, value: number, inTangent?: number, outTangent?: number, index?: number): void;
        moveKeyFrame(index: number, keyFrame: KeyFrame): void;
        removeKeyFrame(index: number): void;
        /**
         * 根据时间索引, 取得当前一对关键帧
         * @param {number} timePos 动画时间位置，这个时间应当和动画片段的总时间做过取余计算
         * @param {number} keyIndex 帧索引
         * @return {KeyFramePair}
         */
        protected getKeyFramePairAtTime(timePos: number, keyIndex?: number): KeyFramePair;
        /**
         * 根据时间索引, 计算关键帧插值
         * @param {number} timePos 时间点
         * @param {number} keyIndex 索引
         */
        getInterpolation(timePos: number, keyIndex?: number): number;
        /**
         * 收集所有关键帧时间
         * @param outKeyFrameTimes 关键帧时间数组
         */
        _collectKeyFrameTimes(outKeyFrameTimes: number[]): void;
        _buildKeyFrameIndexMap(outKeyFrameTimes: number[]): void;
    }
}
declare namespace QuickEngine {
}
declare namespace QuickEngine {
    enum AnimationBlendMode {
        Add = 0
    }
    /**
     * 动画控制器
     * 动画控制器控制管理一组动画片段
     */
    class AnimationState {
        private _blendMode;
        blendMode: AnimationBlendMode;
        private _clip;
        readonly clip: AnimationClip;
        enabled: boolean;
        layer: number;
        length: number;
        name: string;
        normalizedSpeed: number;
        normalizedTime: number;
        speed: number;
        time: number;
        weight: number;
        wrapMode: AnimationCurve.InterpolationMode;
        AddMixingTransform(mix: Transform, recursive?: boolean): void;
        RemoveMixingTransform(mix: Transform): void;
    }
}
declare namespace QuickEngine {
    /**
     * 动画播放器
     * 动画控制器控制动画的状态切换
     */
    class Animator extends Component {
        static __ClassName__: string;
        static __ClassID__: number;
        private _animController;
        animController: AnimatorController;
        private _playingClip;
        private _timePos;
        constructor();
        play(animName: string): void;
        stop(): void;
        /**
         * 更新动画
         *@param {number} deltaTime 间隔时间
         */
        onUpdate: (deltaTime: number) => void;
    }
}
declare namespace QuickEngine {
    /**
     * 动画控制器
     * 动画控制器控制管理一组动画片段
     */
    class AnimatorController extends HashObject {
        private _animationClips;
        animationClips: AnimationClip[];
        constructor();
        addClip(clip: AnimationClip): void;
        removeClip(clip: AnimationClip): void;
    }
}
declare namespace QuickEngine {
    /**
     * 骨骼
     */
    class Bone {
        static __ClassName__: string;
        static __ClassID__: number;
        private _skeleton;
        private _name;
        name: string;
        private _handle;
        handle: number;
        private _node;
        node: Node;
        private _firstChild;
        constructor(skeleton: Skeleton, name?: string);
        _update(updateChilren: boolean, parentHasChanged: boolean): void;
    }
}
declare namespace QuickEngine {
    /**
     *
     */
    class KeyFrame {
        static __ClassName__: string;
        static __ClassID__: number;
        protected _time: number;
        /**
         * 返回关键帧所在时间，以毫秒为单位
         *@return {number}
         */
        /**
        * 设置关键帧所在时间，以毫秒为单位
        *@param {number} val 时间
        */
        time: number;
        protected _value: number;
        value: number;
        private _inTangent;
        inTangent: number;
        private _outTangent;
        outTangent: number;
        protected _interpolationMode: AnimationCurve.InterpolationMode;
        interpolationMode: AnimationCurve.InterpolationMode;
        protected _parentTrack: any;
        constructor(time: number, value: number, inTangent?: number, outTangent?: number);
    }
}
declare namespace QuickEngine {
    class Skeleton {
        static __NameSpace__: string;
        static __ClassName__: string;
        static __FullClassName__: string;
        static __ClassID__: number;
        private _name;
        private _rootBones;
        private _boneMapByName;
        private _boneMapByPath;
        constructor(name: string);
        createBone(name: string, relativePath: string): Bone;
        getRootBone(): Bone;
        getBone(name: string): Bone;
        getBoneByPath(relativePath: string): Bone;
        hasBone(name: string): boolean;
        updateTransforms(): void;
    }
}
declare namespace QuickEngine {
}
declare namespace QuickEngine {
    class PrefabFactory {
        static createCube(mesh: Mesh): void;
        static createSphere(mesh: Mesh): void;
    }
}
declare namespace QuickEngine {
    const enum RenderOperationType {
        POINT_LIST = 0,
        LINE_LIST = 1,
        LINE_STRIP = 2,
        TRIANGLE_LIST = 3,
        TRIANGLE_STRIP = 4,
        TRIANGLE_FAN = 5
    }
    class RenderOperation {
        indexBuffer: WebGLIndexBuffer;
        vertexBuffers: WebGLVertexBuffer[];
        renderOpType: RenderOperationType;
        primCount: number;
        numberOfInstances: number;
        constructor();
    }
    abstract class Renderable extends Component {
        RenderOp: RenderOperation;
        CurrentShader: Shader;
        private _isLighting;
        private _castShadow;
        setLighting(lighting: boolean): void;
        isLighting(): boolean;
        setCastShadow(castShadow: boolean): void;
        isCastShadow(): boolean;
        abstract getMaterial(): Material;
        abstract getRenderOperation(): RenderOperation;
        abstract getWorldTransforms(): Matrix4;
        preRender(): void;
        postRender(): void;
    }
}
declare namespace QuickEngine {
    class DebugRender extends Renderable {
        static __ClassName__: string;
        static __ClassID__: number;
        private _material;
        private readonly _renderOp;
        mesh: Mesh;
        constructor();
        setMaterial(material: Material): void;
        getMaterial(): Material;
        getRenderOperation(): RenderOperation;
        getWorldTransforms(): Matrix4;
    }
}
declare namespace QuickEngine {
    class MeshRender extends Renderable {
        static __ClassName__: string;
        static __ClassID__: number;
        protected _currentMaterial: Material;
        protected _materials: Material[];
        protected _renderOp: RenderOperation;
        mesh: Mesh;
        constructor();
        setMaterial(material: Material): void;
        removeMaterial(material: Material): void;
        removeMaterialByIndex(index: number): void;
        getMaterial(): Material;
        getRenderOperation(): RenderOperation;
        getWorldTransforms(): Matrix4;
    }
}
declare namespace QuickEngine {
    class SkinedMeshRender extends Renderable {
        static __ClassName__: string;
        static __ClassID__: number;
        protected _currentMaterial: Material;
        protected _materials: Material[];
        protected _renderOp: RenderOperation;
        mesh: Mesh;
        bones: Transform[];
        rootBone: Transform;
        sharedMesh: Mesh;
        updateWhenOffscreen: boolean;
        GetBlendShapeWeight(index: number): number;
        SetBlendShapeWeight(index: number, value: number): void;
        constructor();
        setMaterial(material: Material): void;
        removeMaterial(material: Material): void;
        removeMaterialByIndex(index: number): void;
        getMaterial(): Material;
        getRenderOperation(): RenderOperation;
        getWorldTransforms(): Matrix4;
    }
}
declare namespace QuickEngine {
    class SpriteRender extends Renderable {
        static __ClassName__: string;
        static __ClassID__: number;
        private _material;
        private _renderOp;
        constructor();
        setMaterial(material: Material): void;
        getMaterial(): Material;
        getRenderOperation(): RenderOperation;
        getWorldTransforms(): Matrix4;
    }
}
declare namespace QuickEngine {
    class RenderContext {
        private _name;
        private _isEnable;
        protected _camera: Camera;
        protected _clearMode: ClearMask;
        protected _clearColor: Number4;
        protected _clearDepth: number;
        protected _clearStencil: number;
        protected _visibleCuller: any;
        protected _shaderProvider: any;
        protected _renderPipeline: RenderPipeline;
        constructor(camera: Camera, name?: string);
        readonly name: string;
        enable: boolean;
        renderPipeline: RenderPipeline;
        camera: Camera;
        setColorClear(clearMode: ClearMask, clearColor: Number4, depth?: number, stencil?: number): void;
        /**
        1.设置帧缓冲
        2.清除缓冲区状态
        3.使用shader
        4.绑定顶点和属性
        5.裁剪测试
        6.设置混合模式
        7.提交数据
         */
        doRender(): void;
        readPixels(x: number, y: number, w: number, h: number, format: number, type: number, pixels: ArrayBufferView): void;
    }
}
declare namespace QuickEngine {
    /**
     *
     */
    class RenderPipeline {
        renderQueue: RenderQueue;
        constructor();
        doRender(renderContext: RenderContext): void;
        doLighting(): void;
    }
}
declare namespace QuickEngine {
    const MAX_NUM_UNIFORM = 32;
    const MAX_NUM_SAMPLER = 8;
    const MAX_NUM_VELEMENT = 16;
    const MAX_NUM_USER_CONST = 64;
    const MAX_NUM_SHADER_PASS = 8;
    const MAX_NUM_VERTEX_STREAM = 4;
    abstract class RenderSystem {
        protected static _sInstance: RenderSystem;
        static readonly instance: RenderSystem;
        protected _renderStatedChanged: boolean;
        protected _currentRenderState: RenderState;
        protected _textureChanged: boolean[];
        protected _currentTextures: Texture[];
        protected _shaderPassChanged: boolean;
        protected _currentShaderPass: WebGLShaderPass;
        protected _currentRenderTarget: RenderTarget;
        protected _viewport: Viewport;
        protected _worldMatrix: Matrix4;
        protected _viewMatrix: Matrix4;
        protected _projectionMatrix: Matrix4;
        protected _worldViewTM: Matrix4;
        protected _viewProjTM: Matrix4;
        protected _worldViewProjTM: Matrix4;
        protected _textureTM: Matrix4[];
        protected _isTransformDirty: boolean;
        protected _boneCount: boolean;
        protected _boneTM: Matrix4[];
        protected _cameraPosition: Vector4;
        protected _cameraDirection: Vector4;
        protected _materialEmissive: Vector4;
        protected _materialAmbient: Vector4;
        protected _materialDiffuse: Vector4;
        protected _materialSpecular: Vector4;
        protected _materialOpacity: Vector4;
        protected _lightPosition: Vector4;
        protected _lightDirection: Vector4;
        protected _lightAmbient: Vector4;
        protected _lightDiffuse: Vector4;
        protected _lightSpecular: Vector4;
        protected _lightAttenParam: Vector4;
        protected _lightSpotParam: Vector4;
        protected _ambient: Vector4;
        protected _diffuse: Vector4;
        protected _specular: Vector4;
        protected _fogColor: Vector4;
        protected _fogParam: Vector4;
        protected _shaderState: Vector4;
        protected _time: Vector4;
        protected _clipPlane: Vector4;
        protected _userConst: Vector4[];
        protected constructor();
        private _clearState;
        onInit(): void;
        onShutdown(): void;
        beginScene(): void;
        endScene(): void;
        /**
         * 清除缓冲区
         * @param mode 要清除的缓冲区掩码
         * @param color 指定颜色缓冲区清除值
         * @param depth 指定深度缓冲区清除值
         * @param stencil 指定模板缓冲区清除值
         */
        abstract clear(mask: ClearMask, color: Number4, depth: number, stencil: number): any;
        abstract setViewport(viewPort: Viewport): any;
        abstract setRenderTarget(renderTarget: RenderTarget): any;
        abstract renderOperation(renderOp: RenderOperation): any;
        abstract bindGpuProgram(gpuProgram: GLShaderProgram): any;
        abstract onResize(w: number, h: number): void;
        setWorldMatrix(worldMatrix: Matrix4): void;
        getWorldMatrix(): Matrix4;
        setViewMatrix(viewMatrix: Matrix4): void;
        getViewMatrix(): Matrix4;
        setProjectionMatrix(projectionMatrix: Matrix4): void;
        getProjectionMatrix(): Matrix4;
        getWorldViewMatrix(): Matrix4;
        getViewProjMatrix(): Matrix4;
        getWorldViewProjMatrix(): Matrix4;
        setCamera(camera: Camera): void;
        setMaterial(material: Material): void;
        setLight(): void;
        setFog(fogColor: Color, fogNear: number, fogFar: number): void;
        setClipPlane(near: number, far: number): void;
        _setTextureUnitSettings(unit: number, tex: Texture): void;
        abstract _setTexture(unit: number, enable: boolean, tex: Texture): void;
        setShaderPass(pass: WebGLShaderPass): void;
        setRenderState(cullMode: CullMode, blendMode: BlendMode, depthCheck: DepthCheck, colorMask: ColorMask): void;
        getCurrentTextures(): Texture[];
        begin(): void;
        end(): void;
        render(shader: Shader, renderable: Renderable): void;
        readPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: ArrayBufferView): void;
    }
}
declare namespace QuickEngine {
    /**
     * 材质基类
     */
    class Material extends Resource {
        static ClassName: string;
        name: any;
        shader: Shader;
        lightShader: Shader;
        texs: Texture[];
        opacity: number;
        opacityFacotr: number;
        emissive: Number3;
        emissiveFactor: number;
        ambient: Number3;
        ambientFactor: Number3;
        diffuse: Number3;
        diffuseFactor: Number3;
        specular: Number3;
        specularFactor: Number3;
        shininess: number;
        bump: any;
        normalMap: any;
        bumpFacotr: number;
        reflection: number;
        reflectionFactor: number;
        constructor(name?: string);
        copy(object: HashObject): void;
        clone(): HashObject;
        protected loadImpl(): void;
        protected unloadImpl(): void;
        private static _defaultCubeMaterial;
        private static _defMatGLTex;
        static getDefaultCubeMaterial(): Material;
    }
}
declare namespace QuickEngine {
    class SpriteMaterial extends Material {
        private static _shared;
        private static _defGLTex;
        static getDefaultSpriteMaterial(): SpriteMaterial;
        type: string;
        fog: boolean;
        lights: boolean;
        opacity: number;
        transparent: boolean;
        blendSrc: number;
        blendDst: number;
        blendEquation: number;
        blendSrcAlpha: any;
        blendDstAlpha: any;
        blendEquationAlpha: any;
        premultipliedAlpha: boolean;
        _needsUpdate: boolean;
        tex: Texture;
    }
}
declare namespace QuickEngine {
    class GLShaderManager implements IDestroyable {
        static compileShader(type: number, code: string): WebGLShader;
        private _shaders;
        constructor();
        isDestroyed(): boolean;
        destroy(): void;
        find(name: string): Shader;
        load(name: string): Shader;
        remove(name: string): void;
    }
}
declare namespace QuickEngine {
    const enum UniformType {
        FLOAT4 = 0,
        MATRIX4 = 1,
        WORLD_MATRIX = 2,
        VIEW_MATRIX = 3,
        PROJ_MATRIX = 4,
        WORLD_VIEW_MATRIX = 5,
        VIEW_PROJ_MATRIX = 6,
        WORLD_VIEW_PROJ_MATRIX = 7,
        BONE_MATRIX = 8,
        TEXTURE_MATRIX = 9,
        CAMERA_POSITION = 10,
        CAMERA_DIRECTION = 11,
        LIGHT_POSITION = 12,
        LIGHT_DIRECTION = 13,
        LIGHT_ATTEN_PARAM = 14,
        LIGHT_SPOT_PARAM = 15,
        EMISSIVE = 16,
        AMBIENT = 17,
        DIFFUSE = 18,
        SPECULAR = 19,
        OPACITY = 20,
        FOG_COLOR = 21,
        FOG_PARAM = 22,
        SHADER_STATE = 23,
        TIME = 24,
        CLIP_PLANE = 25,
        USER_CONST = 26
    }
    const enum TexFilter {
        DEFAULT = 0,
        POINT = 1,
        LINEAR = 2,
        ANISOTROPIC = 3
    }
    const enum TexAddress {
        WRAP = 0,
        MIRROR = 1,
        CLAMP = 2,
        BORDER = 3
    }
    const enum SamplerBindType {
        NONE = 0,
        EMISSIVE = 1,
        DIFFUSE = 2,
        SPECULAR = 3,
        NORMAL = 4,
        LIGHTING_MAP = 5,
        EXTERN0 = 6,
        EXTERN1 = 7,
        EXTERN2 = 8,
        EXTERN3 = 9,
        SAMPLER = 10
    }
    interface GLUniform {
        name: string;
        type: UniformType;
        location: WebGLUniformLocation;
        data?: any;
    }
    interface TextureSampler {
        name: string;
        index: number;
        bindType: SamplerBindType;
        location: WebGLUniformLocation;
        samplerTex: Texture;
    }
    class WebGLShaderPass implements IDestroyable {
        private _program;
        private _renderState;
        private _attributes;
        private _uniforms;
        private _samplers;
        constructor();
        isDestroyed(): boolean;
        destroy(): void;
        /**
         * 设置shader程序
         * @param program
         */
        setProgram(program: GLShaderProgram): void;
        getProgram(): GLShaderProgram;
        setUniform(index: number, data: any): void;
        addUniform(uniform: GLUniform): void;
        addSampler(sampler: TextureSampler): void;
        setAttribute(attrName: VertexElementSemantic, attrLoc: number): void;
        getAttribute(attrName: VertexElementSemantic): number;
        setRenderState(renderState: RenderState): void;
        getRenderState(): RenderState;
        getSamplers(): TextureSampler[];
        clone(): WebGLShaderPass;
        uploadUniforms(): void;
        uploadSamplers(): void;
    }
}
declare namespace QuickEngine {
    class GLShaderProgram implements IDestroyable {
        static GLProgramCount: number;
        vsCode: WebGLShader;
        fsCode: WebGLShader;
        webglProgram: WebGLProgram;
        constructor(vsCode: string, fsCode: string);
        apply(): void;
        isDestroyed(): boolean;
        destroy(): void;
    }
}
declare namespace QuickEngine {
    class Shader {
        private _name;
        shaderPasses: WebGLShaderPass[];
        getName(): string;
        constructor(name: string, passes?: WebGLShaderPass[]);
        addPass(pass: WebGLShaderPass): void;
    }
}
declare namespace QuickEngine {
    interface AsyncCallback {
        onSuccess?: (data: any) => any;
        onFail?: (error: number, data: any) => any;
    }
    const ResponseType_Default: string;
    const ResponseType_ArrayBuffer = "arraybuffer";
    const ResponseType_Blob = "blob";
    const ResponseType_Document = "document";
    const ResponseType_Json = "json";
    const ResponseType_Text = "text";
    module DownloadHelper {
        interface DownloadTask {
            url: string;
            responseType?: string;
            callback?: AsyncCallback;
        }
        function download(task: DownloadTask): void;
    }
}
declare namespace QuickEngine {
    const enum TextureUsage {
        STATIC = 1,
        DYNAMIC = 2,
        WRITE_ONLY = 4,
        STATIC_WRITE_ONLY = 5,
        DYNAMIC_WRITE_ONLY = 6,
        DYNAMIC_WRITE_ONLY_DISCARDABLE = 14,
        AUTOMIPMAP = 16,
        /** This texture will be a render target, i.e. used as a target for render to texture
         setting this flag will ignore all other texture usages except TU_AUTOMIPMAP */
        RENDERTARGET = 32,
        DEFAULT = 21
    }
    class Texture extends Resource {
        private static Tid;
        private readonly _tid;
        readonly id: number;
        protected _width: number;
        width: number;
        protected _height: number;
        height: number;
        protected _resolution: number;
        resolution: number;
        protected _webglTex: WebGLTexture;
        readonly webglTex: WebGLTexture;
        getWebGLTexture(): WebGLTexture;
        mipmaps: number;
        format: PixelFormat;
        private _usage;
        usage: TextureUsage;
        private _image;
        readonly image: HTMLImageElement;
        private _imageData;
        readonly imageData: ImageData;
        constructor(name?: string);
        copy(object: Texture): void;
        clone(): Texture;
        loadImage(image: HTMLImageElement): void;
        loadRawData(data: ArrayBuffer, width: number, height: number): void;
        destroy(): void;
        protected createWebGLTexture(): void;
        protected loadImpl(): void;
        protected unloadImpl(): void;
    }
}
declare namespace QuickEngine {
    const enum VertexElementSemantic {
        POSITION = 1,
        BLEND_WEIGHTS = 2,
        BLEND_INDICES = 3,
        NORMAL = 4,
        DIFFUSE = 5,
        SPECULAR = 6,
        TEXTURE_COORDINATES = 7,
        BINORMAL = 8,
        TANGENT = 9,
        COUNT = 9
    }
    const enum VertexElementType {
        FLOAT1 = 0,
        FLOAT2 = 1,
        FLOAT3 = 2,
        FLOAT4 = 3,
        COLOUR = 4,
        SHORT1 = 5,
        SHORT2 = 6,
        SHORT3 = 7,
        SHORT4 = 8,
        UBYTE4 = 9,
        COLOUR_ARGB = 10,
        COLOUR_ABGR = 11,
        DOUBLE1 = 12,
        DOUBLE2 = 13,
        DOUBLE3 = 14,
        DOUBLE4 = 15,
        USHORT1 = 16,
        USHORT2 = 17,
        USHORT3 = 18,
        USHORT4 = 19,
        INT1 = 20,
        INT2 = 21,
        INT3 = 22,
        INT4 = 23,
        UINT1 = 24,
        UINT2 = 25,
        UINT3 = 26,
        UINT4 = 27
    }
    const enum TextureType {
        TEXTURE_2D = 0,
        TEXTURE_2D_ARRAY = 1,
        TEXTURE_3D = 2,
        TEXTURE_CUBE_MAP = 3
    }
    const enum FilterMode {
        Point = 0,
        Bilinear = 1,
        Trilinear = 2
    }
    const enum WrapMode {
        Clamp = 0,
        Repeat = 1
    }
    const enum PixelFormat {
        UNKNOWN = 0,
        RED = 1,
        RG = 2,
        RGB = 3,
        RGBA = 4,
        LUMINANCE = 5,
        LUMINANCE_ALPHA = 6,
        ALPHA = 7,
        DEPTH_COMPONENT = 8,
        DEPTH_STENCIL = 9,
        RED_INTEGER = 10,
        RG_INTEGER = 11,
        RGB_INTEGER = 12,
        RGBA_INTEGER = 13
    }
    const enum DataType {
        GL_UNSIGNED_BYTE = 0,
        GL_BYTE = 1,
        GL_UNSIGNED_SHORT = 2,
        GL_SHORT = 3,
        GL_UNSIGNED_INT = 4,
        GL_INT = 5,
        GL_HALF_FLOAT = 6,
        GL_FLOAT = 7,
        GL_UNSIGNED_SHORT_5_6_5 = 8
    }
    const enum PixelUnpackType {
        UNPACK_ALIGNMENT = 0,
        UNPACK_COLORSPACE_CONVERSION_WEBGL = 1,
        UNPACK_FLIP_Y_WEBGL = 2,
        UNPACK_PREMULTIPLY_ALPHA_WEBGL = 3
    }
    const enum PixelPackType {
        PACK_ALIGNMENT = 0
    }
    const enum BufferUsage {
        STATIC = 1,
        DYNAMIC = 2,
        WRITE_ONLY = 4,
        DISCARDABLE = 8,
        STATIC_WRITE_ONLY = 5,
        DYNAMIC_WRITE_ONLY = 6,
        DYNAMIC_WRITE_ONLY_DISCARDABLE = 14
    }
    const enum ShaderType {
        Vertex = 0,
        Fragment = 1
    }
    const enum CullMode {
        NONE = 0,
        FRONT = 1,
        BACK = 2,
        OVERLAPPED = 3
    }
    const enum FillMode {
        POINT = 0,
        FRAME = 1,
        SOLID = 2
    }
    const enum BlendMode {
        Normal = 0,
        OPACITY = 1,
        ALPHA_TEST = 2,
        ALPHA_BLEND = 3,
        ADD = 4,
        MUL = 5,
        OVERLAPPED = 6
    }
    const enum DepthCheck {
        NONE = 0,
        CHECK_ONLY = 1,
        CHECK_WRITE = 2,
        OVERLAPPED = 3
    }
    const enum ColorMask {
        NONE = 0,
        RED = 1,
        GREEN = 2,
        BLUE = 4,
        ALPHA = 8,
        ALL = 15
    }
    const enum ClearMask {
        None = 0,
        COLOR_BUFFER_BIT = 1,
        DEPTH_BUFFER_BIT = 2,
        STENCIL_BUFFER_BIT = 4,
        ALL = 7
    }
    class RenderState {
        cullMode: CullMode;
        blendMode: BlendMode;
        depthCheck: DepthCheck;
        colorMask: ColorMask;
        constructor();
    }
    interface Viewport {
        x: number;
        y: number;
        w: number;
        h: number;
    }
}
declare namespace QuickEngine {
    class RenderQueue {
        solidObjects: Renderable[];
        alphaObjects: Renderable[];
        constructor();
        addRenderable(renderable: Renderable): void;
        clear(): void;
    }
}
declare namespace QuickEngine {
    class RenderTarget extends HashObject {
        private static RdtId;
        protected _rid: number;
        protected _texture: Texture;
        width: number;
        height: number;
        _frameBuffer: WebGLFramebuffer;
        _depthBuffer: WebGLRenderbuffer;
        _hasDepthBuffer: boolean;
        private _format;
        format: PixelFormat;
        readonly id: number;
        getTexture(): Texture;
        constructor();
        init(): void;
        destroy(): void;
    }
}
declare namespace QuickEngine {
    let gl: WebGLRenderingContext;
    function GL_CHECK_ERROR(): void;
    class WebGLRendererSystem extends RenderSystem {
        protected _canvas: HTMLCanvasElement;
        constructor(div?: HTMLElement);
        clear(mask: ClearMask, color: Number4, depth: number, stencil: number): void;
        setViewport(viewPort: Viewport): void;
        setRenderTarget(renderTarget: RenderTarget): void;
        _setTexture(unit: number, enable: boolean, tex: Texture): void;
        private _bindRenderState;
        bindGpuProgram(gpuProgram: GLShaderProgram): void;
        private _bindVertexElement;
        renderOperation(renderOp: RenderOperation): void;
        static getGLDrawCount(type: RenderOperationType, primCount: number): number;
        beginScene(): void;
        endScene(): void;
        onResize(w: number, h: number): void;
    }
}
declare namespace QuickEngine.ShaderChunks {
    interface ShaderData {
        attributes: string[];
        uniforms: string[];
        vsCode: string;
        fsCode: string | null;
        pass: string[];
    }
    let defaultSpriteShadervs: string;
    let defaultSpriteShaderfs: string;
    let BaseMeshShadervs: string;
    let BaseMeshShaderfs: string;
}
declare namespace QuickEngine {
    class WebGLBufferManager {
        private static _sInstance;
        static instance: WebGLBufferManager;
        protected _indexBuffers: WebGLIndexBuffer[];
        protected _vertexBuffers: WebGLVertexBuffer[];
        constructor();
        createIndexBuffer(numIndexes: number, usage: BufferUsage, useShadowBuffer: boolean): WebGLIndexBuffer;
        createVertexBuffer(stride: number, count: number, normalize: boolean, usage: BufferUsage): WebGLVertexBuffer;
        static getGLUsage(usage: BufferUsage): number;
    }
}
declare namespace QuickEngine {
    class WebGLIndexBuffer {
        private _buffer;
        _usage: BufferUsage;
        private _count;
        count: number;
        _data: Uint16Array;
        constructor(numIndexes: number, usage: BufferUsage, useShadowBuffer: boolean);
        createBuffer(): void;
        getGLIndexBuffer(): WebGLBuffer;
        dispose(): void;
        writeData(data: number[]): void;
        bindBuffer(): void;
    }
}
declare namespace QuickEngine {
    class WebGLVertexBuffer {
        webGLBuffer: WebGLBuffer;
        _size: number;
        _stride: number;
        _normalized: boolean;
        _usage: BufferUsage;
        _data: ArrayBuffer;
        type: VertexElementType;
        semantic: VertexElementSemantic;
        vertexCount: number;
        /**
         *
         * @param stride 相邻两个顶点间的字节数
         * @param size 缓冲区中每个顶点分量个数 (1-4)
         * @param usage
         */
        constructor(stride: number, size: number, normalize: boolean, usage: BufferUsage);
        dispose(): void;
        getGLBuffer(): WebGLBuffer;
        protected createBuffer(): void;
        protected destroyBuffer(): void;
        writeData(data: ArrayBuffer): void;
        bindBuffer(): void;
    }
}
