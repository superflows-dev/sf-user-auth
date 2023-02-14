<img src="https://superflows-images.s3.ap-south-1.amazonaws.com/superflows_logo_gray_c2c.png" width="400"/>

# SfUserAuth

> Authentication web component provided by Superflows. This component allows you to implement a microservice-backed passwordless email-otp-based authentication functionality to your HTML, CSS, and Javascript app.

<br />

[![NPM](https://img.shields.io/npm/v/sf-nav.svg)](https://www.npmjs.com/package/sf-nav) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<br />

## 👋 Introduction

### About Passwordless Sign-ins

Remembering passwords has become a headache these days. Password-less sign-in is in vogue, and naturally so! It is just so convenient as users needn’t remember their passwords! User experience, user convenience, data & privacy protection and security as some of the important aspects that need to be considered, while developing an authentication system. According to my humble opinion, OTP-based password-less authentication is one of the simplest & safest ways to authenticate users.

<br />

### About Microservices

A microservice is an independently deployable module of an application that has a scoped & well-defined functionality. User authentication, user profiling, customer support ticketing, payments & subscriptions are a few modules that can be developed as microservices. You can architect your application such that it is composed of several microservices working in tandem with each other. Broadly speaking, the microservice-based architecture makes your application modular and more maintainable, as it scales.

<br />

### This Tutorial

This tutorial demonstrates how to add microservice-backed passwordless email-otp-based authentication functionality to your HTML, CSS, and Javascript app using SfUserAuth, a low-code web component library.

So brace yourself, get into your developer groove, on your mark, get set and go! 👨‍🔧👩‍🔧

<br />

## 💡 What's New In This Tutorial?

Authentication functionality is critical as your entire application will hinge on it. This tutorial demonstrates the use of the library SfUserAuth, which commoditizes the authentication functionality.

> **SfUserAuth** is a low code solution, which will allow you to add the authentication functionality to your app, even if you are just a junior frontend developer with no knowledge of backend development.

<br />

## **🏆** What Will You Learn At The End Of This Tutorial?

Look at the example below. It is a single-page application developed using purely HTML, CSS and Javascript. It uses the SfUserAuth library for implementing the authentication microservice. Developing this application is the goal of the current tutorial.

Go ahead, open the link in a new tab, and play around with it. To experience the authentication flow, click on the sign-in button.

[Open Example In New Tab](https://Passwordless-Email-OTP-based-Authentication-Microservice.superflowsappv3.repl.co)

<br />

## ⚠ Before You Begin

Please note the pre-requisites of this tutorial:

**Familiarity With Frontend Web Development** - You need to be familiar with the basic concepts of HTML, CSS & Javascript. You need not be an expert developer here, but basic knowledge is necessary. [W3 Schools Roadmap](https://www.w3schools.com/whatis/) could be a good starting point for novices.

<br />

**NPM Installation** - In this example, we will use an NPM-based web server. To follow this tutorial properly, I will recommend that you have npm installed on your development machine. Once you get the hang of it, you can also try the same method on other web servers, no problem!

<br />

**AWS Admin Account** - You also need access to an AWS admin account. The backend of this tutorial will be hosted on AWS. You don’t need backend coding knowledge, just access to the admin console is enough.

<br />

**Editor** - You will also need a good web editor. I like VS Code. You can use any editor of your choice.

<br />

## 📚 Tech-stack

**Frontend** - The frontend of this application will be designed in pure HTML, CSS, and Javascript.

<br />

**Backend** - The backend is based on the auto-scalable technologies of AWS, namely, DynamoDB & Lambda Functions. *Worry not, backend coding knowledge is not required.*

<br />

## 🌲 Software Architecture

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676198516208/7a65352e-766b-40d7-9c28-6968d337cffc.jpeg)

The above diagram depicts the architecture of our application. The authentication module has both the frontend and backend components. However, the application treats it as a black box and doesn't care about its internals.

The application API and the application backend are irrelevant to this tutorial, hence the tutorial doesn't concern itself with them. Here, they are only shown for representational and understanding purposes.

<br />

## 🍽 Step 1 - Project Setup

### 1.1 - Project Directory

Create a new folder on your machine for this task. I called it SfUserAuth-Demo. You can name it as you want.

<br />

### 1.2 - Initialize NPM

```bash
npm init
```

Just accept the default values, and keep pressing ENTER until the initialization completes and the package.json file is generated. Your project will now have only one file, namely package.json.

<br />

### 1.3 - Install the HTTP-server packages

```bash
npm install connect serve-static
```

<br />

### 1.4 - Create the dist/ folder

Create a folder to store all the html files. I called it "dist/".

<br />

### 1.5 - Create index.js

Create index.js, to hold the code for the HTTP server. Paste the code given below in index.js.

```javascript
var connect = require('connect');
var serveStatic = require('serve-static');

connect()
     .use(serveStatic('./dist'))
     .listen(8080, () => console.log('Server running on 8080...'));
```

Your folder structure should look something like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675687322345/af43079d-d039-46c7-8408-82d78dc1ae1a.jpeg)

<br />

### 1.6 - Start the HTTP-server

Start the web server using the below command

```bash
node index.js
```

Browse to **http://localhost:8080/** for confirming that the web server is running. A running server will throw an error message similar to the one given below. This is because we haven't yet created index.html in the dist folder.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675687460484/8bacfea7-00c6-43e4-bca8-3a3a4788bb7d.jpeg)

<br />

### 1.7 Create dist/index.html

Create an index.html file in the dist folder and initialize it with the following code:

```xml
<html>
hello sfnav
</html>
```

Go back to the browser and refresh it. Confirm that the HTTP server now serves the index.html page.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675687563411/8b9c91d8-5115-42de-a5f1-cbb197c75254.jpeg)

<br />

## 💀 Step 2 - Create The HTML App Skeleton

The code of the HTML skeleton is given below. Copy and paste it into your dist/index.html.

```xml
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>&lt;sf-nav&gt; Demo</title>
    <!-- Integration material icons as they are used in sf-nav -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Google fonts integration -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet">
    <!-- Integration the web components module -->
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js"></script>
    <!-- Integration lit and sf-nav web components module -->
    <script type="module">
        import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';
        import {SfNav} from 'https://unpkg.com/sf-nav/sf-nav.js?module';
        import {SfUserAuth} from 'https://unpkg.com/sf-user-auth@1.0.69/sf-user-auth.js?module';
    </script>
    <style>
      
      body {
        background-color: #efefef;
        margin: 0px;
        font-family: 'Source Sans Pro';
      }

      sf-nav:not(:defined) {
        display: none;
      }
      
    </style>
  </head>
  <body style="margin: 0px;">
    <div id="nav-container">
        <sf-nav id="sf-nav">
            <!-- Set the brand name -->
            <h2 slot="brandName"><a href="#home" >Superflows</a></h2>
            <!-- Set the brand logo -->
            <a slot="brandImage" href="#home" ><img alt="logo" src="https://superflows-images.s3.ap-south-1.amazonaws.com/superflows_black_transparent_200.png" /></a>
    
        </sf-nav>
    </div>

  </body>
</html>
```

This skeleton code does the following:

* It sets up the viewport
    
* It includes fonts, you can use any fonts of your choice
    
* It includes the web component loader script
    
* It includes the Lit library. The navigation component (SfNav) and the authentication component (SfUserAuth), both depend on Lit, hence this inclusion
    
* It includes the material icons package, which is required by the SfNav and SfUserAuth web components
    
* It includes the SfNav and SfUserAuth web component libraries
    
* It includes a style block that - (1) Sets some basic styling to the document body and (2) Ensures that the SfNav component will show up only after it is defined properly
    
* It then includes/renders the SfNav component in the body HTML with a brand name and brand image.
    

💾 ↺ **Save dist/index.html, and reload the browser.**

You will see that a bare-bones navigation component has loaded which only contains the brand name and brand image. The point to note is that it contains both the header part and the footer part.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675698870430/d33c0e25-c01f-43fc-a1a8-c4e201eb6519.jpeg)

