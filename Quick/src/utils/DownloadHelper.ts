namespace QuickEngine {

    export interface AsyncCallback {

        onSuccess?: (data: any) => any;

        onFail?: (error: number, data: any) => any;
    }

    export const ResponseType_Default: string = "";                //""(空字符串)	字符串(默认值)
    export const ResponseType_ArrayBuffer = "arraybuffer"; //"arraybuffer"	ArrayBuffer
    export const ResponseType_Blob = "blob";               //"blob"	    Blob
    export const ResponseType_Document = "document";       //"document"	Document
    export const ResponseType_Json = "json";               //"json"	    JavaScript 对象，解析自服务器传递回来的JSON 字符串。
    export const ResponseType_Text = "text";               //"text"	    字符串

    export module DownloadHelper {

        const MaxDownloadCount = 4;

        export interface DownloadTask {
            url: string;
            responseType?: string;
            callback?: AsyncCallback;
        }

        let _downloadQueue: DownloadTask[] = [];
        let _taskCount: number = 0;

        export function download(task: DownloadTask) {
            _downloadQueue.push(task);
            _download();
        }

        function _download() {

            if (_taskCount >= MaxDownloadCount || _downloadQueue.length == 0) {
                return;
            }

            _taskCount++;
            let task = _downloadQueue.pop();

            let request = new XMLHttpRequest();
            (<any>request).responseType = !!!task.responseType ? ResponseType_Default : task.responseType;
            request.open('GET', task.url, true);

            request.onload = function (event: Event) {

                let response = request.response;

                if (request.status === 200 || request.status === 0) {

                    if (task.callback && task.callback.onSuccess) {
                        task.callback.onSuccess(response);
                    }

                } else {
                    if (task.callback && task.callback.onFail) {
                        task.callback.onFail(request.status, request.statusText);
                    }
                }

                _taskCount--;
                _download();

                task = undefined;
            }

            request.onerror = function () {

                if (task.callback && task.callback.onFail) {
                    task.callback.onFail(request.status, request.statusText);
                }

                _taskCount--;
                _download();

                task = undefined;
            }
        }
    }

}