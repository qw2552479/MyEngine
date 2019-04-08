namespace QuickEngine {

    export type Number4 = [number, number, number, number];

	export class Vector4 {

        public static ClassName = "Vector4";

        public x: number;
        public y: number;
        public z: number;
        public w: number;
    	
        public constructor(x?: number, y?: number, z?: number, w?: number) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
		}
	}
}
