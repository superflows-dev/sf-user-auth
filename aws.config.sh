tablename=T_SF_Users_15
rolename=R_SF_Users_4
policyname=P_SF_Users_4
functionsignup=F_SF_SignUp_4
api=API_Auth
adminemail=hrushi.mehendale@gmail.com

awsregion=us-east-1
awsaccount=181895849565
apistage=test

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "Script Starts...";

#
# Create table
#

# newtable=`aws dynamodb create-table \
# --table-name $tablename \
# --attribute-definitions AttributeName=email,AttributeType=S \
# --key-schema AttributeName=email,KeyType=HASH \
# --provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=5 | jq '.TableDescription.TableArn'`

# if [ -z "$newtable" ]
# then
#       echo -e "DynamoDb table creation FAILED ${RED} x ${NC}";
# else
#       echo -e "DynamoDb table creation SUCCESSFUL ${GREEN} ✓ ${NC}: $newtable";
# fi

#
# Create permission policy for
# that table
#

# policydocument="{\"Version\": \"2012-10-17\", \"Statement\": [{\"Sid\": \"Stmt1674124196543\",\"Action\": \"dynamodb:*\",\"Effect\": \"Allow\",\"Resource\": ${newtable}}]}"

# policycommand="aws iam create-policy --policy-name $policyname --policy-document '$policydocument'";

# policy=`eval "$policycommand" | jq '.Policy.Arn'`;

# if [ -z "$policy" ]
# then
#       echo -e "Policy creation FAILED ${RED} x ${NC}";
# else
#       echo -e "Policy creation SUCCESSFUL ${GREEN} ✓ ${NC}: $policy";
# fi

#policy="arn:aws:iam::181895849565:policy/P_SF_Users";

#
# Create execution role
#

# rolecommand="aws iam create-role --role-name $rolename --assume-role-policy-document '{\"Version\": \"2012-10-17\",\"Statement\": [{ \"Effect\": \"Allow\", \"Principal\": {\"Service\": \"lambda.amazonaws.com\"}, \"Action\": \"sts:AssumeRole\"}]}'";

# role=`eval "$rolecommand" | jq '.Role.Arn'`;

# if [ -z "$role" ]
# then
#       echo -e "Role creation FAILED ${RED} x ${NC}";
# else
#       echo -e "Role creation SUCCESSFUL ${GREEN} ✓ ${NC}: $role";
# fi

#role="arn:aws:iam::181895849565:role/R_SF_Users"

#
# Attach policy to role
#

# attachcommand="aws iam attach-role-policy --role-name $rolename --policy-arn $policy"

# eval "$attachcommand";

#
# Prepare function zips
#

# echo -e "Clearing lambda function zips...\n";
# sleep 1

# rm ./*zip
# rm aws/*zip
# rm -r aws_proc

# echo -e "Replacing variables in lambda functions code...\n";
# sleep 1

# cp -r aws aws_proc

# find ./aws_proc -name '*.js' -exec sed -i '' -e "s/AWS_REGION/$awsregion/g" {} \;
# find ./aws_proc -name '*.js' -exec sed -i '' -e "s/TABLE_NAME/$tablename/g" {} \;

# echo -e "Zipping up lambda functions for upload...\n";
# sleep 1

# zip -r -j ./aws_proc/signup.zip aws_proc/signup/*

#
# Create functions
#

# sleep 10

# functionsignupcommand="aws lambda create-function --function-name $functionsignup --zip-file fileb://aws_proc/signup.zip --handler index.handler --runtime nodejs18.x --timeout 30 --role $role"

# functionsignup=`eval "$functionsignupcommand" | jq '.FunctionArn'`;

# if [ -z "$functionsignup" ]
# then
#       echo -e "Function creation FAILED ${RED} x ${NC}";
# else
#       echo -e "Function creation SUCCESSFUL ${GREEN} ✓ ${NC}: $functionsignup";
# fi

functionsignup="arn:aws:lambda:us-east-1:181895849565:function:F_SF_SignUp_4";

