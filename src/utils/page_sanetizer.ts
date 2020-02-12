const MinTextSize = 300;
const tagToRemove = ["aside", "iframe", "footer", "nav", "form", "script", "input"];

export class PageSanetizer {

    static getTextFromDocument(element?: HTMLElement): string {
        let body = element ? element.cloneNode(true) as HTMLElement : window.document.body.cloneNode(true) as HTMLElement;
        let fullText = body.innerText;
        if (fullText.length < MinTextSize) {
            return fullText;
        }
        for (let tagIndex in tagToRemove) {
            let tags = body.getElementsByTagName(tagToRemove[tagIndex]);
            for (let i = 0; i < tags.length; i++) {
                tags.item(i).remove()
            }
        }

        if (body.innerText.length < MinTextSize) {
            return body.innerText;
        }

        const articleElements = body.getElementsByTagName("article");
        if (articleElements.length > 0 && articleElements[0].innerText.length > MinTextSize
            && articleElements[0].getElementsByTagName('h1').length > 0) {
            return articleElements[0].innerText;
        }

        const h1Elements = body.getElementsByTagName('h1');
        if (h1Elements.length > 0) {
            const totalTextLength = body.getElementsByTagName('p').length;
            let element = h1Elements[0].parentElement;

            while (element.parentElement && element.tagName.toLowerCase() != "body") {
                element = element.parentElement;
                if (element.tagName.toLowerCase() == "section") {
                    if (element.innerText.length > MinTextSize) {
                        return element.innerText;
                    }
                }
            }

            element = h1Elements[0].parentElement;
            const totalPCount = body.getElementsByTagName("p").length;
            while (element.parentElement && element.tagName != "BODY") {
                element = element.parentElement;
                if (element.innerText.length > MinTextSize &&
                    (element.innerText.length >= totalTextLength / 2 ||
                        element.getElementsByTagName("p").length >= totalPCount / 3)) {
                    return element.innerText;
                }
            }

        }

        return body.innerText.length < MinTextSize ? fullText : body.innerText;
    }
}
