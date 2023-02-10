/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */

import {LitElement, html, css, PropertyValueMap} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
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
@customElement('sf-user-auth')
export class SfUserAuth extends LitElement {

  eventAccessTokenReceived = 'accessTokenReceived';
  eventSignedOut = 'signedOut';

  static override styles = css`
    
    .SfUserAuthC {
      padding: 20px;
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

  @property()
  logo!: string;
  
  @property()
  apiId!: string;

  @property()
  appName!: string;

  @property()
  email!: string;

  @property()
  name!: string;

  @property()
  otp!: string;

  @property()
  onArgs = () : string[] => {return []};

  @query('#email')
  _SfUserAuthEmail: any;

  @query('#name')
  _SfUserAuthName: any;

  @query('#otp')
  _SfUserAuthOtp: any;

  @query('#privacy')
  _SfUserAuthPrivacy: any;

  @query('#terms')
  _SfUserAuthTerms: any;

  @query('#submit')
  _SfUserAuthSubmit: any;

  @query('.loader-element')
  _SfUserAuthLoader: any;

  @query('.div-row-error')
  _SfUserAuthDivRowError: any;

  @query('.div-row-error-message')
  _SfUserAuthDivRowErrorMessage: any;

  @query('.div-row-success')
  _SfUserAuthDivRowSuccess: any;

  @query('.div-row-success-message')
  _SfUserAuthDivRowSuccessMessage: any;

  @query('#error-client-name')
  _SfUserAuthErrorName: any;

  @query('#error-client-email')
  _SfUserAuthErrorEmail: any;

  @query('#error-client-otp')
  _SfUserAuthErrorOtp: any;

  signOut = () => {
    Util.clearCookie('refreshToken');
    const event = new CustomEvent(this.eventSignedOut, {detail: {}, bubbles: true, composed: true});
    this.dispatchEvent(event);
    window.location.hash = '#auth/signin';
  }

  validateTerms = () => {
    return this._SfUserAuthTerms.checked;
  }

  validatePrivacy = () => {
    return this._SfUserAuthPrivacy.checked;
  }

  validateEmail = (email: string) => {
    if(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      return true;
    }
    return false;
  }

  validateName = (name: string) => {
    if((name + "").length > 3) {
      return true;
    }
    return false;
  }

  validateOtp = (otp: string) => {
    if((otp + "").length !== 4) {
      return false;
    }
    return true;
  }
  
  clearMessages = () => {
    this._SfUserAuthDivRowError.style.display = 'none';
    this._SfUserAuthDivRowErrorMessage.innerHTML = '';

    this._SfUserAuthDivRowSuccess.style.display = 'none';
    this._SfUserAuthDivRowSuccessMessage.innerHTML = '';
  }

  setError = (msg: string) => {
    this._SfUserAuthDivRowError.style.display = 'flex';
    this._SfUserAuthDivRowErrorMessage.innerHTML = msg;
    this._SfUserAuthDivRowSuccess.style.display = 'none';
    this._SfUserAuthDivRowSuccessMessage.innerHTML = '';
  }

  setSuccess = (msg: string) => {
    this._SfUserAuthDivRowError.style.display = 'none';
    this._SfUserAuthDivRowErrorMessage.innerHTML = '';
    this._SfUserAuthDivRowSuccess.style.display = 'flex';
    this._SfUserAuthDivRowSuccessMessage.innerHTML = msg;
  }

  prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {

    console.log('sending data', data);
    if(loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    }
    return await Util.callApi(url, data, authorization);

  }

  onResendSubmit = async () => {

    console.log('onresend');

    this.clearMessages();

    const xhr : any = (await this.prepareXhr({ "email": this.onArgs()[1] }, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/resend", this._SfUserAuthLoader, null)) as any;
    this._SfUserAuthLoader.innerHTML = '';
    if(xhr.status == 200) {
      this.setSuccess('Verification email sent again successfully!')
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }

  }

  onFormSubmit = async () => {

    this.clearMessages();

    if(this.onArgs()[0] == 'signup') {

      const xhr : any= (await this.prepareXhr({ "name": this.name, "email": this.email },"https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/signup", this._SfUserAuthLoader, null)) as any;
      this._SfUserAuthLoader.innerHTML = '';
      if(xhr.status == 200) {
        window.location.hash = '#auth/verify/' + this.email;
      } else {
        const jsonRespose = JSON.parse(xhr.responseText);
        this.setError(jsonRespose.error);
      }
     
    } else if(this.onArgs()[0] == 'signin') {

      const xhr : any= (await this.prepareXhr({ "email": this.email }, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/signin", this._SfUserAuthLoader, null)) as any;
      this._SfUserAuthLoader.innerHTML = '';
      if(xhr.status == 200) {
        window.location.hash = '#auth/verify/' + this.email;
      } else {
        const jsonRespose = JSON.parse(xhr.responseText);
        this.setError(jsonRespose.error);
      }

    } else if(this.onArgs()[0] == 'verify') {

      const xhr : any= (await this.prepareXhr({ "email": this.onArgs()[1], "otp": this.otp }, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/verify", this._SfUserAuthLoader, null)) as any;
      this._SfUserAuthLoader.innerHTML = '';
      if(xhr.status == 200) {
        this.setSuccess('Verification successful!')
        const jsonRespose = JSON.parse(xhr.responseText);
        const refreshToken = jsonRespose.refreshToken.token;
        Util.writeCookie('refreshToken', refreshToken);
        window.location.hash = '#auth/refresh/'+this.onArgs()[1];
        console.log('new hash', window.location.hash);
      } else {
        const jsonRespose = JSON.parse(xhr.responseText);
        this.setError(jsonRespose.error);
      }

    }
    return false;
  }

  evalSubmit = () => {

    if(this.onArgs()[0] == 'signup') {

      if(this.validateName(this._SfUserAuthName.value) && this.validateEmail(this._SfUserAuthEmail.value) && this.validateTerms() && this.validatePrivacy()) {
        this._SfUserAuthSubmit.disabled = false;
      } else {
        this._SfUserAuthSubmit.disabled = true;
      }

    } else if(this.onArgs()[0] == 'signin') {

      if(this.validateEmail(this._SfUserAuthEmail.value)) {
        this._SfUserAuthSubmit.disabled = false;
      } else {
        this._SfUserAuthSubmit.disabled = true;
      }

    } else if(this.onArgs()[0] == 'verify') {

      if(this.validateOtp(this._SfUserAuthOtp.value)) {
        this._SfUserAuthSubmit.disabled = false;
      } else {
        this._SfUserAuthSubmit.disabled = true;
      }

    }

  }

  onCheckedChange = () => {

    this.evalSubmit();

  }

  onKeyUp = (location: string) => {

    switch(location) {

      case 'name': 

      if(this.validateName(this._SfUserAuthName.value)) {
        this._SfUserAuthErrorName.style.display = 'none';
      } else {
        this._SfUserAuthErrorName.style.display = 'block';
      }
      this.name = this._SfUserAuthName.value;
      break;

      case 'email': 

      if(this.validateEmail(this._SfUserAuthEmail.value)) {
        this._SfUserAuthErrorEmail.style.display = 'none';
      } else {
        this._SfUserAuthErrorEmail.style.display = 'block';
      }
      this.email = this._SfUserAuthEmail.value;
      break;

      case 'otp': 

      if(this.validateOtp(this._SfUserAuthOtp.value)) {
        this._SfUserAuthErrorOtp.style.display = 'none';
      } else {
        this._SfUserAuthErrorOtp.style.display = 'block';
      }
      this.otp = this._SfUserAuthOtp.value;
      break;

      default:

    }

    this.evalSubmit();

    return false;

  }

  decorateSlots = () => {

  }

  copySlots = () => {

  }

  initListeners = () => {

  }

  initServices = async () => {

    if(this.onArgs()[0] == 'refresh') {

      if(this.onArgs()[1] != null) {
        const authorization = btoa(this.onArgs()[1] + ":" + Util.readCookie('refreshToken'));
        const xhr : any= (await this.prepareXhr(null, "https://"+this.apiId+".execute-api.us-east-1.amazonaws.com/test/refresh", this._SfUserAuthLoader, authorization)) as any;
        if(xhr.status == 200) {
          const jsonRespose = JSON.parse(xhr.responseText);
          Util.writeCookie('refreshToken', jsonRespose.refreshToken.token);
          const event = new CustomEvent(this.eventAccessTokenReceived, {detail: jsonRespose.accessToken, bubbles: true, composed: true});
          this.dispatchEvent(event);
        } else {
          this.signOut();
        }
      }

    } else if(this.onArgs()[0] == 'signout') {
      this.signOut();
    }

  }

  constructor() {
    super();
  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.copySlots();
    this.decorateSlots();
    this.initListeners();
  }
  
  override connectedCallback() {
    super.connectedCallback()
  }

  getUiSignIn() {

    window.location.hash = '#auth/signin';

    return html`
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
        <h1>Sign In</h1>
        <h4>Hello again!</h4>
        <form .onsubmit=${() => {this.onFormSubmit(); return false;}}>
          <div class="div-row">
            <label for="email">Email</label>
            <input id="email" type="text" @keyup=${() => {this.onKeyUp('email')}}/>
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

