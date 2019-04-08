///<reference path="../core/HashObject.ts" />
namespace QuickEngine {

    export class Node extends HashObject {

        public static __ClassName__ = "QuickEngine.Node";
        public static __ClassID__ = 0;

        protected _transfrom: Transform;
        protected _worldAABB: AABB;

        protected _isActive: boolean = false;


        private _componentList: Component[] = [];
        private _componentDict: { [key: string]: Component | Component[] } = {};

        public constructor(name: string = "GameObject") {
            super();
            this._name = name;                        
        }

        protected _name: string;
        public get name(): string {
            return this._name;
        }

        public set name(val: string) {
            this._name = val;
        }

        public get transform(): Transform {
            return this._transfrom;
        }

        public set transform(val: Transform) {
            // TODO: 需要删除
        }

        public updateRenderQueue(renderQueue: RenderQueue) {

            let render = this.getComponent<MeshRender>(MeshRender);
            if (render && render.enabled && render.getRenderOperation() && render.getMaterial()) {
                renderQueue.addRenderable(render);

                // TODO: 添加一个线框渲染组件
                let debugRender = this.getComponent<DebugRender>(DebugRender);
                if (!debugRender) {
                    debugRender = this.addComponent<DebugRender>(DebugRender);                    
                }  

                debugRender.mesh = render.mesh;
                debugRender.setMaterial(SpriteMaterial.getDefaultSpriteMaterial());
                let oldOp = render.getRenderOperation();

                let wfOp = debugRender.getRenderOperation();
                wfOp.indexBuffer = oldOp.indexBuffer;
                wfOp.numberOfInstances = oldOp.numberOfInstances;
                wfOp.primCount = oldOp.primCount;
                wfOp.renderOpType = RenderOperationType.LINE_STRIP;
                wfOp.vertexBuffers = oldOp.vertexBuffers;

             //   renderQueue.addRenderable(debugRender);

                return;
            }

            let skinMeshRender = this.getComponent<SkinedMeshRender>(SkinedMeshRender);
            if (skinMeshRender && skinMeshRender.enabled && skinMeshRender.getRenderOperation() && skinMeshRender.getMaterial()) {
                renderQueue.addRenderable(skinMeshRender);
                return;
            }

            let spriteRender = this.getComponent<SpriteRender>(SpriteRender);
            if (spriteRender && spriteRender.enabled && spriteRender.getRenderOperation() && spriteRender.getMaterial()) {
                renderQueue.addRenderable(spriteRender);
                return;
            }
           
        }

        public addComponent<T extends Component>(compName: any): T {

            let newComp = new compName() as T;

            let compKey: string;
            if (typeof compName === 'string') {
                compKey = (<any>compName) as string;
            } else {
                compKey = (<any>compName).__ClassName__;
            }

            let oldComp = this._componentDict[compKey];

            if (!oldComp) {
                this._componentDict[compKey] = [newComp];
            } else if (!(<any>compName).__DisallowMultipleComponent__) {
                throw new Error("组件不允许重复添加: " + (<any>compName).__ClassName__);
            } else if (Array.isArray(oldComp)) {
                oldComp.push(newComp);
            } else {
                this._componentDict[compKey] = [oldComp, newComp];
            }            

            this._componentList.push(newComp);            

            // node关联transfrom控件
            if (newComp instanceof Transform) {
                this._transfrom = <any>newComp;
            }

            newComp.notifyAttachNode(this);

            // 启动脚本
            newComp.enabled = true;

            return newComp;
        }

        public getComponent<T extends Component>(compName: string | Function): T {

            let compKey: string;
            if (typeof compName === 'string') {
                compKey = (<any>compName) as string;
            } else {                
                compKey = (<any>compName).__ClassName__;
            }          

            let comp = this._componentDict[compKey];

            if (!comp) {
                return null;
            }

            if (Array.isArray(comp)) {
                return comp[0] as T;
            } else {
                return comp as T;
            }
        }

        public getComponentInChildren<T extends Component>(compName: string | Function, includeInactive: boolean = false): T {

            let childCount = this._transfrom.childCount;

            if (childCount <= 0) {
                return null;
            }

            for (let i = 0; i < childCount; i++) {

                let child = this._transfrom.getChildByIndex(i);

                if (!includeInactive && child instanceof Comment && !child.enabled) {
                    continue;
                }

                let comp = child.getComponent<T>(compName);

                if (comp) {
                    return comp;
                }

                comp = child.getComponentInChildren<T>(compName);

                if (comp) {
                    return comp;
                }
            }

            return null;
        }

        public GetComponentInParent<T extends Component>(compName: string | Function): T {

            let parent = this._transfrom.parent;

            while (parent) {

                let comp = parent.getComponent<T>(compName);

                if (comp) {
                    return comp;
                }

                parent = parent.parent;
            }

            return null;
        }

        public getComponents<T extends Component>(compName: string | Function): T[] {

            let compKey: string;

            if (typeof compName !== 'string') {
                compKey = (<any>compName) as string;
            } else {
                compKey = (<any>compName).__ClassName__;
            }      

            let comp = this._componentDict[compKey];

            if (!comp) {
                return [];
            }

            if (Array.isArray(comp)) {
                return comp as T[];
            } else {
                return [comp] as T[];
            }
        }

        public getComponentsInChildren<T extends Component>(compName: string | Function, includeInactive: boolean = false, outCompList?: T[]): T[] {

            let childCount = this._transfrom.childCount;

            if (childCount <= 0) {
                return null;
            }

            for (let i = 0; i < childCount; i++) {

                let child = this._transfrom.getChildByIndex(i);

                if (!includeInactive && child instanceof Comment && !child.enabled) {
                    continue;
                }

                let comp = child.getComponents<T>(compName);

                if (comp) {
                    return comp;
                }

                comp = child.getComponentsInChildren<T>(compName);

                if (comp) {
                    return comp;
                }
            }

            return null;
        }

        public getComponentsInParent<T extends Component>(compName: string | Function, includeInactive: boolean = false, outCompList?: T[]): T[] {

            let parent = this._transfrom.parent;

            while (parent) {

                let comp = parent.getComponents<T>(compName);

                if (comp) {
                    return comp;
                }

                parent = parent.parent;
            }

            return null;
        }
    }

}