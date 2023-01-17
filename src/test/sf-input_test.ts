/**
 * @license
 * Copyright 2022 Superflows.dev
 * SPDX-License-Identifier: MIT
 */

import {SfUserAuth} from '../sf-user-auth.js';
import {fixture, assert} from '@open-wc/testing';
// import {assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

//const TIMEOUT = 2000;

const htmlContent = html`
      <sf-user-auth >
        <h2 slot="brandName"><a href="#home" >SuperTester</a></h2>
        <a slot="brandImage" href="#home" ><img alt="logo" src="https://superflows.dev/img/superflows_gray_transparent_200.png" /></a>
        <ul slot="mainMenu">
          <li><a href="#about" class="a-about">About</a></li>
          <li class="li-solutions">
            <a href="javascript:void(0);" class="a-solutions">Solutions</a>
            <ul>
              <li><a href="#services" class="a-services">Services</a></li>
              <li><a href="#products">Products</a></li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0);">Contact Us</a>
            <ul>
              <li><a href="https://instagram.com">Instagram</a></li>
              <li><a href="https://facebook.com">Facebook</a></li>
            </ul>
          </li>
        </ul>
        <!-- Set the notifications -->
        <ul slot="unreadNotifications">
          <li><a href="#notification/1"><h3>Sonali Joshi</h3><p>mentioned you in a comment</p><div>1 day ago</div></a></li>
          <li><a href="#notification/2"><h3>Rahim Ahmed</h3><p>reacted to your blog post</p><div>2 days ago</div></a></li>
          <li><a href="#notification/3"><h3>John Bolton</h3><p>replied to a thread that you posted in</p><div>1 month ago</div></a></li>
        </ul>
        <ul slot="readNotifications">
          <li><a href="#notification/4"><h3>Sonali Joshi</h3><p>mentioned you in a comment</p><div>1 day ago</div></a></li>
          <li><a href="#notification/5"><h3>Rahim Ahmed</h3><p>reacted to your blog post</p><div>2 days ago</div></a></li>
          <li><a href="#notification/6"><h3>John Bolton</h3><p>replied to a thread that you posted in</p><div>1 month ago</div></a></li>
        </ul>
        <a slot="notificationsList" href="#notifications">View All</a>
        <ul slot="socialMedia">
          <li><a href="https://facebook.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/facebook-black_round.png" /></a></li>
          <li><a href="https://twitter.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/twitter_black_round.png" /></a></li>
          <li><a href="https://youtube.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/youtube_black_round.png" /></a></li>
        </ul>
        <p slot="copyright">Copyright 2022 Superflows</p>
        <a slot="cta" href="#login">Sign In</a>
        <!-- Profile picture -->
        <img alt="profile" slot="profilePicture" src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg" />
        <!-- Set the profile menu -->
        <ul slot="profileMenu">
          <li><a href="#about1">About</a></li>
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
        <div slot="content">
        </div>
      </sf-user-auth>
      `;

var clickEvent = new MouseEvent("click", {
  "view": window,
  "bubbles": true,
  "cancelable": false
});

suite('sf-user-auth > left menu', () => {

  test('is defined', () => {
    const el = document.createElement('sf-user-auth');
    assert.instanceOf(el, SfUserAuth);
  });

  test('left menu', async () => {

    const el = (await fixture(htmlContent)) as SfUserAuth;
    await el.updateComplete;

    // Check sanity

    const SfUserAuthC = el.shadowRoot!.querySelectorAll('.SfUserAuthC')[0]!;
    assert.ok(SfUserAuthC.innerHTML.indexOf('▶') >= 0); 

    // Open left menu

    const SfUserAuthToggleLeft = el.shadowRoot!.querySelectorAll('.SfUserAuthToggleLeft')[0]!;
    SfUserAuthToggleLeft.dispatchEvent(clickEvent)
    await el.updateComplete;

    const SfUserAuthToggleLeftLeaf = el.shadowRoot!.querySelectorAll('.SfUserAuthToggleLeftLeaf')[0]!;
    assert.ok(SfUserAuthToggleLeftLeaf.outerHTML.indexOf('display: block;') >= 0); 

    // Close left menu

    SfUserAuthToggleLeftLeaf.dispatchEvent(clickEvent);
    await el.updateComplete;

    assert.ok(SfUserAuthToggleLeftLeaf.outerHTML.indexOf('display: none;') >= 0); 

    // Open left menu again

    SfUserAuthToggleLeft.dispatchEvent(clickEvent)
    await el.updateComplete;

    // Open left submenu

    const liSolutions = el.shadowRoot!.querySelectorAll('.li-solutions')[0]!;
    liSolutions.dispatchEvent(clickEvent)
    await el.updateComplete;

    assert.ok(liSolutions.outerHTML.indexOf('color: rgb(255, 255, 255); background-color: rgb(0, 0, 0);') >= 0); 

    // Close left submenu > menu

    liSolutions.dispatchEvent(clickEvent)
    await new Promise((r) => setTimeout(r,1000));
    await el.updateComplete;

  });

});


