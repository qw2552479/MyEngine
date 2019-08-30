///<reference path="../msic/HashObject.ts" />
namespace QE {

    export type ComponentClassType<T extends Component> = new() => T;

    export class GameObject extends HashObject {
        protected _transform: Transform;
        protected _worldAABB: AABB;

        protected _isActive = false;
        private _componentList: Component[] = [];

        protected _name: string;
        public get name(): string {
            return this._name;
        }

        public set name(val: string) {
            this._name = val;
        }

        public get transform(): Transform {
            return this._transform;
        }

        public constructor(name: string = 'GameObject') {
            super();
            this._name = name;
            this._transform = this.addComponent<Transform>(Transform);
        }

        public updateRenderQueue(renderQueue: RenderQueue) {
            const render = this.getComponent<MeshRender>(MeshRender);
            // TODO render是固定存在的属性,可以使用固定属性保存下来,避免每次取组件列表查询
            if (render && render.enabled && render.getRenderOperation() && render.getMaterial()) {
                renderQueue.addRenderable(render);

                // TODO: 添加一个线框渲染组件
                let debugRender = this.getComponent<DebugRender>(DebugRender);
                if (!debugRender) {
                    debugRender = this.addComponent<DebugRender>(DebugRender);
                }

                debugRender.mesh = render.mesh;
                debugRender.setMaterial(SpriteMaterial.getDefaultSpriteMaterial());
                const oldOp = render.getRenderOperation();

                const wfOp = debugRender.getRenderOperation();
                wfOp.indexBuffer = oldOp.indexBuffer;
                wfOp.numberOfInstances = oldOp.numberOfInstances;
                wfOp.primCount = oldOp.primCount;
                wfOp.renderOpType = RenderOperationType.LINE_STRIP;
                wfOp.vertexBuffers = oldOp.vertexBuffers;

                //   renderQueue.addRenderable(debugRender);

                return;
            }

            const skinMeshRender = this.getComponent<SkinedMeshRender>(SkinedMeshRender);
            if (skinMeshRender && skinMeshRender.enabled && skinMeshRender.getRenderOperation() && skinMeshRender.getMaterial()) {
                renderQueue.addRenderable(skinMeshRender);
                return;
            }

            const spriteRender = this.getComponent<SpriteRender>(SpriteRender);
            if (spriteRender && spriteRender.enabled && spriteRender.getRenderOperation() && spriteRender.getMaterial()) {
                renderQueue.addRenderable(spriteRender);
                return;
            }

        }

        public addComponent<T extends Component>(compCls: ComponentClassType<T>): T {
            const componentList = this._componentList;

            const newComp = new compCls();
            // hack type
            const anyType = newComp as any;

            if (anyType.__QE_DisallowMultipleComponent__) {
                componentList.forEach((comp) => {
                    // TODO sub class and the class self， but not instanceof compCls
                    if (comp instanceof compCls) {
                        throw new Error('不允许重复添加组件: ' + compCls.name);
                    }
                });
            }

            this._componentList.push(newComp);

            // node关联transfrom控件
            if (newComp instanceof Transform) {
                this._transform = newComp;
            }

            newComp.notifyAttachNode(this);

            // 启动脚本
            newComp.enabled = true;

            return newComp;
        }

        public getComponent<T extends Component>(compCls: ComponentClassType<T>): T {
            const componentList = this._componentList;

            for (let i = 0, len = componentList.length; i < len; i++) {
                const comp = componentList[i];
                if (comp instanceof compCls) {
                    return comp;
                }
            }

            return null;
        }

        public getComponentInChildren<T extends Component>(compCls: ComponentClassType<T>, includeInactive: boolean = false): T {

            const childCount = this._transform.childCount;

            if (childCount <= 0) {
                return null;
            }

            for (let i = 0; i < childCount; i++) {

                const child = this._transform.getChildByIndex(i);

                if (!includeInactive && child instanceof Comment && !child.enabled) {
                    continue;
                }

                let comp = child.getComponent<T>(compCls);

                if (comp) {
                    return comp;
                }

                comp = child.getComponentInChildren<T>(compCls);

                if (comp) {
                    return comp;
                }
            }

            return null;
        }

        public GetComponentInParent<T extends Component>(compCls: ComponentClassType<T>): T {
            let parent = this._transform.parent;

            while (parent) {

                const comp = parent.getComponent<T>(compCls);

                if (comp) {
                    return comp;
                }

                parent = parent.parent;
            }

            return null;
        }

        public getComponents<T extends Component>(compCls: ComponentClassType<T>): T[] {
            const ret: T[] = [];
            const componentList = this._componentList;

            for (let i = 0, len = componentList.length; i < len; i++) {
                const comp = componentList[i];
                if (comp instanceof compCls) {
                    ret.push(comp);
                }
            }

            return ret;
        }

        public getComponentsInChildren<T extends Component>(compCls: ComponentClassType<T>, includeInactive: boolean = false, outCompList?: T[]): T[] {
            const childCount = this._transform.childCount;

            if (childCount <= 0) {
                return null;
            }

            for (let i = 0; i < childCount; i++) {

                const child = this._transform.getChildByIndex(i);

                if (!includeInactive && !child.enabled) {
                    continue;
                }

                let comp = child.getComponents<T>(compCls);

                if (comp) {
                    return comp;
                }

                comp = child.getComponentsInChildren<T>(compCls);

                if (comp) {
                    return comp;
                }
            }

            return null;
        }

        public getComponentsInParent<T extends Component>(compCls: ComponentClassType<T>, includeInactive: boolean = false, outCompList?: T[]): T[] {
            let parent = this._transform.parent;

            while (parent) {

                const comp = parent.getComponents<T>(compCls);

                if (comp) {
                    return comp;
                }

                parent = parent.parent;
            }

            return null;
        }
    }

}
