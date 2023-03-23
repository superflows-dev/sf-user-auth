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
const TIMEOUT = 500;
suite('sf-user-auth > Admin tests', () => {
    test('is defined', () => {
        const el = document.createElement('sf-user-auth');
        assert.instanceOf(el, SfUserAuth);
    });
    test('admin tests', async () => {
        stub(Util, 'callApi').returns(new Promise((resolve) => {
            resolve({ status: 200, responseText: JSON.stringify({ "result": true, "data": { "values": [{ "operation": "refresh", "timestamp": "1678685453802", "httpCode": "200", "response": "{\"statusCode\":200,\"body\":{\"result\":true,\"admin\":{\"BOOL\":true},\"data\":{\"name\":{\"S\":\"Administrator\"},\"email\":{\"S\":\"hrushi.mehendale@gmail.com\"},\"accessToken\":{\"token\":\"lf6dz5xgikzz5rkk0vr\",\"expiry\":1679290253764},\"refreshToken\":{\"token\":\"lf6dz5xg8ur5u7t41uq\",\"expiry\":1681277453764}}}}", "email": "hrushi.mehendale@gmail.com", "request": "{\"resource\":\"/refresh\",\"path\":\"/refresh\",\"httpMethod\":\"POST\",\"headers\":{\"Accept\":\"*/*\",\"Accept-Encoding\":\"gzip, deflate, br\",\"Accept-Language\":\"en-GB,en-US;q=0.9,en;q=0.8\",\"Authorization\":\"Basic aHJ1c2hpLm1laGVuZGFsZUBnbWFpbC5jb206bGY2ZHo0dTI3MWc4YnVuc2pzNA==\",\"cache-control\":\"no-cache\",\"CloudFront-Forwarded-Proto\":\"https\",\"CloudFront-Is-Desktop-Viewer\":\"true\",\"CloudFront-Is-Mobile-Viewer\":\"false\",\"CloudFront-Is-SmartTV-Viewer\":\"false\",\"CloudFront-Is-Tablet-Viewer\":\"false\",\"CloudFront-Viewer-ASN\":\"9829\",\"CloudFront-Viewer-Country\":\"IN\",\"content-type\":\"application/json\",\"Host\":\"7uwg6gt5d7.execute-api.us-east-1.amazonaws.com\",\"origin\":\"http://localhost:8000\",\"pragma\":\"no-cache\",\"Referer\":\"http://localhost:8000/\",\"sec-ch-ua\":\"\\\"Chromium\\\";v=\\\"110\\\", \\\"Not A(Brand\\\";v=\\\"24\\\", \\\"Google Chrome\\\";v=\\\"110\\\"\",\"sec-ch-ua-mobile\":\"?0\",\"sec-ch-ua-platform\":\"\\\"macOS\\\"\",\"sec-fetch-dest\":\"empty\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-site\":\"cross-site\",\"User-Agent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\",\"Via\":\"2.0 ce835a3eb4776e2406cfeb7dbc0dc14a.cloudfront.net (CloudFront)\",\"X-Amz-Cf-Id\":\"p35u2AaUlAAfzLFi13k1mbBRUK3EMZg73c7W2F7QmLALrJ25mAsNkA==\",\"X-Amzn-Trace-Id\":\"Root=1-640eb50d-001f3baa3f4eda0130b4dc98\",\"X-Forwarded-For\":\"59.88.172.215, 15.158.22.23\",\"X-Forwarded-Port\":\"443\",\"X-Forwarded-Proto\":\"https\",\"x-requested-with\":\"XMLHttpRequest\"},\"multiValueHeaders\":{\"Accept\":[\"*/*\"],\"Accept-Encoding\":[\"gzip, deflate, br\"],\"Accept-Language\":[\"en-GB,en-US;q=0.9,en;q=0.8\"],\"Authorization\":[\"Basic aHJ1c2hpLm1laGVuZGFsZUBnbWFpbC5jb206bGY2ZHo0dTI3MWc4YnVuc2pzNA==\"],\"cache-control\":[\"no-cache\"],\"CloudFront-Forwarded-Proto\":[\"https\"],\"CloudFront-Is-Desktop-Viewer\":[\"true\"],\"CloudFront-Is-Mobile-Viewer\":[\"false\"],\"CloudFront-Is-SmartTV-Viewer\":[\"false\"],\"CloudFront-Is-Tablet-Viewer\":[\"false\"],\"CloudFront-Viewer-ASN\":[\"9829\"],\"CloudFront-Viewer-Country\":[\"IN\"],\"content-type\":[\"application/json\"],\"Host\":[\"7uwg6gt5d7.execute-api.us-east-1.amazonaws.com\"],\"origin\":[\"http://localhost:8000\"],\"pragma\":[\"no-cache\"],\"Referer\":[\"http://localhost:8000/\"],\"sec-ch-ua\":[\"\\\"Chromium\\\";v=\\\"110\\\", \\\"Not A(Brand\\\";v=\\\"24\\\", \\\"Google Chrome\\\";v=\\\"110\\\"\"],\"sec-ch-ua-mobile\":[\"?0\"],\"sec-ch-ua-platform\":[\"\\\"macOS\\\"\"],\"sec-fetch-dest\":[\"empty\"],\"sec-fetch-mode\":[\"cors\"],\"sec-fetch-site\":[\"cross-site\"],\"User-Agent\":[\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\"],\"Via\":[\"2.0 ce835a3eb4776e2406cfeb7dbc0dc14a.cloudfront.net (CloudFront)\"],\"X-Amz-Cf-Id\":[\"p35u2AaUlAAfzLFi13k1mbBRUK3EMZg73c7W2F7QmLALrJ25mAsNkA==\"],\"X-Amzn-Trace-Id\":[\"Root=1-640eb50d-001f3baa3f4eda0130b4dc98\"],\"X-Forwarded-For\":[\"59.88.172.215, 15.158.22.23\"],\"X-Forwarded-Port\":[\"443\"],\"X-Forwarded-Proto\":[\"https\"],\"x-requested-with\":[\"XMLHttpRequest\"]},\"queryStringParameters\":null,\"multiValueQueryStringParameters\":null,\"pathParameters\":null,\"stageVariables\":null,\"requestContext\":{\"resourceId\":\"5jtie2\",\"resourcePath\":\"/refresh\",\"httpMethod\":\"POST\",\"extendedRequestId\":\"BtE6MEZxIAMFZFQ=\",\"requestTime\":\"13/Mar/2023:05:30:53 +0000\",\"path\":\"/test/refresh\",\"accountId\":\"181895849565\",\"protocol\":\"HTTP/1.1\",\"stage\":\"test\",\"domainPrefix\":\"7uwg6gt5d7\",\"requestTimeEpoch\":1678685453740,\"requestId\":\"9501df1c-16fb-4dc7-95f4-5a5f9a0111d5\",\"identity\":{\"cognitoIdentityPoolId\":null,\"accountId\":null,\"cognitoIdentityId\":null,\"caller\":null,\"sourceIp\":\"59.88.172.215\",\"principalOrgId\":null,\"accessKey\":null,\"cognitoAuthenticationType\":null,\"cognitoAuthenticationProvider\":null,\"userArn\":null,\"userAgent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\",\"user\":null},\"domainName\":\"7uwg6gt5d7.execute-api.us-east-1.amazonaws.com\",\"apiId\":\"7uwg6gt5d7\"},\"body\":\"null\",\"isBase64Encoded\":false}" }, { "operation": "verify", "timestamp": "1678685452422", "httpCode": "200", "response": "{\"statusCode\":200,\"body\":{\"result\":true,\"admin\":{\"BOOL\":true},\"data\":{\"refreshToken\":{\"token\":\"lf6dz4u271g8bunsjs4\",\"expiry\":1681277452361},\"name\":{\"S\":\"Administrator\"},\"email\":{\"S\":\"hrushi.mehendale@gmail.com\"}}}}", "email": "hrushi.mehendale@gmail.com", "request": "{\"resource\":\"/verify\",\"path\":\"/verify\",\"httpMethod\":\"POST\",\"headers\":{\"Accept\":\"*/*\",\"Accept-Encoding\":\"gzip, deflate, br\",\"Accept-Language\":\"en-GB,en-US;q=0.9,en;q=0.8\",\"cache-control\":\"no-cache\",\"CloudFront-Forwarded-Proto\":\"https\",\"CloudFront-Is-Desktop-Viewer\":\"true\",\"CloudFront-Is-Mobile-Viewer\":\"false\",\"CloudFront-Is-SmartTV-Viewer\":\"false\",\"CloudFront-Is-Tablet-Viewer\":\"false\",\"CloudFront-Viewer-ASN\":\"9829\",\"CloudFront-Viewer-Country\":\"IN\",\"content-type\":\"application/json\",\"Host\":\"7uwg6gt5d7.execute-api.us-east-1.amazonaws.com\",\"origin\":\"http://localhost:8000\",\"pragma\":\"no-cache\",\"Referer\":\"http://localhost:8000/\",\"sec-ch-ua\":\"\\\"Chromium\\\";v=\\\"110\\\", \\\"Not A(Brand\\\";v=\\\"24\\\", \\\"Google Chrome\\\";v=\\\"110\\\"\",\"sec-ch-ua-mobile\":\"?0\",\"sec-ch-ua-platform\":\"\\\"macOS\\\"\",\"sec-fetch-dest\":\"empty\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-site\":\"cross-site\",\"User-Agent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\",\"Via\":\"2.0 ce835a3eb4776e2406cfeb7dbc0dc14a.cloudfront.net (CloudFront)\",\"X-Amz-Cf-Id\":\"y9kqn_0hjbFu1iPP_upTx2tasAbWJ6df_prRmMx2dFxznJ-ZFDkhTQ==\",\"X-Amzn-Trace-Id\":\"Root=1-640eb50c-6d03e00b0f328f7f77524ee9\",\"X-Forwarded-For\":\"59.88.172.215, 15.158.22.18\",\"X-Forwarded-Port\":\"443\",\"X-Forwarded-Proto\":\"https\",\"x-requested-with\":\"XMLHttpRequest\"},\"multiValueHeaders\":{\"Accept\":[\"*/*\"],\"Accept-Encoding\":[\"gzip, deflate, br\"],\"Accept-Language\":[\"en-GB,en-US;q=0.9,en;q=0.8\"],\"cache-control\":[\"no-cache\"],\"CloudFront-Forwarded-Proto\":[\"https\"],\"CloudFront-Is-Desktop-Viewer\":[\"true\"],\"CloudFront-Is-Mobile-Viewer\":[\"false\"],\"CloudFront-Is-SmartTV-Viewer\":[\"false\"],\"CloudFront-Is-Tablet-Viewer\":[\"false\"],\"CloudFront-Viewer-ASN\":[\"9829\"],\"CloudFront-Viewer-Country\":[\"IN\"],\"content-type\":[\"application/json\"],\"Host\":[\"7uwg6gt5d7.execute-api.us-east-1.amazonaws.com\"],\"origin\":[\"http://localhost:8000\"],\"pragma\":[\"no-cache\"],\"Referer\":[\"http://localhost:8000/\"],\"sec-ch-ua\":[\"\\\"Chromium\\\";v=\\\"110\\\", \\\"Not A(Brand\\\";v=\\\"24\\\", \\\"Google Chrome\\\";v=\\\"110\\\"\"],\"sec-ch-ua-mobile\":[\"?0\"],\"sec-ch-ua-platform\":[\"\\\"macOS\\\"\"],\"sec-fetch-dest\":[\"empty\"],\"sec-fetch-mode\":[\"cors\"],\"sec-fetch-site\":[\"cross-site\"],\"User-Agent\":[\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\"],\"Via\":[\"2.0 ce835a3eb4776e2406cfeb7dbc0dc14a.cloudfront.net (CloudFront)\"],\"X-Amz-Cf-Id\":[\"y9kqn_0hjbFu1iPP_upTx2tasAbWJ6df_prRmMx2dFxznJ-ZFDkhTQ==\"],\"X-Amzn-Trace-Id\":[\"Root=1-640eb50c-6d03e00b0f328f7f77524ee9\"],\"X-Forwarded-For\":[\"59.88.172.215, 15.158.22.18\"],\"X-Forwarded-Port\":[\"443\"],\"X-Forwarded-Proto\":[\"https\"],\"x-requested-with\":[\"XMLHttpRequest\"]},\"queryStringParameters\":null,\"multiValueQueryStringParameters\":null,\"pathParameters\":null,\"stageVariables\":null,\"requestContext\":{\"resourceId\":\"o9n2g2\",\"resourcePath\":\"/verify\",\"httpMethod\":\"POST\",\"extendedRequestId\":\"BtE5-HfEoAMFhUg=\",\"requestTime\":\"13/Mar/2023:05:30:52 +0000\",\"path\":\"/test/verify\",\"accountId\":\"181895849565\",\"protocol\":\"HTTP/1.1\",\"stage\":\"test\",\"domainPrefix\":\"7uwg6gt5d7\",\"requestTimeEpoch\":1678685452324,\"requestId\":\"07972825-3c74-4ac7-a504-6821ff12e451\",\"identity\":{\"cognitoIdentityPoolId\":null,\"accountId\":null,\"cognitoIdentityId\":null,\"caller\":null,\"sourceIp\":\"59.88.172.215\",\"principalOrgId\":null,\"accessKey\":null,\"cognitoAuthenticationType\":null,\"cognitoAuthenticationProvider\":null,\"userArn\":null,\"userAgent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\",\"user\":null},\"domainName\":\"7uwg6gt5d7.execute-api.us-east-1.amazonaws.com\",\"apiId\":\"7uwg6gt5d7\"},\"body\":\"{\\\"email\\\":\\\"hrushi.mehendale@gmail.com\\\",\\\"otp\\\":\\\"0458\\\"}\",\"isBase64Encoded\":false}" }, { "operation": "signin", "timestamp": "1678685424502", "httpCode": "200", "response": "{\"statusCode\":200,\"body\":{\"result\":true}}", "email": "hrushi.mehendale@gmail.com", "request": "{\"resource\":\"/signin\",\"path\":\"/signin\",\"httpMethod\":\"POST\",\"headers\":{\"Accept\":\"*/*\",\"Accept-Encoding\":\"gzip, deflate, br\",\"Accept-Language\":\"en-GB,en-US;q=0.9,en;q=0.8\",\"cache-control\":\"no-cache\",\"CloudFront-Forwarded-Proto\":\"https\",\"CloudFront-Is-Desktop-Viewer\":\"true\",\"CloudFront-Is-Mobile-Viewer\":\"false\",\"CloudFront-Is-SmartTV-Viewer\":\"false\",\"CloudFront-Is-Tablet-Viewer\":\"false\",\"CloudFront-Viewer-ASN\":\"9829\",\"CloudFront-Viewer-Country\":\"IN\",\"content-type\":\"application/json\",\"Host\":\"7uwg6gt5d7.execute-api.us-east-1.amazonaws.com\",\"origin\":\"http://localhost:8000\",\"pragma\":\"no-cache\",\"Referer\":\"http://localhost:8000/\",\"sec-ch-ua\":\"\\\"Chromium\\\";v=\\\"110\\\", \\\"Not A(Brand\\\";v=\\\"24\\\", \\\"Google Chrome\\\";v=\\\"110\\\"\",\"sec-ch-ua-mobile\":\"?0\",\"sec-ch-ua-platform\":\"\\\"macOS\\\"\",\"sec-fetch-dest\":\"empty\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-site\":\"cross-site\",\"User-Agent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\",\"Via\":\"2.0 ce835a3eb4776e2406cfeb7dbc0dc14a.cloudfront.net (CloudFront)\",\"X-Amz-Cf-Id\":\"YGGSGrhSYmzSpjtLe0lsPXut_Cot5ltVy4lz34jrolC2_9rVi8WUUg==\",\"X-Amzn-Trace-Id\":\"Root=1-640eb4ef-7d14246231078e35220ce2ae\",\"X-Forwarded-For\":\"59.88.172.215, 15.158.22.19\",\"X-Forwarded-Port\":\"443\",\"X-Forwarded-Proto\":\"https\",\"x-requested-with\":\"XMLHttpRequest\"},\"multiValueHeaders\":{\"Accept\":[\"*/*\"],\"Accept-Encoding\":[\"gzip, deflate, br\"],\"Accept-Language\":[\"en-GB,en-US;q=0.9,en;q=0.8\"],\"cache-control\":[\"no-cache\"],\"CloudFront-Forwarded-Proto\":[\"https\"],\"CloudFront-Is-Desktop-Viewer\":[\"true\"],\"CloudFront-Is-Mobile-Viewer\":[\"false\"],\"CloudFront-Is-SmartTV-Viewer\":[\"false\"],\"CloudFront-Is-Tablet-Viewer\":[\"false\"],\"CloudFront-Viewer-ASN\":[\"9829\"],\"CloudFront-Viewer-Country\":[\"IN\"],\"content-type\":[\"application/json\"],\"Host\":[\"7uwg6gt5d7.execute-api.us-east-1.amazonaws.com\"],\"origin\":[\"http://localhost:8000\"],\"pragma\":[\"no-cache\"],\"Referer\":[\"http://localhost:8000/\"],\"sec-ch-ua\":[\"\\\"Chromium\\\";v=\\\"110\\\", \\\"Not A(Brand\\\";v=\\\"24\\\", \\\"Google Chrome\\\";v=\\\"110\\\"\"],\"sec-ch-ua-mobile\":[\"?0\"],\"sec-ch-ua-platform\":[\"\\\"macOS\\\"\"],\"sec-fetch-dest\":[\"empty\"],\"sec-fetch-mode\":[\"cors\"],\"sec-fetch-site\":[\"cross-site\"],\"User-Agent\":[\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\"],\"Via\":[\"2.0 ce835a3eb4776e2406cfeb7dbc0dc14a.cloudfront.net (CloudFront)\"],\"X-Amz-Cf-Id\":[\"YGGSGrhSYmzSpjtLe0lsPXut_Cot5ltVy4lz34jrolC2_9rVi8WUUg==\"],\"X-Amzn-Trace-Id\":[\"Root=1-640eb4ef-7d14246231078e35220ce2ae\"],\"X-Forwarded-For\":[\"59.88.172.215, 15.158.22.19\"],\"X-Forwarded-Port\":[\"443\"],\"X-Forwarded-Proto\":[\"https\"],\"x-requested-with\":[\"XMLHttpRequest\"]},\"queryStringParameters\":null,\"multiValueQueryStringParameters\":null,\"pathParameters\":null,\"stageVariables\":null,\"requestContext\":{\"resourceId\":\"n43pge\",\"resourcePath\":\"/signin\",\"httpMethod\":\"POST\",\"extendedRequestId\":\"BtE1fGYRoAMFvZw=\",\"requestTime\":\"13/Mar/2023:05:30:23 +0000\",\"path\":\"/test/signin\",\"accountId\":\"181895849565\",\"protocol\":\"HTTP/1.1\",\"stage\":\"test\",\"domainPrefix\":\"7uwg6gt5d7\",\"requestTimeEpoch\":1678685423611,\"requestId\":\"5d4b6d21-63e9-469a-9c42-48a9c15e014d\",\"identity\":{\"cognitoIdentityPoolId\":null,\"accountId\":null,\"cognitoIdentityId\":null,\"caller\":null,\"sourceIp\":\"59.88.172.215\",\"principalOrgId\":null,\"accessKey\":null,\"cognitoAuthenticationType\":null,\"cognitoAuthenticationProvider\":null,\"userArn\":null,\"userAgent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\",\"user\":null},\"domainName\":\"7uwg6gt5d7.execute-api.us-east-1.amazonaws.com\",\"apiId\":\"7uwg6gt5d7\"},\"body\":\"{\\\"email\\\":\\\"hrushi.mehendale@gmail.com\\\"}\",\"isBase64Encoded\":false}" }], "pages": 1 } }) });
        }));
        window.location.hash = '';
        const el = (await fixture(htmlContent));
        await el.updateComplete;
        window.location.href = window.location.href + '#auth/logs/email/hrushi.mehendale@gmail.com/0';
        await new Promise((r) => setTimeout(r, TIMEOUT));
        const back = el.shadowRoot.querySelectorAll('.link')[0];
        assert.ok(back.outerHTML.indexOf('back to') >= 0);
        const tableC = el.shadowRoot.querySelectorAll('.table-container')[0];
        assert.ok(tableC.outerHTML.indexOf('hrushi.mehendale@gmail.com') >= 0);
    });
});
//# sourceMappingURL=sf-user-auth_test.js.map
//# sourceMappingURL=sf-user-auth-admin-logs_test.js.map