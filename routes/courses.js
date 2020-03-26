const express = require("express");
const { getCourses } = require("../controllers/Courses");

const router = express.Router({ mergeParams: true }); //! for sharing resourse

router.route("/").get(getCourses);

module.exports = router;
