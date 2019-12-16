import { VirtualKeyword } from "./virtual_keyword";
import { Model } from "./model";
import { Category } from "./category";
export declare class PageCategorizationResponse extends Model {
    private _brand_safety_categories;
    private _iab_categories;
    private _custom_categories;
    private _virtual_keywords;
    get brand_safety_categories(): Category[];
    set brand_safety_categories(values: Category[]);
    get iab_categories(): Category[];
    set iab_categories(values: Category[]);
    get custom_categories(): Category[];
    set custom_categories(values: Category[]);
    get virtual_keywords(): VirtualKeyword[];
    set virtual_keywords(values: VirtualKeyword[]);
    getIABCategoryIds(): number[];
    getCustomCategoryIds(): number[];
    getBrandSafetyCategoryIds(): number[];
    getCategoryIds(): string[];
    getKeywords(): string[];
}
