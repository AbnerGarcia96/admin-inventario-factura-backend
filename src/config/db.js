require("dotenv").config();
const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const containerNames = process.env.COSMOS_DB_CONTAINERS.split(","); // Multiple containers

const client = new CosmosClient({ endpoint, key });

let containers = {}; // Object to store references to containers

async function connectDB() {
  try {
    console.log("Connecting to Cosmos DB...");

    // Ensure the database exists
    const { database } = await client.databases.createIfNotExists({
      id: databaseId,
    });

    // Create references for all containers dynamically
    for (let name of containerNames) {
      const { container } = await database.containers.createIfNotExists({
        id: name.trim(),
      });
      containers[name.trim()] = container;
    }

    console.log(
      `[DB] Connected to Cosmos DB: ${databaseId} with containers: ${Object.keys(
        containers
      ).join(", ")}`
    );
    return containers;
  } catch (error) {
    console.error("[DB] Error connecting to Cosmos DB:", error.message);
  }
}

// Function to get a specific container
function getContainer(containerName) {
  if (!containers[containerName]) {
    throw new Error(
      `[DB] Container "${containerName}" not found. Available containers: ${Object.keys(
        containers
      ).join(", ")}`
    );
  }
  return containers[containerName];
}

module.exports = { connectDB, getContainer };
