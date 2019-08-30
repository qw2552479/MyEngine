namespace QE {

    /**
     *
     */
    export class KeyFrame {
        protected _time: number;
        /**
         * 返回关键帧所在时间，以毫秒为单位
         *@return {number}
         */
        public get time(): number {
            return this._time;
        }

        /**
         * 设置关键帧所在时间，以毫秒为单位
         *@param {number} val 时间
         */
        public set time(val: number) {
            this._time = val;
        }

        protected _value: number;
        public get value(): number {
            return this._value;
        }
        public set value(val: number) {
            this._value = val;
        }

        private _inTangent: number;
        public get inTangent(): number {
            return this._inTangent;
        }
        public set inTangent(val: number) {
            this._inTangent = val;
        }

        private _outTangent: number;
        public get outTangent(): number {
            return this._outTangent;
        }
        public set outTangent(val: number) {
            this._outTangent = val;
        }

        protected _interpolationMode: AnimationCurve.InterpolationMode = AnimationCurve.InterpolationMode.Liner;
        public get interpolationMode(): AnimationCurve.InterpolationMode {
            return this._interpolationMode;
        }
        public set interpolationMode(val: AnimationCurve.InterpolationMode) {
            this._interpolationMode = val;
        }

        protected _parentTrack;

        constructor(time: number, value: number, inTangent: number = 0, outTangent: number = 0) {
            this._time = time;
            this._value = value;
            this._inTangent = inTangent;
            this._outTangent = outTangent;
        }
    }
}
