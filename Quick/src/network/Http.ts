namespace QuickEngine {
    export const enum XHRState {
        Uninitialized = 0,  // 初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。
        Open,               // open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
        Sent,	            // send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
        Receiving,          // 所有响应头部都已经接收到。响应体开始接收但未完成。
        Loaded              // HTTP 响应已经完全接收。
    }

    export interface IAjaxOptions {
        url: string;
        method: string; // string 'GET' 'POST' 'DELETE'
        responseType: XMLHttpRequestResponseType;
        async?: boolean; //  boolean true:异步请求 false:同步请求 required
        data?: any; // any 请求参数,data需要和请求头Content-Type对应
        headers?: { [key: string]: string }; // object 请求头
        timeout?: number; // string 超时时间:0表示不设置超时
        callback?: (err: string, data: any, xhr: XMLHttpRequest, status: number) => void;
        thisObj?: Object;
    }

    /**
     * @class
     * @static
     */
    export class Http /** @lends QuickEngine.Http */ {
        static _defaultOptions: IAjaxOptions = {
            url: '', // string
            method: 'GET', // string 'GET' 'POST' 'DELETE'
            responseType: 'json', // string 期望的返回数据类型:'json' 'text' 'document' ...
            async: true, //  boolean true:异步请求 false:同步请求 required
            data: null, // any 请求参数,data需要和请求头Content-Type对应
            headers: {}, // object 请求头
            timeout: 1000, // string 超时时间:0表示不设置超时
        };

        // 把参数data转为url查询参数
        static getUrlParam(url, data) {
            if (!data) {
                return '';
            }
            let paramsStr = data instanceof Object ? Http.getQueryString(data) : data;
            return (url.indexOf('?') !== -1) ? paramsStr : '?' + paramsStr;
        }

        // 获取ajax请求参数
        static getQueryData(data) {
            if (!data) {
                return null;
            }
            if (typeof data === 'string') {
                return data;
            }
            if (data instanceof FormData) {
                return data;
            }
            return Http.getQueryString(data);
        }

        // 把对象转为查询字符串
        static getQueryString(data) {
            let paramsArr = [];
            if (data instanceof Object) {
                Object.keys(data).forEach(key => {
                    let val = data[key];
                    // todo 参数Date类型需要根据后台api酌情处理
                    if (val instanceof Date) {
                        // val = dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
                    }
                    paramsArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
                });
            }
            return paramsArr.join('&');
        }

        public static ajax(options: IAjaxOptions) {
            options = options ? Object.assign(Http._defaultOptions, options) : Http._defaultOptions;
            QuickEngine.assert(!options.url || !options.method || !options.responseType, '参数有误');

            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function (ev: ProgressEvent) {
                switch (xhr.readyState) {
                    case XHRState.Uninitialized:
                        break;
                    case XHRState.Open:
                        break;
                    case XHRState.Sent:
                        break;
                    case XHRState.Receiving:
                        break;
                    case XHRState.Loaded:
                        let result;
                        let err;
                        const status = xhr.status;
                        if ((status >= 200 && status < 300) || status === 304) {
                            switch (xhr.responseType) {
                                case 'arraybuffer':
                                case 'blob':
                                case 'json':
                                    result = xhr.response;
                                    break;
                                case 'document':
                                    result = xhr.responseXML;
                                    break;
                                case 'text':
                                    result = xhr.responseText;
                                    break;
                                default:
                                    result = xhr.responseText;
                                    break;
                            }
                        } else if (status === 408){
                            err = 'timeout';
                        } else {
                            err = 'load failed: ' + url;
                        }
                        options.callback && options.callback.call(options.thisObj, err, result);
                        break;
                    default:
                        QuickEngine.Log.E('todo state: ' + xhr.readyState);
                        break;
                }
            };

            let url = options.url;
            let sendData;
            let method = options.method.toUpperCase();

            if (method === 'GET') {
                url += Http.getUrlParam(options.url, options.data);
            } else {
                sendData = Http.getQueryData(options.data);
            }

            for (const key of Object.keys(options.headers)) {
                xhr.setRequestHeader(key, options.headers[key]);
            }

            xhr.open(method, url, options.async);
            xhr.responseType = options.responseType;

            if (options.async && options.timeout) {
                xhr.timeout = options.timeout;
            }

            xhr.send(sendData);

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
        public static get(url: string, data?: any, callback?: (err: string, data: any, xhr: XMLHttpRequest, status: number) => void, thisObj?: any, isAsync: boolean = true): XMLHttpRequest {
            return this.ajax({
                url: url,
                method: 'GET',
                responseType: 'text',
                data: data,
                callback: callback,
                thisObj: thisObj,
                async: isAsync
            });
        }

        public static post(url: string, data?: any, callback?: (err: string, data: any, xhr: XMLHttpRequest, status: number) => void, thisObj?: any, isAsync: boolean = true): XMLHttpRequest {
            return this.ajax({
                url: url,
                method: 'POST',
                responseType: 'text',
                data: data,
                callback: callback,
                thisObj: thisObj,
                async: isAsync
            });
        }
    }
}