<br />

## ⥣ Step 3 - Configure The Navigation Bar

### 3.1 Setup Route Container

Create a page content slot in the sf-nav block as shown below. This container sits between the header and footer and dynamically displays the page content as the user navigates across pages.

```xml
<sf-nav>

        <!-- Set the brand name -->
        <h2 slot="brandName"><a href="#home" >Superflows</a></h2>
        <!-- Set the brand logo -->
        <a slot="brandImage" href="#home" ><img alt="logo" src="https://superflows-images.s3.ap-south-1.amazonaws.com/superflows_black_transparent_200.png" /></a>

        <!-- Page Content -->
        <div slot="content">
        </div>
      
</sf-nav>
```

<br />

### 3.2 Setup Parameter Passing

To enable parameter pass-down during routing, include the following Javascript code block in the sf-nav block. This code block:

* Listens to the routeChange event from SfNav and updates the routeMap associative array with the new route and its parameters, every time the routeChange event is fired.
    
* Exposes two functions - (1) getCurrentPathname and (2) getCurrentArgs, which can be used to obtain the current location and the current parameters.
    

```xml
<body>
    <sf-nav>
    <!-- Set the brand name -->
            <h2 slot="brandName"><a href="#home" >Superflows</a></h2>
            <!-- Set the brand logo -->
            <a slot="brandImage" href="#home" ><img alt="logo" src="https://superflows-images.s3.ap-south-1.amazonaws.com/superflows_black_transparent_200.png" /></a>
    
            <!-- Page Content -->
            <div slot="content">
            </div>
    </sf-nav>
    <script>
        var routeMap = [];
  
        function getCurrentPathName() {
          return window.location.hash.length === 0 ? '' : window.location.hash.split("/")[0].replace('#', '');
        }
        function getCurrentArgs() {
          return routeMap[getCurrentPathName() + '.html'];
        }
  
        document.getElementsByTagName('sf-nav')[0].addEventListener('routeChange', (e) => {
          routeMap[e.detail.pathName] = e.detail.args;
        })
    </script>
</body>
```

<br />

### 3.3 Confirm That Routing Works

At this point, the routing configuration is complete.

💾 ↺ **Save dist/index.html, and reload the browser.**

You will observe the following:

* The header and the Footer are now separated with a content block in between.
    
* SfNav now throws the 'Could not find home.html' message. Don't worry, this is perfectly fine because we haven't yet created the home.html file.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675699953801/e32c6358-4f00-4864-883f-8634de90068c.jpeg)

<br />

### 3.4 Create dist/home.html

Create a new file dist/home.html with the below HTML:

```xml
<div class="cContainer">
    <h1>Home Page</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
</div>
```

💾 ↺ **Save dist/home.html, and reload the browser.**

The home page content will now load.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675700086734/4e12f16c-76ef-42ad-94f5-c868f6879967.jpeg)

You will observe that the content loads properly. Let us style it a bit, so that it looks a bit nicer. Add the following styles in the style block of dist/index.html:

```xml
<head>
    <style>
        <!-- other styles -->
        
        .cContainer {
            margin: 10px;
            padding: 20px;
            border: dashed 1px gray;
            background-color: white;
        }
    </style>
</head>
```

💾 ↺ **Save dist/index.html, and reload the browser.**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675700147066/fdd7ce94-e337-41c1-a336-1d6f28f40f84.jpeg)

This looks good for now. We can surmise now that routing is working normally. Let us move ahead.

<br />

### Step 3.5 - Setup Main Menu

SfNav supports two-level menus. Creating it is pretty straightforward. Create an unordered list as shown below and set it to the main menu slot. Some menu items point to internal links (links with hash) and some menu items point to external links (links with http(s)).

In this example, we create and insert the menu dynamically into the navbar. Hence the menu is defined in Javascript as shown:

```javascript
const menu = `
            <!-- Set the main menu -->
            <ul slot="mainMenu">
                <li><a href="#about">About</a></li>
                <li class="li-solutions">
                    <a href="javascript:void(0);" class="a-solutions">Solutions</a>
                    <ul>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#products">Products</a></li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0);">Contact Us</a>
                    <ul>
                        <li><a href="https://instagram.com">Instagram</a></li>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://youtube.com">YouTube</a></li>
                    </ul>
                </li>
            </ul>
        `;
```

To accommodate the dynamic insertion of the menu, we restructure the index.html a little bit. It should look like:

