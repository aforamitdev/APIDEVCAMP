const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");

// @desc GET ALL bootcamps
// @route GET api/v1/bootcamps
// @access Public

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    next(error);
  }
};

// @desc GET single  bootcamps
// @route GET api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    // res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};

// @desc GET single  bootcamps
// @route GET api/v1/bootcamps
// @access Public

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};

// @desc PUT update  bootcamps
// @route PUT api/v1/bootcamps:id
// @access Privae

exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!bootcamp) {
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404);
    }
    return res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};

// @desc DEL delete  bootcamps
// @route DEL api/v1/bootcamps:id
// @access private

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id, req.body);
    if (!bootcamp) {
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404);
    }
    return res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};
