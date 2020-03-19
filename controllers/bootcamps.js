// @desc GET ALL bootcamps
// @route GET api/v1/bootcamps
// @access Public

exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "show all bootcamps" });
};

// @desc GET single  bootcamps
// @route GET api/v1/bootcamps/:id
// @access Public

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "bootcamps byt id" });
};

// @desc GET single  bootcamps
// @route GET api/v1/bootcamps
// @access Public

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "bootcamps byt id" });
};

// @desc DEL delete  bootcamps
// @route DEL api/v1/bootcamps:id
// @access private

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "bootcamps byt id" });
};

// @desc PUT update  bootcamps
// @route PUT api/v1/bootcamps:id
// @access Privae

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "bootcamps byt id" });
};
