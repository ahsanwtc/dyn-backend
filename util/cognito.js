const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();


module.exports.login = async ({ email, password }) => {
  try {

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
    return {
      token: response.AuthenticationResult.IdToken
    };

  } catch (error) {
    return {
      error: error.message
    };
  }
};