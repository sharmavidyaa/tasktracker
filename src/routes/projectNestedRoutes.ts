import { Router } from "express";
import { getProjectById, updateProject, deleteProject } from "../controllers/projectController";

const router = Router({ mergeParams: true });

router.get("/:projectID", getProjectById);
router.patch("/:projectID", updateProject);
router.delete("/:projectID", deleteProject);

export default router;