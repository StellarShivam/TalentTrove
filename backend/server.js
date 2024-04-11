const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const scrapeData = require("./config/scrapeJobs");

const app = express();
dotenv.config();
connectDB();

// scrapeData.scrapeIndeed();
// scrapeData.scrapeNaukri();
// scrapeData.scrapeInternshalaJobs();
// scrapeData.scrapeInternshalaIntern();

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

const PORT = process.env.PORT;

app.listen(3002, console.log(`Server started at ${PORT}`));
