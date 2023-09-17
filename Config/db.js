//Q4KO0OlVPjP5EMYL;
const mongoose = require("mongoose");
const db = process.env.MONGODB_URI;
async function connectdb() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb connected");
  } catch (err) {
    console.log("error occured " + err);
  }
}
module.exports = connectdb;
