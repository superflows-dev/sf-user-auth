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
import { Auth } from 'aws-amplify';
/**
 * SfUserAuth element.
 *
 * @fires searchClick - When the user presses the enter key in the search input
 * @property onArgs - Function to get url arguments
 * @slot unreadNotifications - Unread notifications array
 */
let SfUserAuth = class SfUserAuth extends LitElement {
    constructor() {
        super();
        this.onArgs = () => { return []; };
        this.onFormSubmit = async () => {
            try {
                const { user } = await Auth.signUp({
                    username: "hrushi m",
                    password: "123123qqwe",
                    attributes: {},
                    autoSignIn: {
                        enabled: true,
                    }
                });
                console.log(user);
            }
            catch (error) {
                console.log('error signing up:', error);
            }
            return false;
        };
        this.decorateSlots = () => {
        };
        this.copySlots = () => {
        };
        this.initListeners = () => {
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
    render() {
        if (this.onArgs() == null || (this.onArgs().length === 1 && this.onArgs()[0] == "") || this.onArgs().length === 0) {
            return html `
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <h1>Hello Sign Up</h1>
        <form .onsubmit=${this.onFormSubmit}>
          <label for="email">Email Address</label>
          <input id="email" type="text" /><br>
          <label for="password">Password</label>
          <input id="password" type="password"><br><br>
          <input type="submit" value="Submit">
        </form>
      `;
        }
        else {
            return html `
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>  
        <div>Hello</div>
      `;
        }
    }
};
SfUserAuth.styles = css `
    
    .SfUserAuthC {
      background-color: var(--nav-background-color, #fff);
      color: var(--nav-color, #000);
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .SfUserAuthDivLeftContainer {
      display: flex;
      align-items: center;
    }

    .SfUserAuthDivRightContainer {
      display: flex;
      
    }

    .SfUserAuthDivCta {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }

    .SfUserAuthButtonCta {
      font-size: 110%;
    }

    .SfUserAuthDivSearch {
      position: relative;
    }

    .SfUserAuthDivNotif {
      position: relative;
      margin-left: 15px;
    }

    .SfUserAuthDivNotif > h1 {
      cursor: pointer;
    }

    .SfUserAuthDivNotifActions {
      display: flex;
      justify-content: space-between;
    }

    .SfUserAuthDivNotifDropdown {
      display: none;
      position: absolute;
      right: 0px;
      top: 60px;
      flex-direction: column;
      max-height: 300px;
      overflow-y: auto;
    }

    .SfUserAuthDivNotifDropdown > ul {
      list-style: none;
      margin-left: 0px;
      padding-left: 0px;
      margin-bottom: 0px;
      margin-top: 0px;
    }

    .SfUserAuthDivNotifDropdown > ul:first-child > li {
      width: 300px;
      background-color: var(--notif-background-color, #fff);
      color: var(--notif-color, #000);
      padding: 5px;
      margin-bottom: 5px;
      border-radius: 5px;
    }

    .SfUserAuthDivNotifDropdown > ul > li {
      width: 300px;
      color: var(--notif-background-color, #000);
      background-color: var(--notif-color, #ddd);
      padding: 5px;
      margin-bottom: 5px;
      border-radius: 5px;
    }

    .SfUserAuthDivNotifDropdown > ul > li > a > h3 {
      margin-top: 0px;
      margin-bottom: 0px;
    }

    .SfUserAuthDivNotifDropdown > ul > li > a > p {
      margin-top: 5px;
      margin-bottom: 5px;
    }

    .SfUserAuthDivNotifDropdown > ul > li > a > div {
      font-size: 70%;
    }

    .SfUserAuthDivSearch > h1 {
      cursor: pointer;
    }

    .SfUserAuthDivToggleContainer {
      margin-right: 5px;
    }

    .SfUserAuthDivLeftContainer > ::slotted(h2) {
      margin-top: 0px;
      margin-bottom: 0px;
    }

    .SfUserAuthDivToggleContainer > ul {
      display: none;
      position: absolute;
      list-style: none;
      left: 0px;
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 0px;
      padding-right: 0px;
      border-radius: 5px;
      background-color: var(--menu-background-color, #fff);
      color: var(--menu-color, #000);
      cursor: pointer;
    }

    .SfUserAuthDivProfileDropdown > ul {
      list-style: none;
      background-color: var(--menu-background-color, #fff);
      color: var(--menu-color, #000);
      cursor: pointer;
      padding-top: 5px;
      padding-bottom: 5px;
      border-radius: 5px;
      padding-left: 0px;
      padding-right: 0px;
    }

    .SfUserAuthDivProfileDropdown > ul > li {
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 10px;
      padding-right: 10px;
      border: solid 1px transparent;
      min-width: 140px;
    }

    .SfUserAuthDivProfileDropdown > ul > li > ul > li {
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 10px;
      padding-right: 10px;
      border: solid 1px transparent;
      min-width: 100px;
    }

    .SfUserAuthDivProfileDropdown > ul > li > ul > li:first-child {
      margin-top: 5px;
    }

    .SfUserAuthDivProfileDropdown > ul > li > ul {
      display: none;
      list-style: none;
      padding-left: 5px;
    }

    #mainMenu > ul {
      display: flex;
      list-style: none;
      margin-left: 20px;
      margin-right: 20px;
      color: var(--menu-color, #000);
      cursor: pointer;
    }

    .SfUserAuthDivToggleContainer > ul > li > ul {
      display: none;
      position: absolute;
      left: 100%;
      list-style: none;
      margin-top: -25px;
      padding-left: 0px;
      padding-right: 0px;
      padding-top: 5px;
      padding-bottom: 5px;
      margin-left: 1px;
      background-color: var(--menu-background-color, #fff);
      color: var(--menu-color, #000);
      border-radius: 5px;
      cursor: pointer;
    }

    #mainMenu > ul > li > ul {
      display: none;  
      position: absolute;
      list-style: none;
      padding-left: 0px;
      padding-right: 0px;
      padding-top: 5px;
      padding-bottom: 5px;
      margin-top: 10px;
      margin-left: -10px;
      background-color: var(--menu-background-color, #fff);
      color: var(--menu-color, #000);
      border-radius: 5px;
      cursor: pointer;
    }

    .SfUserAuthDivToggleContainer li {
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 10px;
      padding-right: 10px;
      border: solid 1px transparent;
      min-width: 100px;
    }

    #mainMenu li {
      padding: 5px;
      border: solid 1px transparent;
      min-width: 100px;
      text-align: center;
    }

    #mainMenu > ul > li:hover > a{
      font-weight: 800;
    }

    #mainMenu > ul > li > ul > li:hover > a{
      font-weight: 800
    }

    .SfUserAuthDivToggleContainer > div {
      display: none;
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.05);
    }

    #mainMenu > div {
      display: none;
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.05);
    }

    .SfUserAuthToggleRightLeaf {
      display: none;
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
    
    a {
      text-decoration: none;
      color: inherit;
    }
    
    .SfUserAuthToggleLeft {
      padding-top: 0px;
      padding-bottom: 0px;
      margin-top: 0px;
      margin-bottom: 0px;
    }

    #mainMenu > div {
      display: none;
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.05);
    }

    .SfUserAuthDivSearchDropdown {
      display: none;
      position: absolute;
      right: 0px;
      top: 60px;
      padding-top:10px;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      border-radius: 5px;
      background-color: var(--menu-background-color, #fff);
      align-items: center;
    }

    .SfUserAuthDivSearchClose {
      margin-left: 10px;
      font-size: 130%;
      line-height: 1;
      padding-bottom: 5px;
      padding-left: 5px;
      padding-right: 5px;
      cursor: pointer;
    }

    .SfUserAuthInputSearch {

      width: 250px;
      padding-top:5px;
      padding-left: 5px;
      padding-right: 5px;
      padding-bottom: 5px;
    }

    .SfUserAuth404 {
      display: none;
      background-color: #efefef;
      margin: 20px;
      border: dashed 2px gray;
      text-align: center;
      padding-top: 30px;
      padding-bottom: 40px;
    }

    footer {
      background-color: var(--footer-background-color, #fff);
      color: var(--footer-color, #000);
      padding-top: 50px;
      padding-bottom: 50px;
    }

    footer > ::slotted(p) {
      text-align: center;
    }

    .SfUserAuthDivFooterContainer {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-wrap: wrap;
    }

    .SfUserAuthDivFooterLeftContainer{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      flex-direction: column;
    }

    .SfUserAuthDivFooterLeftContainer > ul {
      list-style: none;
      display: flex;
      margin-left: 0px;
      padding-left: 0px;
      margin-bottom: 30px;
    }

    .SfUserAuthDivFooterLeftContainer > ul > li > a > img {
      height: 30px;
      margin-left: 8px;
      margin-right: 8px;
    }

    .SfUserAuthDivFooterBrandContainer{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

    }

    .SfUserAuthDivFooterBrandContainer > a{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .SfUserAuthDivFooterBrandContainer > a > img{
      display: flex;
      justify-content: flex-start;
      height: 130px;
    }

    .SfUserAuthDivFooterBrandContainer > h2{
      margin-top: 30px;
      margin-bottom: 20px;
      line-height: 1.0;
      font-size: 200%;
    }

    .SfUserAuthDivFooterMenuContainer > ul{
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-left: 0px;
      margin-right: 0px;
      padding-left: 0px;
      padding-right: 0px;
    }

    .SfUserAuthDivFooterMenuContainer li{
      width: 300px;
      cursor: pointer;
      text-align: center;
    }

    .SfUserAuthDivFooterMenuContainer ul{
      list-style: none;
    }

    .SfUserAuthDivFooterMenuContainer > ul {
      margin-top: 0px;
    }

    .SfUserAuthDivFooterMenuContainer > ul > li > a {
      font-weight: 600;
      font-size: 120%;
    }
    
    .SfUserAuthDivFooterMenuContainer > ul > li > ul {
      margin-left: 0px;
      padding-left: 0px;
    }

    .SfUserAuthDivFooterMenuContainer > ul > li {
      margin-bottom: 30px;
    }
    
    .SfUserAuthDivFooterMenuContainer > ul > li > ul > li {
      margin-top: 15px;
    }

    .SfUserAuthDivNotifBadge {
      position: absolute;
      margin-top: -45px;
      margin-left: 10px;
      font-size: 70%;
    }

    .SfUserAuthDivProfile {
      display: flex;
      align-items: center;
      margin-left: 20px;
      position: relative;
    }

    .SfUserAuthDivProfileToggle {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .SfUserAuthDivProfileToggle > p{
      font-size:60%;
      margin-left: 3px;
    }

    .SfUserAuthDivProfileToggle > ::slotted(img) {
      height: 30px;
      width: 30px;
      border-radius: 15px;
    }

    .SfUserAuthDivProfileDropdown {
      display: none;
      position: absolute;
      right: 0px;
      top: 40px;
    }

    @media (orientation: landscape) {

      .SfUserAuthDivToggleContainer {
        display: none;
      }      

    }

    @media (orientation: portrait) {

      .SfUserAuthC {
        padding: 10px 10px;
      }

      .SfUserAuthDivLeftContainer > ::slotted(h2) {
        display: none;
      }

      .SfUserAuthMenu {
        display: none;
      }

      .SfUserAuthDivLeftContainer > ::slotted(ul) {
        display: none;
      } 

      #mainMenu {
        display: none;
      }

    }

  `;
__decorate([
    property()
], SfUserAuth.prototype, "onArgs", void 0);
__decorate([
    query('#email')
], SfUserAuth.prototype, "_SfUserAuthEmail", void 0);
__decorate([
    query('#password')
], SfUserAuth.prototype, "_SfUserAuthPassword", void 0);
SfUserAuth = __decorate([
    customElement('sf-user-auth')
], SfUserAuth);
export { SfUserAuth };
//# sourceMappingURL=sf-user-auth.js.map