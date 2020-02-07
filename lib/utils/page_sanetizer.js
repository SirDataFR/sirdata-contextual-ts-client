"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MinTextSize = 300;
var tagToRemove = ["aside", "iframe", "footer", "nav", "form"];
var PageSanetizer = /** @class */ (function () {
    function PageSanetizer() {
    }
    PageSanetizer.getTextFromDocument = function (element) {
        var body = element ? element.cloneNode(true) : window.document.body.cloneNode(true);
        var fullText = body.innerText;
        if (fullText.length < MinTextSize) {
            return fullText;
        }
        tagToRemove.forEach(function (tagName) {
            var tags = body.getElementsByTagName(tagName);
            for (var i = 0; i < tags.length; i++) {
                tags.item(i).remove();
            }
        });
        if (body.innerText.length < MinTextSize) {
            return body.innerText;
        }
        var articleElements = body.getElementsByTagName("article");
        if (articleElements.length > 0 && articleElements[0].innerText.length > MinTextSize
            && articleElements[0].getElementsByTagName('h1').length > 0) {
            return articleElements[0].innerText;
        }
        var h1Elements = body.getElementsByTagName('h1');
        if (h1Elements.length > 0) {
            var totalTextLength = body.getElementsByTagName('p').length;
            var element_1 = h1Elements[0].parentElement;
            while (element_1.parentElement && element_1.tagName.toLowerCase() != "body") {
                element_1 = element_1.parentElement;
                if (element_1.tagName.toLowerCase() == "section") {
                    if (element_1.innerText.length > MinTextSize) {
                        return element_1.innerText;
                    }
                }
            }
            element_1 = h1Elements[0].parentElement;
            var totalPCount = body.getElementsByTagName("p").length;
            while (element_1.parentElement && element_1.tagName != "BODY") {
                element_1 = element_1.parentElement;
                if (element_1.innerText.length > MinTextSize &&
                    (element_1.innerText.length >= totalTextLength / 2 ||
                        element_1.getElementsByTagName("p").length >= totalPCount / 3)) {
                    return element_1.innerText;
                }
            }
        }
        return body.innerText.length < MinTextSize ? fullText : body.innerText;
    };
    return PageSanetizer;
}());
exports.PageSanetizer = PageSanetizer;
