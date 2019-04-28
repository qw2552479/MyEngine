namespace QuickEngine {

    // 复用的单位矩阵
    const identifyMatrixArray = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];

    /**
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
    /**
     * TODO: 矩阵数据使用array buffer, 数组计算更缓存友好
     */
    export class Matrix4 {

        public static ClassName = 'Matrix4';

        public _00: number = 1;
        public _10: number = 0;
        public _20: number = 0;
        public _30: number = 0;

        public _01: number = 0;
        public _11: number = 1;
        public _21: number = 0;
        public _31: number = 0;

        public _02: number = 0;
        public _12: number = 0;
        public _22: number = 1;
        public _32: number = 0;

        public _03: number = 0;
        public _13: number = 0;
        public _23: number = 0;
        public _33: number = 1;

        private _rawData = new Float32Array(16);

        constructor() {
        }

        public static create(
            _00: number, _01: number, _02: number, _03: number,
            _10: number, _11: number, _12: number, _13: number,
            _20: number, _21: number, _22: number, _23: number,
            _30: number, _31: number, _32: number, _33: number) {

            let matrix = new Matrix4();

            matrix._00 = _00, matrix._01 = _01, matrix._02 = _02, matrix._03 = _03;
            matrix._10 = _10, matrix._11 = _11, matrix._12 = _12, matrix._13 = _13;
            matrix._20 = _20, matrix._21 = _21, matrix._22 = _22, matrix._23 = _23;
            matrix._30 = _30, matrix._31 = _31, matrix._32 = _32, matrix._33 = _33;

            return matrix;
        }

        public set(_00: number, _01: number, _02: number, _03: number,
                   _10: number, _11: number, _12: number, _13: number,
                   _20: number, _21: number, _22: number, _23: number,
                   _30: number, _31: number, _32: number, _33: number): Matrix4 {

            this._00 = _00, this._01 = _01, this._02 = _02, this._03 = _03;
            this._10 = _10, this._11 = _11, this._12 = _12, this._13 = _13;
            this._20 = _20, this._21 = _21, this._22 = _22, this._23 = _23;
            this._30 = _30, this._31 = _31, this._32 = _32, this._33 = _33;

            return this;
        }

        public copyFrom(other: Matrix4): Matrix4 {

            this._00 = other._00, this._01 = other._01, this._02 = other._02, this._03 = other._03;
            this._10 = other._10, this._11 = other._11, this._12 = other._12, this._13 = other._13;
            this._20 = other._20, this._21 = other._21, this._22 = other._22, this._23 = other._23;
            this._30 = other._30, this._31 = other._31, this._32 = other._32, this._33 = other._33;

            return this;
        }

        public clone(): Matrix4 {
            let matrix = new Matrix4();

            matrix._00 = this._00, matrix._01 = this._01, matrix._02 = this._02, matrix._03 = this._03;
            matrix._10 = this._10, matrix._11 = this._11, matrix._12 = this._12, matrix._13 = this._13;
            matrix._20 = this._20, matrix._21 = this._21, matrix._22 = this._22, matrix._23 = this._23;
            matrix._30 = this._30, matrix._31 = this._31, matrix._32 = this._32, matrix._33 = this._33;

            return matrix;
        }

        /**
         * 矩阵相乘
         a00 a01 a02 a03     b00 b01 b02 b03     a00*b00+a01*b10+a02*b20+a03*b30 a00*b01+a01*b11+a02*b21+a03*b31 a00*b02+a01*b12+a02*b22+a03*b32 a00*b03+a01*b13+a02*b23+a03*b33
         a10 a11 a12 a13  *  b10 b11 b12 b13  =  a10*b00+a11*b10+a12*b20+a13*b30 a10*b01+a11*b11+a12*b21+a13*b31 a10*b02+a11*b12+a12*b22+a13*b32 a10*b03+a11*b13+a12*b23+a13*b33
         a20 a21 a22 a23     b20 b21 b22 b23     a20*b00+a21*b10+a22*b20+a23*b30 a20*b01+a21*b11+a22*b21+a23*b31 a20*b02+a21*b12+a22*b22+a23*b32 a20*b03+a21*b13+a22*b23+a23*b33
         a30 a31 a32 a33     b30 b31 b32 b33     a30*b00+a31*b10+a32*b20+a33*b30 a30*b01+a31*b11+a32*b21+a33*b31 a30*b02+a31*b12+a32*b22+a33*b32 a30*b03+a31*b13+a32*b23+a33*b33
         */
        public multiply(v: Matrix4, out?: Matrix4): Matrix4 {

            if (!out) {
                out = new Matrix4();
            }

            let a00 = this._00, a01 = this._01, a02 = this._02, a03 = this._03;
            let a10 = this._10, a11 = this._11, a12 = this._12, a13 = this._13;
            let a20 = this._20, a21 = this._21, a22 = this._22, a23 = this._23;
            let a30 = this._30, a31 = this._31, a32 = this._32, a33 = this._33;

            let b00 = v._00, b01 = v._01, b02 = v._02, b03 = v._03;
            let b10 = v._10, b11 = v._11, b12 = v._12, b13 = v._13;
            let b20 = v._20, b21 = v._21, b22 = v._22, b23 = v._23;
            let b30 = v._30, b31 = v._31, b32 = v._32, b33 = v._33;
            // #1
            out._00 = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
            out._01 = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
            out._02 = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
            out._03 = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
            // #2
            out._10 = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
            out._11 = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
            out._12 = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
            out._13 = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
            // #3
            out._20 = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
            out._21 = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
            out._22 = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
            out._23 = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
            // #4
            out._30 = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
            out._31 = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
            out._32 = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
            out._33 = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

            return out;
        }

        public static multiply(v1: Matrix4, v2: Matrix4, out?: Matrix4): Matrix4 {

            if (!out) {
                out = new Matrix4();
            }

            let a00 = v1._00, a01 = v1._01, a02 = v1._02, a03 = v1._03;
            let a10 = v1._10, a11 = v1._11, a12 = v1._12, a13 = v1._13;
            let a20 = v1._20, a21 = v1._21, a22 = v1._22, a23 = v1._23;
            let a30 = v1._30, a31 = v1._31, a32 = v1._32, a33 = v1._33;

            let b00 = v2._00, b01 = v2._01, b02 = v2._02, b03 = v2._03;
            let b10 = v2._10, b11 = v2._11, b12 = v2._12, b13 = v2._13;
            let b20 = v2._20, b21 = v2._21, b22 = v2._22, b23 = v2._23;
            let b30 = v2._30, b31 = v2._31, b32 = v2._32, b33 = v2._33;
            // #1
            out._00 = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
            out._01 = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
            out._02 = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
            out._03 = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
            // #2
            out._10 = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
            out._11 = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
            out._12 = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
            out._13 = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
            // #3
            out._20 = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
            out._21 = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
            out._22 = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
            out._23 = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
            // #4
            out._30 = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
            out._31 = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
            out._32 = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
            out._33 = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

            return out;
        }

        /**
         * 矩阵向量相乘, 列向量应该右乘矩阵
         * @param vec
         a00 a01 a02 a03    x
         a10 a11 a12 a13 *  y
         a20 a21 a22 a23    z
         a30 a31 a32 a33    w=0
         */
        public transformVector3(v: Vector3): Vector3 {
            let x = v.x;
            let y = v.y;
            let z = v.z;

            let x1 = this._00 * x + this._10 * y + this._20 * z;
            let y1 = this._01 * x + this._11 * y + this._21 * z;
            let z1 = this._02 * x + this._12 * y + this._22 * z;

            return new Vector3(x1, y1, z1);
        }

        /**
         * 单位矩阵
         */
        public identity(): Matrix4 {
            this._00 = 1, this._01 = 0, this._02 = 0, this._03 = 0;
            this._10 = 0, this._11 = 1, this._12 = 0, this._20 = 0;
            this._20 = 0, this._21 = 0, this._22 = 1, this._23 = 0;
            this._30 = 0, this._31 = 0, this._32 = 0, this._33 = 1;

            return this;
        }

        public static identity(): Matrix4 {
            return new Matrix4();
        }

        /**
         * 矩阵求逆
         */
        public inverse(): Matrix4 {

            let m00 = this._00, m01 = this._01, m02 = this._02, m03 = this._03;
            let m10 = this._10, m11 = this._11, m12 = this._12, m13 = this._13;
            let m20 = this._20, m21 = this._21, m22 = this._22, m23 = this._23;
            let m30 = this._30, m31 = this._31, m32 = this._32, m33 = this._33;

            let v0 = m20 * m31 - m21 * m30;
            let v1 = m20 * m32 - m22 * m30;
            let v2 = m20 * m33 - m23 * m30;
            let v3 = m21 * m32 - m22 * m31;
            let v4 = m21 * m33 - m23 * m31;
            let v5 = m22 * m33 - m23 * m32;

            let t00 = +(v5 * m11 - v4 * m12 + v3 * m13);
            let t10 = -(v5 * m10 - v2 * m12 + v1 * m13);
            let t20 = +(v4 * m10 - v2 * m11 + v0 * m13);
            let t30 = -(v3 * m10 - v1 * m11 + v0 * m12);

            let invDet = 1 / (t00 * m00 + t10 * m01 + t20 * m02 + t30 * m03);

            let d00 = t00 * invDet;
            let d10 = t10 * invDet;
            let d20 = t20 * invDet;
            let d30 = t30 * invDet;

            let d01 = -(v5 * m01 - v4 * m02 + v3 * m03) * invDet;
            let d11 = +(v5 * m00 - v2 * m02 + v1 * m03) * invDet;
            let d21 = -(v4 * m00 - v2 * m01 + v0 * m03) * invDet;
            let d31 = +(v3 * m00 - v1 * m01 + v0 * m02) * invDet;

            v0 = m10 * m31 - m11 * m30;
            v1 = m10 * m32 - m12 * m30;
            v2 = m10 * m33 - m13 * m30;
            v3 = m11 * m32 - m12 * m31;
            v4 = m11 * m33 - m13 * m31;
            v5 = m12 * m33 - m13 * m32;

            let d02 = +(v5 * m01 - v4 * m02 + v3 * m03) * invDet;
            let d12 = -(v5 * m00 - v2 * m02 + v1 * m03) * invDet;
            let d22 = +(v4 * m00 - v2 * m01 + v0 * m03) * invDet;
            let d32 = -(v3 * m00 - v1 * m01 + v0 * m02) * invDet;

            v0 = m21 * m10 - m20 * m11;
            v1 = m22 * m10 - m20 * m12;
            v2 = m23 * m10 - m20 * m13;
            v3 = m22 * m11 - m21 * m12;
            v4 = m23 * m11 - m21 * m13;
            v5 = m23 * m12 - m22 * m13;

            let d03 = -(v5 * m01 - v4 * m02 + v3 * m03) * invDet;
            let d13 = +(v5 * m00 - v2 * m02 + v1 * m03) * invDet;
            let d23 = -(v4 * m00 - v2 * m01 + v0 * m03) * invDet;
            let d33 = +(v3 * m00 - v1 * m01 + v0 * m02) * invDet;

            return Matrix4.create(
                d00, d01, d02, d03,
                d10, d11, d12, d13,
                d20, d21, d22, d23,
                d30, d31, d32, d33);
        }

        /**
         * 矩阵转置
         每一列变成每一行
         | a b |  T   | a c |
         | c d | ===> | b d |
         */
        public transpose(): Matrix4 {

            let newMat = new Matrix4();

            newMat._00 = this._00, newMat._01 = this._10, newMat._02 = this._20, newMat._03 = this._30;
            newMat._10 = this._01, newMat._11 = this._11, newMat._12 = this._21, newMat._20 = this._31;
            newMat._20 = this._02, newMat._21 = this._12, newMat._22 = this._22, newMat._23 = this._32;
            newMat._30 = this._03, newMat._31 = this._13, newMat._32 = this._23, newMat._33 = this._33;

            return newMat;
        }

        public static transpose(target: Matrix4) {

            let a00 = target._00, a01 = target._01, a02 = target._02, a03 = target._03;
            let a10 = target._10, a11 = target._11, a12 = target._12, a13 = target._13;
            let a20 = target._20, a21 = target._21, a22 = target._22, a23 = target._23;
            let a30 = target._30, a31 = target._31, a32 = target._32, a33 = target._33;

            target._00 = a00, target._01 = a10, target._02 = a20, target._03 = a30;
            target._10 = a01, target._11 = a11, target._12 = a21, target._20 = a31;
            target._20 = a02, target._21 = a12, target._22 = a22, target._23 = a32;
            target._30 = a03, target._31 = a13, target._32 = a23, target._33 = a33;

            return target;
        }

        public isAffine(): boolean {
            return this._30 === 0 && this._31 === 0 && this._32 === 0 && this._33 === 1;
        }

        /**
         * 绕任意轴旋转
         */
        public rotateByAxis(angle: number, axis: Vector3): Matrix4 {

            let x = axis.x, y = axis.y, z = axis.z;
            let ca = Math.cos(angle), sa = Math.sin(angle), c1 = 1 - ca;
            let x2 = x * x, y2 = y * y, z2 = z * z;
            let xz = x * z, xy = x * y, yz = y * z;
            let xs = x * sa, ys = y * sa, zs = z * sa;

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

            let yaw = y, pitch = x, roll = z;

            let sinx = Math.sin(pitch);
            let cosx = Math.cos(pitch);
            let siny = Math.sin(yaw);
            let cosy = Math.cos(yaw);
            let sinz = Math.sin(roll);
            let cosz = Math.cos(roll);

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
         */
        public decompose() {
            let position: Vector3, scale: Vector3, orientation: Quaternion;
            console.assert(this.isAffine());
        }

        // openGL是列向量矩阵
        public toArrayBuffer(): Float32Array {
            if (__USE_COLUMN_MATRIX__) {
                this._rawData.set([
                    this._00, this._01, this._02, this._03,
                    this._10, this._11, this._12, this._13,
                    this._20, this._21, this._22, this._23,
                    this._30, this._31, this._32, this._33
                ]);
            } else {
                this._rawData.set([
                    this._00, this._10, this._20, this._30,
                    this._01, this._11, this._21, this._31,
                    this._02, this._12, this._22, this._32,
                    this._03, this._13, this._23, this._33
                ]);
            }
            return this._rawData;
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
            let rot4x4 = rotation.ToRotationMatrix();
            out._00 = rot4x4._00 * scale.x;
            out._01 = rot4x4._01 * scale.y;
            out._02 = rot4x4._02 * scale.z;
            out._03 = 0;

            out._10 = rot4x4._10 * scale.x;
            out._11 = rot4x4._11 * scale.y;
            out._12 = rot4x4._12 * scale.z;
            out._13 = 0;

            out._20 = rot4x4._20 * scale.x;
            out._21 = rot4x4._21 * scale.y;
            out._22 = rot4x4._22 * scale.z;
            out._23 = 0;

            out._30 = position.x;
            out._31 = position.y;
            out._32 = position.z;
            out._33 = 1;

            return out;
        }

        /**
         * 构造平移矩阵
         * @param v
         * @param out
         * @example
         *          |1, 0, 0, x|
         *          |0, 1, 0, y|
         *          |0, 0, 1, z|
         *          |0, 0, 0, 1|
         */
        public static makeTranslate(v: Vector3): Matrix4 {

            let out = new Matrix4();

            out._03 = v.x;
            out._13 = v.y;
            out._23 = v.z;

            return out;
        }

        /**
         * 根据x，y，z标量构造平移矩阵
         * @param t_x
         * @param t_y
         * @param t_z
         * @param out
         */
        public static makeTranslateByScalar(t_x: number, t_y: number, t_z: number): Matrix4 {

            let out = new Matrix4();

            out._03 = t_x;
            out._13 = t_y;
            out._23 = t_z;

            return out;
        }

        /**
         * 构造缩放矩阵
         * @param s_x
         * @param s_y
         * @param s_z
         * @param out 如果传入out，则不创建新的matrix，返回out
         * @example
         *          |sx, 0 , 0 , 0|
         *          |0 , sy, 0 , 0|
         *          |0 , 0 , sz, 0|
         *          |0 , 0 , 0 , 1|
         */
        public static makeScale(s_x: number, s_y: number, s_z: number): Matrix4 {

            let out = new Matrix4();

            out._00 = s_x;
            out._11 = s_y;
            out._22 = s_z;

            return out;
        }

        /**
         * 根据标量, 绕任意轴旋转构造旋转矩阵
         * @param a
         * @param x
         * @param y
         * @param z
         * @param out
         */
        public static makeRotation(a: number, x: number, y: number, z: number): Matrix4 {

            let out = new Matrix4();

            let ca = Math.cos(a), sa = Math.sin(a), c1 = 1 - ca;
            let x2 = x * x, y2 = y * y, z2 = z * z;
            let xz = x * z, xy = x * y, yz = y * z;
            let xs = x * sa, ys = y * sa, zs = z * sa;

            out._00 = x2 * c1 + ca;
            out._01 = xy * c1 + zs;
            out._02 = xz * c1 - ys;
            out._10 = xy * c1 - zs;
            out._11 = y2 * c1 + ca;
            out._12 = yz * c1 + xs;
            out._20 = xz * c1 + ys;
            out._21 = yz * c1 - xs;
            out._22 = z2 * c1 + ca;

            return out;
        }

        /**
         * 根据向量，绕任意轴构造旋转矩阵
         * @param angle
         * @param axis
         */
        public static makeRotationByAxis(angle: number, axis: Vector3): Matrix4 {

            let out = new Matrix4();

            out.rotateByAxis(angle, axis);

            return out;
        }

        public static makeRotationEulerAngle(eulerAngle: Vector3): Matrix4 {

            let yaw = eulerAngle.y, pitch = eulerAngle.x, roll = eulerAngle.z;

            let out = new Matrix4();

            out.rotateByScalar(yaw, pitch, roll);

            return out;
        }

        public static makeRotationQuaternion(q: Quaternion, out?: Matrix4) {

            let w = q.w, x = q.x, y = q.y, z = q.z;

            if (!out) {
                out = new Matrix4();
            } else {
                out.identity();
            }

            let _2xx = 2.0 * x * x;
            let _2yy = 2.0 * y * y;
            let _2zz = 2.0 * z * z;
            let _2xy = 2.0 * x * y;
            let _2xz = 2.0 * x * z;
            let _2yz = 2.0 * y * z;
            let _2wx = 2.0 * w * x;
            let _2wy = 2.0 * w * y;
            let _2wz = 2.0 * w * z;

            out._11 = 1.0 - _2yy - _2zz;
            out._12 = _2xy + _2wz;
            out._13 = _2xz - _2wy;

            out._21 = _2xy - _2wz;
            out._22 = 1.0 - _2xx - _2zz;
            out._23 = _2yz + _2wx;

            out._31 = _2xz + _2wy;
            out._32 = _2yz - _2wx;
            out._33 = 1.0 - _2xx - _2yy;

            return out;
        }

        /**
         * 绕X轴旋转，也叫做俯仰角
         * @param a
         * @param out
         */
        public static pitch(a: number, out?: Matrix4): Matrix4 {

            if (!out) {
                out = new Matrix4();
            }

            let ca = Math.cos(a);
            let sa = Math.sin(a);

            out._11 = ca;
            out._12 = sa;
            out._21 = -sa;
            out._22 = ca;

            return out;
        }

        /**
         * 绕Y轴旋转，也叫偏航角
         */
        public static yaw(a: number, out?: Matrix4): Matrix4 {

            if (!out) {
                out = new Matrix4();
            }

            let ca = Math.cos(a);
            let sa = Math.sin(a);

            out._00 = ca;
            out._02 = -sa;
            out._20 = sa;
            out._22 = ca;

            return out;
        }

        /**
         * 绕Z轴旋转，也叫翻滚角
         */
        public static roll(a: number, out?: Matrix4): Matrix4 {

            if (!out) {
                out = new Matrix4();
            }

            let ca = Math.cos(a);
            let sa = Math.sin(a);

            out._00 = ca;
            out._01 = sa;
            out._10 = -sa;
            out._11 = ca;

            return out;
        }

        /**
         * 生成左手视图矩阵
         * @param position
         * @param orientation
         * @param reflectMatrix
         * @param viewMatrix
         */
        public static makeViewMatrixLH(position: Vector3, orientation: Quaternion, reflectMatrix?: Matrix4, viewMatrix?: Matrix4): Matrix4 {
            if (!viewMatrix) {
                viewMatrix = new Matrix4();
            }

            // View matrix is:
            //
            //  [ Lx  Uy  Dz  Tx  ]
            //  [ Lx  Uy  Dz  Ty  ]
            //  [ Lx  Uy  Dz  Tz  ]
            //  [ 0   0   0   1   ]
            //
            // Where T = -(Transposed(Rot) * Pos)
            return viewMatrix;
        }

        /**
         * 构造左手正交视图矩阵
         * 生成正交投影矩阵 矩阵推导可以参考 http://www.codeguru.com/cpp/misc/misc/graphics/article.php/c10123/Deriving-Projection-Matrices.htm
         * @param w
         * @param h
         * @param zn
         * @param zf
         * @param target
         * @example
         * |2 / (right - left), 0,                  0,                -(right + left) / (right - left) |
         * |0,                  2 / (top - bottom), 0,                -(top + bottom) / (top - bottom) |
         * |0,                  0,                  2 / (far - near), -(far + near) / (far - near)     |
         * |0,                  0,                  0,                1                                |
         */
        public static makeOrthoLH(left: number, right: number, top: number, bottom: number, near: number, far: number, target?: Matrix4): Matrix4 {

            target = target ? target.identity() : new Matrix4();

            let w = right - left;
            let h = top - bottom;
            let d = far - near;

            let x = (right + left) / w;
            let y = (top + bottom) / h;
            let z = (far + near) / d;

            target._00 = 2 / w;
            target._11 = 2 / h;
            target._22 = -2 / d;
            target._30 = -x;
            target._31 = -y;
            target._32 = -z;

            return target;
        }

        /**
         * TODO:
         * @param w
         * @param h
         * @param near
         * @param far
         * @param target
         */
        public static makeOrthoFovLH(w: number, h: number, near: number, far: number, target?: Matrix4): Matrix4 {

            if (!target) {
                target = new Matrix4();
            } else {
                target.identity();
            }

            let inv = 1.0 / (far - near);

            target._00 = 2.0 / w;
            target._11 = 2.0 / h;
            target._22 = inv;
            //  target._23 = -near * inv;
            target._33 = 1.0;

            return target;
        }

        /**
         * 生成正交视图矩阵
         * @param w
         * @param h
         * @param zn
         * @param zf
         * @param target
         */
        public static makeOrthoRH(left: number, right: number, top: number, bottom: number, near: number, far: number, target?: Matrix4): Matrix4 {

            if (!target) {
                target = new Matrix4();
            } else {
                target.identity();
            }

            let inv_d = 1 / (far - near);

            let w = right - left;
            let h = top - bottom;
            let d = far - near;

            let x = (right + left) / w;
            let y = (top + bottom) / h;
            let z = (far + near) / d;

            target._00 = 2 / w;
            target._03 = -x;
            target._11 = 2 / h;
            target._13 = -y;
            target._22 = -2 / d;
            target._23 = -z;

            return target;
        }

        /**
         * 构造左手投影矩阵
         * @param left
         * @param right
         * @param top
         * @param bottom
         * @param near
         * @param far
         * @param target
         */
        public static makePerspectiveLH(left: number, right: number, top: number, bottom: number, near: number, far: number, target?: Matrix4): Matrix4 {

            if (!target) {
                target = new Matrix4();
            } else {
                target.identity();
            }

            let inv_w = 1 / (right - left);
            let inv_h = 1 / (top - bottom);
            let inv_d = 1 / (far - near);

            let A = 2 * near * inv_w;
            let B = 2 * near * inv_h;
            let C = (right + left) * inv_w;
            let D = (top + bottom) * inv_h;
            let q, qn;

            if (far == 0) {
                // Infinite far plane
                q = 0.00001 - 1;
                qn = near * (0.00001 - 2);
            } else {
                q = far * inv_d;
                qn = -(far * near) * inv_d;
            }

            target._00 = A;
            target._02 = C;
            target._11 = B;
            target._12 = D;
            target._22 = q;
            target._23 = qn;
            target._32 = 1;
            target._33 = 0;

            return target;
        }

        /**
         * 根据fov构造左手透视投影矩阵
         * @param fov
         * @param aspect
         * @param near
         * @param far
         * @param target
         */
        public static makePerspectiveFovLH(fov: number, aspect: number, near: number, far: number, target?: Matrix4): Matrix4 {

            let ymax = far * Math.tan(fov * Math.PI / 360);
            let ymin = -ymax;
            let xmin = ymin * aspect;
            let xmax = ymax * aspect;

            return Matrix4.makePerspectiveLH(xmin, xmax, ymax, ymin, near, far, target);
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
            } else {
                target.identity();
            }

            let inv_w = 1 / (right - left);
            let inv_h = 1 / (top - bottom);


            let inv_d = 1 / (far - near);

            let A = 2 * near * inv_w;
            let B = 2 * near * inv_h;
            let C = (right + left) * inv_w;
            let D = (top + bottom) * inv_h;
            let q, qn;

            if (far == 0) {
                // Infinite far plane
                q = Number.EPSILON - 1;
                qn = near * (Number.EPSILON - 2);
            } else {
                q = -(far + near) * inv_d;
                qn = -2 * (far * near) * inv_d;
            }

            target._00 = A;
            target._02 = C;
            target._11 = B;
            target._12 = D;
            target._22 = q;
            target._23 = qn;
            target._32 = -1;
            target._33 = 0;

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

            let ymax = near * Math.tan(fov * Math.PI / 360);
            let ymin = -ymax;
            let xmin = ymin * aspect;
            let xmax = ymax * aspect;

            return Matrix4.makePerspectiveRH(xmin, xmax, ymax, ymin, near, far, target);
        }
    }
}