module UnitTest.TestGetSet {

    // 测试js不同方式获取值的性能
    // 1. get set方法
    // 2. 直接读取属性
    // 3. 函数取值
    // 结果：第一种和第三中差别不大，这两种耗时约等于第二种的十倍
    class TestGetSetObj {

        public _hehe: string;
        public get hehe() {
            return this._hehe;
        }
        public set hehe(val: string) {
            this._hehe = val;
        }

        public getHehe() {
            return this._hehe;
        }
    }

    export function run() {

        let count = 1000;
        let testObj = new TestGetSetObj();
        //for (let i = 0; i < count; i++) {
        //    array[i] = i;
        //    floatArray[i] = i;
        //}

        console.time("get function");
        for (let i = 0; i < count; i++) {
            let t = testObj.hehe;
        }
        console.timeEnd("get function");

        console.time("property value");
        for (let i = 0; i < count; i++) {
            let t = testObj._hehe;
        }
        console.timeEnd("property value");

        console.time("getHehe function");
        for (let i = 0; i < count; i++) {
            let t = testObj.getHehe();
        }
        console.timeEnd("getHehe function");
    }

}