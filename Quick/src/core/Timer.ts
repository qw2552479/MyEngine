namespace QuickEngine {

    export module Timer {

        interface TimerData {
            id: number;
            callback: (dt: number) => void;
            delay: number;
            repeat: number;
            interval: number;
            endTick: number;
        }

        class TimerHeap extends MinHeap<TimerData> {

            public remove(timerId: number) {

                let heap = this._heap;
                let len = this._length;

                for (let i = 0; i < len; i++) {
                    let data = heap[i];
                    if (data.id == timerId) {
                        heap[i] = heap[this._length - 1];
                        this._length--;
                        this.filterDown(i, this._length - 1); //调整新的根节点
                        break;
                    }
                }

            }

        }

        function _TimerDataComparer(x: TimerData, y: TimerData) {
            return x.endTick - y.endTick;
        }

        let _timerHeap: TimerHeap = new TimerHeap(_TimerDataComparer);
        let _timerId = 0;
        let _tick = 0;

        /**
         * 添加一个定时器
         * @param callback 回调函数
         * @param delay    延迟时间, 单位毫秒
         * @param repeat   重复次数, 默认为0, 不重复
         * @param interval 重复间隔时间, 单位毫秒
         * @return 定时器id
         */
        export function addTimer(callback: (dt: number) => void, delay: number, repeat: number = 0, interval: number = 0): number {

            let newTimerId = _timerId++;
            let timerData: TimerData = {
                id: newTimerId,
                callback: callback,
                delay: delay,
                repeat: repeat,
                interval: interval,
                endTick: _tick + Date.now()
            };

            _timerHeap.enqueue(timerData);

            return timerData.id;
        }

        /**
         * 删除一个定时器
         * @param timerId 定时器id
         */
        export function killTimer(timerId: number) {
            _timerHeap.remove(timerId);
        }

        export function update(dt: number) {

            _tick += dt;

            while (_timerHeap.count() > 0) {

                let timerData = _timerHeap.peek();

                if (_tick < timerData.endTick) {
                    break;
                }

                _timerHeap.dequeue();

                let repeatCount = timerData.repeat;

                if (repeatCount == 0) {
                    timerData.callback(dt);
                } else if (repeatCount == -1) {
                     // 无限定时器
                    timerData.callback(dt);
                    timerData.endTick = _tick + timerData.interval;
                    _timerHeap.enqueue(timerData);
                } else {
                    timerData.callback(dt);
                    timerData.repeat = repeatCount--;
                    timerData.endTick = _tick + timerData.interval;
                    _timerHeap.enqueue(timerData);
                }
            }
            
        }
    }

}