```xml
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>&lt;sf-nav&gt; Demo</title>
    <!-- Integration material icons as they are used in sf-nav -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Google fonts integration -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet">
    <!-- Integration the web components module -->
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js"></script>
    <!-- Integration lit and sf-nav web components module -->
    <script type="module">
        import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';
        import {SfNav} from 'https://unpkg.com/sf-nav/sf-nav.js?module';
        import {SfUserAuth} from 'https://unpkg.com/sf-user-auth@1.0.69/sf-user-auth.js?module';
    </script>
    <style>
      
      body {
        background-color: #efefef;
        margin: 0px;
        font-family: 'Source Sans Pro';
      }

      sf-nav:not(:defined) {
        display: none;
      }

      .cContainer {
            margin: 10px;
            padding: 20px;
            border: dashed 1px gray;
            background-color: white;
        }
      
    </style>
  </head>
  <body style="margin: 0px;">
    <div id="nav-container">
        <sf-nav id="sf-nav">
            <!-- Set the brand name -->
            <h2 slot="brandName"><a href="#home" >Superflows</a></h2>
            <!-- Set the brand logo -->
            <a slot="brandImage" href="#home" ><img alt="logo" src="https://superflows-images.s3.ap-south-1.amazonaws.com/superflows_black_transparent_200.png" /></a>
            
    
            <!-- Page Content -->
            <div slot="content">
            </div>
    
            <!-- Call to action -->
            <a slot="cta" href="#auth/signin">Sign In</a>
    
            <!-- Copyright notice -->
            <p slot="copyright">Copyright 2022 Superflows</p>
    
            <!-- Set the social media links -->
            <ul slot="socialMedia">
                <li><a href="https://facebook.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/facebook-black_round.png" /></a></li>
                <li><a href="https://twitter.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/twitter_black_round.png" /></a></li>
                <li><a href="https://youtube.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/youtube_black_round.png" /></a></li>
            </ul>
    
        </sf-nav>
    </div>

    <script>

        //
        // Navigation bar related Javascript
        //

        // Hash map for storing paths & arguments
        var routeMap = [];

        // Menu HTML to be inserted into sf-nav
        const menu = `
            <!-- Set the main menu -->
            <ul slot="mainMenu">
                <li><a href="#about">About</a></li>
                <li class="li-solutions">
                    <a href="javascript:void(0);" class="a-solutions">Solutions</a>
                    <ul>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#products">Products</a></li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0);">Contact Us</a>
                    <ul>
                        <li><a href="https://instagram.com">Instagram</a></li>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://youtube.com">YouTube</a></li>
                    </ul>
                </li>
            </ul>
        `;

        // What's the current path?
        function getCurrentPathName() {
            return window.location.hash.length === 0 ? '' : window.location.hash.split("/")[0].replace('#', '');
        }

        // What are the current arguments?
        function getCurrentArgs() {
            return routeMap[getCurrentPathName() + '.html'];
        }

        // Initiate navigation bar listeners
        function initiateListeners() {
            document.getElementsByTagName('sf-nav')[0].addEventListener('routeChange', (e) => {
                routeMap[e.detail.pathName] = e.detail.args;
            })
        }
        
        // 
        // Handling the authentication
        // 

        // Initiate the menu (first load)
        function insertSfNavMenu() {
            const currentInnerHTML = document.getElementsByTagName('sf-nav')[0].innerHTML;
            const newInnerHTML = currentInnerHTML + menu;
            document.getElementById('nav-container').innerHTML = '<sf-nav>'  + newInnerHTML + '</sf-nav>';
            initiateListeners();
            
        }
       
        function initPage() {

            insertSfNavMenu();

        }

        initPage();

    </script>
  </body>
</html>
```

💾 ↺ **Save dist/index.html, and reload the browser.**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675700331977/a6f7bc03-7465-47d9-b73c-2abab0fff92e.jpeg)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675700347122/0befc882-837a-4fcc-9f08-747b5b351bc2.png)

If you click on any menu items with internal links such as services, products, you will observe that SfNav throws the file not found message. This is because we haven't yet created these files.

<br />

### Step 3.6 - Setup Social Media Links

Social media links can be configured using an unordered list as well. Below is an example:

```xml
<body>
    <sf-nav>
        
        <!-- Set the social media links -->
        <ul slot="socialMedia">
            <li><a href="https://facebook.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/facebook-black_round.png" /></a></li>
            <li><a href="https://twitter.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/twitter_black_round.png" /></a></li>
            <li><a href="https://youtube.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/youtube_black_round.png" /></a></li>
        </ul>

    </sf-nav>
</body>
```

💾 ↺ **Save dist/index.html, and reload the browser.**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675700426955/dcb26d69-280c-4869-bb60-ab03daa46781.jpeg)

<br />

### Step 3.7 - Copyright Notice

The copyright notice can be configured in the footer as follows:

```xml
<body>
    <sf-nav>
        
        <!-- Copyright notice -->
        <p slot="copyright">Copyright 2022 Superflows</p>

    </sf-nav>
</body>
```

💾 ↺ **Save dist/notification.html, and reload the browser.**

The copyright notice will be displayed in the footer.

<br />

### Step 3.8 - Setup Call To Action Button

To initiate the authentication flow, we need a call to action button on the navigation bar. In SfNav, it can be configured as follows:

```xml
<body>
    <sf-nav>
        
        <!-- Call to action -->
        <a slot="cta" href="#auth">Sign In</a>

     </sf-nav>
</body>
```

💾 ↺ **Save dist/notification.html, and reload the browser.**

The call to action button will be displayed in the header.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675700913852/7120f133-5c5e-4b6a-ada1-565449218f7e.jpeg)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675700933412/75f13e3e-6eb0-46bd-bc68-4c26aab5072b.png)

<br />

### Step 3.9 - Handle Search

Search functionality is available by default. Just subscribe to the searchClick event to capture the event when the user types something in the search box and presses Enter.

```xml
<script>
document.getElementsByTagName('sf-nav')[0].addEventListener('searchClick', (e) => {console.log('search clicked ' + JSON.stringify(e.detail));})
</script>
```

<br />

### Step 3.10 - Review dist/index.html

After the modifications in the previous steps, the dist/index.html should look like the following:

