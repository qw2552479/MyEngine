///<reference path="../../../core/HashObject.ts" />
namespace QuickEngine {

    export const enum VertexAnimationType {
        /// No animation
        NONE = 0,
        /// Morph animation is made up of many interpolated snapshot keyframes
        MORPH = 1,
        /// Pose animation is made up of a single delta pose keyframe
        POSE = 2
    }

    /**
     * 动画片段
     * 动画片段包含一组动画曲线.每个曲线对应节点路径
     */
    export class AnimationClip extends HashObject {

        public static __ClassName__ = "QuickEngine.AnimationClip";
        public static __ClassID__ = 0;

        private _frameRate: number = 0;
        public get frameRate(): number {
            return this._frameRate;
        }

        public set frameRate(val: number) {
            this._frameRate = val;
        }        

        private _length: number = 0;
        public get length(): number {
            return this._length;
        }

        public set length(val: number) {
            this._length = val;
        }

        protected _name: string;
        public get name(): string {
            return this._name;
        }

        public set name(val: string) {
            this._name = val;
        }

        private _keyFrameTimes: number[] = [];
        private _keyFrameTimesDirty: boolean;

        private _positionCurveDict: { [key: string]: AnimationCurve[] } = {};
        private _scaleCurveDict: { [key: string]: AnimationCurve[] } = {};
        private _eulerCurveDict: { [key: string]: AnimationCurve[] } = {};
        private _numberCurveDict: { [key: string]: AnimationCurve[] } = {};
        private _objCurveDict: { [key: string]: AnimationCurve[] } = {};

        /**
         *
         */
        constructor() {
            super();
        }

        /**
         * 添加一条曲线
         * @param relativePath 曲线对应节点路径
         * @param type 属性类型
         * @param propertyName 属性名
         * @param curve 曲线
         */
        public addCurve(relativePath: string, type: Reflection.Type, propertyName: string, curve: AnimationCurve) {

            curve._propName = propertyName;
            curve._valueType = type;

            if (type.equal(Reflection.Type.typeOf(Transform))) {
               
                let segmentProp = splitProperty(propertyName);
                console.assert(segmentProp.length == 2, "Transform属性长度为2");

                let transCurveArr: AnimationCurve[];

                if (segmentProp[0] == 'localPosition') {

                    transCurveArr = this._positionCurveDict[relativePath];
                    if (!transCurveArr) {
                        this._positionCurveDict[relativePath] = transCurveArr = [];
                    } 

                } else if (segmentProp[0] == "localEulerAngle") {

                    transCurveArr = this._eulerCurveDict[relativePath];
                    if (!transCurveArr) {
                        this._eulerCurveDict[relativePath] = transCurveArr = [];
                    } 

                } else if (segmentProp[0] == "localScale") {

                    transCurveArr = this._scaleCurveDict[relativePath];
                    if (!transCurveArr) {
                        this._scaleCurveDict[relativePath] = transCurveArr = [];
                    } 

                } else {
                    console.error("不支持的变换属性：" + segmentProp[0]);
                }

                if (segmentProp[1] == 'x') {
                    transCurveArr.splice(0, 1, curve);
                } else if (segmentProp[1] == 'y') {
                    transCurveArr.splice(1, 1, curve);
                } else if (segmentProp[1] == 'z') {
                    transCurveArr.splice(2, 1, curve);
                }                

            } else if (type.equal(Reflection.Type.typeOf(Number))) {

                let numberCurveArr = this._numberCurveDict[relativePath];

                if (!numberCurveArr) {
                    this._numberCurveDict[relativePath] = numberCurveArr = [];
                } 

                numberCurveArr.push(curve);

            } else {

                let objCurveArr = this._objCurveDict[relativePath];

                if (objCurveArr) {
                    this._objCurveDict[relativePath] = objCurveArr = [];
                } 

                objCurveArr.push(curve);

            }
        }

        public removeCurve(relativePath: string, type: string, propertyName: string) {
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
        public clearAllCurves() {
            this._positionCurveDict = {};
            this._scaleCurveDict = {};
            this._eulerCurveDict = {};
            this._numberCurveDict = {};
            this._objCurveDict = {};
        }

        public apply(node: Node, timePos: number) {

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

            let meshFilter = node.transform.getComponent<MeshFilter>(MeshFilter);
            if (!meshFilter) {
                return;
            }

            let mesh = meshFilter.mesh;
            if (!mesh) {
                return;
            }

            // 网格形变动画

        }

        private _applyScale(node: Node, timeIndex: TimeIndex, weight: number): void {

            let curveDict = this._scaleCurveDict;
            let timePos = timeIndex.timePos;
            let keyIndex = timeIndex.keyIndex;

            // apply position
            for (let path in curveDict) {

                let target: Transform;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                } else {
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

        private _applyRotation(node: Node, timeIndex: TimeIndex, weight: number): void {

            let curveDict = this._eulerCurveDict;
            let timePos = timeIndex.timePos;
            let keyIndex = undefined;//timeIndex.keyIndex;

            // apply position
            for (let path in curveDict) {

                let target: Transform;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                } else {
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
                target.localRotation = target.localRotation.FromEulerAngleScalar(interpolationX, interpolationY, interpolationZ, target.localRotation);
            }
        }

        private _applyPosition(node: Node, timeIndex: TimeIndex, weight: number): void {

            let curveDict = this._positionCurveDict;
            let timePos = timeIndex.timePos;
            let keyIndex = timeIndex.keyIndex;

            // apply position
            for (let path in curveDict) {

                let target: Transform;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                } else {
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

        private _applyObj(node: Node, timeIndex: TimeIndex, weight: number): void {

            let curveDict = this._objCurveDict;
            let timePos = timeIndex.timePos;
            let keyIndex = timeIndex.keyIndex;
            
            for (let path in curveDict) {

                let target: Transform;
                // 如果路径为空，此曲线应用在动画根节点上
                if (!path) {
                    target = node.transform;
                } else {
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
                    
                    let comp = target.getComponent<Component>(Component.__ClassName__);
                    let interpolation = objCurve.getInterpolation(timePos, keyIndex);
                    // TODO: 计算权重
               
                    // 设置脚本属性
                    comp[objCurve._propName] = comp;
                }
            }
        }    

        public getTimeIndex(timePos: number): TimeIndex {

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
                } else if (timePos >= prev && timePos < next) {
                    index = i + 1;
                    break;
                } 

                index = i + 1;
            }

            return { timePos: timePos, keyIndex: index };
        }

        private buildKeyFrameTimeList() {

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

    function splitProperty(prop: string) {
        return prop.split('.');
    }

}