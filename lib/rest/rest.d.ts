import { HttpClient } from "../http";
export declare class Rest {
    protected conf: HttpClient;
    constructor(conf: HttpClient);
    static params(path: string, params: {}): string;
    static encodeQueryData(data: {}): string;
}
