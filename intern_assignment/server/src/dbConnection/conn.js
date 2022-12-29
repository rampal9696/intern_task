import mongoose from "mongoose";
const MongoConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/rTest?retryWrites=true&w=majority"
    );
    console.log("DB connected successfully");
  } catch (err) {
    console.log("DB connection error", err);
  }
};

export default MongoConnection;
