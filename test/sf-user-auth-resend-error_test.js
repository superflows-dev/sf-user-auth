/**
 * @license
 * Copyright 2022 Superflows.dev
 * SPDX-License-Identifier: MIT
 */
import { SfUserAuth } from '../sf-user-auth.js';
import { fixture, assert } from '@open-wc/testing';
// import {assert} from '@open-wc/testing';
import { stub } from 'sinon';
import { html } from 'lit/static-html.js';
import Util from '../util';
//const TIMEOUT = 2000;
const htmlContent = html `
<sf-user-auth id="sf_auth" appName="Superflows" apiId="jkvm5re4ji" logo="https://superflows-images.s3.ap-south-1.amazonaws.com/superflows_black_transparent_200.png">
<div slot="privacy">
    <h1>Privacy</h1>
    <div class="wrapper-xs">

        <p>Thank you for visiting our web site. This privacy policy tells you how we use personal information collected at this site. Please read this privacy policy before using Lorem Ipsum or submitting any personal information. By using Lorem Ipsum, you are accepting the practices described in this privacy policy. These practices may be changed, but any changes will be posted and changes will only apply to activities and information on a going forward, not retroactive basis.</p>

        <p>You are encouraged to review the privacy policy whenever you visit Lorem Ipsum to make sure that you understand how any personal information you provide will be used. Note: the privacy practices set forth in this privacy policy are for Lorem Ipsum only. If you link to other web sites, please review the privacy policies posted at those sites.</p>

        <h5>Collection of Information </h5>
        <p>We collect personally identifiable information, like names, postal addresses, email addresses, etc., when voluntarily submitted by our visitors. The information you provide is only used to fulfill your specific request, unless you give us permission to use it in another manner, for example to add you to one of our mailing lists.</p>

        <h5>Cookie/Tracking Technology</h5>
        <p>The Site may use cookie and tracking technology depending on the features offered. Cookie and tracking technology are useful for gathering information such as browser type and operating system, tracking the number of visitors to Lorem Ipsum, and understanding how visitors use Lorem Ipsum. Cookies can also help customize Lorem Ipsum for visitors. Personal information cannot be collected via cookies and other tracking technology, however, if you previously provided personally identifiable information, cookies may be tied to such information. Aggregate cookie and tracking information may be shared with third parties.</p>

        <h5>Distribution of Information</h5>
        <p>We may share information with governmental agencies or other companies assisting us in fraud prevention or investigation. We may do so when: (1) permitted or required by law; or, (2) trying to protect against or prevent actual or potential fraud or unauthorized transactions; or, (3) investigating fraud which has already taken place. The information is not provided to these companies for marketing purposes.</p>

        <h5>Commitment to Data Security</h5>
        <p>Your personally identifiable information is kept secure. Only authorized employees, agents and contractors (who have agreed to keep information secure and confidential) have access to this information. All emails, newsletters and notifications from Lorem Ipsum allow you to opt out of further messages.</p>

        <h5>Privacy Contact Information</h5>
        <p>If you have any questions, concerns, or comments about our privacy policy you may <a href="mailto: tom@astudioofourown.com">contact us here</a>.</p>
    </div>
</div>
<div slot="terms">
    <h1>Terms</h1>
    <div class="wrapper-xs">
        <h5>1.  Acceptance The Use Of Lorem Ipsum Terms and Conditions</h5>
        <p>Your access to and use of Lorem Ipsum (the app) is subject exclusively to these Terms and Conditions. You will not use the app for any purpose that is unlawful or prohibited by these Terms and Conditions. By using the app you are fully accepting the terms, conditions and disclaimers contained in this notice. If you do not accept these Terms and Conditions you must immediately stop using the app.</p>
        
        <h5>2.  CREDIT CARD DETAILS</h5>
        <p>All Lorem Ipsum purchases are managed by the individual App Stores (Apple, Google Windows) and Lorem Ipsum will never store your credit card information or make it available to any third parties. Any purchasing information provided will be provided directly from you to the respective App Store and you will be subject to their credit card policies.</p>
        
        <h5>3.  LEGAL ADVICE</h5>
        <p>
            The contents of Lorem Ipsum app do not constitute advice and should not be relied upon in making or refraining from making, any decision. <br>
            All material contained on Lorem Ipsum is provided without any or warranty of any kind. You use the material on Lorem Ipsum at your own discretion
        </p>
    
        <h5>4.  CHANGE OF USE</h5>
        <p>
            Lorem Ipsum reserves the right to:<br>
            </p><ul>
                <li>4.1  change or remove (temporarily or permanently) the app or any part of it without notice and you confirm that Lorem Ipsum shall not be liable to you for any such change or removal and.</li>
                <li>4.2  change these Terms and Conditions at any time, and your continued use of the app following any changes shall be deemed to be your acceptance of such change.</li>
            </ul>
        <p></p>
        
        <h5>5.  Links to Third Party apps and websites</h5>
        <p>Lorem Ipsum app may include links to third party apps and websites that are controlled and maintained by others. Any link to other apps and websites is not an endorsement of such and you acknowledge and agree that we are not responsible for the content or availability of any such apps and websites.</p>
    
        <h5>6.  COPYRIGHT</h5>
        <p>
            </p><ul>
                <li>6.1  All copyright, trade marks and all other intellectual property rights in the app and its content (including without limitation the app design, text, graphics and all software and source codes connected with the app) are owned by or licensed to Lorem Ipsum or otherwise used by Lorem Ipsum as permitted by law.</li>
                <li>6.2  In accessing the app you agree that you will access the content solely for your personal, non-commercial use. None of the content may be downloaded, copied, reproduced, transmitted, stored, sold or distributed without the prior written consent of the copyright holder. This excludes the downloading, copying and/or printing of pages of the app for personal, non-commercial home use only.</li>
            </ul>
        <p></p>
        
        <h5>7.  LINKS TO AND FROM OTHER apps and websites</h5>
        <p>
            </p><ul>
                <li>7.1  Throughout this app you may find links to third party apps. The provision of a link to such an app does not mean that we endorse that app. If you visit any app via a link in this app you do so at your own risk.</li>
                <li>7.2  Any party wishing to link to this app is entitled to do so provided that the conditions below are observed:</li>
                <li>
                    <ol>
                        <li>(a)  You do not seek to imply that we are endorsing the services or products of another party unless this has been agreed with us in writing;</li>
                        <li>(b)  You do not misrepresent your relationship with this app; and</li>
                        <li>(c)  The app from which you link to this app does not contain offensive or otherwise controversial content or, content that infringes any intellectual property rights or other rights of a third party.</li>
                    </ol>
                </li>
                <li>7.3  By linking to this app in breach of our terms, you shall indemnify us for any loss or damage suffered to this app as a result of such linking.</li>
            </ul>
        <p></p>
    
        <h5>8.   DISCLAIMERS AND LIMITATION OF LIABILITY</h5>
        <p>
            </p><ul>
                <li>8.1  The app is provided on an AS IS and AS AVAILABLE basis without any representation or endorsement made and without warranty of any kind whether express or implied, including but not limited to the implied warranties of satisfactory quality, fitness for a particular purpose, non-infringement, compatibility, security and accuracy.</li>
                <li>8.2  To the extent permitted by law, Lorem Ipsum will not be liable for any indirect or consequential loss or damage whatever (including without limitation loss of business, opportunity, data, profits) arising out of or in connection with the use of the app.</li>
                <li>8.3  Lorem Ipsum makes no warranty that the functionality of the app will be uninterrupted or error free, that defects will be corrected or that the app or the server that makes it available are free of viruses or anything else which may be harmful or destructive.</li>
                <li>8.4  Nothing in these Terms and Conditions shall be construed so as to exclude or limit the liability of Lorem Ipsum for death or personal injury as a result of the negligence of Lorem Ipsum or that of its employees or agents.</li>
            </ul>
        <p></p>
        
        <h5>9.  INDEMNITY</h5>
        <p>You agree to indemnify and hold Lorem Ipsum and its employees and agents harmless from and against all liabilities, legal fees, damages, losses, costs and other expenses in relation to any claims or actions brought against Lorem Ipsum arising out of any breach by you of these Terms and Conditions or other liabilities arising out of your use of this app.</p>
    
        <h5>10.  SEVERANCE</h5>
        <p>If any of these Terms and Conditions should be determined to be invalid, illegal or unenforceable for any reason by any court of competent jurisdiction then such Term or Condition shall be severed and the remaining Terms and Conditions shall survive and remain in full force and effect and continue to be binding and enforceable.</p>
    
        <h5>11.  WAIVER</h5>
        <p>If you breach these Conditions of Use and we take no action, we will still be entitled to use our rights and remedies in any other situation where you breach these Conditions of Use.</p>
    
        <h5>12.  GOVERNING LAW</h5>
        <p>These Terms and Conditions shall be governed by and construed in accordance with the law of and you hereby submit to the exclusive jurisdiction of the courts.</p>
        
        <h5>13.  OUR CONTACT DETAILS</h5>
        <p>Our Support Address: <a href="http://www.astudioofourown.com" target="_blank">http://www.astudioofourown.com</a></p>
    </div>
</div>
</sf-user-auth>
      `;
var clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
});
const TIMEOUT = 500;
function getArgsVerify() {
    return ['verify', 'hrushi.mehendale@gmail.com'];
}
suite('sf-user-auth > Basic tests', () => {
    test('is defined', () => {
        const el = document.createElement('sf-user-auth');
        assert.instanceOf(el, SfUserAuth);
    });
    test('verify tests', async () => {
        stub(Util, 'callApi').returns(new Promise((resolve) => {
            resolve({ status: 401, responseText: JSON.stringify({ result: false, error: "The verification email should normally reach your inbox immediately. But in some cases it may take some more time. Please wait for a minute before attempting to resend." }) });
        }));
        stub(Util, 'writeCookie').returns();
        const el = (await fixture(htmlContent));
        await el.updateComplete;
        el.onArgs = getArgsVerify;
        await new Promise((r) => setTimeout(r, TIMEOUT));
        const h1 = el.shadowRoot.querySelectorAll('h1')[0];
        assert.ok(h1.innerHTML.indexOf('Verify') >= 0);
        const ipOtp = el.shadowRoot.querySelectorAll('#otp')[0];
        const errorOtp = el.shadowRoot.querySelectorAll('#error-client-otp')[0];
        ipOtp.dispatchEvent(new KeyboardEvent('keyup', { 'key': '1' }));
        await new Promise((r) => setTimeout(r, TIMEOUT));
        assert.ok(errorOtp.outerHTML.indexOf('display: block') >= 0);
        ipOtp.value = '1234';
        ipOtp.dispatchEvent(new KeyboardEvent('keyup', { 'key': '5' }));
        const ipSubmit = el.shadowRoot.querySelectorAll('#submit')[0];
        assert.ok(ipSubmit.outerHTML.indexOf('disabled') < 0);
        const resend = el.shadowRoot.querySelectorAll('.resend')[0];
        resend.dispatchEvent(clickEvent);
        await new Promise((r) => setTimeout(r, TIMEOUT));
        const error = el.shadowRoot.querySelectorAll('.div-row-error-message')[0];
        assert.ok(error.innerHTML.indexOf('some more') >= 0);
    });
});
//# sourceMappingURL=sf-user-auth_test.js.map
//# sourceMappingURL=sf-user-auth-resend-error_test.js.map