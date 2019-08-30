namespace QE {

	export type Degree = number;
	export type Radian = number;
	/**
	 * 弧度每角度
	 */
	export const RADIANS_TO_DEGREES: number = 180 / Math.PI;

	/**
	 * 角度每弧度 Math.PI / 180;
	 */
	export const DEGREES_TO_RADIANS: number = Math.PI / 180;

	export module MathUtil {

		/**
		 * @private
		 * 1角度为多少弧度
		 */
		export const RAW_DATA_CONTAINER: Float32Array = new Float32Array(16);

		/**
		 * 把一个值固定在一个范围之内
		 * @param value 当前判定的值
		 * @param min 最小取值
		 * @param max 最大取值
		 * @returns number 计算后的结果
		 */
		export function clampf(value: number, min: number, max: number): number {
			if (min > max) {
				const temp: number = min;
				min = max;
				max = temp;
			}
			return value < min ? min : (value < max ? value : max);
		}

		export function lerp(a: number, b: number, t: number): number {
			return (b - a) * t + a;
		}

		export function lerpColor(fromC: Color, toC: Color, t: number, out: Color): Color {

			if (!out) {
				out = new Color();
			}

			out.r = t * (toC.r - fromC.r) + fromC.r;
			out.g = t * (toC.g - fromC.g) + fromC.g;
			out.b = t * (toC.b - fromC.b) + fromC.b;
			out.a = t * (toC.a - fromC.a) + fromC.a;

			return out;
		}
	}
}
