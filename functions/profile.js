const { sendResponse } = require('../util');
const { get } = require('../util/db');

module.exports.handler = async event => {
  const data = await get(event.requestContext.authorizer.claims.email);
  if (data) {
    return sendResponse(200, { data });  
  }

  return sendResponse(404, { message: 'user does not exists!' });
};