"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model(o) {
        if (o !== undefined) {
            this.load(o);
        }
    }
    Model.prototype.load = function (o) {
        for (var i in o) {
            this[i] = o[i];
        }
    };
    Model.prototype.toJson = function () {
        return JSON.stringify(this.getJsonParameters());
    };
    Model.prototype.getJsonParameters = function () {
        return this;
    };
    return Model;
}());
exports.Model = Model;
