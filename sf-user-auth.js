/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import Util from './util';
let SfUserAuth = class SfUserAuth extends LitElement {
    constructor() {
        super();
        this.eventAccessTokenReceived = 'accessTokenReceived';
        this.eventSignedOut = 'signedOut';
        this.search = "";
        this.offset = 0;
        this.onArgs = () => { return []; };
        this.signOut = () => {
            Util.clearCookie('refreshToken');
            const event = new CustomEvent(this.eventSignedOut, { detail: {}, bubbles: true, composed: true });
            this.dispatchEvent(event);
            //window.location.hash = '#auth/signin';
        };
        this.validateTerms = () => {
            return this._SfUserAuthTerms.checked;
        };
        this.validatePrivacy = () => {
            return this._SfUserAuthPrivacy.checked;
        };
        this.validateEmail = (email) => {
            if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                return true;
            }
            return false;
        };
        this.validateName = (name) => {
            if ((name + "").length > 3) {
                return true;
            }
            return false;
        };
        this.validateSearch = (searchString) => {
            if ((searchString + "").length > 1) {
                return true;
            }
            return false;
        };
        this.validateOtp = (otp) => {
            if ((otp + "").length !== 4) {
                return false;
            }
            return true;
        };
        this.clearMessages = () => {
            this._SfUserAuthDivRowError.style.display = 'none';
            this._SfUserAuthDivRowErrorMessage.innerHTML = '';
            this._SfUserAuthDivRowSuccess.style.display = 'none';
            this._SfUserAuthDivRowSuccessMessage.innerHTML = '';
        };
        this.setError = (msg) => {
            this._SfUserAuthDivRowError.style.display = 'flex';
            this._SfUserAuthDivRowErrorMessage.innerHTML = msg;
            this._SfUserAuthDivRowSuccess.style.display = 'none';
            this._SfUserAuthDivRowSuccessMessage.innerHTML = '';
        };
        this.setSuccess = (msg) => {
            this._SfUserAuthDivRowError.style.display = 'none';
            this._SfUserAuthDivRowErrorMessage.innerHTML = '';
            this._SfUserAuthDivRowSuccess.style.display = 'flex';
            this._SfUserAuthDivRowSuccessMessage.innerHTML = msg;
        };
        this.insertLogsHTML = (data, pages) => {
            var htmlStr = `
    <table>
    <tr>
      <th class="td-email">Email</th>
      <th class="td-timestamp">Timestamp</th>
      <th class="td-operation">Operation</th>
      <th class="td-httpcode">HttpCode</th>
    </tr>`;
            for (var i = 0; i < data.length; i++) {
                htmlStr += `
        <tr>
          <td class="td-email"><a href="#auth/userdetails/${data[i].email}">${data[i].email}</a></td>
          <td class="td-timestamp">${new Date(parseInt(data[i].timestamp)).toLocaleDateString() + ' ' + new Date(parseInt(data[i].timestamp)).toTimeString()}</td>
          <td class="td-operation">${data[i].operation}</td>
          <td class="td-httpcode">${data[i].httpCode}</td>
        </tr>
      `;
            }
            htmlStr += `</table>`;
            if (data.length === 0) {
                htmlStr = '<div class="no-records">No records found</div>';
            }
            this._SfUserAuthTableContainer.innerHTML = htmlStr;
            if (data.length > 0) {
                htmlStr = '<div class="pages-label">Pages</div>';
                if (pages < 5) {
                    for (var i = 1; i <= pages; i++) {
                        if (this.onArgs()[1] == null && i === 0) {
                            htmlStr += '<div class="pages-item-current"><strong>' + i + '</strong></div>';
                        }
                        else if (this.onArgs()[3] != null && parseInt(this.onArgs()[3]) / this.pageBlock === i - 1) {
                            htmlStr += '<div class="pages-item-current"><strong>' + i + '</strong></div>';
                        }
                        else {
                            if (this.search.length > 0) {
                                htmlStr += '<div class="pages-item"><a href="#auth/logs/' + this.onArgs()[1] + '/' + this.onArgs()[2] + '/' + ((i) - 1) * this.pageBlock + '">' + i + `</a></div>`;
                            }
                            else {
                                htmlStr += '<div class="pages-item"><a href="#auth/logs/_/_/' + ((i) - 1) * this.pageBlock + '">' + i + `</a></div>`;
                            }
                        }
                    }
                }
                else {
                    var setFilter = this.onArgs()[1];
                    var setSearch = this.onArgs()[2];
                    if (parseInt(this.onArgs()[3]) / this.pageBlock === 0) {
                        htmlStr += '<div class="pages-item-current"><strong>1</strong></div>';
                        htmlStr += '<div class="pages-item"><a href="#auth/logs/' + setFilter + '/' + setSearch + '/' + (1) * this.pageBlock + '">2</a></div>';
                        htmlStr += '<div class="pages-item-current">&nbsp;.&nbsp;.&nbsp;</div>';
                        htmlStr += '<div class="pages-item"><a href="#auth/logs/' + setFilter + '/' + setSearch + '/' + ((pages) - 1) * this.pageBlock + '">' + (pages) + `</a></div>`;
                    }
                    else if (parseInt(this.onArgs()[3]) / this.pageBlock === (pages - 1)) {
                        htmlStr += '<div class="pages-item"><a href="#auth/logs/' + setFilter + '/' + setSearch + '/0">' + (1) + `</a></div>`;
                        htmlStr += '<div class="pages-item-current">&nbsp;.&nbsp;.&nbsp;</div>';
                        htmlStr += '<div class="pages-item"><a href="#auth/logs/' + setFilter + '/' + setSearch + '/' + ((pages) - 2) * this.pageBlock + '">' + (pages - 1) + `</a></div>`;
                        htmlStr += '<div class="pages-item-current"><strong>' + (pages) + `</strong></div>`;
                    }
                    else {
                        htmlStr += '<div class="pages-item"><a href="#auth/logs/' + setFilter + '/' + setSearch + '/0">' + (1) + `</a></div>`;
                        if ((parseInt(this.onArgs()[3])) / this.pageBlock !== 1) {
                            htmlStr += '<div class="pages-item-current">&nbsp;.&nbsp;.&nbsp;</div>';
                            htmlStr += '<div class="pages-item"><a href="#auth/logs/' + setFilter + '/' + setSearch + '/' + (parseInt(this.onArgs()[3]) - this.pageBlock) + '">' + ((parseInt(this.onArgs()[3])) / this.pageBlock) + `</a></div>`;
                        }
                        htmlStr += '<div class="pages-item-current"><strong>' + ((parseInt(this.onArgs()[3])) / this.pageBlock + 1) + `</strong></div>`;
                        if ((parseInt(this.onArgs()[3])) / this.pageBlock !== (pages - 2)) {
                            htmlStr += '<div class="pages-item"><a href="#auth/logs/' + setFilter + '/' + setSearch + '/' + (parseInt(this.onArgs()[3]) + this.pageBlock) + '">' + ((parseInt(this.onArgs()[3])) / this.pageBlock + 2) + `</a></div>`;
                            htmlStr += '<div class="pages-item-current">&nbsp;.&nbsp;.&nbsp;</div>';
                        }
                        htmlStr += '<div class="pages-item"><a href="#auth/logs/' + setFilter + '/' + setSearch + '/' + ((pages) - 1) * this.pageBlock + '">' + (pages) + `</a></div>`;
                    }
                }
                this._SfUserAuthPagesContainer.innerHTML = htmlStr;
            }
        };
        this.insertUserDetailHTML = (data) => {
            this._SfUserAuthEmail.value = data.email;
            this.email = data.email;
            if (data.name != null) {
                this._SfUserAuthName.value = data.name;
                this.name = data.name;
            }
            else {
                this.name = "";
            }
            if (data.reason != null) {
                this._SfUserAuthReason.value = data.reason;
                this.reason = data.reason;
            }
            else {
                this.reason = "";
            }
            if (data.admin != null) {
                if (data.admin) {
                    this._SfUserAuthAdmin.setAttribute('checked', true);
                }
            }
            if (data.suspended != null) {
                if (data.suspended) {
                    this._SfUserAuthActive.removeAttribute('checked');
                }
                else {
                    this._SfUserAuthActive.setAttribute('checked', true);
                }
            }
            else {
                this._SfUserAuthActive.setAttribute('checked', true);
            }
        };
        this.prepareXhr = async (data, url, loaderElement, authorization) => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
            }
            return await Util.callApi(url, data, authorization);
        };
        this.onResendSubmit = async () => {
            this.clearMessages();
            const xhr = (await this.prepareXhr({ "email": this.onArgs()[1] }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/resend", this._SfUserAuthLoader, null));
            this._SfUserAuthLoader.innerHTML = '';
            if (xhr.status == 200) {
                this.setSuccess('Verification email sent again successfully!');
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.onFormSubmit = async () => {
            this.clearMessages();
            if (this.onArgs()[0] == 'signup') {
                const xhr = (await this.prepareXhr({ "name": this.name, "email": this.email }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/signup", this._SfUserAuthLoader, null));
                this._SfUserAuthLoader.innerHTML = '';
                if (xhr.status == 200) {
                    window.location.hash = '#auth/verify/' + this.email;
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            }
            else if (this.onArgs()[0] == 'signin') {
                const xhr = (await this.prepareXhr({ "email": this.email }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/signin", this._SfUserAuthLoader, null));
                this._SfUserAuthLoader.innerHTML = '';
                if (xhr.status == 200) {
                    window.location.hash = '#auth/verify/' + this.email;
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            }
            else if (this.onArgs()[0] == 'verify') {
                const xhr = (await this.prepareXhr({ "email": this.onArgs()[1], "otp": this.otp }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/verify", this._SfUserAuthLoader, null));
                this._SfUserAuthLoader.innerHTML = '';
                if (xhr.status == 200) {
                    this.setSuccess('Verification successful!');
                    const jsonRespose = JSON.parse(xhr.responseText);
                    const refreshToken = jsonRespose.data.refreshToken.token;
                    const email = jsonRespose.data.email.S;
                    Util.writeCookie('refreshToken', refreshToken);
                    Util.writeCookie('email', email);
                    window.location.hash = '#auth/refresh/' + this.onArgs()[1];
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
                }
            }
            else if (this.onArgs()[0] == 'userdetails') {
                const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                const xhr = (await this.prepareXhr({ "email": this.onArgs()[1], "name": this.name, "reason": this.reason, "admin": this._SfUserAuthAdmin.checked, "suspended": !this._SfUserAuthActive.checked }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/updateuser", this._SfUserAuthLoader, authorization));
                this._SfUserAuthLoader.innerHTML = '';
                if (xhr.status == 200) {
                    this.setSuccess('Update successful!');
                }
                else {
                    // const jsonRespose = JSON.parse(xhr.responseText);
                    // this.setError(jsonRespose.error);
                }
            }
            return false;
        };
        this.evalSubmit = () => {
            if (this.onArgs()[0] == 'signup') {
                if (this.validateName(this._SfUserAuthName.value) && this.validateEmail(this._SfUserAuthEmail.value) && this.validateTerms() && this.validatePrivacy()) {
                    this._SfUserAuthSubmit.disabled = false;
                }
                else {
                    this._SfUserAuthSubmit.disabled = true;
                }
            }
            else if (this.onArgs()[0] == 'signin') {
                if (this.validateEmail(this._SfUserAuthEmail.value)) {
                    this._SfUserAuthSubmit.disabled = false;
                }
                else {
                    this._SfUserAuthSubmit.disabled = true;
                }
            }
            else if (this.onArgs()[0] == 'verify') {
                if (this.validateOtp(this._SfUserAuthOtp.value)) {
                    this._SfUserAuthSubmit.disabled = false;
                }
                else {
                    this._SfUserAuthSubmit.disabled = true;
                }
            }
            else if (this.onArgs()[0] == 'admin') {
                if (this.validateEmail(this._SfUserAuthSearch.value)) {
                    this._SfUserAuthSearchSubmit.disabled = false;
                }
                else {
                    this._SfUserAuthSearchSubmit.disabled = true;
                }
            }
        };
        this.onCheckedChange = () => {
            this.evalSubmit();
        };
        this.onKeyUp = (location) => {
            switch (location) {
                case 'name':
                    if (this.validateName(this._SfUserAuthName.value)) {
                        this._SfUserAuthErrorName.style.display = 'none';
                    }
                    else {
                        this._SfUserAuthErrorName.style.display = 'block';
                    }
                    this.name = this._SfUserAuthName.value;
                    break;
                case 'email':
                    if (this.validateEmail(this._SfUserAuthEmail.value)) {
                        this._SfUserAuthErrorEmail.style.display = 'none';
                    }
                    else {
                        this._SfUserAuthErrorEmail.style.display = 'block';
                    }
                    this.email = this._SfUserAuthEmail.value;
                    break;
                case 'otp':
                    if (this.validateOtp(this._SfUserAuthOtp.value)) {
                        this._SfUserAuthErrorOtp.style.display = 'none';
                    }
                    else {
                        this._SfUserAuthErrorOtp.style.display = 'block';
                    }
                    this.otp = this._SfUserAuthOtp.value;
                    break;
                case 'search':
                    this.search = this._SfUserAuthSearch.value;
                    //this.filter = this._SfUserAuthFilter.value;  
                    break;
                case 'reason':
                    this.reason = this._SfUserAuthReason.value;
                    break;
                default:
            }
            this.evalSubmit();
            return false;
        };
        this.onLoaded = () => {
            this._SfUserAuthUnlocked.style.display = 'none';
            this._SfUserAuthLocked.style.display = 'none';
            this._SfUserAuthLogs.style.display = 'none';
            this._SfUserAuthSignout.style.display = 'none';
            this._SfUserAuthSubmit.style.display = 'none';
            this._SfUserAuthName.setAttribute('disabled', true);
            this._SfUserAuthEmail.setAttribute('disabled', true);
            this._SfUserAuthAdmin.setAttribute('disabled', true);
            this._SfUserAuthActive.setAttribute('disabled', true);
            this._SfUserAuthReason.setAttribute('disabled', true);
        };
        this.onLocked = () => {
            this._SfUserAuthUnlocked.style.display = 'none';
            this._SfUserAuthLocked.style.display = 'block';
            this._SfUserAuthName.setAttribute('disabled', true);
            this._SfUserAuthEmail.setAttribute('disabled', true);
            this._SfUserAuthAdmin.setAttribute('disabled', true);
            this._SfUserAuthActive.setAttribute('disabled', true);
            this._SfUserAuthReason.setAttribute('disabled', true);
            this._SfUserAuthSubmit.style.display = 'none';
            this._SfUserAuthSignout.style.display = 'block';
            this._SfUserAuthLogs.style.display = 'block';
        };
        this.onUnlocked = () => {
            this._SfUserAuthLocked.style.display = 'none';
            this._SfUserAuthUnlocked.style.display = 'block';
            this._SfUserAuthName.removeAttribute("disabled");
            this._SfUserAuthAdmin.removeAttribute("disabled");
            this._SfUserAuthActive.removeAttribute("disabled");
            this._SfUserAuthReason.removeAttribute("disabled");
            this._SfUserAuthSubmit.style.display = 'block';
            this._SfUserAuthSignout.style.display = 'none';
            this._SfUserAuthLogs.style.display = 'none';
        };
        this.onCancelUserDetails = () => {
            window.history.back();
        };
        this.onSearchClick = () => {
            if (this.onArgs()[0] == 'admin') {
                window.location.href = '#auth/userdetails/' + this.search;
            }
        };
        this.decorateSlots = () => {
        };
        this.copySlots = () => {
        };
        this.initState = () => {
            if (this.onArgs()[0] == 'userdetails') {
                this.fetchUserDetails(this.onArgs()[1]);
                this.onLoaded();
            }
            this.pageBlock = 50;
            if (this.onArgs()[0] == 'logs') {
                this.fetchLogs(parseInt(this.onArgs()[3]), this.onArgs()[1], this.onArgs()[2]);
            }
            if (this.onArgs()[0] == 'usersignout') {
                this.fetchSignout(this.onArgs()[1]);
            }
        };
        this.initListeners = () => {
        };
        this.fetchUserDetails = async (email) => {
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({ "email": email }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/detailuser", this._SfUserAuthLoader, authorization));
            this._SfUserAuthLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.insertUserDetailHTML(jsonRespose.data.values);
                this.onLocked();
            }
            else {
                window.location.href = '#auth';
            }
        };
        this.fetchSignout = async (email) => {
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            console.log('authorization', authorization);
            const xhr = (await this.prepareXhr({ "email": email }, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/logoutuser", this._SfUserAuthLoader, authorization));
            //this._SfUserAuthLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log(jsonRespose);
                this.setSuccess('Signout successful!');
                setTimeout(() => {
                    window.history.back();
                }, 2000);
                //this.insertUserDetailHTML(jsonRespose.data.values);
                //this.onLocked();
            }
            else {
                window.location.href = '#auth';
            }
        };
        this.fetchLogs = async (offset, filterKey, filterString) => {
            if (isNaN(offset)) {
            }
            else {
                let body = { "offset": offset + "", "limit": this.pageBlock + "" };
                if (this.onArgs()[2].length > 1) {
                    body = { "offset": offset + "", "limit": this.pageBlock + "", "filterKey": filterKey + "", "filterString": filterString };
                }
                const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
                const xhr = (await this.prepareXhr(body, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/listlogs", this._SfUserAuthLoader, authorization));
                this._SfUserAuthLoader.innerHTML = '';
                if (xhr.status == 200) {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.insertLogsHTML(jsonRespose.data.values, jsonRespose.data.pages);
                }
                else {
                    window.location.href = '#auth';
                }
            }
        };
        this.initServices = async () => {
            if (this.onArgs()[0] == 'refresh') {
                if (this.onArgs()[1] != null) {
                    const authorization = btoa(this.onArgs()[1] + ":" + Util.readCookie('refreshToken'));
                    const xhr = (await this.prepareXhr(null, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/refresh", this._SfUserAuthLoader, authorization));
                    if (xhr.status == 200) {
                        const jsonRespose = JSON.parse(xhr.responseText);
                        Util.writeCookie('refreshToken', jsonRespose.data.refreshToken.token);
                        Util.writeCookie('accessToken', jsonRespose.data.accessToken.token);
                        Util.writeCookie('email', jsonRespose.data.email.S);
                        const event = new CustomEvent(this.eventAccessTokenReceived, { detail: { accessToken: jsonRespose.data.accessToken, name: jsonRespose.data.name.S, email: jsonRespose.data.email.S, admin: jsonRespose.admin }, bubbles: true, composed: true });
                        this.dispatchEvent(event);
                    }
                    else {
                        this.signOut();
                    }
                }
            }
            else if (this.onArgs()[0] == 'signout') {
                this.signOut();
            }
        };
    }
    firstUpdated(_changedProperties) {
        this.copySlots();
        this.decorateSlots();
        this.initListeners();
        this.initState();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    getUiRefresh() {
        window.location.hash = '#auth/refresh/' + Util.readCookie('email');
        return html `
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthC">
      <div class="refresh-container">
        <img .src=${this.logo} class="logo-refresh" />
        <div class="lds-dual-ring-lg"></div>
      </div>
      </div>
    `;
    }
    getUiSignIn() {
        window.location.hash = '#auth/signin';
        return html `
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
        <h1>Sign In</h1>
        <h4>Hello again!</h4>
        <form .onsubmit=${() => { this.onFormSubmit(); return false; }}>
          <div class="div-row">
            <label for="email">Email</label>
            <input id="email" type="text" @keyup=${() => { this.onKeyUp('email'); }} autofocus/>
            <span id="error-client-email" class="error-client material-icons">priority_high</span>
          </div>
          <div class="div-row-error div-row-submit">
            <div class="div-row-error-message"></div>
          </div>
          <div class="div-row-success div-row-submit">
            <div class="div-row-success-message"></div>
          </div>
          <div class="div-row-submit">
            <input id="submit" type="submit" value="Submit" disabled><div class="loader-element"></div>
          </div>
          <div class="div-row-terms">
            <span>I don't have an account. <a href="#auth/signup">Sign Up</a></span>
          </div>
        </form>
        </div>
      `;
    }
    render() {
        this.initServices();
        if (this.onArgs() == null || this.onArgs().length === 0) {
            return this.getUiRefresh();
        }
        else if (this.onArgs()[0] == 'signup') {
            return html `
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
        <div class="SfUserAuthC">
        <h1>Sign Up</h1>
        <h4>Let's create a new ${this.appName} account</h4>
        <form .onsubmit=${() => { this.onFormSubmit(); return false; }}>
          <div class="div-row">
            <label for="name">Name</label>
            <input id="name" type="text" @keyup=${() => { this.onKeyUp('name'); }}>
            <span id="error-client-name" class="error-client material-icons">priority_high</span>
          </div>
          <div class="div-row">
            <label for="email">Email</label>
            <input id="email" type="text" @keyup=${() => { this.onKeyUp('email'); }} autofocus/>
            <span id="error-client-email" class="error-client material-icons">priority_high</span>
          </div>
          <div class="div-row-terms">
            <input id="terms" type="checkbox" class="checkbox" @change=${() => { this.onCheckedChange(); }}/>
            <label for="terms">I would like to receive important email communication</label>
          </div>
          <div class="div-row-terms">
            <input id="privacy" type="checkbox" class="checkbox" @change=${() => { this.onCheckedChange(); }}/>
            <label for="privacy">I agree to the <a href="#auth/terms">terms</a> and <a href="#auth/privacy">privacy policy</a></label>
          </div>
          <div class="div-row-error div-row-submit">
            <div class="div-row-error-message"></div>
          </div>
          <div class="div-row-success div-row-submit">
            <div class="div-row-success-message"></div>
          </div>
          <div class="div-row-submit">
            <input id="submit" type="submit" value="Submit" disabled><div class="loader-element"></div>
          </div>
          <div class="div-row-terms">
            <span>I already have an account. <a href="#auth/signin">Sign In</a></span>
          </div>
        </form>
        </div>
      `;
        }
        else if (this.onArgs()[0] == 'terms') {
            return html `
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
        <div>
          <slot name="terms"></slot>
        </div>
        </div>
      `;
        }
        else if (this.onArgs()[0] == 'privacy') {
            return html `
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
        <div>
          <slot name="privacy"></slot>
        </div>
        </div>
      `;
        }
        else if (this.onArgs()[0] == 'signin') {
            return this.getUiSignIn();
        }
        else if (this.onArgs()[0] == 'verify') {
            return html `
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
        <h1>Verify</h1>
        <h4>Verification email with a one-time-password (OTP) has been sent to <strong>${this.onArgs()[1]}</strong></h4>
        <form .onsubmit=${() => { this.onFormSubmit(); return false; }}>
          <div class="div-row">
            <label for="otp">OTP</label>
            <input id="otp" type="text" @keyup=${() => { this.onKeyUp('otp'); }} placeholder="XXXX" autofocus/>
            <span id="error-client-otp" class="error-client material-icons">priority_high</span>
          </div>
          <div class="div-row-error div-row-submit">
            <div class="div-row-error-message"></div>
          </div>
          <div class="div-row-success div-row-submit">
            <div class="div-row-success-message"></div>
          </div>
          <div class="div-row-submit">
            <input id="submit" type="submit" value="Verify" disabled><div class="loader-element"></div>
          </div>
          <div class="div-row-terms">
            <span>I didn't receive the verification email. <span class="link resend" .onclick=${this.onResendSubmit}>Resend</span></span>
          </div>
        </form>
        </div>
      `;
        }
        else if (this.onArgs()[0] == 'refresh') {
            return this.getUiRefresh();
        }
        else if (this.onArgs()[0] == 'signout') {
            return html `
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthC">
      <div class="refresh-container">
        <img .src=${this.logo} class="logo-refresh" />
        <div class="lds-dual-ring-lg"></div>
      </div>
      </div>
    `;
        }
        else if (this.onArgs()[0] == 'admin') {
            return html `
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthCAdmin">
        <div class="stats-container">
          <h1>Authentication</h1>
        </div>
        <div class="stats-container">
          <div class="badge">Admin</div>
        </div>
        <br />
        <div class="search-container">
          <div class="div-row-search">
            <input id="search" class="input-search" type="text" @keyup=${() => { this.onKeyUp('search'); }} placeholder="Email address please ..." autofocus>
            <button class="submit-search" disabled @click=${() => { this.onSearchClick(); }}>Search Users</button>
          </div>
        </div>
        <br />
        <div class="search-container">
          <div class="div-row table-container">
          </div>
          <div class="div-row pages-container">
          </div>
        </div>
        <div class="search-container">
          <div class="loader-element"></div>
        </div>
        <br />
        <br />
      </div>
    `;
        }
        else if (this.onArgs()[0] == 'logs') {
            return html `
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthCAdmin">
        <div class="stats-container">
          <h1>Access Logs</h1>
        </div>
        <div class="stats-container">
          <div class="badge">Admin</div>
        </div>
        <br />
        <div class="stats-container">
          <span class="link resend" .onclick=${this.onCancelUserDetails}>${'← back to ' + this.onArgs()[2]}</span>
        </div>
        <br />
        <div class="search-container">
          <div class="div-row table-container">
          </div>
          <div class="div-row pages-container">
          </div>
        </div>
        <div class="search-container">
          <div class="loader-element"></div>
        </div>

        <br />
        <br />
      </div>
    `;
        }
        else if (this.onArgs()[0] == 'userdetails') {
            return html `
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthCAdmin">
        <div class="search-container">
          <div>
            <div class="stats-container">
              <h1>User Information</h1>
            </div>
            <div class="stats-container">
              <div class="badge">Admin</div>
            </div>
            <br />
            <div class="edit-container">
              <span class="link resend" .onclick=${this.onCancelUserDetails}>← Back</span>
              <div>
              <div class="stats-container">
                <button id="unlocked" class="edit-item" @click=${() => { this.onLocked(); }}>Cancel</button>
                <button id="locked" class="edit-item" @click=${() => { this.onUnlocked(); }}>Edit</button>
              </div>
              </div>
            </div>
            <br />
            <form .onsubmit=${() => { this.onFormSubmit(); return false; }}>
              <div class="div-row">
                <label for="name">Name</label>
                <input id="name" type="text" @keyup=${() => { this.onKeyUp('name'); }}>
                <span id="error-client-name" class="error-client material-icons">priority_high</span>
              </div>
              <div class="div-row">
                <label for="email">Email</label>
                <input id="email" type="text" @keyup=${() => { this.onKeyUp('email'); }}/>
                <span id="error-client-email" class="error-client material-icons">priority_high</span>
              </div>
              <br />
              <div class="div-row-userdetails-checkbox">
                <label for="admin">Admin</label>
                <input id="admin" type="checkbox" class="checkbox" @change=${() => { this.onCheckedChange(); }}/>    
              </div>
              <div class="div-row-userdetails-checkbox">
                <label for="active">Active</label>
                <input id="active" type="checkbox" class="checkbox" @change=${() => { this.onCheckedChange(); }}/>    
              </div>
              <br />
              <div class="div-row">
                <label for="reason">Reason</label>
                <input id="reason" type="text" @keyup=${() => { this.onKeyUp('reason'); }}/>
                <span id="error-client-reason" class="error-client material-icons">priority_high</span>
              </div>
              <div class="div-row-error div-row-submit">
                <div class="div-row-error-message"></div>
              </div>
              <div class="div-row-success div-row-submit success-userdetails">
                <div class="div-row-success-message"></div>
              </div>
              <div class="div-row-submit div-row-submit-userdetails">
                <div class="loader-element"></div>
                <div class="actions-container">
                  <button id="logs" class="edit-item" @click=${() => { window.location.href = '#auth/logs/email/' + this.onArgs()[1] + '/0'; }}>View Logs</button>
                  <button id="signout" class="edit-item" @click=${() => { window.location.href = '#auth/usersignout/' + this.onArgs()[1]; }}>Sign Out</button>
                  <input id="submit" type="submit" value="Submit">
                </div>
              </div>
            </form>
            <br />
            <br />  
          </div>
        </div>
      </div>
    `;
        }
        else if (this.onArgs()[0] == 'usersignout') {
            return html `
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthCAdmin">
        <div class="search-container">
          <div>
            <div class="stats-container">
              <h1>User Information</h1>
            </div>
            <div class="stats-container">
              <div class="badge">Admin</div>
            </div>
            <br />
            <div class="stats-container">
              <div>User ${this.onArgs()[1]} is being signed out ...</div>
            </div>
            <div class="refresh-container">
              <img .src=${this.logo} class="logo-refresh" />
              <div class="lds-dual-ring-lg"></div>
            </div>
            <div class="div-row-error div-row-submit">
              <div class="div-row-error-message"></div>
            </div>
            <div class="div-row-success div-row-submit success-userdetails">
              <div class="div-row-success-message"></div>
            </div>
            <br />
            <br />  
          </div>
        </div>
      </div>
    `;
        }
        else {
            return this.getUiRefresh();
        }
    }
};
SfUserAuth.styles = css `
    
    .SfUserAuthC {
      padding: 20px;
      background-color: var(--auth-background-color, none);
      color: var(--auth-color, #000);
    }

    .SfUserAuthCAdmin {
      background-color: var(--auth-background-color, none);
      color: var(--auth-color, #000);
    }

    .badge {
      border: dashed 1px;
      padding-top: 1px;
      padding-bottom: 1px;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 20px;
    }

    .no-records {
      padding: 10px;
    }

    .error-client {
      color: red;
      display: none;
    }

    .check-client {
      color: green;
    }

    #logs {
      margin-right: 10px;
    }
   
    .div-row-search {
      display: flex;
      align-items: center;
      margin-top: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .div-row {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }

    

    .div-row > label {
      width: 100px;
    }

    .div-row > input {
      width: 150px;
    }

    .div-row > span {
      margin-left: 5px;
    }

    .div-row-userdetails-checkbox {
      display: flex;
      align-items: center;
      margin-top: 10px;
      flex-wrap: wrap;
    }

    .div-row-userdetails-checkbox > label {
      width: 100px;
    }

    .div-row-userdetails-checkbox > input {
      margin: 0px;
    }

    .div-row-terms{
      display: flex;
      align-items: top;
      margin-top: 20px;
    }

    .div-row-submit{
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .div-row-submit{
      justify-content: space-between;
    }


    .div-row-submit input {
      font-size: 110%;
      font-weight: 800;
    }

    .checkbox {
      margin-top: 0px;
      margin-bottom: 0px;
      height: 20px;
      margin-right: 10px;
    }

    .div-row-error {
      display: none;
      align-items:center;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      border: dashed 1px red;
    }

    .div-row-success {
      display: none;
      align-items:center;
    }

    .success-userdetails {
      justify-content: center;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
      border: dashed 1px green;
    }

    .lds-dual-ring {
      display: inline-block;
      width: 15px;
      height: 15px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 15px;
      height: 15px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #000 #ddd #000 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 30px;
      height: 30px;
      margin: 0px;
      border-radius: 50%;
      border: 3px solid #fff;
      border-color: #000 #ddd #000 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .loader-element {
      margin-left: 5px;
    }

    a.disabled {
      pointer-events: none;
      cursor: default;
    }

    .link {
      color: var(--auth-color, #000);
      text-decoration: underline;
      cursor: pointer;
    }

    a {
      color: var(--auth-color, #000);
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }  
    
    .refresh-container {
      left: 0px;
      top: 0px;
      width: 100%;
      padding-top: 50px;
      padding-bottom: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .stats-container {
      left: 0px;
      top: 0px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    .actions-container {
      left: 0px;
      top: 0px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
    }


    .stats-item {
      margin: 10px;
    }

    .pages-container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    .pages-item {
      padding-left: 5px;
      padding-right: 5px;
      cursor: pointer;
      text-decoration: underline;
    }

    .pages-item-current {
      padding-left: 5px;
      padding-right: 5px;
      cursor: pointer;
    }

    .pages-label {
      padding-left: 5px;
      padding-right: 5px;
    }

    .stats-container div {
      margin-left: 15px;
      margin-right: 15px;
    }

    .stats-container h1 {
      margin-bottom: 0px;
    }

    .stats-container p {
      margin-top: 0px;
      font-size: 80%;
    }

    .table-container {
      max-width: 100%;
      overflow-x: auto;
      border: solid 1px;
    }

    .table-container th {
      border-bottom: solid 1px;
      text-align: left;
      padding: 5px;
    }

    .table-container td {
      font-size: 90%;
      padding-left: 5px;
      padding-right: 5px;
    }

    .td-name {
      min-width: 150px;
    }

    .td-email {
      min-width: 200px;
    }

    .td-timestamp {
      min-width: 400px;
    }

    .td-status {
      min-width: 50px;
    }

    .edit-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    .edit-item {
      font-size: 100%;
    }

    .search-container {
      left: 0px;
      top: 0px;
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
    }

    .stats-item {
      text-align: center;
    }

    .logo-refresh {
      margin-bottom: 20px;
      width: 100px;
    }

    #submit {
      background-color: var(--auth-button-background-color, #fff);
      color: var(--auth-button-color, #000);
    }

    #submit:disabled {
      opacity: 70%;
    }

    .label-search {
      margin-left: 5px;
      margin-right: 5px;
      margin-bottom: 3px;
    }

    .input-search {
      width: 200px !important;
      margin: 5px;
      margin-right: 0px;
    }

    .select-search {
      margin: 5px;
    }

    .submit-search {
      margin: 5px;
    }

    .submit-cancel {
      margin-right: 5px;
    }


    @media (orientation: landscape) {

     

    }

    @media (orientation: portrait) {

      

    }

  `;
__decorate([
    property()
], SfUserAuth.prototype, "logo", void 0);
__decorate([
    property()
], SfUserAuth.prototype, "apiId", void 0);
__decorate([
    property()
], SfUserAuth.prototype, "appName", void 0);
__decorate([
    property()
], SfUserAuth.prototype, "email", void 0);
__decorate([
    property()
], SfUserAuth.prototype, "name", void 0);
__decorate([
    property()
], SfUserAuth.prototype, "reason", void 0);
__decorate([
    property()
], SfUserAuth.prototype, "search", void 0);
__decorate([
    property()
], SfUserAuth.prototype, "offset", void 0);
__decorate([
    property()
], SfUserAuth.prototype, "otp", void 0);
__decorate([
    property()
], SfUserAuth.prototype, "pageBlock", void 0);
__decorate([
    property()
], SfUserAuth.prototype, "onArgs", void 0);
__decorate([
    query('#email')
], SfUserAuth.prototype, "_SfUserAuthEmail", void 0);
__decorate([
    query('#name')
], SfUserAuth.prototype, "_SfUserAuthName", void 0);
__decorate([
    query('#otp')
], SfUserAuth.prototype, "_SfUserAuthOtp", void 0);
__decorate([
    query('#search')
], SfUserAuth.prototype, "_SfUserAuthSearch", void 0);
__decorate([
    query('#filter')
], SfUserAuth.prototype, "_SfUserAuthFilter", void 0);
__decorate([
    query('#privacy')
], SfUserAuth.prototype, "_SfUserAuthPrivacy", void 0);
__decorate([
    query('#terms')
], SfUserAuth.prototype, "_SfUserAuthTerms", void 0);
__decorate([
    query('#admin')
], SfUserAuth.prototype, "_SfUserAuthAdmin", void 0);
__decorate([
    query('#active')
], SfUserAuth.prototype, "_SfUserAuthActive", void 0);
__decorate([
    query('#reason')
], SfUserAuth.prototype, "_SfUserAuthReason", void 0);
__decorate([
    query('#locked')
], SfUserAuth.prototype, "_SfUserAuthLocked", void 0);
__decorate([
    query('#unlocked')
], SfUserAuth.prototype, "_SfUserAuthUnlocked", void 0);
__decorate([
    query('#logs')
], SfUserAuth.prototype, "_SfUserAuthLogs", void 0);
__decorate([
    query('#signout')
], SfUserAuth.prototype, "_SfUserAuthSignout", void 0);
__decorate([
    query('#submit')
], SfUserAuth.prototype, "_SfUserAuthSubmit", void 0);
__decorate([
    query('.submit-search')
], SfUserAuth.prototype, "_SfUserAuthSearchSubmit", void 0);
__decorate([
    query('.submit-cancel')
], SfUserAuth.prototype, "_SfUserAuthSubmitCancel", void 0);
__decorate([
    query('.loader-element')
], SfUserAuth.prototype, "_SfUserAuthLoader", void 0);
__decorate([
    query('.div-row-error')
], SfUserAuth.prototype, "_SfUserAuthDivRowError", void 0);
__decorate([
    query('.div-row-error-message')
], SfUserAuth.prototype, "_SfUserAuthDivRowErrorMessage", void 0);
__decorate([
    query('.div-row-success')
], SfUserAuth.prototype, "_SfUserAuthDivRowSuccess", void 0);
__decorate([
    query('.div-row-success-message')
], SfUserAuth.prototype, "_SfUserAuthDivRowSuccessMessage", void 0);
__decorate([
    query('#error-client-name')
], SfUserAuth.prototype, "_SfUserAuthErrorName", void 0);
__decorate([
    query('#error-client-email')
], SfUserAuth.prototype, "_SfUserAuthErrorEmail", void 0);
__decorate([
    query('#error-client-otp')
], SfUserAuth.prototype, "_SfUserAuthErrorOtp", void 0);
__decorate([
    query('.table-container')
], SfUserAuth.prototype, "_SfUserAuthTableContainer", void 0);
__decorate([
    query('.pages-container')
], SfUserAuth.prototype, "_SfUserAuthPagesContainer", void 0);
SfUserAuth = __decorate([
    customElement('sf-user-auth')
], SfUserAuth);
export { SfUserAuth };
//# sourceMappingURL=sf-user-auth.js.map