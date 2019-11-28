import { Model, Serializable } from "./model";
export declare class PageContent extends Model implements Serializable {
    private content;
    setContent(content: string): PageContent;
}
