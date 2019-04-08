module UnitTest {
    //最小堆：根结点的键值是所有堆结点键值中最小者。
    export function testMinHeap() {
        //let k, n = 11, a = [0, 5, 2, 4, 9, 7, 3, 1, 10, 8, 6];
        //let test = new QuickEngine.MinHeap<number>();
        //for (k = 0; k < n; k++)
        //    test.enqueue(a[k]);
        //for (k = 0; k < n; k++)
        //    console.log(test.dequeue());

        function comparer(x: TestData, y: TestData): number {
            return x.v - y.v;
        }

        interface TestData {
            v: number;
            b: number
        }

        let k, n = 11, a: TestData[] = [
            { v: 0, b: 2 },
            { v: 5, b: 2 },
            { v: 2, b: 2 },
            { v: 4, b: 2 },
            { v: 9, b: 2 },
            { v: 7, b: 2 },
            { v: 3, b: 2 },
            { v: 1, b: 2 },
            { v: 10,b: 2 },
            { v: 8, b: 2 },
            { v: 6, b: 2 }
        ];

        let test = new QuickEngine.MinHeap<TestData>(comparer);
        for (k = 0; k < n; k++)
            test.enqueue(a[k]);
        for (k = 0; k < n; k++)
            console.log(test.dequeue());
    }
}