import {Rest} from "./rest";
import {PageCategorizationResponse} from "../models/page_categorization_response";
import {PageContent} from "../models/page_content";

let contextualPath = '/contextual';

export class RestContextual extends Rest {

    categorizePageFromHTMLContent(html?: HTMLElement, url?: string): Promise<PageCategorizationResponse> {
        return this.categorizePageFromTextContent(this.getTextFromDocument(html ? html : window.document.body), url)
    }

    categorizePageFromTextContent(text?: string, url?: string): Promise<PageCategorizationResponse> {
        url = !url && window.location.href.length > 10 ? window.location.href : url;
        text = text ? text : this.getTextFromDocument();
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

    getTextFromDocument(body?: HTMLElement): string {
        body = body ? body : window.document.body;

        const articleElements = body.getElementsByTagName("article");
        if (articleElements.length > 0 && articleElements[0].innerText.length > 300
            && articleElements[0].getElementsByTagName('h1').length > 0) {
            return articleElements[0].innerText;
        }

        const h1Elements = body.getElementsByTagName('h1');
        if (h1Elements.length > 0) {
            const pSize = body.getElementsByTagName('p').length;
            let element = h1Elements[0].parentElement;
            while (element.parentElement && element.tagName != "BODY") {
                element = element.parentElement;
                if (element.getElementsByTagName('p').length >= pSize / 3
                    && element.innerText.length > 4000) {
                    return element.innerText;
                }
            }
        }

        return body.innerText;
    }
}
