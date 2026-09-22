import { Router } from "express";
import { getProjectsInWorkspace, createProject } from "../controllers/projectController";

const router = Router({ mergeParams: true });

router.get("/", getProjectsInWorkspace);
router.post("/", createProject);

export default router;