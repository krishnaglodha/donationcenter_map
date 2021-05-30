const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
var ddb = new AWS.DynamoDB({
  region: "eu-central-1",
  apiVersion: "2012-08-10",
});
var docClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });

const ddbGeo = require("dynamodb-geo");
const config = new ddbGeo.GeoDataManagerConfiguration(ddb, "donationcentermap");
config.longitudeFirst = true;
const myGeoTableManager = new ddbGeo.GeoDataManager(config);
var s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  console.log("starting function");
  var itemid = uuidv4();
  if (event["data"]["image"]) {
    let encodedImage = event["data"]["image"];
    let decodedImage = Buffer.from(encodedImage, "base64");
    var filePath = "uploads/" + itemid + ".jpg";
    var params = {
      Body: decodedImage,
      Bucket: "donationcenterdata",
      Key: filePath,
    };
    try {
      const Body = await s3.upload(params).promise();
      // ----------- create Point function : start  ----------- //
      await myGeoTableManager
        .putPoint({
          itemid: { S: itemid }, // Use this to ensure uniqueness of the hash/range pairs.
          GeoPoint: {
            // An object specifying latitutde and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
            latitude: event["geometry"]["lat"],
            longitude: event["geometry"]["lng"],
          },
          PutItemInput: {
            // Passed through to the underlying DynamoDB.putItem request. TableName is filled in for you.
            Item: {
              itemid: { S: itemid }, // The primary key, geohash and geojson data is filled in for you
              photoURL: { S: Body.Location }, // Specify attribute values using { type: value } objects, like the DynamoDB API.
              name: { S: event["data"]["name"] },
              telehpone: { S: event["data"]["telehpone"] },
              time: { S: event["data"]["time"] },
              email: { S: event["data"]["email"] },
              website: { S: event["data"]["website"] },
              pay_attention: { S: event["data"]["pay_attention"] },
              do_with_donation: { S: event["data"]["do_with_donation"] },
              type: { S: event["data"]["type"] },
              functional: { S: event["data"]["functional"] },
            },
            // ... Anything else to pass through to `putItem`, eg ConditionExpression
          },
        })
        .promise()
        .then(function () {
          console.log("then function");
          console.log("Done!");
          callback(null, { name: event["data"]["name"] });
        })
        .catch((err) => {
          console.log("error image function");
          return callback(err);
        });
      console.log("outside function");
    } catch (err) {
      callback(err, null);
    }

    console.log("after s3");
  } else {
    await myGeoTableManager
      .putPoint({
        itemid: { S: itemid }, // Use this to ensure uniqueness of the hash/range pairs.
        GeoPoint: {
          // An object specifying latitutde and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
          latitude: event["geometry"]["lat"],
          longitude: event["geometry"]["lng"],
        },
        PutItemInput: {
          // Passed through to the underlying DynamoDB.putItem request. TableName is filled in for you.
          Item: {
            itemid: { S: itemid }, // The primary key, geohash and geojson data is filled in for you
            name: { S: event["data"]["name"] },
            telehpone: { S: event["data"]["telehpone"] },
            time: { S: event["data"]["time"] },
            email: { S: event["data"]["email"] },
            website: { S: event["data"]["website"] },
            pay_attention: { S: event["data"]["pay_attention"] },
            do_with_donation: { S: event["data"]["do_with_donation"] },
            type: { S: event["data"]["type"] },
            functional: { S: event["data"]["functional"] },
          },
          // ... Anything else to pass through to `putItem`, eg ConditionExpression
        },
      })
      .promise()
      .then(function () {
        console.log("then function");
        console.log("Done!");
        callback(null, { name: event["data"]["name"] });
      })
      .catch((err) => {
        console.log("error non image function");
        return callback(err);
      });
  }
};
