namespace QuickEngine {
	export class ImageLoader {
		public static load(url: string, onLoaded: (err, data) => void, thisObj?: Object): void {
			let xhr: XMLHttpRequest = new XMLHttpRequest();
			xhr.onreadystatechange = function (ev: ProgressEvent) {
				if (xhr.readyState == XHRState.Loaded) {
					if (xhr.status == 200) {
						ImageLoader.loadBlob(xhr.response, onLoaded, thisObj);
					}
				}
			};

			xhr.onerror = function (ev: Event) {

			};

			xhr.open("GET", url, true);
			xhr.responseType = "blob";
			xhr.send(null);
		}

		public static loadBlob(blob: Blob, onLoaded: (err, data) => void, thisObj?: Object) {

			let img = document.createElement("img");

			if (window['createObjectURL'] != undefined) { // basic
				img.src = window['createObjectURL'](blob);
			} else if (window['URL'] != undefined) { // mozilla(firefox)
				img.src = window['URL'].createObjectURL(blob);
			} else if (window['webkitURL'] != undefined) { // webkit or chrome
				img.src = window['webkitURL'].createObjectURL(blob);
			} else {
				console.error("your browser don't support create image from arraybuffer!");
				return;
			}

			img.onload = () => {
				onLoaded && onLoaded.call(thisObj, null, img);
			};
		}
	}
}