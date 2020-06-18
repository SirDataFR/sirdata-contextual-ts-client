import {Rest} from "./rest";
import {PageCategorizationResponse} from "../models/page_categorization_response";
import {PageContent} from "../models/page_content";
import {PageSanetizer} from "../utils/page_sanetizer";

export class RestContextual extends Rest {

    static contextualPath = '/contextual';

    async categorizePageFromHTMLContent(html?: HTMLElement, url?: string): Promise<PageCategorizationResponse> {
        return this.categorizePageFromTextContent(PageSanetizer.getTextFromDocument(html ? html : document.body), url)
    }

    async categorizePageFromTextContent(text?: string, url?: string): Promise<PageCategorizationResponse> {
        url = !url && document.location.href.length > 10 ? document.location.href : url;
        text = text ? text : PageSanetizer.getTextFromDocument();
        if (text.length < 300) {
            return this.categorizePageByUrl();
        }
        const pc = new PageContent();
        pc.setContent(text);
        const resp = await this.conf.post(new PageCategorizationResponse(), RestContextual.contextualPath + (url ? "?url=" + url : ""), pc);
        if (!resp) {
            return new PageCategorizationResponse();
        }
        return resp as PageCategorizationResponse
    }

    async categorizePageByUrl(url?: string): Promise<PageCategorizationResponse> {
        url = url ? url : document.location.href;
        if (window.top !== window.self && document.referrer) {
            url = document.referrer
        }
        if (url == "") {
            throw new DOMException("window.location.href is empty. At least an url is mandatory, contact support.");
        }
        return this.conf.get(new PageCategorizationResponse(), RestContextual.contextualPath + "?url=" + url) as Promise<PageCategorizationResponse>;
    }
}