suite('sf-user-auth > main menu', () => {

  test('main menu', async () => {

    const el = (await fixture(htmlContent) as SfUserAuth);
    await el.updateComplete;

    // Check sanity

    const SfUserAuthC = el.shadowRoot!.querySelectorAll('.SfUserAuthC')[0]!;
    assert.ok(SfUserAuthC.innerHTML.indexOf('▶') >= 0); 

    // Open main menu

    const aSolutions = el.shadowRoot!.querySelectorAll('.a-solutions')[1]!;
    aSolutions.dispatchEvent(clickEvent)
    await el.updateComplete;

    const liSolutions1 = el.shadowRoot!.querySelectorAll('.li-solutions')[1]!;
    assert.ok(liSolutions1.querySelector('ul')!.outerHTML.indexOf('display: block;') >= 0); 

    // Close main menu

    const SfUserAuthToggleLeftLeaf1 = el.shadowRoot!.querySelectorAll('.SfUserAuthToggleLeftLeaf')[1]!;
    SfUserAuthToggleLeftLeaf1.dispatchEvent(clickEvent)
    await el.updateComplete;

    assert.ok(liSolutions1.querySelector('ul')!.outerHTML.indexOf('display: none;') >= 0); 

    // Click last menu

    aSolutions.dispatchEvent(clickEvent)
    await el.updateComplete;
    assert.ok(liSolutions1.querySelector('ul')!.outerHTML.indexOf('display: block;') >= 0); 

    const aServices = el.shadowRoot!.querySelectorAll('.a-services')[1]!;
    aServices.dispatchEvent(clickEvent)
    await el.updateComplete;
    assert.ok(liSolutions1.querySelector('ul')!.outerHTML.indexOf('display: none;') >= 0);

  })

});

suite('sf-user-auth > search menu', () => {

  test('search menu', async () => {

    const el = (await fixture(htmlContent) as SfUserAuth);

    // Open search menu

    const searchH1 = el.shadowRoot!.querySelectorAll('.SfUserAuthSearchToggle')[0]!;
    searchH1.dispatchEvent(clickEvent)
    await el.updateComplete;

    assert.ok(el.shadowRoot!.querySelectorAll('.SfUserAuthDivSearchDropdown')[0]!.outerHTML.indexOf('display: flex;') >= 0);
    
    // Type something in search

    var count = 0;

    const testSearchClick = () => {count++}

    el.addEventListener('searchClick', testSearchClick);

    var eventKeyA = new KeyboardEvent('keyup', {'key': 'A'});
    var eventKeyEnter = new KeyboardEvent('keyup', {'key': 'Enter'});

    const searchInput = el.shadowRoot!.querySelectorAll('.SfUserAuthInputSearch')[0]!;
    searchInput.dispatchEvent(eventKeyA);
    await el.updateComplete;
    searchInput.dispatchEvent(eventKeyA);
    await el.updateComplete;
    searchInput.dispatchEvent(eventKeyA);
    await el.updateComplete;
    searchInput.dispatchEvent(eventKeyEnter);
    await el.updateComplete;

    assert.ok(count === 1)

    el.removeEventListener('searchClick', testSearchClick);

    // Close search menu
    
    const searchOverlay = el.shadowRoot!.querySelectorAll('.SfUserAuthDivSearch > div')[0]!;
    searchOverlay.dispatchEvent(clickEvent)
    await el.updateComplete;

    assert.ok(el.shadowRoot!.querySelectorAll('.SfUserAuthDivSearchDropdown')[0]!.outerHTML.indexOf('display: none;') >= 0); 

    // Again open search menu

    searchH1.dispatchEvent(clickEvent)
    await el.updateComplete;

    assert.ok(el.shadowRoot!.querySelectorAll('.SfUserAuthDivSearchDropdown')[0]!.outerHTML.indexOf('display: flex;') >= 0);

    // Click on close button to close search

    const SfUserAuthDivSearchClose = el.shadowRoot!.querySelectorAll('.SfUserAuthDivSearchClose')[0]!;
    SfUserAuthDivSearchClose.dispatchEvent(clickEvent)
    await el.updateComplete;

    assert.ok(el.shadowRoot!.querySelectorAll('.SfUserAuthDivSearchDropdown')[0]!.outerHTML.indexOf('display: none;') >= 0); 

  });

});

