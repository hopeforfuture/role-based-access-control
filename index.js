require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const DB = process.env.DATABASE_LOCAL;
mongoose.Promise = global.Promise;

mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

const app = express();
app.use(express.json());
app.use(express.static("public"));

const authRoute = require("./routes/authRoute");
app.use("/api/v1", authRoute);

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
