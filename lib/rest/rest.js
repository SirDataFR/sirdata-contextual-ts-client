"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rest = /** @class */ (function () {
    function Rest(conf) {
        this.conf = conf;
    }
    Rest.params = function (path, params) {
        for (var index in params) {
            var search = '{' + index + '}';
            path = path.replace(search, params[index]);
        }
        return path;
    };
    Rest.encodeQueryData = function (data) {
        var ret = [];
        for (var d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    };
    return Rest;
}());
exports.Rest = Rest;
