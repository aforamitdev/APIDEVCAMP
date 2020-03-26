const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Bootcamp = require("../models/Bootcamp");
const geoCoder = require("../utils/geocoder");

// @desc GET ALL bootcamps
// @route GET api/v1/bootcamps
// @access Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  console.log(req.body, req.params);
  let query;
  // copy query string
  const reqQuery = { ...req.query };
  // create query string

  // Field to exclude
  const removeField = ["select"];

  removeField.forEach(param => delete reqQuery[param]);
  console.log(reqQuery);

  let queryStr = JSON.stringify(req.query);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  console.log(queryStr);
  query = Bootcamp.find(JSON.parse(queryStr)).populate("courses"); //! courses reverse populated

  if (req.query.select) {
    const field = req.query.select.split(",").join(" ");
    query = Bootcamp.find().select(field);
  }
  if (req.query.sort) {
    const sortBy = req.query.sort(",").join(" ");
    query = Bootcamp.find().sort(sortBy);
  }
  const bootcamps = await query;

  res.status(200).json({ success: true, data: bootcamps });
});

// @desc GET single  bootcamps
// @route GET api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc GET single  bootcamps
// @route GET api/v1/bootcamps
// @access Public

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc PUT update  bootcamps
// @route PUT api/v1/bootcamps:id
// @access Privae

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!bootcamp) {
    new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404);
  }
  return res.status(200).json({ success: true, data: bootcamp });
});

// @desc DEL delete  bootcamps
// @route DEL api/v1/bootcamps:id
// @access private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id, req.body);
  if (!bootcamp) {
    new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404);
  }
  return res.status(200).json({ success: true, data: bootcamp });
});

//  @desc Get bootcamp within radius
//  @route GET /api/v1/bootcamps/radius/:zipcode/:distance
//  @access Private

exports.getBootcampImRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  // get lat/lng
  const loc = await geoCoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
  // calc radius using radians
  // divide distance by radius of the earth
  // earth radus =3,963
  const redius = distance / 3963;
  const bootcamp = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], redius] } }
  });
  res.status(200).json({
    success: true,
    result: bootcamp
  });
});
