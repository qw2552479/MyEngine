namespace QuickEngine {

    export namespace AnimationCurve {
        /**
         * 插值模式
         */
        export const enum InterpolationMode {
            Liner,      // 线性插值
            Spline,     // 曲线
            Constant    // 常数
        }
    }
    

    /**
     * 关键帧索引数据
     */
    export interface TimeIndex {
        timePos: number; // 时间点
        keyIndex: number; // 关键帧索引
    }

    /**
     * timeline的指定时间点上，相邻的一对关键帧，以及时间系数     
     */
    export interface KeyFramePair {
        t: number; // 系数
        keyframe1: KeyFrame; // 前一关键帧
        keyframe2: KeyFrame; // 后一关键帧
        firstKeyFrameIndex?: number; // 第一帧索引
    }

    export class AnimationCurve {

        public static __ClassName__ = "QuickEngine.AnimationCurve";
        public static __ClassID__ = 0;

        private _isObjCurve = false;
        private _keyFrames: KeyFrame[];

        public _propName: string;
        public _valueType: Object;

        public constructor(objCurve: boolean = false) {
            this._keyFrames = [];
            this._isObjCurve = objCurve;
        }

        public isObjectKeyFrame(): boolean {
            return false;
        }

        public getKeyFrameCount() {
            return this._keyFrames.length;
        }

        public addKeyFrame(keyFrame: KeyFrame, index?: number) {
            // 检查KeyFrame类型是否一致
            if (__EDITOR_MODE__) {
                if (this._keyFrames.length > 0) {
                }
            }

            if (index === undefined || this._keyFrames.length <= index) {
                this._keyFrames.push(keyFrame);
                return;
            }

            this._keyFrames.splice(index, 0, keyFrame);
        }

        public addKeyFrameByValue(time: number, value: number, inTangent?: number, outTangent?: number, index?: number) {
            // 检查KeyFrame类型是否一致
            if (__EDITOR_MODE__) {
                if (this._keyFrames.length > 0) {
                }
            }

            let keyFrame = new KeyFrame(time, value, inTangent, outTangent);
            if (index === undefined || this._keyFrames.length <= index) {
                this._keyFrames.push(keyFrame);
                return;
            }

            this._keyFrames.splice(index, 0, keyFrame);
        }

        public moveKeyFrame(index: number, keyFrame: KeyFrame) {
            let thisKeyFrame = this._keyFrames;

            if (index < 0 || thisKeyFrame.length > index) {
                return;
            }

            thisKeyFrame.splice(index, 1);
            thisKeyFrame.splice(index, 0, keyFrame);
        }

        public removeKeyFrame(index: number) {
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
        protected getKeyFramePairAtTime(timePos: number, keyIndex?: number): KeyFramePair {

            let keyframe1: KeyFrame, keyframe2: KeyFrame;
            let keys = this._keyFrames;

            // 直接设置帧索引
            if (keyIndex !== undefined) {
                
                if (keyIndex + 1 == keys.length) {
                    keyframe1 = keys[keyIndex];
                    keyframe2 = keys[keyIndex];
                } else {
                    keyframe1 = keys[keyIndex];
                    keyframe2 = keys[keyIndex + 1];
                }

            } else {
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
                    } else if (timePos >= frame.time && timePos <= nextFrame.time) {
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
                } else if (i == len) {
                    keyframe1 = keys[i - 1];
                    keyframe2 = keys[i - 1];
                } else {
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

            let pair: KeyFramePair = {
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
        public getInterpolation(timePos: number, keyIndex?: number): number {

            if (this._keyFrames.length == 0) {
                return 0;
            }

            let ret: number = 0;

            // #1 根据时间点, 取得前后一组关键帧
            let keyFramePair = this.getKeyFramePairAtTime(timePos, keyIndex);
            let k1: KeyFrame = keyFramePair.keyframe1;
            let k2: KeyFrame = keyFramePair.keyframe2;

            // 插值系数为0，直接返回k1帧的值
            if (keyFramePair.t == 0) {
                return k1.value;
            }

            // #2 求两关键帧在当前时间的插值
            let interpolationMode = k1.interpolationMode;
            switch (interpolationMode) {

                case AnimationCurve.InterpolationMode.Liner: {
                    MathUtil.clampf
                    ret = MathUtil.lerp(k1.value, k2.value, keyFramePair.t);

                } break;
                case AnimationCurve.InterpolationMode.Spline: {
                
                    // TODO: 补全样条插值
                    ret = MathUtil.lerp(k1.value, k2.value, keyFramePair.t);

                } break;
                case AnimationCurve.InterpolationMode.Constant: {
                   
                    // 常数的话,直接使用k1的属性           
                    ret = k1.value;

                } break;                  
                default: {
                    // 是否支持自定义插值函数
                    console.error("[AnimationCurve.getInterpolation] 不支持的插值类型: " + interpolationMode);
                } break;
            }

            return ret;
        }

        /**
         * 收集所有关键帧时间
         * @param outKeyFrameTimes 关键帧时间数组
         */
        public _collectKeyFrameTimes(outKeyFrameTimes: number[]) {

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
                    } else if (timePos >= prev && timePos < next) {
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

        public _buildKeyFrameIndexMap(outKeyFrameTimes: number[]) {
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

}