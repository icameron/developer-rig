export interface ApiOptions {
    apiUrl?: string;
    authToken?: string;
}
export interface TokenResponse {
    token: string;
}
export interface NewRequestOptions {
    apiUrl?: string;
    body?: any;
    headers?: any;
    method: 'DELETE' | 'GET' | 'POST' | 'PUT';
}
export declare class Api {
    apiUrl: string;
    authToken?: string;
    private clientId;
    private defaultHeaders;
    authRequest<T>(request: Request): Promise<T>;
    doRequest<T>(request: Request): Promise<T>;
    newRequest(path: string, requestOptions: NewRequestOptions): Request;
    setApiOptions: (options: ApiOptions) => void;
    private checkError(response);
}
export declare const api: Api;