```xml
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>&lt;sf-nav&gt; Demo</title>
    <!-- Integration material icons as they are used in sf-nav -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Google fonts integration -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet">
    <!-- Integration the web components module -->
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js"></script>
    <!-- Integration lit and sf-nav web components module -->
    <script type="module">
        import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';
        import {SfNav} from 'https://unpkg.com/sf-nav/sf-nav.js?module';
        import {SfUserAuth} from 'https://unpkg.com/sf-user-auth@1.0.69/sf-user-auth.js?module';
    </script>
    <style>
      
      body {
        background-color: #efefef;
        margin: 0px;
        font-family: 'Source Sans Pro';
      }

      sf-nav:not(:defined) {
        display: none;
      }

      .cContainer {
            margin: 10px;
            padding: 20px;
            border: dashed 1px gray;
            background-color: white;
        }
      
    </style>
  </head>
  <body style="margin: 0px;">
    <div id="nav-container">
        <sf-nav id="sf-nav">
            <!-- Set the brand name -->
            <h2 slot="brandName"><a href="#home" >Superflows</a></h2>
            <!-- Set the brand logo -->
            <a slot="brandImage" href="#home" ><img alt="logo" src="https://superflows-images.s3.ap-south-1.amazonaws.com/superflows_black_transparent_200.png" /></a>
            
    
            <!-- Page Content -->
            <div slot="content">
            </div>
    
            <!-- Call to action -->
            <a slot="cta" href="#auth/signin">Sign In</a>
    
            <!-- Copyright notice -->
            <p slot="copyright">Copyright 2022 Superflows</p>
    
            <!-- Set the social media links -->
            <ul slot="socialMedia">
                <li><a href="https://facebook.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/facebook-black_round.png" /></a></li>
                <li><a href="https://twitter.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/twitter_black_round.png" /></a></li>
                <li><a href="https://youtube.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/youtube_black_round.png" /></a></li>
            </ul>
    
        </sf-nav>
    </div>

    <script>

        //
        // Navigation bar related Javascript
        //

        // Hash map for storing paths & arguments
        var routeMap = [];

        // Menu HTML to be inserted into sf-nav
        const menu = `
            <!-- Set the main menu -->
            <ul slot="mainMenu">
                <li><a href="#about">About</a></li>
                <li class="li-solutions">
                    <a href="javascript:void(0);" class="a-solutions">Solutions</a>
                    <ul>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#products">Products</a></li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0);">Contact Us</a>
                    <ul>
                        <li><a href="https://instagram.com">Instagram</a></li>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://youtube.com">YouTube</a></li>
                    </ul>
                </li>
            </ul>
        `;

        // What's the current path?
        function getCurrentPathName() {
            return window.location.hash.length === 0 ? '' : window.location.hash.split("/")[0].replace('#', '');
        }

        // What are the current arguments?
        function getCurrentArgs() {
            return routeMap[getCurrentPathName() + '.html'];
        }

        // Initiate navigation bar listeners
        function initiateListeners() {
            document.getElementsByTagName('sf-nav')[0].addEventListener('searchClick', (e) => {console.log('hurray ' + JSON.stringify(e.detail));})
            document.getElementsByTagName('sf-nav')[0].addEventListener('routeChange', (e) => {
                routeMap[e.detail.pathName] = e.detail.args;
            })
        }
        
        // Initiate the menu (first load)
        function insertSfNavMenu() {
            const currentInnerHTML = document.getElementsByTagName('sf-nav')[0].innerHTML;
            const newInnerHTML = currentInnerHTML + menu;
            document.getElementById('nav-container').innerHTML = '<sf-nav>'  + newInnerHTML + '</sf-nav>';
            initiateListeners();
            
        }
       
        function initPage() {

            insertSfNavMenu();

        }

        initPage();

    </script>
  </body>
</html>
```

<br />

## 🧃 Step 4 - Create The Authentication Flow Container Page

In the above section, we have created the call to action button as follows:

```xml
<!-- Call to action -->
<a slot="cta" href="#auth">Sign In</a>
```

This means, clicking on the sign-in button should load the auth page. Go ahead and click it.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675739193769/3e8d50b9-3023-4e24-80b4-6d0783834d83.jpeg)

Page not found error will be shown because we haven't yet created that page. So let us create the dist/auth.html page then with the code given below:

```xml
<div class="cContainer">
    <h1>Auth Page</h1>
    <p>This is the container page for the authentication flow</p>
</div>
```

💾 ↺ **Save dist/auth.html, and reload the browser.**

The auth page content will be loaded now.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675739563316/ec4379d0-8722-491e-aa27-0d4d5601c040.jpeg)

Your folder structure should look something like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675741055971/fe7194c6-c6ff-4f4a-994d-cf8d6bd1cb8f.jpeg)

> At this point, we are done with the initial setup of our frontend. Time to set up our backend now.

<br />

## 🔑 Step 5 - Create AWS Credentials

### 5.1 - Sign In To AWS Admin Account

Sign in to the AWS console with your AWS admin account. Go to IAM &gt; Users.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675740756118/7317f1c2-7e1a-43c9-86a0-50da14c22999.jpeg)

<br />

### 5.2 - Add User &gt; Details

Click on **Add Users**. In the Specify user details step write the name as **SfUserAuthDemo**. Let the enable console access option remain unchecked. Do not select it.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675741319879/e58f873e-c22b-4049-b311-8d8ad3ee0c94.jpeg)

Click Next.

<br />

### 5.3 - Add User &gt; Permissions

On the set permission page, choose the '**Attach policies directly**' option. Permissions will then drop down below. From the list of permissions, search and attach the following permissions one by one:

* AmazonAPIGatewayAdministrator
    
* AmazonAPIGatewayInvokeFullAccess
    
* AmazonDynamoDBFullAccess
    
* AmazonS3FullAccess
    
* AmazonSESFullAccess
    
* IAMFullAccess
    
* AWSLambda\_FullAccess
    

Do not set the permissions boundary. Leave it untouched.

Click **Next**.

<br />

### 5.4 - Add User &gt; Review & Create

Review and confirm that you have attached the policies properly.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675829740871/fc82cd98-5b26-47c4-89f5-8ddac07679e6.jpeg)

Click **Create User**.

The user should get created successfully as shown in the image below:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675742823509/bc9833d8-077d-44b5-b5c3-975b26895566.jpeg)

<br />

### 5.5 - Create User Credentials

Click on the user. The user information would load. Then click on the '**Security Credentials**' tab.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675766807506/e2524743-14df-40c1-9b49-23a9175d1a59.jpeg)

Since we haven't created any access keys yet, it will show '**No access keys**'. Go ahead and click on the '**Create access key**' button.

In step 1, choose the '**Command Line Interface (CLI)**' option and check the '**I understand**' checkbox.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675767222642/674d88a7-5f08-4622-af19-3f1b49d2ae28.jpeg)

Click **Next**.

In step 2, insert the text '**Access key to setup the backend for SfUserAuthDemo**' in the description field.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675770051889/42666eea-1b99-462c-bca4-5ecfdb58a142.jpeg)

Click on **Create access key**.

In step 3, retrieve your access key. Save your access key and secret in a secure location.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675770416217/9f52524a-a42c-4932-bafb-540066919c48.jpeg)

> At this point, we have completed creating the credentials. Now let us use those credentials and set up the cloud shell.

<br />

## 🖥 Step 6 - Initialize The AWS Cloud Shell

Go to **Cloud Shell** on AWS. A browser-based shell console will open. Type the aws configure command to configure the cloud shell.

```bash
aws configure
```

* When prompted, copy and paste the access key id and the access key secret, which you just created in the previous step.
    
* Use any aws region of your choice. In case you are unsure, please look up the region from [here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html).
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675771752675/221b9b43-5394-4f08-83bc-5f4f7f457925.jpeg)

<br />

## ⬇ Step 7 - Clone The Backend

