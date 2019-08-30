///<reference path="Resource.ts"/>

namespace QE {
    export class TextResource extends Resource {

        private _text = '';
        public get text(): string {
            return this._text;
        }

        public set text(txt: string) {
            this._text = txt;
        }

        constructor() {
            super();
        }

        public clone(): HashObject {
            const obj = new TextResource();
            obj._text = this._text;
            return obj;
        }
    }
}
