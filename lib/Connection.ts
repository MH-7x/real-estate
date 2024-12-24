import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  if (!process.env.MONGODB_URI_SERVER) {
    throw new Error(
      "Please define the MONGODB_URI_SERVER environment variable"
    );
  }

  // If there are existing connections, use them
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log("Using existing database connection");
      return;
    }

    // Disconnect if the state is not connected
    await mongoose.disconnect();
    console.log("Disconnected stale connection");
  }

  try {
    // Establish a new connection
    const db = await mongoose.connect(process.env.MONGODB_URI_SERVER);

    connection.isConnected = db.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log("Database connected successfully");
    } else {
      console.error("Database connection state is not connected:", connection);
      throw new Error("Database connection failed");
    }
  } catch (error) {
    console.error("Database connection error:", error);
    if (process.env.NODE_ENV === "production") {
      process.exit(1); // Exit in production if connection fails
    } else {
      throw new Error("Failed to connect to the database");
    }
  }
}

export default dbConnect;
