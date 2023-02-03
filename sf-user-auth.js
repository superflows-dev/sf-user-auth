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
/**
 * * SfUserAuth element.
 *
 * @fires searchClick - When the user presses the enter key in the search input
 * @property onArgs - Function to get url arguments
 * @property appName - Name of the application
 * @property apiId - AWS Api Gateway Id
 * @slot terms - Slot for holding terms & conditions content
 * @slot privacy - Slot for holding privacy policy content
 * @csscustomproperty --auth-background-color - Background color of the component
 * @csscustomproperty --auth-color - Text color of the component
 * @csscustomproperty --button-background-color - Background color of the component
 * @csscustomproperty --button-color - Text color of the component
 */
let SfUserAuth = class SfUserAuth extends LitElement {
    constructor() {
        super();
        this.eventAccessTokenReceived = 'accessTokenReceived';
        this.eventSignedOut = 'signedOut';
        this.onArgs = () => { return []; };
        this.signOut = () => {
            Util.clearCookie('refreshToken');
            const event = new CustomEvent(this.eventSignedOut, { detail: {}, bubbles: true, composed: true });
            this.dispatchEvent(event);
            window.location.hash = '#auth/signin';
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
        this.prepareXhr = async (data, url, loaderElement, authorization) => {
            console.log('sending data', data);
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
            }
            return await Util.callApi(url, data, authorization);
        };
        this.onResendSubmit = async () => {
            console.log('onresend');
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
                    const refreshToken = jsonRespose.refreshToken.token;
                    Util.writeCookie('refreshToken', refreshToken);
                    window.location.hash = '#auth/refresh/' + this.onArgs()[1];
                    console.log('new hash', window.location.hash);
                }
                else {
                    const jsonRespose = JSON.parse(xhr.responseText);
                    this.setError(jsonRespose.error);
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
                default:
            }
            this.evalSubmit();
            return false;
        };
        this.decorateSlots = () => {
        };
        this.copySlots = () => {
        };
        this.initListeners = () => {
        };
        this.initServices = async () => {
            if (this.onArgs()[0] == 'refresh') {
                if (this.onArgs()[1] != null) {
                    const authorization = btoa(this.onArgs()[1] + ":" + Util.readCookie('refreshToken'));
                    const xhr = (await this.prepareXhr(null, "https://" + this.apiId + ".execute-api.us-east-1.amazonaws.com/test/refresh", this._SfUserAuthLoader, authorization));
                    if (xhr.status == 200) {
                        const jsonRespose = JSON.parse(xhr.responseText);
                        Util.writeCookie('refreshToken', jsonRespose.refreshToken.token);
                        const event = new CustomEvent(this.eventAccessTokenReceived, { detail: jsonRespose.accessToken, bubbles: true, composed: true });
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
    }
    connectedCallback() {
        super.connectedCallback();
    }
    getUiSignIn() {
        return html `
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
        <h1>Sign In</h1>
        <h4>Hello again!</h4>
        <form .onsubmit=${() => { this.onFormSubmit(); return false; }}>
          <div class="div-row">
            <label for="email">Email</label>
            <input id="email" type="text" @keyup=${() => { this.onKeyUp('email'); }}/>
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
            return this.getUiSignIn();
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
            <input id="email" type="text" @keyup=${() => { this.onKeyUp('email'); }}/>
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
            <input id="otp" type="text" @keyup=${() => { this.onKeyUp('otp'); }} placeholder="XXXX"/>
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
        else {
            return this.getUiSignIn();
        }
    }
};
SfUserAuth.styles = css `
    
    .SfUserAuthC {
      background-color: var(--auth-background-color, none);
      color: var(--auth-color, #000);
    }

    .error-client {
      color: red;
      display: none;
    }

    .check-client {
      color: green;
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

    .div-row-submit > input {
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
], SfUserAuth.prototype, "otp", void 0);
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
    query('#privacy')
], SfUserAuth.prototype, "_SfUserAuthPrivacy", void 0);
__decorate([
    query('#terms')
], SfUserAuth.prototype, "_SfUserAuthTerms", void 0);
__decorate([
    query('#submit')
], SfUserAuth.prototype, "_SfUserAuthSubmit", void 0);
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
SfUserAuth = __decorate([
    customElement('sf-user-auth')
], SfUserAuth);
export { SfUserAuth };
//# sourceMappingURL=sf-user-auth.js.map