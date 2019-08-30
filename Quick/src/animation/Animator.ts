///<reference path="../core/object/Component.ts" />
///<reference path="AnimationLoader.ts"/>
namespace QE {

    /**
     * 动画播放器
     * 动画控制器控制动画的状态切换
     */
    export class Animator extends Component {

        private _animController: AnimatorController;
        public get animController(): AnimatorController {
            return this._animController;
        }
        public set animController(animController: AnimatorController) {
            this._animController = animController;
        }

        private _playingClip: AnimationClip;
        private _timePos = 0;

        constructor() {
            super();
        }

        public play(animName: string) {

            if (this._playingClip && this._playingClip.name === animName) {
                return;
            }

            if (!this._animController) {
                return;
            }

            const clips = this._animController.animationClips;
            for (let i = 0, len = clips.length; i < len; i++) {
                const clip = clips[i];
                if (clip.name === animName) {
                    this._playingClip = clip;
                    break;
                }
            }

            this._timePos = 0;
        }

        public stop() {
            this._playingClip = undefined;
            this._timePos = 0;
        }

        /**
         * 更新动画
         *@param {number} deltaTime 间隔时间
         */
        public onUpdate = (deltaTime: number) => {

            if (!this._playingClip) {
                return;
            }

            this._timePos += deltaTime;

            this._playingClip.apply(this.node, this._timePos);

            if (this._timePos >= this._playingClip.length) {
                this.stop();
            }

        }

    }

}
