namespace QuickEngine {

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
        * @language zh_CN
        * 把一个值固定在一个范围之内
        * @param value 当前判定的值
        * @param min_inclusive 最小取值
        * @param max_inclusive 最大取值
        * @returns number 计算后的结果
        */
        export function clampf(value: number, min_inclusive: number, max_inclusive: number): number {
            if(min_inclusive > max_inclusive) {
                let temp: number = min_inclusive;
                min_inclusive = max_inclusive;
                max_inclusive = temp;
            }
            return value < min_inclusive ? min_inclusive : (value < max_inclusive ? value : max_inclusive);
        } 

        export function lerp(a: number, b: number, t: number): number {
            return (b - a) * t + a;
        } 
    }
} 