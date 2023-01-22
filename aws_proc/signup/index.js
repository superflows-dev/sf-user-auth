import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient.js";

export const handler = async (event, context, callback) => {
    
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      },
    };
    
    var email = event.email.trim();
    var name = event.name.trim();
    
    if(email == null || email == "" || !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      response.body = {result: false, error: "Email not valid!"}
      callback(null, response);
      return;
    }
    
    if(name == null || name == "" || name.length < 3 ) {
      response.body = {result: false, error: "Name not valid!"}
      callback(null, response);
      return;
    }
   
    var getParams = {
      TableName: 'T_SF_Users_15',
      Key: {
        email: { S: email },
      },
      ProjectionExpression: "email",
    };
    
    console.log(getParams);
    
    const runGet = async () => {
      try {
        const data = await ddbClient.send(new GetItemCommand(getParams));
        return data;
      } catch (err) {
        console.error(err);
        return err;
      }
    };
    
    const resultGet = await runGet();
    
    if(resultGet.Item != null) {
      
      response.body = {result: false, error: "Item already exists!"}
      callback(null, response);
      return;
      
    }
    
    var setParams = {
      TableName: 'T_SF_Users_15',
      Item: {
        'email' : {S: email},
        'name' : {S: name}
      }
    };
    
    const run = async () => {
      try {
        const data = await ddbClient.send(new PutItemCommand(setParams));
        return data;
      } catch (err) {
        console.error(err);
        return err;
      }
    };
    
    const resultPut = await run();

    console.log(resultPut);
    
    response.body = {result: true}
    callback(null, response);
    return;
    
}