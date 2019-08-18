namespace QE {
    export namespace GL {

        declare var mat4: any;

        const _matrixStack: Matrix4[] = [];
        let _renderOperationType: RenderOperationType = RenderOperationType.LINE_LIST;
        const _arrayBuffer = new ArrayBuffer(100000);
        const _vertexBuffer = new Int32Array(_arrayBuffer);
        let VBO: WebGLBuffer;

        const _init = false;

        export function init() {
            VBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
            gl.bufferData(gl.ARRAY_BUFFER, _arrayBuffer, gl.STATIC_DRAW);

            gl.viewport(0, 0, 500, 500);

            // Vertex shader program

            const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

            const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

            //
//  初始化着色器程序，让WebGL知道如何绘制我们的数据
            function initShaderProgram(gl, vsSource, fsSource) {
                const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
                const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

                // 创建着色器程序

                const shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, vertexShader);
                gl.attachShader(shaderProgram, fragmentShader);
                gl.linkProgram(shaderProgram);

                // 创建失败， alert
                if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
                    return null;
                }

                return shaderProgram;
            }

//
// 创建指定类型的着色器，上传source源码并编译
//
            function loadShader(gl, type, source) {
                const shader = gl.createShader(type);

                // Send the source to the shader object

                gl.shaderSource(shader, source);

                // Compile the shader program

                gl.compileShader(shader);

                // See if it compiled successfully

                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
                    gl.deleteShader(shader);
                    return null;
                }

                return shader;
            }

            const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

            const programInfo = {
                program: shaderProgram,
                attribLocations: {
                    vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
                },
                uniformLocations: {
                    projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
                    modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
                },
            };

            const horizAspect = 480.0 / 640.0;
            let squareVerticesBuffer;

            function initBuffers() {
                squareVerticesBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

                const vertices = [
                    1.0, 1.0, 0.0,
                    -1.0, 1.0, 0.0,
                    1.0, -1.0, 0.0,
                    -1.0, -1.0, 0.0
                ];

                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            }

            function drawScene(programInfo, buffers) {
                gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
                gl.clearDepth(1.0);                 // Clear everything
                gl.enable(gl.DEPTH_TEST);           // Enable depth testing
                gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

                // Clear the canvas before we start drawing on it.

                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

                // Create a perspective matrix, a special matrix that is
                // used to simulate the distortion of perspective in a camera.
                // Our field of view is 45 degrees, with a width/height
                // ratio that matches the display size of the canvas
                // and we only want to see objects between 0.1 units
                // and 100 units away from the camera.

                const fieldOfView = 45 * Math.PI / 180;   // in radians
                const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
                const zNear = 0.1;
                const zFar = 100.0;
                const projectionMatrix1 = Matrix4.makePerspectiveFovRH(45, aspect, zNear, zFar);
                const modelViewMatrix1 = new Matrix4();
                const transMatrix = Matrix4.makeTransform(new Vector3(0, 0, -6), Quaternion.IDENTITY, new Vector3(1, 1, 1));
                modelViewMatrix1.multiply(transMatrix, modelViewMatrix1);

                const projectionMatrix = mat4.create();

                // note: glmatrix.js always has the first argument
                // as the destination to receive the result.
                mat4.perspective(projectionMatrix,
                    fieldOfView,
                    aspect,
                    zNear,
                    zFar);

                // Set the drawing position to the "identity" point, which is
                // the center of the scene.
                const modelViewMatrix = mat4.create();

                // Now move the drawing position a bit to where we want to
                // start drawing the square.

                mat4.translate(modelViewMatrix,     // destination matrix
                    modelViewMatrix,     // matrix to translate
                    [-0.0, 0.0, -6.0]);  // amount to translate

                {
                    const numComponents = 2;  // pull out 2 values per iteration
                    const type = gl.FLOAT;    // the data in the buffer is 32bit floats
                    const normalize = false;  // don't normalize
                    const stride = 0;         // how many bytes to get from one set of values to the next
                                              // 0 = use type and numComponents above
                    const offset = 0;         // how many bytes inside the buffer to start from
                    gl.bindBuffer(gl.ARRAY_BUFFER, buffers);
                    gl.vertexAttribPointer(
                        programInfo.attribLocations.vertexPosition,
                        numComponents,
                        type,
                        normalize,
                        stride,
                        offset);
                    gl.enableVertexAttribArray(
                        programInfo.attribLocations.vertexPosition);
                }

                // Tell WebGL to use our program when drawing

                gl.useProgram(programInfo.program);

                // Set the shader uniforms

                gl.uniformMatrix4fv(
                    programInfo.uniformLocations.projectionMatrix,
                    false,
                    projectionMatrix1.rawData);
                gl.uniformMatrix4fv(
                    programInfo.uniformLocations.modelViewMatrix,
                    false,
                    modelViewMatrix1.rawData);

                {
                    const offset = 0;
                    const vertexCount = 4;
                    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
                }
            }

            initBuffers();

            function loop() {
                drawScene(programInfo, squareVerticesBuffer);
                window.requestAnimationFrame(loop);
            }

            window.requestAnimationFrame(loop);
        }

        export function pushMatrix(): void {
            _matrixStack.push(new Matrix4());
        }

        export function popMatrix(): void {
            _matrixStack.pop();
        }

        export function multMatrix(matrix: Matrix4) {
            const topMatrix = _matrixStack[_matrixStack.length - 1];
            if (!topMatrix) {
                return;
            }

            topMatrix.multiply(matrix);
        }

        export function loadOrtho() {

        }

        export function loadPrespective() {

        }

        export function begin(rot: RenderOperationType) {
            _renderOperationType = rot;
            if (!_init) {
                init();
            }
        }

        export function end() {

        }

        export function setColor() {

        }

        export function vertex3(x: number, y: number, z: number) {
            GL.begin(RenderOperationType.POINT_LIST);

            _vertexBuffer.set([-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 0.0, 1.0, 0.0], 0);

            gl.useProgram(Material.getDefaultCubeMaterial().shader.shaderPasses[0].getProgram().webglProgram);

            gl.enableVertexAttribArray(0);
            gl.bindBuffer(gl.ARRAY_BUFFER, VBO);

            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            gl.disableVertexAttribArray(0);

            gl.flush();
        }
    }
}
