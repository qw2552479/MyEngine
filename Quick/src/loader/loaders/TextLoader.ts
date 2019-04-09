namespace QuickEngine {
	export class TextLoader {
		public static load(url: string, onLoaded: (err, data) => void, thisObj?: Object): void {
			Http.get(url, null, null, function (err, data) {
				onLoaded && onLoaded.call(thisObj, err, data);
			}, this, true);
		}
	}
}