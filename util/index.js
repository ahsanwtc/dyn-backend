module.exports.validateInput = (data, mode = 'login') => {
  const { email, password, favouriteTeam } = data;

  if (mode === 'register') {
    if (!email || !password || !favouriteTeam) {
      return false;  
    }
  }

  if (mode === 'login') {
    if (!email || !password) {
      return false;  
    }
  }  

  return true;
};

module.exports.sendResponse = (statusCode, body) => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Headers' : 'Content-Type,Authorization',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
  };
};