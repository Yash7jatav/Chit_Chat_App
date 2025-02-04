// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();

// function connectDB() {
//   mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//       console.log("Database connected.");
//     })
//     .catch((error) => {
//       console.error("Unable to connect with database.", error);
//     });
// }

// module.exports = { connectDB };

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function connectDB() {
  return mongoose.connect(process.env.MONGO_URI).catch((error) => {
    console.error("Unable to connect with database.", error);
    throw error; // Rethrow the error so it can be handled in server.js
  });
}

module.exports = { connectDB };
