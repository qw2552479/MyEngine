///<reference path="Component.ts" />
namespace QuickEngine {
   
    /**
     * 变换组件
     */
    export class Transform extends Component {

        public static __ClassName__ = "QuickEngine.Transform";
        public static __ClassID__ = 0;

        protected _children: Transform[] = [];
        protected _parent: Transform = undefined;

        protected _needParentUpdate: boolean = false;
        protected _needChildUpdate: boolean = false;
        protected _needTransformUpdate: boolean = false;
        protected _needWorldToLocalMatrixUpdate = true;
        protected _needEulerUpdate = true;
        protected _parentNotified: boolean = false;     
        protected _childrenToUpdate: Transform[] = [];

        protected _position: Vector3 = new Vector3();
        protected _localPosition: Vector3 = new Vector3();

        protected _rotation: Quaternion = new Quaternion();
        protected _localRotation: Quaternion = new Quaternion();

        protected _eulerAngle: Vector3 = new Vector3();
        protected _localEulerAngle: Vector3 = new Vector3();

        protected _scale: Vector3 = new Vector3(1, 1, 1);
        protected _localScale: Vector3 = new Vector3(1, 1, 1);

        protected _localToWorldMatrix: Matrix4 = new Matrix4();
        protected _worldToLocalMatrix: Matrix4 = new Matrix4();

        constructor() {
            super();
        }

        /**
         * 子节点数量
         */ 
        public get childCount() {
            return this._children.length;
        }

        public set childCount(val: number) {

        }

         /**
         * 返回父节点
         */
        public get parent() {
            return this._parent;
        }

         /**
         * 设置父节点
         * @param {QuickEngine.Transform} parent 父节点, 为空则从当前父节点删除
         */
        public set parent(parent: Transform) {

            this._parentNotified = false;

            let prevParent = this._parent;

            if (prevParent == parent) {
                return;
            }
            
            this._parent = parent;

            // remove from the previous parent
            if (prevParent) {

                let childs = prevParent._children;
                let index = childs.indexOf(this);

                if (index == -1) {
                    console.error("not found the node: " + this.node.name);
                } else {
                    childs.splice(index);
                    prevParent.needUpdate(true);
                }

                // insert into scene children
                SceneManager.instance.currentScene.insertNode(this.node);

            } else {
                // this is a root node, remove from the scene.
                SceneManager.instance.currentScene.removeNode(this.node);                
            }

            if (parent) {
                parent._children.push(this);
            }

            this.needUpdate(true);
        }   

        /*
         * 返回世界坐标
        */
        public get position() {
            if (this._needTransformUpdate) {
                this._updateFromParent();
            }
            return this._position;
        }

        /*
         * 设置世界坐标
        */
        public set position(val: Vector3) {
            this._position = val;
                        
            if (this._parent) {
                let localMat = this.worldToLocalMatrix;
                // 世界坐标转换到本地坐标系
                val = localMat.transformVector3(val);
            }

            this._localPosition.copy(val);

            this.needUpdate(false);
        }

        /*
         * 返回本地坐标
        */
        public get localPosition() {
            return this._localPosition;
        }

        /*
         * 设置本地坐标
        */
        public set localPosition(val: Vector3) {
            this._localPosition.copy(val);
            this.needUpdate(false);
        }

        /*
         * 返回世界旋转四元数
        */
        public get rotation(): Quaternion {
            if (this._needTransformUpdate) {
                this._updateFromParent();
            }
            return this._rotation;
        }

        /*
         * 设置世界旋转四元数
        */
        public set rotation(q: Quaternion) {

            if (this._parent) {
                q = this._parent.rotation.inverse().multiply(q);                
            }
            // 只需要设置localRotation, rotation会延迟自动计算
            this.localRotation = q;  
            this._needEulerUpdate = true;          
            this.needUpdate(false);
        }

        /*
         * 返回本地旋转四元数
        */
        public get localRotation(): Quaternion {
            return this._localRotation;
        }

        /*
         * 设置本地旋转四元数
        */
        public set localRotation(q: Quaternion) {
            this._localRotation.copyFrom(q);    
            this._needEulerUpdate = true;        
            this.needUpdate(false);
        } 

        /*
         * 返回世界欧拉角
        */
        public get eulerAngle(): Vector3 {

            if (this._needTransformUpdate) {
                this._updateFromParent();
            } 

            this.rotation.ToEulerAngle(this._eulerAngle);
            return this._eulerAngle;
        }

        /*
         * 设置本地欧拉角
        */
        public set eulerAngle(e: Vector3) {
            this._eulerAngle.copy(e);
            let tempQuat = new Quaternion();
            this.rotation = tempQuat.FromEulerAngle(e);
            this.needUpdate(false);
        }

        /*
         * 返回本地欧拉角
        */
        public get localEulerAngle(): Vector3 {
            if (this._needTransformUpdate) {
                this._updateFromParent();
            }

            this.localRotation.ToEulerAngle(this._localEulerAngle);
            return this._localEulerAngle;
        }

        /*
         * 设置本地欧拉角
        */
        public set localEulerAngle(e: Vector3) {
            this._localEulerAngle.copy(e);
            this.localRotation = this._localRotation.FromEulerAngle(e);
            this.needUpdate(false);
        }

        /*
         * 返回世界缩放
        */
        public get scale(): Vector3 {
            return this._scale;
        }

        /*
         * 设置世界缩放
        */
        public set scale(s: Vector3) {
            this._scale.copy(s);
            // TODO:
            this.needUpdate(false);
        }

        /*
         * 返回本地缩放
        */
        public get localScale(): Vector3 {
            return this._localScale;
        }

