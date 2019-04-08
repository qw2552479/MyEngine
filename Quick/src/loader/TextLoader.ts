namespace QuickEngine {
	export class TextLoader {
		constructor() {

		}

		public load(url: string): void {
			ResourceLoader.xhrload(url, function () {

			}, this, true);
		}
	}
}