const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const scrapeData = require("./config/scrapeJobs");
const checkMatchingJobs = require("./config/checkMatchingJobs");

const app = express();
dotenv.config();
connectDB();

// scrapeData.scrapeIndeed();
// // scrapeData.scrapeNaukri();
// scrapeData.scrapeInternshalaJobs();
// scrapeData.scrapeInternshalaIntern();
checkMatchingJobs();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT,PATCH");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use("/api/jobs", jobRoutes);
app.use("/api/users", authRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const PORT = process.env.PORT;

app.listen(3002, console.log(`Server started at ${PORT}`));
