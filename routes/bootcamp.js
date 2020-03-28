const express = require("express");
const {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  updateBootcamp,
  getBootcampImRadius
} = require("../controllers/bootcamps");

const { protect } = require("../middleware/auth");

//! include other router
const courseRouter = require("./courses");

const router = express.Router();

//! reroute inot othrt resourse router
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampImRadius);

router
  .route("/")
  .get(getBootcamps)
  .post(protect, createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
