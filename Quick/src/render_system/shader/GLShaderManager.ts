///<reference path="../../core/IDisposable.ts" />
namespace QuickEngine {

    function loadPass() {

    }

    function compileShader(type: number, code: string): WebGLShader {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, code);
        gl.compileShader(shader);

        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {
            console.error('QuickEngine.GLShader: compile shader failed: ' + gl.getShaderInfoLog(shader));
        }

        return shader;
    }

    export class GLShaderManager implements IDestroyable {

        public static compileShader(type: number, code: string): WebGLShader {
            let shader = gl.createShader(type);
            gl.shaderSource(shader, code);
            gl.compileShader(shader);

            if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {
                console.error('QuickEngine.GLShader: compile shader failed: ' + gl.getShaderInfoLog(shader));
            }

            return shader;
        }

        private _shaders: Shader[];

        public constructor() {
            this._shaders = [];
        }

        public isDestroyed(): boolean {
            return false;
		}

		public destroy() {
            for (let i = 0, len = this._shaders.length; i < len; i++) {
                //this._shaders[i]
            }
            this._shaders = undefined;
        }
               
        public find(name: string): Shader {
            let shaders = this._shaders;
            for (let i = 0, len = shaders.length; i < len; i++) {
                let shader = shaders[i];
                if (name == shader.getName()) {
                    return shader;
                }
            }
            return null;
        }

        public load(name: string): Shader {
            let shader = this.find(name);
            if (shader) {
                return shader;
            }

            
        }

        public remove(name: string) {
            let shaders = this._shaders;
            for (let i = 0, len = shaders.length; i < len; i++) {
                let shader = shaders[i];
                if (name == shader.getName()) {
                    shaders.splice(i, 1);
                    return;
                }
            }
        }
    }
}
