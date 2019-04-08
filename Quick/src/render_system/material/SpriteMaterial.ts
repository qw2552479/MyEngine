///<reference path="Material.ts" />
namespace QuickEngine {

    export class SpriteMaterial extends Material {

        private static _shared: SpriteMaterial;
        private static _defGLTex: Texture;
        public static getDefaultSpriteMaterial() {

            if (!SpriteMaterial._defGLTex) {
                SpriteMaterial._defGLTex = TextureManager.instance.whiteTex;
            }

            let m = SpriteMaterial._shared;
            if (!m) {
                m = new SpriteMaterial();
                SpriteMaterial._shared = m;
                let defShader = new QuickEngine.Shader("default");
                // one pass
                let pass = new QuickEngine.WebGLShaderPass();
                let program = new GLShaderProgram(ShaderChunks.defaultSpriteShadervs, ShaderChunks.defaultSpriteShaderfs);
                pass.setProgram(program);

                let uniforms = ["mvpMatrix"];
                for (let i = 0, len = uniforms.length; i < len; i++) {
                    let uname = uniforms[i];
                    let u: GLUniform = {
                        name: uname,
                        data: new Matrix4(),
                        type: UniformType.WORLD_MATRIX,
                        location: gl.getUniformLocation(program.webglProgram, uname)
                    };
                    pass.addUniform(u);
                }

                pass.setAttribute(VertexElementSemantic.POSITION, gl.getAttribLocation(program.webglProgram, "a_position"));
                pass.setAttribute(VertexElementSemantic.DIFFUSE, gl.getAttribLocation(program.webglProgram, "a_color"));
                pass.setAttribute(VertexElementSemantic.TEXTURE_COORDINATES, gl.getAttribLocation(program.webglProgram, "a_texCoord0"));

                let sampelers = ["texture0"];
                for (let i = 0, len = sampelers.length; i < len; i++) {
                    let sname = sampelers[i];
                    let s: TextureSampler = {
                        index: 0,
                        name: sname,
                        samplerTex: SpriteMaterial._defGLTex,
                        location: gl.getUniformLocation(program.webglProgram, sname),
                        bindType: SamplerBindType.SAMPLER
                    }
                    pass.addSampler(s);
                }

                let renderState: RenderState = new RenderState();
                renderState.cullMode = CullMode.NONE;
                pass.setRenderState(renderState);
                defShader.addPass(pass);

                m.shader = defShader;
            }
            return m;
        }
        
        public type = "SpriteMaterial";

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

    }

}