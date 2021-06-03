'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region : "ap-southeast-1" });

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({ region : "ap-southeast-1" });
    const params = {
        ExpressionAttributeValues: {
            ':p' : "10000",
        }, 
        FilterExpression: 'Transaksi >= :p',
        ProjectionExpression : 'Nama',
        TableName: 'lks',
    };

    try {
        const data = await documentClient.scan(params).promise();
        data.Items.forEach(function(itemdata) {
           console.log(itemdata);
        });
    } catch (err) {
        console.log(err);
    }
};
