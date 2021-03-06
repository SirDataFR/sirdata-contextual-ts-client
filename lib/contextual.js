"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("./http");
var contextual_1 = require("./rest/contextual");
var page_categorization_response_1 = require("./models/page_categorization_response");
exports.apiUrl = "https://contextual.sirdata.io/api/v1/public";
var objectPerToken = new Map();
var cacheUrlCategorized = new Map();
function NewContextual(token) {
    if (objectPerToken.get(token) === undefined) {
        objectPerToken.set(token, new Contextual(token));
    }
    return objectPerToken.get(token);
}
exports.NewContextual = NewContextual;
var Contextual = /** @class */ (function () {
    function Contextual(token) {
        this._restContextual = null;
        this._currentPagePromise = null;
        this._http = new http_1.HttpClient(token);
    }
    Contextual.prototype.setApiUrl = function (url) {
        this._http.setApiUrl(url);
        return this;
    };
    Contextual.prototype.setTimeout = function (ms) {
        this._http.setTimeout(ms);
        return this;
    };
    Object.defineProperty(Contextual.prototype, "rest", {
        get: function () {
            return this._restContextual !== null ? this._restContextual : this._restContextual = new contextual_1.RestContextual(this._http);
        },
        enumerable: true,
        configurable: true
    });
    Contextual.prototype.categorizeCurrentPage = function (hideError) {
        if (hideError === void 0) { hideError = true; }
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this._currentPagePromise === null) {
                            this._currentPagePromise = this.rest.categorizePageFromTextContent();
                        }
                        return [4 /*yield*/, this._currentPagePromise];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        if (hideError) {
                            return [2 /*return*/, new page_categorization_response_1.PageCategorizationResponse()];
                        }
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Contextual.SetCategorizeUrlCache = function (url, categorized) {
        cacheUrlCategorized.set(url, categorized);
    };
    Contextual.GetCategorizeFromCache = function (url) {
        if (cacheUrlCategorized.has(url)) {
            var p = new page_categorization_response_1.PageCategorizationResponse();
            p.load(cacheUrlCategorized.get(url));
            return p;
        }
        return null;
    };
    Contextual.minRelevancy = 0.5;
    Contextual.minBrandSafetyRelevancy = 0.2;
    Contextual.minModeledRelevancy = 0.3;
    return Contextual;
}());
exports.Contextual = Contextual;
