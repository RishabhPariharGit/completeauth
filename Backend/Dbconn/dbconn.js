const mongoose = require("mongoose");
const db ="mongodb+srv://rishabhgit1704:Newcrud2123@clustercrud.udvz4tg.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.log("Unable to connect to Mongo db");
  }
};
module.exports = connectDB;