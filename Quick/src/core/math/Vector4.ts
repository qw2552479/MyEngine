namespace QE {
	export type Number4 = [number, number, number, number];

	export class Vector4 {
		public x = 0;
		public y = 0;
		public z = 0;
		public w = 0;

		constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.w = w;
		}
	}
}
