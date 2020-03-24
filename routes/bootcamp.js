const express = require("express");
const router = express.Router();
const {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  updateBootcamp,
  getBootcampImRadius
} = require("../controllers/bootcamps");

router.route("/radius/:zipcode/:distance").get(getBootcampImRadius);

router
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
