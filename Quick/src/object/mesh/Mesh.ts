namespace QE {

    export class MeshFilter extends Component {
        private _mesh: Mesh;

        public get mesh(): Mesh {
            return this._mesh;
        }

        public set mesh(mesh: Mesh) {
            this._mesh = mesh;
        }

    }

    /**
     * 网格
     */
    export class Mesh extends HashObject {
        public sharedVertexData: WebGLVertexBuffer[];

        public id: number;

        protected _name: string;
        public get name(): string {
            return this._name;
        }

        public set name(val: string) {
            this._name = val;
        }

        /**
         * 子网格数组
         */
        public subMeshes: SubMesh[] = [];

        public constructor() {
            super();
        }

        public copy(object: Mesh) {
            super.copy(object);
        }

        public clone(): HashObject {
            const m = new Mesh();
            m.copy(this);
            return m;
        }

        public addSubMesh(subMesh: SubMesh) {
            if (__QE_DEBUG__) {
                console.assert(subMesh != null);
                console.assert(this.subMeshes.indexOf(subMesh) === -1);
            }

            subMesh.parent = this;
            this.subMeshes.push(subMesh);
        }

        public createSubMesh(name: string): SubMesh {
            // TODO: implement here
            return undefined;
        }

        public update() {

        }

        protected loadImpl() {

        }

        protected unloadImpl() {

        }
	}
}
