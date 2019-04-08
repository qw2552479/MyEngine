module UnitTest {

    import QuickEvent = QuickEngine.QuickEvent;
    import QuickListener = QuickEngine.QuickListener;

    import QuickEvent1 = QuickEngine.QuickEvent1;
    import QuickListener1 = QuickEngine.QuickListener1;

    import QuickEvent2 = QuickEngine.QuickEvent2;
    import QuickListener2 = QuickEngine.QuickListener2;

    import QuickEvent3 = QuickEngine.QuickEvent3;
    import QuickListener3 = QuickEngine.QuickListener3;

    import QuickEvent4 = QuickEngine.QuickEvent4;
    import QuickListener4 = QuickEngine.QuickListener4;

    class TestCaller {
        
        m() {
            console.log("TestCaller m");            
        }

        m1(a: string) {
            console.log("TestCaller m1: " + a);
        }

        m2(a: string, b: number) {
            console.log("TestCaller m2: " + a + " b:" + b);
        }

        m3(a: string, b: number, c: number) {
            console.log("TestCaller m3: " + a + " b: " + b + " c:" + c);
        }

        m4(a: string, b: number, c: number, d: number) {
            console.log("TestCaller m4: " + a + " b: " + b + " c:" + c + " d: " + d);
        }
    }

    export function testEvent() {
        test();
        test1();
        test2();
        test3();
        test4();
    }

    function test() {
        let evt = new QuickEvent();

        let listener = new QuickListener<TestCaller>(new TestCaller(), TestCaller.prototype.m);
        evt.add(listener);

        let listener2 = new QuickListener<Object>(undefined, () => { console.log("QuickListener<Object, string>") });
        evt.add(listener2);

        evt.dispatchEvent();
    }

    function test1() {
        let evt = new QuickEvent1<string>();
        let listener = new QuickListener1<TestCaller, string>(new TestCaller(), TestCaller.prototype.m1);
        evt.add(listener);

        let listener2 = new QuickListener1<Object, string>(undefined, (a: string) => { console.log("QuickListener1<Object, string>: " + a) });
        evt.add(listener2);

        evt.dispatchEvent("fuck xiaoming");
    }

    function test2() {
        let evt = new QuickEvent2<string, number>();

        let listener = new QuickListener2<TestCaller, string, number>(new TestCaller(), TestCaller.prototype.m2);
        evt.add(listener);

        let listener2 = new QuickListener2<Object, string, number>(undefined, (a: string) => { console.log("QuickListener2<Object, string>: " + a) });
        evt.add(listener2);

        evt.dispatchEvent("fuck xiaoming", 1);
    }

    function test3() {
        let evt = new QuickEvent3<string, number, number>();
        let listener = new QuickListener3<TestCaller, string, number, number>(new TestCaller(), TestCaller.prototype.m3);
        evt.add(listener);

        let listener2 = new QuickListener3<Object, string, number, number>(undefined, (a: string) => { console.log("QuickListener3<Object, string>: " + a) });
        evt.add(listener2);

        evt.dispatchEvent("fuck xiaoming", 1, 2);
    }

    function test4() {
        let evt = new QuickEvent4<string, number, number, number>();
        let listener = new QuickListener4<TestCaller, string, number, number, number>(new TestCaller(), TestCaller.prototype.m4);
        evt.add(listener);

        let listener2 = new QuickListener4<Object, string, number, number, number>(undefined, (a: string) => { console.log("QuickListener4<Object, string>: " + a) });
        evt.add(listener2);

        evt.dispatchEvent("fuck xiaoming", 1, 2, 3);
    }
}