#
# Create api gateway
#

createapicommand="aws apigateway create-rest-api --name '$api' --region $awsregion";

createapi=`eval "$createapicommand" | jq '.id'`;

if [ -z "$createapi" ]
then
      echo -e "API creation FAILED ${RED} x ${NC}";
else
      echo -e "API creation SUCCESSFUL ${GREEN} ✓ ${NC}: $createapi";
fi

#createapi="vzmzx2blua"

getresourcescommand="aws apigateway get-resources --rest-api-id $createapi --region $awsregion"

getresources=`eval "$getresourcescommand | jq '.items | .[] | .id'"`

echo -e "API resource obtained ${GREEN} ✓ ${NC}: $getresources";

#getresources="py63gincik"

createresourcesignupcommand="aws apigateway create-resource --rest-api-id $createapi --region $awsregion --parent-id $getresources --path-part signup";

createresourcessignup=`eval "$createresourcesignupcommand | jq '.id'"`

if [ -z "$createresourcessignup" ]
then
      echo -e "SignUp resource creation FAILED ${RED} x ${NC}";
else
      echo -e "SignUp resource creation SUCCESSFUL ${GREEN} ✓ ${NC}: $createresourcessignup";
fi

#createresourcessignup="oyb62d";

putmethodsignupcommand="aws apigateway put-method --rest-api-id $createapi --resource-id $createresourcessignup --http-method POST --authorization-type \"NONE\" --region $awsregion --no-api-key-required";

putmethodsignup=`eval "$putmethodsignupcommand | jq '.httpMethod'"`

if [ -z "$putmethodsignup" ]
then
      echo -e "SignUp method creation FAILED ${RED} x ${NC}";
else
      echo -e "SignUp method creation SUCCESSFUL ${GREEN} ✓ ${NC}: $putmethodsignup";
fi

putintegrationsignupcommand="aws apigateway put-integration --region $awsregion --rest-api-id $createapi --resource-id $createresourcessignup --http-method POST --type AWS_PROXY --integration-http-method POST --uri arn:aws:apigateway:$awsregion:lambda:path/2015-03-31/functions/$functionsignup/invocations"

putintegrationsignup=`eval "$putintegrationsignupcommand | jq '.passthroughBehavior'"`;

echo $putintegrationsignup;

putintegrationresponsesignup200command="aws apigateway put-integration-response --region $awsregion --rest-api-id $createapi --resource-id $createresourcessignup --http-method POST --status-code 200 --selection-pattern \"\""

putintegrationresponsesignup200=`eval "$putintegrationresponsesignup200command | jq '.statusCode'"`

random=`echo $RANDOM`;
ts=`date +%s`

lambdaaddpermissionsignupcommand="aws lambda add-permission --function-name "$functionsignup" --source-arn "arn:aws:execute-api:$awsregion:$awsaccount:$createapi/*/POST/signup" --principal apigateway.amazonaws.com  --statement-id ${random}${ts} --action lambda:InvokeFunction";

lambdaaddpermissionsignup=`eval "$lambdaaddpermissionsignupcommand | jq '.Statement'"`;

if [ -z "$lambdaaddpermissionsignup" ]
then
      echo -e "SignUp lambda invoke grant creation FAILED ${RED} x ${NC}";
else
      echo -e "SignUp lambda invoke grant creation SUCCESSFUL ${GREEN} ✓ ${NC}: $lambdaaddpermissionsignup";
fi

createdeploymentsignupcommand="aws apigateway create-deployment --rest-api-id $createapi --stage-name $apistage --region $awsregion"

createdeploymentsignup=`eval "$createdeploymentsignupcommand | jq '.id'"`

if [ -z "$createdeploymentsignup" ]
then
    echo -e "SignUp deployment creation FAILED ${RED} x ${NC}";
else
    echo -e "SignUp deployment creation SUCCESSFUL ${GREEN} ✓ ${NC}: $createdeploymentsignup";
fi

echo -e "Script Ended...\n";
