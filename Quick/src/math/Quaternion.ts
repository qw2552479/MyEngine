namespace QuickEngine {
	
    const s_epsilon: number = 1e-03;
    /**
     * ��Ԫ�� [w, x, y, z]
     * ������Ƕ�(n, ��): ��nָ������ת��Ƚ�, �� q = [cos(�� / 2), sin(�� / 2) * nx, sin(�� / 2) * ny, sin(�� / 2) * nz]
     */
    export class Quaternion {

        public static ClassName = "Quaternion";

        public static ZERO: Quaternion = new Quaternion(1, 0, 0, 0);
        public static IDENTITY: Quaternion = new Quaternion(1, 0, 0, 0);

        public x: number;
        public y: number;
        public z: number;
        public w: number;

        public constructor(w: number = 1, x: number = 0, y: number = 0, z: number = 0) {
            this.w = w;
            this.x = x;
            this.y = y;
            this.z = z;            
        }

        public copyFrom(q: Quaternion): Quaternion {

            this.w = q.w;
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
           
            return this;
        }

        public clone(): Quaternion {
            return new Quaternion(this.w, this.x, this.y, this.z);
        }

        //----------------------------------��������-------------------------------------
        /**
         * �ӷ�
         * @param q
         */
        public add(q: Quaternion): Quaternion {
            return new Quaternion(this.w + q.w, this.x + q.x, this.y + q.y, this.z + q.z);
        }

        /**
         * ����
         * @param q
         */
        public minus(q: Quaternion): Quaternion {
            return new Quaternion(this.w - q.w, this.x - q.x, this.y - q.y, this.z - q.z);
        }

        /**
         * ���
         * @param q
         */
        public dot(q: Quaternion): number {
            return this.w * q.w + this.x * q.x + this.y * q.y + this.z * q.z;
        }

        /**
         * ���
         * @param q
         */
        public multiply(q: Quaternion): Quaternion {
            let w1 = this.w, x1 = this.x, y1 = this.y, z1 = this.z;
            let w2 = q.w, x2 = q.x, y2 = q.y, z2 = q.z;
            return new Quaternion(
                w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2,
                w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
                w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2,
                w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2               
            );
        }

        /**
         * ����һ������
         * @param s
         */
        public multiplyScalar(s: number): Quaternion {
            return new Quaternion(this.w * s, this.x * s, this.y * s, this.z * s);
        }

        public static multiplyScalar(s: number, q: Quaternion): Quaternion {
            return new Quaternion(q.w * s, q.x * s, q.y * s, q.z * s);
        }

        public multiplyVector(vector: Vector3): Quaternion {

            let w = this.w, x = this.x, y = this.y, z = this.z;
            let x2: number = vector.x;
            let y2: number = vector.y;
            let z2: number = vector.z;

            return new Quaternion(
                -x * x2 - y * y2 - z * z2,
                w * x2 + y * z2 - z * y2,
                w * y2 - x * z2 + z * x2,
                w * z2 + x * y2 - y * x2
            );
        }

        public rotateVector3(v: Vector3): Vector3 {

            //let qvec = new Vector3(this.x, this.y, this.z);
            //let uv = qvec.cross(v);
            //let uuv = qvec.cross(uv);

            //uv = uv.multiplyScalar(2.0 * this.w);
            //uuv = uuv.multiplyScalar(2.0);

            //return new Vector3(v.x + uv.x + uuv.x, v.y + uv.y + uuv.y, v.z + uv.z + uuv.z);
            let out = new Vector3();
            let src = this;
            let vector = v;
            let x1: number, y1: number, z1: number, w1: number;
            let x2: number = vector.x, y2: number = vector.y, z2: number = vector.z;

            w1 = -src.x * x2 - src.y * y2 - src.z * z2;
            x1 = src.w * x2 + src.y * z2 - src.z * y2;
            y1 = src.w * y2 - src.x * z2 + src.z * x2;
            z1 = src.w * z2 + src.x * y2 - src.y * x2;

            out.x = -w1 * src.x + x1 * src.w - y1 * src.z + z1 * src.y;
            out.y = -w1 * src.y + x1 * src.z + y1 * src.w - z1 * src.x;
            out.z = -w1 * src.z - x1 * src.y + y1 * src.x + z1 * src.w;

            return out;

        }

        /**
         * ����. ��ʽ: log(q) = [0, ��N], N Ϊ��λ����
         */
        public log(): Quaternion {

            let w = this.w, x = this.x, y = this.y, z = this.z;
            let rw = 0.0, rx = 0.0, ry = 0.0, rz = 0.0;
            // w = cos(�� / 2)
            if (Math.abs(w) < 1.0)
            {
                let angle: Radian = Math.acos(w);
                let sina = Math.sin(angle);
                if (Math.abs(sina) >= s_epsilon)
                {
                    let fCoeff = angle / sina;
                    rx = fCoeff * x;
                    ry = fCoeff * y;
                    rz = fCoeff * z;
                }
            }

            return new Quaternion(rw, rx, ry, rz);
        }

        /**
         * ָ��. ��ʽ: exp(p) = [cos() ]
         */
        public exp(): Quaternion {

            let w = this.w, x = this.x, y = this.y, z = this.z;
            let rw = 0.0, rx = 0.0, ry = 0.0, rz = 0.0;

            let fAngle = Math.sqrt(x * x + y * y + z * z);
            let fSin = Math.sin(fAngle);

            rw = Math.cos(fAngle);

            if (Math.abs(fSin) >= s_epsilon )
            {
                let fCoeff = fSin / (fAngle);
                rx = fCoeff * x;
                ry = fCoeff * y;
                rz = fCoeff * z;
            } else {
                rx = x;
                ry = y;
                rz = z;
            }
            
            return new Quaternion(rw, rx, ry, rz);
        }

        /**
         * ������Ԫ��, ��Ԫ����q-1 = ���Ĺ������ģ��
         */
        public conjugate(): Quaternion {
            return new Quaternion(this.w, -this.x, -this.y, -this.z);
        }

        /**
         * ��Ԫ������
         */
        public inverse(): Quaternion {

            let w = this.w, x = this.x, y = this.y, z = this.z;
            let mag = w * w + x * x + y * y + z * z;

            if (mag > 0.0) {
                let invMag = 1.0 / mag;
                return new Quaternion(w * invMag, -x * invMag, -y * invMag, -z * invMag);
            } else {
                return new Quaternion(0, 0, 0, 0);
            }
        }

        /**
         * ��λ��Ԫ������, �����ǵ�λ��Ԫ�����ܵ��ô˷���
         */
        public unitInverse(): Quaternion {
            return new Quaternion(this.w, -this.x, -this.y, -this.z);
        }

        /**
         * ģ��
         */
        public get magnitude(): number {
            return this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
        }

        /**
         * ģ��ƽ��
         */
        public get sqrMagnitude(): number {
            return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
        }

        /**
         * ����
         */
        public normalize(): Quaternion {

            // ģ��
            let len = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);

            console.assert(len != 0);

            let invLen = 1.0 / len;
            this.x *= invLen;
            this.y *= invLen;
            this.z *= invLen;
            this.w *= invLen;

            return this;
        }

        /**
         * �Ƚ�������Ԫ���Ƿ����
         * @param other
         */
        public equal(q: Quaternion): boolean {
            return this.x == q.x && this.y == q.y && this.z == q.z && this.w == q.w;
        }

        //----------------------------------��ֵ����-------------------------------------
        /**
         * ���Բ�ֵ(Linear Interpolation)
         * @param lhs
         * @param rhs
         * @param t
         */
        public lerp(lhs: Quaternion, rhs: Quaternion, t: number): Quaternion {

            let w0: number = lhs.w, x0: number = lhs.x, y0: number = lhs.y, z0: number = lhs.z;
            let w1: number = rhs.w, x1: number = rhs.x, y1: number = rhs.y, z1: number = rhs.z;

            // ����Ԫ�����
            let cosOmega = w0 * w1 + x0 * x1 + y0 * y1 + z0 * z1;
             // ���Ϊ��, ��ת��Ԫ����ȡ�ö̻�
            if (cosOmega < 0) {
                w1 = -w1;
                x1 = -x1;
                y1 = -y1;
                z1 = -z1;
            }

            let w = w0 + t * (w1 - w0);
            let x = x0 + t * (x1 - x0);
            let y = y0 + t * (y1 - y0);
            let z = z0 + t * (z1 - z0);
            let invLen = 1.0 / Math.sqrt(w * w + x * x + y * y + z * z);

            this.w = w * invLen;
            this.x = x * invLen;
            this.y = y * invLen;
            this.z = z * invLen;

            return this;
        }

        /**
         * �������Բ�ֵ(Spherical Linear Interpolation)
         * @param lhs
         * @param rhs
         * @param t
         */
        public slerp(lhs: Quaternion, rhs: Quaternion, t: number): Quaternion {

            let w0, x0, y0, z0;
            let w1, x1, y1, z1;
            // ����Ԫ�����
            let cosOmega = w0 * w1 + x0 * x1 + y0 * y1 + z0 * z1;
            // ���Ϊ��, ��ת��Ԫ����ȡ�ö̻�
            if (cosOmega < 0) {
                w1 = -w1;
                x1 = -x1;
                y1 = -y1;
                z1 = -z1;
                cosOmega = -cosOmega;
            }

            let k0 = 0, k1 = 0;
            if (cosOmega > 1 - s_epsilon) {
                k0 = 1 - t;
                k1 = t;
            } else {
                let sinOmega = Math.sqrt(1 - cosOmega * cosOmega);
                let omega = Math.atan2(sinOmega, cosOmega);
                let invSinOmega = 1 / sinOmega;
                k0 = Math.sin((1 - t) * omega) * invSinOmega;
                k1 = Math.sin(t * omega) * invSinOmega;
            }
            
            this.w = w0 * k0 + w1 * k1;
            this.x = x0 * k0 + x1 * k1;
            this.y = y0 * k0 + y1 * k1;
            this.z = z0 * k0 + z1 * k1;

            return this;
        }

        /**
         * ��Ԫ������ squad(qi, qi1, si, si1, t) = slerp(slerp(qi, qi1, t), slerp(si, si1, t), 2 * t * (1 - t))
         */
        private static _TempQuat0 = new Quaternion();
        private static _TempQuat1 = new Quaternion();
        public squad(q0, q1, s0, s1, t) {

            let slerpT = 2 * t * (1 - t);
            let slerpQ0 = Quaternion._TempQuat0.slerp(q0, q1, t);
            let slerpQ1 = Quaternion._TempQuat1.slerp(s0, s1, t);

            return this.slerp(slerpQ0, slerpQ1, slerpT);
        }

        static s_iNext: Number3 = [1, 2, 0];
        //------------------------------��Ԫ��,����,��������ת��--------------------------
        /**
         * ͨ����ת��������Ԫ��
         * @param rotMat
         */
        public FromRotationMatrix(rotMat: Matrix4): Quaternion {

            let w = this.w, x = this.x, y = this.y, z = this.z;
            let out = this;
            let trace = rotMat._00 + rotMat._11 + rotMat._22;
            if (trace > 0) {
                //    // |w| > 1/2, may as well choose w > 1/2
                let root = Math.sqrt(trace + 1.0);  // 2w
                this.w = 0.5* root;
                root = 0.5 / root;  // 1/(4w)
                this.x = (rotMat._21 - rotMat._12) * root;
                this.y = (rotMat._02 - rotMat._20) * root;
                this.z = (rotMat._10 - rotMat._01) * root;
            } else {
                if (rotMat._00 > rotMat._11) {
                    if (rotMat._00 > rotMat._22) {
                        // XDiagDomMatrix
                        let rs = (rotMat._00 - (rotMat._11 + rotMat._22)) + 1;
                        rs = Math.sqrt(rs);

                        out.x = rs * 0.5;
                        rs = 0.5 / rs;
                        out.w = (rotMat._12 - rotMat._21) * rs;
                        out.y = (rotMat._01 + rotMat._10) * rs;
                        out.z = (rotMat._02 + rotMat._20) * rs;
                    } else {
                        // ZDiagDomMatrix
                        let rs = (rotMat._22 - (rotMat._00 + rotMat._11)) + 1;
                        rs = Math.sqrt(rs);

                        out.z = rs * 0.5;
                        rs = 0.5 / rs;
                        out.w = (rotMat._01 - rotMat._10) * rs;
                        out.x = (rotMat._20 + rotMat._02) * rs;
                        out.y = (rotMat._21 + rotMat._12) * rs;
                    }
                } else if (rotMat._11 > rotMat._22) {
                    // YDiagDomMatrix
                    let rs = (rotMat._11 - (rotMat._22 + rotMat._00)) + 1;
                    rs = Math.sqrt(rs);

                    out.y = rs * 0.5;
                    rs = 0.5 / rs;
                    out.w = (rotMat._20 - rotMat._02) * rs;
                    out.z = (rotMat._12 + rotMat._21) * rs;
                    out.x = (rotMat._10 + rotMat._01) * rs;
                } else {
                    // ZDiagDomMatrix
                    let rs = (rotMat._22 - (rotMat._00 + rotMat._11)) + 1;
                    rs = Math.sqrt(rs);

                    out.z = rs * 0.5;
                    rs = 0.5 / rs;
                    out.w = (rotMat._01 - rotMat._10) * rs;
                    out.x = (rotMat._20 + rotMat._02) * rs;
                    out.y = (rotMat._21 + rotMat._12) * rs;
                }
            }

            return this;
        }

        public ToRotationMatrix(rotMat?: Matrix4): Matrix4 {

            if (!rotMat) {
                rotMat = new Matrix4();
            }

            let w = this.w, x = this.x, y = this.y, z = this.z;
            let _2x = x + x, _2y = y + y, _2z = z + z;
            let _2xw = _2x * w, _2yw = _2y * w, _2zw = _2z * w;
            let _2xx = _2x * x, _2xy = _2y * x, _2xz = _2z * x;
            let _2yy = _2y * y, _2yz = _2z * y, _2zz = _2z * z;

            rotMat._00 = 1.0 - (_2yy + _2zz); rotMat._01 = _2xy - _2zw;/*-----*/rotMat._02 = _2xz + _2yw;/*-----*/rotMat._03 = 0;
            rotMat._10 = _2xy + _2zw;/*-----*/rotMat._11 = 1.0 - (_2xx + _2zz); rotMat._12 = _2yz - _2xw;/*-----*/rotMat._13 = 0;
            rotMat._20 = _2xz - _2yw;/*-----*/rotMat._21 = _2yz + _2xw;/*-----*/rotMat._22 = 1.0 - (_2xx + _2yy); rotMat._23 = 0;
            rotMat._30 = 0;/*---------------*/rotMat._31 = 0;/*---------------*/rotMat._32 = 0;/*---------------*/rotMat._33 = 1;

            return rotMat;
        }

        /**
         * ����һ����axis��Ϊ������תrads���ȵ���Ԫ��
         * @param axis
         * @param degrees
         */
        public FromAngleAxis(axis: Vector3, degrees: Degree) {

            let rads = degrees * DEGREES_TO_RADIANS;
            let half_rads = rads / 2.0;
            let cosine = Math.cos(half_rads);
            let sine = Math.sin(half_rads);

            this.x = axis.x * sine;
            this.y = axis.y * sine;
            this.z = axis.z * sine;
            this.w = cosine;
        }

        /**
         * ������Ԫ�������ĺͽǶ�
         * @param axis ��ת��
         * @returns ����
         */
        public ToAngleAxis(axis: Vector3): Radian {

            let rads = Math.acos(this.w);

            let sin_theta_inv = 1.0 / Math.sin(rads);

            axis.x = this.x * sin_theta_inv;
            axis.y = this.y * sin_theta_inv;
            axis.z = this.z * sin_theta_inv;
            // acos(w) ������ǽǶȵ�һ��
            rads *= 2;

            return rads;
        }

        /**
         * ŷ����ת��Ԫ��
         * @param eulerAngle ŷ����
         * @param refQuaternion ŷ�������ã������Ϊ�գ�����ı䴫�����Ԫ���������ش������Ԫ��
         * @return Quaternion ��Ԫ��
         */ 
        public FromEulerAngle(eulerAngle: Vector3, refQuaternion?: Quaternion): Quaternion {
            return this.FromEulerAngleScalar(eulerAngle.x, eulerAngle.y, eulerAngle.z, refQuaternion);
        }

        public FromEulerAngleScalar(x: number, y: number, z: number, refQuaternion?: Quaternion): Quaternion {

            if (!refQuaternion) {
                refQuaternion = new Quaternion();
            }

            let half_x = x * 0.5 * DEGREES_TO_RADIANS;
            let sinx = Math.sin(half_x);
            let cosx = Math.cos(half_x);

            let half_y = y * 0.5 * DEGREES_TO_RADIANS;
            let siny = Math.sin(half_y);
            let cosy = Math.cos(half_y);

            let half_z = z * 0.5 * DEGREES_TO_RADIANS;
            let sinz = Math.sin(half_z);
            let cosz = Math.cos(half_z);

            refQuaternion.w = cosx * cosy * cosz + sinx * siny * sinz;
            refQuaternion.x = sinx * cosy * cosz + cosx * siny * sinz;
            refQuaternion.y = cosx * siny * cosz - sinx * cosy * sinz;
            refQuaternion.z = cosx * cosy * sinz - sinx * siny * cosz;

            return refQuaternion;
        }

        /**
         * ��Ԫ��תŷ����
         */
        public ToEulerAngle(refEulerAngle?: Vector3): Vector3 {

            let w = this.w, x = this.x, y = this.y, z = this.z;
            if (!refEulerAngle) {
                refEulerAngle = new Vector3();
            }

            refEulerAngle.x = Math.atan2(2.0 * (w * x + y * z), 1.0 - 2.0 * (x * x + y * y));

            let temp: number = 2.0 * (w * y - z * x);
            temp = MathUtil.clampf(temp, -1.0, 1.0);
            refEulerAngle.y = Math.asin(temp);
            refEulerAngle.z = Math.atan2(2.0 * (w * z + x * y), 1.0 - 2.0 * (y * y + z * z));

            refEulerAngle.x *= RADIANS_TO_DEGREES;
            refEulerAngle.y *= RADIANS_TO_DEGREES; 
            refEulerAngle.z *= RADIANS_TO_DEGREES;

            return refEulerAngle;
        }       

        public getRightVector(): Vector3 {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            return new Vector3(
                1.0 - 2.0 * (y * y + z * z),
                2.0 * (x * y + w * z),
                2.0 * (x * z - w * y)
            );
        }

        public getUpVector(): Vector3 {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            return new Vector3(
               2.0 * (x * y - w * z),
               1.0 - 2.0 * (x * x + z * z),
               2.0 * (y * z + w * x)
            );
        }

        public getDirVector(): Vector3 {
            let w = this.w, x = this.x, y = this.y, z = this.z;
            return new Vector3(
                2.0 * (w * y + x * z),
                2.0 * (y * z - w * x),
                1.0 - 2.0 * (x * x + y * y)
            );
        }
	}
}
