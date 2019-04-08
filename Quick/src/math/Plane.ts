namespace QuickEngine {
   
    export const enum PlaneSide {
        Front,
        Back,
        INTERSECT,
    };
    /**
     * 平面, 隐式定义方程ax + by + cz = d, 向量(a, b, c)为平面法向量
     */
    export class Plane {

        public static ClassName = "Plane";

        public x: number;
        public y: number;
        public z: number;
        public d: number;

        public constructor(x: number = 0, y: number = 0, z: number = 0, d: number = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.d = d;
        }

        public set(x: number = 0, y: number = 0, z: number = 0, d: number = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.d = d;
        }

        /**
         * 归一化
         */
        public normalize(): number {

            let x = this.x, y = this.y, z = this.z;
            let len = Math.sqrt(x * x + y * y + z * z);

            if (len > 0.0) {
                let invLen = 1.0 / len;
                this.x = x * invLen; 
                this.y = y * invLen;
                this.z = z * invLen;
                this.d *= invLen;
            }

            return len;
        }

        /**
         * 求点到面的距离
         * @param v
         */
        public distance(v: Vector3) {
            return this.x * v.x + this.y * v.y + this.z * v.z + this.d;
        }

        /**
         * 判断点在平面的方向
         * @param v
         */
        public atSide(v: Vector3) {

            let d = this.distance(v);

            if (d > 0) {
                return PlaneSide.Front;
            }
            else if (d < 0) {
                return PlaneSide.Back;
            }
            else {
                return PlaneSide.INTERSECT;
            }
        }

        /**
         * 
         * @param m
         */
        public transfrom(m: Matrix4) {

        }

        /**
         * 3点构造平面, 3点不能共线, 否则有无数个面
         * @param p1
         * @param p2
         * @param p3
         */
        public fromPoints(p1: Vector3, p2: Vector3, p3: Vector3) {

            // 向量1
            let v1x: number = p2.x - p1.x;
            let v1y: number = p2.y - p1.y;
            let v1z: number = p2.z - p1.z;

            // 向量2
            let v2x: number = p3.x - p1.x;
            let v2y: number = p3.y - p1.y;
            let v2z: number = p3.z - p1.z;

            // 向量1和2叉乘求法向量
            this.x = v1y * v2z - v1z * v2y;
            this.y = v1z * v2x - v1x * v2z;
            this.z = v1x * v2y - v1y * v2x;
            //d = dot(p, normal), 取p1(3点任意一点都可以)点与法向量点乘求得d
            this.d = -(this.x * p1.x + this.y * p1.y + this.z * p1.z);
        }

        /**
         * 法向量和平面一点坐标构造平面
         * @param normal
         * @param p
         */
        public fromNormalAndPoint(normal: Vector3, p: Vector3) {
            this.x = normal.x;
            this.y = normal.y;
            this.z = normal.z;
            //d = dot(p, normal)
            this.d = -(this.x * p.x + this.y * p.y + this.z * p.z);
        }

        /**
         * 计算点集最佳平面
         * @param points
         */
        public static computeBestFitNormal(points: Vector3[]) {

            let x = 0, y = 0, z = 0;
            let len = points.length;
            let point = points[len - 1];

            for (let i = 0; i < len; i++) {
                let tempPoint = points[i];

                x += (point.z + tempPoint.z) * (point.y - tempPoint.y);
                y += (point.x + tempPoint.x) * (point.z - tempPoint.z);
                z += (point.y + tempPoint.y) * (point.x - tempPoint.x);

                point = tempPoint;
            }

            return new Vector3(x, y, z);
        }
    }

}