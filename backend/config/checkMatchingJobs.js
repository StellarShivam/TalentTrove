const Job = require("../models/jobModel");
const JobRequest = require("../models/jobRequestModel");
const nodemailer = require("nodemailer");

const maillist = [
  "shivam.anand.216@gmail.com",
  "michaeljohnfanofcricket@gmail.com",
];

const checkMatchingJobs = () => {
  // Defines recipients
  console.log("checking for matching jobs...");

  const sendEmail = async (email, job) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: "stellarshivam7@gmail.com",
        pass: "mvwyezpiyynccxpt",
      },
    });

    let info = await transporter.sendMail({
      from: '"Shivam" <stellarshivam7@gmail.com>',
      to: email, // Mails to array of recipients
      subject: "Testing, testing, 123",
      html: `
    <h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
    });

    console.log(info.messageId);
    console.log(info.accepted); // Array of emails that were successful
    console.log(info.rejected); // Array of unsuccessful emails
  };

  const jobChangeStream = Job.watch();

  // Listen for changes in the job collection
  jobChangeStream.on("change", async (change) => {
    if (change.operationType === "insert") {
      const newJob = change.fullDocument;
      // console.log(newJob);
      // Query job requests matching the new job's criteria
      const matchingJobRequests = await JobRequest.find({
        location: newJob.location,
        jobCategory: newJob.jobCategory,
        jobType: newJob.jobType,
      });

      // // Send email to users with matching job requests
      matchingJobRequests.forEach((request) => {
        sendEmail(request.email, newJob);
      });
    }
  });
};

module.exports = checkMatchingJobs;
