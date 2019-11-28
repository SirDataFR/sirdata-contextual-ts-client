import {Model, Serializable} from "./model";

export class PageContent extends Model implements Serializable {
    private content: string;

    setContent(content: string): PageContent {
        this.content = content;
        return this;
    }
}
