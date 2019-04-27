///<reference path="../../core/IDisposable.ts" />
namespace QuickEngine {

    export const enum UniformType {

        FLOAT4,
        MATRIX4,

        WORLD_MATRIX,
        VIEW_MATRIX,
        PROJ_MATRIX,
        WORLD_VIEW_MATRIX,
        VIEW_PROJ_MATRIX,
        WORLD_VIEW_PROJ_MATRIX,
        BONE_MATRIX,

        TEXTURE_MATRIX,

        CAMERA_POSITION,
        CAMERA_DIRECTION,

        LIGHT_POSITION,
        LIGHT_DIRECTION,
        LIGHT_ATTEN_PARAM,
        LIGHT_SPOT_PARAM,

        EMISSIVE,
        AMBIENT,
        DIFFUSE,
        SPECULAR,
        OPACITY,

        FOG_COLOR,
        FOG_PARAM,

        SHADER_STATE,

        TIME, // x - time, y - sin(t), z - cos(t), w - 1

        CLIP_PLANE, // x: near, y: far, z: 1 / near, w: 1 / far

        USER_CONST,
    }

    export const enum TexFilter {
        DEFAULT,
        POINT,
        LINEAR,
        ANISOTROPIC,
    };

    export const enum TexAddress {
        WRAP,
        MIRROR,
        CLAMP,
        BORDER,
    };

    export const enum SamplerBindType {
        NONE,
        EMISSIVE,
        DIFFUSE,
        SPECULAR,
        NORMAL,
        LIGHTING_MAP,

        EXTERN0,
        EXTERN1,
        EXTERN2,
        EXTERN3,

        SAMPLER,
    };

    export interface GLUniform {
        name: string;
        type: UniformType;
        location: WebGLUniformLocation;
        data?: any;
    };
       
    export interface TextureSampler {
        // 纹理单元名字
        name: string;
        // 采样器纹理单元序号
        index: number;
        // 纹理单元类型
        bindType: SamplerBindType;

        location: WebGLUniformLocation;

        // TODO: 是否应放到纹理中,作为纹理格式属性
        //filter: TexFilter;
        //address: TexAddress;
        //borderColor: Number4;
        samplerTex: Texture;
    };

    export class WebGLShaderPass implements IDestroyable {

        private _program: GLShaderProgram;
        private _renderState: RenderState;
        private _attributes: { [id: number]: number };
        private _uniforms: GLUniform[];
        private _samplers: TextureSampler[];

        public constructor() {
            this._renderState = new RenderState();
            this._attributes = {};
            this._uniforms = [];
            this._samplers = [];
        }

        public isDestroyed(): boolean {
            return false;
		}

		public destroy(): void {
            this._renderState = undefined;
            this._uniforms = undefined;
            this._samplers = undefined;
        }

        /**
         * 设置shader程序
         * @param program
         */
        public setProgram(program: GLShaderProgram) {
            this._program = program;
        }

        public getProgram(): GLShaderProgram {
            return this._program;
        }

        public setUniform(index: number, data: any) {
            this._uniforms[index].data = data;
        }

        public addUniform(uniform: GLUniform) {
            this._uniforms.push(uniform);
        }

        public addSampler(sampler: TextureSampler) {
            this._samplers.push(sampler);
        }

        public setAttribute(attrName: VertexElementSemantic, attrLoc: number) {
            this._attributes[attrName] = attrLoc;
        }

        public getAttribute(attrName: VertexElementSemantic): number {
            return this._attributes[attrName];
        }

        public setRenderState(renderState: RenderState) {
            this._renderState = renderState;
        }

        public getRenderState(): RenderState {
            return this._renderState;
        }

        public getSamplers(): TextureSampler[] {
            return this._samplers;
        }

        public clone(): WebGLShaderPass {
            return new WebGLShaderPass();
        }

        public uploadUniforms() {

            let worldMat = RenderSystem.instance.getWorldMatrix();
            let viewMat = RenderSystem.instance.getViewMatrix();
            let projMat = RenderSystem.instance.getProjectionMatrix();
            let mvpMat = RenderSystem.instance.getWorldViewProjMatrix();

            let uniforms = this._uniforms;
            for (let i = 0, len = uniforms.length; i < len; i++) {

                let uniform = uniforms[i];
                switch (uniform.type) {
                    case UniformType.WORLD_MATRIX: {   
                        gl.uniformMatrix4fv(uniform.location, false, mvpMat.toArrayBuffer());
                    }; break;
                    case UniformType.LIGHT_DIRECTION: {
                        gl.uniform3f(uniform.location, 0.5, 3.0, 4.0);
                    }; break;
                    case UniformType.DIFFUSE: {
                        gl.uniform3f(uniform.location, 1, 1, 1);
                    }; break;
                    default: {
                        //gl.uniform1f(uniform.location, 0);
                    } break;
                }

                if (__DEBUG__) {
                    GL_CHECK_ERROR();
                }
            }

        }

        public uploadSamplers() {

            let samplers = this._samplers;
            let textures = RenderSystem.instance.getCurrentTextures();

            for (let i = 0, len = samplers.length; i < len; i++) {
                let sampler = samplers[i];
                if (!sampler.samplerTex || !sampler.samplerTex.getWebGLTexture()) {
                    continue;
                }
                gl.uniform1i(sampler.location, sampler.index);        
                GL_CHECK_ERROR();       
            }

        }

    }

}