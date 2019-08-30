///<reference path="../RenderSystem.ts" />
namespace QE {

    export let gl: WebGLRenderingContext;

    export function GL_CHECK_ERROR() {
        if (__QE_DEBUG__) {
            console.assert(gl.getError() === 0);
        }
    }

    /**
     * @deprecated 不会有多种类型渲染器
     */
    export class WebGLRendererSystem extends RenderSystem {

        // protected _canvas: HTMLCanvasElement;
        //
        // public constructor(div?: HTMLElement) {
        //     super();
        //
        //     RenderSystem._sInstance = this;
        //
        //     let canvas = document.createElement("canvas");
        //     canvas.width = 1280;
        //     canvas.height = 720;
        //     canvas.style.position = "absolute";
        //
        //     gl = canvas.getContext("experimental-webgl", {
        //        // alpha: false
        //     }) as WebGLRenderingContext;
        //
        //     if (!gl) {
        //         return;
        //     }
        //
        //     this._canvas = canvas;
        //     div.appendChild(canvas);
        // }
        //
        // public clear(mask: ClearMask, color: Number4, depth: number, stencil: number) {
        //
        //     if (mask === ClearMask.None) {
        //         return;
        //     }
        //
        //     let glMask = 0;
        //     if (mask & ClearMask.COLOR_BUFFER_BIT) {
        //         glMask |= gl.COLOR_BUFFER_BIT;
        //     }
        //     if (mask & ClearMask.DEPTH_BUFFER_BIT) {
        //         glMask |= gl.DEPTH_BUFFER_BIT;
        //     }
        //     if (mask & ClearMask.STENCIL_BUFFER_BIT) {
        //         glMask |= gl.STENCIL_BUFFER_BIT;
        //     }
        //
        //     gl.clear(glMask);
        //     gl.clearColor(color[0], color[1], color[2], color[3]);
        //     gl.clearDepth(depth);
        //     gl.clearStencil(stencil);
        //
        //     GL_CHECK_ERROR();
        // }
        //
        // public setViewport(viewPort: Viewport) {
        //     this._viewport = viewPort;
        //
        //     let rtWidth = Screen.screenWidth;
        //     let rtHeight = Screen.screenHeight;
        //
        //     let currentRenderTarget = this._currentRenderTarget;
        //     if (currentRenderTarget) {
        //         rtWidth = currentRenderTarget.width;
        //         rtHeight = currentRenderTarget.height;
        //     }
        //
        //     // 是否替换为限制vp在窗口大小内
        //     console.assert(
        //         viewPort.x >= 0 && viewPort.x + viewPort.w * rtWidth <= rtWidth &&
        //         viewPort.y >= 0 && viewPort.y + viewPort.h * rtHeight <= rtHeight);
        //
        //     // 窗口坐标系原点为左下角
        //     let x = viewPort.x;
        //     let y = rtHeight - (viewPort.y + viewPort.h);
        //     let w = viewPort.w;
        //     let h = viewPort.h;
        //
        //     gl.viewport(x, y, w, h);
        //
        //     GL_CHECK_ERROR();
        // }
        //
        // public setRenderTarget(renderTarget: RenderTarget) {
        //     this._currentRenderTarget = renderTarget;
        //     gl.bindFramebuffer(gl.FRAMEBUFFER, renderTarget);
        // }
        //
        // public _setTexture(unit: number, enable: boolean, tex: Texture) {
        //     // 纹理未加载完成时,使用默认纹理
        //     if (!tex.getWebGLTexture()) {
        //         tex = ResourceManager.get<Texture>(ResourceManager.BUILTIN_DEF_WHITE_TEX_NAME);
        //     }
        //
        //     if (!tex.getWebGLTexture()) {
        //         return;
        //     }
        //
        //     gl.activeTexture(gl.TEXTURE0 + unit);
        //
        //     if (enable) {
        //         gl.bindTexture(gl.TEXTURE_2D, tex.getWebGLTexture());
        //     } else {
        //         gl.bindTexture(gl.TEXTURE_2D, null);
        //     }
        //
        //     GL_CHECK_ERROR();
        // }
        //
        // private _bindRenderState(): void {
        //
        //     if (!this._renderStatedChanged) {
        //         return;
        //     }
        //
        //     let currentRenderState = this._currentRenderState;
        //     let cullMode = currentRenderState.cullMode;
        //     switch (cullMode) {
        //         case CullMode.FRONT: {
        //             gl.enable(gl.FRONT_FACE);
        //             gl.cullFace(gl.FRONT);
        //         } break;
        //         case CullMode.BACK: {
        //             gl.enable(gl.CULL_FACE);
        //             gl.cullFace(gl.BACK);
        //         } break;
        //         case CullMode.NONE:
        //         default: {
        //             gl.disable(gl.CULL_FACE);
        //         } break;
        //     }
        //
        //     let depthTest = currentRenderState.depthCheck;
        //     switch (depthTest) {
        //         case DepthCheck.CHECK_ONLY: {
        //             gl.enable(gl.DEPTH_TEST);
        //             gl.depthMask(false);
        //             gl.depthFunc(gl.LEQUAL);
        //         } break;
        //         case DepthCheck.CHECK_WRITE: {
        //             gl.enable(gl.DEPTH_TEST);
        //             gl.depthMask(true);
        //             gl.depthFunc(gl.LEQUAL);
        //         } break;
        //         case DepthCheck.NONE:
        //         default: {
        //             gl.disable(gl.DEPTH_TEST);
        //             gl.depthMask(false);
        //         } break;
        //     }
        //
        //     let blendMode = currentRenderState.blendMode;
        //     switch (blendMode) {
        //         case BlendMode.OPACITY:
        //         case BlendMode.ALPHA_TEST: {
        //             gl.disable(gl.BLEND);
        //         } break;
        //         case BlendMode.ALPHA_BLEND: {
        //             gl.enable(gl.BLEND);
        //             gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        //         } break;
        //         case BlendMode.ADD: {
        //             gl.enable(gl.BLEND);
        //             gl.blendFunc(gl.ONE, gl.ONE);
        //         } break;
        //         case BlendMode.MUL: {
        //             gl.enable(gl.BLEND);
        //             gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
        //         } break;
        //     }
        //
        //     let colorMask = currentRenderState.colorMask;
        //     gl.colorMask(
        //         !!(colorMask & ColorMask.RED),
        //         !!(colorMask & ColorMask.GREEN),
        //         !!(colorMask & ColorMask.BLUE),
        //         !!(colorMask & ColorMask.ALPHA));
        //
        //     GL_CHECK_ERROR();
        //
        //     this._renderStatedChanged = false;
        // }
        //
        // public bindGpuProgram(gpuProgram: GLShaderProgram): void {
        //     gl.useProgram(gpuProgram.webglProgram);
        // }
        //
        // private _bindVertexElement(vertexBuffer: WebGLVertexBuffer, shaderPass: WebGLShaderPass): void {
        //     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.getGLBuffer());
        //     gl.enableVertexAttribArray(vertexBuffer.semantic);
        // }
        //
        // public renderOperation(renderOp: RenderOperation) {
        //
        //     console.assert(!!this._currentShaderPass && !!renderOp.vertexBuffers);
        //     // begin render
        //     this.begin();
        //
        //     this._bindRenderState();
        //
        //     let currentShaderPass = this._currentShaderPass;
        //     if (this._shaderPassChanged) {
        //         this.bindGpuProgram(currentShaderPass.getProgram());
        //         this._shaderPassChanged = false;
        //     }
        //
        //     currentShaderPass.uploadUniforms();
        //     currentShaderPass.uploadSamplers();
        //
        //     let primType: number;
        //     switch (renderOp.renderOpType) {
        //         case RenderOperationType.POINT_LIST:
        //             primType = gl.POINTS;
        //             break;
        //         case RenderOperationType.LINE_LIST:
        //             primType = gl.LINES;
        //             break;
        //         case RenderOperationType.LINE_STRIP:
        //             primType = gl.LINE_STRIP;
        //             break;
        //         case RenderOperationType.TRIANGLE_LIST:
        //             primType = gl.TRIANGLES;
        //             break;
        //         case RenderOperationType.TRIANGLE_STRIP:
        //             primType = gl.TRIANGLE_STRIP;
        //             break;
        //         case RenderOperationType.TRIANGLE_FAN:
        //             primType = gl.TRIANGLE_FAN;
        //             break;
        //         default:
        //             primType = gl.TRIANGLES;
        //             break;
        //     }
        //
        //     let renderAttribsBound: number[] = [];
        //     // 绑定顶点属性
        //     let vbBuffers = renderOp.vertexBuffers;
        //     for (let i = 0, len = vbBuffers.length; i < len; i++) {
        //         let vb = vbBuffers[i];
        //
        //         let location = currentShaderPass.getAttribute(vb.semantic);
        //         if (location === undefined) {
        //             continue;
        //         }
        //
        //         gl.bindBuffer(gl.ARRAY_BUFFER, vb.getGLBuffer());
        //         gl.bufferData(gl.ARRAY_BUFFER, vb._data, WebGLBufferManager.getGLUsage(vb._usage));
        //
        //         GL_CHECK_ERROR();
        //
        //         gl.enableVertexAttribArray(location);
        //         gl.vertexAttribPointer(location, vb._size, vb.type, vb._normalized, vb._stride, 0);
        //
        //         GL_CHECK_ERROR();
        //         renderAttribsBound.push(location);
        //     }
        //
        //     let indexBuffer = renderOp.indexBuffer;
        //     if (indexBuffer) {
        //
        //         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.getGLIndexBuffer());
        //         GL_CHECK_ERROR();
        //
        //         gl.drawElements(primType, indexBuffer.count, gl.UNSIGNED_SHORT, 0);
        //     } else {
        //         gl.drawArrays(primType, 0, vbBuffers[0].vertexCount);
        //     }
        //
        //     GL_CHECK_ERROR();
        //
        //     // end render
        //
        //     // 清除属性绑定
        //     let len = renderAttribsBound.length;
        //     if (len > 0) {
        //         for (let i = 0; i < len; i++) {
        //             gl.disableVertexAttribArray(renderAttribsBound[i]);
        //         }
        //     }
        //
        //     this.end();
        // }
        //
        // static getGLDrawCount(type: RenderOperationType, primCount: number)
		// {
        //     switch (type) {
        //         case RenderOperationType.TRIANGLE_LIST:
        //             return primCount * 3;
        //
        //         case RenderOperationType.TRIANGLE_STRIP:
        //             return primCount + 2;
        //
        //         case RenderOperationType.LINE_LIST:
        //             return primCount * 2;
        //
        //         case RenderOperationType.LINE_STRIP:
        //             return primCount + 1;
        //
        //         case RenderOperationType.POINT_LIST:
        //             return primCount;
        //     }
        //
        //     return 0;
        // }
        //
        // public beginScene() {
        //
        // }
        //
        // public endScene() {
        //
        // }
        //
        // public onResize(w: number, h: number): void {
        //     let thisCanvas = this._canvas;
        //     thisCanvas.width = w;
        //     thisCanvas.height = h;
        // }
    }

}
