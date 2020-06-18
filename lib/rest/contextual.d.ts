import { Rest } from "./rest";
import { PageCategorizationResponse } from "../models/page_categorization_response";
export declare class RestContextual extends Rest {
    static contextualPath: string;
    categorizePageFromHTMLContent(html?: HTMLElement, url?: string): Promise<PageCategorizationResponse>;
    categorizePageFromTextContent(text?: string, url?: string): Promise<PageCategorizationResponse>;
    categorizePageByUrl(url?: string): Promise<PageCategorizationResponse>;
}
