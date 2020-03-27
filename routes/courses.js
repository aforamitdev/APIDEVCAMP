const express = require("express");
const { getCourses, getCourse, addCourse } = require("../controllers/Courses");

const router = express.Router({ mergeParams: true }); //! for sharing resourse

router
  .route("/")
  .get(getCourses)
  .post(addCourse);
router.route("/:id").get(getCourse);
module.exports = router;
