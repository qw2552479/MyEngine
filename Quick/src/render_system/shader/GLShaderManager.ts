///<reference path="../../core/IDisposable.ts" />
namespace QE {

    function loadPass() {

    }

    function compileShader(type: number, code: string): WebGLShader {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, code);
        gl.compileShader(shader);

        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {
            console.error('QE.GLShader: compile shader failed: ' + gl.getShaderInfoLog(shader));
        }

        return shader;
    }

    export class GLShaderManager implements IDestroyable {

        public constructor() {
            this._shaders = [];
        }

        private _shaders: Shader[];

        public static compileShader(type: number, code: string): WebGLShader {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, code);
            gl.compileShader(shader);

            if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {
                console.error('QE.GLShader: compile shader failed: ' + gl.getShaderInfoLog(shader));
            }

            return shader;
        }

        public isDestroyed(): boolean {
            return false;
		}

		public destroy() {
            for (let i = 0, len = this._shaders.length; i < len; i++) {
                // this._shaders[i]
            }
            this._shaders = undefined;
        }

        public find(name: string): Shader {
            const shaders = this._shaders;
            for (let i = 0, len = shaders.length; i < len; i++) {
                const shader = shaders[i];
                if (name === shader.getName()) {
                    return shader;
                }
            }
            return null;
        }

        public load(name: string): Shader {
            const shader = this.find(name);
            if (shader) {
                return shader;
            }


        }

        public remove(name: string) {
            const shaders = this._shaders;
            for (let i = 0, len = shaders.length; i < len; i++) {
                const shader = shaders[i];
                if (name === shader.getName()) {
                    shaders.splice(i, 1);
                    return;
                }
            }
        }
    }
}
