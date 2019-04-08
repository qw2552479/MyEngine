namespace QuickEngine {
	export const enum XHRState {
		Uninitialized = 0,  // 初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。
		Open,               // open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
		Sent,	            // send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
		Receiving,          // 所有响应头部都已经接收到。响应体开始接收但未完成。
		Loaded              // HTTP 响应已经完全接收。
	}

	/**
	 * @class
	 * @static
	 */
	export class Http /** @lends QuickEngine.Http */{

		private static _send(method, url, data, header, callback?: (status: number, data: Blob) => void, thisObj?: any, isAsync: boolean = true): XMLHttpRequest {
			let xhr: XMLHttpRequest = new XMLHttpRequest();

			if (header) {
				// 设置http头
				for (let k in header) {
					xhr.setRequestHeader(k, header[k]);
				}
			} else {

			}

			let body;
			if (data) {
				if (method === 'GET') {
					// 拼接get参数
					if (typeof data === 'object') {
						let keys = Object.keys(data);
						for (let i = 0; i < keys.length; i++) {
							let k = data[keys[i]];
							body += k + '=' + data[k];
							if (i >= keys.length - 1) {
								continue;
							}
							body += '&';
						}
					} else {
						body = data;
					}
				}
			}

			xhr.onreadystatechange = function (ev: ProgressEvent) {
				if (xhr.readyState == XHRState.Loaded) {
					if (xhr.status == 200) {
						if (callback) {
							callback.call(thisObj, xhr.status, xhr.response);
						}
					} else {

					}
				}
			};

			xhr.onerror = function (ev: Event) {
				if (callback) {
					callback.call(thisObj, 'error', null);
				}
			};

			xhr.open(method, url, isAsync);
			xhr.responseType = 'blob';
			xhr.send(body);

			return xhr;
		}

		/**
		 *
		 * @param url
		 * @param data
		 * @param header
		 * @param callback
		 * @param thisObj
		 * @param isAsync
		 */
		public static get(url: string, data?: string | Object, header?: { [key: string]: string }, callback?: (status: number, data: Blob) => void, thisObj?: any, isAsync: boolean = true): XMLHttpRequest {
			return this._send('GET', url, header, callback, thisObj, isAsync);
		}

		public static post(url: string, data?: string | Object, header?: { [key: string]: string }, callback?: (status: number, data: Blob) => void, thisObj?: any, isAsync: boolean = true): XMLHttpRequest {
			return this._send('POST', url, data, header, callback, thisObj, isAsync);
		}
	}

}