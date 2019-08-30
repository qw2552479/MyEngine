namespace QE {

    // 复用的单位矩阵
    const identifyMatrixArray = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];

    /**
     * 矩阵存储和openGL规则一致,列主序
     * 学习资料:
     * http://www.euclideanspace.com/maths/algebra/matrix/
     * https://www.geometrictools.com/GTEngine/Include/Mathematics/GteMatrix4x4.h
     * 线性代数课本
     * 矩阵是列向量矩阵
     | 0 2 |     | 0 3 6 |       | 0 4 8  12 |      | 00 01 02 03 |
     | 1 3 |     | 1 4 7 |       | 1 5 9  13 |      | 10 11 12 13 |
     | 2 5 8 |       | 2 6 10 14 |      | 20 21 22 23 |
     | 3 7 11 15 |      | 30 31 32 33 |
     */
    export class Matrix4 {

        public get _00(): number {
            return this._rawData[0];
        }

        public set _00(val: number) {
            this._rawData[0] = val;
        }

        public get _01(): number {
            return this._rawData[4];
        }

        public set _01(val: number) {
            this._rawData[4] = val;
        }

        public get _02(): number {
            return this._rawData[8];
        }

        public set _02(val: number) {
            this._rawData[8] = val;
        }

        public get _03(): number {
            return this._rawData[12];
        }

        public set _03(val: number) {
            this._rawData[12] = val;
        }

        public get _10(): number {
            return this._rawData[1];
        }

        public set _10(val: number) {
            this._rawData[1] = val;
        }

        public get _11(): number {
            return this._rawData[5];
        }

        public set _11(val: number) {
            this._rawData[5] = val;
        }

        public get _12(): number {
            return this._rawData[9];
        }

        public set _12(val: number) {
            this._rawData[9] = val;
        }

        public get _13(): number {
            return this._rawData[13];
        }

        public set _13(val: number) {
            this._rawData[13] = val;
        }

        public get _20(): number {
            return this._rawData[2];
        }

        public set _20(val: number) {
            this._rawData[2] = val;
        }

        public get _21(): number {
            return this._rawData[6];
        }

        public set _21(val: number) {
            this._rawData[6] = val;
        }

        public get _22(): number {
            return this._rawData[10];
        }

        public set _22(val: number) {
            this._rawData[10] = val;
        }

        public get _23(): number {
            return this._rawData[14];
        }

        public set _23(val: number) {
            this._rawData[14] = val;
        }

        public get _30(): number {
            return this._rawData[3];
        }

        public set _30(val: number) {
            this._rawData[3] = val;
        }

        public get _31(): number {
            return this._rawData[7];
        }

        public set _31(val: number) {
            this._rawData[7] = val;
        }

        public get _32(): number {
            return this._rawData[11];
        }


        public set _32(val: number) {
            this._rawData[11] = val;
        }

        public get _33(): number {
            return this._rawData[15];
        }

        public set _33(val: number) {
            this._rawData[15] = val;
        }

        public get rawData(): Float32Array {
            return this._rawData;
        }

        constructor() {
            this._rawData = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }

        public static ClassName = 'Matrix4';

        private _rawData: Float32Array;

        public static create(
            _00: number, _01: number, _02: number, _03: number,
            _10: number, _11: number, _12: number, _13: number,
            _20: number, _21: number, _22: number, _23: number,
            _30: number, _31: number, _32: number, _33: number) {

            const matrix = new Matrix4();

            matrix._00 = _00, matrix._01 = _01, matrix._02 = _02, matrix._03 = _03;
            matrix._10 = _10, matrix._11 = _11, matrix._12 = _12, matrix._13 = _13;
            matrix._20 = _20, matrix._21 = _21, matrix._22 = _22, matrix._23 = _23;
            matrix._30 = _30, matrix._31 = _31, matrix._32 = _32, matrix._33 = _33;

            return matrix;
        }

        /**
         *
         a00 a01 a02 a03    x
         a10 a11 a12 a13 *  y
         a20 a21 a22 a23    z
         a30 a31 a32 a33    w=0
         * @param position
         * @param rotation
         * @param scale
         * @param out
         */
        public static makeTransform(position: Vector3, rotation: Quaternion, scale: Vector3, out?: Matrix4): Matrix4 {
            if (!out) {
                out = new Matrix4();
            }
            // Ordering:
            //    1. Scale
            //    2. Rotate
            //    3. Translate
            // 右乘
            // M = Mt * Mr * Ms

            // Quaternion math
            const x = rotation.x, y = rotation.y, z = rotation.z, w = rotation.w;
            const x2 = x + x;
            const y2 = y + y;
            const z2 = z + z;

            const xx = x * x2;
            const xy = x * y2;
            const xz = x * z2;
            const yy = y * y2;
            const yz = y * z2;
            const zz = z * z2;
            const wx = w * x2;
            const wy = w * y2;
            const wz = w * z2;

            const sx = scale.x;
            const sy = scale.y;
            const sz = scale.z;

            const out0 = (1 - (yy + zz)) * sx;
            const out1 = (xy + wz) * sx;
            const out2 = (xz - wy) * sx;
            const out4 = (xy - wz) * sy;
            const out5 = (1 - (xx + zz)) * sy;
            const out6 = (yz + wx) * sy;
            const out8 = (xz + wy) * sz;
            const out9 = (yz - wx) * sz;
            const out10 = (1 - (xx + yy)) * sz;

            const rawData = out._rawData;

            rawData[0] = out0;
            rawData[1] = out1;
            rawData[2] = out2;
            rawData[3] = 0;
            rawData[4] = out4;
            rawData[5] = out5;
            rawData[6] = out6;
            rawData[7] = 0;
            rawData[8] = out8;
            rawData[9] = out9;
            rawData[10] = out10;
            rawData[11] = 0;
            rawData[12] = position.x;
            rawData[13] = position.y;
            rawData[14] = position.z;
            rawData[15] = 1;

            return out;
        }

        /**
         * 生成正交视图矩阵
         * @param left
         * @param right
         * @param bottom
         * @param top
         * @param near
         * @param far
         * @param target
         */
        public static makeOrthoRH(left: number, right: number, bottom: number, top: number, near: number, far: number, target?: Matrix4): Matrix4 {
            if (!target) {
                target = new Matrix4();
            }

            const inv_d = 1 / (far - near);

            const w = right - left;
            const h = top - bottom;
            const d = far - near;

            const x = (right + left) / w;
            const y = (top + bottom) / h;
            const z = (far + near) / d;

            const rawData = target._rawData;

            rawData[0] = 2 / w;
            rawData[1] = 0;
            rawData[2] = 0;
            rawData[3] = 0;

            rawData[4] = 0;
            rawData[5] = 2 / h;
            rawData[6] = 0;
            rawData[7] = 0;

            rawData[8] = 0;
            rawData[9] = 0;
            rawData[10] = -2 / d;
            rawData[11] = 0;

            rawData[12] = -x;
            rawData[13] = -y;
            rawData[14] = -z;
            rawData[15] = 1;

            return target;
        }

        /**
         * 构造右手投影矩阵
         * @param left
         * @param right
         * @param top
         * @param bottom
         * @param near
         * @param far
         * @param target
         */
        public static makePerspectiveRH(left: number, right: number, top: number, bottom: number, near: number, far: number, target?: Matrix4): Matrix4 {
            if (!target) {
                target = new Matrix4();
            }

            const inv_w = 1 / (right - left);
            const inv_h = 1 / (top - bottom);

            const inv_d = 1 / (far - near);

            const A = 2 * near * inv_w;
            const B = 2 * near * inv_h;
            const C = (right + left) * inv_w;
            const D = (top + bottom) * inv_h;
            let q, qn;

            if (far === 0) {
                // Infinite far plane
                q = Number.EPSILON - 1;
                qn = near * (Number.EPSILON - 2);
            } else {
                q = -(far + near) * inv_d;
                qn = -2 * (far * near) * inv_d;
            }

            const rawData = target._rawData;

            rawData[0] = A;
            rawData[1] = 0;
            rawData[2] = 0;
            rawData[3] = 0;

            rawData[4] = 0;
            rawData[5] = B;
            rawData[6] = 0;
            rawData[7] = 0;

            rawData[8] = C;
            rawData[11] = -1;
            rawData[9] = D;
            rawData[10] = q;

            rawData[12] = 0;
            rawData[13] = 0;
            rawData[14] = qn;
            rawData[15] = 0;

            return target;
        }

        /**
         * 根据fov构造右手透视投影矩阵
         * @param fov
         * @param aspect
         * @param near
         * @param far
         * @param target
         */
        public static makePerspectiveFovRH(fov: number, aspect: number, near: number, far: number, target?: Matrix4): Matrix4 {

            const ymax = near * Math.tan(fov * Math.PI / 360);
            const ymin = -ymax;
            const xmin = ymin * aspect;
            const xmax = ymax * aspect;

            return Matrix4.makePerspectiveRH(xmin, xmax, ymax, ymin, near, far, target);
        }

        public setArray(array: ArrayLike<number>): Matrix4 {
            this._rawData.set(array, 0);
            return this;
        }

        public set(_00: number, _01: number, _02: number, _03: number,
                   _10: number, _11: number, _12: number, _13: number,
                   _20: number, _21: number, _22: number, _23: number,
                   _30: number, _31: number, _32: number, _33: number): Matrix4 {

            this._rawData[0] = _00, this._rawData[4] = _01, this._rawData[8] = _02, this._rawData[12] = _03;
            this._rawData[1] = _10, this._rawData[5] = _11, this._rawData[9] = _12, this._rawData[13] = _13;
            this._rawData[2] = _20, this._rawData[6] = _21, this._rawData[10] = _22, this._rawData[14] = _23;
            this._rawData[3] = _30, this._rawData[7] = _31, this._rawData[11] = _32, this._rawData[15] = _33;

            return this;
        }

        public copyFrom(other: Matrix4): Matrix4 {
            return this.setArray(other.rawData);
        }

        public clone(): Matrix4 {
            return new Matrix4().copyFrom(this);
        }

        /**
         * 矩阵相乘
         a00 a01 a02 a03     b00 b01 b02 b03     a00*b00+a01*b10+a02*b20+a03*b30 a00*b01+a01*b11+a02*b21+a03*b31 a00*b02+a01*b12+a02*b22+a03*b32 a00*b03+a01*b13+a02*b23+a03*b33
         a10 a11 a12 a13  *  b10 b11 b12 b13  =  a10*b00+a11*b10+a12*b20+a13*b30 a10*b01+a11*b11+a12*b21+a13*b31 a10*b02+a11*b12+a12*b22+a13*b32 a10*b03+a11*b13+a12*b23+a13*b33
         a20 a21 a22 a23     b20 b21 b22 b23     a20*b00+a21*b10+a22*b20+a23*b30 a20*b01+a21*b11+a22*b21+a23*b31 a20*b02+a21*b12+a22*b22+a23*b32 a20*b03+a21*b13+a22*b23+a23*b33
         a30 a31 a32 a33     b30 b31 b32 b33     a30*b00+a31*b10+a32*b20+a33*b30 a30*b01+a31*b11+a32*b21+a33*b31 a30*b02+a31*b12+a32*b22+a33*b32 a30*b03+a31*b13+a32*b23+a33*b33
         */
        public multiply(v: Matrix4, outMat?: Matrix4): Matrix4 {
            if (!outMat) {
                outMat = new Matrix4();
            }

            const out = outMat._rawData;
            const a = this._rawData;
            const b = v._rawData;

            const m111 = a[0], m121 = a[4], m131 = a[8], m141 = a[12];
            const m112 = a[1], m122 = a[5], m132 = a[9], m142 = a[13];
            const m113 = a[2], m123 = a[6], m133 = a[10], m143 = a[14];
            const m114 = a[3], m124 = a[7], m134 = a[11], m144 = a[15];

            const m211 = b[0], m221 = b[4], m231 = b[8], m241 = b[12];
            const m212 = b[1], m222 = b[5], m232 = b[9], m242 = b[13];
            const m213 = b[2], m223 = b[6], m233 = b[10], m243 = b[14];
            const m214 = b[3], m224 = b[7], m234 = b[11], m244 = b[15];

            out[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
            out[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
            out[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
            out[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;

            out[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
            out[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
            out[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
            out[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;

            out[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
            out[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
            out[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
            out[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;

            out[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
            out[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
            out[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
            out[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;

            return outMat;
        }

        /**
         * 矩阵向量相乘, 列向量应该右乘矩阵
         * @param vec
         a00 a01 a02 a03    x
         a10 a11 a12 a13 *  y
         a20 a21 a22 a23    z
         a30 a31 a32 a33    w=0
         */
        public transformVector3(v: Vector3, out?: Vector3): Vector3 {
            const x = v.x;
            const y = v.y;
            const z = v.z;
            const m = this._rawData;

            const x1 = m[0] * x + m[4] * y + m[8] * z + m[12];
            const y1 = m[1] * x + m[5] * y + m[9] * z + m[13];
            const z1 = m[2] * x + m[6] * y + m[10] * z + m[14];

            if (!out) {
                out = new Vector3(x1, y1, z1);
            } else {
                out.set(x1, y1, z1);
            }

            return out;
        }

        /**
         * 单位矩阵
         */
        public identity(): Matrix4 {
            const out = this._rawData;

            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;

            return this;
        }

        /**
         * 矩阵求逆
         * TODO
         */
        public inverse(outMat?: Matrix4): Matrix4 {

            if (!outMat) {
                outMat = new Matrix4();
            }

            const a = this._rawData;
            const out = outMat._rawData;

            const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

            const b00 = a00 * a11 - a01 * a10;
            const b01 = a00 * a12 - a02 * a10;
            const b02 = a00 * a13 - a03 * a10;
            const b03 = a01 * a12 - a02 * a11;
            const b04 = a01 * a13 - a03 * a11;
            const b05 = a02 * a13 - a03 * a12;
            const b06 = a20 * a31 - a21 * a30;
            const b07 = a20 * a32 - a22 * a30;
            const b08 = a20 * a33 - a23 * a30;
            const b09 = a21 * a32 - a22 * a31;
            const b10 = a21 * a33 - a23 * a31;
            const b11 = a22 * a33 - a23 * a32;

            // Calculate the determinant
            let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

            return outMat;
        }

        /**
         * 矩阵转置
         每一列变成每一行
         | a b |  T   | a c |
         | c d | ===> | b d |
         */
        public transpose(): Matrix4 {
            const a = this._rawData;

            const a01 = a[1];
            const a02 = a[2];
            const a03 = a[3];
            const a12 = a[6];
            const a13 = a[7];
            const a23 = a[11];

            a[1] = a[4];
            a[2] = a[8];
            a[3] = a[12];
            a[4] = a01;
            a[6] = a[9];
            a[7] = a[13];
            a[8] = a02;
            a[9] = a12;
            a[11] = a[14];
            a[12] = a03;
            a[13] = a13;
            a[14] = a23;

            return this;
        }

        public isAffine(): boolean {
            return this._30 === 0 && this._31 === 0 && this._32 === 0 && this._33 === 1;
        }

        /**
         * 绕任意轴旋转
         */
        public rotateByAxis(angle: number, axis: Vector3): Matrix4 {

            const x = axis.x, y = axis.y, z = axis.z;
            const ca = Math.cos(angle), sa = Math.sin(angle), c1 = 1 - ca;
            const x2 = x * x, y2 = y * y, z2 = z * z;
            const xz = x * z, xy = x * y, yz = y * z;
            const xs = x * sa, ys = y * sa, zs = z * sa;

            this._00 = x2 * c1 + ca;
            this._01 = xy * c1 + zs;
            this._02 = xz * c1 - ys;
            this._03 = 0;
            this._10 = xy * c1 - zs;
            this._11 = y2 * c1 + ca;
            this._12 = yz * c1 + xs;
            this._13 = 0;
            this._20 = xz * c1 + ys;
            this._21 = yz * c1 - xs;
            this._22 = z2 * c1 + ca;
            this._23 = 0;
            this._30 = 0;
            this._31 = 0;
            this._32 = 0;
            this._33 = 1;

            return this;
        }

        public rotateByScalar(x: number, y: number, z: number): Matrix4 {

            const yaw = y, pitch = x, roll = z;

            const sinx = Math.sin(pitch);
            const cosx = Math.cos(pitch);
            const siny = Math.sin(yaw);
            const cosy = Math.cos(yaw);
            const sinz = Math.sin(roll);
            const cosz = Math.cos(roll);

            this._00 = cosy * cosz + siny * sinx * sinz;
            this._01 = sinz * cosx;
            this._02 = -siny * sinz + cosy * sinx * sinz;
            this._03 = 0;

            this._10 = -cosy * sinz + siny * sinx * cosz;
            this._11 = cosz * cosx;
            this._12 = sinz * siny + cosy * sinx * cosz;
            this._13 = 0;

            this._20 = siny * cosx;
            this._21 = -sinx;
            this._22 = cosy * cosx;
            this._23 = 0;

            this._30 = 0;
            this._31 = 0;
            this._32 = 0;
            this._33 = 1;

            return this;
        }

        /**
         * 矩阵分解, 可分解为position,scale,quaternion
         * @param outPosition
         * @param outScale
         * @param outQuaternion
         */
        public decompose(outPosition: Vector3, outScale: Vector3, outQuaternion: Quaternion) {
            const mat = this._rawData;
            // pos
            outPosition.x = mat[12];
            outPosition.y = mat[13];
            outPosition.z = mat[14];

            // scale
            outScale.x = Math.hypot(mat[0], mat[1], mat[2]);
            outScale.y = Math.hypot(mat[4], mat[5], mat[6]);
            outScale.z = Math.hypot(mat[8], mat[9], mat[10]);

            // quaternion
            const is1 = 1 / outScale.x;
            const is2 = 1 / outScale.y;
            const is3 = 1 / outScale.z;

            const sm11 = mat[0] * is1;
            const sm12 = mat[1] * is1;
            const sm13 = mat[2] * is1;
            const sm21 = mat[4] * is2;
            const sm22 = mat[5] * is2;
            const sm23 = mat[6] * is2;
            const sm31 = mat[8] * is3;
            const sm32 = mat[9] * is3;
            const sm33 = mat[10] * is3;

            const trace = sm11 + sm22 + sm33;
            let S = 0;

            if (trace > 0) {
                S = Math.sqrt(trace + 1.0) * 2;
                outQuaternion.w = 0.25 * S;
                outQuaternion.x = (sm23 - sm32) / S;
                outQuaternion.y = (sm31 - sm13) / S;
                outQuaternion.z = (sm12 - sm21) / S;
            } else if ((sm11 > sm22) && (sm11 > sm33)) {
                S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
                outQuaternion.w = (sm23 - sm32) / S;
                outQuaternion.x = 0.25 * S;
                outQuaternion.y = (sm12 + sm21) / S;
                outQuaternion.z = (sm31 + sm13) / S;
            } else if (sm22 > sm33) {
                S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
                outQuaternion.w = (sm31 - sm13) / S;
                outQuaternion.x = (sm12 + sm21) / S;
                outQuaternion.y = 0.25 * S;
                outQuaternion.z = (sm23 + sm32) / S;
            } else {
                S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
                outQuaternion.w = (sm12 - sm21) / S;
                outQuaternion.x = (sm31 + sm13) / S;
                outQuaternion.y = (sm23 + sm32) / S;
                outQuaternion.z = 0.25 * S;
            }
        }
    }
}
