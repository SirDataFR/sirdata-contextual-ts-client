"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MinTextSize = 300;
var tagToRemove = ["aside", "iframe", "footer", "nav", "form", "script", "input"];
var classToRemove = ["GoogleActiveViewInnerContainer", "GoogleActiveViewElement"];
var PageSanetizer = /** @class */ (function () {
    function PageSanetizer() {
    }
    PageSanetizer.getTextFromDocument = function (element) {
        // iframe context, can't access to text
        if (!element && window.top !== window.self) {
            return "";
        }
        var body = element ? element.cloneNode(true) : window.document.body.cloneNode(true);
        var fullText = body.innerText;
        if (fullText.length < MinTextSize) {
            return fullText;
        }
        for (var i in tagToRemove) {
            var tags = body.getElementsByTagName(tagToRemove[i]);
            for (var i_1 = 0; i_1 < tags.length; i_1++) {
                tags.item(i_1).remove();
            }
        }
        for (var i in classToRemove) {
            var tags = body.getElementsByClassName(classToRemove[i]);
            for (var i_2 = 0; i_2 < tags.length; i_2++) {
                tags.item(i_2).remove();
            }
        }
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
