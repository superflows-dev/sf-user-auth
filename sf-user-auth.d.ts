/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
export declare class SfUserAuth extends LitElement {
    eventAccessTokenReceived: string;
    eventSignedOut: string;
    static styles: import("lit").CSSResult;
    logo: string;
    apiId: string;
    appName: string;
    email: string;
    name: string;
    reason: string;
    search: string;
    offset: number;
    otp: string;
    pageBlock: number;
    onArgs: () => string[];
    _SfUserAuthEmail: any;
    _SfUserAuthName: any;
    _SfUserAuthOtp: any;
    _SfUserAuthSearch: any;
    _SfUserAuthFilter: any;
    _SfUserAuthPrivacy: any;
    _SfUserAuthTerms: any;
    _SfUserAuthAdmin: any;
    _SfUserAuthActive: any;
    _SfUserAuthReason: any;
    _SfUserAuthLocked: any;
    _SfUserAuthUnlocked: any;
    _SfUserAuthLogs: any;
    _SfUserAuthSignout: any;
    _SfUserAuthSubmit: any;
    _SfUserAuthSearchSubmit: any;
    _SfUserAuthSubmitCancel: any;
    _SfUserAuthLoader: any;
    _SfUserAuthDivRowError: any;
    _SfUserAuthDivRowErrorMessage: any;
    _SfUserAuthDivRowSuccess: any;
    _SfUserAuthDivRowSuccessMessage: any;
    _SfUserAuthErrorName: any;
    _SfUserAuthErrorEmail: any;
    _SfUserAuthErrorOtp: any;
    _SfUserAuthTableContainer: any;
    _SfUserAuthPagesContainer: any;
    signOut: () => void;
    validateTerms: () => any;
    validatePrivacy: () => any;
    validateEmail: (email: string) => boolean;
    validateName: (name: string) => boolean;
    validateOtp: (otp: string) => boolean;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    insertLogsHTML: (data: any) => void;
    insertUserDetailHTML: (data: any) => void;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    onResendSubmit: () => Promise<void>;
    onFormSubmit: () => Promise<boolean>;
    evalSubmit: () => void;
    onCheckedChange: () => void;
    onKeyUp: (location: string) => boolean;
    onLocked: () => void;
    onUnlocked: () => void;
    onCancelUserDetails: () => void;
    onSearchClick: () => void;
    decorateSlots: () => void;
    copySlots: () => void;
    initState: () => Promise<void>;
    initListeners: () => void;
    fetchUserDetails: (email: string) => Promise<void>;
    fetchSignout: (email: string) => Promise<void>;
    fetchLogs: (offset: number, filterKey: string, filterString: string) => Promise<void>;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    getUiRefresh(): import("lit-html").TemplateResult<1>;
    getUiSignIn(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-user-auth': SfUserAuth;
    }
}
//# sourceMappingURL=sf-user-auth.d.ts.map