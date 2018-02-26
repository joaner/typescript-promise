"use strict";
exports.__esModule = true;
var Promise = /** @class */ (function () {
    /**
     * create a Promise execute
     */
    function Promise(execute) {
        this.status = 'pending';
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
    Promise.prototype.then = function (resolve, reject) {
        this.resolves.push(resolve);
        if (reject) {
            this.rejects.push(reject);
        }
        if (this.status === 'rejected') {
            this.callback(this.rejects);
        }
        else if (this.status === 'fulfilled') {
            this.callback(this.resolves);
        }
    };
    Promise.prototype["catch"] = function (reject) {
        this.rejects.push(reject);
        if (this.status === 'rejected') {
            this.callback(this.rejects);
        }
    };
    Promise.prototype.fulfilled = function (result) {
        this.status = 'fulfilled';
        this.result = result;
        this.callback(this.resolves);
    };
    Promise.prototype.rejected = function (reason) {
        this.status = 'rejected';
        this.result = reason;
        this.callback(this.rejects);
    };
    Promise.prototype.callback = function (callbacks) {
        var callback;
        while (callback = callbacks.shift()) {
            callback(this.result);
        }
    };
    Promise.all = function (promises) {
        console.log(promises);
    };
    return Promise;
}());
exports["default"] = Promise;
