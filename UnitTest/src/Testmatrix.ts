module UnitTest.TestMatrix {

    import Matrix4 = QuickEngine.Matrix4;
    import Vector3 = QuickEngine.Vector3;

    export function run() {
		let mat4 = Matrix4.makeTranslate(new Vector3(0, 0, 1));
        mat4.toArrayBuffer();
        console.log(mat4);
    }

}