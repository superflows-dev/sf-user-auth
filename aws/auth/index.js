import { processSignUp } from './signUp.js'
import { processSignIn } from './signIn.js'
import { processVerify } from './verify.js'
import { processValidate } from './validate.js'
import { processRefresh } from './refresh.js'

export const handler = async (event, context, callback) => {
    
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        "Access-Control-Allow-Methods": "POST",
        'Content-Type': 'application/json',
        "isBase64Encoded": false
      },
    };
    
    switch(event["path"]) {
      
      case "/signup":
        const resultSignUp = await processSignUp(event);
        response.body = JSON.stringify(resultSignUp.body);
        response.statusCode = resultSignUp.statusCode;
        break;
        
      case "/signin":
        const resultSignIn = await processSignIn(event);
        response.body = JSON.stringify(resultSignIn.body);
        response.statusCode = resultSignIn.statusCode;
        break;
        
      case "/verify":
        const resultVerify = await processVerify(event);
        response.body = JSON.stringify(resultVerify.body);
        response.statusCode = resultVerify.statusCode;
        if(resultVerify.statusCode === 200) {
          response.headers["Set-Cookie"] = "refreshToken=" + resultVerify.body.data.refreshToken.token + " expires=" + new Date(parseInt(resultVerify.body.data.refreshToken.expiry)).toUTCString(); 
        }
        break;
        
      case "/validate":
        const resultValidate = await processValidate(event);
        response.body = JSON.stringify(resultValidate.body);
        response.statusCode = resultValidate.statusCode;
        break;
        
      case "/refresh":
        const resultRefresh = await processRefresh(event);
        response.body = JSON.stringify(resultRefresh.body);
        response.statusCode = resultRefresh.statusCode;
        if(resultVerify.statusCode === 200) {
          response.headers["Set-Cookie"] = "refreshToken=" + resultVerify.body.data.refreshToken.token + " expires=" + new Date(parseInt(resultVerify.body.data.refreshToken.expiry)).toUTCString(); 
        }
        break;
        
      default:
        response.body = JSON.stringify({result: false, error: "Method not found"});
        response.statusCode = 404;
      
      
    }
    
    callback(null, response);
    
}