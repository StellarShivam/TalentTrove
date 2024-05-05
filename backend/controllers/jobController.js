const Job = require("../models/jobModel");
const JobRequest = require("../models/jobRequestModel");
const User = require("../models/userModel");

exports.fetchJobs = async (req, res, next) => {
  const keyword = req.params.keyword;
  const cities = req.params.cities;
  const jobtype = req.params.jobtype;

  const citiesArr = cities.split("-");
  const jobtypeArr = jobtype.split("-");
  let query;

  if (jobtypeArr[0] == "" && citiesArr[0] != "") {
    query = {
      $and: [
        {
          $or: [
            { jobDescription: { $regex: keyword, $options: "i" } },
            { jobTitle: { $regex: keyword, $options: "i" } },
          ],
        },
        {
          location: { $in: citiesArr },
        },
      ],
    };
  } else if (citiesArr[0] == "" && jobtypeArr[0] != "") {
    query = {
      $and: [
        {
          $or: [
            { jobDescription: { $regex: keyword, $options: "i" } },
            { jobTitle: { $regex: keyword, $options: "i" } },
          ],
        },
        {
          jobType: { $in: jobtypeArr },
        },
      ],
    };
  } else if (citiesArr[0] == "" && jobtypeArr[0] == "") {
    query = {
      $and: [
        {
          $or: [
            { jobDescription: { $regex: keyword, $options: "i" } },
            { jobTitle: { $regex: keyword, $options: "i" } },
          ],
        },
      ],
    };
  } else {
    query = {
      $and: [
        {
          $or: [
            { jobDescription: { $regex: keyword, $options: "i" } },
            { jobTitle: { $regex: keyword, $options: "i" } },
          ],
        },
        {
          jobType: { $in: jobtypeArr },
        },
        {
          location: { $in: citiesArr },
        },
      ],
    };
  }

  const jobs = await Job.find(query);

  res.json({ jobs });
  //   console.log(jobs);
};

exports.fetchAllCities = async (req, res, next) => {
  const uniqueCities = await Job.distinct("location");

  res.json({ uniqueCities });
};

exports.fetchJobDetails = async (req, res, next) => {
  const jobId = req.params.jobId;
  const jobData = await Job.findById(jobId);
  console.log(jobData);
  res.json({ jobData });
};

exports.addToJobApplied = async (req, res, next) => {
  const { userId } = req.user;
  const { jobTitle, companyName, location, jobType, applyLink } = req.body;
  const newData = { jobTitle, companyName, location, jobType, applyLink };

  const result = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { appliedJobs: newData } }
  );
  res.json({ message: "Job added successfully to applied job section" });
};

exports.appliedJobs = async (req, res, next) => {
  const { userId } = req.user;
  const data = await User.findOne({ _id: userId });
  res.json({ appliedJobs: data.appliedJobs });
};

exports.createJob = async (req, res, next) => {
  const { userId } = req.user;
  const {
    jobCategory,
    jobTitle,
    companyName,
    location,
    jobType,
    jobDescription,
  } = req.body;
  const newJob = new Job({
    jobCategory,
    jobTitle,
    companyName,
    location,
    jobType,
    jobDescription,
    creator: userId,
  });

  const data = await newJob.save();
  const applyLink = `http://localhost:3000/jobdesc/${data._id}`;
  const data2 = await Job.findById(data._id);
  data2.applyLink = applyLink;
  const updatedJob = await data2.save();
  res.json({ job: updatedJob });
};

exports.fetchEmployeerJobs = async (req, res, next) => {
  const { userId } = req.user;
  const data = await Job.find({ creator: userId });
  res.json({ myJobs: data });
};

exports.createJobAlert = async (req, res, next) => {
  const { userId } = req.user;
  const { jobCategory, location, jobType } = req.body;

  const data = await User.findById(userId);
  const email = data.email;
  const newJobAlert = new JobRequest({
    jobCategory,
    location,
    jobType,
    email,
    user: userId,
  });
  const newData = await newJobAlert.save();
  res.json({ newData });
};
