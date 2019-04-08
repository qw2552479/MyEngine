namespace QuickEngine {

    /**
     * 球 (x - cx) * (x - cx) + (y - cy) *  (y - cy) +(z - cz) *  (z - cz) = r * r
     */
    export class Sphere {

        public static ClassName = "Sphere";

        public center: Vector3;
        public radius: number;

        public constructor(x: number = 0, y: number = 0, z: number = 0, radius: number = 0) {
            this.center = new Vector3(x, y, z);
            this.radius = radius;
        }

    }

}