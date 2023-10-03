// /** @format */

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cors = require("cors");
const PORT = process.env.PORT || 8000;
// // require('./config/nodeMailer');
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// app.use(cors());
app.use(bodyParser.json());

app.use("/", require("./routes/index.js"));

mongoose
  .connect(
    "mongodb+srv://satyamraj387:GNL0admJiXjl5AOL@cluster0.7n0ddwl.mongodb.net/userDirectory?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((er) => {
    console.log("eeror in connecting mongo", err);
  });

app.listen(PORT, () => {
  console.log(`app is running on PORT:${PORT}`);
});

console.log("hello");
