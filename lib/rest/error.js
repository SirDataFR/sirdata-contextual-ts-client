"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorResponse = /** @class */ (function () {
    function ErrorResponse(error) {
        this.error = error;
    }
    Object.defineProperty(ErrorResponse.prototype, "message", {
        get: function () {
            return this.error.response ? this.error.response.data.message : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorResponse.prototype, "exception", {
        get: function () {
            return this.error.response ? this.error.response.data.exception : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorResponse.prototype, "path", {
        get: function () {
            return this.error.response ? this.error.response.data.path : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorResponse.prototype, "status", {
        get: function () {
            return this.error.response && this.error.response.data.status ? this.error.response.data.status : 0;
        },
        enumerable: true,
        configurable: true
    });
    return ErrorResponse;
}());
exports.ErrorResponse = ErrorResponse;