        /*
         * 设置本地缩放
        */
        public set localScale(s: Vector3) {
            this._localScale.copy(s);
            this.needUpdate(false);
        }

        /*
         * 返回世界矩阵
        */
        public get localToWorldMatrix(): Matrix4 {

            if (this._needTransformUpdate) {
                this._updateFromParent();
            }

            return this._localToWorldMatrix;
        }


        /*
         * 设置本地矩阵
        */
        public get worldToLocalMatrix(): Matrix4 {

            let worldMatrix = this._worldToLocalMatrix;

            if (this._needWorldToLocalMatrixUpdate) {

                if (this._needTransformUpdate) {
                    this._updateFromParent();
                }

                let theRotation = this._localRotation;
                let axisX = new Vector3(1, 0, 0);
                let axisY = new Vector3(0, 1, 0);
                let axisZ = new Vector3(0, 0, 1);

                axisX = theRotation.rotateVector3(axisX);
                axisY = theRotation.rotateVector3(axisY);
                axisZ = theRotation.rotateVector3(axisZ);

                worldMatrix.set(
                    axisX.x, axisY.x, axisZ.x, 0,
                    axisX.y, axisY.y, axisZ.y, 0,
                    axisX.z, axisY.z, axisZ.z, 0,
                    0, 0, 0, 1
                );

                this._needWorldToLocalMatrixUpdate = false;
            }
           
            return worldMatrix;
        }

        public removeChildren() {
            let childs = this._children;
            for (let i = 0, len = childs.length; i < len; i++) {
                let c = childs[i];
                c.parent = null;
            }
            this._children = [];
            this.needUpdate();
        }

        public getChildByIndex(index: number) {
            let childs = this._children;

            if (index < 0 || index >= childs.length) {
                throw new Error("out of range");
            }

            return this._children[index];
        }

        private _childNameDict: { [key: string]: Transform } = {};

        public find(name: string): Transform {

            let thisChildNameDict = this._childNameDict;
            let child = thisChildNameDict[name];

            if (child) {
                return child;
            }

            let pathSegment = name.split("/");

            child = this._findByPath(pathSegment, 0);

            if (child) {
                thisChildNameDict[name] = child;
            }

            return child;
        }

        private _findByPath(pathSegment: string[], startIdx: number) {

            let deep = pathSegment.length;
            if (startIdx >= deep) {
                return null;
            }            

            let theNode: Transform;

            let name = pathSegment[startIdx];
            if (this.node.name != name) {
                return null;
            }

            if (startIdx == deep - 1) {
                return this;
            }

            let childs = this._children;
            for (let i = 0, len = childs.length; i < len; i++) {
                let find = childs[i]._findByPath(pathSegment, startIdx + 1);
                if (find) {
                    return find;
                }
            }
        }

        public findChild(name: string): Transform {
            let thisChildNameDict = this._childNameDict;
            let pathSegment = name.split("/").splice(0, 0, this.node.name + "/");
            return this._findByPath(pathSegment, 1);
        }

        public update(updateChildren: boolean, parentHasChanged: boolean) {

            this._parentNotified = false;

            // 父节点改变则更新自身
            if (parentHasChanged) {
                this._updateFromParent();
            }

            // 不更新子节点的话，直接return
            if (!updateChildren) {
                return;
            }

            // 子节点树改变或者父节点改变，都需要更新子节点
            if (this._needChildUpdate || parentHasChanged) {
                let childs = this._children;
                for (let i = 0, len = childs.length; i < len; i++) {
                    childs[i].update(true, true);
                }

                this._needChildUpdate = false;
            } else {
                // 存在待更新的子节点
                let childs = this._childrenToUpdate;
                for (let i = 0, len = childs.length; i < len; i++) {
                    childs[i].update(true, false);
                }
            }

            // 清空待更新的数组
            this._childrenToUpdate.length = 0;
        }

        protected _updateFromParent() {

            this._needTransformUpdate = true;

            let parent = this._parent;
            if (parent) {
                // Update orientation
                let parentRotation = parent.rotation;
                this._rotation = this._localRotation.multiply(parentRotation);
                // Update scale
                let parentScale = parent.scale;
                this._scale = parentScale.multiplyVector3(this._localScale);

                // Change position vector based on parent's orientation & scale
                let tempPos = parentRotation.rotateVector3(parentScale.multiplyVector3(this._localPosition));

                // Add altered position vector to parents
                this._position = tempPos.add(parent.position);
            } else {
                this._position.copy(this._localPosition);
                this._rotation.copyFrom(this._localRotation);
                this._scale.copy(this._localScale);
            }

            Matrix4.makeTransform(this._position, this._rotation, this._scale, this._localToWorldMatrix);

            this._needTransformUpdate = false;
            this._needParentUpdate = false;

            //TODO: post event node updated
        }

        public needUpdate(forceParentUpdate?: boolean) {

            this._needParentUpdate = true;
            this._needChildUpdate = true;
            this._needTransformUpdate = true;
            this._needWorldToLocalMatrixUpdate = true;

            let theParent = this._parent;
            if (theParent && (!this._parentNotified || forceParentUpdate)) {
                theParent.requestUpdate(this, forceParentUpdate);
                this._parentNotified = true;
            }

            this._childrenToUpdate.length = 0;
        }

        public requestUpdate(child: Transform, forceParentUpdate: boolean) {

            if (this._needChildUpdate) {
                return;
            }

            this._childrenToUpdate.push(child);

            let theParent = this._parent;
            if (theParent && (!this._parentNotified || forceParentUpdate)) {
                theParent.requestUpdate(this, forceParentUpdate);
                this._parentNotified = true;
            }
        } 
    }

}