namespace QuickEngine {

    /**
     * ��ɫ
     */
	export class Color {

        public static white: Color = new Color();
        public static black: Color = new Color(0, 0, 0, 255);
        public static red: Color = new Color(255, 0, 0, 255);
        public static green: Color = new Color(0, 255, 0, 255);
        public static blue: Color = new Color(0, 0, 255, 255);

    	public r: number;
    	public g: number;
    	public b: number;
        public a: number;

        public constructor(r: number = 255, g: number = 255, b: number = 255, a: number = 255) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }

        public clone(oriangl: Color): Color {
            return new Color(oriangl.r, oriangl.g, oriangl.b, oriangl.a);
        }

        public static colorToHex(color: Color): number {
            return color.r << 16 | color.g << 8 | color.b;
        }

        public static colorToString(color: Color): string {
            return "#" + Color.colorToHex(color).toString(16);
        }

        public static stringToColor(colorString: string): Color {
            let hex = parseInt(colorString, 16);
            return new Color(hex >> 16 & 0xff, hex >> 8 & 0xff, hex & 0xff);
        }

	}
}
