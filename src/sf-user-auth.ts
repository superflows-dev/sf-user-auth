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
 * @property appName - Name of the application
 * @property apiId - AWS Api Gateway Id
 * @slot terms - Slot for holding terms & conditions content
 * @slot privacy - Slot for holding privacy policy content
 * @csscustomproperty --auth-background-color - Background color of the component
 * @csscustomproperty --auth-color - Text color of the component
 * @csscustomproperty --button-background-color - Background color of the component
 * @csscustomproperty --button-color - Text color of the component
 * @part --title
 * @part --subtitle
 * @part --container
 */


interface bodyListUsers {
  offset: string;
  limit: string;
  filterKey?: string;
  filterString?: string;
  sortKey?: string;
  sortOrder?: string;
}


@customElement('sf-user-auth')
export class SfUserAuth extends LitElement {

  eventAccessTokenReceived = 'accessTokenReceived';
  eventSignedOut = 'signedOut';

  static override styles = css`
    
    .SfUserAuthC {
      background-color: var(--auth-background-color, none);
      color: var(--auth-color, inherit);
      display: flex;
      justify-content: center;
    }

    .SfUserAuthCAdmin {
      background-color: var(--auth-background-color, none);
      color: var(--auth-color, inherit);
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

    #unlocked {
      display: none;
    }

    .details-submit {
      display: none;
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
      flex-grow: 1;
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
      flex-grow: 1;
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
      width: 100%;
      text-align: center;
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
      width: 100%;
      text-align: center;
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
      color: var(--auth-color, inherit);
      text-decoration: underline;
      cursor: pointer;
    }

    a {
      color: var(--auth-color, inherit);
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

    .SfUserAuthCChild {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 30px;
    }

    @media (orientation: landscape) {

     .SfUserAuthCChild {
        width: 50%;
      }

      .SfUserAuthCChild form {
        width: 40%;
      }

    }

    @media (orientation: portrait) {

      .SfUserAuthCChild {
        width: 100%;
      }

      .SfUserAuthCChild form {
        width: 80%;
      }
      

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
  reason!: string;

  @property()
  search: string = "";

  @property({type: Number})
  offset: number = 0;

  @property()
  otp!: string;
  
  @property({type: Number})
  pageBlock!: number;
  
  @property({type: Array})
  arrHash: string[] = window.location.hash.split("/").splice(1);;

  @query('#email')
  _SfUserAuthEmail: any;

  @query('#name')
  _SfUserAuthName: any;

  @query('#otp')
  _SfUserAuthOtp: any;

  @query('#otp-toggle')
  _SfUserAuthOtpToggle: any;

  @query('#search')
  _SfUserAuthSearch: any;

  @query('#filter')
  _SfUserAuthFilter: any;

  @query('#privacy')
  _SfUserAuthPrivacy: any;

  @query('#terms')
  _SfUserAuthTerms: any;

  @query('#admin')
  _SfUserAuthAdmin: any;

  @query('#active')
  _SfUserAuthActive: any;

  @query('#reason')
  _SfUserAuthReason: any;

  @query('#locked')
  _SfUserAuthLocked: any;

  @query('#unlocked')
  _SfUserAuthUnlocked: any;
  
  @query('#logs')
  _SfUserAuthLogs: any;

  @query('#signout')
  _SfUserAuthSignout: any;

  @query('#submit')
  _SfUserAuthSubmit: any;

  @query('.submit-search')
  _SfUserAuthSearchSubmit: any;

  @query('.submit-cancel')
  _SfUserAuthSubmitCancel: any;

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

  @query('.table-container')
  _SfUserAuthTableContainer: any;

  @query('.pages-container')
  _SfUserAuthPagesContainer: any;

  flagRefresh: boolean = false;

  signOut = () => {
    Util.clearCookie('refreshToken');
    Util.clearCookie('accessToken');
    Util.clearCookie('email');
    Util.clearCookie('admin');
    const event = new CustomEvent(this.eventSignedOut, {detail: {}, bubbles: true, composed: true});
    this.dispatchEvent(event);
    //window.location.hash = '#auth/signin';
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
    if((otp + "").length !== 6) {
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

  insertLogsHTML = (data: any) => {

    var htmlStr = `
    <table>
    <tr>
      <th class="td-email">Email</th>
      <th class="td-timestamp">Timestamp</th>
      <th class="td-operation">Operation</th>
      <th class="td-httpcode">HttpCode</th>
    </tr>`;

    for(var i = 0; i < data.length; i++) {

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

    if(data.length === 0) {
      htmlStr = '<div class="no-records">No records found</div>';
    }

    this._SfUserAuthTableContainer.innerHTML = htmlStr;

  }

  insertUserDetailHTML = (data: any) => {
    this._SfUserAuthEmail.value = data.email;
    this.email = data.email;
    if(data.name != null) {
      this._SfUserAuthName.value = data.name;
      this.name = data.name;
    } else {
      this.name = "";
    }
    if(data.reason != null) {
      this._SfUserAuthReason.value = data.reason;
      this.reason = data.reason;
    } else {
      this.reason = "";
    }
    if(data.admin != null) {
      if(data.admin) {
        this._SfUserAuthAdmin.setAttribute('checked', true);
      }
    }
    if(data.suspended != null) {
      if(data.suspended) {
        this._SfUserAuthActive.removeAttribute('checked');
      } else {
        this._SfUserAuthActive.setAttribute('checked', true);
      }
    }else {
      this._SfUserAuthActive.setAttribute('checked', true);
    }
  }

  prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {

    
    if(loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    }
    return await Util.callApi(url, data, authorization);

  }

  onResendSubmit = async () => {
    
    this.clearMessages();

    const xhr : any = (await this.prepareXhr({ "email": this.arrHash[1] }, "https://"+this.apiId+"/resend", this._SfUserAuthLoader, null)) as any;
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

    if(this.arrHash[0] == 'signup') {

      const xhr : any= (await this.prepareXhr({ "name": this.name, "email": this.email },"https://"+this.apiId+"/signup", this._SfUserAuthLoader, null)) as any;
      this._SfUserAuthLoader.innerHTML = '';
      if(xhr.status == 200) {
        window.location.hash = '#auth/verify/' + this.email;
      } else {
        const jsonRespose = JSON.parse(xhr.responseText);
        this.setError(jsonRespose.error);
      }
     
    } else if(this.arrHash[0] == 'signin') {

      const xhr : any= (await this.prepareXhr({ "email": this.email }, "https://"+this.apiId+"/signin", this._SfUserAuthLoader, null)) as any;
      this._SfUserAuthLoader.innerHTML = '';
      if(xhr.status == 200) {
        window.location.hash = '#auth/verify/' + this.email;
      } else {
        const jsonRespose = JSON.parse(xhr.responseText);
        this.setError(jsonRespose.error);
      }

    } else if(this.arrHash[0] == 'verify') {

      const xhr : any= (await this.prepareXhr({ "email": this.arrHash[1], "otp": this.otp }, "https://"+this.apiId+"/verify", this._SfUserAuthLoader, null)) as any;
      this._SfUserAuthLoader.innerHTML = '';
      if(xhr.status == 200) {
        this.setSuccess('Verification successful!')
        const jsonRespose = JSON.parse(xhr.responseText);
        console.log('verify log', jsonRespose);
        const refreshToken = jsonRespose.data.refreshToken.token;
        const email = jsonRespose.data.email.S;
        Util.writeCookie('refreshToken', refreshToken);
        Util.writeCookie('email', email);
        window.location.hash = '#auth/refresh/'+this.arrHash[1];
        
      } else {
        const jsonRespose = JSON.parse(xhr.responseText);
        this.setError(jsonRespose.error);
      }

    } else if(this.arrHash[0] == 'userdetails') {

      const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
      const xhr : any= (await this.prepareXhr({ "email": this.arrHash[1], "name": this.name, "reason": this.reason, "admin": this._SfUserAuthAdmin.checked, "suspended": !this._SfUserAuthActive.checked }, "https://"+this.apiId+"/updateuser", this._SfUserAuthLoader, authorization)) as any;
      this._SfUserAuthLoader.innerHTML = '';
      if(xhr.status == 200) {
        this.setSuccess('Update successful!')
      }

    }
    return false;
  }

  evalSubmit = () => {

    if(this.arrHash[0] == 'signup') {

      if(this.validateName(this._SfUserAuthName.value) && this.validateEmail(this._SfUserAuthEmail.value) && this.validateTerms() && this.validatePrivacy()) {
        this._SfUserAuthSubmit.disabled = false;
      } else {
        this._SfUserAuthSubmit.disabled = true;
      }

    } else if(this.arrHash[0] == 'signin') {

      if(this.validateEmail(this._SfUserAuthEmail.value)) {
        this._SfUserAuthSubmit.disabled = false;
      } else {
        this._SfUserAuthSubmit.disabled = true;
      }

    } else if(this.arrHash[0] == 'verify') {

      if(this.validateOtp(this._SfUserAuthOtp.value)) {
        this._SfUserAuthSubmit.disabled = false;
      } else {
        this._SfUserAuthSubmit.disabled = true;
      }

    } else if(this.arrHash[0] == 'admin') {

      if(this.validateEmail(this._SfUserAuthSearch.value)) {
        this._SfUserAuthSearchSubmit.disabled = false;
      } else {
        this._SfUserAuthSearchSubmit.disabled = true;
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

  }

  onLocked = () => {
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
    
  }

  onUnlocked = () => {

    this._SfUserAuthLocked.style.display = 'none';
    this._SfUserAuthUnlocked.style.display = 'block';
    this._SfUserAuthName.removeAttribute("disabled");
    this._SfUserAuthAdmin.removeAttribute("disabled");
    this._SfUserAuthActive.removeAttribute("disabled");
    this._SfUserAuthReason.removeAttribute("disabled");
    this._SfUserAuthSubmit.style.display = 'block';
    this._SfUserAuthSignout.style.display = 'none';
    this._SfUserAuthLogs.style.display = 'none';
  }

  onCancelUserDetails = () => {
    Util.goBack();
  }

  onSearchClick = () => {
    if(this.arrHash[0] == 'admin' ) {
      Util.goTo('#auth/userdetails/' + this.search);
    }
  }

  decorateSlots = () => {

  }

  copySlots = () => {

  }

  initState = async (calling: number = 0) => {
    
    if(this.arrHash[0] == 'userdetails') {
      // if(this._SfUserAuthEmail != null) {
      //   console.log('not null');
      //   if(this._SfUserAuthEmail.value.length === 0) {
         
      //   }
      // }
      await this.fetchUserDetails(this.arrHash[1]);
      
    }

    this.pageBlock = 100;
    if(this.arrHash[0] == 'logs') {
      this.fetchLogs(parseInt(this.arrHash[3]), this.arrHash[1], this.arrHash[2]);
    }

    if(this.arrHash[0] == 'usersignout') {
      this.fetchSignout(this.arrHash[1]);
    }

    if(this.arrHash[0] == 'refresh') {
      console.log('init state called', this.arrHash[0], calling, this.flagRefresh);
      if(!this.flagRefresh){
        this.flagRefresh = true;
        const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('refreshToken'));
        const xhr : any= (await this.prepareXhr(null, "https://"+this.apiId+"/refresh", this._SfUserAuthLoader, authorization)) as any;
        if(xhr.status == 200) {
          const jsonRespose = JSON.parse(xhr.responseText);
          console.log('jsonresponse', JSON.stringify(jsonRespose));
          Util.writeCookie('refreshToken', jsonRespose.data.refreshToken.token);
          Util.writeCookie('accessToken', jsonRespose.data.accessToken.token);
          Util.writeCookie('email', jsonRespose.data.email.S);
          Util.writeCookie('admin', jsonRespose.admin);
          setTimeout(() => {
            const event = new CustomEvent(this.eventAccessTokenReceived, {detail: {accessToken: jsonRespose.data.accessToken, name: jsonRespose.data.name.S, email: jsonRespose.data.email.S, admin: jsonRespose.admin}, bubbles: true, composed: true});
            this.dispatchEvent(event);
          }, 2000);
        }
        this.flagRefresh = false;
      } else {
        // this.signOut();
      }

    } 
    
    if(this.arrHash[0] == 'signout') {
      this.signOut();
    }

    if(this.arrHash[0] == 'signin') {
      setTimeout(() => {
        (this._SfUserAuthEmail as HTMLInputElement)!.focus();
      }, 500);
      
    }

    if(this.arrHash[0] == 'verify') {
      setTimeout(() => {
        (this._SfUserAuthOtp as HTMLInputElement)!.focus();
      }, 500);
      
    }

  }

  initListeners = () => {

  }

  fetchUserDetails = async (email: string) => {
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"email": email}, "https://"+this.apiId+"/detailuser", this._SfUserAuthLoader, authorization)) as any;
    this._SfUserAuthLoader.innerHTML = '';
    if(xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.insertUserDetailHTML(jsonRespose.data.values);
      this.onLocked();
    } else {
      window.location.href = '#auth/refresh';
    }
  }

  fetchSignout = async (email: string) => {
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr : any = (await this.prepareXhr({"email": email}, "https://"+this.apiId+"/logoutuser", this._SfUserAuthLoader, authorization)) as any;
    //this._SfUserAuthLoader.innerHTML = '';
    if(xhr.status == 200) {
      this.setSuccess('Signout successful!')
      setTimeout(() => {
        window.history.back();
      }, 2000);
      //this.insertUserDetailHTML(jsonRespose.data.values);
      //this.onLocked();
    } else {
      this.signOut()
    }
  }

  fetchLogs = async (offset: number, filterKey: string, filterString: string) => {

    if(isNaN(offset)) {

    } else {

      let body : bodyListUsers = {"offset": offset + "", "limit": this.pageBlock + ""};
      if(this.arrHash[2].length > 1) {
        body = {"offset": offset + "", "limit": this.pageBlock + "", "filterKey": filterKey + "", "filterString": filterString};
      }
      
      const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
      const xhr : any= (await this.prepareXhr(body, "https://"+this.apiId+"/listlogs", this._SfUserAuthLoader, authorization)) as any;
      this._SfUserAuthLoader.innerHTML = '';
      if(xhr.status == 200) {
        const jsonRespose = JSON.parse(xhr.responseText);
        this.insertLogsHTML(jsonRespose.data.values)
      } else {
        this.signOut();
      }
    }


  }

  constructor() {
    super();
  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.copySlots();
    this.decorateSlots();
    this.initListeners();
    this.initState(1);
    window.onhashchange = () => { 
      const hashValue = window.location.hash;
      this.arrHash = hashValue.split("/").splice(1);
    } 

    if(this.arrHash[0] == 'signin') {
      (this._SfUserAuthEmail as HTMLInputElement).focus();
    }

    if(this.arrHash[0] == 'verify') {
      (this._SfUserAuthOtp as HTMLInputElement)!.focus();
    }
  

  }
  
  override connectedCallback() {
    super.connectedCallback()
  }

  getUiRefresh() {

    return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthC">
        <div part="container" class="SfUserAuthCChild">
          <div class="refresh-container">
            <img .src=${this.logo} class="logo-refresh" />
            <div class="lds-dual-ring-lg"></div>
          </div>
        </div>
      </div>
    `;

  }

  getUiSignIn() {

    window.location.hash = '#auth/signin';

    return html`
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
          <div part="container" class="SfUserAuthCChild">
            <h1 part="title">Sign In</h1>
            <form .onsubmit=${() => {this.onFormSubmit(); return false;}}>
              <h4 part="subtitle">Hello again!</h4>
              <label part="label" for="email">Email</label><br />
              <div class="div-row">
                <input part="input" id="email" type="text" @keyup=${() => {this.onKeyUp('email')}} autofocus/>
                <span id="error-client-email" class="error-client material-icons">priority_high</span>
              </div>
              <div class="div-row-error div-row-submit">
                <div part="errormsg" class="div-row-error-message"></div>
              </div>
              <div class="div-row-success div-row-submit">
                <div part="successmsg" class="div-row-success-message"></div>
              </div>
              <div class="div-row-submit">
                <input part="submit" id="submit" type="submit" value="Submit" disabled><div class="loader-element"></div>
              </div>
              <div class="div-row-terms">
                <span>I don't have an account. <a href="#auth/signup">Sign Up</a></span>
              </div>
            </form>
          </div>
        </div>
      `;

  }

  toggleMask() {
    let input = this._SfUserAuthOtp;
    let icon = this._SfUserAuthOtpToggle;

    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "visibility_off";
    } else {
        input.type = "password";
        icon.textContent = "visibility";
    }
  }

  override render() {


    this.initState(2);

    if(this.arrHash == null || this.arrHash.length === 0) {

      return this.getUiRefresh();
      
    } else if(this.arrHash[0] == 'signup') {

      return html`
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
        <div class="SfUserAuthC">
          <div part="container" class="SfUserAuthCChild">
            <h1 part="title">Sign Up</h1>
            <form .onsubmit=${() => {this.onFormSubmit(); return false;}}>
              <h4 part="subtitle">Let's create a new ${this.appName} account</h4>
              <label part="label" for="name">Name</label><br />
              <div class="div-row">
                <input part="input" id="name" type="text" @keyup=${() => {this.onKeyUp('name')}}>
                <span id="error-client-name" class="error-client material-icons">priority_high</span>
              </div>
              <br />
              <label part="label" for="email">Email</label><br />
              <div class="div-row">
                <input part="input" id="email" type="text" @keyup=${() => {this.onKeyUp('email')}} autofocus/>
                <span id="error-client-email" class="error-client material-icons">priority_high</span>
              </div>
              <br />
              <div class="div-row-terms">
                <input id="terms" type="checkbox" class="checkbox" @change=${() => {this.onCheckedChange()}}/>
                <label for="terms">I would like to receive important email communication</label>
              </div>
              <div class="div-row-terms">
                <input id="privacy" type="checkbox" class="checkbox" @change=${() => {this.onCheckedChange()}}/>
                <label for="privacy">I agree to the <a href="#auth/terms">terms</a> and <a href="#auth/privacy">privacy policy</a></label>
              </div>
              <br />
              <div class="div-row-error div-row-submit">
                <div part="errormsg" class="div-row-error-message"></div>
              </div>
              <div class="div-row-success div-row-submit">
                <div part="successmsg" class="div-row-success-message"></div>
              </div>
              <div class="div-row-submit">
                <input part="submit" id="submit" type="submit" value="Submit" disabled><div class="loader-element"></div>
              </div>
              <div class="div-row-terms">
                <span>I already have an account. <a href="#auth/signin">Sign In</a></span>
              </div>
            </form>
          </div>
        </div>
      `;

    } else if(this.arrHash[0] == 'terms') {

      return html`
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
          <div part="container" class="SfUserAuthCChild">
            <h1 part="title">Terms of Use</h1>
            <slot name="terms"></slot>
          </div>
        </div>
      `;

    } else if(this.arrHash[0] == 'privacy') {

      return html`
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
          <div part="container" class="SfUserAuthCChild">
            <h1 part="title">Privacy</h1>
            <slot name="privacy"></slot>
          </div>
        </div>
      `;

    } else if(this.arrHash[0] == 'signin') {

      return this.getUiSignIn();

    } else if(this.arrHash[0] == 'verify') {

      return html`
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div class="SfUserAuthC">
          <div part="container" class="SfUserAuthCChild">
            <h1 part="title">Verify</h1>
            <form .onsubmit=${() => {this.onFormSubmit(); return false;}}>
              <h4 part="subtitle">Verification email with a one-time-password (OTP) has been sent to <strong>${Util.maskEmail(this.arrHash[1])}</strong></h4>
              <label part="label" for="otp">OTP</label><br />
              <div class="div-row">
                <input part="input" id="otp" type="password" @keyup=${() => {this.onKeyUp('otp')}} placeholder="XXXXXX" autofocus/>
                <span id="otp-toggle" class="material-icons" @click=${this.toggleMask}>visibility</span>
                <span id="error-client-otp" class="error-client material-icons">priority_high</span>
              </div>
              <div class="div-row-error div-row-submit">
                <div part="errormsg" class="div-row-error-message"></div>
              </div>
              <div class="div-row-success div-row-submit">
                <div part="successmsg" class="div-row-success-message"></div>
              </div>
              <div class="div-row-submit">
                <input part="submit" id="submit" type="submit" value="Verify" disabled><div class="loader-element"></div>
              </div>
              <div class="div-row-terms">
                <span>I didn't receive the verification email. <span class="link resend" .onclick=${this.onResendSubmit}>Resend</span></span>
              </div>
            </form>
          </div>
        </div>
      `;

    } else if(this.arrHash[0] == 'refresh') {

      return this.getUiRefresh();

    } else if(this.arrHash[0] == 'signout') {
      return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthC">
        <div part="container" class="SfUserAuthCChild">
          <div class="refresh-container">
            <img .src=${this.logo} class="logo-refresh" />
            <div class="lds-dual-ring-lg"></div>
          </div>
        </div>
      </div>
    `;
    } else if(this.arrHash[0] == 'admin') {
      return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthC">
        <div part="container" class="SfUserAuthCChild">
          <div class="stats-container">
            <h1 part="title">Authentication</h1>
          </div>
          <div class="stats-container">
            <div part="badge" class="badge">Admin</div>
          </div>
          <br />
          <div class="search-container">
            <div class="div-row-search">
              <input part="input" id="search" class="input-search" type="email" @keyup=${() => {this.onKeyUp('search')}} placeholder="Email address please ..." autofocus>
              <button part="submit" class="submit-search" disabled @click=${() => {this.onSearchClick()}}>Search Users</button>
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
      </div>
    `;
    } else if(this.arrHash[0] == 'logs') {

      return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthC">
        <div part="container" class="SfUserAuthCChild">
          <div class="stats-container">
            <h1 part="title">Access Logs</h1>
          </div>
          <div class="stats-container">
            <div part="badge" class="badge">Admin</div>
          </div>
          <br />
          <div class="stats-container">
            <span class="link resend" .onclick=${this.onCancelUserDetails}>${'← back to ' + this.arrHash[2]}</span>
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
      </div>
    `;
    } else if(this.arrHash[0] == 'userdetails') {

      return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthC">
        <div part="container" class="SfUserAuthCChild">
          <div class="stats-container">
            <h1 part="title">User Information</h1>
          </div>
          <div class="stats-container">
                <div part="badge" class="badge">Admin</div>
          </div>
          <br /><br />
          <form onsubmit="return false;">
            <div class="edit-container">
              <span class="link resend" .onclick=${this.onCancelUserDetails}>← Back</span>
              <div>
              <div class="stats-container">
                <button part="buttonprimary" id="unlocked" class="edit-item" @click=${() => {this.onLocked()}}>Cancel</button>
                <button part="buttonprimary" id="locked" class="edit-item" @click=${() => {this.onUnlocked()}}>Edit</button>
              </div>
              </div>
            </div>
          </form>
          <br />
          <form .onsubmit=${() => {this.onFormSubmit(); return false;}}>
            <label part="label" for="name">Name</label><br />
            <div class="div-row">
              <input part="input" id="name" type="text" @keyup=${() => {this.onKeyUp('name')}}>
              <span id="error-client-name" class="error-client material-icons">priority_high</span>
            </div>
            <br />
            <label part="label" for="email">Email</label><br />
            <div class="div-row">
              <input part="input" id="email" type="text" @keyup=${() => {this.onKeyUp('email')}}>
              <span id="error-client-name" class="error-client material-icons">priority_high</span>
            </div>
            <br />
            <label part="label" for="reason">Reason</label><br />
            <div class="div-row">
              <input part="input" id="reason" type="text" @keyup=${() => {this.onKeyUp('reason')}}/>
              <span id="error-client-reason" class="error-client material-icons">priority_high</span>
            </div>
            <br />
            <div class="div-row-userdetails-checkbox">
              <label for="admin">Admin</label>
              <input id="admin" type="checkbox" class="checkbox" @change=${() => {this.onCheckedChange()}}/>    
            </div>
            <div class="div-row-userdetails-checkbox">
              <label for="active">Active</label>
              <input id="active" type="checkbox" class="checkbox" @change=${() => {this.onCheckedChange()}}/>    
            </div>

            <div class="div-row-error div-row-submit">
              <div part="errormsg" class="div-row-error-message"></div>
            </div>
            <div class="div-row-success div-row-submit success-userdetails">
              <div part="successmsg" class="div-row-success-message"></div>
            </div>

            <div class="div-row-submit div-row-submit-userdetails">
              <div class="loader-element"></div>
              <div class="actions-container">
                <button part="buttonprimary" id="logs" class="edit-item" @click=${() => {window.location.href='#auth/logs/email/' + this.arrHash[1] + '/0'}}>View Logs</button>
                <button part="buttonprimary" id="signout" class="edit-item" @click=${() => {window.location.href='#auth/usersignout/' + this.arrHash[1]}}>Sign Out</button>
                <input part="submit" id="submit" class="details-submit" type="submit" value="Submit">
              </div>
            </div>
            
          </form>
        </div>
      </div>
    `;
    } else if(this.arrHash[0] == 'usersignout') {
      return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
      <div class="SfUserAuthC">
        <div part="container" class="SfUserAuthCChild">
          <div class="search-container">
            <div>
              <div class="stats-container">
                <h1 part="title">User Information</h1>
              </div>
              <div class="stats-container">
                <div part="badge" class="badge">Admin</div>
              </div>
              <br />
              <div class="stats-container">
                <div>User ${this.arrHash[1]} is being signed out ...</div>
              </div>
              <div class="refresh-container">
                <img .src=${this.logo} class="logo-refresh" />
                <div class="lds-dual-ring-lg"></div>
              </div>
              <div class="div-row-error div-row-submit">
                <div part="errormsg" class="div-row-error-message"></div>
              </div>
              <div class="div-row-success div-row-submit success-userdetails">
                <div part="successmsg" class="div-row-success-message"></div>
              </div>
              <br />
              <br />  
            </div>
          </div>
        </div>
      </div>
    `;
    } else {
      
      return this.getUiRefresh();

    }

  }

}

declare global {
  interface HTMLElementTagNameMap {
    'sf-user-auth': SfUserAuth;
  }
}
