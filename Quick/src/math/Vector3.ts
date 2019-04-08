namespace QuickEngine {

    export type Number3 = [number, number, number];

    export class Vector3 {

        public static ClassName = "Vector3";

        public static get Right(): Vector3 {
            return new Vector3(1, 0, 0);
        }

        public static get Up(): Vector3 {
            return new Vector3(0, 1, 0)
        }

        public static get Forward(): Vector3 {
            return new Vector3(0, 0, 1);
        }

        public x: number;
        public y: number;
        public z: number;

        constructor(x: number = 0, y: number = 0, z: number = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        /**
         * 
         * @param other
         */
        public copyFrom(other: Vector3): Vector3 {
            this.x = other.x;
            this.y = other.y;
            this.z = other.z;

            return this;
        }

        /**
         * 复制一个自己,返回一个新的vector3
         */
        public clone(): Vector3 {
            return new Vector3(this.x, this.y, this.z);
        }

        /**
         * 是否相同
         * @param other
         */
        public isEqual(other: Vector3): boolean {
            return other.x === other.x && other.y === other.y && other.z === other.z;
        }

        /**
         * 置0
         */
        public setZero(): Vector3 {
            this.x = this.y = this.z = 0;
            return this;
        }

        public set(x: number, y: number, z: number): Vector3 {
            this.x = x;
            this.y = y;
            this.z = z;

            return this;
        }

        /**
         * 相加
         * @param other
         */
        public add(other: Vector3): Vector3 {
            return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
        }
        /**
         * 相减
         * @param other
         */
        public sub(other: Vector3): Vector3 {

            let x = this.x - other.x;
            let y = this.y - other.y;
            let z = this.z - other.z;

            return new Vector3(x, y, z);
        }

        /**
         * Scalar Product 无向积
         * @param multiplier
         */
        public multiplyScalar(multiplier: number): Vector3 {

            let x = this.x * multiplier;
            let y = this.y * multiplier;
            let z = this.z * multiplier;

            return new Vector3(x, y, z);
        }

        /**
         * 向量积
         * @param other
         */
        public multiplyVector3(other: Vector3): Vector3 {

            let x = this.x * other.x;
            let y = this.y * other.y;
            let z = this.z * other.z;

            return new Vector3(x, y, z);
        }

        /**
         * 点积
         * @param other
         */
        public dot(other: Vector3): number {
            return this.x * other.x + this.y * other.y + this.z * other.z;
        }

        /**
         * 点积
         * @param lhs
         * @param rhs
         */
        public static dot(lhs: Vector3, rhs: Vector3) {
            return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
        }

        /**
         * 叉积
         * @param other
         */
        public cross(other: Vector3): Vector3 {

            let x1 = this.x, y1 = this.y, z1 = this.z;
            let x2 = other.x, y2 = other.y, z2 = other.z;

            let x = y1 * z2 - y2 * z1;
            let y = z1 * x2 - z2 * x1;
            let z = x1 * y2 - x2 * y1;

            return new Vector3(x, y, z);
        }

        /**
         * 叉积
         * @param lhs
         * @param rhs
         */
        public static cross(lhs: Vector3, rhs: Vector3): Vector3 {

            let x1 = lhs.x, y1 = lhs.y, z1 = lhs.z;
            let x2 = rhs.x, y2 = rhs.y, z2 = rhs.z;

            let x = y1 * z2 - y2 * z1;
            let y = z1 * x2 - z2 * x1;
            let z = x1 * y2 - x2 * y1;

            return new Vector3(x, y, z);
        }

        public divide(val: number): Vector3 {

            // 不做除0检查
            console.assert(val != 0);

            let t = 1.0 / val;
            let x = this.x * t;
            let y = this.y * t;
            let z = this.z * t;

            return new Vector3(x, y, z);
        }

        public divideVector(other: Vector3): Vector3 {

            console.assert(other.x > 0 && other.y > 0 && other.z > 0);

            let x = this.x / other.x;
            let y = this.y / other.y;
            let z = this.z / other.z;

            return new Vector3(x, y, z);
        }

        /**
         * 向量归一化
         */
        public normalize(): Vector3 {

            let x = this.x, y = this.y, z = this.z;
            let len = x * x + y * y + z * z;

            if (len) {
                let t = 1.0 / Math.sqrt(len);
                this.x = x * t;
                this.y = y * t;
                this.z = z * t;
            }

            return this;
        }

        /**
         * 求模长
         */
        public get magnitude(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }

        /**
         * 求模长平方
         */
        public get sqrMagnitude(): number {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }

        /**
         * 两向量距离
         * @param v0
         * @param v1
         */
        public static distance(v0: Vector3, v1: Vector3) {

            let dx = v0.x - v1.x;
            let dy = v0.y - v1.y;
            let dz = v0.z - v1.z;

            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }

        /**
         * 两向量距离平方
         * @param v0
         * @param v1
         */
        public static distanceSquare(v0: Vector3, v1: Vector3): number {

            let dx = v0.x - v1.x;
            let dy = v0.y - v1.y;
            let dz = v0.z - v1.z;

            return dx * dx + dy * dy + dz * dz;
        }

        public lerp(v0: Vector3, v1: Vector3, t: number): Vector3 {

            let x0: number = v0.x, y0: number = v0.y, z0: number = v0.z;
            let x1: number = v1.x, y1: number = v1.y, z1: number = v1.z;

            this.x = (x1 - x0) * t + x0;
            this.y = (y1 - y0) * t + y0;
            this.z = (z1 - z0) * t + z0;

            return this;
        }
    }
}

