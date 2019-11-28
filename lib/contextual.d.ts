import { RestContextual } from "./rest/contextual";
import { PageCategorizationResponse } from "./models/page_categorization_response";
export declare let apiUrl: string;
export declare function NewContextual(token: string): Contextual;
export declare class Contextual {
    private _http;
    private _restContextual;
    private _currentPagePromise;
    constructor(token: string);
    setApiUrl(url: string): Contextual;
    setTimeout(ms: number): this;
    get rest(): RestContextual;
    categorizeCurrentPage(hideError?: boolean): Promise<PageCategorizationResponse>;
}
