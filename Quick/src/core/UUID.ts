namespace QE {

    export module UUID {

        // Private array of chars to use
        const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

        function uuid(len, radix) {
            const chars = CHARS;
            const ret: string[] = [];
            let i;
            radix = radix || chars.length;

            if (len) {
                // Compact form
                for (i = 0; i < len; i++) {
                    ret[i] = chars[0 | Math.random() * radix];
                }
            } else {
                // rfc4122, version 4 form
                let r;

                // rfc4122 requires these characters
                ret[8] = ret[13] = ret[18] = ret[23] = '-';
                ret[14] = '4';

                // Fill in random data.  At i==19 set the high bits of clock sequence as
                // per rfc4122, sec. 4.1.5
                for (i = 0; i < 36; i++) {
                    if (!ret[i]) {
                        r = 0 | Math.random() * 16;
                        ret[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }

            return ret.join('');
        }

        // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
        // by minimizing calls to random()
        function uuidFast() {
            const chars = CHARS;
            const ret = new Array(36);
            let rnd = 0;
            let r;
            for (let i = 0; i < 36; i++) {
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                    ret[i] = '-';
                } else if (i === 14) {
                    ret[i] = '4';
                } else {
                    if (rnd <= 0x02) {
                        rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                    }
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    ret[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return ret.join('');
        }

        // A more compact, but less performant, RFC4122v4 solution:
        export function newUuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
}
