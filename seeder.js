const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const Bootcamp = require("./models/Bootcamp");

mongoose.connect("mongodb://localhost:27017/devcamp_2", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const bootcamp = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const importData = async () => {
  try {
    await Bootcamp.create(bootcamp);
    console.log("data Imported");
    process.exit(0);
  } catch (e) {
    console.log(e);
  }
};

importData();