Clone the backend repository into the cloud shell as shown below. You can also find the source code [here](https://github.com/superflows-dev/sf-user-auth-backend).

```bash
[cloudshell-user@ip-aa-bb-cc-dd ~]$ git clone https://github.com/superflows-dev/sf-user-auth-backend.git
```

It should look something like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675787855563/71684e26-2681-4185-8e4f-126413aa023f.jpeg)

<br />

## 🔧 Step 8 - Configure The Backend Deployment Script (Test Mode)

After the clone is successful, go to the source directory.

```bash
[cloudshell-user@ip-aa-bb-cc-dd ~]$ cd sf-user-auth-backend/
```

Open the config file '**aws.config.sh**' using vim.

```bash
[cloudshell-user@ip-aa-bb-cc-dd sf-user-auth-backend]$ vim aws.config.sh
```

The initial part of the script contains the 'script config section'. That needs to be configured properly. It will look something like this:

```bash
###########
# Script Config
###########

adminemail=admin@abc.com
correspondenceemail=hello@abc.com
awsregion=us-east-1
awsaccount=121212121212
apistage=test
weborigin=http://localhost:8000
appname=MyAppName
tablename=T_SF_User_Auth_test
rolename=R_SF_User_Auth_test
policyname=P_SF_User_Auth_test
functionname=F_SF_User_Auth_test
api=API_SF_User_Auth_test

###########
# Script Config Ends
###########
```

Following is the explanation of all the parameters in the script config section:

**adminemail** - It is the first user of the microservice and is considered as the administrator. Its record in the database has an admin flag.

**correspondenceemail** - This email address is used for communication purposes for example sending a one-time password (OTP).

*Please note that a verification link will be sent to this email address, so ensure you have access to its inbox.*

**awsregion** - This is the same region, which you have chosen in Step 6 of this tutorial.

**awsaccount** - This is the unique 12-digit number that identifies your aws account. You can obtain this number by clicking on your aws account name dropdown in the top right corner of the aws console.

**apistage** - The default stage is test. You can change it to prod and run the script again to create a separate production stage. But first, ensure that the test stage is configured and running properly. When you are in development mode, use the test stage.

**weborigin** - This is the web origin, where your frontend website will be deployed. For example, when you are developing on your local machine, it will be on localhost. In our current tutorial, as seen in Step 1.6, our frontend project is running on http://localhost:8080, so we will set our WebOrigin to http://localhost:8080. But when you move to production, WebOrigin should be the URL, where the frontend will be deployed.

**appname** - Name of your application.

**tablename** - This is the DynamoDB table that stores the data. You can maintain the default nomenclature, which is T\_SF\_User\_Auth\_&lt;stage&gt;

**rolename** - This is the name of the role that gets created as a part of the deployment process. You can maintain the default nomenclature, which is R\_SF\_User\_Auth\_&lt;stage&gt;

**policyname** - This is the name of the policy that gets created as a part of the deployment process. You can maintain the default nomenclature, which is P\_SF\_User\_Auth\_&lt;stage&gt;

**functionname** - This is the name of the lambda function that gets created as a part of the deployment process. You can maintain the default nomenclature, which is F\_SF\_User\_Auth\_&lt;stage&gt;

**api** - This is the name of the API that gets created as a part of the deployment process. You can maintain the default nomenclature, which is API\_SF\_User\_Auth\_&lt;stage&gt;

To configure, set the :

* adminemail &gt; email address, which you want to set as admin
    
* correspondenceemail &gt; email address, which will be used for correspondence, verification required
    
* awsregion &gt; region of your choice
    
* awsaccount &gt; your aws account id
    
* weborigin &gt; url where frontend is deployed (mostly localhost if developing on local machine)
    
* appname &gt; name of your application
    

Leave the rest untouched. Close the vim editor.

<br />

## ▶️ Step 9 - Run The Backend Deployment Script (Test Mode)

Run the backend deployment script as follows:

```bash
[cloudshell-user@ip-aa-bb-cc-dd sf-user-auth-backend]$ bash aws.config.sh
```

The script will run, the output will be something like this:

```bash
Hello there! I will be guiding you today to complete the aws configuration. There are a few steps involved, but you needn't worry, I will do all the heavy lifting for you 😀. In between though, I will need some inputs from you and will need you to follow my instructions. Just stay with me and I think you'll be good!

=========================
Step 1: SES Configuration
=========================

>> Correspondence email: suxxxxxxxxxx@gmail.com

💬 Email identity suxxxxxxxxxx@gmail.com creation SUCCESSFUL  ✓ : "EMAIL_ADDRESS"

⏳ Checking the status of Email identity suxxxxxxxxxx@gmail.com

💬 SES: Email identity suxxxxxxxxxx@gmail.com not yet ready for sending  ⚠  emails

>> Instruction
💬 Verification email has been sent to suxxxxxxxxxx@gmail.com, verify it

>> Next Steps
💬 Do what the instruction says, then come back here and run me again

Exiting for now...
```

In the first execution, the script adds the correspondence email in aws and triggers the verification email. Go to the inbox of your correspondence email. You will have received an email, which will look something like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675828332960/7cb74735-db08-40a6-8cbe-444fb5824366.jpeg)

Click on the **verification link**. AWS will verify it and forward you to the success page.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675828492360/7c1f7b94-69ae-4f53-a902-5f67d4aedd90.jpeg)

After the correspondence email is verified successfully, run the backend deployment script again:

```bash
[cloudshell-user@ip-aa-bb-cc-dd sf-user-auth-backend]$ bash aws.config.sh
```

The script will run and deploy the backend. For the sake of brevity, I am not posting the entire output of the script here. If the backend deployment is successful, the last few lines of the output will look something like this:

```bash

⏳ Deploying API Gateway function

💬 Auth deployment creation SUCCESSFUL  ✓ : "2asdwp"
Script Ended...
```

<br />

## ☑ Step 10 - Double-check The Backend Deployment (Test Mode)

### 10.1 - Check API Gateway

Go to API Gateway in the AWS console. You will see the API '**API\_SF\_User\_Auth\_test**' created.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675856507723/e4d3407b-46a6-4635-bc60-6cb3b0b95359.jpeg)

Click on it. Confirm that you are seeing 6 resources - **refresh, resend, signin, signup, validate & verify**. It should look something like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675856523282/c94302d9-cac9-478d-b954-e4675b218a6b.jpeg)

<br />

### 10.2 - Check IAM

Go to IAM &gt; Access Management &gt; Policies in the AWS console. You will see the policy '**P\_SF\_User\_Auth\_test**' created.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675856821072/67e37c24-9291-49a7-8acb-fd855aebfa9c.jpeg)

