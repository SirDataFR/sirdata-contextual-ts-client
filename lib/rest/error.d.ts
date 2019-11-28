import { AxiosError } from "axios";
export declare class ErrorResponse {
    private error;
    constructor(error: AxiosError);
    get message(): string;
    get exception(): string;
    get path(): string;
    get status(): number;
}
