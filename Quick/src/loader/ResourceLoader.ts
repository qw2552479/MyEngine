namespace QuickEngine {
    export module ResourceLoader {
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