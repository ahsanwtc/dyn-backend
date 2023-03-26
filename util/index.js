module.exports.validateInput = data => {
  const { email, password, favouriteTeam } = data;

  if (!email || !password || !favouriteTeam) {
    return false;  
  }

  return true
};

module.exports.sendResponse = (statusCode, body) => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  };
};