"use strict";
exports.__esModule = true;
/**
 * Promise class
 * @class
 */
var Promise = /** @class */ (function () {
    /**
     * create a Promise execute
     */
    function Promise(execute) {
        /**
         * promise process status
         */
        this.status = 'pending';
        /**
         * promise executed callback
         */
        this.resolves = [];
        this.rejects = [];
        var onFulfilled = this.fulfilled.bind(this);
        var onRejected = this.rejected.bind(this);
        try {
            execute(onFulfilled, onRejected);
        }
        catch (e) {
            onRejected(e);
        }
    }
    /**
     * add callback
     * @param {Function} resolve - on resolved callback
     * @param {Function} reject - on rejected callback
     */
    Promise.prototype.then = function (resolve, reject) {
        this.resolves.push(resolve);
        if (reject) {
            this.rejects.push(reject);
        }
        // if already done, execute left callbacks
        if (this.status === 'rejected') {
            this.callback(this.rejects);
        }
        else if (this.status === 'fulfilled') {
            this.callback(this.resolves);
        }
    };
    /**
     * add rejected callback
     * @param {Function} reject - on rejected callback
     */
    Promise.prototype["catch"] = function (reject) {
        this.rejects.push(reject);
        if (this.status === 'rejected') {
            this.callback(this.rejects);
        }
    };
    /**
     * on promise resolved callback
     * @param {any} result - promise result
     */
    Promise.prototype.fulfilled = function (result) {
        this.status = 'fulfilled';
        this.result = result;
        this.callback(this.resolves);
    };
    /**
     * on promise rejected callback
     * @param {any} reason - promise rejected reason or Error
     */
    Promise.prototype.rejected = function (reason) {
        this.status = 'rejected';
        this.result = reason;
        this.callback(this.rejects);
    };
    /**
     * execute callbacks
     * @param {Array<Function>} callbacks
     */
    Promise.prototype.callback = function (callbacks) {
        var callback;
        while (callback = callbacks.shift()) {
            callback(this.result);
        }
    };
    /**
     * execute multi promises
     * @param {Array<Promise>} promises - promise or result list
     */
    Promise.all = function (promises) {
        var results = [];
        var leftCount = promises.length;
        return new Promise(function (resolve, reject) {
            var setResult = function (key, result) {
                results[key] = result;
                leftCount--;
                if (leftCount === 0) {
                    resolve(results);
                }
            };
            promises.forEach(function (promise, key) {
                if (promise instanceof Promise) {
                    promise.then(function (result) {
                        setResult(key, result);
                    }, reject);
                }
                else {
                    setResult(key, promise);
                }
            });
        });
    };
    return Promise;
}());
exports["default"] = Promise;
