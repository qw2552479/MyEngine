namespace QuickEngine {

    type BoneMap = { [key: string]: Bone };

    export class Skeleton {

        public static __NameSpace__ = "QuickEngine";
        public static __ClassName__ = "Skeleton";
        public static __FullClassName__ = "QuickEngine.Skeleton";
        public static __ClassID__ = 0;

        private _name: string;

        private _rootBones: Bone[];
        private _boneMapByName: BoneMap = {};
        private _boneMapByPath: BoneMap = {};

        constructor(name: string) {
            this._name = name;
        }

        public createBone(name: string, relativePath: string): Bone {

            console.assert(!!this._boneMapByPath[name], "[Skeleton.createBone] A bone with the releativePath " + relativePath + " already exists");

            let bone = new Bone(this, name);

            this._boneMapByName[name] = bone;
            this._boneMapByPath[relativePath] = bone;

            return bone;
        }

        public getRootBone(): Bone {

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

            let rootBones = this._rootBones;

            for (let i = 0, len = rootBones.length; i < len; i++) {

                let rootBone = rootBones[i];
                rootBone._update(true, false);
            }

        }

    }

}