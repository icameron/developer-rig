export declare const parseUrl: (url: string) => {
    host: string;
};
export declare function appendQueryParams<T>(url: string, options: T): string;
export declare const getFileType: (url?: string | null | undefined) => string;
