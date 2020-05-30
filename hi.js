const express = require("express");
const studentsRouter = require("./router/studentsRouter");
const teacherRoute = require("./router/teacherRoute");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Student App Home!</h1>");
});

app.use("/students", studentsRouter);

app.use("/teacher",teacherRoute)

app.listen(8080, () => {
  console.log("Server Running!");
});
