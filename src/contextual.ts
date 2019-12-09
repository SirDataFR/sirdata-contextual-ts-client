import {HttpClient} from "./http";
import {RestContextual} from "./rest/contextual";
import {PageCategorizationResponse} from "./models/page_categorization_response";

export let apiUrl = "https://contextual.sddan.com/api/v1/public";

let objectPerToken = new Map();
let cacheUrlCategorized = new Map();

export function NewContextual(token: string): Contextual {
    if (objectPerToken.get(token) === undefined) {
        objectPerToken.set(token, new Contextual(token));
    }
    return objectPerToken.get(token) as Contextual;
}

export class Contextual {
    private _http: HttpClient;
    private _restContextual: RestContextual = null;
    private _currentPagePromise: Promise<PageCategorizationResponse> = null;

    constructor(token: string) {
        this._http = new HttpClient(token);
    }

    setApiUrl(url: string): Contextual {
        this._http.setApiUrl(url);
        return this;
    }

    setTimeout(ms: number) {
        this._http.setTimeout(ms);
        return this;
    }

    get rest(): RestContextual {
        return this._restContextual !== null ? this._restContextual : this._restContextual = new RestContextual(this._http);
    }

    async categorizeCurrentPage(hideError: boolean = true): Promise<PageCategorizationResponse> {
        try {
            if (this._currentPagePromise === null) {
                this._currentPagePromise = this.rest.categorizePageFromTextContent();
            }
            return await this._currentPagePromise
        } catch (error) {
            if (hideError) {
                return new PageCategorizationResponse();
            }
            throw error;
        }
    }

    static SetCategorizeUrlCache(url: string, categorized: {}) {
        cacheUrlCategorized.set(url, categorized);
    }

    static GetCategorizeFromCache(url: string): PageCategorizationResponse {
        if (cacheUrlCategorized.has(url)) {
            let p = new PageCategorizationResponse();
            p.load(cacheUrlCategorized.get(url));
            return p;
        }
        return null;
    }

}

