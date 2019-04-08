namespace QuickEngine {

    export class Shader {

        private _name: string;
        public shaderPasses: WebGLShaderPass[];    

        public getName(): string {
            return this._name;
        }

        public constructor(name: string, passes?: WebGLShaderPass[]) {
            this._name = name;
            this.shaderPasses = passes || [];
        }

        public addPass(pass: WebGLShaderPass) {
            this.shaderPasses.push(pass);
        }

    }

}