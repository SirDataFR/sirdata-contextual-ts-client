"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var virtual_keyword_1 = require("./virtual_keyword");
var model_1 = require("./model");
var category_1 = require("./category");
var PageCategorizationResponse = /** @class */ (function (_super) {
    __extends(PageCategorizationResponse, _super);
    function PageCategorizationResponse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._brand_safety_categories = null;
        _this._iab_categories = null;
        _this._custom_categories = null;
        _this._virtual_keywords = null;
        return _this;
    }
    Object.defineProperty(PageCategorizationResponse.prototype, "brand_safety_categories", {
        get: function () {
            return this._brand_safety_categories ? this._brand_safety_categories : [];
        },
        set: function (values) {
            if (!values) {
                return;
            }
            var list = [];
            for (var i in values) {
                list.push(new category_1.Category(values[i]));
            }
            this._brand_safety_categories = list;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCategorizationResponse.prototype, "iab_categories", {
        get: function () {
            return this._iab_categories ? this._iab_categories : [];
        },
        set: function (values) {
            if (!values) {
                return;
            }
            var list = [];
            for (var i in values) {
                list.push(new category_1.Category(values[i]));
            }
            this._iab_categories = list;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCategorizationResponse.prototype, "custom_categories", {
        get: function () {
            return this._custom_categories ? this._custom_categories : [];
        },
        set: function (values) {
            if (!values) {
                return;
            }
            var list = [];
            for (var i in values) {
                list.push(new category_1.Category(values[i]));
            }
            this._custom_categories = list;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCategorizationResponse.prototype, "virtual_keywords", {
        get: function () {
            return this._virtual_keywords ? this._virtual_keywords : [];
        },
        set: function (values) {
            if (!values) {
                return;
            }
            var list = [];
            for (var i in values) {
                list.push(new virtual_keyword_1.VirtualKeyword(values[i]));
            }
            this._virtual_keywords = list;
        },
        enumerable: true,
        configurable: true
    });
    PageCategorizationResponse.prototype.getIABCategoryIds = function () {
        var list = [];
        if (this.iab_categories == null) {
            return [];
        }
        for (var i in this.iab_categories) {
            list.push(this.iab_categories[i].unique_id);
        }
        return list;
    };
    PageCategorizationResponse.prototype.getCustomCategoryIds = function () {
        var list = [];
        if (this.custom_categories == null) {
            return [];
        }
        for (var i in this.custom_categories) {
            list.push(this.custom_categories[i].unique_id);
        }
        return list;
    };
    PageCategorizationResponse.prototype.getBrandSafetyCategoryIds = function () {
        var list = [];
        if (this.brand_safety_categories == null) {
            return [];
        }
        for (var i in this.brand_safety_categories) {
            list.push(this.brand_safety_categories[i].unique_id);
        }
        return list;
    };
    PageCategorizationResponse.prototype.getCategoryIds = function () {
        var list = [];
        if (this.iab_categories != null) {
            for (var i in this.iab_categories) {
                list.push(String(this.iab_categories[i].unique_id));
            }
        }
        if (this.custom_categories != null) {
            for (var i in this.custom_categories) {
                list.push("sd_" + String(this.custom_categories[i].unique_id));
            }
        }
        if (this.brand_safety_categories != null) {
            for (var i in this.brand_safety_categories) {
                list.push("bs_" + String(this.brand_safety_categories[i].unique_id));
            }
        }
        return list;
    };
    PageCategorizationResponse.prototype.getKeywords = function () {
        var list = [];
        if (this.virtual_keywords == null) {
            return [];
        }
        for (var i in this.virtual_keywords) {
            list.push(this.virtual_keywords[i].name);
        }
        return list;
    };
    return PageCategorizationResponse;
}(model_1.Model));
exports.PageCategorizationResponse = PageCategorizationResponse;
