const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "./config/config.env" });

const app = express();

const bootcamps = require("./routes/bootcamp");

if (process.env.NODE_ENV === "undefined") {
  app.use(morgan("dev"));
}
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`SERVER RUNNING in ${process.env.NODE_ENV} made in ${PORT}`)
);
