import { Router } from "express";
import { getTaskById, updateTask, deleteTask } from "../controllers/taskController";

const router = Router();

router.get("/:taskID", getTaskById);
router.patch("/:taskID", updateTask);
router.delete("/:taskID", deleteTask);

export default router;