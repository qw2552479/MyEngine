namespace QuickEngine {

	export class Rect {

        public static ClassName = "Rect";

    	public left: number;
    	public top: number;
    	public width: number;
    	public height: number;

        public constructor(l: number, t: number, w: number, h: number) {
            this.left = l;
            this.top = t;
            this.width = w;
            this.height = h;
		}
	}
}