  override render() {

    this.initServices();

    if(this.onArgs() == null || this.onArgs().length === 0) {

      return this.getUiSignIn();

    } else if(this.onArgs()[0] == 'signup') {

      return html`
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
        <div class="SfUserAuthC">
        <h1>Sign Up</h1>
        <h4>Let's create a new ${this.appName} account</h4>
        <form .onsubmit=${() => {this.onFormSubmit(); return false;}}>
          <div class="div-row">
            <label for="name">Name</label>
            <input id="name" type="text" @keyup=${() => {this.onKeyUp('name')}}>
            <span id="error-client-name" class="error-client material-icons">priority_high</span>
          </div>
          <div class="div-row">
            <label for="email">Email</label>
            <input id="email" type="text" @keyup=${() => {this.onKeyUp('email')}}/>
            <span id="error-client-email" class="error-client material-icons">priority_high</span>
          </div>
          <div class="div-row-terms">
            <input id="terms" type="checkbox" class="checkbox" @change=${() => {this.onCheckedChange()}}/>
            <label for="terms">I would like to receive important email communication</label>
          </div>
          <div class="div-row-terms">
            <input id="privacy" type="checkbox" class="checkbox" @change=${() => {this.onCheckedChange()}}/>
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

    } else if(this.onArgs()[0] == 'terms') {

      return html`
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
        <div>
          <slot name="terms"></slot>
        </div>
        </div>
      `;

    } else if(this.onArgs()[0] == 'privacy') {

      return html`
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
        <div>
          <slot name="privacy"></slot>
        </div>
        </div>
      `;

    } else if(this.onArgs()[0] == 'signin') {

      return this.getUiSignIn();

    } else if(this.onArgs()[0] == 'verify') {

      return html`
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
        <h1>Verify</h1>
        <h4>Verification email with a one-time-password (OTP) has been sent to <strong>${this.onArgs()[1]}</strong></h4>
        <form .onsubmit=${() => {this.onFormSubmit(); return false;}}>
          <div class="div-row">
            <label for="otp">OTP</label>
            <input id="otp" type="text" @keyup=${() => {this.onKeyUp('otp')}} placeholder="XXXX"/>
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

    } else if(this.onArgs()[0] == 'refresh') {
      return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthC">
      <div class="refresh-container">
        <img .src=${this.logo} class="logo-refresh" />
        <div class="lds-dual-ring-lg"></div>
      </div>
      </div>
    `;
    } else if(this.onArgs()[0] == 'signout') {
      return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthC">
      <div class="refresh-container">
        <img .src=${this.logo} class="logo-refresh" />
        <div class="lds-dual-ring-lg"></div>
      </div>
      </div>
    `;
    } else {

      return this.getUiSignIn();

    }

  }

}

declare global {
  interface HTMLElementTagNameMap {
    'sf-user-auth': SfUserAuth;
  }
}
