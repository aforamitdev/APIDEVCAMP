const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const Bootcamp = require("./models/Bootcamp");
const Courses = require("./models/Course");
mongoose.connect("mongodb://localhost:27017/devcamp_2", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const bootcamp = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const importData = async () => {
  try {
    await Bootcamp.deleteMany({});
    console.log("-------------------------------------------------");
    await Bootcamp.create(bootcamp);

    console.log("data Imported");
    process.exit(0);
  } catch (e) {
    console.log(e);
  }
};
importData();
const importData2 = async () => {
  try {
    await Courses.deleteMany({});
    await Courses.create(courses);
    console.log("RANRANRANRANRANRAN");

    console.log("data Imported");
    process.exit(0);
  } catch (e) {
    console.log(e);
  }
};

// importData2();
