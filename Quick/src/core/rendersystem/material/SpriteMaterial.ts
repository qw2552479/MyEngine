///<reference path="Material.ts" />
namespace QE {

    export class SpriteMaterial extends Material {

        private static _shared: SpriteMaterial;
        private static _defGLTex: Texture;

        public type = 'SpriteMaterial';

        public fog = true;
        public lights = true;

        public opacity = 1;
        public transparent = false;

        public blendSrc = gl.ONE;
        public blendDst = gl.ONE_MINUS_SRC_ALPHA;
        public blendEquation = gl.FUNC_ADD;
        public blendSrcAlpha = null;
        public blendDstAlpha = null;
        public blendEquationAlpha = null;

        public premultipliedAlpha = true;

        public _needsUpdate = true;

        public tex: Texture;
        public static getDefaultSpriteMaterial() {

            if (!SpriteMaterial._defGLTex) {
                SpriteMaterial._defGLTex = BuiltinResFactory.getDefaultTex();
            }

            let m = SpriteMaterial._shared;
            if (!m) {
                m = new SpriteMaterial();
                SpriteMaterial._shared = m;
                const defShader = new QE.Shader('default');
                // one pass
                const pass = new QE.WebGLShaderPass();
                const program = new GLShaderProgram(ShaderChunks.defaultSpriteShadervs, ShaderChunks.defaultSpriteShaderfs);
                pass.setProgram(program);

                const uniforms = ['mvpMatrix'];
                for (let i = 0, len = uniforms.length; i < len; i++) {
                    const uname = uniforms[i];
                    const u: GLUniform = {
                        name: uname,
                        data: new Matrix4(),
                        type: UniformType.WORLD_MATRIX,
                        location: gl.getUniformLocation(program.webglProgram, uname)
                    };
                    pass.addUniform(u);
                }

                pass.setAttribute(VertexElementSemantic.POSITION, gl.getAttribLocation(program.webglProgram, 'a_position'));
                pass.setAttribute(VertexElementSemantic.DIFFUSE, gl.getAttribLocation(program.webglProgram, 'a_color'));
                pass.setAttribute(VertexElementSemantic.TEXTURE_COORDINATES, gl.getAttribLocation(program.webglProgram, 'a_texCoord0'));

                const samplers = ['texture0'];
                for (let i = 0, len = samplers.length; i < len; i++) {
                    const samplerName = samplers[i];
                    const s: TextureSampler = {
                        index: 0,
                        name: samplerName,
                        samplerTex: SpriteMaterial._defGLTex,
                        location: gl.getUniformLocation(program.webglProgram, samplerName),
                        bindType: SamplerBindType.SAMPLER
                    };
                    pass.addSampler(s);
                }

                const renderState: RenderState = new RenderState();
                renderState.cullMode = CullMode.NONE;
                pass.setRenderState(renderState);
                defShader.addPass(pass);

                m.shader = defShader;
            }
            return m;
        }

    }

}
