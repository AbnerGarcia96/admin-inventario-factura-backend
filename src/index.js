// Import required modules
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const rutasFacturas = require("./facturas/facturas.routes");

// Load environment variables from .env file
dotenv.config();

// Create an instance of an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Connects to CosmosDB
connectDB();

// Basic route
app.use("/facturas", rutasFacturas);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
