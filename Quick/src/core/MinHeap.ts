
namespace QE {

    export type MinHeapComparer<T> = (x: T, y: T) => number;

    /**
     * 最小堆
     */
    export class MinHeap<T> {

        // 元素数组，0号位置也储存元素
        protected _heap: T[];
        // 元素比较器, 如果不存在,使用js默认比较器
        protected _comparer: MinHeapComparer<T>;
        // 目前元素个数
        protected _length: number;

        constructor(comparer?: MinHeapComparer<T>) {
            this._heap = [];
            this._length = 0;
            this._comparer = comparer;
        }

        /**
         * 元素入队
         * @param x
         */
        public enqueue(x: T): boolean {

            this._heap.push(x);
            this.filterUp(this._length);
            this._length++;

            return true;
        }

        /**
         * 最小元素出队
         */
        public dequeue(): T {

            const heap = this._heap;
            const x = heap[0];

            heap[0] = heap[this._length - 1];

            this._length--;
            this.filterDown(0, this._length - 1); // 调整新的根节点

            return x;
        }

        /**
         * 查看最小元素
         */
        public peek(): T {
            return this._heap[0];
        }

        /**
         * 堆元素数量
         */
        public count(): number {
            return this._length;
        }

        /**
         * 清空队列
         */
        public clear() {
            this._heap = [];
            this._length = 0;
        }

        protected filterDown(start: number, end: number) {

            let i = start, j = 2 * i + 1;
            const heap = this._heap;
            const temp = heap[i];
            const comparer = this._comparer;

            if (comparer) {
                while (j <= end) {
                    if ((j < end) && (comparer(heap[j], heap[j + 1]) > 0)) {
                        j++;
                    }
                    if (comparer(temp, heap[j]) <= 0) {
                        break;
                    } else {
                        heap[i] = heap[j];
                        i = j;
                        j = 2 * j + 1;
                    }
                }
            } else {
                while (j <= end) {
                    if ((j < end) && (heap[j] > heap[j + 1])) {
                        j++;
                    }
                    if (temp <= heap[j]) {
                        break;
                    } else {
                        heap[i] = heap[j];
                        i = j;
                        j = 2 * j + 1;
                    }
                }
            }

            heap[i] = temp;
        }

        protected filterUp(start: number) {

            let j = start, i = Math.floor((j - 1) * 0.5); // i指向j的双亲节点
            const heap = this._heap;
            const temp = heap[j];
            const comparer = this._comparer;

            if (comparer) {
                while (j > 0) {
                    if (comparer(heap[i], temp) <= 0) {
                        break;
                    } else {
                        heap[j] = heap[i];
                        j = i;
                        i = Math.floor((i - 1) * 0.5);
                    }
                }
            } else {
                while (j > 0) {
                    if (heap[i] <= temp) {
                        break;
                    } else {
                        heap[j] = heap[i];
                        j = i;
                        i = Math.floor((i - 1) * 0.5);
                    }
                }
            }

            heap[j] = temp;
        }
    }
}

