namespace QuickEngine {

    export enum AnimationBlendMode {
        Add,
    }

    /**
     * 动画控制器
     * 动画控制器控制管理一组动画片段
     */
    export class AnimationState {

        private _blendMode: AnimationBlendMode = AnimationBlendMode.Add;
        public get blendMode(): AnimationBlendMode {
            return this._blendMode;
        }

        public set blendMode(val: AnimationBlendMode) {
            this._blendMode = val;
        }

        private _clip: AnimationClip;
        public get clip(): AnimationClip {
            return this._clip;
        }

        public enabled: boolean;
        public layer: number;
        public length: number;
        public name: string;
        public normalizedSpeed: number;
        public normalizedTime: number;
        public speed: number;
        public time: number;
        public weight: number;
        public wrapMode: AnimationCurve.InterpolationMode;

        public AddMixingTransform(mix: Transform, recursive: boolean = true) {

        }
       
        public RemoveMixingTransform(mix: Transform) {

        }
       
    }

}