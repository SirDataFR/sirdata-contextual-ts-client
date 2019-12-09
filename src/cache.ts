import {PageCategorizationResponse} from "./models/page_categorization_response";

var cacheUrlCategorized = new Map();

export function SetCategorizeUrlCache(url: string, categorized: {}) {
    cacheUrlCategorized.set(url, categorized);
}

export function GetCategorizeFromCache(url: string): PageCategorizationResponse {
    if (cacheUrlCategorized.has(url)) {
        return new PageCategorizationResponse(cacheUrlCategorized.get(url));
    }
    return null;
}
