const express = require("express");
const jobController = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:keyword/:cities/:jobtype", jobController.fetchJobs);
router.get("/locations", jobController.fetchAllCities);
router.get("/jobdesc/:jobId", jobController.fetchJobDetails);
router.get("/appliedJobs", protect, jobController.appliedJobs);
router.post("/addToAppliedJob", protect, jobController.addToJobApplied);

module.exports = router;
