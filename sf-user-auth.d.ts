/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
/**
 * * SfUserAuth element.
 *
 * @fires searchClick - When the user presses the enter key in the search input
 * @property onArgs - Function to get url arguments
 * @property appName - Name of the application
 * @property apiId - AWS Api Gateway Id
 * @slot terms - Slot for holding terms & conditions content
 * @slot privacy - Slot for holding privacy policy content
 */
export declare class SfUserAuth extends LitElement {
    eventAccessTokenReceived: string;
    eventSignedOut: string;
    static styles: import("lit").CSSResult;
    logo: string;
    apiId: string;
    appName: string;
    email: string;
    name: string;
    otp: string;
    onArgs: () => string[];
    _SfUserAuthEmail: any;
    _SfUserAuthName: any;
    _SfUserAuthOtp: any;
    _SfUserAuthPrivacy: any;
    _SfUserAuthTerms: any;
    _SfUserAuthSubmit: any;
    _SfUserAuthLoader: any;
    _SfUserAuthDivRowError: any;
    _SfUserAuthDivRowErrorMessage: any;
    _SfUserAuthDivRowSuccess: any;
    _SfUserAuthDivRowSuccessMessage: any;
    _SfUserAuthErrorName: any;
    _SfUserAuthErrorEmail: any;
    _SfUserAuthErrorOtp: any;
    signOut: () => void;
    validateTerms: () => any;
    validatePrivacy: () => any;
    validateEmail: (email: string) => boolean;
    validateName: (name: string) => boolean;
    validateOtp: (otp: string) => boolean;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    onResendSubmit: () => Promise<void>;
    onFormSubmit: () => Promise<boolean>;
    evalSubmit: () => void;
    onCheckedChange: () => void;
    onKeyUp: (location: string) => boolean;
    decorateSlots: () => void;
    copySlots: () => void;
    initListeners: () => void;
    initServices: () => Promise<void>;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    getUiSignIn(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-user-auth': SfUserAuth;
    }
}
//# sourceMappingURL=sf-user-auth.d.ts.map