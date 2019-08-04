///<reference path="../core/HashObject.ts" />
namespace QuickEngine {

    let __id = 0;
    function NewClassID() {
        return __id++;
    }

    export interface IScriptable {
        onLoad?: () => void;
        onUpdate?: (deltaTime: number) => void;
    }

    export class Component extends HashObject implements IScriptable {

        public static __DisallowMultipleComponent__: boolean = false;
        public static __ClassName__ = "QuickEngine.Component";
        public static __ClassID__ = NewClassID();
        
        public tag: string;
   
        private _needCallStart: boolean = true;

        private _node: Node;
        public get node(): Node {
            return this._node;
        }       

        public set node(val: Node) {

        }

        public get transform(): Transform {
            return this.node.transform;
        }

        private _enable: boolean = false;

        public get enabled(): boolean {
            return this._enable;
        }

        public set enabled(val: boolean) {

            if (this._enable == val) {
                return;
            }

            this._enable = val;

            if (val) {
                this.enqueueComponent();
            } else {
                this.dequeueComponent();
            }

        }

        // 脚本函数
        // 启动时调用
        public onLoad: () => void = undefined;
        // 更新时调用
        public onUpdate: (deltaTime: number) => void = undefined;
        // 调试调用
        public onDebugDraw: () => void = undefined;

        constructor() {
            super();
        }

        protected onDestroy() {

            this.enabled = false;
            this._node = null;
        }

        // 组件基本逻辑
        public static load() {

            let unStartedComponentArr = Component.s_unStartedComponentArr;

            for (let i = 0, len = unStartedComponentArr.length; i < len; i++) {

                let comp = unStartedComponentArr[i];

                comp._needCallStart = false;
                Component.s_startedComponentArr.push(comp);

                if (comp.onLoad) {
                    comp.onLoad.call(comp);
                }                                
            }

            Component.s_unStartedComponentArr.length = 0;

        }

        public static update(deltaTime: number) {

            let startedCompArr = Component.s_startedComponentArr;

            for (let i = 0, len = startedCompArr.length; i < len; i++) {

                let comp = startedCompArr[i];

                if (comp.onUpdate) {
                    comp.onUpdate.call(this, deltaTime);
                }
                                                               
            }

        }

        public compareTag(tag: string): boolean {
            return this.tag === tag;
        }

        public getComponent<T extends Component>(compName: string | Function): T {
            return this.node.getComponent<T>(compName);
        }

        public getComponentInChildren<T extends Component>(compName: string | Function, includeInactive: boolean = false): T {
            return this.node.getComponentInChildren<T>(compName, includeInactive);
        }

        public GetComponentInParent<T extends Component>(compName: string | Function): T {
            return this.node.GetComponentInParent<T>(compName);
        }

        public getComponents<T extends Component>(compName: string | Function): T[] {
            return this.node.getComponents<T>(compName);
        }

        public getComponentsInChildren<T extends Component>(compName: string | Function, includeInactive: boolean = false, outCompList?: T[]): T[] {
            return this.node.getComponentsInChildren<T>(compName, includeInactive, outCompList);
        }

        public getComponentsInParent<T extends Component>(compName: string | Function, includeInactive: boolean = false, outCompList?: T[]): T[] {
            return this.node.getComponentsInParent<T>(compName, includeInactive, outCompList);
        }
     
        public notifyAttachNode(val: Node) {
            console.assert(!this._node, '重复挂载节点');
            console.assert(!!val, '挂载节点为空');
            this._node = val;
        }

        // 脚本管理
        private static s_unStartedComponentArr: Component[] = [];
        private static s_startedComponentArr: Component[] = [];

        private enqueueComponent() {

            if (this._needCallStart) {
                Component.s_unStartedComponentArr.push(this);
            } else {
                Component.s_startedComponentArr.push(this);
            }

        }

        private dequeueComponent() {

            if (this._needCallStart) {

                let idx = Component.s_unStartedComponentArr.indexOf(this);

                if (idx != -1) {
                    Component.s_unStartedComponentArr.splice(idx, 1);
                }

            } else {

                let idx = Component.s_startedComponentArr.indexOf(this);

                if (idx != -1) {
                    Component.s_startedComponentArr.splice(idx, 1);
                }

            }

        }
    }

}