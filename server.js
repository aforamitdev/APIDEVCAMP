const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());

const bootcamps = require("./routes/bootcamp");
connectDB();

if (process.env.NODE_ENV === "undefined") {
  app.use(morgan("dev"));
}
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  // @ts-ignore
  console.log(`SERVER RUNNING in ${process.env.NODE_ENV} made in ${PORT}`)
);

// handle unhandle prommis rejection
process.on("unhandledRejection", (err, prommis) => {
  console.log(`ERROR: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
