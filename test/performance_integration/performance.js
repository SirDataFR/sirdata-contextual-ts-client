//Options
var sirdataToken = "XXXXXXX"; //Paste your dedicated Token here
var runGPT = true; //false if no Ad Manager integration
var runAPN = true; //false if no Appnexus or alias bidder
var appnexusBidders = ["bidder_alias_1", "bidder_alias_2"]//Define bidders here, Appnexus aliases in this example
var minCategoryRelevancy = 0.5;
var minBrandSafetyRelevancy = 0.2;
//end. Do not edit below except to add modules loaders

// url to be process, if you have access to the canicocal url define it here
var urlToCategorize = window.top !== window.self && document.referer ? document.referer : document.location.href;
// to be compatible with AMP, t be removed if you can identify url to process
if (typeof AMP_CONTEXT_DATA != "undefined" && AMP_CONTEXT_DATA.canonicalUrl) {
    urlToCategorize = AMP_CONTEXT_DATA.canonicalUrl;
}

var funcPushCategories = function (cr) {
    var categoryIds = [];
    categoryIds = categoryIds.concat(iterCat(cr.brand_safety_categories, "bs_", minBrandSafetyRelevancy));
    categoryIds = categoryIds.concat(iterCat(cr.iab_categories, "", minCategoryRelevancy));
    categoryIds = categoryIds.concat(iterCat(cr.custom_categories, "sd_", minCategoryRelevancy));
    try {
        if (runGPT == true) {
            addSirdataGPTContextual((categoryIds ? categoryIds : null));
        }
    } catch (e) {
        console.log('could not load GPT from sirdata');
    }
    try {
        if (runAPN == true) {
            loadAppnexusBidder(appnexusBidders, (categoryIds ? categoryIds : []));
        }
    } catch (e) {
        console.log('could not load APN from sirdata');
    }
};

var loadCategorizeScript = function () {
    var prebidTag = document.createElement('script');
    prebidTag.type = 'text/javascript';
    prebidTag.src = 'https://contextual.sirdata.io/api/v1/public/script?token=' + sirdataToken + "&url=" + encodeURIComponent(urlToCategorize);
    var headPrebid = document.getElementsByTagName('head')[0];
    headPrebid.insertBefore(prebidTag, headPrebid.firstChild);
    prebidTag.onload = function () {
        var cr = sirdata.Contextual.GetCategorizeFromCache(urlToCategorize);
        if (cr) {
            funcPushCategories(cr);
        }
    };
};

var iterCat = function (categories, prefix, minRelevancy) {
    var list = [];
    if (categories && categories.length > 0) {
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].relevancy > minRelevancy) {
                list.push(prefix + categories[i].unique_id);
            }
        }
    }
    return list;
};

var req = new XMLHttpRequest();
req.onload = function (resp) {
    var cr = JSON.parse(resp.target.responseText);
    if (!cr || cr.retry !== undefined || cr.retry === true) {
        // load script to categorize url
        loadCategorizeScript();
        return
    }
    funcPushCategories(cr);
};
req.open("get", "https://contextual.sirdata.io/api/v1/public/contextual?crawl=0&token="
    + sirdataToken + "&url=" + encodeURIComponent(urlToCategorize), true);
req.send();

