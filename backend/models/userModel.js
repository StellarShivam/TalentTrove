const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: [{ type: String, required: true }],
    jobType: { type: String },
    applyLink: { type: String, required: true },
  },
  { timestamps: true }
); // Define timestamps option here

const userSchema = mongoose.Schema({
  email: { type: "String", required: true, unique: true },
  password: { type: "String", required: true },
  appliedJobs: [jobSchema],
  role: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
