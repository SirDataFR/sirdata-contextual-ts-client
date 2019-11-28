import {apiUrl} from "./contextual";
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Model, ModelInterface, Serializable} from "./models/model";
import {ErrorResponse} from "./rest/error";

export class HttpClient {
    private _token: string;
    private _api_url: string;
    private httpClient: AxiosInstance;

    constructor(token: string) {
        this._token = token;
        this._api_url = apiUrl;
        this.httpClient = axios.create(<AxiosRequestConfig>{
            baseURL: this._api_url,
            maxRedirects: 1,
        });
    }

    setTimeout(ms: number) {
        this.httpClient.defaults.timeout = ms;
    }

    setHeaders(options: {}): AxiosRequestConfig {
        options = options == undefined ? {} : options;
        options['headers'] = options['headers'] !== undefined ? options['headers'] : {};
        options['headers']['Content-Type'] = "application/json";
        if (this._token !== undefined) {
            options['headers']['authorization'] = this._token;
        }
        return <AxiosRequestConfig>options;
    }

    setApiUrl(url: string) {
        this._api_url = url;
    }

    public async get(model: Model, path: string, options?: any): Promise<ModelInterface> {
        try {
            const resp = await this.httpClient.get(path, this.setHeaders(options)) as AxiosResponse<ModelInterface>;
            model.load(resp.data);
            return model
        } catch (error) {
            throw new ErrorResponse(error);
        }
    }

    public async post(model: Model, path: string, body: Serializable, options?: {}): Promise<ModelInterface> {
        try {
            const resp = await this.httpClient.post(path, body.toJson(), this.setHeaders(options)) as AxiosResponse<ModelInterface>;
            model.load(resp.data);
            return model
        } catch (error) {
            throw new ErrorResponse(error);
        }
    }
}
