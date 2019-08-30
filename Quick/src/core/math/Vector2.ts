namespace QE {

    export type Number2 = [number, number];

	export class Vector2 {

        constructor(x: number = 0, y: number = 0) {
            this.x = x;
            this.y = y;
        }

        public static ClassName = 'Vector2';

        public x: number;
        public y: number;

        /**
         * ���
         * @param lhs
         * @param rhs
         */
        public static dot(lhs: Vector2, rhs: Vector2) {
            return lhs.x * rhs.x + lhs.y * rhs.y;
        }

    	/**
         * ���
         * @param other
         */
        public add(other: Vector2): Vector2 {

            this.x += other.x;
            this.y += other.y;

            return this;
        }

        /**
         * ���
         * @param other
         */
        public sub(other: Vector2): Vector2 {

            this.x -= other.x;
            this.y -= other.y;

            return this;
        }

        /**
         * Scalar Product �����
         * @param multiplier
         */
        public scalarProduct(multiplier: number): Vector2 {

            this.x *= multiplier;
            this.y *= multiplier;

            return this;
        }

        public vectorProduct(other: Vector2): Vector2 {

            this.x *= other.x;
            this.y *= other.y;

            return this;
        }

        /**
         * ���
         * @param other
         */
        public dot(other: Vector2): number {
            return this.x * other.x + this.y * other.y;
        }

        public divide(val: number): Vector2 {

            console.assert(val > 0);

            this.x /= val;
            this.y /= val;

            return this;
        }

        public divideVector(other: Vector2): Vector2 {

            console.assert(other.x > 0 && other.y > 0);

            this.x /= other.x;
            this.y /= other.y;

            return this;
        }

        /**
         * ������һ��
         */
        public normalize(): Vector2 {

            const len = this.x * this.x + this.y * this.y;

            if (len) {
                const t = 1 / Math.sqrt(len);
                this.x *= t;
                this.y *= t;
            } else {
                this.x = 0;
                this.y = 0;
            }

            return this;
        }

        /**
         * ��ȡ��������
         */
        public getLength(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
         * ��ȡ��������ƽ��
         */
        public getLengthSquare(): number {
            return this.x * this.x + this.y * this.y;
        }

        /**
         * ����������
         * @param v0
         * @param v1
         */
        public distance(v0: Vector2, v1: Vector2) {

            const dx = v0.x - v1.x;
            const dy = v0.y - v1.y;
            const distSquare = dx * dx + dy * dy;

            return Math.sqrt(distSquare);
        }

        /**
         * ����������ƽ��
         * @param v0
         * @param v1
         */
        public distanceSquare(v0: Vector2, v1: Vector2): number {

            const dx = v0.x - v1.x;
            const dy = v0.y - v1.y;

            return dx * dx + dy * dy;
        }

        public lerp(v0: Vector2, v1: Vector2, t: number): Vector2 {

            const x0: number = v0.x, y0: number = v0.y;
            const x1: number = v1.x, y1: number = v1.y;

            this.x = (x1 - x0) * t + x0;
            this.y = (y1 - y0) * t + y0;

            return this;
        }
	}
}
