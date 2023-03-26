const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });


module.exports.create = async data => {
  
  const params = {
    Item: {
      email: { S: data.email },
      favouriteTeam: { S: data.favouriteTeam },
    },
    TableName: process.env.USER_TABLE
  };

  try {
    const db = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    await db.putItem(params).promise();
    console.log(JSON.stringify(data, null, 2), "Success");
  } catch (error) {
    console.log("Error", error);
  }

};