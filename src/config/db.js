import "dotenv/config";
import { fromEnv } from "@aws-sdk/credential-providers";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const clienteDynamo = new DynamoDBClient({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: fromEnv(),
});
const clienteDynamoDB = DynamoDBDocumentClient.from(clienteDynamo);
export default clienteDynamoDB;
