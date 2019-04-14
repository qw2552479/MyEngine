///<reference path="../../core/IDisposable.ts" />
namespace QuickEngine {

    export class GLShaderProgram implements IDestroyable {

        public static GLProgramCount: number = 0;

        public vsCode: WebGLShader;
        public fsCode: WebGLShader;
        public webglProgram: WebGLProgram;

        public constructor(vsCode: string, fsCode: string) {

            this.vsCode = vsCode;
            this.fsCode = fsCode;

            let glVertexShader = GLShaderManager.compileShader(gl.VERTEX_SHADER, vsCode);
            let glFragmentShader = GLShaderManager.compileShader(gl.FRAGMENT_SHADER, fsCode);

            let webglProgram = gl.createProgram();
          
            // 绑定shader
            gl.attachShader(webglProgram, glVertexShader);
            gl.attachShader(webglProgram, glFragmentShader);

            gl.linkProgram(webglProgram);

            let programLog = gl.getProgramInfoLog(webglProgram);
            let vertexLog = gl.getShaderInfoLog(glVertexShader);
            let fragmentLog = gl.getShaderInfoLog(glFragmentShader);

            if (gl.getProgramParameter(webglProgram, gl.LINK_STATUS) === false) {
                console.error('THREE.WebGLProgram: shader error: ', gl.getError(), 'gl.VALIDATE_STATUS', gl.getProgramParameter(webglProgram, gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);
            } else if (programLog !== "") {
                console.error('THREE.WebGLProgram: shader error: ', gl.getError(), 'gl.VALIDATE_STATUS', gl.getProgramParameter(webglProgram, gl.VALIDATE_STATUS), 'gl.getProgramInfoLog', programLog, vertexLog, fragmentLog);
            }

            gl.deleteShader(glVertexShader);
            gl.deleteShader(glFragmentShader);

            this.webglProgram = webglProgram;

            GLShaderProgram.GLProgramCount++;
        }

        public apply() {
            if (this.webglProgram) {
                gl.useProgram(this.webglProgram);
            }
        }

        public isDestroyed(): boolean {
            return true;
		}

		public destroy(): void {
            if (this.webglProgram) {
                gl.deleteProgram(this.webglProgram);
                this.webglProgram = undefined;

                GLShaderProgram.GLProgramCount--;
            }            

            this.vsCode = undefined;
            this.fsCode = undefined;       
        }
    }
}