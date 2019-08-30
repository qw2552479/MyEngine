namespace QE {
    export class Log {
        public static D(...args): void {
            console.log.apply(this, arguments);
        }

        public static I(...args): void {
            console.info.apply(this, arguments);
        }

        public static W(...args): void {
            console.warn.apply(this, arguments);
        }

        public static E(...args): void {
            console.error.apply(this, arguments);
        }

        public static F(...args): void {
            console.error.apply(this, arguments);
        }
    }
}
