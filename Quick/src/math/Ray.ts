namespace QuickEngine {

    /**
     * 射线, 隐式定义方程
     */
    export class Ray {

        public static ClassName = "Ray";

        public origin: Vector3;
        public direction: Vector3;

        public constructor(origin?: Vector3, direction?: Vector3) {
            this.origin = origin ? new Vector3(origin.x, origin.y, origin.z) : new Vector3();
            this.direction = direction ? new Vector3(direction.x, direction.y, direction.z) : new Vector3();
        }

        public intersectPlane(): boolean {
            return true;
        }

        public intersectTriangle(): boolean {
            return true;
        }

        public intersectSphere(): boolean {
            return true;
        }

        public intersectAABB(): boolean {
            return true;
        }

        public intersectMesh(): boolean {
            return true;
        }
    }

    export class Ray2D {

    }
}