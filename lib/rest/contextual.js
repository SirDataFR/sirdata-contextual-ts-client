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
    RestContextual.prototype.categorizePageFromHTMLContent = function (html, url) {
        return this.categorizePageFromTextContent(this.getTextFromDocument(html ? html : window.document.body), url);
    };
    RestContextual.prototype.categorizePageFromTextContent = function (text, url) {
        text = text ? text : this.getTextFromDocument();
        var pc = new page_content_1.PageContent();
        pc.setContent(text);
        return this.conf.post(new page_categorization_response_1.PageCategorizationResponse(), contextualPath + (url ? "?url=" + url : ""), pc);
    };
    RestContextual.prototype.categorizePageByUrl = function (url) {
        url = url ? url : window.location.href;
        return this.conf.get(new page_categorization_response_1.PageCategorizationResponse(), contextualPath + "?url=" + url);
    };
    RestContextual.prototype.getTextFromDocument = function (body) {
        body = body ? body : window.document.body;
        var articleElements = body.getElementsByTagName("article");
        if (articleElements.length > 0 && articleElements[0].innerText.length > 500
            && articleElements[0].getElementsByTagName('h1').length > 0) {
            return articleElements[0].innerText;
        }
        var h1Elements = body.getElementsByTagName('h1');
        if (h1Elements.length > 0) {
            var pSize = body.getElementsByTagName('p').length;
            var element = h1Elements[0].parentElement;
            while (element.parentElement && element.tagName != "BODY") {
                element = element.parentElement;
                if (element.getElementsByTagName('p').length >= pSize / 3
                    && element.innerText.length > 4000) {
                    return element.innerText;
                }
            }
        }
        return body.innerText;
    };
    return RestContextual;
}(rest_1.Rest));
exports.RestContextual = RestContextual;
