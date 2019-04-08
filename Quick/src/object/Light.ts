namespace QuickEngine {

    /**
    * 光源类型
    */
    export const enum LightType {
        /**
         * 点光源光
         */
        Point,
        /**
         * 平行光
         */
        Direction,
        /**
         * 聚光灯光
         */
        Spot,
        /**
         * 环境光
         */
        Area
    }

    // 标准光照方程
    // Clit = C_spec + C_diff + C_amb;
    // Clit: 光照颜色值     
    // C_spec: 镜面反射分量
    // C_diff: 漫反射分量   
    // C_amb: 环境分量   
    export class Light extends Component {

        public static __ClassName__ = "QuickEngine.Light";
        public static __ClassID__ = 0;

        /**
         * 光类型
         */
        public lightType: LightType = LightType.Direction;
        
        // spot 
        public position: Vector3;

        // direction
        public direction: Vector3;

        // direction spot ambient
        public diffuse: Color;
        public specular: Color;

        public spotOuter: Radian;
        public spotInner: Radian;

        public spotFalloff: number;
        public spotNearClip: number;
        public range: number;
        public attenuationConst: number;
        public attenuationLinear: number;
        public attenuationQuad: number;
        public powerScale: number;

        public constructor() {
            super();
            
        }

        public updateRenderQueue(renderQueue: RenderQueue): void {
            
        }

    }

}