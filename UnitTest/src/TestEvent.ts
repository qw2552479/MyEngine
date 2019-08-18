module UnitTest {
    class TestCaller {
        m() {
            console.log('TestCaller m');
        }

        m1(a: string) {
            console.log('TestCaller m1: ' + a);
        }

        m2(a: string, b: number) {
            console.log('TestCaller m2: ' + a + ' b:' + b);
        }

        m3(a: string, b: number, c: number) {
            console.log('TestCaller m3: ' + a + ' b: ' + b + ' c:' + c);
        }

        m4(a: string, b: number, c: number, d: number) {
            console.log('TestCaller m4: ' + a + ' b: ' + b + ' c:' + c + ' d: ' + d);
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
        const evt = new QE.QEEvent();

        const listener = new QE.QEListener<TestCaller>(new TestCaller(), TestCaller.prototype.m);
        evt.add(listener);

        const listener2 = new QE.QEListener<Object>(undefined, () => {
            console.log('QEListener<Object, string>');
        });
        evt.add(listener2);

        evt.dispatchEvent();
    }

    function test1() {
        const evt = new QE.QEEvent1<string>();
        const listener = new QE.QEListener1<TestCaller, string>(new TestCaller(), TestCaller.prototype.m1);
        evt.add(listener);

        const listener2 = new QE.QEListener1<Object, string>(undefined, (a: string) => {
            console.log('QEListener1<Object, string>: ' + a);
        });
        evt.add(listener2);

        evt.dispatchEvent('fuck xiaoming');
    }

    function test2() {
        const evt = new QE.QEEvent2<string, number>();

        const listener = new QE.QEListener2<TestCaller, string, number>(new TestCaller(), TestCaller.prototype.m2);
        evt.add(listener);

        const listener2 = new QE.QEListener2<Object, string, number>(undefined, (a: string) => {
            console.log('QEListener2<Object, string>: ' + a);
        });
        evt.add(listener2);

        evt.dispatchEvent('fuck xiaoming', 1);
    }

    function test3() {
        const evt = new QE.QEEvent3<string, number, number>();
        const listener = new QE.QEListener3<TestCaller, string, number, number>(new TestCaller(), TestCaller.prototype.m3);
        evt.add(listener);

        const listener2 = new QE.QEListener3<Object, string, number, number>(undefined, (a: string) => {
            console.log('QEListener3<Object, string>: ' + a);
        });
        evt.add(listener2);

        evt.dispatchEvent('fuck xiaoming', 1, 2);
    }

    function test4() {
        const evt = new QE.QEEvent4<string, number, number, number>();
        const listener = new QE.QEListener4<TestCaller, string, number, number, number>(new TestCaller(), TestCaller.prototype.m4);
        evt.add(listener);

        const listener2 = new QE.QEListener4<Object, string, number, number, number>(undefined, (a: string) => {
            console.log('QEListener4<Object, string>: ' + a);
        });
        evt.add(listener2);

        evt.dispatchEvent('fuck xiaoming', 1, 2, 3);
    }
}
