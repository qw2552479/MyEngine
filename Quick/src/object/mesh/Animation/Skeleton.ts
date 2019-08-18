namespace QE {

    interface BoneMap { [key: string]: Bone; }

    export class Skeleton {
        private _name: string;

        private _rootBones: Bone[];
        private _boneMapByName: BoneMap = {};
        private _boneMapByPath: BoneMap = {};

        constructor(name: string) {
            this._name = name;
        }

        public createBone(name: string, relativePath: string): Bone {

            console.assert(!!this._boneMapByPath[name], '[Skeleton.createBone] A bone with the releativePath ' + relativePath + ' already exists');

            const bone = new Bone(this, name);

            this._boneMapByName[name] = bone;
            this._boneMapByPath[relativePath] = bone;

            return bone;
        }

        public getRootBone(): Bone {

            let rootBones = this._rootBones;

            if (!rootBones) {
                rootBones = this._rootBones = [];
            }

            if (rootBones.length === 0) {

                for (let i = 0; i < rootBones.length; i++) {

                    const bone = rootBones[i];
                    // 没有父节点的骨骼皆为根骨骼
                    if (!bone.node.transform.parent) {
                        rootBones.push(bone);
                    }

                }

            }

            return rootBones[0];
        }

        public getBone(name: string): Bone {
            return this._boneMapByName[name];
        }

        public getBoneByPath(relativePath: string): Bone {
            return this._boneMapByPath[relativePath];
        }

        public hasBone(name: string): boolean {
            return !!this._boneMapByName[name];
        }

        public updateTransforms() {

            const rootBones = this._rootBones;

            for (let i = 0, len = rootBones.length; i < len; i++) {

                const rootBone = rootBones[i];
                rootBone._update(true, false);
            }

        }

    }

}
