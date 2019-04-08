namespace QuickEngine {
	/**
     * 资源类型枚举
     * @enum {number}
	 */
	export const enum ResType {
        Text,
        Json,
        Binary,
        Csv,
        Image,
        Sound,
    }

    /**
     * 资源加载状态
     */
    export const enum ResState {
        // 未加载
        UnLoaded,
        // 正在加载
        Loading,
        // 加载完成
        Loaded,
        // 准备完成
		Prepared,
		// 正在准备
		Preparing,
    }

    export module ResourceLoader {

        export class ResItem {
            name: string;
            url: string;
            type: ResType;
            state: ResState;
        }

        export function load(item: ResItem) {

        }        

        //http://www.w3school.com.cn/xmldom/dom_http.asp
        export function xhrload(url: string, callback?: (status: number, data: Blob) => void, thisObj?: any, isAsync: boolean = true): XMLHttpRequest {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = function (ev: ProgressEvent) {
                if (xhr.readyState == XHRState.Loaded) {
                    if (xhr.status == 200) {
                        if (callback) {
                            callback.call(thisObj, xhr.status, xhr.response);
                        }
                    }
                }
            }

            xhr.onerror = function (ev: Event) {

            }

            xhr.open("GET", url, isAsync);
            xhr.responseType = "blob";
            xhr.send(null);

            return xhr;
        }

        export function xhrload2(url: string, callback?: (status: number, data) => void, thisObj?: any, isAsync: boolean = true) {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = function (ev: ProgressEvent) {
                if (xhr.readyState == XHRState.Loaded) {
                    if (xhr.status == 200) {
                        if (callback) {
                            callback.call(thisObj, xhr.status, xhr.response);
                        }
                    }
                }
            }

            xhr.onerror = function (ev: Event) {

            }

            xhr.open("GET", url, isAsync);
            xhr.send(null);
        }
    }

}