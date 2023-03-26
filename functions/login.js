const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

const { validateInput, sendResponse } = require('../util');

module.exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const isValid = validateInput(data);
    if (!isValid) {
      return sendResponse(400, { message: 'Invalid input' });
    }

    const { email, password } = data;
    const { USER_POOL_ID, USER_POOL_CLIENT_ID } = process.env;
    
    const params = {
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: USER_POOL_ID,
      ClientId: USER_POOL_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    };

    const response = await cognito.adminInitiateAuth(params).promise();
    return sendResponse(200, { message: 'Success', token: response.AuthenticationResult.IdToken })

  } catch (error) {
    const message = error.message ? error.message : 'Internal server error';
    return sendResponse(500, { message });
  }
};