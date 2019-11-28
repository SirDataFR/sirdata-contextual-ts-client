import {Model} from "./model";

export class Category extends Model {
    unique_id: number;
    name: string;
    taxonomy: string;
    tier1: string;
    tier2: string;
    tier3: string;
    tier4: string;
    tier5: string;
    revelency: number;
}
