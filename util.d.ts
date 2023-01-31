declare function writeCookie(key: string, value: string): void;
declare function clearCookie(key: string): void;
declare function readCookie(key: string): string;
declare const exportFunctions: {
    writeCookie: typeof writeCookie;
    readCookie: typeof readCookie;
    clearCookie: typeof clearCookie;
};
export default exportFunctions;
//# sourceMappingURL=util.d.ts.map