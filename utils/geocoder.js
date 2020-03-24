const nodeGetcoder = require("node-geocoder");
const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "JlBdECg4dUN1rZB4I5rxxJ9a6GbTzj7i",
  formatter: null
};

const geocoder = nodeGetcoder(options);
module.exports = geocoder;
