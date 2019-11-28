export interface ModelInterface {
    load(o: object): any;
}
export interface Serializable {
    toJson(): string;
    getJsonParameters(): {};
}
export declare class Model implements ModelInterface, Serializable {
    load(o: {}): void;
    constructor(o?: {});
    toJson(): string;
    getJsonParameters(): {};
}
