module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'PROFILE',
        input: event,
      },
      null,
      2
    ),
  };
};