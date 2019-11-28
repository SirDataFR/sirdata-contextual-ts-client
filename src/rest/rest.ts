import {HttpClient} from "../http";

export class Rest {
    protected conf: HttpClient;

    constructor(conf: HttpClient) {
        this.conf = conf;
    }

    static params(path: string, params: {}): string {
        for (let index in params) {
            let search = '{' + index + '}';
            path = path.replace(search, params[index]);
        }
        return path;
    }

    static encodeQueryData(data: {}): string {
        let ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }
}
