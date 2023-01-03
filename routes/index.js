import express from "express";
import { taskController } from "../controllers/taskController.js";

const router = express.Router();

/**
 * @Desc Add new tasks
 * @routes POST /add-task
 */
router.post("/add-task", taskController.addTask);

/**
 * @Desc get all tasks
 * @routes GET /tasks
 */
router.get("/tasks", taskController.getTasks);

/**
 * @Desc get a single task by it's id
 * @routes GET /tasks/id
 */
router.get("/task/:id", taskController.getTask);
/**
 * @Desc update a single task by it's id
 * @routes PUT /task/id
 */
router.put("/task/:id", taskController.editTask);

/**
 * @Desc delete a single task by it's id
 * @routes DELETE /task/id
 */
router.delete("/task/:id", taskController.deleteTask);

export default router;
