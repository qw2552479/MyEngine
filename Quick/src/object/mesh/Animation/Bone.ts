///<reference path="../../GameObject.ts" />
namespace QE {

    /**
     * 骨骼
     */
    export class Bone {
        private _skeleton: Skeleton;

        private _name: string;
        public get name(): string {
            return this._name;
        }
        public set name(val: string) {
            this._name = val;
        }

        private _handle: number;
        public get handle(): number {
            return this._handle;
        }
        public set handle(val: number) {
            this._handle = val;
        }

        private _node: GameObject;
        public get node(): GameObject {
            return this._node;
        }
        public set node(val: GameObject) {
            this._node = val;
        }

        private _firstChild: Bone;

        constructor(skeleton: Skeleton, name?: string) {
            this._skeleton = skeleton;
            this._name = name;
        }

        public _update(updateChilren: boolean, parentHasChanged: boolean) {

            this._node.transform.update(updateChilren, parentHasChanged);

        }

    }

}
