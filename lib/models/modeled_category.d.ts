import { Model } from "./model";
export declare class ModeledCategory extends Model {
    unique_id: number;
    name: string;
    taxonomy: string;
    tier1: string;
    tier2: string;
    relevancy: number;
}