Go to IAM &gt; Access Management &gt; Roles in the AWS console. You will see the policy '**R\_SF\_User\_Auth\_test**' created.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675856961447/d3480db0-aa45-4aae-b8ea-f880913d78ec.jpeg)

<br />

### 10.3 - Check Lambda Function

Go to Lambda Functions in the AWS console. You will see the function '**F\_SF\_User\_Auth\_test**' created.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675857210227/13a1b745-f852-4df4-b473-35ea27f4c7d2.jpeg)

### 10.4 - Check DynamoDB

Go to the DynamoDB in the AWS console. Click on Tables. You will see the table '**T\_SF\_User\_Auth\_test**' created.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675861214589/5f925792-ec91-438f-8e9e-5a078984f54d.jpeg)

Click on the table '**T\_SF\_User\_Auth\_test**'. Then click on **Explore Items**. You will see that one record with the admin email that you provided, is created and its admin flag is set to true.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675861330519/dad8aa82-909a-4b47-9eae-d2a2ad5f3796.jpeg)

> Arriving at this point, we can conclude that the backend has been set up and configured properly. It is now time to go back and work on the frontend.

<br />

## 🚪 Step 11 - Create The Authentication Frontend

### 11.1 - Update dist/auth.html with template

Update dist/auth.html with the following code. This piece of code:

* Creates a container div
    
* Includes the SfUserAuth component (which is already imported in dist/index.html)
    

```bash
<div class="cContainer">
    <sf-user-auth id="sf_auth" appName="Superflows" apiId="<api-id>" logo="https://superflows-images.s3.ap-south-1.amazonaws.com/superflows_black_transparent_200.png">
        <div slot="privacy">
            <h1>Privacy</h1>
            <p>Privacy policy goes here
        </div>
        <div slot="terms">
            <h1>Terms</h1>
            <p>Terms & Conditions go here
        </div>
    </sf-user-auth>
</div>
<script>
    document.querySelector('#sf_auth').onArgs = getCurrentArgs;
</script>
```

💾 ↺ **Save dist/auth.html, and reload the browser.**

Click on the Sign In Button in the navigation bar. You will be redirected to the Sign In page of the authentication microservice. This indicates that the SfUserAuth component has been integrated properly in the frontend.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676006416596/873244ac-74a5-4555-a1eb-a4f6f3f04bcb.jpeg)

<br />

### 11.2 - Handle Sign In And Sign Out Events

SfUserAuth triggers the following events:

* **accessTokenReceived** - after successful sign-in, this event is triggered. The payload of this event contains the access token, which can be used for further operations.
    
* **signedOut** - after successful sign-out
    

It is the responsibility of the enclosing HTML app to subscribe to these events and do the needful handling.

When the SfUserAuth module triggers the **accessTokenReceived** event, the access token obtained from its payload should be stored in a memory variable. It should never be stored in permanent storage such as cookies, or local storage. If the access token expires, control should be transferred back to the SfUserAuth component. It maintains a refresh token internally and issues a new access token using it.

After every hard refresh, it is the responsibility of the HTML app to transfer the control to the SfUserAuth module and obtain the access token. If the access token is obtained successfully, sign-in is valid and the navigation bar should be updated by showing the profile image and the profile menu. If the access token is expired and cannot be refreshed even by the refresh token, it declines to provide the access token to the HTML app. It triggers the signedOut event instead. Should such a scenario arise, the HTML app should implement its sign-out protocol and update its navigation bar and hide the profile section.

Modified dist/index.html:

```xml
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>&lt;sf-nav&gt; Demo</title>
    <!-- Integration material icons as they are used in sf-nav -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Google fonts integration -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet">
    <!-- Integration the web components module -->
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js"></script>
    <!-- Integration lit and sf-nav web components module -->
    <script type="module">
        import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';
        import {SfNav} from 'https://unpkg.com/sf-nav/sf-nav.js?module';
        import {SfUserAuth} from 'https://unpkg.com/sf-user-auth@1.0.69/sf-user-auth.js?module';
    </script>
    <style>
      
      body {
        background-color: #efefef;
        margin: 0px;
        font-family: 'Source Sans Pro';
      }

      sf-nav:not(:defined) {
        display: none;
      }

      .cContainer {
            margin: 10px;
            padding: 20px;
            border: dashed 1px gray;
            background-color: white;
        }
      
    </style>
  </head>
  <body style="margin: 0px;">
    <div id="nav-container">
        <sf-nav id="sf-nav">
            <!-- Set the brand name -->
            <h2 slot="brandName"><a href="#home" >Superflows</a></h2>
            <!-- Set the brand logo -->
            <a slot="brandImage" href="#home" ><img alt="logo" src="https://superflows-images.s3.ap-south-1.amazonaws.com/superflows_black_transparent_200.png" /></a>
            
    
            <!-- Page Content -->
            <div slot="content">
            </div>
    
            <!-- Call to action -->
            <a slot="cta" href="#auth/signin">Sign In</a>
    
            <!-- Copyright notice -->
            <p slot="copyright">Copyright 2022 Superflows</p>
    
            <!-- Set the social media links -->
            <ul slot="socialMedia">
                <li><a href="https://facebook.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/facebook-black_round.png" /></a></li>
                <li><a href="https://twitter.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/twitter_black_round.png" /></a></li>
                <li><a href="https://youtube.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/youtube_black_round.png" /></a></li>
            </ul>
    
        </sf-nav>
    </div>

    <script>

        //
        // Navigation bar related Javascript
        //

        // Hash map for storing paths & arguments
        var routeMap = [];

        // Menu HTML to be inserted into sf-nav
        const menu = `
            <!-- Set the main menu -->
            <ul slot="mainMenu">
                <li><a href="#about">About</a></li>
                <li class="li-solutions">
                    <a href="javascript:void(0);" class="a-solutions">Solutions</a>
                    <ul>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#products">Products</a></li>
                    </ul>
                </li>
                <li>
                    <a href="javascript:void(0);">Contact Us</a>
                    <ul>
                        <li><a href="https://instagram.com">Instagram</a></li>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://youtube.com">YouTube</a></li>
                    </ul>
                </li>
            </ul>
        `;
        
        // Profile menu HTML to be inserted into sf-nav
        const profileMenu = `
            <ul id="profile-menu" slot="profileMenu">
                <li>
                    <a href="#auth/signout">Sign Out</a>
                </li>
            </ul>
        `;

        // Profile image HTML to be inserted into sf-nav
        const profileImg = `
            <img id="profile-img" alt="profile" slot="profilePicture" src="https://superflows-images.s3.ap-south-1.amazonaws.com/user.png" />
        `;

        // What's the current path?
        function getCurrentPathName() {
            return window.location.hash.length === 0 ? '' : window.location.hash.split("/")[0].replace('#', '');
        }

        // What are the current arguments?
        function getCurrentArgs() {
            return routeMap[getCurrentPathName() + '.html'];
        }

        // Initiate navigation bar listeners
        function initiateListeners() {
            document.getElementsByTagName('sf-nav')[0].addEventListener('searchClick', (e) => {console.log('hurray ' + JSON.stringify(e.detail));})
            document.getElementsByTagName('sf-nav')[0].addEventListener('routeChange', (e) => {
                routeMap[e.detail.pathName] = e.detail.args;
            })
        }
        
        // 
        // Handling the authentication
        // 

        // Initiate the menu (first load)
        function insertSfNavMenu() {
            const currentInnerHTML = document.getElementsByTagName('sf-nav')[0].innerHTML;
            const newInnerHTML = currentInnerHTML + menu;
            document.getElementById('nav-container').innerHTML = '<sf-nav>'  + newInnerHTML + '</sf-nav>';
            initiateListeners();
            
        }

        // Update the navigation bar after sign in successful
        function insertSignInSfNavMenu() {

            window.location.hash='#home';
            
            setTimeout(() => {
                const currentInnerHTML = document.getElementsByTagName('sf-nav')[0].innerHTML;
                console.log(currentInnerHTML);
                const newInnerHTML = currentInnerHTML + (currentInnerHTML.indexOf('profilePicture') < 0 ? profileImg : "") + menu + profileMenu;
                document.getElementById('nav-container').innerHTML = '<sf-nav>'  + newInnerHTML + '</sf-nav>';
                initiateListeners();    
            }, 500);
            
        }

        // Update the navigation bar after sign out successful
        function insertSignOutSfNavMenu() {

            window.location.hash='#home';

            setTimeout(() => {

                if(document.getElementById('profile-img') != null) {
                    document.getElementById('profile-img').outerHTML = '';
                    const currentInnerHTML = document.getElementsByTagName('sf-nav')[0].innerHTML;
                    const newInnerHTML = currentInnerHTML + menu;
                    document.getElementById('nav-container').innerHTML = '<sf-nav>'  + newInnerHTML + '</sf-nav>';
                    initiateListeners();
                }

            }, 500);

        }
       
        function initPage() {

            insertSfNavMenu();
            window.location.hash = '#auth';

        }

        initPage();

    </script>
  </body>
</html>
```

