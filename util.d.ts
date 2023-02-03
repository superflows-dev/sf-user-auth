declare function writeCookie(key: string, value: string): void;
declare function clearCookie(key: string): void;
declare function readCookie(key: string): string;
declare function callApi(url: string, data: string, authorization: any): Promise<unknown>;
declare const exportFunctions: {
    writeCookie: typeof writeCookie;
    readCookie: typeof readCookie;
    clearCookie: typeof clearCookie;
    callApi: typeof callApi;
};
export default exportFunctions;
//# sourceMappingURL=util.d.ts.map