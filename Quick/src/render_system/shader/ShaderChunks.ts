namespace QuickEngine.ShaderChunks {

    // json
    /*
    {
        attributes: [
            type,
        ],
        unifroms: [
            {
                name:"xxx",
                type:"xxx",
                default:"xxx",
            }
        ],
        vsCode: string,
        fsCode: string,

        pass: [
            
        ]
    }
    */

    export interface ShaderData {

        attributes: string[];
        uniforms: string[];
        vsCode: string;
        fsCode: string | null;

        pass: string[];
    }

    export let defaultSpriteShadervs: string = `
        attribute vec3 a_position;
        attribute vec4 a_color;
        attribute vec2 a_texCoord0;
        uniform mat4 mvpMatrix;
        varying vec4 v_color;
        varying vec2 v_texCoord0;
        void main(void){
            v_color = a_color;
            v_texCoord0 = a_texCoord0;
	        gl_Position = mvpMatrix * vec4(a_position, 1.0);
        }`;

    export let defaultSpriteShaderfs: string = `
        precision mediump float;
        uniform sampler2D texture0; 
        varying vec4 v_color;
        varying vec2 v_texCoord0;
        void main(void) {
            vec4 col = texture2D(texture0, v_texCoord0);
	        gl_FragColor = col * v_color;
        }`;

    export let BaseMeshShadervs: string = `
        attribute vec3 a_position;
        attribute vec4 a_color;
        attribute vec2 a_texCoord0;
        attribute vec3 a_normal;
        uniform vec3 u_lightColor;
        uniform vec3 u_lightDirection;
        uniform mat4 mvpMatrix;
        varying vec2 v_texCoord0;
        varying vec4 v_color;
        void main(void){
            v_texCoord0 = a_texCoord0;
	        // gl_Position = mvpMatrix * vec4(a_position, 1.0);
	        gl_Position = vec4(a_position, 1.0);
            vec3 normal = normalize(vec3(mvpMatrix * vec4(a_normal, 1.0)));
            float nDotL = max(dot(u_lightDirection, normal), 0.0);
            vec3 diffuse = u_lightColor * a_color.rgb * nDotL;
            vec3 ambient = vec3(0.2, 0.2, 0.2) * a_color.rgb;
         //   v_color = vec4(diffuse + ambient, a_color.a);
        //    v_color = vec4(diffuse, a_color.a);
            v_color = a_color;
        }`;

    export let BaseMeshShaderfs: string = `
        precision mediump float;
        uniform sampler2D texture0; 
        varying vec4 v_color;
        varying vec2 v_texCoord0;
        void main(void) {
            vec4 col = texture2D(texture0, v_texCoord0);
	        //gl_FragColor = v_color;
            // gl_FragColor = col * v_color;
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }`;
}
