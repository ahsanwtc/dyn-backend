const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

const { validateInput, sendResponse } = require('../util');
const { create } = require('../util/db');

module.exports.handler = async (event) => {

  try {
    const data = JSON.parse(event.body);

    const isValid = validateInput(data, 'register');
    if (!isValid) {
      return sendResponse(400, { message: 'Invalid input' });
    }

    const { email, password, favouriteTeam } = data;
    const { USER_POOL_ID } = process.env;
    
    const params = {
      UserPoolId: USER_POOL_ID,
      Username: email,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'true' }
      ],
      MessageAction: 'SUPPRESS'
    };

    const response = await cognito.adminCreateUser(params).promise();
    if (response.User) {
      const paramsForSetPass = {
          Password: password,
          UserPoolId: USER_POOL_ID,
          Username: email,
          Permanent: true
      };
      await cognito.adminSetUserPassword(paramsForSetPass).promise();

      /* add entry to dynamodb */
      await create({ email, favouriteTeam });
    }
    return sendResponse(200, { message: 'User registration successful' });

  } catch (error) {
    const message = error.message ? error.message : 'Internal server error';
    return sendResponse(500, { message });
  }

};