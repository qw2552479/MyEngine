namespace QE {

    export type Action = () => void;
    export type Action1<T> = (t: T) => void;
    export type Action2<T1, T2> = (t: T1, t2: T2) => void;
    export type Action3<T1, T2, T3> = (t: T1, t2: T2, t3: T3) => void;
    export type Action4<T1, T2, T3, T4> = (t: T1, t2: T2, t3: T3, t4: T4) => void;

    export type Func<TResult> = () => TResult;
    export type Func1<T, TResult> = (t: T) => TResult;
    export type Func2<T1, T2, TResult> = (t: T1, t2: T2) => TResult;
    export type Func3<T1, T2, T3, TResult> = (t: T1, t2: T2, t3: T3) => TResult;
    export type Func4<T1, T2, T3, T4, TResult> = (t: T1, t2: T2, t3: T3, t4: T4) => TResult;

    // ===================  Event  ===================
    export interface IQEListener {
        _func: Action;
        onCall: Action;
    }

    export class QEListener<T> implements IQEListener {
        _listener: T;
        _func: Action;

        constructor(listener: T, func: Action) {
            this._listener = listener;
            this._func = func;
        }

        public onCall() {
            this._func.call(this._listener);
        }
    }

    export class QEEvent {

        private _listeners: IQEListener[] = [];

        public add(listener: IQEListener) {
            this._listeners.push(listener);
        }

        public del(listener: IQEListener) {
            const idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        }

        public clear() {
            this._listeners = [];
        }

        public dispatchEvent() {

            const listeners = this._listeners;

            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall();
            }
        }
    }

    // ===================  Event  ===================

    // ===================  Event1  ===================
    export interface IQEListener1<P> {
        _func: Action1<P>;
        onCall: Action1<P>;
    }

    export class QEListener1<T, P> implements IQEListener1<P> {
        _listener: T;
        _func: Action1<P>;

        constructor(listener: T, func: Action1<P>) {
            this._listener = listener;
            this._func = func;
        }

        public onCall(p: P) {
            this._func.call(this._listener, p);
        }
    }

    export class QEEvent1<P> {

        private _listeners: IQEListener1<P>[] = [];

        public add(listener: IQEListener1<P>) {
            this._listeners.push(listener);
        }

        public del(listener: IQEListener1<P>) {
            const idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        }

        public clear() {
            this._listeners = [];
        }

        public dispatchEvent(t: P) {

            const listeners = this._listeners;

            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(t);
            }
        }
    }

    // ===================  Event1  ===================

    // ===================  Event2  ===================
    export interface IQEListener2<P1, P2> {
        _func: Action2<P1, P2>;
        onCall: Action2<P1, P2>;
    }

    export class QEListener2<T, P1, P2> implements IQEListener2<P1, P2> {
        _listener: T;
        _func: Action2<P1, P2>;

        constructor(listener: T, func: Action2<P1, P2>) {
            this._listener = listener;
            this._func = func;
        }

        public onCall(p1: P1, p2: P2) {
            this._func.call(this._listener, p1, p2);
        }
    }

    export class QEEvent2<P1, P2> {

        private _listeners: IQEListener2<P1, P2>[] = [];

        public add(listener: IQEListener2<P1, P2>) {
            this._listeners.push(listener);
        }

        public del(listener: IQEListener2<P1, P2>) {
            const idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        }

        public clear() {
            this._listeners = [];
        }

        public dispatchEvent(p1: P1, p2: P2) {

            const listeners = this._listeners;

            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(p1, p2);
            }
        }
    }

    // ===================  Event2  ===================

    // ===================  Event3  ===================
    export interface IQEListener3<P1, P2, P3> {
        _func: Action3<P1, P2, P3>;
        onCall: Action3<P1, P2, P3>;
    }

    export class QEListener3<T, P1, P2, P3> implements IQEListener3<P1, P2, P3> {
        _listener: T;
        _func: Action3<P1, P2, P3>;

        constructor(listener: T, func: Action3<P1, P2, P3>) {
            this._listener = listener;
            this._func = func;
        }

        public onCall(p1: P1, p2: P2, p3: P3) {
            this._func.call(this._listener, p1, p2, p3);
        }
    }

    export class QEEvent3<P1, P2, P3> {

        private _listeners: IQEListener3<P1, P2, P3>[] = [];

        public add(listener: IQEListener3<P1, P2, P3>) {
            this._listeners.push(listener);
        }

        public del(listener: IQEListener3<P1, P2, P3>) {
            const idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        }

        public clear() {
            this._listeners = [];
        }

        public dispatchEvent(p1: P1, p2: P2, p3: P3) {

            const listeners = this._listeners;

            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(p1, p2, p3);
            }
        }
    }

    // ===================  Event3  ===================

    // ===================  Event4  ===================
    export interface IQEListener4<P1, P2, P3, P4> {
        _func: Action4<P1, P2, P3, P4>;
        onCall: Action4<P1, P2, P3, P4>;
    }

    export class QEListener4<T, P1, P2, P3, P4> implements IQEListener4<P1, P2, P3, P4> {
        _listener: T;
        _func: Action4<P1, P2, P3, P4>;

        constructor(listener: T, func: Action4<P1, P2, P3, P4>) {
            this._listener = listener;
            this._func = func;
        }

        public onCall(p1: P1, p2: P2, p3: P3, p4: P4) {
            this._func.call(this._listener, p1, p2, p3, p4);
        }
    }

    export class QEEvent4<P1, P2, P3, P4> {

        private _listeners: IQEListener4<P1, P2, P3, P4>[] = [];

        public add(listener: IQEListener4<P1, P2, P3, P4>) {
            this._listeners.push(listener);
        }

        public del(listener: IQEListener4<P1, P2, P3, P4>) {
            const idx = this._listeners.indexOf(listener);
            if (idx !== -1) {
                this._listeners.splice(idx, 1);
            }
        }

        public clear() {
            this._listeners = [];
        }

        public dispatchEvent(p1: P1, p2: P2, p3: P3, p4: P4) {

            const listeners = this._listeners;

            for (let i = 0, len = listeners.length; i < len; i++) {
                listeners[i].onCall(p1, p2, p3, p4);
            }
        }
    }

    // ===================  Event4  ===================
}
