const mongoose = require("mongoose");

const jobModel = mongoose.Schema(
  {
    logo: { type: String },
    jobCategory: { type: String, required: true },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: [{ type: String, required: true }],
    jobType: { type: String },
    jobDescription: { type: String },
    jobPosted: { type: String },
    applyLink: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobModel);

module.exports = Job;
