import { Router } from "express";
import { getTasksInProject, createTask } from "../controllers/taskController";

const router = Router({ mergeParams: true });

router.get("/", getTasksInProject);
router.post("/", createTask);

export default router;