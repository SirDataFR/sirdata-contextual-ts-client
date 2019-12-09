import {Contextual} from "../../src/contextual";

let jsonResponse   = `{"brand_safety_categories":[{"unique_id":386,"name":"Politics","taxonomy":"IAB","tier1":"Taxonomy IAB","tier2":"News and Politics","tier3":"Politics","relevancy":1.0}],"virtual_keywords":[{"name":"democrat","relevancy":1.0},{"name":"popular movement","relevancy":0.83},{"name":"paris","relevancy":0.74},{"name":"gerard depardieu","relevancy":0.7},{"name":"congresswomen","relevancy":0.64}]}`;

describe("test cache", () => {
    let u = '"http://lepoint.fr"';
    Contextual.SetCategorizeUrlCache(u, JSON.parse(jsonResponse));
    let categorizedUrl = Contextual.GetCategorizeFromCache(u);
    it("get cache", () => {
        if(categorizedUrl == null) {
            throw new Error("response from cache returned null")
        }
        if (categorizedUrl.brand_safety_categories.length == 0) {
            throw new Error("response from cache returned null")
        }
    });
});
