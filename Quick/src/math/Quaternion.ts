namespace QuickEngine {

	const s_epsilon: number = 1e-03;

	/**
	 * 四元数 [w, x, y, z]
	 * 假设轴角对(n, θ): 绕n指定的旋转轴θ角, 则 q = [cos(θ / 2), sin(θ / 2) * nx, sin(θ / 2) * ny, sin(θ / 2) * nz]
	 */
	export class Quaternion {

		public static ClassName = "Quaternion";

		public static get ZERO(): Quaternion {
			return new Quaternion(1, 0, 0, 0);
		}

		public static get IDENTITY(): Quaternion {
			return new Quaternion(1, 0, 0, 0);
		}

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

		//----------------------------------基本计算-------------------------------------
		/**
		 * 加法
		 * @param q
		 */
		public add(q: Quaternion): Quaternion {
			return new Quaternion(this.w + q.w, this.x + q.x, this.y + q.y, this.z + q.z);
		}

		/**
		 * 减法
		 * @param q
		 */
		public minus(q: Quaternion): Quaternion {
			return new Quaternion(this.w - q.w, this.x - q.x, this.y - q.y, this.z - q.z);
		}

		/**
		 * 点乘
		 * @param q
		 */
		public dot(q: Quaternion): number {
			return this.w * q.w + this.x * q.x + this.y * q.y + this.z * q.z;
		}

		/**
		 * 叉乘
		 * @param q
		 */
		public multiply(q: Quaternion): Quaternion {
			const w1 = this.w, x1 = this.x, y1 = this.y, z1 = this.z;
			const w2 = q.w, x2 = q.x, y2 = q.y, z2 = q.z;

			return new Quaternion(
				w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2,
				w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
				w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2,
				w1 * z2 + x1 * y2 + z1 * w2 - y1 * x2
			);
		}

		/**
		 * 乘以一个标量
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
			// this.clone().multiplyVector(v).toEulerAngle();
			// let qvec = new Vector3(this.x, this.y, this.z);
			// let uv = qvec.cross(v);
			// let uuv = qvec.cross(uv);
			//
			// uv = uv.multiplyScalar(2.0 * this.w);
			// uuv = uuv.multiplyScalar(2.0);
			//
			// return new Vector3(v.x + uv.x + uuv.x, v.y + uv.y + uuv.y, v.z + uv.z + uuv.z);
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
		 * 对数. 公式: log(q) = [0, αN], N 为单位向量
		 */
		public log(): Quaternion {

			let w = this.w, x = this.x, y = this.y, z = this.z;
			let rw = 0.0, rx = 0.0, ry = 0.0, rz = 0.0;
			// w = cos(θ / 2)
			if (Math.abs(w) < 1.0) {
				let angle: Radian = Math.acos(w);
				let sina = Math.sin(angle);
				if (Math.abs(sina) >= s_epsilon) {
					let fCoeff = angle / sina;
					rx = fCoeff * x;
					ry = fCoeff * y;
					rz = fCoeff * z;
				}
			}

			return new Quaternion(rw, rx, ry, rz);
		}

		/**
		 * 指数. 公式: exp(p) = [cos() ]
		 */
		public exp(): Quaternion {

			let w = this.w, x = this.x, y = this.y, z = this.z;
			let rw = 0.0, rx = 0.0, ry = 0.0, rz = 0.0;

			let fAngle = Math.sqrt(x * x + y * y + z * z);
			let fSin = Math.sin(fAngle);

			rw = Math.cos(fAngle);

			if (Math.abs(fSin) >= s_epsilon) {
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
		 * 共轭四元数, 四元数逆q-1 = 它的共轭除以模长
		 */
		public conjugate(): Quaternion {
			return new Quaternion(this.w, -this.x, -this.y, -this.z);
		}

		/**
		 * 四元数的逆
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
		 * 单位四元数求逆, 必须是单位四元数才能调用此方法
		 */
		public unitInverse(): Quaternion {
			return new Quaternion(this.w, -this.x, -this.y, -this.z);
		}

		/**
		 * 模长
		 */
		public get magnitude(): number {
			return this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
		}

		/**
		 * 模长平方
		 */
		public get sqrMagnitude(): number {
			return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
		}

		/**
		 * 正则化
		 */
		public normalize(): Quaternion {

			// 模长
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
		 * 比较两个四元素是否相等
		 * @param other
		 */
		public equal(q: Quaternion): boolean {
			return this.x == q.x && this.y == q.y && this.z == q.z && this.w == q.w;
		}

		//----------------------------------插值操作-------------------------------------
		/**
		 * 线性插值(Linear Interpolation)
		 * @param lhs
		 * @param rhs
		 * @param t
		 */
		public lerp(lhs: Quaternion, rhs: Quaternion, t: number): Quaternion {

			let w0: number = lhs.w, x0: number = lhs.x, y0: number = lhs.y, z0: number = lhs.z;
			let w1: number = rhs.w, x1: number = rhs.x, y1: number = rhs.y, z1: number = rhs.z;

			// 两四元数点乘
			let cosOmega = w0 * w1 + x0 * x1 + y0 * y1 + z0 * z1;
			// 点乘为负, 反转四元数以取得短弧
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
		 * 球面线性插值(Spherical Linear Interpolation)
		 * @param lhs
		 * @param rhs
		 * @param t
		 */
		public slerp(lhs: Quaternion, rhs: Quaternion, t: number): Quaternion {

			let w0, x0, y0, z0;
			let w1, x1, y1, z1;
			// 两四元数点乘
			let cosOmega = w0 * w1 + x0 * x1 + y0 * y1 + z0 * z1;
			// 点乘为负, 反转四元数以取得短弧
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
		 * 四元数样条 squad(qi, qi1, si, si1, t) = slerp(slerp(qi, qi1, t), slerp(si, si1, t), 2 * t * (1 - t))
		 */
		private static _TempQuat0 = new Quaternion();
		private static _TempQuat1 = new Quaternion();

		public squad(q0, q1, s0, s1, t) {

			let slerpT = 2 * t * (1 - t);
			let slerpQ0 = Quaternion._TempQuat0.slerp(q0, q1, t);
			let slerpQ1 = Quaternion._TempQuat1.slerp(s0, s1, t);

			return this.slerp(slerpQ0, slerpQ1, slerpT);
		}

		//------------------------------四元数,矩阵,向量互相转换--------------------------
		/**
		 * 通过旋转矩阵构造四元数
		 * @param rotMat
		 */
		public FromRotationMatrix(rotMat: Matrix4): Quaternion {

			let w = this.w, x = this.x, y = this.y, z = this.z;


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

			rotMat._00 = 1.0 - (_2yy + _2zz);
			rotMat._01 = _2xy + _2zw;/*-----*/
			rotMat._02 = _2xz - _2yw;/*-----*/
			rotMat._03 = 0;
			rotMat._10 = _2xy - _2zw;/*-----*/
			rotMat._11 = 1.0 - (_2xx + _2zz);
			rotMat._12 = _2yz + _2xw;/*-----*/
			rotMat._13 = 0;
			rotMat._20 = _2xz + _2yw;/*-----*/
			rotMat._21 = _2yz - _2xw;/*-----*/
			rotMat._22 = 1.0 - (_2xx + _2yy);
			rotMat._23 = 0;
			rotMat._30 = 0;/*---------------*/
			rotMat._31 = 0;/*---------------*/
			rotMat._32 = 0;/*---------------*/
			rotMat._33 = 1;

			return rotMat;
		}

		/**
		 * 创建一个以axis轴为中心旋转rads弧度的四元数
		 * @param axis
		 * @param rads
		 */
		public fromAngleAxis(axis: Vector3, rads: Radian) {

			let half_rads = rads / 2.0;
			let cosine = Math.cos(half_rads);
			let sine = Math.sin(half_rads);

			this.x = axis.x * sine;
			this.y = axis.y * sine;
			this.z = axis.z * sine;
			this.w = cosine;

			this.normalize();
		}

		/**
		 * 返回四元数绕轴心和角度
		 * @param axis 旋转轴
		 * @returns 弧度
		 */
		public toAngleAxis(axis: Vector3): Radian {
			let rads = Math.acos(this.w) * 2.0;
			const s = Math.sin(rads / 2.0);

			if (s > 0) {
				axis.x = this.x / s;
				axis.y = this.y / s;
				axis.z = this.z / s;
			} else {
				axis.x = 1;
				axis.y = 0;
				axis.z = 0;
			}
			return rads;
		}

		/**
		 * 欧拉角转四元数
		 * @param eulerAngle 欧拉角
		 * @param refQuaternion 欧拉角引用，如果不为空，将会改变传入的四元数，并返回传入的四元数
		 * @return Quaternion 四元数
		 */
		public fromEulerAngle(eulerAngle: Vector3): Quaternion {
			return this.fromEulerAngleScalar(eulerAngle.x, eulerAngle.y, eulerAngle.z);
		}

		public fromEulerAngleScalar(x: number, y: number, z: number): Quaternion {
			let halfX = x * 0.5 * DEGREES_TO_RADIANS;
			let sx = Math.sin(halfX);
			let cx = Math.cos(halfX);

			let halfY = y * 0.5 * DEGREES_TO_RADIANS;
			let sy = Math.sin(halfY);
			let cy = Math.cos(halfY);

			let halfZ = z * 0.5 * DEGREES_TO_RADIANS;
			let sz = Math.sin(halfZ);
			let cz = Math.cos(halfZ);


			this.w = cx * cy * cz + sx * sy * sz;
			this.x = sx * cy * cz - cx * sy * sz;
			this.y = cx * sy * cz + sx * cy * sz;
			this.z = cx * cy * sz - sx * sy * cz;

			return this;
		}

		/**
		 * 四元数转欧拉角
		 */
		public toEulerAngle(refEulerAngle?: Vector3): Vector3 {
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
