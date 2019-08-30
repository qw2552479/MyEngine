namespace QE {

    /**
     * 动画控制器
     * 动画控制器控制管理一组动画片段
     */
    export class AnimatorController extends HashObject {

        private _animationClips: AnimationClip[];
        public get animationClips(): AnimationClip[] {
            return this._animationClips;
        }
        public set animationClips(clips: AnimationClip[]) {
            this._animationClips = clips;
        }

        constructor() {
            super();
            this._animationClips = [];
        }

        public addClip(clip: AnimationClip) {
            this._animationClips.push(clip);
        }

        public removeClip(clip: AnimationClip) {

            const clips = this._animationClips;
            const idx = clips.indexOf(clip);

            if (idx != -1) {
                clips.splice(idx, 1);
            }

        }
    }

}
