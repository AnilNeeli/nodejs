const express = require("express");
const teacher = require("../model/teacher");

const teacherRouter = express.Router();

// "/teacher"

teacherRouter
  .get("/", (req, res) => {
    res.status(200).json({
      teacher
    });
  })
  .get("/:id", (req, res) => {
    try {
      let teachers = teacher.find(teacher => {
        return teacher.id === parseInt(req.params.id);
      });

      if (teachers) {
        res.status(200).json({
          teachers
        });
      } else {
        res.status(400).send("Teacher Not found!");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
      console.log(e);
    }
  })
  .post("/", (req, res) => {
    if (req.body.firstName && req.body.age < 18) {
      const id = teacher.length + 1;
      const newTeacher = {
        id,
        ...req.body
      };
      teacher.push(newTeacher);
      res.status(200).json({
        teaher: newTeacher
      });
    } else {
      res.status(400).send("Invalid Student");
    }
  })
  .patch("/:id", (req, res) => {
    try {
      let teachers = teacher.find(teacher => {
        return teacher.id === parseInt(req.params.id);
      });
      teachers= {
        ...teachers,
        ...req.body
      };
      res.status(200).json({ teachers });
    } catch (e) {
      res.status(500).send("Internal Server Error");
      console.log(e);
    }
  })
  .delete("/:id", (req, res) => {
    try {
      let teacherIndex;
      for (let i = 0; i < teacher.length; i++) {
        if (teacher[i].id === parseInt(req.params.id)) {
          teacherIndex = i;
        }
      }
      if (teacherIndex) {
        teacher.splice(teacherIndex, 1);
        res.status(200).json({});
      } else {
        res.status(400).send("Invalid Teacher");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = teacherRouter;
