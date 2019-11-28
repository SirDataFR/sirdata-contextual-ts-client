import { AxiosRequestConfig } from 'axios';
import { Model, ModelInterface, Serializable } from "./models/model";
export declare class HttpClient {
    private _token;
    private _api_url;
    private httpClient;
    constructor(token: string);
    setTimeout(ms: number): void;
    setHeaders(options: {}): AxiosRequestConfig;
    setApiUrl(url: string): void;
    get(model: Model, path: string, options?: any): Promise<ModelInterface>;
    post(model: Model, path: string, body: Serializable, options?: {}): Promise<ModelInterface>;
}
