import mongoose from "mongoose";

const MONGO_URI ='mongodb://mongo:27017/'
const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); 
  }
};

export default connectToDB;