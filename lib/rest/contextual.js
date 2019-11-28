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
var rest_1 = require("./rest");
var page_categorization_response_1 = require("../models/page_categorization_response");
var page_content_1 = require("../models/page_content");
var contextualPath = '/contextual';
var RestContextual = /** @class */ (function (_super) {
    __extends(RestContextual, _super);
    function RestContextual() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RestContextual.prototype.categorizePageFromHTMLContent = function (html) {
        html = html ? html : document.body.innerHTML;
        var pc = new page_content_1.PageContent();
        pc.setContent(html);
        return this.conf.post(new page_categorization_response_1.PageCategorizationResponse(), contextualPath, pc);
    };
    RestContextual.prototype.categorizePageFromTextContent = function (text) {
        // TODO improve method to get text from html
        text = text ? text : document.body.innerText;
        var pc = new page_content_1.PageContent();
        pc.setContent(text);
        return this.conf.post(new page_categorization_response_1.PageCategorizationResponse(), contextualPath, pc);
    };
    RestContextual.prototype.categorizePageByUrl = function () {
        return this.conf.get(new page_categorization_response_1.PageCategorizationResponse(), contextualPath);
    };
    return RestContextual;
}(rest_1.Rest));
exports.RestContextual = RestContextual;
