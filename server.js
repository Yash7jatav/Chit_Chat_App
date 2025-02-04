// const app = require("./index");
// const port = process.env.PORT || 5001;

// app.listen(port, () => {
//   console.log("Server is running on port :- ", port);
// });
const app = require("./index");
const port = process.env.PORT || 5001;
const { connectDB } = require("./db/database_connection");

// Ensure that the database is connected before starting the server
connectDB()
  .then(() => {
    console.log("Database connected.");

    // Start the server once the database is connected
    app.listen(port, () => {
      console.log("Server is running on port :- ", port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if the database connection fails
  });
