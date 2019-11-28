import { Rest } from "./rest";
import { PageCategorizationResponse } from "../models/page_categorization_response";
export declare class RestContextual extends Rest {
    categorizePageFromHTMLContent(html?: string): Promise<PageCategorizationResponse>;
    categorizePageFromTextContent(text?: string): Promise<PageCategorizationResponse>;
    categorizePageByUrl(): Promise<PageCategorizationResponse>;
}
