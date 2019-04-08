namespace QuickEngine {
    /*
    一个shader 包含多个pass, 每个pass可以选择使用shader中得uniforms,attributes,samplers,programs
    shader
    {
        state: {
            cullMode:,
            depthCheck:,
            blendMode:,
        }
        uniforms: {

        }
        attributes: {

        }
        samplers: {
            samplerName:,
        }
        vsCodes: [
            codeName: "",
            codeName2: "",
        ]
        fsCodes: [
            codeName: "",
            codeName2: "",
        ]
        pass
        {
            state,
            uniforms,
            attributes,
            samplers,
            vsCodes[0],
            fsCodes[1]
        },
        pass
        {
            vsCodes[0],
            fsCodes[1]
        }
    }
    */
    /*
    材质数据结构:
        包含基本数据,
        shader,
        shader所需数据
    material name
    {
	    properties
        {
            shader:{fileid:0}
            textures:
            {
                texture_unit
                {
                    texture Panels_Diffuse.png
                }
            },
            floats:{
                
            },
            colors: {

            },
            ints: {

            },
            vec3: {

            }
        }
    }

    */ 

    /**
     * 材质基类
     */
    export class Material extends Resource {      

        public static ClassName = 'Material';

        public name;
        public shader: Shader;
        public lightShader: Shader;

        public texs: Texture[];

        public opacity: number;             // 透明度
        public opacityFacotr: number;

        public emissive: Number3;           // 自发光颜色        
        public emissiveFactor: number;      // 自发光系数

        public ambient: Number3;            // 环境颜色
        public ambientFactor: Number3;      // 环境颜色系数

        public diffuse: Number3;            // 漫反射颜色
        public diffuseFactor: Number3;      // 漫反射颜色系数

        public specular: Number3;           // 反射颜色
        public specularFactor: Number3;     // 反射颜色系数
        public shininess: number;           // 强度

        public bump;                        // 凹凸图
        public normalMap;                   // 法线图
        public bumpFacotr: number;          //

        public reflection: number;          //反射
        public reflectionFactor: number;    //反射强度

        public constructor(name?: string) {
            super(name);
        }

        public copy(object: HashObject) {
            super.copy(object);
        }

        public clone(): HashObject {
            let m = new Material(name);
            m.copy(this);
            return m;
        }

        protected loadImpl() {

        }

        protected unloadImpl() {

        }

        private static _defaultCubeMaterial: Material;
        private static _defMatGLTex: Texture;

        public static getDefaultCubeMaterial() {

            if (!Material._defMatGLTex) {
                Material._defMatGLTex = TextureManager.instance.whiteTex;
            }

            let m = Material._defaultCubeMaterial;
            if (!m) {
                m = new Material();
                Material._defaultCubeMaterial = m;
                let defShader = new QuickEngine.Shader("defaultCubeShader");
                // one pass
                let pass = new QuickEngine.WebGLShaderPass();
                let program = new GLShaderProgram(ShaderChunks.BaseMeshShadervs, ShaderChunks.BaseMeshShaderfs);
                pass.setProgram(program);

                let uniforms = ["mvpMatrix", "u_lightDirection", "u_lightColor"];
                for (let i = 0, len = uniforms.length; i < len; i++) {
                    let uname = uniforms[i];
					let u: GLUniform;
                    if (uname == "mvpMatrix") {
                        u = {
                            name: uname,
                            type: UniformType.WORLD_MATRIX,
                            location: gl.getUniformLocation(program.webglProgram, uname)
                        };
                    } else if (uname == "u_lightDirection") {
                        u = {
                            name: uname,
                            type: UniformType.LIGHT_DIRECTION,
                            location: gl.getUniformLocation(program.webglProgram, uname)
                        };
                    } else {
                        let u: GLUniform = {
                            name: uname,
                            type: UniformType.DIFFUSE,
                            location: gl.getUniformLocation(program.webglProgram, uname)
                        };
                    }
                    pass.addUniform(u);
                }

                pass.setAttribute(VertexElementSemantic.POSITION, gl.getAttribLocation(program.webglProgram, "a_position"));
                pass.setAttribute(VertexElementSemantic.DIFFUSE, gl.getAttribLocation(program.webglProgram, "a_color"));
                pass.setAttribute(VertexElementSemantic.NORMAL, gl.getAttribLocation(program.webglProgram, "a_normal"));
                pass.setAttribute(VertexElementSemantic.TEXTURE_COORDINATES, gl.getAttribLocation(program.webglProgram, "a_texCoord0"));

                let sampelers = ["texture0"];
                for (let i = 0, len = sampelers.length; i < len; i++) {
                    let sname = sampelers[i];
                    let s: TextureSampler = {
                        index: 0,
                        name: sname,
                        samplerTex: Material._defMatGLTex,
                        location: gl.getUniformLocation(program.webglProgram, sname),
                        bindType: SamplerBindType.SAMPLER
                    }
                    pass.addSampler(s);
                }

                let renderState: RenderState = new RenderState();
                pass.setRenderState(renderState);
                defShader.addPass(pass);

                m.shader = defShader;
            }
            return m;
        }
    }

}