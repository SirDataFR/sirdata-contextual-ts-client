"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var page_categorization_response_1 = require("./models/page_categorization_response");
var cacheUrlCategorized = new Map();
function SetCategorizeUrlCache(url, categorized) {
    cacheUrlCategorized.set(url, categorized);
}
exports.SetCategorizeUrlCache = SetCategorizeUrlCache;
function GetCategorizeFromCache(url) {
    if (cacheUrlCategorized.has(url)) {
        return new page_categorization_response_1.PageCategorizationResponse(cacheUrlCategorized.get(url));
    }
    return null;
}
exports.GetCategorizeFromCache = GetCategorizeFromCache;