Modified dist/auth.html

```xml
<div class="cContainer">
    <sf-user-auth id="sf_auth" appName="Superflows" apiId="bdbdff3oa9" logo="https://superflows-images.s3.ap-south-1.amazonaws.com/superflows_black_transparent_200.png">
        <div slot="privacy">
            <h1>Privacy</h1>
            <p>Privacy policy goes here
        </div>
        <div slot="terms">
            <h1>Terms</h1>
            <p>Terms & Conditions go here
        </div>
    </sf-user-auth>
</div>
<script>

    var accessToken;

    document.querySelector('#sf_auth').onArgs = getCurrentArgs;
    document.getElementsByTagName('sf-user-auth')[0].addEventListener('accessTokenReceived', (e) => {
        accessToken = e.detail.accessToken.token;
        insertSignInSfNavMenu();
        //console.log('setting hash');

    })
    document.getElementsByTagName('sf-user-auth')[0].addEventListener('signedOut', (e) => {
        insertSignOutSfNavMenu();
    })
</script>
```
<br />

### 11.3 - Connect The Backend To The Frontend

We still haven't connected the backend to the frontend. Go to AWS API Gateway and note the API ID of '**API\_SF\_User\_Auth\_test**'.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676006719098/42ccd0c9-ddcd-4348-b5a5-76a81498ed2d.jpeg)

Copy this API ID and paste it into the apiId property of the sf-user-auth component.

> **This connects the SfUserAuth component, the frontend of the microservice to the API Gateway, which is the backend of the microservice.**

<br />

### 11.4 - Sanity Check

**Reload the browser.**

Click on the sign-in button in the navigation bar. The sign-in page of the auth module will load. Enter any random email address in the email input and submit. Since that email does not exist in the database, '**Account does not exist!**' error will be thrown. If this error is thrown, you can safely assume that the frontend-backend connection has been done properly and the microservice is ready to be used in test mode.

Something like this should be shown:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676051038476/b721bab9-9d34-4dea-b1c4-7580f99f4ae1.jpeg)

<br />

## 📧 Step 12 - Receiving OTPs During Testing

AWS's Simple Email Service (SES) is used for sending one-time passwords via emails. SES works in two modes - (1) Sandbox (used for testing) and (2) Production. In the sandbox mode, SES only delivers emails to verified email addresses. So all those email addresses, which you'll be using for receiving OTPs during testing, need to be manually added into SES and then subsequently verified as well.

Go to **AWS &gt; SES**. Something like this should show up:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676051822118/9b378280-fa40-4bfb-80c8-f9e885558715.jpeg)

Click on the **Left sidebar&gt; Configuration &gt; Verified identities**.

A list of verified emails would show up. It will most probably contain one verified identity, your correspondence email address, which you verified in Step 9.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676052065990/d7c116bd-6fd4-4922-aa7d-8766a7325fff.jpeg)

Click on '**Create identity**'.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676052651019/0b898e21-e7e9-45d5-af50-eed27b53a30f.jpeg)

The Create identity page will open up. Choose 'Email address' as the option and enter the email address on which, you wish to receive the OTP, during testing.

Then click the 'Create identity' button. Post this, an email will be sent to the email address with a verification link. Click on it and complete the verification process.

Repeat this process for all the other email addresses, you wish to use during testing.

<br />

## 🧍 Step 13 - Test The Sign-Up Step

You are already on the sign-in page at the end of Step 11. Let us start by creating a new account. Click on the Sign-Up link at the bottom. It will take you to the Sign Up page.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676087035892/fe96c995-2326-40b8-a6cb-fb90e032b7fe.jpeg)

Fill up the sign-up form. While filling up, you will notice that the client-side and server-side error handling has already been implemented.

> **Tip**
> 
> * Please use the email address, you verified in step 12 for testing the sign-up flow. Since your AWS SES is in development mode at the moment, it is capable of delivering emails to only verified identities.
>     
> * You can also try using the admin email address, you provided in Step 8. It will throw an error as it already exists in the database.
>     

Press submit. If all goes well, a new account for that email address will be created in the backend. A one-time password will be emailed and the user will be taken to the OTP page.

<br />

## 🔑 Step 14 - Test The OTP Page

The OTP page will look something like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676088126270/c4f852d6-8a71-4bd8-94e8-74c792d285d5.jpeg)

