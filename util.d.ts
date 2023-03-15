declare function writeCookie(key: string, value: string): void;
declare function clearCookie(key: string): void;
declare function readCookie(key: string): string;
declare function callApi(url: string, data: string, authorization: any): Promise<unknown>;
declare function goBack(): void;
declare function goTo(path: string): void;
declare const exportFunctions: {
    writeCookie: typeof writeCookie;
    readCookie: typeof readCookie;
    clearCookie: typeof clearCookie;
    callApi: typeof callApi;
    goBack: typeof goBack;
    goTo: typeof goTo;
};
export default exportFunctions;
//# sourceMappingURL=util.d.ts.map