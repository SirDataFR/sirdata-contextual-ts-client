import {VirtualKeyword} from "./virtual_keyword";
import {Model} from "./model";
import {Category} from "./category";

export class PageCategorizationResponse extends Model {
    private _brand_safety_categories: Category[] = null;
    private _iab_categories: Category[] = null;
    private _custom_categories: Category[] = null;
    private _virtual_keywords: VirtualKeyword[] = null;

    get brand_safety_categories(): Category[] {
        return this._brand_safety_categories ? this._brand_safety_categories : [];
    }

    set brand_safety_categories(values: Category[]) {
        if (!values) {
            return;
        }
        let list = [];
        for (let i in values) {
            list.push(new Category(values[i]));
        }
        this._brand_safety_categories = list;
    }

    get iab_categories(): Category[] {
        return this._iab_categories ? this._iab_categories : [];
    }

    set iab_categories(values: Category[]) {
        if (!values) {
            return;
        }
        let list = [];
        for (let i in values) {
            list.push(new Category(values[i]));
        }
        this._iab_categories = list;
    }

    get custom_categories(): Category[] {
        return this._custom_categories ? this._custom_categories : [];
    }

    set custom_categories(values: Category[]) {
        if (!values) {
            return;
        }
        let list = [];
        for (let i in values) {
            list.push(new Category(values[i]));
        }
        this._custom_categories = list;
    }

    get virtual_keywords(): VirtualKeyword[] {
        return this._virtual_keywords ? this._virtual_keywords : [];
    }

    set virtual_keywords(values: VirtualKeyword[]) {
        if (!values) {
            return;
        }
        let list = [];
        for (let i in values) {
            list.push(new VirtualKeyword(values[i]));
        }
        this._virtual_keywords = list;
    }

    getIABCategoryIds(): number[] {
        var list = [];
        if (this.iab_categories == null) {
            return [];
        }
        for (let i in this.iab_categories) {
            list.push(this.iab_categories[i].unique_id);
        }
        return list
    }

    getCustomCategoryIds(): number[] {
        var list = [];
        if (this.custom_categories == null) {
            return [];
        }
        for (let i in this.custom_categories) {
            list.push(this.custom_categories[i].unique_id);
        }
        return list
    }

    getBrandSafetyCategoryIds(): number[] {
        var list = [];
        if (this.brand_safety_categories == null) {
            return [];
        }
        for (let i in this.brand_safety_categories) {
            list.push(this.brand_safety_categories[i].unique_id);
        }
        return list
    }

    getCategoryIds(): string[] {
        let list: string[] = [];
        if (this.iab_categories != null) {
            for (let i in this.iab_categories) {
                list.push(String(this.iab_categories[i].unique_id));
            }
        }

        if (this.custom_categories != null) {
            for (let i in this.custom_categories) {
                list.push("sd_" + String(this.custom_categories[i].unique_id));
            }
        }

        if (this.brand_safety_categories != null) {
            for (let i in this.brand_safety_categories) {
                list.push("bs_" + String(this.brand_safety_categories[i].unique_id));
            }
        }

        return list;
    }

    getKeywords(): string[] {
        var list = [];
        if (this.virtual_keywords == null) {
            return [];
        }
        for (let i in this.virtual_keywords) {
            list.push(this.virtual_keywords[i].name);
        }
        return list
    }
}
