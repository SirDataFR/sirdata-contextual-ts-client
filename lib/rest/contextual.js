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
var page_sanetizer_1 = require("../utils/page_sanetizer");
var contextualPath = '/contextual';
var RestContextual = /** @class */ (function (_super) {
    __extends(RestContextual, _super);
    function RestContextual() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RestContextual.prototype.categorizePageFromHTMLContent = function (html, url) {
        return this.categorizePageFromTextContent(page_sanetizer_1.PageSanetizer.getTextFromDocument(html ? html : document.body), url);
    };
    RestContextual.prototype.categorizePageFromTextContent = function (text, url) {
        url = !url && document.location.href.length > 10 ? document.location.href : url;
        text = text ? text : page_sanetizer_1.PageSanetizer.getTextFromDocument();
        if (text.length < 300) {
            return this.categorizePageByUrl();
        }
        var pc = new page_content_1.PageContent();
        pc.setContent(text);
        return this.conf.post(new page_categorization_response_1.PageCategorizationResponse(), contextualPath + (url ? "?url=" + url : ""), pc);
    };
    RestContextual.prototype.categorizePageByUrl = function (url) {
        url = url ? url : document.location.href;
        if (window.top !== window.self && document.referrer) {
            url = document.referrer;
        }
        if (url == "") {
            throw new DOMException("window.location.href is empty. At least an url is mandatory, contact support.");
        }
        return this.conf.get(new page_categorization_response_1.PageCategorizationResponse(), contextualPath + "?url=" + url);
    };
    return RestContextual;
}(rest_1.Rest));
exports.RestContextual = RestContextual;
