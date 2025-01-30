import mongoose from "mongoose";

async function connectToDB(dbURI) {
  console.log(`Connecting to DB: ${dbURI}`);

  try {
    await mongoose.connect(dbURI);
    console.log("Connected to DB successfully!");
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }

  return mongoose;
}

export default connectToDB;
