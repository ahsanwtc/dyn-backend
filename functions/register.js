module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'REGISTER',
        input: event,
      },
      null,
      2
    ),
  };
};