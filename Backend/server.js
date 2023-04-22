require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const corOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");


connectDB();

 app.use(logger);

 app.use(cors(corOptions));

 app.use(express.json());

 app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.use('/admin', require('./routes/adminRoute'))
app.use('/undergrads', require('./routes/undergrad_studentRoutes'))
app.use('/undergraduteApplicants', require('./routes/undergraduteApplicantRoutes'))
app.use('/honors', require('./routes/honorRoutes'))
app.use('/honors/user', require('./routes/bySpecficUser/honorByUser'))
app.use('/undergradeReviews', require('./routes/reviewRoutes'))
app.use('/undergradeReviews/user', require('./routes/bySpecficUser/reviewByUserRouts'))
app.use('/undergradeReviews/id', require('./routes/bySpecficUser/reviewById_undergrad'))
app.use('/activities', require('./routes/activityRoutes'))
app.use('/activities/user', require('./routes/bySpecficUser/activityByUser'))
app.use('/essays', require('./routes/essaysRoutes'))
app.use('/essays/user', require('./routes/bySpecficUser/essayByUser'))
app.use('/recommendations', require('./routes/recommendationsRoutes'))
app.use('/recommendations/user', require('./routes/bySpecficUser/recommendationByUser'))
app.use('/aids', require('./routes/aidsRoutes'))
app.use('/aids/user', require('./routes/bySpecficUser/aidByUser'))



app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => console.log(`Server is running on ${PORT} `));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoDBErrLog.log"
  );
});
