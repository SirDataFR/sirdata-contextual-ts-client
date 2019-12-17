import {Rest} from "./rest";
import {PageCategorizationResponse} from "../models/page_categorization_response";
import {PageContent} from "../models/page_content";

let contextualPath = '/contextual';

export class RestContextual extends Rest {

    categorizePageFromHTMLContent(html?: string, url?: string): Promise<PageCategorizationResponse> {
        html = html ? html : document.body.innerHTML;
        const pc = new PageContent();
        pc.setContent(html);
        return this.conf.post(new PageCategorizationResponse(), contextualPath + (url ? "?url=" + url : ""),
            pc) as Promise<PageCategorizationResponse>;
    }

    categorizePageFromTextContent(text?: string, url?: string): Promise<PageCategorizationResponse> {
        text = text ? text : document.body.innerText;
        const pc = new PageContent();
        pc.setContent(text);
        return this.conf.post(new PageCategorizationResponse(), contextualPath + (url ? "?url=" + url : ""),
            pc) as Promise<PageCategorizationResponse>;
    }

    categorizePageByUrl(url: string): Promise<PageCategorizationResponse> {
        url = url ? url : window.location.href;
        return this.conf.get(new PageCategorizationResponse(), contextualPath + "?url=" + url) as Promise<PageCategorizationResponse>;
    }


}
