import Task from "../models/Task.js";
import moment from "moment";

export const taskController = {
  //add task to database
  addTask: async (req, res) => {
    const { task, due_date, completed } = req.body;
    try {
      if (!task || !due_date) {
        res.status(400).json({ error: "All fields are required" });
      } else {
        let dueDate = moment(due_date,"DD/MM/YYYY").toDate()
        let formattedDate = moment(dueDate).format("Do MMMM YYYY")
        let newTask = await Task.create({
          task,
          due_date: formattedDate,
          completed,
        });
        res.status(201).json({
          task: newTask.task,
          due_date: newTask.due_date,
          completed: newTask.completed,
        });
      }
    } catch (error) {
      console.log(error )
      res.status(500).json({ error: "server error" });
    }
  },
  //get all tasks
  getTasks: async (req, res) => {
    try {
      let tasks = await Task.find();
      if (!tasks) {
        res.status(404).json({ error: "no task found" });
      } else {
        res.status(200).json(tasks);
      }
    } catch (error) {
      res.status(500).json({ error: "server error" });
    }
  },
  //get a single task by id
  getTask: async (req, res) => {
    try {
      let task = await Task.findById({ _id: req.params.id });
      //if task doesnt exist
      if (!task) {
        res.status(404).json({ error: "task does not exist" });
      } else {
        res.status(200).json(task);
      }
    } catch (error) {
      res.status(500).json({ error: "server error" });
    }
  },

  //update a task by id
  editTask: async (req, res) => {
    try {
      let task = await Task.findById({ _id: req.params.id });
      // if task doesnt exist
      if (!task) {
        res.status(404).json({ error: "task does not exist" });
      } else {
        task = await Task.findByIdAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(200).json(task);
      }
    } catch (error) {
      res.status(500).json({ error: "server error" });
    }
  },
  //delete a task by id
  deleteTask: async (req, res) => {
    try {
      let task = await Task.findById({ _id: req.params.id });
      // if task doesnt exist
      if (!task) {
        res.status(404).json({ error: "task does not exist" });
      } else {
        task = await Task.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ msg: "task deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "server error" });
    }
  },
};