The OTP email will look something like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676088454360/8bfd3bcd-7590-4494-924d-a4b47deefc6e.jpeg)

Enter the OTP and press submit. If the entered OTP is valid and correct, the home page will be loaded. Pay particular attention to the navigation bar, where the profile section has been added.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676125593685/10738659-57a8-43da-b74f-abb209e1ebbf.jpeg)

<br />

## 🔑 Step 15 - Test The Sign-Out Flow

Click on the profile picture dropdown. You will see the sign-out option as a part of the profile menu:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676125814203/29e851a9-6638-4a1d-a410-54e4b864e4f9.jpeg)

Click on Sign Out and confirm that it indeed signs out.

<br />

## ⚙ Step 16 - SfUserAuth Microservice APIs

The authentication microservice provides 6 API endpoints:

* **signin** - triggers and email with OTP if email already exists
    
* **signup** - if the email doesn't exist, create an account and then trigger an email with OTP
    
* **verify** - verifies the OTP, returns the refresh token if successful
    
* **validate** - validates the access token
    
* **refresh** - generates a new access token from the refresh token
    
* **resend** - resends the OTP on email
    

Click [this link](https://app.swaggerhub.com/apis/SUPERFLOWSAPP3/SfAuth_Backend/1.0.0#/) to understand the [API documentation](https://app.swaggerhub.com/apis/SUPERFLOWSAPP3/SfAuth_Backend/1.0.0#/).

<br />

## 🏊 Step 17 - A Deeper Dive

To understand the finer transactions of the SfUserAuth microservice, please study the sequence diagram given below.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1676260275483/5d693a3d-6400-4b7a-a356-c9e3c46c6b1e.png)

The diagram details the happy flow of the sign-in functionality. From sign-in initiation to the reception of the access token.

<br />

## Step 18 - Authenticating with SfUserAuth From Your Application Backend

* After you receive the access token, you should store it in your main memory and use it in your application APIs.
    
* Treat the SfUserAuth microservice as your authentication service.
    
* With every API request to your application backend, send the email and the accessToken.
    
* For API requests that need authentication, your application backend can extract the email and the access token from the requests and then authenticate them with the SfUserAuth microservice backend directly, by using the /validate API endpoint. The API documentation is given [here](https://app.swaggerhub.com/apis/SUPERFLOWSAPP3/SfAuth_Backend/1.0.0#/Auth/validate).

<br />

## 🏭 Step 19 - Moving To Production

**Firstly, congratulations on reaching this step! 🏆**

Moving to production now is easier than you can imagine!

<br />

### 19.1 - Deploy The Production Backend

Go to step 8. Change the backend deployment script as follows:

```xml
###########
# Script Config
###########

adminemail=<your admin email from production>
correspondenceemail=<your correspondence email from production>
awsregion=<your aws region for production>
awsaccount=<your aws account>
apistage=prod
weborigin=<your frontend deployment url for production>
appname=<your app name for production>
tablename=T_SF_User_Auth_prod
rolename=R_SF_User_Auth_prod
policyname=P_SF_User_Auth_prod
functionname=F_SF_User_Auth_prod
api=API_SF_User_Auth_prod

###########
# Script Config Ends
###########
```

Complete steps 8, 9 and 10. Your production backend will be ready. You will have a new API ID for production.

> At this step, you will essentially have two parallel deployments. The first deployment is your test deployment and the second deployment will be your production deployment.

<br />

### 19.2 - Connect The Production Frontend To The Production Backend

In your production-code/dist/auth.html, just replace the apiId of the SfUserAuth component with the production API ID, you received at the end of step 18.1.

```xml
<sf-user-auth id="sf_auth" appName="Superflows" apiId="<production-api-id>" logo="<app-logo>">
        <div slot="privacy">
            <h1>Privacy</h1>
            <p>Privacy policy goes here
        </div>
        <div slot="terms">
            <h1>Terms</h1>
            <p>Terms & Conditions go here
        </div>
    </sf-user-auth>
```

<br />

## 19.3 - Switch AWS SES To Production

As depicted in Step 12, the AWS SES service, which is used for sending emails, is by default in sandbox mode. This means that you can send emails to only verified identities.

Once you move to production, you will need unrestricted email sending. To enable that, go to AWS &gt; SES, click on 'Request Production Access' and complete the steps to enable production access.

```xml
Congratulations! You are in production. 🍺 Cheers! 
```

<br />

## Conclusion

* This helps you set up the authentication microservice on an '**auto-scalable**' and '**serverless**' AWS backend.
    
* Backend coding know-how is not required. Even a single junior frontend developer can make things happen.
    
<br />

## Resources

Adding some resources below for your convenience.

### SfUserAuth Frontend Code Repository

[GitHub Link](https://github.com/superflows-dev/sf-user-auth)

### SfUserAuth Backend Code Repository

[GitHub Link](https://github.com/superflows-dev/sf-user-auth-backend)

### SfUserAuth API Documentation

[Swagger Link](https://app.swaggerhub.com/apis/SUPERFLOWSAPP3/SfAuth_Backend/1.0.0#/)

### SfUserNav NPM Library

[NPM Link](https://www.npmjs.com/package/sf-nav)

### SfUserAuth NPM Library

[NPM Link](https://www.npmjs.com/package/sf-user-auth)

### AWS Regions Directory

[AWS Link](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html)

### Join The Community

[Join Now](https://discord.gg/ksEXS4P9h6)

### **YouTube Channel**

[**View Channel**](https://www.youtube.com/channel/UCYNJLCE48yir4DsquciBuDw)

### **Documentation**

[Read Documentation](https://superflows.dev)

## Testing

Tests can be run with the `test` script.

```bash
npm test
```

- Chromium: |██████████████████████████████| 2/2 test files | 9 passed, 0 failed
- Firefox:  |██████████████████████████████| 2/2 test files | 9 passed, 0 failed
- Webkit:   |██████████████████████████████| 2/2 test files | 9 passed, 0 failed
- Code coverage: 98.63 % (Overall) 100% (Main flow)
- View full coverage report at coverage/lcov-report/index.html

<br />

## Dev Server

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/dev/index.html` that you can view at http://localhost:8000/dev/index.html. Note that this command will serve your code using Lit's development mode (with more verbose errors). To serve your code against Lit's production mode, use `npm run serve:prod`.

<br />

## Blog

[Read](https://blog.superflows.dev/)

## License

MIT © [superflows-dev](https://github.com/superflows-dev)

## Powered by 

<img src="https://superflows-images.s3.ap-south-1.amazonaws.com/lit_logo.png" width="100" />

<br />

## i ♥

<img src="https://superflows-images.s3.ap-south-1.amazonaws.com/Building+in+public.png" width="300" /> 

<br />