suite('sf-user-auth > notifications menu', () => {


  test('Notifications', async () => {

    const el = (await fixture(htmlContent) as SfUserAuth);

    await el.updateComplete;

    var clickEvent = new MouseEvent("click", {
      "view": window,
      "bubbles": true,
      "cancelable": false
    });

    // Open notifications

    const h1Notifications = el.shadowRoot!.querySelectorAll('.SfUserAuthNotifToggle')[0]!; 
    h1Notifications.dispatchEvent(clickEvent)
    await el.updateComplete;

    assert.ok(el.shadowRoot!.querySelector('.SfUserAuthDivNotif')!.children[2].outerHTML.indexOf('display: block;') >= 0);

    // Close notifications

    el.shadowRoot!.querySelector('.SfUserAuthDivNotif')!.children[2].dispatchEvent(clickEvent);
    await el.updateComplete;

    assert.ok(el.shadowRoot!.querySelector('.SfUserAuthDivNotif')!.children[2].outerHTML.indexOf('display: none;') >= 0);

    // Open notifications again

    h1Notifications.dispatchEvent(clickEvent)
    await el.updateComplete;

    assert.ok(el.shadowRoot!.querySelector('.SfUserAuthDivNotif')!.children[2].outerHTML.indexOf('display: block;') >= 0);

    // Click a notification

    el.shadowRoot!.querySelector('.SfUserAuthDivNotif')!.children[3].children[0].children[0].children[0].dispatchEvent(clickEvent);
    await el.updateComplete;

    assert.ok(el.shadowRoot!.querySelector('.SfUserAuthDivNotif')!.children[2].outerHTML.indexOf('display: none;') >= 0);


  });

  
  test('Routing page found', async () => {

    const el = (await fixture(html`
      <sf-user-auth >
        <h2 slot="brandName"><a href="#home" >SuperTester</a></h2>
        <a slot="brandImage" href="#home" ><img alt="logo" src="https://superflows.dev/img/superflows_gray_transparent_200.png" /></a>
        <ul slot="mainMenu">
          <li><a href="#about" class="a-about">About</a></li>
          <li class="li-solutions">
            <a href="javascript:void(0);" class="a-solutions">Solutions</a>
            <ul>
              <li><a href="#services" class="a-services">Services</a></li>
              <li><a href="#products">Products</a></li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0);">Contact Us</a>
            <ul>
              <li><a href="https://instagram.com">Instagram</a></li>
              <li><a href="https://facebook.com">Facebook</a></li>
            </ul>
          </li>
        </ul>
        <ul slot="unreadNotifications">
          <li><a href="#notification/1"><h3>Sonali Joshi</h3><p>mentioned you in a comment</p><div>1 day ago</div></a></li>
          <li><a href="#notification/2"><h3>Rahim Ahmed</h3><p>reacted to your blog post</p><div>2 days ago</div></a></li>
          <li><a href="#notification/3"><h3>John Bolton</h3><p>replied to a thread that you posted in</p><div>1 month ago</div></a></li>
        </ul>
        <ul slot="readNotifications">
          <li><a href="#notification/4"><h3>Sonali Joshi</h3><p>mentioned you in a comment</p><div>1 day ago</div></a></li>
          <li><a href="#notification/5"><h3>Rahim Ahmed</h3><p>reacted to your blog post</p><div>2 days ago</div></a></li>
          <li><a href="#notification/6"><h3>John Bolton</h3><p>replied to a thread that you posted in</p><div>1 month ago</div></a></li>
        </ul>
        <a slot="notificationsList" href="#notifications">View All</a>
        <ul slot="socialMedia">
          <li><a href="https://facebook.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/facebook-black_round.png" /></a></li>
          <li><a href="https://twitter.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/twitter_black_round.png" /></a></li>
          <li><a href="https://youtube.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/youtube_black_round.png" /></a></li>
        </ul>
        <a slot="cta" href="#login">Sign In</a>
        <p slot="copyright">Copyright 2022 Superflows</p>
        <div slot="content">
        </div>
      </sf-user-auth>
      `) as SfUserAuth);

    await el.updateComplete;

    var clickEvent = new MouseEvent("click", {
      "view": window,
      "bubbles": true,
      "cancelable": false
  });

  // Routing page found

  // Click simple main menu
  const aboutA = el.shadowRoot!.querySelectorAll('.a-about')[1]!;
  aboutA.dispatchEvent(clickEvent);
  await el.updateComplete;

  //await new Promise((r) => setTimeout(r, TIMEOUT));
  assert.ok(el.shadowRoot!.children[3].outerHTML.indexOf('display: none;') >= 0); 

  });

  test('Notifications all read', async () => {

    const el = (await fixture(html`
      <sf-user-auth >
        <h2 slot="brandName"><a href="#home" >SuperTester</a></h2>
        <a slot="brandImage" href="#home" ><img alt="logo" src="https://superflows.dev/img/superflows_gray_transparent_200.png" /></a>
        <ul slot="mainMenu">
          <li><a href="#about" class="a-about">About</a></li>
          <li class="li-solutions">
            <a href="javascript:void(0);" class="a-solutions">Solutions</a>
            <ul>
              <li><a href="#services" class="a-services">Services</a></li>
              <li><a href="#products">Products</a></li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0);">Contact Us</a>
            <ul>
              <li><a href="https://instagram.com">Instagram</a></li>
              <li><a href="https://facebook.com">Facebook</a></li>
            </ul>
          </li>
        </ul>
        <ul slot="readNotifications">
          <li><a href="#notification/4"><h3>Sonali Joshi</h3><p>mentioned you in a comment</p><div>1 day ago</div></a></li>
          <li><a href="#notification/5"><h3>Rahim Ahmed</h3><p>reacted to your blog post</p><div>2 days ago</div></a></li>
          <li><a href="#notification/6"><h3>John Bolton</h3><p>replied to a thread that you posted in</p><div>1 month ago</div></a></li>
        </ul>
        <a slot="notificationsList" href="#notifications">View All</a>
        <ul slot="socialMedia">
          <li><a href="https://facebook.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/facebook-black_round.png" /></a></li>
          <li><a href="https://twitter.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/twitter_black_round.png" /></a></li>
          <li><a href="https://youtube.com"><img src="https://superflows-images.s3.ap-south-1.amazonaws.com/youtube_black_round.png" /></a></li>
        </ul>
        <p slot="copyright">Copyright 2022 Superflows</p>
        <div slot="content">
        </div>
      </sf-user-auth>
      `) as SfUserAuth);

      await el.updateComplete;

      // Click simple main menu
      const badge = el.shadowRoot!.querySelectorAll('.SfUserAuthDivNotifBadge')[0]!;

      assert.ok(badge.outerHTML.indexOf('display: none;') >= 0); 

  });


});
 
  // test('renders with default values', async () => {
  //   const el = await fixture(html`<sf-user-auth></sf-user-auth>`);
  //   assert.shadowDom.equal(
  //     el,
  //     `
  //     <h1>Hello, World!</h1>
  //     <button part="button">Click Count: 0</button>
  //     <slot></slot>
  //   `
  //   );
  // });

  // test('renders with a set name', async () => {
  //   const el = await fixture(html`<sf-user-auth name="Test"></sf-user-auth>`);
  //   assert.shadowDom.equal(
  //     el,
  //     `
  //     <h1>Hello, Test!</h1>
  //     <button part="button">Click Count: 0</button>
  //     <slot></slot>
  //   `
  //   );
  // });

  // test('handles a click', async () => {
  //   const el = (await fixture(html`<sf-user-auth></sf-user-auth>`)) as SfUserAuth;
  //   const button = el.shadowRoot!.querySelector('button')!;
  //   button.click();
  //   await el.updateComplete;
  //   assert.shadowDom.equal(
  //     el,
  //     `
  //     <h1>Hello, World!</h1>
  //     <button part="button">Click Count: 1</button>
  //     <slot></slot>
  //   `
  //   );
  // });

  // test('styling applied', async () => {
  //   const el = (await fixture(html`<sf-user-auth></sf-user-auth>`)) as SfUserAuth;
  //   await el.updateComplete;
  //   assert.equal(getComputedStyle(el).paddingTop, '16px');
  // });


