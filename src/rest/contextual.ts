import {Rest} from "./rest";
import {PageCategorizationResponse} from "../models/page_categorization_response";
import {PageContent} from "../models/page_content";
import {PageSanetizer} from "../utils/page_sanetizer";

let contextualPath = '/contextual';

export class RestContextual extends Rest {

    categorizePageFromHTMLContent(html?: HTMLElement, url?: string): Promise<PageCategorizationResponse> {
        return this.categorizePageFromTextContent(PageSanetizer.getTextFromDocument(html ? html : window.document.body), url)
    }

    categorizePageFromTextContent(text?: string, url?: string): Promise<PageCategorizationResponse> {
        url = !url && window.location.href.length > 10 ? window.location.href : url;
        text = text ? text : PageSanetizer.getTextFromDocument();
        if (text.length < 300) {
            return this.categorizePageByUrl();
        }
        const pc = new PageContent();
        pc.setContent(text);
        return this.conf.post(new PageCategorizationResponse(), contextualPath + (url ? "?url=" + url : ""),
            pc) as Promise<PageCategorizationResponse>;
    }

    categorizePageByUrl(url?: string): Promise<PageCategorizationResponse> {
        url = url ? url : window.location.href;
        if (url == "") {
            throw new DOMException("window.location.href is empty. At least an url is mandatory, contact support.");
        }
        return this.conf.get(new PageCategorizationResponse(), contextualPath + "?url=" + url) as Promise<PageCategorizationResponse>;
    }
}
