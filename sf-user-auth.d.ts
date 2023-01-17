/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
/**
 * SfUserAuth element.
 *
 * @fires searchClick - When the user presses the enter key in the search input
 * @property onArgs - Function to get url arguments
 * @slot unreadNotifications - Unread notifications array
 */
export declare class SfUserAuth extends LitElement {
    static styles: import("lit").CSSResult;
    onArgs: () => never[];
    _SfUserAuthEmail: any;
    _SfUserAuthPassword: any;
    _SfUserAuthSlottedCta: any;
    onFormSubmit(): boolean;
    decorateSlots: () => void;
    copySlots: () => void;
    initListeners: () => void;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-user-auth': SfUserAuth;
    }
}
//# sourceMappingURL=sf-user-auth.d.ts.map